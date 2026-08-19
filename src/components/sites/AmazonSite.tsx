/* Hand-built recreation. Literal colours are historical, not app theming. */
export function AmazonSite({ year }: { year: number }) {
  if (year <= 2004) {
    return (
      <div className="font-era-90s text-[12px]" style={{ background: "#fff", color: "#000" }}>
        <div className="p-3" style={{ background: "#9999cc" }}>
          <span className="text-2xl font-bold italic">amazon.com</span>
          <span className="ml-2 text-[11px]">Earth's Biggest Bookstore</span>
        </div>
        <div className="flex gap-2 p-2 text-[11px]" style={{ background: "#ffcc66" }}>
          {["BOOKS", "MUSIC", "DVD", "TOYS", "ELECTRONICS", "AUCTIONS"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="p-4">
          <p className="mb-2 font-bold">HELLO. WELCOME TO AMAZON.COM.</p>
          <p>
            Search for a book: <input readOnly value="Neuromancer" style={{ border: "2px inset #ccc" }} />{" "}
            <button style={{ border: "2px outset #eee", background: "#ddd" }}>Go</button>
          </p>
          <table className="mt-4 w-full text-[11px]" style={{ border: "1px solid #999" }}>
            <tbody>
              {["Today's featured book — 30% off", "Bestsellers updated hourly", "1-Click ordering"].map((t) => (
                <tr key={t}>
                  <td style={{ border: "1px solid #ccc", padding: 6, color: "#0000cc" }}>
                    <u>{t}</u>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (year <= 2018) {
    return (
      <div className="font-era-10s text-[12px]" style={{ background: "#fff", color: "#111" }}>
        <div className="flex items-center gap-3 p-2" style={{ background: "linear-gradient(#485769,#2b3946)", color: "#fff" }}>
          <span className="text-lg font-bold italic">amazon</span>
          <input readOnly value="usb 2.0 hub" className="flex-1 px-2 py-1" style={{ color: "#111" }} />
          <button style={{ background: "linear-gradient(#f8e3ad,#eeba37)", border: "1px solid #a88734", padding: "3px 10px", color: "#111" }}>
            Go
          </button>
          <span>Cart (3)</span>
        </div>
        <div className="flex gap-3 px-3 py-1 text-[11px]" style={{ background: "#e8eaed" }}>
          {["Shop by Department", "Today's Deals", "Gift Cards", "Prime", "Sell"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 p-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ border: "1px solid #ddd", padding: 6 }}>
              <div className="mb-2 h-16" style={{ background: "#f1f1f1" }} />
              <div style={{ color: "#0066c0" }}>Product name {i + 1}</div>
              <div style={{ color: "#b12704" }}>${(9.99 + i * 4).toFixed(2)}</div>
              <div className="text-[10px]" style={{ color: "#e47911" }}>★★★★☆</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="font-era-now text-[12px]" style={{ background: "#0f1111", color: "#e6e6e6" }}>
      <div className="flex items-center gap-4 px-4 py-3" style={{ background: "#131921" }}>
        <span className="text-lg font-semibold">amazon</span>
        <div className="flex-1 rounded-lg px-3 py-2" style={{ background: "#1c2530" }}>
          Search everything
        </div>
        <span className="rounded-lg px-3 py-2" style={{ background: "#febd69", color: "#131921" }}>
          Cart
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-3" style={{ background: "#1a1d1e" }}>
            <div className="mb-3 h-20 rounded-xl" style={{ background: "linear-gradient(135deg,#22303a,#2c2438)" }} />
            <div className="font-medium">Recommended item {i + 1}</div>
            <div style={{ color: "#ffa41c" }}>★★★★☆ · AI review digest</div>
            <div className="mt-1 text-base font-semibold">${(19 + i * 7).toFixed(2)}</div>
            <div className="text-[11px]" style={{ color: "#7fd4a0" }}>Same-day delivery</div>
          </div>
        ))}
      </div>
    </div>
  );
}