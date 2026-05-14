import type { Metadata } from 'next';
import RevealText from '@/components/ui/RevealText';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { getAllProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Eight major engineering projects spanning systems programming, AI/ML, game development, and web platforms.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

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

      {/* ── § 2: Filterable Grid ─────────────────────────────────────────────── */}
      <ProjectGrid projects={projects} />
    </>
  );
}
