'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/lib/store';
import { initGSAP } from '@/lib/animations/gsap-config';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

gsap.registerPlugin(SplitText, TextPlugin);

const TERMINAL_LINES = [
  '> INITIALIZING SYSTEM...',
  '> LOADING: aryan.ali.khan [ENGINEER]',
  '> MODULES: C++ / Java / Python / AI \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 100%',
  '> STATUS: ONLINE',
] as const;

const TYPING_SPEED = 0.028;

export default function HeroSection() {
  const setLoading = useAppStore((s) => s.setLoading);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initGSAP();

      const isRevisit =
        typeof window !== 'undefined' &&
        localStorage.getItem('cipher-boot') === '1';

      document.documentElement.style.overflow = 'hidden';

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = '';
          setLoading(false);
          if (!isRevisit) localStorage.setItem('cipher-boot', '1');
        },
      });

      if (isRevisit) {
        // ── Condensed revisit (≈0.5s) ───────────────────────────────────────
        tl.set('.boot-overlay', { autoAlpha: 0 })
          .set(
            ['.hero-eyebrow', '.hero-name', '.hero-subtitle', '.hero-ctas', '.hero-scroll'],
            { autoAlpha: 0, y: 20 }
          )
          .to('.hero-eyebrow',  { autoAlpha: 1, y: 0, duration: 0.3 })
          .to('.hero-name',     { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
          .to('.hero-subtitle', { autoAlpha: 1, y: 0, duration: 0.4 }, '-=0.2')
          .to(['.hero-ctas', '.hero-scroll'], { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 }, '-=0.2');
      } else {
        // ── Full boot sequence ───────────────────────────────────────────────

        // Phase 1 (0s–0.8s): black screen with cursor blink (CSS only)
        tl.set(['.hero-eyebrow', '.hero-subtitle', '.hero-ctas', '.hero-scroll'], {
          autoAlpha: 0,
          y: 20,
        }).set('.hero-name', { autoAlpha: 0, y: 120 });

        // Phase 2 (0.8s–2.5s): type each line with TextPlugin
        const lineEls = gsap.utils.toArray<HTMLElement>(
          '.boot-line',
          containerRef.current!
        );
        lineEls.forEach((el, i) => {
          tl.to(
            el,
            {
              text: { value: TERMINAL_LINES[i], delimiter: '' },
              duration: TERMINAL_LINES[i].length * TYPING_SPEED,
              ease: 'none',
            },
            i === 0 ? 0.8 : '+=0.14'
          );
        });

        // Phase 3 (2.5s–3.2s): SplitText shatter chars upward, hide cursor
        tl.call(
          () => {
            const lines = Array.from(
              containerRef.current!.querySelectorAll<HTMLElement>('.boot-line')
            );
            const split = new SplitText(lines, { type: 'chars' });
            gsap.to(split.chars, {
              y: -60,
              opacity: 0,
              stagger: { amount: 0.55, from: 'random' },
              duration: 0.6,
              ease: 'power3.in',
              onComplete: () => split.revert(),
            });
            gsap.to(
              containerRef.current!.querySelector<HTMLElement>('.boot-cursor'),
              { autoAlpha: 0, duration: 0.2 }
            );
          },
          undefined,
          '+=0.35'
        );

        // Wait for shatter animation then fade the overlay out
        tl.to('.boot-overlay', { autoAlpha: 0, duration: 0.35 }, '+=1.1');

        // Phase 4 (3.2s–4.0s): hero content crashes in
        tl.to('.hero-eyebrow', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' })
          .to('.hero-name',    { autoAlpha: 1, y: 0, duration: 1.2, ease: 'cinematic' }, '-=0.2')
          .to('.hero-subtitle',{ autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
          .to(['.hero-ctas', '.hero-scroll'], {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
          }, '-=0.4');
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center items-center min-h-svh overflow-hidden bg-void"
      aria-label="Hero — Aryan Ali Khan"
    >
      {/* ── Ambient glow beneath canvas ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Three.js HeroScene ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <HeroScene />
      </div>

      {/* ── Phase 1–3: Boot Overlay ─────────────────────────────────────────── */}
      <div
        className="boot-overlay fixed inset-0 z-30 flex flex-col justify-center bg-void"
        style={{ paddingInline: 'var(--section-pad-x)' }}
        aria-hidden="true"
      >
        <div className="space-y-2 mb-4">
          {TERMINAL_LINES.map((_, i) => (
            <p
              key={i}
              className="boot-line font-mono text-sm md:text-base text-cyan tracking-wide"
            />
          ))}
        </div>
        <span
          className="boot-cursor inline-block w-2.5 h-5 bg-cyan animate-blink"
          aria-hidden="true"
        />
      </div>

      {/* ── Phase 4–5: Hero Content ─────────────────────────────────────────── */}
      <div
        className="relative z-10 text-center w-full"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="hero-eyebrow font-mono text-xs text-cyan tracking-[0.35em] uppercase mb-6 md:mb-8">
          SYSTEMS ENGINEER · AI ARCHITECT · FAST-NUCES &apos;28
        </p>

        <h1
          className="hero-name font-display leading-[0.88] tracking-widest text-ink"
          style={{ fontSize: 'clamp(3.5rem, 13vw, 14rem)' }}
        >
          ARYAN{' '}
          <span
            className="text-cyan block sm:inline"
            style={{ textShadow: 'var(--glow-cyan)' }}
          >
            ALI KHAN
          </span>
        </h1>

        <p className="hero-subtitle font-body text-ink-muted mt-8 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
          I build systems that don&apos;t break.{' '}
          <span className="text-ink">And some that do — on purpose.</span>
        </p>

        <div className="hero-ctas flex flex-wrap gap-4 justify-center mt-10 md:mt-12">
          <Link
            href="/projects"
            className="font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 border border-cyan text-cyan hover:bg-cyan hover:text-void transition-all duration-300"
          >
            VIEW MY WORK
          </Link>
          <Link
            href="/contact"
            className="font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[var(--color-border)] text-ink-muted hover:border-ink hover:text-ink transition-all duration-300"
          >
            CONTACT
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────────── */}
      <div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-ink-faint tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan/30 to-transparent" />
      </div>
    </section>
  );
}
