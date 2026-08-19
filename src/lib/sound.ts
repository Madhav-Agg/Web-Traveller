/** Tiny synthesised sound effects — no assets, no network. */
type Fx = "click" | "type" | "refresh" | "dialup" | "unlock" | "static";

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, dur: number, vol: number, type: OscillatorType = "square", delay = 0) {
  const a = audio();
  if (!a) return;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = vol;
  osc.connect(gain).connect(a.destination);
  const t = a.currentTime + delay;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.start(t);
  osc.stop(t + dur);
}

export function playFx(fx: Fx, enabled: boolean, volume = 0.4) {
  if (!enabled) return;
  const v = Math.max(0, Math.min(1, volume)) * 0.12;
  switch (fx) {
    case "click":
      tone(880, 0.05, v, "square");
      break;
    case "type":
      tone(1400 + Math.random() * 300, 0.02, v * 0.6, "square");
      break;
    case "refresh":
      tone(420, 0.08, v, "triangle");
      tone(620, 0.08, v, "triangle", 0.07);
      break;
    case "dialup":
      [980, 1180, 640, 1500, 820].forEach((f, i) => tone(f, 0.16, v * 0.8, "sawtooth", i * 0.15));
      break;
    case "unlock":
      [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.16, v, "triangle", i * 0.08));
      break;
    case "static":
      for (let i = 0; i < 8; i++) tone(200 + Math.random() * 2000, 0.02, v * 0.4, "sawtooth", i * 0.02);
      break;
  }
}
