# Implementation Plan: Aryan Ali Khan — Portfolio Website
### Awwwards-Level, Cinematic Dark Mode, Elite Engineering Portfolio
**Version 1.0 | Architect: Claude Sonnet 4.6**

---

## DESIGN BRIEF & CONCEPTUAL DIRECTION

**Codename: CIPHER**

The aesthetic DNA draws from high-stakes procedural thrillers — True Detective's oppressive atmosphere, Chernobyl's clinical dread, the sharp-suited tension of The Lincoln Lawyer. This is not a portfolio that begs for attention. It *commands* it.

**Visual Language:**
- Ground tone: `#050507` (near-void black, not pure black — pure black feels cheap)
- Structural blacks: `#0A0A0F`, `#0F0F1A`
- Glass surfaces: `rgba(255,255,255,0.03)` to `rgba(255,255,255,0.07)`
- Primary accent: **Electric Cyan** `#00E5FF` — cold, clinical, system-blue
- Secondary accent: **Ember Amber** `#FF6B35` — used sparingly for warnings, highlights, the "danger zone"
- Tertiary: **Muted Violet** `#7C3AED` — deep system purple for AI/ML project accents
- Text: `#E8E8F0` (off-white, not blinding white)
- Muted text: `#6B7280`
- Borders: `rgba(0,229,255,0.12)` — barely visible cyan borders, like circuit traces

**Typography Pairing:**
- Display / Hero: **"Bebas Neue"** — compressed, cinematic, poster-grade. Used ONLY for giant hero text.
- Headings: **"Syne"** — geometric, engineered, distinctly non-generic
- Body / UI: **"DM Mono"** — monospaced for a terminal/code aesthetic in UI elements
- Prose / Descriptions: **"Inter Tight"** — tight, modern, readable (distinct from regular Inter)

**The One Unforgettable Thing:** When you first land on the site, a terminal-style boot sequence runs — lines of code cascading onto a black screen, resolving into the hero section. Every visitor will remember it.

---

## PHASE 1: ARCHITECTURE & SETUP

### 1.1 Tech Stack Selection

**Framework: Next.js 14 (App Router)**
- Rationale: Server Components for SEO/performance, file-based routing for clean multi-page architecture, image optimization out-of-the-box, and the best ecosystem for the required animation libraries.
- App Router (not Pages Router) for modern layout nesting and loading states.

**Styling: Tailwind CSS v3 + CSS Custom Properties**
- Tailwind for utility-first rapid layout
- CSS custom properties (variables) for the design token system (colors, spacing, animations)
- `tailwind.config.js` extended with the custom color palette and font families

**Animation Stack:**
1. **GSAP (GreenSock) + ScrollTrigger plugin** — The workhorse. Handles all scroll-based animations, timeline sequencing, the boot sequence, text effects, and complex choreography. Requires a paid Club GreenSock license or the free CDN for portfolio use.
2. **Framer Motion** — Handles React component-level animations: page transitions, hover states, presence animations (mount/unmount), and drag interactions.
3. **React Three Fiber + Three.js** — Used *selectively* for the hero section background (a subtle, reactive particle/geometry field). Not overused.
4. **Lenis** — Smooth scroll library. Replaces native scroll with a buttery, momentum-based scroll that makes the entire site feel premium.

**Other Key Packages:**
- `next/font` — Self-hosted Google Fonts (Bebas Neue, Syne, DM Mono, Inter Tight)
- `react-intersection-observer` — Lightweight trigger for non-GSAP scroll reveals
- `zustand` — Minimal global state (cursor state, current page, loading state)
- `sharp` — Next.js image optimization (auto-included)

### 1.2 Project Initialization

```bash
npx create-next-app@latest aryan-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd aryan-portfolio

# Animation & 3D
npm install gsap @gsap/react
npm install framer-motion
npm install three @react-three/fiber @react-three/drei

# Smooth scroll
npm install @studio-freight/lenis

# State
npm install zustand

# Utility
npm install clsx tailwind-merge
npm install react-intersection-observer
```

### 1.3 Folder Structure

