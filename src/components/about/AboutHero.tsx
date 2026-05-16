import Image from 'next/image';
import { personal, education } from '@/lib/data';

const GLANCE = [
  { label: 'STATUS',   value: `${education.currentYear}` },
  { label: 'SCHOOL',   value: 'FAST-NUCES, Islamabad'     },
  { label: 'DEGREE',   value: 'BS Computer Science'       },
  { label: 'CGPA',     value: `${education.cgpa} / 4.00`  },
  { label: 'VENTURE',  value: 'Co-Founder, AVAL R&D'      },
  { label: 'LOCATION', value: personal.location           },
] as const;

export default function AboutHero() {
  const [first, ...rest] = personal.name.split(' ');

  return (
    <>
      {/* ── § 1: Hero ─────────────────────────────────────────────────── */}
      <section
        className="flex flex-col md:flex-row items-center gap-12 pt-8 pb-20 border-b border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <div className="flex-1">
          <p className="font-mono text-xs text-cyan tracking-[0.3em] uppercase mb-6">
            WHO I AM
          </p>
          <h1
            className="font-display leading-none tracking-widest text-ink mb-6"
            style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
          >
            {first.toUpperCase()}
            <br />
            <span style={{ color: 'var(--color-cyan)', textShadow: 'var(--glow-cyan)' }}>
              {rest.join(' ').toUpperCase()}
            </span>
          </h1>
          <p className="font-heading text-lg font-medium text-ink-muted">
            {personal.title}
          </p>
        </div>
        <div className="shrink-0 w-48 md:w-64 border-4 border-[var(--color-cyan)] rounded-none overflow-hidden">
          <Image
            src="/images/profile.jpg"
            alt="Aryan Ali Khan"
            width={480}
            height={640}
            className="w-full aspect-[3/4] object-cover grayscale-[50%] opacity-90 hover:grayscale-0 transition-all duration-700 rounded-md"
          />
        </div>
      </section>

      {/* ── § 2: Bio + At-a-Glance ──────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-24 md:py-32 border-b border-[var(--color-border)]"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <div>
          <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-8">
            BACKGROUND
          </p>
          <p
            className="font-heading font-medium text-ink leading-[1.8]"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}
          >
            {personal.bio}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-6">
            AT A GLANCE
          </p>
          <dl className="space-y-0">
            {GLANCE.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline gap-4 py-4 border-b border-[var(--color-border)]"
              >
                <dt className="font-mono text-[10px] text-ink-faint tracking-[0.3em] w-24 shrink-0">
                  {label}
                </dt>
                <dd className="font-body text-sm text-ink-muted">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
