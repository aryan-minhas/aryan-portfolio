import type { Metadata } from 'next';
import AboutHero          from '@/components/about/AboutHero';
import CourseworkTimeline from '@/components/about/CourseworkTimeline';
import SkillsMatrix       from '@/components/about/SkillsMatrix';

export const metadata: Metadata = {
  title: 'About',
  description: 'Second-year CS student at FAST-NUCES. Co-Founder of AVAL R&D. Systems engineer obsessed with low-level architecture and AI-augmented tooling.',
};

const PHILOSOPHY = [
  {
    label: 'ENGINEERING',
    body:  'Correctness first, performance second, elegance third. A system that crashes elegantly is still broken.',
  },
  {
    label: 'AESTHETIC',
    body:  'True Detective. Chernobyl. The Lincoln Lawyer. Compressed tension, clinical precision, no wasted frame.',
  },
  {
    label: 'APPROACH',
    body:  'Read the spec. Understand the machine. Ship something that works at 3am on a server you\'ve never touched.',
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* ── § 1 & 2: Hero + Bio ──────────────────────────────────────────────── */}
      <AboutHero />

      {/* ── § 3: Education + Coursework ──────────────────────────────────────── */}
      <CourseworkTimeline />

      {/* ── § 4: Skills Matrix ───────────────────────────────────────────────── */}
      <SkillsMatrix />

      {/* ── § 5: Philosophy ──────────────────────────────────────────────────── */}
      <section
        className="py-20 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-12">
          PHILOSOPHY
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY.map(({ label, body }) => (
            <div
              key={label}
              className="p-6"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', borderTop: '2px solid var(--color-violet)' }}
            >
              <p className="font-mono text-[10px] text-violet tracking-[0.3em] uppercase mb-4">
                {label}
              </p>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
