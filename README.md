# 🌐 Internet Time Machine

### Travel through the evolution of the web.

**Internet Time Machine** is an interactive digital museum of the internet that lets you explore how famous websites, browsers, interfaces, and web design evolved across different eras.

Instead of looking at archived screenshots, you can actually **interact with recreated versions of historical websites**.

> From the simple web of the 1990s to today's AI-driven interfaces, explore how the internet changed.

---

## ✨ What is it?

The internet looked very different 20 or 30 years ago.

Internet Time Machine lets you travel through those eras and experience that evolution firsthand.

Explore websites like:

* 🔎 Google
* ▶️ YouTube
* 📚 Wikipedia
* 🛒 Amazon
* 👥 Facebook
* 💬 Reddit
* 🎬 Netflix
* 💻 GitHub
* 🟣 Yahoo
* 🍎 Apple
* 🪟 Microsoft
* 🎵 MySpace

Each website is recreated as an interactive React experience rather than being displayed as a screenshot.

---

## 🚀 Features

### 🕰️ Interactive Timeline

Travel through different periods of internet history.

```text
1995 → 2000 → 2005 → 2010 → 2015 → 2020 → 2026
```

Drag through the timeline and watch interfaces evolve between eras.

---

### 🌐 Interactive Website Recreations

Explore historical versions of popular websites.

You can interact with elements such as:

* Search bars
* Buttons
* Navigation
* Menus
* Fake pages
* Comments
* Products
* Posts
* Links
* Dialogs

The goal is to make every recreation feel like an actual website rather than a static mockup.

---

### 🖥️ Historical Browsers

Websites are displayed inside recreated browser environments.

Depending on the era, the browser experience can change to resemble:

* Internet Explorer
* Netscape
* Firefox
* Chrome
* Safari
* Edge

Browser chrome, loading states, buttons, typography, and visual details evolve with the timeline.

---

### 🔄 Morph Mode

Don't just jump between years.

Watch the interface **transform**.

For example:

```text
Google 1998
      ↓
Typography changes
      ↓
Spacing changes
      ↓
Navigation evolves
      ↓
UI becomes responsive
      ↓
Google 2026
```

Logos, layouts, colors, buttons, menus, and other interface elements gradually evolve.

---

### ⚖️ Compare Mode

Compare two different eras side by side.

```text
┌─────────────────┬─────────────────┐
│    Google 2000  │    Google 2026  │
│                 │                 │
│    Old Web      │    Modern Web   │
│                 │                 │
└─────────────────┴─────────────────┘
```

Use the comparison slider to discover how:

* Typography changed
* Layouts evolved
* Colors changed
* Navigation changed
* Interactions improved
* Responsive design emerged

---

### 🧠 Learning Mode

Understand **why** the web changed.

Explore topics such as:

* HTML
* CSS
* JavaScript
* AJAX
* HTML5
* CSS3
* Flexbox
* CSS Grid
* Responsive Design
* Material Design
* Accessibility
* Web Components

Each historical change is connected to the technology and design trends that enabled it.

---

### 🏆 Achievements

Explore the internet and unlock achievements.

Examples:

**Internet Archaeologist**
Visit 10 historical websites.

**Time Traveler**
Explore multiple decades.

**Browser Survivor**
Experience Internet Explorer.

**Social Historian**
Explore Facebook, Reddit and MySpace.

**Google Scholar**
Explore every Google era.

---

### 🎲 Surprise Me

Don't know where to start?

Hit **Surprise Me**.

The Time Machine randomly selects:

```text
Website
+
Year
+
Era
+
Browser
```

and drops you directly into that moment in internet history.

---

### 🥚 Hidden Easter Eggs

The internet wouldn't be complete without hidden secrets.

Discover:

* Konami Code
* Secret years
* Hidden interactions
* Developer Mode
* Retro browser surprises
* Secret pages
* Custom 404 experiences

Some of them aren't supposed to be easy to find.

---

### 🔊 Era-Specific Sounds

Optional sound effects can recreate the feeling of using the internet in different periods.

Examples:

* Dial-up
* Keyboard typing
* Mouse clicks
* Browser refresh
* CRT static
* Windows startup
* Loading sounds
* Achievement sounds

Sound can be disabled at any time.

---

### 🎨 Multiple Themes

Choose how you want to experience the Time Machine.

* Light
* Dark
* CRT
* Retro
* Terminal
* Matrix
* Windows XP
* Pixel

---

## 🧭 Internet History

The project explores the transition from:

```text
Static Web
     ↓
Personal Web
     ↓
Web 2.0
     ↓
Social Web
     ↓
Mobile Web
     ↓
Responsive Web
     ↓
Modern Web
     ↓
AI-Native Web
```

The goal isn't simply to show what websites looked like.

