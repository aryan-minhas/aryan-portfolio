'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/lib/store';
import { initGSAP } from '@/lib/animations/gsap-config';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

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

      gsap.set('.hero-scene',   { autoAlpha: 0 });
      gsap.set('.hero-name',    { autoAlpha: 0, y: 30 });
      gsap.set(
        ['.hero-eyebrow', '.hero-subtitle', '.hero-ctas', '.hero-scroll'],
        { autoAlpha: 0, y: 20 }
      );

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = '';
          setLoading(false);
          if (!isRevisit) localStorage.setItem('cipher-boot', '1');
        },
      });

      if (isRevisit) {
        // ── Condensed revisit (≈1.2s) ────────────────────────────────────────
        tl.to('.boot-overlay',  { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
          .to('.hero-scene',    { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
          .to('.hero-name',     { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 0.2)
          .to('.hero-eyebrow',  { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4)
          .to('.hero-subtitle', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.55)
          .to(['.hero-ctas', '.hero-scroll'], { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.65);
      } else {
        // ── Full cinematic sequence (≈4s) ────────────────────────────────────
        tl
          // Globe rises from the void
          .to('.hero-scene',    { autoAlpha: 1, duration: 2.0, ease: 'power2.inOut' }, 0.3)
          // Overlay dissolves as the globe materialises
          .to('.boot-overlay',  { autoAlpha: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
          // Name emerges — slow scale + fade
          .to('.hero-name',     { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 1.0)
          // Supporting text settles in unhurriedly
          .to('.hero-eyebrow',  { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 2.2)
          .to('.hero-subtitle', { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 2.5)
          .to(['.hero-ctas', '.hero-scroll'], {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          }, 2.8);
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center items-center min-h-svh overflow-hidden bg-void -mt-28 md:-mt-32"
      aria-label="Hero — Aryan Ali Khan"
    >
      {/* ── Ambient glow beneath canvas ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(194,166,73,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Three.js HeroScene ───────────────────────────────────────────────── */}
      <div className="hero-scene absolute inset-0 pointer-events-none" aria-hidden="true">
        <HeroScene />
      </div>

      {/* ── Boot Overlay — pitch black ──────────────────────────────────────── */}
      <div
        className="boot-overlay fixed inset-0 z-30 bg-void"
        aria-hidden="true"
      />

      {/* ── Hero Content ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 text-center w-full"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="hero-eyebrow font-mono text-xs text-ink-muted tracking-[0.35em] uppercase mb-6 md:mb-8">
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

        <p className="hero-subtitle font-body text-ink-muted mt-8 max-w-xl mx-auto leading-relaxed text-base md:text-lg text-center">
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
