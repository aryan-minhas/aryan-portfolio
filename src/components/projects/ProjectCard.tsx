'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Project, ProjectAccent } from '@/types';

const ACCENT_BORDER: Record<ProjectAccent, string> = {
  cyan:   '#00E5FF',
  amber:  '#FF6B35',
  violet: '#7C3AED',
};

const ACCENT_BG: Record<ProjectAccent, string> = {
  cyan:   'rgba(0,229,255,0.03)',
  amber:  'rgba(255,107,53,0.03)',
  violet: 'rgba(124,58,237,0.03)',
};

const ACCENT_TEXT: Record<ProjectAccent, string> = {
  cyan:   'text-cyan',
  amber:  'text-amber',
  violet: 'text-violet',
};

const ACCENT_BADGE: Record<ProjectAccent, string> = {
  cyan:   'border-cyan/30 text-cyan',
  amber:  'border-amber/30 text-amber',
  violet: 'border-violet/30 text-violet',
};

const ACCENT_HOVER_TITLE: Record<ProjectAccent, string> = {
  cyan:   'group-hover:text-cyan',
  amber:  'group-hover:text-amber',
  violet: 'group-hover:text-violet',
};

interface ProjectCardProps {
  project: Project;
  index:   number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const accent = project.accentColor;
  const num    = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{
        duration:  0.45,
        delay:     Math.min(index * 0.06, 0.3),
        ease:      [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col h-full"
        style={{
          background:  ACCENT_BG[accent],
          border:      '1px solid var(--color-border)',
          borderTop:   `2px solid ${ACCENT_BORDER[accent]}`,
          padding:     '1.75rem',
        }}
        aria-label={`View ${project.title}`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <span className={cn('font-mono text-xs tracking-[0.3em]', ACCENT_TEXT[accent])}>
            {num}
          </span>
          <span className="font-mono text-[10px] text-ink-faint tracking-[0.15em]">
            {project.semester.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-display leading-[0.9] tracking-wide text-ink mb-2 transition-colors duration-300',
            ACCENT_HOVER_TITLE[accent]
          )}
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
        >
          {project.title.toUpperCase()}
        </h3>

        {/* Course */}
        <p className="font-mono text-[10px] text-ink-faint tracking-[0.15em] uppercase mb-4">
          {project.course}
        </p>

        {/* Tagline */}
        <p className="font-body text-sm text-ink-muted leading-relaxed line-clamp-2 mb-auto">
          {project.tagline}
        </p>

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.category.map((cat) => (
            <span
              key={cat}
              className={cn(
                'font-mono text-[9px] px-2 py-0.5 tracking-wider uppercase border',
                ACCENT_BADGE[accent]
              )}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] px-2 py-0.5 tracking-wider text-ink-faint border border-[var(--color-border)]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="font-mono text-[9px] text-ink-faint self-center">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <div
          className={cn(
            'flex items-center gap-2 mt-6 font-mono text-xs tracking-[0.2em]',
            'transition-[gap] duration-300 group-hover:gap-4',
            ACCENT_TEXT[accent]
          )}
        >
          <span>VIEW</span>
          <span aria-hidden="true">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
