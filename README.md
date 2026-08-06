# Preevon HTML

A production-ready frontend foundation for Preevon built with Vite, Tailwind CSS, PostCSS, vanilla JavaScript, and a scalable design-token architecture.

## Stack

- Vite for local development and production builds
- Tailwind CSS through PostCSS
- ESLint recommended rules with Prettier compatibility
- Prettier formatting
- GSAP for animation foundations
- Lenis for smooth scrolling
- Lucide for SVG icons
- Plus Jakarta Sans global typography

## Project Structure

```text
src/
  assets/
    fonts/
    icons/
    images/
    css/
    js/
  components/
    layout/
    shared/
  pages/
  styles/
    app.css
    variables.css
    typography.css
    utilities.css
    animations.css
  scripts/
    app.js
    theme.js
    helpers.js
  data/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Quality Checks

```bash
npm run lint
npm run format:check
```

## Theme Architecture

The app uses `data-theme` on the root HTML element and CSS custom properties in `src/styles/variables.css`. The theme module reads the saved preference from `localStorage`, falls back to the system color scheme, and exposes a reusable toggle helper.

## Notes

This repository intentionally starts with a clean homepage placeholder and a professional folder structure so future sprints can add layouts, reusable components, content data, and production assets without reorganizing the foundation.
