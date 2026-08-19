import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { BrowserFrame } from "@/components/BrowserFrame";
import { SiteRenderer } from "@/components/sites/SiteRenderer";
import { SITES, getSite, nearestSnapshot } from "@/lib/timeline-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/compare")({
  validateSearch: z.object({
    site: z.string().optional(),
    left: z.number().optional(),
    right: z.number().optional(),
  }).parse,
  head: () => ({
    meta: [
      { title: "Compare Eras — Then vs Now, Side by Side" },
      {
        name: "description",
        content:
          "Put two eras of the same website next to each other, drag the divider, and read exactly what changed between them.",
      },
      { property: "og:title", content: "Compare Eras — Then vs Now, Side by Side" },
      {
        property: "og:description",
        content: "A draggable split-screen diff of thirty years of web design.",
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const search = Route.useSearch();
  const [siteId, setSiteId] = useState(search.site ?? "google");
  const site = getSite(siteId);
  const [leftYear, setLeftYear] = useState(search.left ?? site.snapshots[0].year);
  const [rightYear, setRightYear] = useState(search.right ?? site.snapshots.at(-1)!.year);
  const [split, setSplit] = useState(50);
  const [overlay, setOverlay] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const { settings } = useAppState();

  const left = nearestSnapshot(site, leftYear);
  const right = nearestSnapshot(site, rightYear);

  function switchSite(id: string) {
    const s = getSite(id);
    setSiteId(id);
    setLeftYear(s.snapshots[0].year);
    setRightYear(s.snapshots.at(-1)!.year);
  }

  function drag(clientX: number) {
    const box = wrap.current?.getBoundingClientRect();
    if (!box) return;
    setSplit(Math.min(92, Math.max(8, ((clientX - box.left) / box.width) * 100)));
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Diff view</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Then vs now</h1>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {SITES.map((s) => (
          <button
            key={s.id}
            onClick={() => switchSite(s.id)}
            className={`press rounded-full border px-3 py-1.5 font-mono text-[11px] ${
              s.id === siteId ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="plate mt-4 flex flex-wrap items-center gap-4 rounded-2xl p-4">
        <YearPicker label="Left" years={site.snapshots.map((s) => s.year)} value={left.year} onChange={setLeftYear} />
        <YearPicker label="Right" years={site.snapshots.map((s) => s.year)} value={right.year} onChange={setRightYear} />
        <button
          onClick={() => setOverlay((v) => !v)}
          className={`press ml-auto rounded-full border px-4 py-1.5 font-mono text-[11px] ${
            overlay ? "border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >
          {overlay ? "slider wipe: on" : "slider wipe: off"}
        </button>
      </div>

      {overlay ? (
        <div
          ref={wrap}
          className="relative mt-6 select-none overflow-hidden rounded-2xl border border-border"
          onMouseMove={(e) => e.buttons === 1 && drag(e.clientX)}
          onMouseDown={(e) => drag(e.clientX)}
          onTouchMove={(e) => drag(e.touches[0].clientX)}
        >
          <div className={left.year <= 2006 && settings.scanlines ? "crt-scanlines" : ""}>
            <BrowserFrame kind={left.browser} url={left.url} title={`${site.name} — ${left.year}`} compact>
              <SiteRenderer siteId={siteId} year={left.year} />
            </BrowserFrame>
          </div>
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
            <BrowserFrame kind={right.browser} url={right.url} title={`${site.name} — ${right.year}`} compact>
              <SiteRenderer siteId={siteId} year={right.year} />
            </BrowserFrame>
          </div>
          <div
            className="absolute inset-y-0 w-px cursor-col-resize bg-primary"
            style={{ left: `${split}%` }}
          >
            <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-card px-2 py-1 font-mono text-[10px] text-primary">
              ⇄
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[left, right].map((snap) => (
            <div
              key={snap.year}
              className={snap.year <= 2006 && settings.scanlines ? "crt-scanlines" : ""}
            >
              <BrowserFrame
                kind={snap.browser}
                url={snap.url}
                title={`${site.name} — ${snap.year}`}
                reloadKey={`${siteId}:${snap.year}`}
                compact
              >
                <SiteRenderer siteId={siteId} year={snap.year} />
              </BrowserFrame>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {[left, right].map((snap) => (
          <div key={`c${snap.year}`} className="plate rounded-2xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {site.name} · {snap.year}
            </p>
            <p className="mt-2 font-display font-semibold">{snap.tagline}</p>
            <p className="mt-2 text-sm text-foreground/85">{snap.whatChanged}</p>
            <p className="mt-2 text-sm text-muted-foreground">{snap.designTrend}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {snap.tech.map((t) => (
                <span key={t} className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function YearPicker({
  label,
  years,
  value,
  onChange,
}: {
  label: string;
  years: number[];
  value: number;
  onChange: (y: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => onChange(y)}
            className={`press rounded-full border px-2.5 py-1 font-mono text-[10px] ${
              y === value ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}
