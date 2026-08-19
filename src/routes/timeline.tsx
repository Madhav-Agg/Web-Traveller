import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { BrowserFrame } from "@/components/BrowserFrame";
import { FactsPanel } from "@/components/FactsPanel";
import { SiteRenderer } from "@/components/sites/SiteRenderer";
import { YearScrubber } from "@/components/YearScrubber";
import { MILESTONES, SITES, getSite, nearestSnapshot } from "@/lib/timeline-data";
import { useAppState } from "@/lib/app-state";
import { playFx } from "@/lib/sound";

export const Route = createFileRoute("/timeline")({
  validateSearch: z.object({ site: z.string().optional(), year: z.number().optional() }).parse,
  head: () => ({
    meta: [
      { title: "Timeline — Drag Through 30 Years of the Web" },
      {
        name: "description",
        content:
          "Scrub from 1995 to 2026 and watch hand-rebuilt versions of Google, YouTube, Wikipedia, Amazon and more morph inside period-accurate browser chrome.",
      },
      { property: "og:title", content: "Timeline — Drag Through 30 Years of the Web" },
      {
        property: "og:description",
        content: "A draggable year scrubber that morphs famous websites era by era.",
      },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  const { site: siteParam, year: yearParam } = Route.useSearch();
  const navigate = useNavigate();
  const { settings, visit, hasVisited } = useAppState();

  const [siteId, setSiteId] = useState(siteParam ?? "google");
  const [year, setYear] = useState(yearParam ?? 1998);
  const [query, setQuery] = useState("cats");
  const [flicker, setFlicker] = useState(false);

  const site = getSite(siteId);
  const snap = nearestSnapshot(site, year);
  const index = site.snapshots.findIndex((s) => s.year === snap.year);
  const milestone = MILESTONES.find((m) => m.year === snap.year);

  useEffect(() => {
    if (siteParam && siteParam !== siteId) setSiteId(siteParam);
  }, [siteParam, siteId]);
  useEffect(() => {
    if (typeof yearParam === "number") setYear(yearParam);
  }, [yearParam]);

  useEffect(() => {
    setFlicker(true);
    const t = setTimeout(() => setFlicker(false), 450);
    visit(siteId, snap.year);
    return () => clearTimeout(t);
  }, [snap.year, siteId, visit]);

  const step = useCallback(
    (dir: -1 | 1) => {
      const next = site.snapshots[Math.min(site.snapshots.length - 1, Math.max(0, index + dir))];
      if (!next || next.year === snap.year) return;
      playFx("click", settings.sound, settings.volume);
      setYear(next.year);
    },
    [index, site.snapshots, snap.year, settings.sound, settings.volume],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  function switchSite(id: string) {
    playFx("click", settings.sound, settings.volume);
    setSiteId(id);
    navigate({ to: "/timeline", search: { site: id, year }, replace: true });
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-8">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          Gallery {index + 1}/{site.snapshots.length}
        </p>
        <Link
          to="/compare"
          className="press ml-auto rounded-full border border-border px-4 py-1.5 font-mono text-[11px] text-muted-foreground hover:border-primary hover:text-primary"
        >
          compare eras ⇄
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {SITES.map((s) => (
          <button
            key={s.id}
            onClick={() => switchSite(s.id)}
            className={`press flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] ${
              s.id === siteId
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="size-2 rounded-full" style={{ background: s.brand }} />
            {s.name}
          </button>
        ))}
      </div>

      <div className="plate mt-5 rounded-2xl p-5">
        <YearScrubber year={year} onChange={setYear} />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button onClick={() => step(-1)} className="press rounded-full border border-border px-3 py-1 font-mono text-[11px]">
            ← previous era
          </button>
          <button onClick={() => step(1)} className="press rounded-full border border-border px-3 py-1 font-mono text-[11px]">
            next era →
          </button>
          <span className="font-mono text-[10px] text-muted-foreground">
            arrow keys work too
          </span>
          <div className="ml-auto flex flex-wrap gap-1">
            {site.snapshots.map((s) => (
              <button
                key={s.year}
                onClick={() => setYear(s.year)}
                className={`press rounded-full border px-2.5 py-1 font-mono text-[10px] ${
                  s.year === snap.year
                    ? "border-primary text-primary"
                    : hasVisited(site.id, s.year)
                      ? "border-accent/60 text-accent"
                      : "border-border text-muted-foreground"
                }`}
              >
                {s.year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {milestone && (
        <div className="animate-fade mt-4 rounded-xl border border-accent/50 bg-accent/10 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {milestone.year} milestone
          </p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">{milestone.title}</span> — {milestone.body}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div
          className={`${snap.year <= 2006 && settings.scanlines ? "crt-scanlines" : ""} ${
            flicker && !settings.reducedMotion ? "animate-flicker" : ""
          } ${settings.customCursor && snap.year < 2005 ? "cursor-era-90s" : ""}`}
        >
          <BrowserFrame
            kind={snap.browser}
            url={snap.url}
            title={`${site.name} — ${snap.year}`}
            reloadKey={`${siteId}:${snap.year}`}
            onBack={() => step(-1)}
            onForward={() => step(1)}
            canBack={index > 0}
            canForward={index < site.snapshots.length - 1}
          >
            <SiteRenderer siteId={siteId} year={snap.year} query={query} />
          </BrowserFrame>

          {siteId === "google" && (
            <div className="plate mt-4 flex flex-wrap items-center gap-3 rounded-xl p-3">
              <label htmlFor="q" className="font-mono text-[11px] text-muted-foreground">
                search the same thing in every era:
              </label>
              <input
                id="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-40 flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
              />
            </div>
          )}
        </div>

        <FactsPanel site={site} snap={snap} />
      </div>
    </main>
  );
}
