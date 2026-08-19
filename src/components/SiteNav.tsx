import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SettingsPanel } from "./SettingsPanel";
import { useAppState } from "@/lib/app-state";
import { SITES, CATEGORY_LABEL } from "@/lib/timeline-data";
import { EVENTS } from "@/lib/events-data";
import { playFx } from "@/lib/sound";

const LINKS = [
  { to: "/websites", label: "Collection" },
  { to: "/timeline", label: "Timeline" },
  { to: "/compare", label: "Compare" },
  { to: "/on-this-day", label: "On this day" },
  { to: "/achievements", label: "Badges" },
] as const;

export function SiteNav() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { settings, progressPct } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const sites = SITES.filter(
      (s) =>
        !term ||
        s.name.toLowerCase().includes(term) ||
        s.blurb.toLowerCase().includes(term) ||
        CATEGORY_LABEL[s.category].toLowerCase().includes(term),
    ).slice(0, 6);
    const events = term
      ? EVENTS.filter(
          (e) =>
            e.title.toLowerCase().includes(term) ||
            e.tags.some((t) => t.includes(term)),
        ).slice(0, 4)
      : [];
    return { sites, events };
  }, [q]);

  function surprise() {
    playFx("click", settings.sound, settings.volume);
    const site = SITES[Math.floor(Math.random() * SITES.length)];
    const snap = site.snapshots[Math.floor(Math.random() * site.snapshots.length)];
    navigate({ to: "/timeline", search: { site: site.id, year: snap.year } });
  }

  function go(siteId: string, year?: number) {
    setSearchOpen(false);
    setQ("");
    navigate({ to: "/timeline", search: { site: siteId, year } });
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
          <Link to="/" className="press flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
              IT
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">
              Internet Time Machine
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-foreground bg-secondary" }}
                className="press rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-accent" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">{progressPct}%</span>
            </div>
            <button
              onClick={() => setSearchOpen(true)}
              className="press rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground"
            >
              search ⌘K
            </button>
            <button
              onClick={surprise}
              className="press rounded-full bg-accent px-3 py-1.5 font-mono text-[11px] text-accent-foreground"
            >
              surprise me
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings"
              className="press rounded-full border border-border px-2.5 py-1.5 text-sm"
            >
              ⚙
            </button>
          </div>
        </div>
      </header>
      <div className="sticky top-[57px] z-30 overflow-x-auto border-b border-border bg-background/85 px-4 py-2 backdrop-blur md:hidden">
        <div className="flex gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground bg-secondary" }}
              className="press shrink-0 rounded-full px-3 py-1 text-xs text-muted-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24">
          <button
            aria-label="Close search"
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setSearchOpen(false)}
          />
          <div className="animate-pop plate relative w-full max-w-xl rounded-2xl p-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sites, eras and internet history…"
              className="w-full rounded-xl bg-transparent px-4 py-3 text-sm outline-none"
            />
            <div className="max-h-80 overflow-y-auto border-t border-border pt-2">
              {results.sites.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-secondary"
                >
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded font-mono text-[11px] font-bold text-card"
                    style={{ background: s.brand }}
                  >
                    {s.mark}
                  </span>
                  <span className="text-sm">{s.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{s.blurb}</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {s.snapshots.length} eras
                  </span>
                </button>
              ))}
              {results.events.map((e) => (
                <button
                  key={e.title}
                  onClick={() => (e.site ? go(e.site, e.jumpYear) : setSearchOpen(false))}
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left hover:bg-secondary"
                >
                  <span className="mt-0.5 font-mono text-[10px] text-accent">{e.year}</span>
                  <span className="text-sm">{e.title}</span>
                </button>
              ))}
              {!results.sites.length && !results.events.length && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Nothing in the archive matches that.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
