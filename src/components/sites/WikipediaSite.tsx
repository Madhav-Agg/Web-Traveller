/* Hand-built recreation. Literal colours are historical, not app theming. */
export function WikipediaSite({ year }: { year: number }) {
  if (year <= 2004) {
    return (
      <div className="font-era-90s p-6" style={{ background: "#fff", color: "#000" }}>
        <h1 className="text-2xl font-bold">Wikipedia -- The Free Encyclopedia</h1>
        <hr className="my-3" />
        <p className="text-sm">
          Welcome to Wikipedia! We are building an open-content encyclopedia in many languages. Anyone
          can edit any page. Please be bold.
        </p>
        <ul className="mt-4 list-disc pl-6 text-sm" style={{ color: "#0000cc" }}>
          <li><u>HomePage</u></li>
          <li><u>RecentChanges</u></li>
          <li><u>WikiPedia FAQ</u></li>
          <li><u>PolicyAndGuidelines</u></li>
        </ul>
        <p className="mt-6 text-xs">There are currently 19,712 articles.</p>
      </div>
    );
  }

  if (year <= 2018) {
    return (
      <div className="text-[13px]" style={{ background: "#f6f6f6", color: "#111" }}>
        <div className="flex">
          <div className="w-36 shrink-0 p-3" style={{ borderRight: "1px solid #a7d7f9" }}>
            <div className="mb-3 size-12 rounded-full" style={{ background: "#ccc" }} />
            {["Main page", "Contents", "Random article", "Donate", "Toolbox"].map((t) => (
              <div key={t} className="py-0.5 text-[11px]" style={{ color: "#0645ad" }}>
                {t}
              </div>
            ))}
          </div>
          <div className="flex-1" style={{ background: "#fff" }}>
            <div className="flex gap-3 px-4 pt-2 text-[11px]" style={{ background: "#f3f3f3", color: "#0645ad" }}>
              <span style={{ borderBottom: "2px solid #a7d7f9" }}>Article</span>
              <span>Discussion</span>
              <span>Edit</span>
              <span>History</span>
            </div>
            <div className="font-era-90s p-4">
              <h1 className="mb-1 text-2xl" style={{ borderBottom: "1px solid #aaa" }}>
                World Wide Web
              </h1>
              <p className="text-[11px] italic" style={{ color: "#555" }}>
                From Wikipedia, the free encyclopedia
              </p>
              <p className="mt-3 leading-6">
                The <b>World Wide Web</b> is an information system where documents are identified by{" "}
                <span style={{ color: "#0645ad" }}>URLs</span>, interlinked by{" "}
                <span style={{ color: "#0645ad" }}>hypertext</span>, and accessible over the{" "}
                <span style={{ color: "#0645ad" }}>Internet</span>.
              </p>
              <h2 className="mt-4 text-lg" style={{ borderBottom: "1px solid #aaa" }}>
                History
              </h2>
              <p className="mt-2 leading-6">
                Tim Berners-Lee proposed the system in 1989 at CERN; the first website went live in 1991.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-era-now text-[13px]" style={{ background: "#101418", color: "#eaecf0" }}>
      <div className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid #27292d" }}>
        <span>☰</span>
        <span className="font-era-90s text-lg">WIKIPEDIA</span>
        <div className="ml-auto w-64 rounded px-3 py-1.5" style={{ background: "#1b1f24", border: "1px solid #2e3237" }}>
          Search Wikipedia
        </div>
      </div>
      <div className="mx-auto flex max-w-3xl gap-6 p-6">
        <div className="w-40 shrink-0 text-[11px]" style={{ color: "#a2a9b1" }}>
          <p className="mb-2 font-semibold" style={{ color: "#eaecf0" }}>
            Contents
          </p>
          {["History", "Function", "Standards", "Privacy", "See also"].map((t) => (
            <div key={t} className="py-1">
              {t}
            </div>
          ))}
        </div>
        <div>
          <h1 className="font-era-90s mb-1 text-3xl">World Wide Web</h1>
          <p className="text-[11px]" style={{ color: "#a2a9b1" }}>
            From Wikipedia, the free encyclopedia
          </p>
          <p className="mt-4 leading-7" style={{ color: "#d4d7db" }}>
            The <b>World Wide Web</b> is an information system enabling documents and other resources to
            be accessed over the Internet — now read on a capped line length with a sticky table of
            contents and a native dark theme.
          </p>
        </div>
      </div>
    </div>
  );
}