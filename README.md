# CIPHER — Aryan Ali Khan Portfolio

Personal portfolio for Aryan Ali Khan — Systems Engineer & AI Architect, CS student at FAST-NUCES.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (theme tokens in `globals.css`) |
| Animation | GSAP 3.12 + ScrollTrigger + SplitText, Framer Motion |
| 3D | Three.js + React Three Fiber |
| Scroll | Lenis smooth scroll |
| Fonts | Bebas Neue · Syne · DM Mono · Inter Tight |

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    projects/[slug]/    # 8 SSG project detail pages
    sitemap.ts          # Auto-generated sitemap
    robots.ts           # robots.txt
  components/
    home/               # HeroSection, FeaturedProjects, StatsBar, TechStack, CTA
    about/              # AboutHero, SkillsMatrix, CourseworkTimeline
    experience/         # AVALStartupSection, LeadershipHero
    projects/           # ProjectCard, ProjectGrid
    contact/            # ContactForm, ContactInfo
    layout/             # Navbar, Footer, SmoothScrollProvider, PageWrapper
    ui/                 # CustomCursor, MagneticButton, RevealText, ScrollReveal
  lib/
    data/               # projects.ts, skills.ts, personal.ts, index.ts
    animations/         # gsap-config.ts
    hooks/              # useScrollReveal, useScrollProgress
    store.ts            # Zustand store (cursor variant, loading state)
  types/                # TypeScript interfaces
docs/
  implementation_plan.md
  project_details.md
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Build

```bash
npm run build   # production build
npm run start   # serve production build locally
```

## Deploy

Deploy to Vercel:
1. Push to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Set `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables
4. Deploy

## OG Image

Place a `1200×630` image at `public/og-image.png` before deploying for social previews.
