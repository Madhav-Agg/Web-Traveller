export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  /** returns 0..1 */
  progress: (visits: string[]) => { current: number; target: number };
}

const decadeOf = (year: number) => Math.floor(year / 10) * 10;
const parse = (key: string) => {
  const [site, y] = key.split(":");
  return { site, year: Number(y) };
};

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "archaeologist",
    name: "Internet Archaeologist",
    description: "Visit 10 historical website eras.",
    progress: (v) => ({ current: Math.min(v.length, 10), target: 10 }),
  },
  {
    id: "time-traveler",
    name: "Time Traveler",
    description: "Explore 4 different decades.",
    progress: (v) => ({
      current: new Set(v.map((k) => decadeOf(parse(k).year))).size,
      target: 4,
    }),
  },
  {
    id: "browser-survivor",
    name: "Browser Survivor",
    description: "Load a page from before 2000.",
    progress: (v) => ({
      current: v.some((k) => parse(k).year < 2000) ? 1 : 0,
      target: 1,
    }),
  },
  {
    id: "social-historian",
    name: "Social Historian",
    description: "Explore Facebook, MySpace and Reddit.",
    progress: (v) => {
      const s = new Set(v.map((k) => parse(k).site));
      return {
        current: ["facebook", "myspace", "reddit"].filter((x) => s.has(x)).length,
        target: 3,
      };
    },
  },
  {
    id: "google-scholar",
    name: "Google Scholar",
    description: "Explore every Google era.",
    progress: (v) => ({
      current: new Set(v.filter((k) => parse(k).site === "google")).size,
      target: 5,
    }),
  },
  {
    id: "retro-addict",
    name: "Retro Addict",
    description: "Explore 10 pages from before 2010.",
    progress: (v) => ({
      current: Math.min(v.filter((k) => parse(k).year < 2010).length, 10),
      target: 10,
    }),
  },
  {
    id: "curator",
    name: "Museum Curator",
    description: "Visit at least one era of 8 different websites.",
    progress: (v) => ({
      current: Math.min(new Set(v.map((k) => parse(k).site)).size, 8),
      target: 8,
    }),
  },
  {
    id: "futurist",
    name: "Futurist",
    description: "Visit five 2026 recreations.",
    progress: (v) => ({
      current: Math.min(v.filter((k) => parse(k).year >= 2026).length, 5),
      target: 5,
    }),
  },
];
