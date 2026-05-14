import SectionPlaceholder from '@/components/ui/SectionPlaceholder';

export default function HomePage() {
  return (
    <>
      {/* ── § 1: Hero ────────────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="hero"
        label="HERO SECTION"
        sublabel="Boot sequence → ARYAN ALI KHAN → 3D particle field"
        height="100vh"
        accent="cyan"
      />

      {/* ── § 2: Stats Bar ───────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="stats"
        label="STATS BAR"
        sublabel="08 Projects · 04 Semesters · 07 Languages · 01 Startup"
        height="160px"
        accent="amber"
      />

      {/* ── § 3: Featured Projects ───────────────────────────────────────────── */}
      <SectionPlaceholder
        id="featured-projects"
        label="FEATURED PROJECTS"
        sublabel="Horizontally pinned 3-card carousel — GSAP ScrollTrigger"
        height="80vh"
        accent="cyan"
      />

      {/* ── § 4: Tech Stack Ticker ───────────────────────────────────────────── */}
      <SectionPlaceholder
        id="tech-stack"
        label="TECH STACK TICKER"
        sublabel="Infinite marquee — CSS animation"
        height="120px"
        accent="violet"
      />

      {/* ── § 5: Call to Action ──────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="cta"
        label="CALL TO ACTION"
        sublabel={`"Let's build something ruthlessly good."`}
        height="320px"
        accent="amber"
      />
    </>
  );
}
