# 🎂 Birthday Wish — Interactive Celebration Web App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-SSR%20%2F%20Routing-ff4154)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A modern, highly interactive, and easily customizable birthday celebration web application built with **React**, **TanStack Start**, and **Tailwind CSS**. 

Designed to surprise loved ones with immersive celebrations featuring interactive birthday candles, pop-able floating balloons, dynamic canvas fireworks, confetti storms, customizable note cards, and a revealable heartfelt letter.

---

## ✨ Features

- 🎂 **Interactive Cake & Candles**: Blow out or tap the candles to trigger celebration effects.
- 🎈 **Pop-able Floating Balloons**: Realistic floating physics with interactive tap-to-pop sound/action.
- 🎆 **Full-screen Canvas Fireworks**: Smooth 60fps canvas-rendered firework bursts.
- 🎊 **Confetti Explosions**: Vibrant celebratory confetti animations across the viewport.
- 💌 **Memory & Note Cards Deck**: Flip through customizable reasons and sweet memories.
- 📜 **Heartfelt Envelope & Letter Reveal**: Special letter section for personal birthday greetings.
- 🔄 **Replay Experience**: One-click replay button to experience the surprise all over again.
- 📱 **Mobile First & Responsive**: Optimized for smooth touch interactions on phones, tablets, and desktops.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- **UI & State**: [React 19](https://react.dev/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Effects**: HTML5 Canvas API (Fireworks), CSS Keyframe Animations
- **Tooling**: [Vite](https://vitejs.dev/), TypeScript, Vitest, ESLint, Prettier

---

## 🚀 Getting Started

### Prerequisites

Ensure you have one of the following package managers installed:
- [Node.js](https://nodejs.org/) (v18.x or later) & [npm](https://www.npmjs.com/)
- [Bun](https://bun.sh/) (recommended)
- [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pragneshkoli/birthday-wish.git
   cd birthday-wish
   ```

2. **Install dependencies:**
   ```bash
   # using npm
   npm install

   # or using bun
   bun install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port indicated in your console) to preview the app!

---

## 🎨 How to Customize for Someone Else

You can fork this project and easily personalize it for your own friend, partner, or family member:

1. **Change the Recipient's Name & Metadata**:
   Open [`src/routes/index.tsx`](src/routes/index.tsx) and update the page titles and greeting text:
   ```tsx
   export const Route = createFileRoute("/")({
     head: () => ({
       meta: [
         { title: "Happy Birthday [Name] 💖" },
         { name: "description", content: "A little surprise made with love, just for [Name]." },
       ],
     }),
   });
   ```

2. **Customize the Reasons & Messages**:
   Update the `REASONS` array in [`src/routes/index.tsx`](src/routes/index.tsx):
   ```tsx
   const REASONS = [
     "Your smile makes my whole day 🌸",
     "You laugh at my terrible jokes 😂",
     "You make ordinary days feel magical ✨",
     // Add your personal memories or inside jokes here!
   ];
   ```

3. **Personalize the Letter & Content**:
   Scroll down to the letter section in [`src/routes/index.tsx`](src/routes/index.tsx) to write your personal note, sign off with your name, or add photos in [`public/`](public/).

4. **Change Colors & Theme**:
   Adjust color arrays such as `BALLOON_COLORS` in [`src/routes/index.tsx`](src/routes/index.tsx) or modify theme variables in [`src/styles.css`](src/styles.css).

---

## 🚢 Deployment

You can deploy this project with zero configuration to any modern hosting platform:

### Deploy with Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Vercel will automatically detect Vite / TanStack Start. Click **Deploy**.

### Deploy with Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set build command to `npm run build` and publish directory to `dist/client` (or as configured for your target adapter).
3. Click **Deploy Site**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project (`https://github.com/pragneshkoli/birthday-wish/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💖 Acknowledgements

Created with ❤️ by [Pragnesh Koli](https://github.com/pragneshkoli).
If you like this project, please consider giving it a ⭐ on GitHub!
