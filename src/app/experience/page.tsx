import type { Metadata } from 'next';
import RevealText          from '@/components/ui/RevealText';
import AVALStartupSection  from '@/components/experience/AVALStartupSection';
import LeadershipHero      from '@/components/experience/LeadershipHero';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Co-Founder of AVAL R&D. Academic journey at FAST-NUCES from Semester 1 to present.',
};

export default function ExperiencePage() {
  return (
    <>
      {/* ── § 1: Page Hero ───────────────────────────────────────────────────── */}
      <section
        className="flex items-end pt-16 pb-20 border-b border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)', minHeight: '50vh' }}
      >
        <div>
          <p className="font-mono text-xs text-cyan tracking-[0.3em] uppercase mb-4">
            EXPERIENCE
          </p>
          <RevealText
            as="h1"
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-none tracking-widest text-ink"
          >
            THE RECORD
          </RevealText>
        </div>
      </section>

      {/* ── § 2: AVAL R&D ────────────────────────────────────────────────────── */}
      <AVALStartupSection />

      {/* ── § 3 & 4: Academic Timeline + Leadership ─────────────────────────── */}
      <LeadershipHero />
    </>
  );
}
