import type { Metadata } from 'next';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      {/* ── § 1: Project Hero ────────────────────────────────────────────────── */}
      <section
        className="flex flex-col justify-end pb-16 pt-40 border-b border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)', minHeight: '60vh' }}
      >
        <p className="font-mono text-xs text-cyan tracking-[0.3em] uppercase mb-4">
          PROJECT — {slug}
        </p>
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-none tracking-widest text-ink mb-6">
          {slug.replace(/-/g, ' ').toUpperCase()}
        </h1>
        <div className="flex flex-wrap gap-2">
          {['SYSTEMS', 'AI/ML', 'SEMESTER 4'].map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 border border-[var(--color-border)] text-ink-muted tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── § 2: Overview ────────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="overview"
        label="OVERVIEW"
        sublabel="2-col: problem statement left — key outcomes right"
        height="50vh"
        accent="cyan"
      />

      {/* ── § 3: Technical Implementation ────────────────────────────────────── */}
      <SectionPlaceholder
        id="technical"
        label="TECHNICAL IMPLEMENTATION"
        sublabel="Expandable accordion sections per sub-component"
        height="60vh"
        accent="amber"
      />

      {/* ── § 4: Architecture Diagram ────────────────────────────────────────── */}
      <SectionPlaceholder
        id="architecture"
        label="ARCHITECTURE DIAGRAM"
        sublabel="TODO: Insert Mermaid / custom SVG diagram"
        height="40vh"
        accent="violet"
      />

      {/* ── § 5: Tech Stack ──────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="tech-stack"
        label="TECH STACK"
        sublabel="Animated badge cloud"
        height="30vh"
        accent="cyan"
      />

      {/* ── § 6: Prev / Next Navigation ──────────────────────────────────────── */}
      <section
        className="flex items-center justify-between py-16 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
        aria-label="Project navigation"
      >
        <button className="font-mono text-xs text-ink-muted hover:text-cyan tracking-widest transition-colors">
          ← PREV PROJECT
        </button>
        <button className="font-mono text-xs text-ink-muted hover:text-cyan tracking-widest transition-colors">
          NEXT PROJECT →
        </button>
      </section>
    </>
  );
}
