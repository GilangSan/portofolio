# Monochrome Windowing Portfolio

A modern, creative developer portfolio built with a unique "monochrome windowing" aesthetic. Featuring smooth animations, fluid typography, and a highly interactive, high-performance interface.

## ✨ Features

- **Monochrome Window Aesthetics**: A clean, highly professional brutalist/windowed design system with seamless dark/light mode integration.
- **Fluid Typography & Responsive Design**: Utilizes CSS clamp and modern layout techniques to look perfect on any device.
- **Interactive Dot Grid**: A dynamic, animated canvas dot grid background that responds to scrolling.
- **High Performance Animations**: Built with Framer Motion and intersection observers for 60fps scrolling and entrance animations.
- **Data-Driven**: Easy to update projects, tech stacks, and social links.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS for custom properties
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & CSS keyframes
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/GilangSan/portofolio.git
cd portofolio
npm install
# or yarn install / pnpm install
```

Then, run the development server:

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio in action.

## 📝 Customization

- **Projects**: Edit the `projects` array in `src/components/WorkSection.tsx` to add your own works, including `codeUrl` and `liveUrl`.
- **Socials**: Edit the `socials` array in `src/components/ContactSection.tsx` to update the social media icons and links.
- **About/Hero**: Modify the text inside `src/components/HeroSection.tsx` and `src/components/AboutSection.tsx`.

## 📜 License

This project is licensed under the [GPL License](LICENSE) - see the LICENSE file for details.
