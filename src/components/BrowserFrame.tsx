import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Home, RotateCw, Lock, Star, Plus } from "lucide-react";
import type { BrowserKind } from "@/lib/timeline-data";
import { useAppState } from "@/lib/app-state";
import { playFx } from "@/lib/sound";

/*
 * Era-accurate browser chrome. These recreations intentionally use literal
 * period colours — they are historical artefacts, not app theming.
 */
const CHROME: Record<
  BrowserKind,
  {
    label: string;
    bar: string;
    text: string;
    field: string;
    fieldText: string;
    border: string;
    radius: string;
    font: string;
    tab: string;
    tabActive: string;
  }
> = {
  netscape: {
    label: "Netscape Navigator 4",
    bar: "linear-gradient(#d4d0c8, #b8b4ac)",
    text: "#1a1a1a",
    field: "#ffffff",
    fieldText: "#000080",
    border: "#7a7a7a",
    radius: "0px",
    font: '"Times New Roman", serif',
    tab: "#c3bfb7",
    tabActive: "#e6e2da",
  },
  ie: {
    label: "Internet Explorer 6",
    bar: "linear-gradient(#3f8ce8, #1f56c4)",
    text: "#ffffff",
    field: "#ffffff",
    fieldText: "#111111",
    border: "#0b3d91",
    radius: "0px",
    font: "Tahoma, Verdana, sans-serif",
    tab: "#2f6fd0",
    tabActive: "#ffffff",
  },
  firefox: {
    label: "Mozilla Firefox 3",
    bar: "linear-gradient(#f2f0ee, #d9d5d0)",
    text: "#2b2b2b",
    field: "#ffffff",
    fieldText: "#333333",
    border: "#9a948c",
    radius: "4px",
    font: "Verdana, sans-serif",
    tab: "#cfc9c2",
    tabActive: "#ffffff",
  },
  chrome: {
    label: "Google Chrome",
    bar: "linear-gradient(#e8eaed, #dee1e6)",
    text: "#3c4043",
    field: "#ffffff",
    fieldText: "#202124",
    border: "#c6c9cd",
    radius: "999px",
    font: "Arial, sans-serif",
    tab: "#dee1e6",
    tabActive: "#ffffff",
  },
  edge: {
    label: "Edge / Chromium 2026",
    bar: "linear-gradient(#22252a, #17191d)",
    text: "#e6e8eb",
    field: "#2c3037",
    fieldText: "#e6e8eb",
    border: "#3a3f47",
    radius: "999px",
    font: '"Inter", system-ui, sans-serif',
    tab: "#2a2e34",
    tabActive: "#33383f",
  },
};

const LOAD_MS: Record<BrowserKind, number> = {
  netscape: 2200,
  ie: 1500,
  firefox: 950,
  chrome: 600,
  edge: 380,
};

