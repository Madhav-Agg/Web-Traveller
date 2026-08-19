import type { EraSnapshot, SiteDef } from "@/lib/timeline-data";
import { CATEGORY_LABEL } from "@/lib/timeline-data";

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-border pt-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground/85">{body}</p>
    </div>
  );
}

export function FactsPanel({ site, snap }: { site: SiteDef; snap: EraSnapshot }) {
  return (
    <aside className="plate animate-fade rounded-2xl p-5">
      <div className="flex items-center gap-2">
        <span
          className="grid size-7 place-items-center rounded font-mono text-xs font-bold text-card"
          style={{ background: site.brand }}
        >
          {site.mark}
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {CATEGORY_LABEL[site.category]} · museum card
        </p>
      </div>

      <h2 className="mt-2 font-display text-2xl font-semibold">
        {site.name} <span className="text-muted-foreground">({snap.year})</span>
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{snap.tagline}</p>

      <div className="mt-4 space-y-3">
        <Block label="What changed" body={snap.whatChanged} />
        <Block label="Design trend" body={snap.designTrend} />
        <Block label="Why it mattered" body={snap.whyItMattered} />
      </div>

      <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        {snap.facts.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-accent">•</span>
            <span className="text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Technology of the era
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {snap.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">Launched {site.founded}</p>
      </div>
    </aside>
  );
}