```
aryan-portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (cursor, smooth scroll, fonts)
│   │   ├── page.tsx                  # Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects index
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Dynamic project detail page
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── globals.css               # CSS custom properties, base resets
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Cinematic nav with magnetic links
│   │   │   ├── Footer.tsx
│   │   │   └── PageWrapper.tsx       # Framer Motion page transition wrapper
│   │   │
│   │   ├── ui/                       # Reusable design system components
│   │   │   ├── CustomCursor.tsx      # The physics-based custom cursor
│   │   │   ├── MagneticButton.tsx    # Magnetic hover effect button
│   │   │   ├── GlassCard.tsx         # Glassmorphism card primitive
│   │   │   ├── GlowText.tsx          # Text with subtle glow effect
│   │   │   ├── NoiseBg.tsx           # SVG noise texture overlay
│   │   │   ├── SectionDivider.tsx    # Animated circuit-trace divider
│   │   │   └── TerminalText.tsx      # Typewriter / terminal text component
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Boot sequence + main hero
│   │   │   ├── FeaturedProjects.tsx  # 3-card marquee preview
│   │   │   ├── TechStack.tsx         # Scrolling skills ticker
│   │   │   └── StatsBar.tsx          # Animated number counters
│   │   │
│   │   ├── about/
│   │   │   ├── AboutHero.tsx
│   │   │   ├── SkillsMatrix.tsx      # Interactive skill grid
│   │   │   └── CourseworkTimeline.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectGrid.tsx       # Filterable project grid
│   │   │   ├── ProjectCard.tsx       # Individual card with hover reveal
│   │   │   └── ProjectDetail.tsx     # Full project case study layout
│   │   │
│   │   ├── experience/
│   │   │   ├── LeadershipHero.tsx
│   │   │   └── AVALStartupSection.tsx
│   │   │
│   │   └── contact/
│   │       ├── ContactForm.tsx
│   │       └── ContactInfo.tsx
│   │
│   ├── lib/
│   │   ├── data/
│   │   │   ├── projects.ts           # All project data as typed objects
│   │   │   ├── skills.ts             # Tech stack data
│   │   │   └── personal.ts           # Bio, education, contact data
│   │   ├── hooks/
│   │   │   ├── useMousePosition.ts   # Real-time cursor tracking
│   │   │   ├── useScrollProgress.ts  # Page scroll % tracker
│   │   │   ├── useMagneticEffect.ts  # Reusable magnetic hover hook
│   │   │   └── useReducedMotion.ts   # Respects prefers-reduced-motion
│   │   ├── animations/
│   │   │   ├── gsap-config.ts        # GSAP defaults and plugin registration
│   │   │   ├── variants.ts           # Framer Motion variant presets
│   │   │   └── transitions.ts        # Page transition configurations
│   │   └── utils.ts                  # clsx + twMerge helper, slugify, etc.
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces (Project, Skill, etc.)
│
├── public/
│   ├── fonts/                        # Self-hosted font fallbacks if needed
│   ├── images/
│   │   ├── projects/                 # Project screenshots/mockups
│   │   └── og-image.png              # Open Graph image
│   └── noise.svg                     # The noise texture SVG
│
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### 1.4 Global State (Zustand)

```typescript
// src/lib/store.ts
interface AppStore {
  isLoading: boolean;           // Boot sequence in progress
  cursorVariant: 'default' | 'hover' | 'text' | 'drag';
  cursorLabel: string;          // Text that appears on cursor (e.g. "VIEW")
  setCursorVariant: (v: string) => void;
  setCursorLabel: (label: string) => void;
  setLoading: (v: boolean) => void;
}
```

---

## PHASE 2: GLOBAL UI, THEMING & TYPOGRAPHY

### 2.1 CSS Custom Properties (`globals.css`)

```css
:root {
  /* ═══ Color Tokens ═══ */
  --color-void:        #050507;   /* Page background */
  --color-depth-1:     #0A0A0F;   /* Card backgrounds */
  --color-depth-2:     #0F0F1A;   /* Elevated surfaces */
  --color-depth-3:     #161625;   /* Highest elevation */

  --color-cyan:        #00E5FF;   /* Primary accent — Electric Cyan */
  --color-cyan-dim:    #00E5FF26; /* 15% opacity cyan for borders/glows */
  --color-cyan-glow:   #00E5FF40; /* 25% opacity for glow halos */
  --color-amber:       #FF6B35;   /* Secondary accent — Ember Amber */
  --color-amber-dim:   #FF6B3520;
  --color-violet:      #7C3AED;   /* Tertiary — System Violet */
  --color-violet-dim:  #7C3AED20;

  --color-text:        #E8E8F0;   /* Primary text */
  --color-text-muted:  #6B7280;   /* Secondary text */
  --color-text-faint:  #374151;   /* Barely-visible text */
  --color-border:      rgba(0, 229, 255, 0.10); /* Default border */
  --color-border-hover: rgba(0, 229, 255, 0.30);

  /* ═══ Typography Scale ═══ */
  --font-display:      'Bebas Neue', sans-serif;
  --font-heading:      'Syne', sans-serif;
  --font-mono:         'DM Mono', monospace;
  --font-body:         'Inter Tight', sans-serif;

  /* ═══ Spacing / Layout ═══ */
  --section-pad-x:     clamp(1.5rem, 5vw, 6rem);
  --section-pad-y:     clamp(5rem, 10vh, 10rem);
  --max-width:         1440px;
  --content-width:     1200px;

  /* ═══ Animation Speeds ═══ */
  --ease-cinematic:    cubic-bezier(0.16, 1, 0.3, 1);  /* Snappy ease-out */
  --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring bounce */
  --duration-fast:     0.2s;
  --duration-normal:   0.5s;
  --duration-slow:     0.9s;
  --duration-cinematic: 1.4s;

  /* ═══ Glass / Blur ═══ */
  --glass-bg:          rgba(255, 255, 255, 0.03);
  --glass-border:      rgba(255, 255, 255, 0.06);
  --glass-blur:        blur(12px);

  /* ═══ Shadows / Glows ═══ */
  --glow-cyan:         0 0 20px rgba(0, 229, 255, 0.3), 0 0 60px rgba(0, 229, 255, 0.1);
  --glow-amber:        0 0 20px rgba(255, 107, 53, 0.3), 0 0 60px rgba(255, 107, 53, 0.1);
  --shadow-card:       0 4px 24px rgba(0, 0, 0, 0.6), 0 1px 0 var(--color-border);
}
```

### 2.2 Base Reset & Global Styles

```css
/* globals.css continued */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: var(--color-void);
  color: var(--color-text);
  font-family: var(--font-body);
  scroll-behavior: auto; /* Lenis handles smooth scroll */
  overflow-x: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-depth-1); }
