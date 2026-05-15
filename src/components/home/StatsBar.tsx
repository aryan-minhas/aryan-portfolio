'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { initGSAP } from '@/lib/animations/gsap-config';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 8, suffix: '',  label: 'PROJECTS'  },
  { value: 4, suffix: '',  label: 'SEMESTERS' },
  { value: 7, suffix: '+', label: 'LANGUAGES' },
  { value: 1, suffix: '',  label: 'STARTUP'   },
] as const;

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initGSAP();
      const els = ref.current!.querySelectorAll<HTMLElement>('.stat-num');

      els.forEach((el, i) => {
        const { value, suffix } = STATS[i];
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          onUpdate() {
            el.textContent =
              Math.round(proxy.val).toString().padStart(2, '0') + suffix;
          },
          onComplete() {
            el.textContent = value.toString().padStart(2, '0') + suffix;
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="border-y border-[var(--color-border)] py-20 md:py-24"
      style={{ paddingInline: 'var(--section-pad-x)' }}
      aria-label="Portfolio statistics"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-[var(--color-border)]">
        {STATS.map(({ value, suffix, label }) => (
          <div
            key={label}
            className="flex flex-col items-center md:items-start md:px-12 first:md:pl-0 last:md:pr-0 gap-2"
          >
            <span
              className="stat-num font-display leading-none text-amber"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                textShadow: 'var(--glow-amber)',
              }}
            >
              {value.toString().padStart(2, '0') + suffix}
            </span>
            <span className="font-mono text-[10px] tracking-[0.35em] text-ink-muted uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
