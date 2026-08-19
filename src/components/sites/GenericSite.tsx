import type { SiteDef, EraSnapshot } from "@/lib/timeline-data";

/*
 * Era-driven recreation used for sites without a bespoke component yet.
 * Layout, type and colour are all derived from the era, never screenshots.
 */
export function GenericSite({ site, snap }: { site: SiteDef; snap: EraSnapshot }) {
  const y = snap.year;
  const brand = site.brand;

  if (y < 2000) {
    return (
      <div className="min-h-full bg-[#c0c0c0] p-4 font-era-90s text-[#000]">
        <h1 className="text-2xl" style={{ color: brand }}>
          {site.name}
        </h1>
        <hr className="my-2 border-[#808080]" />
        <p className="text-sm italic">{snap.tagline}</p>
        <table className="mt-4 w-full border-collapse text-sm">
          <tbody>
            {snap.facts.map((f, i) => (
              <tr key={f}>
                <td className="w-6 border border-[#808080] bg-[#d4d0c8] px-2 py-1 align-top">{i + 1}</td>
                <td className="border border-[#808080] bg-white px-2 py-1">
                  <span className="text-[#0000ee] underline">{f}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-[11px]">Best viewed at 800x600 · Last updated {y}</p>
      </div>
    );
  }

  if (y < 2010) {
    return (
      <div className="min-h-full bg-white font-era-00s text-[11px] text-[#333]">
        <div className="px-3 py-2 text-white" style={{ background: `linear-gradient(${brand}, ${brand}cc)` }}>
          <strong className="text-sm">{site.name}</strong>
          <span className="ml-3 opacity-90">{snap.tagline}</span>
        </div>
        <div className="flex gap-2 border-b border-[#ccc] bg-[#f1f1f1] px-3 py-1">
          {["Home", "Browse", "Search", "Help", "Sign In"].map((t) => (
            <span key={t} className="cursor-pointer px-2 py-0.5 text-[#0033cc] hover:underline">
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[160px_1fr] gap-3 p-3">
          <div className="border border-[#ccc] bg-[#fafafa] p-2">
            <p className="mb-1 font-bold" style={{ color: brand }}>
              Categories
            </p>
            {snap.tech.map((t) => (
              <p key={t} className="cursor-pointer text-[#0033cc] hover:underline">
                » {t}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            {snap.facts.map((f) => (
              <div key={f} className="border border-[#ddd] bg-[#fcfcfc] p-2">
                <p className="font-bold text-[#0033cc]">{f.split(" ").slice(0, 5).join(" ")}…</p>
                <p className="mt-1 leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (y < 2020) {
    return (
      <div className="min-h-full bg-white font-era-10s text-[#222]">
        <div className="flex items-center gap-4 border-b border-[#e5e5e5] px-5 py-3">
          <span className="text-lg font-bold" style={{ color: brand }}>
            {site.name}
          </span>
          {["Home", "Explore", "Trending", "Account"].map((t) => (
            <span key={t} className="cursor-pointer text-sm text-[#555] hover:text-black">
              {t}
            </span>
          ))}
        </div>
        <div className="p-5">
          <p className="text-xl font-semibold">{snap.tagline}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {snap.facts.map((f) => (
              <div key={f} className="rounded border border-[#e5e5e5] p-3 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-2 h-16 rounded" style={{ background: `${brand}22` }} />
                <p className="text-xs leading-relaxed text-[#444]">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0f1115] font-era-now text-[#e7e9ee]">
      <div className="flex items-center gap-5 border-b border-[#23262d] px-6 py-3.5">
        <span className="text-base font-semibold" style={{ color: brand }}>
          {site.name}
        </span>
        {["Home", "Discover", "Library", "You"].map((t) => (
          <span key={t} className="cursor-pointer text-sm text-[#9aa1ad] transition-colors hover:text-white">
            {t}
          </span>
        ))}
        <span className="ml-auto rounded-full bg-[#1c1f26] px-3 py-1 text-xs text-[#9aa1ad]">Search</span>
      </div>
      <div className="p-6">
        <p className="text-2xl font-semibold tracking-tight">{snap.tagline}</p>
        <p className="mt-1 text-sm text-[#9aa1ad]">{snap.whatChanged}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {snap.facts.map((f) => (
            <div
              key={f}
              className="rounded-xl border border-[#23262d] bg-[#161920] p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-3 h-20 rounded-lg" style={{ background: `linear-gradient(135deg, ${brand}55, transparent)` }} />
              <p className="text-sm leading-relaxed text-[#c8cdd6]">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