::-webkit-scrollbar-thumb { background: var(--color-cyan-dim); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-cyan); }

/* Selection */
::selection { background: var(--color-cyan); color: var(--color-void); }

/* Noise texture overlay (applied to body via ::before pseudo) */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/noise.svg');
  opacity: 0.04;
  pointer-events: none;
  z-index: 1000;
}

/* Hide default cursor — custom cursor takes over */
body { cursor: none; }
```

### 2.3 Tailwind Config Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void:     '#050507',
        depth:    { 1: '#0A0A0F', 2: '#0F0F1A', 3: '#161625' },
        cyan:     { DEFAULT: '#00E5FF', dim: '#00E5FF26' },
        amber:    { DEFAULT: '#FF6B35', dim: '#FF6B3520' },
        violet:   { DEFAULT: '#7C3AED', dim: '#7C3AED20' },
        ink:      { DEFAULT: '#E8E8F0', muted: '#6B7280', faint: '#374151' },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
        body:    ['var(--font-inter-tight)', 'sans-serif'],
      },
      animation: {
        'marquee':    'marquee 25s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee:   { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        glowPulse: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
      },
    }
  }
} satisfies Config
```

### 2.4 Font Loading (`layout.tsx`)

```typescript
// src/app/layout.tsx
import { Bebas_Neue, Syne, DM_Mono, Inter_Tight } from 'next/font/google'

const bebas = Bebas_Neue({ weight: '400', variable: '--font-bebas', subsets: ['latin'] })
const syne = Syne({ weight: ['400','500','600','700','800'], variable: '--font-syne', subsets: ['latin'] })
const dmMono = DM_Mono({ weight: ['300','400','500'], variable: '--font-dm-mono', subsets: ['latin'] })
const interTight = Inter_Tight({ weight: ['300','400','500','600'], variable: '--font-inter-tight', subsets: ['latin'] })
```

### 2.5 Noise Texture Generation

Generate `public/noise.svg` — a tileable SVG noise filter:
```xml
<!-- public/noise.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="200" height="200" filter="url(#noise)" opacity="1"/>
</svg>
```

---

## PHASE 3: CORE PAGE SCAFFOLDING

### 3.1 Root Layout (`src/app/layout.tsx`)

The root layout manages:
1. Font class injection
2. Custom cursor component (always present)
3. Lenis smooth scroll initialization
4. GSAP ScrollSmoother setup
5. Navbar (always present)
6. Page transition wrapper

```typescript
// TODO: Initialize Lenis smooth scroll here and sync with GSAP ticker
// TODO: Register GSAP plugins (ScrollTrigger, ScrollSmoother, SplitText)
// TODO: Set GSAP defaults (ease: "power3.out", duration: 0.9)
```

### 3.2 Navbar (`components/layout/Navbar.tsx`)

**Design:** Fixed top, full width. Transparent on scroll-top, transitions to `backdrop-filter: blur(20px)` + `background: rgba(5,5,7,0.8)` after 80px scroll.

Left: `ARYAN` in Bebas Neue, cyan-accented, acts as home link.
Right: Nav links in DM Mono uppercase, spaced with a `·` separator. Each link is a `MagneticButton`.

