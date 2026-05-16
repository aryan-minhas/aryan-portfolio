import type { Metadata } from 'next';
import AboutHero          from '@/components/about/AboutHero';
import CourseworkTimeline from '@/components/about/CourseworkTimeline';
import SkillsMatrix       from '@/components/about/SkillsMatrix';

export const metadata: Metadata = {
  title: 'About',
  description: 'Second-year CS student at FAST-NUCES. Co-Founder of AVAL R&D. Systems engineer obsessed with low-level architecture and AI-augmented tooling.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── § 1 & 2: Hero + Bio ──────────────────────────────────────────────── */}
      <AboutHero />

      {/* ── § 3: Education + Coursework ──────────────────────────────────────── */}
      <CourseworkTimeline />

      {/* ── § 4: Skills Matrix ───────────────────────────────────────────────── */}
      <SkillsMatrix />
    </>
  );
}
