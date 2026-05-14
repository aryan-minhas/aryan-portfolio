import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getAdjacentProjects,
  getProjectSlugs,
} from '@/lib/data';
import type { ProjectAccent } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT_COLOR: Record<ProjectAccent, string> = {
  cyan:   '#00E5FF',
  amber:  '#FF6B35',
  violet: '#7C3AED',
};

const ACCENT_TEXT: Record<ProjectAccent, string> = {
  cyan:   'text-cyan',
  amber:  'text-amber',
  violet: 'text-violet',
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project  = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug }  = await params;
  const project   = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const accent   = project.accentColor;
  const aColor   = ACCENT_COLOR[accent];
  const aText    = ACCENT_TEXT[accent];

  return (
    <>
      {/* ── § 1: Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col justify-end pb-16 pt-40 border-b border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)', minHeight: '65vh' }}
      >
        <p className={`font-mono text-xs tracking-[0.3em] uppercase mb-4 ${aText}`}>
          {project.course}
        </p>
        <h1
          className="font-display leading-none tracking-widest text-ink mb-6"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
        >
          {project.title.toUpperCase()}
        </h1>
        <p className="font-body text-base text-ink-muted max-w-2xl mb-8 leading-relaxed">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-3 py-1 tracking-wider text-ink-muted"
              style={{ border: '1px solid var(--color-border)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── § 2: Overview + Highlights ─────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <div>
          <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-6">
            OVERVIEW
          </p>
          <p className="font-body text-base text-ink leading-relaxed">
            {project.overview}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-6">
            KEY HIGHLIGHTS
          </p>
          <ul className="space-y-5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-4">
                <span className={`font-mono text-xs mt-0.5 shrink-0 ${aText}`}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="font-body text-sm text-ink-muted leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── § 3: Technical Implementation ───────────────────────────────────────── */}
      <section
        className="py-20 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-12">
          TECHNICAL IMPLEMENTATION
        </p>
        <div>
          {project.sections.map((sec, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 py-10 border-t border-[var(--color-border)]"
            >
              <div className="flex items-start gap-3">
                <span className={`font-mono text-xs shrink-0 mt-0.5 ${aText}`}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="font-heading text-sm font-semibold text-ink tracking-wide leading-snug">
                  {sec.title}
                </h3>
              </div>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── § 4: Full Tech Stack ────────────────────────────────────────────────── */}
      <section
        className="py-16 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-8">
          TECH STACK
        </p>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-4 py-2 tracking-wider text-ink-muted hover:text-ink transition-colors duration-300"
              style={{ border: `1px solid ${aColor}40` }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── § 5: Prev / Next Navigation ─────────────────────────────────────────── */}
      <section
        className="flex items-start justify-between py-16 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
        aria-label="Project navigation"
      >
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-2">
            <span className="font-mono text-[10px] text-ink-faint tracking-[0.2em]">← PREV</span>
            <span
              className="font-display text-ink group-hover:text-cyan transition-colors duration-300"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
            >
              {prev.title.toUpperCase()}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-2 text-right">
            <span className="font-mono text-[10px] text-ink-faint tracking-[0.2em]">NEXT →</span>
            <span
              className="font-display text-ink group-hover:text-cyan transition-colors duration-300"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
            >
              {next.title.toUpperCase()}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </section>
    </>
  );
}