Active state: A thin cyan underline that slides between links (GSAP-animated indicator bar).

```typescript
// TODO: GSAP animation — on page load, links stagger in from Y:-20, opacity:0 to Y:0, opacity:1
// TODO: Framer Motion scroll listener — add glass bg class after 80px
// TODO: Mobile: hamburger icon that animates to an X, full-screen overlay menu
```

**Mobile menu:** Full-screen dark overlay with nav links stacking vertically, each animated in with a custom stagger. The overlay itself clips in from top with a `clipPath: polygon(0 0, 100% 0, 100% 0%, 0 0%)` → `polygon(0 0, 100% 0, 100% 100%, 0 100%)` transition.

### 3.3 Page Transition Wrapper (`components/layout/PageWrapper.tsx`)

Wraps each page's content. On route change, executes a cinematic page-exit animation:
- A vertical wipe of `--color-cyan` slides across the screen (like a film slate), then recedes on the new page.

```typescript
// TODO: Framer Motion AnimatePresence — exit: overlay wipe from left to right
// TODO: Enter: overlay recedes right to left, then page content fades/slides up
```

### 3.4 Page-by-Page Structure

#### HOME (`src/app/page.tsx`)
Sections in order:
1. `<HeroSection />` — Full viewport, boot sequence → hero text + 3D background
2. `<StatsBar />` — 4 animated counters (Projects, Semesters, Languages, etc.)
3. `<FeaturedProjects />` — Horizontally scrollable 3-card carousel of top projects
4. `<TechStack />` — Infinite marquee ticker of tech logos/names
5. `<CallToAction />` — Full-width banner: "Let's build something ruthlessly good."

#### ABOUT (`src/app/about/page.tsx`)
Sections:
1. Page hero — Name + a 2-sentence manifesto
2. Bio section — Split layout: large text left, photo/abstract art right
3. Education timeline — FAST-NUCES card with CGPA, courses visualized as a grid
4. Skills Matrix — Interactive grid showing languages + tools with animated proficiency bars
5. Interests / Philosophy — Card with personal aesthetic and media tastes

#### PROJECTS (`src/app/projects/page.tsx`)
1. Page hero — "THE WORK" in Bebas Neue, massive
2. Filter bar — Tabs: All | Systems | AI/ML | Games | Web
3. `<ProjectGrid />` — Masonry-style responsive grid of `<ProjectCard />`s

#### PROJECT DETAIL (`src/app/projects/[slug]/page.tsx`)
1. Project hero — Full-bleed title, tech stack badges, semester label
2. Overview — 2-column layout: problem statement + key outcomes
3. Technical Implementation — Expandable sections per sub-component
4. Architecture diagram placeholder — `// TODO: Insert Mermaid/custom SVG diagram here`
5. Tech stack used — Animated badge cloud
6. Next/Prev project navigation

#### EXPERIENCE (`src/app/experience/page.tsx`)
1. Page hero
2. AVAL R&D Co-Founder section — Prominent card with startup description
3. Academic Timeline — Semester-by-semester progression
4. Leadership highlights

#### CONTACT (`src/app/contact/page.tsx`)
1. Giant "SAY HELLO" in Bebas Neue
2. Two-column: contact form left, info cards right
3. Email, GitHub, LinkedIn as magnetic icon buttons
4. Footer — minimal: copyright, social links

---

## PHASE 4: THE ANIMATION ENGINE

### 4.1 GSAP Setup (`lib/animations/gsap-config.ts`)

```typescript
// lib/animations/gsap-config.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'   // Club GreenSock
import { CustomEase } from 'gsap/CustomEase'

// Call this ONCE in the root layout
export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

  // Custom cinematic ease
  CustomEase.create('cinematic', 'M0,0 C0.16,0 0.3,1 1,1')
  CustomEase.create('reveal',    'M0,0 C0,0 0.14,1 1,1')

  // Default GSAP config
  gsap.defaults({ ease: 'power3.out', duration: 0.9 })

  // Connect GSAP to Lenis scroll
  // TODO: Add Lenis RAF → ScrollTrigger.update() connection here
}
```

### 4.2 Boot Sequence Animation (Hero)

The single most important animation. On first load (before Lenis starts):

```
Phase 1 (0.0s–0.8s):  Black screen. Cursor blinks.
Phase 2 (0.8s–2.5s):  Terminal lines type out in DM Mono, cyan text:
                        > INITIALIZING SYSTEM...
                        > LOADING: aryan.ali.khan [ENGINEER]
                        > MODULES: C++ / Java / Python / AI ████████ 100%
                        > STATUS: ONLINE
Phase 3 (2.5s–3.2s):  Terminal text shatters/dissolves upward
Phase 4 (3.2s–4.0s):  Hero content crashes in — name in Bebas Neue drops from above,
                        subtitle fades, 3D background ignites
Phase 5 (4.0s+):       Site becomes interactive, Lenis starts
```

