import Link from 'next/link';

const TIMELINE = [
  {
    semester: 'Semester 1',
    period:   'Sep 2024 – Jan 2025',
    projects: ['Buzz Bombers', 'Community Hub'],
    highlight: 'First contact with systems programming and web fundamentals.',
  },
  {
    semester: 'Semester 2',
    period:   'Feb 2025 – Jun 2025',
    projects: ['Sonic Ultimate Heroes'],
    highlight: 'Deep-dived OOP design; built a full custom physics + animation engine.',
  },
  {
    semester: 'Semester 3',
    period:   'Sep 2025 – Jan 2026',
    projects: ['Smart City Management System', 'Super Mario (x86)'],
    highlight: 'Mastered data structures from scratch and shipped a game in Assembly.',
  },
  {
    semester: 'Semester 4',
    period:   'Feb 2026 – Jun 2026',
    projects: ['AVAL Systems', 'ChronoRift', 'CityMind'],
    highlight: 'Three concurrent major projects + co-founded a commercial AI startup.',
  },
] as const;

const LEADERSHIP = [
  { label: 'CO-FOUNDER',   value: 'AVAL R&D — AI financial reconciliation startup, 2024–Present' },
  { label: 'INITIATIVE',   value: 'Self-directed engineering of commercial-grade software during full-time academics' },
  { label: 'MENTALITY',    value: 'Ship production-quality code, not student code. Every project is a portfolio artefact.' },
] as const;

export default function LeadershipHero() {
  return (
    <>
      {/* Academic Timeline */}
      <section
        className="py-24 md:py-32 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-12">
          ACADEMIC TIMELINE
        </p>

        <div className="space-y-0">
          {TIMELINE.map((entry, i) => (
            <div
              key={entry.semester}
              className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 lg:gap-12 py-10 border-t border-[var(--color-border)]"
            >
              <div>
                <span className="font-mono text-xs text-amber tracking-[0.2em]">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <p className="font-heading text-sm font-semibold text-ink mt-1">
                  {entry.semester}
                </p>
                <p className="font-mono text-[10px] text-ink-faint tracking-[0.1em] mt-1">
                  {entry.period}
                </p>
              </div>
              <div>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                  {entry.highlight}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.projects.map((p) => (
                    <span
                      key={p}
                      className="font-mono text-[9px] px-2 py-1 tracking-wider text-amber border border-amber/30"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Highlights */}
      <section
        className="py-24 md:py-32 border-t border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-12">
          LEADERSHIP
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map(({ label, value }) => (
            <div
              key={label}
              className="p-8"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)' }}
            >
              <p className="font-mono text-[10px] text-amber tracking-[0.3em] uppercase mb-4">
                {label}
              </p>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-6">
          <Link
            href="/projects"
            className="font-mono text-xs tracking-[0.2em] text-cyan hover:text-ink transition-colors duration-300"
          >
            VIEW ALL PROJECTS →
          </Link>
          <Link
            href="/contact"
            className="font-mono text-xs tracking-[0.2em] text-ink-muted hover:text-cyan transition-colors duration-300"
          >
            GET IN TOUCH →
          </Link>
        </div>
      </section>
    </>
  );
}
