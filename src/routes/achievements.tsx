import { createFileRoute } from "@tanstack/react-router";
import { ACHIEVEMENTS } from "@/lib/achievements-data";
import { useAppState } from "@/lib/app-state";
import { TOTAL_ERAS } from "@/lib/timeline-data";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Badges — Your Internet Archaeology Record" },
      {
        name: "description",
        content:
          "Track which website eras you have explored and unlock badges like Internet Archaeologist, Retro Addict and Time Traveler.",
      },
      { property: "og:title", content: "Badges — Your Internet Archaeology Record" },
      {
        property: "og:description",
        content: "Progress, streaks and unlockables across 30 years of the web.",
      },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const { visits, unlocked, progressPct, hydrated } = useAppState();

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Visitor record</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Badges</h1>

      <div className="plate mt-6 rounded-2xl p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-3xl font-semibold">{progressPct}%</p>
            <p className="text-sm text-muted-foreground">
              {hydrated ? visits.length : 0} of {TOTAL_ERAS} eras explored ·{" "}
              {unlocked.length}/{ACHIEVEMENTS.length} badges
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-accent transition-[width] duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a, i) => {
          const { current, target } = a.progress(visits);
          const done = current >= target;
          return (
            <div
              key={a.id}
              className={`plate animate-rise rounded-2xl p-5 ${done ? "border-accent" : ""}`}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold">{a.name}</p>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    done ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {done ? "unlocked" : "locked"}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className={done ? "h-full bg-accent" : "h-full bg-primary"}
                  style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
                />
              </div>
              <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                {Math.min(current, target)}/{target}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
