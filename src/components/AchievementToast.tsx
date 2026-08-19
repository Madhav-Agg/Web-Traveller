import { useEffect } from "react";
import { useAppState } from "@/lib/app-state";
import { ACHIEVEMENTS } from "@/lib/achievements-data";
import { playFx } from "@/lib/sound";

export function AchievementToast() {
  const { justUnlocked, clearUnlocked, settings } = useAppState();
  const badge = ACHIEVEMENTS.find((a) => a.id === justUnlocked);

  useEffect(() => {
    if (!badge) return;
    playFx("unlock", settings.sound, settings.volume);
    const t = setTimeout(clearUnlocked, 5000);
    return () => clearTimeout(t);
  }, [badge, clearUnlocked, settings.sound, settings.volume]);

  if (!badge) return null;

  return (
    <div className="animate-pop plate fixed bottom-6 left-1/2 z-50 w-[min(22rem,90vw)] -translate-x-1/2 rounded-2xl p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Badge unlocked</p>
      <p className="mt-1 font-display font-semibold">{badge.name}</p>
      <p className="text-sm text-muted-foreground">{badge.description}</p>
      <button
        onClick={clearUnlocked}
        className="press mt-2 font-mono text-[11px] text-muted-foreground hover:text-foreground"
      >
        dismiss
      </button>
    </div>
  );
}
