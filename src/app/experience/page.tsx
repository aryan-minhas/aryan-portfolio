import type { Metadata } from 'next';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Co-Founder of AVAL R&D. Academic journey at FAST-NUCES from Semester 1 to present.',
};

export default function ExperiencePage() {
  return (
    <>
      {/* ── § 1: Page Hero ───────────────────────────────────────────────────── */}
      <section
        className="flex items-end pb-16 pt-40 border-b border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)', minHeight: '50vh' }}
      >
        <div>
          <p className="font-mono text-xs text-cyan tracking-[0.3em] uppercase mb-4">
            EXPERIENCE
          </p>
          <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-none tracking-widest text-ink">
            THE{' '}
            <span className="text-cyan" style={{ textShadow: 'var(--glow-cyan)' }}>
              RECORD
            </span>
          </h1>
        </div>
      </section>

      {/* ── § 2: AVAL R&D ────────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="aval"
        label="AVAL R&D"
        sublabel="Co-Founder · 2024–Present · AI-powered financial reconciliation engine"
        height="60vh"
        accent="cyan"
      />

      {/* ── § 3: Academic Timeline ───────────────────────────────────────────── */}
      <SectionPlaceholder
        id="timeline"
        label="ACADEMIC TIMELINE"
        sublabel="Semester-by-semester progression — SVG line draw on scroll"
        height="80vh"
        accent="amber"
      />

      {/* ── § 4: Leadership ──────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="leadership"
        label="LEADERSHIP"
        sublabel="Highlights and positions of responsibility"
        height="50vh"
        accent="violet"
      />
    </>
  );
}
