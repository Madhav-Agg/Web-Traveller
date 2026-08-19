import { useAppState, type Settings } from "@/lib/app-state";

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`press mt-0.5 h-6 w-11 shrink-0 rounded-full border ${
        on ? "border-primary bg-primary" : "border-border bg-secondary"
      }`}
    >
      <span
        className={`block size-4 rounded-full bg-card transition-transform ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, setSetting, resetSettings } = useAppState();
  if (!open) return null;

  const flag = (k: keyof Settings) => settings[k] as boolean;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close settings"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
      />
      <aside className="animate-rise absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Exhibit settings</h2>
          <button onClick={onClose} className="press font-mono text-xs text-muted-foreground hover:text-foreground">
            close ✕
          </button>
        </div>

        <div className="mt-4 divide-y divide-border">
          <Row label="Dark gallery" hint="Switch the museum lighting.">
            <Toggle
              on={settings.theme === "dark"}
              onChange={(v) => setSetting("theme", v ? "dark" : "light")}
            />
          </Row>
          <Row label="CRT scanlines" hint="Overlay on pre-2007 recreations.">
            <Toggle on={flag("scanlines")} onChange={(v) => setSetting("scanlines", v)} />
          </Row>
          <Row label="Period sound" hint="Dial-up, clicks and modem noise.">
            <Toggle on={flag("sound")} onChange={(v) => setSetting("sound", v)} />
          </Row>
          <Row label="Era cursors" hint="Use the pixel arrow inside old pages.">
            <Toggle on={flag("customCursor")} onChange={(v) => setSetting("customCursor", v)} />
          </Row>
          <Row label="Reduced motion" hint="Disable flicker and transitions.">
            <Toggle on={flag("reducedMotion")} onChange={(v) => setSetting("reducedMotion", v)} />
          </Row>
          <Row label="High contrast" hint="Stronger text and borders.">
            <Toggle on={flag("highContrast")} onChange={(v) => setSetting("highContrast", v)} />
          </Row>

          <div className="py-4">
            <p className="text-sm font-medium">Volume</p>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.volume}
              aria-label="Volume"
              onChange={(e) => setSetting("volume", Number(e.target.value))}
              className="mt-2 h-1.5 w-full accent-primary"
            />
          </div>

          <div className="py-4">
            <p className="text-sm font-medium">Text size</p>
            <div className="mt-2 flex gap-2">
              {[0.9, 1, 1.15].map((f) => (
                <button
                  key={f}
                  onClick={() => setSetting("fontScale", f)}
                  className={`press rounded-full border px-3 py-1 font-mono text-xs ${
                    settings.fontScale === f
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {f === 1 ? "Default" : f < 1 ? "Small" : "Large"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={resetSettings}
          className="press mt-6 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          reset to defaults
        </button>
      </aside>
    </div>
  );
}
