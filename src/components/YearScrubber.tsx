import { MILESTONES, YEAR_MAX, YEAR_MIN } from "@/lib/timeline-data";

const DECADES = [1995, 2000, 2005, 2010, 2015, 2020, 2026];

export function YearScrubber({
  year,
  onChange,
  marks,
}: {
  year: number;
  onChange: (year: number) => void;
  marks?: number[];
}) {
  const span = YEAR_MAX - YEAR_MIN;
  const pct = ((year - YEAR_MIN) / span) * 100;
  const points = marks ?? MILESTONES.map((m) => m.year);

  return (
    <div className="w-full select-none">
      <div className="relative h-16">
        <div className="absolute inset-x-0 top-9 h-px bg-border" />
        <div className="absolute top-9 h-[2px] bg-primary" style={{ left: 0, width: `${pct}%` }} />

        {points.map((y) => (
          <button
            key={`m${y}`}
            onClick={() => onChange(y)}
            title={MILESTONES.find((m) => m.year === y)?.title ?? String(y)}
            className="press absolute top-[30px] -translate-x-1/2"
            style={{ left: `${((y - YEAR_MIN) / span) * 100}%` }}
            aria-label={`Jump to ${y}`}
          >
            <span
              className={`block size-[9px] rotate-45 border ${
                Math.abs(y - year) <= 1 ? "border-accent bg-accent" : "border-border bg-card"
              }`}
            />
          </button>
        ))}

        {DECADES.map((y) => (
          <span
            key={y}
            className="absolute top-11 -translate-x-1/2 font-mono text-[10px] text-muted-foreground"
            style={{ left: `${((y - YEAR_MIN) / span) * 100}%` }}
          >
            {y}
          </span>
        ))}

        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-full border border-primary bg-card px-3 py-1 font-display text-sm font-semibold text-primary"
          style={{ left: `${pct}%` }}
        >
          {year}
        </div>
      </div>

      <input
        type="range"
        min={YEAR_MIN}
        max={YEAR_MAX}
        value={year}
        aria-label="Drag through internet history"
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-1.5 w-full cursor-grab appearance-none rounded-full bg-secondary accent-primary active:cursor-grabbing"
      />
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        drag to morph the page through time
      </p>
    </div>
  );
}
