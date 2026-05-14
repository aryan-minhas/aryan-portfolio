import type { Metadata } from 'next';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Eight major engineering projects spanning systems programming, AI/ML, game development, and web platforms.',
};

const FILTER_TABS = ['ALL', 'SYSTEMS', 'AI / ML', 'GAMES', 'WEB'];

export default function ProjectsPage() {
  return (
    <>
      {/* ── § 1: Page Hero ───────────────────────────────────────────────────── */}
      <section
        className="flex items-end pb-16 pt-40"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <RevealText
          as="h1"
          className="font-display text-[clamp(5rem,15vw,14rem)] leading-none tracking-widest text-ink"
        >
          THE WORK
        </RevealText>
      </section>

      {/* ── § 2: Filter Bar ──────────────────────────────────────────────────── */}
      <ScrollReveal
        as="section"
        variant="slide-up"
        staggerChildren
        className="flex items-center gap-2 pb-12 flex-wrap"
        aria-label="Project category filter"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            className="font-mono text-xs tracking-[0.2em] px-5 py-2 border border-[var(--color-border)] text-ink-muted hover:text-cyan hover:border-cyan/40 transition-colors duration-300"
            aria-label={`Filter by ${tab}`}
            style={{ paddingInline: 'var(--section-pad-x)' }}
          >
            {tab}
          </button>
        ))}
      </ScrollReveal>

      {/* ── § 3: Project Grid ────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="project-grid"
        label="PROJECT GRID"
        sublabel="8 cards — masonry layout, stagger reveal on scroll, hover glow"
        height="70vh"
        accent="cyan"
        className="mx-[var(--section-pad-x)] mb-24"
      />
    </>
  );
}
