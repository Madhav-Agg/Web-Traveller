export interface InternetEvent {
  /** 1-12 */
  month: number;
  day: number;
  year: number;
  title: string;
  body: string;
  /** optional site id to jump to */
  site?: string;
  jumpYear?: number;
  tags: string[];
}

export const EVENTS: InternetEvent[] = [
  { month: 1, day: 15, year: 2001, title: "Wikipedia goes live", body: "Jimmy Wales and Larry Sanger launch a wiki side-project that outlives the encyclopedia it was meant to feed.", site: "wikipedia", jumpYear: 2001, tags: ["wikipedia", "knowledge", "wiki"] },
  { month: 2, day: 4, year: 2004, title: "Thefacebook launches", body: "A dorm-room directory opens to Harvard students with a .edu email requirement.", site: "facebook", jumpYear: 2004, tags: ["facebook", "social"] },
  { month: 2, day: 14, year: 2005, title: "YouTube is registered", body: "Three PayPal employees register youtube.com as a video dating site.", site: "youtube", jumpYear: 2005, tags: ["youtube", "video"] },
  { month: 3, day: 21, year: 2006, title: "The first tweet", body: "Short-form status updates begin, and the timeline is born.", tags: ["twitter", "social"] },
  { month: 4, day: 1, year: 2004, title: "Gmail launches", body: "A gigabyte of free storage announced on April Fools' Day. Nobody believed it.", site: "google", jumpYear: 2004, tags: ["google", "gmail", "email"] },
  { month: 4, day: 10, year: 2008, title: "GitHub opens to the public", body: "Git gets a social layer and the pull request becomes a unit of culture.", site: "github", jumpYear: 2008, tags: ["github", "git", "code"] },
  { month: 5, day: 25, year: 2010, title: "Responsive web design is named", body: "Ethan Marcotte publishes the article that ends the m-dot website.", tags: ["responsive", "css", "design"] },
  { month: 6, day: 23, year: 2005, title: "Reddit posts its first link", body: "A Lisp-powered link list with two arrows becomes the front page of the internet.", site: "reddit", jumpYear: 2005, tags: ["reddit", "social"] },
  { month: 6, day: 29, year: 2007, title: "The iPhone ships", body: "A real browser in a pocket forces the whole web to rethink layout.", site: "apple", jumpYear: 2007, tags: ["apple", "iphone", "mobile"] },
  { month: 7, day: 5, year: 1994, title: "Amazon is founded", body: "An online bookstore opens in a garage in Bellevue, Washington.", site: "amazon", jumpYear: 1999, tags: ["amazon", "shopping"] },
  { month: 8, day: 1, year: 2003, title: "MySpace launches", body: "Customisable profiles teach a generation to write CSS badly and joyfully.", site: "myspace", jumpYear: 2003, tags: ["myspace", "social"] },
  { month: 8, day: 9, year: 1995, title: "Netscape goes public", body: "The IPO that started the dot-com boom, and the browser wars with it.", tags: ["netscape", "browser", "1995"] },
  { month: 8, day: 15, year: 2005, title: "Google Talk arrives", body: "Chat moves into the browser tab and never leaves.", site: "google", jumpYear: 2004, tags: ["google", "chat"] },
  { month: 8, day: 24, year: 1995, title: "Windows 95 launches", body: "The Start button, the taskbar, and a modem in every home.", site: "microsoft", jumpYear: 1995, tags: ["windows", "microsoft", "os", "windows xp"] },
  { month: 9, day: 2, year: 2008, title: "Google Chrome ships", body: "A fast JavaScript engine makes web applications genuinely viable.", tags: ["chrome", "browser", "javascript"] },
  { month: 9, day: 4, year: 1998, title: "Google is incorporated", body: "PageRank leaves Stanford and gets a garage in Menlo Park.", site: "google", jumpYear: 1998, tags: ["google", "search"] },
  { month: 10, day: 17, year: 1990, title: "IMDb begins", body: "A Usenet script for tracking film credits becomes the world's movie ledger.", site: "imdb", jumpYear: 1996, tags: ["imdb", "film"] },
  { month: 10, day: 23, year: 2001, title: "The iPod is announced", body: "1,000 songs in your pocket, and a scroll wheel to find them.", site: "apple", jumpYear: 2001, tags: ["apple", "ipod"] },
  { month: 11, day: 10, year: 2004, title: "Firefox 1.0 released", body: "Tabs, popup blocking, and the first real dent in Internet Explorer.", tags: ["firefox", "browser", "internet explorer"] },
  { month: 11, day: 30, year: 2022, title: "Generative AI goes mainstream", body: "A chat box reorganises how people expect to get answers.", tags: ["ai", "chat", "2026"] },
  { month: 12, day: 25, year: 1990, title: "The first web page", body: "Tim Berners-Lee serves the first page over HTTP at CERN.", tags: ["www", "http", "html"] },
  { month: 12, day: 8, year: 2020, title: "GitHub dark mode ships", body: "The last big holdout gets a dark theme, and design tokens win.", site: "github", jumpYear: 2020, tags: ["github", "dark mode"] },
];

export function eventForToday(now = new Date()): InternetEvent {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const exact = EVENTS.find((e) => e.month === m && e.day === d);
  if (exact) return exact;
  const sameMonth = EVENTS.filter((e) => e.month === m);
  const pool = sameMonth.length ? sameMonth : EVENTS;
  return pool[(d + m) % pool.length];
}

export const DECADES = [
  {
    id: "1990s",
    label: "The 1990s",
    heading: "Documents pretending to be pages",
    body: "Grey backgrounds, blue links and tables holding everything together. Bandwidth was the design constraint, and every image had a visible weight.",
    traits: ["Table layouts", "Web-safe colours", "Under construction GIFs", "Times New Roman"],
  },
  {
    id: "2000s",
    label: "The 2000s",
    heading: "Gradients, gloss and the portal",
    body: "CSS arrived, then AJAX. Pages got rounded corners, drop shadows and a reflection under every logo. Density was a virtue.",
    traits: ["Gradient buttons", "Verdana and Tahoma", "AJAX", "Rounded corners"],
  },
  {
    id: "2010s",
    label: "The 2010s",
    heading: "Flat, responsive, and everywhere",
    body: "Mobile forced restraint. Skeuomorphism died, grids became fluid, and design systems turned interface work into engineering.",
    traits: ["Flat design", "Media queries", "Card layouts", "Helvetica-style type"],
  },
  {
    id: "2020s",
    label: "The 2020s",
    heading: "Dark, tokenised and generated",
    body: "Themes became system preferences, components became contracts, and the first sentence on the page is increasingly written by a model.",
    traits: ["Design tokens", "Dark mode", "Container queries", "AI interfaces"],
  },
];
