'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skills } from '@/lib/data';
import { initGSAP } from '@/lib/animations/gsap-config';

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  { label: 'FRAMEWORKS & LIBRARIES', items: skills.frameworks    },
  { label: 'INFRASTRUCTURE',         items: skills.infrastructure },
  { label: 'CS CONCEPTS',            items: skills.concepts      },
] as const;

export default function SkillsMatrix() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initGSAP();
      const bars = ref.current!.querySelectorAll<HTMLElement>('.skill-bar-fill');
      bars.forEach((bar) => {
        const level = bar.dataset.level ?? '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="py-20 border-t border-[var(--color-border)]"
      style={{ paddingInline: 'var(--section-pad-x)' }}
    >
      <p className="font-mono text-xs text-ink-faint tracking-[0.3em] uppercase mb-12">
        SKILLS MATRIX
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Language proficiency bars */}
        <div>
          <p className="font-mono text-[10px] text-ink-faint tracking-[0.25em] uppercase mb-8">
            LANGUAGES
          </p>
          <div className="space-y-7">
            {skills.languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-mono text-xs text-ink tracking-[0.15em]">
                    {lang.name}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {lang.level}%
                  </span>
                </div>
                <div
                  className="relative overflow-hidden"
                  style={{ height: '2px', background: 'var(--color-depth-3)' }}
                >
                  <div
                    className="skill-bar-fill absolute left-0 top-0 h-full"
                    data-level={lang.level}
                    style={{
                      width:     0,
                      background: 'var(--color-cyan)',
                      boxShadow:  '0 0 8px rgba(0,229,255,0.5)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge grids */}
        <div className="space-y-10">
          {GROUPS.map(({ label, items }) => (
            <div key={label}>
              <p className="font-mono text-[10px] text-ink-faint tracking-[0.25em] uppercase mb-4">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[10px] px-3 py-1.5 text-ink-muted tracking-wider border border-[var(--color-border)] hover:border-cyan/40 hover:text-ink transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