```typescript
// TODO: In HeroSection.tsx — GSAP timeline for boot sequence:
// TODO: Phase 1 — cursor blink loop (CSS animation, no GSAP needed)
// TODO: Phase 2 — staggered TextPlugin typing effect for each terminal line
// TODO: Phase 3 — SplitText on terminal lines, then gsap.to(chars, { y: -60, opacity: 0, stagger: 0.01 })
// TODO: Phase 4 — gsap.from('.hero-name', { y: 120, opacity: 0, duration: 1.2, ease: 'cinematic' })
// TODO: Phase 5 — gsap.to(lenisInstance, { ... }) — unlock scroll
// TODO: Store 'bootComplete' in localStorage — skip on revisit (show condensed 0.5s version)
```

### 4.3 Custom Cursor (`components/ui/CustomCursor.tsx`)

A two-layer cursor system:
- **Dot** (8px): Snaps exactly to mouse position. CSS-only. `position: fixed`, `pointer-events: none`.
- **Ring** (40px): Follows mouse with spring lag (Framer Motion `useSpring`). Changes shape/size based on `cursorVariant` from Zustand store.

Cursor States:
- `default`: Ring 40px, border cyan, transparent fill
- `hover` (over links/buttons): Ring expands to 60px, fill `var(--color-cyan-dim)`, dot disappears
- `text`: Ring morphs to a thin vertical bar (like a text cursor)
- `drag`: Ring becomes larger circle with "DRAG" label inside

```typescript
// TODO: CustomCursor.tsx — Framer Motion useMotionValue + useSpring for ring lag
// TODO: Magnetic effect: cursor snaps toward nearby interactive elements (see useMagneticEffect)
// TODO: Disable custom cursor on touch devices (useReducedMotion / pointer media query)
```

### 4.4 Magnetic Buttons (`components/ui/MagneticButton.tsx`)

```typescript
// useMagneticEffect.ts — The hook
// On mouseenter: track mouse relative to element center
// Apply gsap.to(element, { x: deltaX * 0.4, y: deltaY * 0.4 }) on mousemove
// On mouseleave: gsap.to(element, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)' })

// TODO: MagneticButton.tsx — wrap any child element with this behavior
// TODO: Also apply subtle magnetic pull to the cursor ring itself
```

### 4.5 Scroll-Triggered Reveals

Standard reveal that applies to most sections (via a reusable hook/component):

```typescript
// useScrollReveal.ts
// Uses GSAP ScrollTrigger
// Default: element fades up from Y:40, opacity:0 → Y:0, opacity:1
// Trigger: "top 85%"
// Stagger children if hasChildren prop is true

// Variants:
// 'slide-up'   — translateY(40px) → (0)
// 'slide-left' — translateX(-60px) → (0)
// 'clip-up'    — clipPath wipe from bottom
// 'count-up'   — number counter animation (StatsBar)
```

Specific scroll triggers needed per section:
```typescript
// TODO: HeroSection — Parallax on 3D canvas: moves slower than scroll (scale 0.6)
// TODO: FeaturedProjects — Horizontal scroll section: pin the section, cards scroll laterally
// TODO: ProjectGrid — Each card stagger-reveals as grid scrolls into view
// TODO: SkillsMatrix — Proficiency bars animate width from 0 to value on scroll into view
// TODO: CourseworkTimeline — Items reveal sequentially with a vertical line drawing effect
// TODO: ContactForm — Form fields stagger in from below on scroll
```

### 4.6 Three.js Hero Background (`components/home/HeroScene.tsx`)

A reactive particle field using React Three Fiber. Not overly complex — elegant.

Concept: A field of ~2000 small particles arranged in a loose sphere/cloud, slowly rotating. Reacts to mouse movement (particles gently flow away from cursor position projected onto the scene).

Accent: Thin wireframe geometry (icosahedron or dodecahedron) rotating in the background — very dim, glowing cyan edges.

```typescript
// TODO: HeroScene.tsx — R3F Canvas with:
// TODO:   <ParticleField /> — instanced mesh, 2000 particles, respond to useFrame mouse position
// TODO:   <WireframeSphere /> — low-poly wireframe, emissive cyan material, slow rotation
// TODO:   <ambientLight /> + <pointLight position={[10,10,10]} color="#00E5FF" intensity={0.5} />
// TODO: Reduce particle count to 800 on mobile (device pixel ratio detection)
// TODO: Kill canvas entirely on low-end devices (navigator.hardwareConcurrency < 4)
```

