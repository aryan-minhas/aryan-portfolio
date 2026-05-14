import { personal } from '@/lib/data';

const AVAILABILITY = [
  'Full-time roles',
  'Freelance projects',
  'Technical co-founding',
  'Open source',
] as const;

export default function ContactInfo() {
  const INFO = [
    { label: 'EMAIL',    value: personal.email,                               href: `mailto:${personal.email}` },
    { label: 'GITHUB',   value: personal.github.replace('https://', ''),      href: personal.github            },
    { label: 'LINKEDIN', value: personal.linkedin.replace('https://www.', ''), href: personal.linkedin         },
    { label: 'LOCATION', value: personal.location,                            href: null                       },
  ] as const;

  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase">
        REACH OUT
      </p>

      <p className="font-heading text-base font-medium text-ink-muted leading-relaxed max-w-sm">
        Open to collaboration, consulting, or just talking shop about
        systems, AI, and architecture.
      </p>

      {/* Contact rows */}
      <dl className="space-y-0">
        {INFO.map(({ label, value, href }) => (
          <div
            key={label}
            className="flex items-baseline gap-4 py-5 border-b border-[var(--color-border)]"
          >
            <dt className="font-mono text-[10px] text-ink-faint tracking-[0.3em] w-24 shrink-0">
              {label}
            </dt>
            <dd>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="font-mono text-xs text-ink-muted hover:text-cyan transition-colors duration-300 tracking-[0.08em] break-all"
                >
                  {value}
                </a>
              ) : (
                <span className="font-mono text-xs text-ink-muted tracking-[0.08em]">
                  {value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {/* Availability */}
      <div>
        <p className="font-mono text-[10px] text-ink-faint tracking-[0.3em] uppercase mb-4">
          CURRENTLY OPEN TO
        </p>
        <div className="flex flex-wrap gap-2">
          {AVAILABILITY.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-3 py-1.5 text-ink-muted border border-[var(--color-border)] tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
