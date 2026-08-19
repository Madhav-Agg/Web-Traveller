/* Hand-built recreation. Literal colours are historical, not app theming. */
export function GoogleSite({ year, query }: { year: number; query: string }) {
  if (year <= 2000) {
    return (
      <div className="font-era-90s p-8 text-center" style={{ color: "#000" }}>
        <div className="mb-1 text-5xl font-bold">
          <span style={{ color: "#0000cc" }}>G</span>
          <span style={{ color: "#cc0000" }}>o</span>
          <span style={{ color: "#ffcc00" }}>o</span>
          <span style={{ color: "#0000cc" }}>g</span>
          <span style={{ color: "#00aa00" }}>l</span>
          <span style={{ color: "#cc0000" }}>e!</span>
        </div>
        <p className="mb-4 text-xs">Search the web using Google!</p>
        <input
          readOnly
          value={query}
          className="w-64 border px-1 py-0.5 text-sm"
          style={{ border: "2px inset #ccc" }}
        />
        <div className="mt-3 flex justify-center gap-2 text-xs">
          <button style={btn90s}>Google Search</button>
          <button style={btn90s}>I'm feeling lucky</button>
        </div>
        <p className="mt-8 text-[11px]">
          Special Searches &nbsp;·&nbsp; Stanford Search &nbsp;·&nbsp; Linux Search
        </p>
        <p className="mt-6 text-[10px]" style={{ color: "#555" }}>
          Copyright ©1998 Google Inc.
        </p>
      </div>
    );
  }

  if (year <= 2006) {
    return (
      <div className="font-era-10s p-6 text-center" style={{ color: "#000" }}>
        <div className="mb-2 flex justify-center gap-3 text-[11px]" style={{ color: "#0000cc" }}>
          <u>Web</u> <u>Images</u> <u>Groups</u> <u>News</u> <u>Froogle</u> <u>more »</u>
        </div>
        <div className="mb-3 text-5xl font-bold tracking-tight">
          <span style={{ color: "#3366cc" }}>G</span>
          <span style={{ color: "#cc0000" }}>o</span>
          <span style={{ color: "#ffcc00" }}>o</span>
          <span style={{ color: "#3366cc" }}>g</span>
          <span style={{ color: "#009900" }}>l</span>
          <span style={{ color: "#cc0000" }}>e</span>
        </div>
        <input
          readOnly
          value={query}
          className="w-80 px-1 py-1 text-sm"
          style={{ border: "1px solid #7f9db9" }}
        />
        <div className="mt-3 flex justify-center gap-2 text-xs">
          <button style={btn00s}>Google Search</button>
          <button style={btn00s}>I'm Feeling Lucky</button>
        </div>
        <p className="mt-6 text-[11px]" style={{ color: "#0000cc" }}>
          <u>Advertising Programs</u> · <u>Business Solutions</u> · <u>About Google</u>
        </p>
        <p className="mt-8 text-[11px]">New! Gmail — 1000 MB of free storage. Invite only.</p>
      </div>
    );
  }

  if (year <= 2012) {
    return (
      <div className="font-era-10s" style={{ color: "#222" }}>
        <div
          className="flex items-center gap-4 px-4 py-1.5 text-[11px]"
          style={{ background: "#2d2d2d", color: "#ccc" }}
        >
          {["Web", "Images", "Videos", "Maps", "News", "Gmail", "more"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="p-12 text-center">
          <div className="mb-4 text-6xl font-bold">
            <span style={{ color: "#4285f4" }}>G</span>
            <span style={{ color: "#db4437" }}>o</span>
            <span style={{ color: "#f4b400" }}>o</span>
            <span style={{ color: "#4285f4" }}>g</span>
            <span style={{ color: "#0f9d58" }}>l</span>
            <span style={{ color: "#db4437" }}>e</span>
          </div>
          <input
            readOnly
            value={query}
            className="w-[26rem] px-2 py-1.5 text-sm"
            style={{ border: "1px solid #ccc", boxShadow: "inset 0 1px 2px rgba(0,0,0,.15)" }}
          />
          <div className="mt-4 flex justify-center gap-2 text-xs">
            <button style={btn10s}>Google Search</button>
            <button style={btn10s}>I'm Feeling Lucky</button>
          </div>
          <p className="mt-4 text-[11px]" style={{ color: "#777" }}>
            Instant is on — results update as you type.
          </p>
        </div>
      </div>
    );
  }

  if (year <= 2020) {
    return (
      <div className="font-era-now" style={{ color: "#202124" }}>
        <div className="flex justify-end gap-4 p-4 text-[13px]" style={{ color: "#5f6368" }}>
          <span>Gmail</span>
          <span>Images</span>
          <span
            className="rounded px-3 py-1.5 text-white"
            style={{ background: "#1a73e8", color: "#fff" }}
          >
            Sign in
          </span>
        </div>
        <div className="px-8 pt-14 text-center">
          <div className="mb-7 text-6xl font-medium tracking-tight">
            <span style={{ color: "#4285f4" }}>G</span>
            <span style={{ color: "#ea4335" }}>o</span>
            <span style={{ color: "#fbbc05" }}>o</span>
            <span style={{ color: "#4285f4" }}>g</span>
            <span style={{ color: "#34a853" }}>l</span>
            <span style={{ color: "#ea4335" }}>e</span>
          </div>
          <div
            className="mx-auto flex w-full max-w-lg items-center gap-3 rounded-full px-5 py-3"
            style={{ border: "1px solid #dfe1e5", boxShadow: "0 1px 6px rgba(32,33,36,.18)" }}
          >
            <span style={{ color: "#9aa0a6" }}>⌕</span>
            <span className="text-sm">{query}</span>
          </div>
          <div className="mt-7 flex justify-center gap-3 text-[13px]">
            <button style={btnMaterial}>Google Search</button>
            <button style={btnMaterial}>I'm Feeling Lucky</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-era-now min-h-full" style={{ background: "#131314", color: "#e3e3e3" }}>
      <div className="flex justify-end gap-4 p-4 text-[13px]" style={{ color: "#c4c7c5" }}>
        <span>Labs</span>
        <span>Images</span>
        <span className="rounded-full px-3 py-1.5" style={{ background: "#8ab4f8", color: "#062e6f" }}>
          Sign in
        </span>
      </div>
      <div className="px-8 pt-10 text-center">
        <div className="mb-7 text-5xl font-semibold tracking-tight">
          <span style={{ color: "#8ab4f8" }}>G</span>
          <span style={{ color: "#f28b82" }}>o</span>
          <span style={{ color: "#fdd663" }}>o</span>
          <span style={{ color: "#8ab4f8" }}>g</span>
          <span style={{ color: "#81c995" }}>l</span>
          <span style={{ color: "#f28b82" }}>e</span>
        </div>
        <div
          className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-full px-5 py-3.5"
          style={{ background: "#1e1f20", border: "1px solid #2f3133" }}
        >
          <span>⌕</span>
          <span className="text-sm">{query}</span>
          <span className="ml-auto text-sm opacity-70">🎙 ◎ ✦</span>
        </div>
        <div
          className="mx-auto mt-6 max-w-xl rounded-2xl p-5 text-left text-sm"
          style={{ background: "linear-gradient(135deg,#1b2a3a,#1e1f20)", border: "1px solid #2f3133" }}
        >
          <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "#8ab4f8" }}>
            AI Overview
          </p>
          <p style={{ color: "#c4c7c5" }}>
            Results for “{query}” are summarised here before the classic ten blue links, with
            sources folded into the answer.
          </p>
        </div>
      </div>
    </div>
  );
}

const btn90s = {
  background: "#ddd",
  border: "2px outset #eee",
  padding: "2px 8px",
  fontFamily: '"Times New Roman", serif',
} as const;
const btn00s = {
  background: "#f2f2f2",
  border: "1px solid #aaa",
  padding: "3px 10px",
  fontFamily: "Arial, sans-serif",
} as const;
const btn10s = {
  background: "linear-gradient(#f5f5f5,#e8e8e8)",
  border: "1px solid #ccc",
  borderRadius: 2,
  padding: "6px 14px",
  color: "#444",
} as const;
const btnMaterial = {
  background: "#f8f9fa",
  border: "1px solid #f8f9fa",
  borderRadius: 4,
  padding: "9px 18px",
  color: "#3c4043",
} as const;