### 4.7 Page Transition Animation

```typescript
// transitions.ts — Framer Motion variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.4 } }
}

// Overlay wipe variant
export const overlayWipe = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
}
// TODO: Implement overlayWipe as a full-screen div with bg-cyan, position:fixed, z-index:9999
```

### 4.8 Framer Motion Variants Presets (`lib/animations/variants.ts`)

```typescript
// Reusable stagger container
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

// Card reveal
export const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}

// Text reveal (line by line)
export const textReveal = {
  hidden: { opacity: 0, y: '100%' },
  show:   { opacity: 1, y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}
// Usage: wrap each line in overflow-hidden div, apply textReveal to inner span
```

### 4.9 Responsive Animation Adaptation

```typescript
// useReducedMotion.ts
// Check window.matchMedia('(prefers-reduced-motion: reduce)')
// If true: disable all GSAP ScrollTriggers, replace with opacity-only fades
// Expose: { shouldReduceMotion: boolean }

// Breakpoint-aware animation scaling:
// Mobile (< 768px):
//   - Disable custom cursor entirely
//   - Disable 3D canvas (R3F)
//   - Reduce stagger delays by 50%
//   - Disable magnetic button effects
//   - Page transitions: simple opacity fade instead of wipe
// Tablet (768–1024px):
//   - Reduce particle count by 60%
//   - Keep all transitions but reduce durations by 20%
// Desktop (> 1440px) / Ultra-wide:
//   - Full experience
//   - Hero text scales up (clamp-based fluid typography)
```

---

## PHASE 5: CONTENT INTEGRATION

### 5.1 Data Layer (`lib/data/projects.ts`)

```typescript
export interface Project {
  slug:         string;
  title:        string;
  tagline:      string;
  semester:     string;
  course:       string;
  accentColor:  string;           // Project-specific accent ('cyan' | 'amber' | 'violet')
  category:     ProjectCategory[];
  tech:         string[];
  overview:     string;
  highlights:   string[];         // 3-5 bullet accomplishments
  sections:     ProjectSection[]; // Detailed technical writeup sections
  featured:     boolean;
}

export type ProjectCategory = 'systems' | 'ai-ml' | 'games' | 'web' | 'low-level'
```

All 8 projects defined:

| Slug | Title | Accent | Categories |
|---|---|---|---|
| `aval-systems` | AVAL Systems – Financial Reconciliation Engine | cyan | systems, ai-ml |
| `chronorift` | ChronoRift – Multi-Process OS Game Engine | amber | systems, games |
| `citymind` | CityMind – Urban AI Simulation | violet | ai-ml, systems |
| `smart-city` | Smart City Management System | cyan | systems, low-level |
| `sonic-ultimate-heroes` | Sonic Ultimate Heroes – 2D OOP Platformer | amber | games |
| `buzz-bombers` | Buzz Bombers – 2D Arcade Survival Game | amber | games |
| `community-hub` | Community Hub – Multi-Page Web Platform | violet | web |
| `super-mario-assembly` | Super Mario Bros Clone – x86 Assembly Engine | cyan | low-level, games |

### 5.2 Personal Data (`lib/data/personal.ts`)

```typescript
export const personal = {
  name:       'Aryan Ali Khan',
  title:      'Software Engineer & Systems Architect',
  tagline:    'I build systems that don\'t break. And some that do — on purpose.',
  location:   'Rawalpindi / Islamabad, Pakistan',
  email:      'aryanaliminhas@gmail.com',
  phone:      '+92 345 7380005',
  github:     'https://github.com/[YOUR_GITHUB]',
  linkedin:   'https://linkedin.com/in/[YOUR_LINKEDIN]',
  bio: `Second-year CS student at FAST-NUCES Islamabad with an obsession for
        systems-level engineering and AI-augmented tooling. Co-Founder of AVAL R&D.
        I write code the way good cinematography frames a shot — with intention,
        precision, and a deep understanding of what lives beneath the surface.`,
}

export const education = {
  institution: 'FAST-NUCES, Islamabad',
  degree:      'BS Computer Science',
  period:      '2024 – 2028',
  cgpa:        '3.03',
  currentYear: '2nd Year (Semester 4)',
  coursework: [
    // CS / Programming
    { name: 'Programming Fundamentals',               semester: 1, category: 'core' },
    { name: 'Object-Oriented Programming',            semester: 2, category: 'core' },
    { name: 'Data Structures & Algorithms',           semester: 3, category: 'core' },
    { name: 'Database Systems',                       semester: 3, category: 'core' },
    { name: 'Computer Organization & Assembly (COAL)',semester: 3, category: 'core' },
    { name: 'Operating Systems',                      semester: 4, category: 'core' },
    { name: 'Software Design & Architecture',         semester: 4, category: 'core' },
    { name: 'Artificial Intelligence',                semester: 4, category: 'core' },
    { name: 'Intro to ICT',                           semester: 1, category: 'core' },
    // Mathematics
    { name: 'Single-Variable Calculus',               semester: 1, category: 'math' },
    { name: 'Discrete Structures',                    semester: 1, category: 'math' },
    { name: 'Multivariable Calculus',                 semester: 2, category: 'math' },
    { name: 'Linear Algebra',                         semester: 2, category: 'math' },
    { name: 'Theory of Automata',                     semester: 3, category: 'math' },
    { name: 'Probability & Statistics',               semester: 4, category: 'math' },
    { name: 'Digital Logic Design',                   semester: 3, category: 'math' },
  ]
}
```