It is to show **how the way we use the internet changed.**

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* TypeScript / JavaScript
* Tailwind CSS
* Framer Motion
* GSAP
* React Router

### Storage

* Local Storage

Used for:

* Progress
* Achievements
* Preferences
* Theme settings
* Exploration history

### Deployment

* Vercel

---

## 🏗️ Architecture

The project is designed to make adding new websites and historical eras straightforward.

```text
src/
│
├── components/
│   ├── Browser/
│   ├── Timeline/
│   ├── Navbar/
│   ├── Portal/
│   ├── FactsPanel/
│   ├── Compare/
│   ├── Achievements/
│   └── Settings/
│
├── pages/
│   ├── Home/
│   ├── Timeline/
│   ├── Website/
│   ├── Compare/
│   └── Learn/
│
├── websites/
│   ├── Google/
│   ├── YouTube/
│   ├── Wikipedia/
│   ├── Amazon/
│   ├── Facebook/
│   ├── Reddit/
│   ├── Netflix/
│   ├── GitHub/
│   ├── Yahoo/
│   ├── Apple/
│   ├── Microsoft/
│   └── MySpace/
│
├── data/
│   ├── websites/
│   ├── eras/
│   ├── events/
│   ├── facts/
│   └── achievements/
│
├── animations/
├── hooks/
├── utils/
├── assets/
├── fonts/
└── styles/
```

---

## 🎯 Design Philosophy

Internet Time Machine is designed around one idea:

> **It should feel like you're actually using the internet from another era.**

Modern interfaces should feel:

* Clean
* Human
* Minimal
* Polished

Historical interfaces should feel:

* Authentic
* Imperfect
* Nostalgic
* Era-appropriate

The project intentionally avoids making everything look like a futuristic AI dashboard.

Instead, typography, colors, spacing, browser chrome, loading states, cursors, animations, and interactions change according to the era being explored.

---

## 🚫 No Screenshots

A core rule of the project:

**Historical websites are recreated with code.**

No archived screenshots are used as the actual interface.

Each experience is built using:

```text
React
+
HTML
+
CSS
+
JavaScript
```

This allows users to interact with the recreated interfaces rather than simply looking at an image.

---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/internet-time-machine.git
```

### 2. Navigate into the project

```bash
cd internet-time-machine
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available at the local development URL shown in your terminal.

---

## 📸 Screenshots

Add screenshots or a short GIF here once the redesigned version is ready.

```text
[ Landing Page ]

[ Interactive Timeline ]

[ Google 1998 vs Google 2026 ]

[ Historical Browser ]

[ Website Library ]
```

A short demo GIF is especially useful here because the main selling point of this project is interaction.

---

## 🗺️ Roadmap

### Completed

* [x] Interactive timeline concept
* [x] Historical website recreations
* [x] Browser recreation
* [x] Era-based design
* [x] Compare mode
* [x] Historical facts
* [x] Achievement system
* [x] Themes

### In Progress

* [ ] More website recreations
* [ ] More historical eras
* [ ] Improved website interactions
* [ ] Better browser simulation
* [ ] More Easter eggs
* [ ] Improved mobile experience
* [ ] More historical events

### Future

* [ ] AI-powered historical explanations
* [ ] Interactive quizzes
* [ ] Community-created recreations
* [ ] User accounts
* [ ] Saved timelines
* [ ] Daily internet history challenge
* [ ] Shareable comparisons
* [ ] Speedrun mode

---

## 🤝 Contributing

Contributions are welcome.

If you want to add a new website or historical era:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-website
```

3. Add the recreation and relevant historical data
4. Test the experience
5. Commit your changes

```bash
git commit -m "Add historical recreation"
```

6. Push your branch

```bash
git push origin feature/new-website
```

7. Open a Pull Request

---

## ⚠️ Disclaimer

Internet Time Machine is an educational and experimental project focused on recreating the visual and interactive evolution of the web.

It is **not affiliated with or endorsed by Google, YouTube, Amazon, Wikipedia, Facebook, Reddit, Netflix, GitHub, Apple, Microsoft, Yahoo, MySpace, or any other referenced brand.**

All trademarks and brand names belong to their respective owners.

---

## 🌟 Why I Built This

The web changes so quickly that it's easy to forget what it used to feel like.

Websites that once defined how we used the internet have disappeared, changed completely, or become almost unrecognizable.

I wanted to build something that lets people do more than read about that history.

I wanted them to **experience it.**

---

## 📜 License

This project is intended for educational and experimental purposes.

Add your preferred license here, such as MIT, before publishing the repository.

---

<p align="center">

### 🌐 Travel through the web.

### ⏳ Explore its history.

### 🖱️ Experience how it changed.

**Internet Time Machine**

</p>
