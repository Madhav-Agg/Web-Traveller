import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ACHIEVEMENTS } from "./achievements-data";
import { TOTAL_ERAS } from "./timeline-data";

export type ThemeName = "light" | "dark";

export interface Settings {
  theme: ThemeName;
  reducedMotion: boolean;
  scanlines: boolean;
  customCursor: boolean;
  sound: boolean;
  volume: number;
  fontScale: number;
  highContrast: boolean;
}

const DEFAULTS: Settings = {
  theme: "light",
  reducedMotion: false,
  scanlines: true,
  customCursor: true,
  sound: false,
  volume: 0.4,
  fontScale: 1,
  highContrast: false,
};

const SETTINGS_KEY = "itm.settings.v2";
const VISITS_KEY = "itm.visits.v2";
const UNLOCKED_KEY = "itm.unlocked.v2";

interface Ctx {
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
  visits: string[];
  visit: (siteId: string, year: number) => void;
  hasVisited: (siteId: string, year: number) => boolean;
  progressPct: number;
  unlocked: string[];
  justUnlocked: string | null;
  clearUnlocked: () => void;
  hydrated: boolean;
}

const AppCtx = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [visits, setVisits] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) setSettings({ ...DEFAULTS, ...JSON.parse(s) });
      const v = localStorage.getItem(VISITS_KEY);
      if (v) setVisits(JSON.parse(v));
      const u = localStorage.getItem(UNLOCKED_KEY);
      if (u) setUnlocked(JSON.parse(u));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  useEffect(() => {
    if (!hydrated || typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", settings.theme === "dark");
    root.classList.toggle("no-scanlines", !settings.scanlines);
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    root.classList.toggle("high-contrast", settings.highContrast);
    root.style.fontSize = `${16 * settings.fontScale}px`;
  }, [settings, hydrated]);

  const setSetting = useCallback<Ctx["setSetting"]>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => setSettings(DEFAULTS), []);

  const visit = useCallback(
    (siteId: string, year: number) => {
      const key = `${siteId}:${year}`;
      setVisits((prev) => {
        if (prev.includes(key)) return prev;
        const next = [...prev, key];
        try {
          localStorage.setItem(VISITS_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    if (!hydrated || visits.length === 0) return;
    const earned = ACHIEVEMENTS.filter((a) => {
      const { current, target } = a.progress(visits);
      return current >= target;
    }).map((a) => a.id);
    const fresh = earned.filter((id) => !unlocked.includes(id));
    if (fresh.length) {
      const next = [...unlocked, ...fresh];
      setUnlocked(next);
      setJustUnlocked(fresh[0]);
      try {
        localStorage.setItem(UNLOCKED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    }
  }, [visits, unlocked, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      settings,
      setSetting,
      resetSettings,
      visits,
      visit,
      hasVisited: (s, y) => visits.includes(`${s}:${y}`),
      progressPct: Math.round((visits.length / TOTAL_ERAS) * 100),
      unlocked,
      justUnlocked,
      clearUnlocked: () => setJustUnlocked(null),
      hydrated,
    }),
    [settings, setSetting, resetSettings, visits, visit, unlocked, justUnlocked, hydrated],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
