import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrowserFrame } from "@/components/BrowserFrame";
import { SiteRenderer } from "@/components/sites/SiteRenderer";
import { MILESTONES, SITES, TOTAL_ERAS, getSite } from "@/lib/timeline-data";
import { eventForToday } from "@/lib/events-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Internet Time Machine — 30 Years of the Web, Rebuilt in Code" },
      {
        name: "description",
        content:
          "Drag a slider from 1995 to 2026 and watch Google, YouTube, MySpace, Amazon and more morph era by era — every page rebuilt by hand in HTML and CSS, never a screenshot.",
      },
      { property: "og:title", content: "Internet Time Machine — 30 Years of the Web, Rebuilt in Code" },
      {
        property: "og:description",
        content: "An interactive museum of the web: era-accurate browsers, fonts, layouts and cursors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO_TOUR: Array<{ site: string; year: number }> = [
  { site: "google", year: 1998 },
  { site: "myspace", year: 2003 },
  { site: "youtube", year: 2005 },
  { site: "facebook", year: 2008 },
  { site: "netflix", year: 2013 },
  { site: "google", year: 2026 },
];

function Index() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const { settings, progressPct } = useAppState();
  const stop = HERO_TOUR[i];
  const site = getSite(stop.site);
  const today = eventForToday();

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % HERO_TOUR.length), 5200);
    return () => clearTimeout(t);
  }, [i, paused]);

  const snap = site.snapshots.find((s) => s.year === stop.year) ?? site.snapshots[0];

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            est. 1995 · no screenshots, only code
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl">
            The internet,
            <br />
            preserved in <span className="text-primary">markup</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            {SITES.length} famous websites, {TOTAL_ERAS} eras, all rebuilt by hand — the fonts, the
            beveled buttons, the browser chrome and the cursors that came with them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/timeline"
              search={{ site: "google", year: 1998 }}
              className="press rounded-full bg-primary px-7 py-3 font-display text-sm font-semibold text-primary-foreground"
            >
              Start the tour
            </Link>
            <Link
              to="/websites"
              className="press rounded-full border border-border px-7 py-3 font-display text-sm font-semibold hover:bg-secondary"
            >
              Browse the collection
            </Link>
          </div>
          <p className="mt-5 font-mono text-[11px] text-muted-foreground">
            your visit: {progressPct}% of the archive explored
          </p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={snap.year <= 2006 && settings.scanlines ? "crt-scanlines" : ""}
        >
          <BrowserFrame
            kind={snap.browser}
            url={snap.url}
            title={`${site.name} — ${snap.year}`}
            reloadKey={`${stop.site}:${stop.year}`}
            compact
          >
            <SiteRenderer siteId={stop.site} year={snap.year} query="cats" />
          </BrowserFrame>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {HERO_TOUR.map((s, n) => (
              <button
                key={`${s.site}${s.year}`}
                onClick={() => setI(n)}
                className={`press rounded-full border px-2.5 py-1 font-mono text-[10px] ${
                  n === i ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {getSite(s.site).name} {s.year}
              </button>
            ))}
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              {paused ? "paused" : "auto-morphing"}
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Daily internet moment
          </p>
          <p className="text-sm">
            <span className="font-display font-semibold">{today.title}</span>{" "}
            <span className="font-mono text-xs text-muted-foreground">{today.year}</span> —{" "}
            <span className="text-muted-foreground">{today.body}</span>
          </p>
          <Link
            to="/on-this-day"
            className="press ml-auto rounded-full border border-border px-4 py-1.5 font-mono text-[11px] hover:border-primary hover:text-primary"
          >
            more from the almanac →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="font-display text-2xl font-semibold">Then vs now</h2>
        <p className="mt-1 text-muted-foreground">The same idea, thirty years apart.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { id: "google", a: 1998, b: 2026 },
            { id: "amazon", a: 1999, b: 2026 },
          ].map((pair) => {
            const s = getSite(pair.id);
            const older = s.snapshots.find((e) => e.year === pair.a) ?? s.snapshots[0];
            const newer = s.snapshots.find((e) => e.year === pair.b) ?? s.snapshots.at(-1)!;
            return (
              <div key={pair.id} className="plate rounded-2xl p-4">
                <p className="font-display font-semibold">{s.name}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[older, newer].map((e) => (
                    <div key={e.year}>
                      <p className="font-mono text-[10px] text-muted-foreground">{e.year}</p>
                      <p className="mt-1 text-sm text-foreground/85">{e.whatChanged}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/compare"
                  search={{ site: s.id, left: older.year, right: newer.year }}
                  className="press mt-4 inline-block rounded-full border border-border px-4 py-1.5 font-mono text-[11px] hover:border-primary hover:text-primary"
                >
                  open side by side ⇄
                </Link>
              </div>
            );
          })}
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold">Stops along the way</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MILESTONES.map((m, n) => (
            <Link
              key={m.year}
              to="/timeline"
              search={{ site: "google", year: m.year }}
              className="press plate animate-rise rounded-2xl p-4"
              style={{ animationDelay: `${n * 40}ms` }}
            >
              <p className="font-mono text-xs text-accent">{m.year}</p>
              <p className="mt-1 font-display font-semibold">{m.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