### 5.3 Skills Data (`lib/data/skills.ts`)

```typescript
// Organized into tiers for the Skills Matrix visualization
export const skills = {
  languages: [
    { name: 'C++',    level: 95, icon: '⚡' },
    { name: 'Java',   level: 90, icon: '☕' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'C',      level: 80, icon: '🔩' },
    { name: 'SQL',    level: 75, icon: '🗄️' },
    { name: 'x86 ASM',level: 70, icon: '💻' },
    { name: 'POSIX',  level: 75, icon: '🐧' },
  ],
  frameworks: [
    'JavaFX', 'Flask', 'SocketIO', 'LangChain4j', 'scikit-learn',
    'Apache POI', 'Apache PDFBox', 'SFML'
  ],
  infrastructure: [
    'PostgreSQL', 'pgvector', 'Docker', 'Docker Compose', 'Ollama',
    'Git', 'GitHub', 'Maven', 'CMake'
  ],
  concepts: [
    'Data Structures & Algorithms', 'OOP & Design Patterns',
    'Concurrent & Distributed Systems', 'AI-Augmented Systems',
    'Low-Level Optimization', 'ETL Pipelines', 'Software Architecture'
  ]
}
```

### 5.4 Component-Level Content Notes

**HeroSection:** The hero text reads:
```
[BOOT SEQUENCE]
ARYAN ALI KHAN
[small]: SYSTEMS ENGINEER · AI ARCHITECT · FAST-NUCES '28
[CTA buttons]: VIEW MY WORK  ·  CONTACT
```

**StatsBar:** 4 counters:
```
08  MAJOR PROJECTS
04  SEMESTERS COMPLETED
07  LANGUAGES MASTERED
01  STARTUP FOUNDED
```

**About Page Bio:** Reference to cinematic interests woven into the writing tone — not explicitly listed like a hobby section, but implied in how the copy is written. E.g., *"I approach engineering the way a good detective approaches a crime scene — methodically, from first principles, never assuming the obvious answer is right."*

**AVAL R&D Section (Experience):**
```
Co-FOUNDER — AVAL R&D  |  2024 – Present
Building AI-powered financial and software solutions.
Flagship product: AVAL Financial Reconciliation Engine.
Pipeline: AIRE (AI-driven reconciliation automation).
```

---

## PHASE 6: OPTIMIZATION & POLISH

### 6.1 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200ms |
| JS Bundle (initial) | < 250KB gzipped |

### 6.2 Code Splitting & Lazy Loading

```typescript
// Heavy components: lazy load with Next.js dynamic imports
import dynamic from 'next/dynamic'

// 3D canvas — never needed on SSR
const HeroScene = dynamic(() => import('@/components/home/HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-canvas-placeholder" /> // Matches canvas dimensions
})

// GSAP SplitText — only load when needed
// React Three Fiber — code split per page
// ProjectDetail 3D elements — lazy loaded
```

### 6.3 Image Optimization

- All project images: WebP format, `next/image` with `sizes` prop
- Blurred placeholder: `placeholder="blur"` on all above-fold images
- Lazy load all below-fold images

### 6.4 SEO

```typescript
// src/app/layout.tsx — Root metadata
export const metadata = {
  title:       { default: 'Aryan Ali Khan', template: '%s | Aryan Ali Khan' },
  description: 'Software Engineer & Systems Architect. CS student at FAST-NUCES building AI-augmented systems, concurrent engines, and elite-grade software.',
  keywords:    ['software engineer', 'computer science', 'FAST-NUCES', 'systems engineer', 'AI developer', 'Pakistan'],
  openGraph: {
    title:       'Aryan Ali Khan — Systems Engineer',
    description: 'Elite engineering portfolio.',
    url:         'https://aryan.dev', // Update with real domain
    images:      [{ url: '/og-image.png', width: 1200, height: 630 }],
    type:        'website',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Aryan Ali Khan',
  }
}

// Dynamic metadata for project pages
// src/app/projects/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug)
  return {
    title:       project.title,
    description: project.tagline,
  }
}
```

