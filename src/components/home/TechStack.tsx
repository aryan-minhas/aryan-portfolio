import { skills } from '@/lib/data';

const BASE: string[] = [
  ...skills.languages.map((l) => l.name),
  ...skills.frameworks,
  ...skills.infrastructure,
];

const ROW1 = [...BASE, ...BASE];
const ROW2 = [...[...BASE].reverse(), ...[...BASE].reverse()];

function TickerItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-6 shrink-0">
      <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink-faint whitespace-nowrap">
        {label}
      </span>
      <span className="text-cyan/30 font-mono">·</span>
    </span>
  );
}

export default function TechStack() {
  return (
    <div
      className="border-y border-[var(--color-border)] overflow-hidden select-none"
      style={{ paddingBlock: '1rem' }}
      aria-hidden="true"
    >
      {/* Row 1 — left */}
      <div className="flex gap-6 mb-3" style={{ animation: 'marquee 35s linear infinite' }}>
        {ROW1.map((item, i) => (
          <TickerItem key={`r1-${i}`} label={item} />
        ))}
      </div>

      {/* Row 2 — right */}
      <div
        className="flex gap-6"
        style={{ animation: 'marquee 28s linear infinite reverse' }}
      >
        {ROW2.map((item, i) => (
          <TickerItem key={`r2-${i}`} label={item} />
        ))}
      </div>
    </div>
  );
}
