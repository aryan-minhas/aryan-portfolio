'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { getFeaturedProjects } from '@/lib/data';
import { initGSAP } from '@/lib/animations/gsap-config';
import type { Project, ProjectAccent } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const ACCENT: Record<ProjectAccent, { border: string; bg: string; text: string }> = {
  cyan:   { border: '#00E5FF', bg: 'rgba(0,229,255,0.04)',   text: 'text-cyan'   },
  amber:  { border: '#FF6B35', bg: 'rgba(255,107,53,0.04)',  text: 'text-amber'  },
  violet: { border: '#7C3AED', bg: 'rgba(124,58,237,0.04)',  text: 'text-violet' },
};

// ── Single card ──────────────────────────────────────────────────────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const a   = ACCENT[project.accentColor];
  const num = (index + 1).toString().padStart(2, '0');

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex-none flex flex-col"
      style={{
        width:       'min(82vw, 460px)',
        height:      '540px',
        background:  a.bg,
        border:      '1px solid var(--color-border)',
        borderTop:   `2px solid ${a.border}`,
        padding:     '2rem',
      }}
      aria-label={`View ${project.title}`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className={cn('font-mono text-xs tracking-[0.3em]', a.text)}>
          {num}
        </span>
        <span className="font-mono text-[10px] text-ink-faint tracking-[0.2em]">
          {project.semester.toUpperCase()}
        </span>
      </div>

      {/* Course label */}
      <span className="font-mono text-[10px] text-ink-faint tracking-[0.15em] mt-2">
        {project.course.toUpperCase()}
      </span>

      {/* Title */}
      <h3
        className={cn(
          'font-display leading-[0.9] tracking-wide text-ink mt-auto',
          'group-hover:transition-colors group-hover:duration-300',
          `group-hover:${a.text}`
        )}
        style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
      >
        {project.title.toUpperCase()}
      </h3>

      {/* Tagline */}
      <p className="font-body text-sm text-ink-muted mt-4 leading-relaxed line-clamp-2">
        {project.tagline}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 mt-6">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-1 tracking-wider text-ink-faint border border-[var(--color-border)]"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="font-mono text-[10px] text-ink-faint px-1 self-center">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* CTA */}
      <div
        className={cn(
          'flex items-center gap-2 mt-8 font-mono text-xs tracking-[0.2em]',
          'transition-[gap] duration-300 group-hover:gap-4',
          a.text
        )}
      >
        <span>VIEW PROJECT</span>
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const featured   = getFeaturedProjects();

  useGSAP(
    () => {
      initGSAP();
      const section = sectionRef.current;
      const track   = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const totalScroll = track.scrollWidth - section.offsetWidth;
        if (totalScroll <= 0) return;

        gsap.to(track, {
          x:    -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger:       section,
            start:         'top top',
            end:           () => `+=${totalScroll}`,
            pin:           true,
            scrub:         0.7,
            anticipatePin: 1,
          },
        });

        return () => gsap.set(track, { clearProps: 'x' });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-void"
      style={{ paddingBlock: 'var(--section-pad-y)' }}
      aria-label="Featured projects"
    >
      {/* Section header */}
      <div
        className="flex items-baseline gap-4 mb-14"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <h2
          className="font-display tracking-widest text-ink"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          FEATURED WORK
        </h2>
        <span className="font-mono text-xs text-ink-faint tracking-[0.2em]">
          ({featured.length.toString().padStart(2, '0')})
        </span>
        <Link
          href="/projects"
          className="ml-auto font-mono text-xs text-ink-muted tracking-[0.2em] hover:text-cyan transition-colors duration-300"
        >
          VIEW ALL →
        </Link>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
        style={{ paddingInline: 'var(--section-pad-x)', width: 'max-content' }}
      >
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