### 6.5 Accessibility

```typescript
// 1. prefers-reduced-motion: all GSAP animations wrapped in useReducedMotion check
// 2. Focus management: custom cursor hides on keyboard navigation (Tab key detected)
// 3. ARIA labels on all icon-only buttons
// 4. Skip-to-content link as the first focusable element
// 5. Color contrast: all text checked against WCAG AA at minimum
//    Note: var(--color-cyan) #00E5FF on #050507 = 12.5:1 contrast ratio ✓
// 6. Semantic HTML: section, article, nav, main, header, footer used correctly
```

### 6.6 Mobile Animation Adjustments

```typescript
// All animation adjustments gated by this hook:
// src/lib/hooks/useDeviceCapability.ts

export function useDeviceCapability() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTouch  = useMediaQuery('(hover: none)')
  const prefersReduced = useReducedMotion()
  const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency < 4

  return {
    enableCursor:     !isMobile && !isTouch,
    enable3D:         !isMobile && !isLowEnd,
    enableMagnetic:   !isTouch,
    enableParallax:   !prefersReduced && !isMobile,
    staggerMultiplier: isMobile ? 0.5 : 1,
  }
}
```

### 6.7 Final Polish Checklist

Before deploy, verify:
- [ ] Boot sequence skips correctly on revisit (localStorage check)
- [ ] All 8 project slug pages render without 404
- [ ] Custom cursor doesn't appear on touch devices
- [ ] 3D canvas has a static fallback image on low-end devices
- [ ] All external links open in `_blank` with `rel="noopener noreferrer"`
- [ ] Contact form has server-side validation (Next.js API route or Server Action)
- [ ] `robots.txt` and `sitemap.xml` generated
- [ ] `next.config.ts` has proper security headers

---

## EXECUTION ORDER

Execute phases strictly in this order. Each phase should be a separate conversation session or clearly delineated coding session:

1. **Session 1:** Phase 1 complete — init project, folder structure, install all deps
2. **Session 2:** Phase 2 complete — globals.css, tailwind.config, fonts, noise texture
3. **Session 3:** Phase 3A — Navbar + PageWrapper + Root Layout scaffolding
4. **Session 4:** Phase 3B — All page shells (no content, just structure + headings)
5. **Session 5:** Phase 4A — GSAP init + Boot Sequence animation (hero only)
6. **Session 6:** Phase 4B — Custom cursor + Magnetic buttons
7. **Session 7:** Phase 4C — Three.js hero background
8. **Session 8:** Phase 4D — All scroll triggers (non-hero)
9. **Session 9:** Phase 5A — Data layer (projects.ts, skills.ts, personal.ts)
10. **Session 10:** Phase 5B — Home page content injection (all sections)
11. **Session 11:** Phase 5C — About + Projects index pages
12. **Session 12:** Phase 5D — All 8 project detail pages
13. **Session 13:** Phase 5E — Experience + Contact pages
14. **Session 14:** Phase 6 — Full optimization + SEO + accessibility pass

---

## APPENDIX: COMPONENT QUICK REFERENCE

| Component | Animation | Library |
|---|---|---|
| Boot sequence | Timeline w/ SplitText | GSAP |
| Hero text entrance | Y-translate + opacity | GSAP |
| 3D canvas background | Particle physics, rotation | R3F / Three.js |
| Custom cursor | Spring physics, shape morph | Framer Motion |
| Magnetic buttons | Mouse delta tracking | GSAP |
| Page transitions | Overlay wipe | Framer Motion |
| Navbar appearance | Scroll-based backdrop | Framer Motion |
| Section reveals | ScrollTrigger Y-translate | GSAP |
| Skills proficiency bars | Width from 0 to value | GSAP ScrollTrigger |
| Stats counters | Count-up on scroll | GSAP ScrollTrigger |
| Project cards hover | Scale + glow + cursor change | Framer Motion |
| Tech ticker | Infinite marquee | CSS animation |
| Horizontal scroll (featured) | Pin + scrub | GSAP ScrollTrigger |
| Timeline line draw | SVG stroke-dashoffset | GSAP ScrollTrigger |
| Contact form fields | Stagger reveal | Framer Motion |

---

*This document is the single source of truth for all architectural and design decisions. Every code session should reference it before writing a single line.*

**Built for: Aryan Ali Khan | Codename: CIPHER | Version 1.0**
