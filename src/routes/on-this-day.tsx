import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EVENTS } from "@/lib/events-data";

export const Route = createFileRoute("/on-this-day")({
  head: () => ({
    meta: [
      { title: "On This Day in Internet History" },
      {
        name: "description",
        content:
          "A daily almanac of the web: launches, IPOs, first tweets and shutdowns, each linked to a hand-rebuilt recreation of the site involved.",
      },
      { property: "og:title", content: "On This Day in Internet History" },
      {
        property: "og:description",
        content: "Browse the internet almanac month by month and jump straight into the era.",
      },
    ],
  }),
  component: OnThisDayPage,
});

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function OnThisDayPage() {
  const today = new Date();
  const [month, setMonth] = useState(today.getUTCMonth() + 1);

  const todays = useMemo(
    () =>
      EVENTS.filter(
        (e) => e.month === today.getUTCMonth() + 1 && Math.abs(e.day - today.getUTCDate()) <= 3,
      ),
    [today],
  );
  const list = useMemo(
    () => EVENTS.filter((e) => e.month === month).sort((a, b) => a.day - b.day),
    [month],
  );

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Almanac</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">On this day</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        The web has a birthday nearly every day. Here is what happened around now — and everything
        else filed under each month.
      </p>

      {todays.length > 0 && (
        <div className="plate animate-pop mt-6 rounded-2xl p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Around {MONTHS[today.getUTCMonth()]} {today.getUTCDate()}
          </p>
          {todays.map((e) => (
            <div key={e.title} className="mt-3">
              <p className="font-display font-semibold">
                {e.title} <span className="font-mono text-xs text-muted-foreground">{e.year}</span>
              </p>
              <p className="text-sm text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-1.5">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setMonth(i + 1)}
            className={`press rounded-full border px-3 py-1 font-mono text-[11px] ${
              month === i + 1 ? "border-primary text-primary" : "border-border text-muted-foreground"
            }`}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>

      <ol className="mt-6 space-y-3">
        {list.map((e, i) => (
          <li
            key={e.title}
            className="plate animate-rise rounded-2xl p-5"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-xs text-accent">
                {MONTHS[e.month - 1].slice(0, 3)} {e.day}, {e.year}
              </span>
              <p className="font-display font-semibold">{e.title}</p>
              {e.site && (
                <Link
                  to="/timeline"
                  search={{ site: e.site, year: e.jumpYear }}
                  className="press ml-auto rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground hover:border-primary hover:text-primary"
                >
                  open the era →
                </Link>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{e.body}</p>
          </li>
        ))}
        {!list.length && (
          <p className="py-10 text-center text-muted-foreground">Quiet month in the archive.</p>
        )}
      </ol>
    </main>
  );
}
