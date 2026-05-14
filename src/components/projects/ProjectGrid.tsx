'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import type { Project, ProjectCategory } from '@/types';

const TABS: { label: string; value: ProjectCategory | null }[] = [
  { label: 'ALL',       value: null          },
  { label: 'SYSTEMS',   value: 'systems'     },
  { label: 'AI / ML',   value: 'ai-ml'       },
  { label: 'GAMES',     value: 'games'       },
  { label: 'WEB',       value: 'web'         },
  { label: 'LOW-LEVEL', value: 'low-level'   },
];

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [active, setActive] = useState<ProjectCategory | null>(null);

  const filtered = active
    ? projects.filter((p) => p.category.includes(active))
    : projects;

  return (
    <div style={{ paddingInline: 'var(--section-pad-x)' }}>
      {/* Filter tabs */}
      <div
        className="flex items-center gap-2 pb-12 flex-wrap"
        role="tablist"
        aria-label="Project category filter"
      >
        {TABS.map(({ label, value }) => (
          <button
            key={label}
            role="tab"
            aria-selected={active === value}
            onClick={() => setActive(value)}
            className={cn(
              'font-mono text-xs tracking-[0.2em] px-5 py-2 border transition-colors duration-300',
              active === value
                ? 'border-cyan text-cyan'
                : 'border-[var(--color-border)] text-ink-muted hover:text-cyan hover:border-cyan/40'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
