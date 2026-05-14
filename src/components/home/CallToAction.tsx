import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { personal } from '@/lib/data';

export default function CallToAction() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        paddingBlock:   'var(--section-pad-y)',
        paddingInline:  'var(--section-pad-x)',
      }}
      aria-label="Call to action"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Label */}
      <p className="relative font-mono text-xs text-cyan tracking-[0.4em] uppercase mb-8 z-10">
        READY TO BUILD
      </p>

      {/* Headline */}
      <h2
        className="relative font-display leading-[0.88] tracking-widest text-ink mb-4 z-10"
        style={{ fontSize: 'clamp(2.8rem, 9vw, 8.5rem)' }}
      >
        LET&apos;S BUILD SOMETHING
      </h2>
      <h2
        className="relative font-display leading-[0.88] tracking-widest mb-14 z-10"
        style={{
          fontSize:   'clamp(2.8rem, 9vw, 8.5rem)',
          color:      'var(--color-amber)',
          textShadow: 'var(--glow-amber)',
        }}
      >
        RUTHLESSLY GOOD.
      </h2>

      {/* Tagline */}
      <p className="relative font-body text-sm text-ink-muted max-w-md mb-12 z-10">
        {personal.tagline}
      </p>

      {/* CTA button */}
      <MagneticButton cursorLabel="CONNECT" className="relative z-10">
        <Link
          href="/contact"
          className="inline-block font-mono text-xs tracking-[0.25em] uppercase px-12 py-5 text-cyan transition-all duration-300"
          style={{ border: '1px solid var(--color-cyan)' }}
        >
          GET IN TOUCH
        </Link>
      </MagneticButton>
    </section>
  );
}
