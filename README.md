# Daksh Shastri — Portfolio

A personal portfolio for frontend developer Daksh Shastri, built with Next.js,
React, TypeScript, GSAP, and Framer Motion. The site uses a restrained
editorial layout to present selected projects, experience, skills,
achievements, and contact links — plus an interactive blueprint-style
profile map.

## Pages

- `/` — the main portfolio: hero, selected works, about, and contact
  sections, with scroll-driven animations throughout.
- `/map` — an interactive 2D blueprint map ("Blueprism") presenting
  education, tech stack, experience, projects, certifications, and
  contact links as districts of a facility, with a detail panel for
  each node.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build and lint

```bash
npm run build
npm run lint
```

## Tech stack

- Next.js (App Router) with React and TypeScript
- Tailwind CSS v4
- GSAP (ScrollTrigger) and Framer Motion for animation
- Lenis for smooth scrolling
- lucide-react icons

## Project structure

- `app/` — pages and global styles (main portfolio and `/map`)
- `components/` — section and effect components (hero canvas,
  sticky works, capabilities, custom cursor, marquee, particle
  field, blueprint map, etc.)
- `lib/` — content data (`data.ts` for the map districts,
  `case-studies.ts` for project case studies) and utilities

## Notes

- Project panels are illustrative HTML/CSS previews rather than
  screenshots of the live applications.
- The About section focuses on education, experience, and skills.
- The navigation menu is keyboard accessible, and motion respects
  the `prefers-reduced-motion` setting.
- Featured projects include ReSpectro (movie/TV discovery app with
  TMDB, Clerk auth, and Appwrite) and a Gemini AI clone; the third
  card is Omni Docs.