export function BrowserFrame({
  kind,
  url,
  title,
  children,
  compact = false,
  bookmarks = ["Bookmarks", "Web Directory", "Free Email"],
  onHome,
  onBack,
  onForward,
  canBack = false,
  canForward = false,
  reloadKey,
  className = "",
}: {
  kind: BrowserKind;
  url: string;
  title: string;
  children: ReactNode;
  compact?: boolean;
  bookmarks?: string[];
  onHome?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  canBack?: boolean;
  canForward?: boolean;
  reloadKey?: string | number;
  className?: string;
}) {
  const c = CHROME[kind];
  const legacy = kind === "netscape" || kind === "ie";
  const { settings } = useAppState();
  const [progress, setProgress] = useState(100);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLoad = (withSound = false) => {
    if (settings.reducedMotion) return;
    if (withSound) playFx(kind === "netscape" ? "dialup" : "refresh", settings.sound, settings.volume);
    setProgress(0);
    if (timer.current) clearInterval(timer.current);
    const total = LOAD_MS[kind];
    const step = 60;
    let elapsed = 0;
    timer.current = setInterval(() => {
      elapsed += step;
      const pct = Math.min(100, Math.round((elapsed / total) * 100 + Math.random() * 6));
      setProgress(pct);
      if (pct >= 100 && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, step);
  };

  useEffect(() => {
    startLoad(false);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, kind]);

  const loading = progress < 100;

  const btn =
    "inline-flex size-6 items-center justify-center rounded press disabled:opacity-35";

  return (
    <div
      className={`overflow-hidden border shadow-[var(--shadow-lift)] ${className}`}
      style={{ borderRadius: legacy ? 3 : 14, borderColor: c.border }}
    >
      {/* title bar + tabs */}
      <div
        className="flex items-center gap-2 px-2.5 pt-2"
        style={{ background: c.bar, color: c.text, fontFamily: c.font }}
      >
        <div className="flex items-center gap-1.5">
          {legacy ? (
            <>
              <LegacyBox glyph="_" />
              <LegacyBox glyph="□" />
              <LegacyBox glyph="✕" />
            </>
          ) : (
            ["#ff5f57", "#febc2e", "#28c840"].map((dot) => (
              <span key={dot} className="inline-block size-3 rounded-full" style={{ background: dot }} />
            ))
          )}
        </div>
        <div className="flex min-w-0 flex-1 items-end gap-1">
          <span
            className="max-w-[16rem] truncate px-3 py-1 text-[11px] font-medium"
            style={{
              background: c.tabActive,
              color: legacy ? "#111" : c.fieldText,
              borderTopLeftRadius: legacy ? 0 : 8,
              borderTopRightRadius: legacy ? 0 : 8,
              border: `1px solid ${c.border}`,
              borderBottom: "none",
            }}
          >
            {loading ? "Loading…" : title}
          </span>
          <span
            className="hidden max-w-[10rem] truncate px-3 py-1 text-[11px] opacity-70 sm:inline"
            style={{
              background: c.tab,
              color: c.text,
              borderTopLeftRadius: legacy ? 0 : 8,
              borderTopRightRadius: legacy ? 0 : 8,
            }}
          >
            New Tab
          </span>
          <span className="opacity-60" aria-hidden>
            <Plus className="size-3" />
          </span>
        </div>
        <span className="ml-auto hidden text-[10px] uppercase tracking-widest opacity-60 md:inline">
          {c.label}
        </span>
      </div>

      {/* toolbar */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ background: c.bar, fontFamily: c.font, color: c.text }}
      >
        <button className={btn} onClick={onBack} disabled={!canBack} aria-label="Back">
          <ArrowLeft className="size-3.5" />
        </button>
        <button className={btn} onClick={onForward} disabled={!canForward} aria-label="Forward">
          <ArrowRight className="size-3.5" />
        </button>
        <button className={btn} onClick={() => startLoad(true)} aria-label="Refresh page">
          <RotateCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
        <button className={btn} onClick={onHome} aria-label="Home">
          <Home className="size-3.5" />
        </button>
        <div
          className="flex min-w-0 flex-1 items-center gap-1.5 px-2.5 py-1 text-[11px]"
          style={{
            background: c.field,
            color: c.fieldText,
            border: `1px solid ${c.border}`,
            borderRadius: c.radius,
          }}
        >
          {url.startsWith("https") ? <Lock className="size-3 shrink-0 opacity-70" /> : null}
          <span className="truncate">{url}</span>
        </div>
        <Star className="size-3.5 shrink-0 opacity-55" aria-hidden />
      </div>

      {/* bookmarks bar */}
      <div
        className="flex items-center gap-3 overflow-hidden px-3 pb-1.5 text-[10px]"
        style={{ background: c.bar, color: c.text, fontFamily: c.font }}
      >
        {bookmarks.map((b) => (
          <span key={b} className="truncate opacity-70">
            {b}
          </span>
        ))}
      </div>

      {/* loading indicator, era-specific */}
      <LoadingBar kind={kind} progress={progress} />

      <div
        className={`${compact ? "h-[21rem]" : "h-[30rem] sm:h-[34rem]"} overflow-y-auto`}
        style={{ background: kind === "edge" ? "#0f1115" : "#ffffff" }}
      >
        {loading && progress < 55 ? <EraLoadingScreen kind={kind} progress={progress} /> : children}
      </div>
    </div>
  );
}

function LoadingBar({ kind, progress }: { kind: BrowserKind; progress: number }) {
  if (progress >= 100) return <div className="h-0.5" style={{ background: "transparent" }} />;
  const color =
    kind === "netscape" ? "#000080" : kind === "ie" ? "#2f6fd0" : kind === "firefox" ? "#e66000" : "#1a73e8";
  return (
    <div className="h-0.5 w-full" style={{ background: "rgba(0,0,0,.12)" }}>
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%`, background: color }}
      />
    </div>
  );
}

function EraLoadingScreen({ kind, progress }: { kind: BrowserKind; progress: number }) {
  if (kind === "netscape") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#c0c0c0] font-era-90s text-[#111]">
        <p className="text-sm">Connecting to host… {progress}%</p>
        <div className="h-4 w-64 border border-[#7a7a7a] bg-white p-0.5">
          <div className="h-full bg-[#000080]" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[11px]">Transferring data at 28.8 kbps</p>
      </div>
    );
  }
  if (kind === "ie") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-white font-era-00s text-[#333]">
        <div className="h-3 w-56 border border-[#8aa8d8] bg-[#eef3fb]">
          <div className="h-full bg-gradient-to-b from-[#6ba4f0] to-[#1f56c4]" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[11px]">Opening page… please wait</p>
      </div>
    );
  }
  if (kind === "firefox") {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="size-8 animate-spin rounded-full border-2 border-[#d9d5d0] border-t-[#e66000]" />
      </div>
    );
  }
  return (
    <div className={`h-full space-y-3 p-6 ${kind === "edge" ? "bg-[#0f1115]" : "bg-white"}`}>
      {[80, 55, 92, 40, 70].map((w, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded"
          style={{ width: `${w}%`, background: kind === "edge" ? "#22262d" : "#eceff3" }}
        />
      ))}
    </div>
  );
}

function LegacyBox({ glyph }: { glyph: string }) {
  return (
    <span
      className="inline-flex size-4 items-center justify-center text-[9px] leading-none"
      style={{ background: "#d4d0c8", border: "1px solid #6f6f6f", color: "#111" }}
    >
      {glyph}
    </span>
  );
}
