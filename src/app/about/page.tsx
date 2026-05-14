import type { Metadata } from 'next';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';

export const metadata: Metadata = {
  title: 'About',
  description: 'Second-year CS student at FAST-NUCES. Co-Founder of AVAL R&D. Systems engineer obsessed with low-level architecture and AI-augmented tooling.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── § 1: Page Hero ───────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="about-hero"
        label="ABOUT"
        sublabel="Aryan Ali Khan — a manifesto in two sentences"
        height="60vh"
        accent="cyan"
      />

      {/* ── § 2: Bio ─────────────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="bio"
        label="BIO"
        sublabel="Split layout: large cinematic text left — abstract art / photo right"
        height="70vh"
        accent="violet"
      />

      {/* ── § 3: Education ───────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="education"
        label="EDUCATION"
        sublabel="FAST-NUCES · BS CS · 2024–2028 · CGPA 3.03 — coursework grid"
        height="60vh"
        accent="cyan"
      />

      {/* ── § 4: Skills Matrix ───────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="skills"
        label="SKILLS MATRIX"
        sublabel="Languages + tools with animated proficiency bars on scroll"
        height="70vh"
        accent="amber"
      />

      {/* ── § 5: Philosophy ──────────────────────────────────────────────────── */}
      <SectionPlaceholder
        id="philosophy"
        label="PHILOSOPHY"
        sublabel="Interests · aesthetic · approach to engineering"
        height="50vh"
        accent="violet"
      />
    </>
  );
}
