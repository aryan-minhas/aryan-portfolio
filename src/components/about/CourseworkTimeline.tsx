import { education } from '@/lib/data';
import type { Course } from '@/types';

function groupBySemester(courses: readonly Course[]): Record<number, Course[]> {
  return courses.reduce<Record<number, Course[]>>((acc, c) => {
    (acc[c.semester] ??= []).push(c);
    return acc;
  }, {});
}

export default function CourseworkTimeline() {
  const bySem  = groupBySemester(education.coursework);
  const sems   = Object.keys(bySem).map(Number).sort();

  return (
    <section
      className="py-24 md:py-32 border-t border-[var(--color-border)]"
      style={{ paddingInline: 'var(--section-pad-x)' }}
    >
      {/* Education summary card */}
      <div
        className="p-8 mb-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center"
        style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)' }}
      >
        <div>
          <p className="font-mono text-xs text-cyan tracking-[0.3em] uppercase mb-3">
            EDUCATION
          </p>
          <h3 className="font-heading text-xl font-semibold text-ink mb-1">
            {education.institution}
          </h3>
          <p className="font-body text-sm text-ink-muted">
            {education.degree} &middot; {education.period}
          </p>
        </div>
        <div className="text-right">
          <span
            className="font-display leading-none text-cyan block"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', textShadow: 'var(--glow-cyan)' }}
          >
            {education.cgpa}
          </span>
          <span className="font-mono text-[10px] text-ink-faint tracking-[0.25em] uppercase">
            CGPA
          </span>
        </div>
      </div>

      {/* Semester grid */}
      <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-8">
        COURSEWORK
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {sems.map((sem) => (
          <div key={sem}>
            <p
              className="font-mono text-[10px] text-cyan tracking-[0.3em] uppercase mb-4 pb-2"
              style={{ borderBottom: '1px solid var(--color-cyan-dim)' }}
            >
              SEMESTER {sem}
            </p>
            <ul className="space-y-3">
              {bySem[sem].map((course) => (
                <li key={course.name} className="flex items-start gap-2">
                  <span
                    className="shrink-0 rounded-full mt-[7px]"
                    style={{
                      width:      '5px',
                      height:     '5px',
                      background: course.category === 'core'
                        ? 'var(--color-cyan)'
                        : 'var(--color-amber)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="font-body text-xs text-ink-muted leading-relaxed">
                    {course.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-8">
        <span className="flex items-center gap-2 font-mono text-[10px] text-ink-faint tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" aria-hidden="true" />
          CORE
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] text-ink-faint tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" aria-hidden="true" />
          MATHEMATICS
        </span>
      </div>
    </section>
  );
}
