import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORY_LABEL, SITES, type Category } from "@/lib/timeline-data";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/websites")({
  head: () => ({
    meta: [
      { title: "The Collection — 13 Websites, Rebuilt Era by Era" },
      {
        name: "description",
        content:
          "Browse every website in the Internet Time Machine: Google, YouTube, Facebook, MySpace, Reddit, Amazon and more, each rebuilt across its defining eras.",
      },
      { property: "og:title", content: "The Collection — 13 Websites, Rebuilt Era by Era" },
      {
        property: "og:description",
        content: "Filter the archive by category and open any site's timeline.",
      },
    ],
  }),
  component: WebsitesPage,
});

const CATS = Object.keys(CATEGORY_LABEL) as Category[];

function WebsitesPage() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const { visits } = useAppState();

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SITES.filter(
      (s) =>
        (cat === "all" || s.category === cat) &&
        (!term || s.name.toLowerCase().includes(term) || s.blurb.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Permanent collection</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">The archive</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {SITES.length} websites, {SITES.reduce((n, s) => n + s.snapshots.length, 0)} eras, all
        reconstructed from memory, source archives and a lot of nested tables.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCat("all")}
          className={`press rounded-full border px-3 py-1.5 font-mono text-[11px] ${
            cat === "all" ? "border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >
          All
        </button>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`press rounded-full border px-3 py-1.5 font-mono text-[11px] ${
              cat === c ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter…"
          className="ml-auto rounded-full border border-border bg-card px-4 py-1.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => {
          const seen = s.snapshots.filter((e) => visits.includes(`${s.id}:${e.year}`)).length;
          return (
            <Link
              key={s.id}
              to="/timeline"
              search={{ site: s.id, year: s.snapshots[0].year }}
              className="press plate animate-rise group rounded-2xl p-5"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-lg font-display text-lg font-bold text-card transition-transform group-hover:scale-110"
                  style={{ background: s.brand }}
                >
                  {s.mark}
                </span>
                <div>
                  <p className="font-display font-semibold">{s.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {CATEGORY_LABEL[s.category]} · since {s.foundedYear}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.snapshots.map((e) => (
                  <span
                    key={e.year}
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                      visits.includes(`${s.id}:${e.year}`)
                        ? "border-accent text-accent"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {e.year}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] text-muted-foreground">
                {seen}/{s.snapshots.length} eras visited
              </p>
            </Link>
          );
        })}
      </div>
      {!list.length && (
        <p className="mt-16 text-center text-muted-foreground">Nothing in that wing of the museum.</p>
      )}
    </main>
  );
}
