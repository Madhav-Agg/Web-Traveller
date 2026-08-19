/* Hand-built recreation. Literal colours are historical, not app theming. */
export function YouTubeSite({ year }: { year: number }) {
  if (year <= 2008) {
    return (
      <div className="font-era-00s text-[12px]" style={{ background: "#fff", color: "#000" }}>
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #ccc" }}>
          <span className="text-xl font-bold">
            You<span style={{ background: "#cc181e", color: "#fff", padding: "0 4px" }}>Tube</span>
          </span>
          <span className="text-[10px] italic">Broadcast Yourself™</span>
          <input readOnly value="skateboarding dog" className="ml-auto px-1" style={{ border: "1px solid #999" }} />
          <button style={{ border: "1px solid #999", background: "#eee", padding: "1px 6px" }}>Search</button>
        </div>
        <div className="flex gap-2 px-4 py-1" style={{ background: "#eef3f8", borderBottom: "1px solid #ccc" }}>
          {["Home", "Videos", "Categories", "Channels", "Community"].map((t) => (
            <span key={t} style={{ color: "#0033cc" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 p-4">
          {["Me at the zoo", "Evolution of Dance", "Numa Numa", "Lazy Sunday"].map((t) => (
            <div key={t}>
              <div
                className="mb-1 flex h-20 items-center justify-center text-[10px]"
                style={{ background: "#000", color: "#888", border: "1px solid #666" }}
              >
                ▶ 320×240
              </div>
              <div style={{ color: "#0033cc" }}>{t}</div>
              <div style={{ color: "#666" }}>Views: 12,041</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (year <= 2016) {
    return (
      <div className="font-era-10s text-[12px]" style={{ background: "#f9f9f9", color: "#333" }}>
        <div className="flex items-center gap-4 px-4 py-2" style={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
          <span className="font-bold">
            <span style={{ background: "#cc181e", color: "#fff", padding: "1px 5px", borderRadius: 3 }}>▶</span> YouTube
          </span>
          <input readOnly value="css float clearfix tutorial" className="flex-1 px-2 py-1" style={{ border: "1px solid #ccc" }} />
          <span style={{ color: "#167ac6" }}>Upload</span>
          <span style={{ color: "#167ac6" }}>Sign in</span>
        </div>
        <div className="flex">
          <div className="w-40 shrink-0 p-3" style={{ borderRight: "1px solid #e5e5e5" }}>
            {["What to Watch", "Subscriptions", "History", "Watch Later", "Trending"].map((t) => (
              <div key={t} className="py-1">
                {t}
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-3 gap-4 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="mb-1 h-20" style={{ background: "#d8d8d8" }} />
                <div className="font-bold">Video title number {i + 1}</div>
                <div style={{ color: "#777" }}>Channel · {120 + i * 33}K views</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const future = year >= 2024;
  return (
    <div className="font-era-now text-[12px]" style={{ background: "#0f0f0f", color: "#f1f1f1" }}>
      <div className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: "1px solid #272727" }}>
        <span className="font-semibold">
          <span style={{ background: "#ff0000", color: "#fff", padding: "1px 6px", borderRadius: 4 }}>▶</span> YouTube
        </span>
        <div className="flex-1 rounded-full px-4 py-1.5" style={{ background: "#121212", border: "1px solid #303030" }}>
          search
        </div>
        <span className="rounded-full px-3 py-1.5" style={{ background: "#272727" }}>
          Sign in
        </span>
      </div>
      <div className="flex gap-2 px-4 py-3">
        {(future ? ["All", "Shorts", "AI recaps", "Live", "Music"] : ["All", "Music", "Live", "Gaming"]).map((t, i) => (
          <span
            key={t}
            className="rounded-lg px-3 py-1"
            style={{ background: i === 0 ? "#f1f1f1" : "#272727", color: i === 0 ? "#0f0f0f" : "#f1f1f1" }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 px-4 pb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div
              className="mb-2 h-24 rounded-xl"
              style={{ background: future ? "linear-gradient(135deg,#2a3550,#3c2a44)" : "linear-gradient(135deg,#222,#333)" }}
            />
            <div className="font-medium">
              {future ? "AI-chaptered upload" : "Recommended video"} #{i + 1}
            </div>
            <div style={{ color: "#aaa" }}>Channel · {i + 2}M views</div>
          </div>
        ))}
      </div>
    </div>
  );
}