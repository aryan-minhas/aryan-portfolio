import type { Metadata } from 'next';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's build something ruthlessly good. Get in touch with Aryan Ali Khan.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── § 1: Hero ────────────────────────────────────────────────────────── */}
      <section
        className="flex items-end pb-12 pt-40"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <h1 className="font-display text-[clamp(4rem,14vw,13rem)] leading-none tracking-widest text-ink">
          SAY{' '}
          <span className="text-cyan" style={{ textShadow: 'var(--glow-cyan)' }}>
            HELLO
          </span>
        </h1>
      </section>

      {/* ── § 2: Form + Info ─────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <SectionPlaceholder
          id="contact-form"
          label="CONTACT FORM"
          sublabel="Name · Email · Message — stagger reveal on scroll"
          height="480px"
          accent="cyan"
        />
        <SectionPlaceholder
          id="contact-info"
          label="CONTACT INFO"
          sublabel="Email · GitHub · LinkedIn — magnetic icon buttons"
          height="480px"
          accent="violet"
        />
      </section>

      {/* ── § 3: Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-[var(--color-border)] py-8 flex items-center justify-between"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <p className="font-mono text-xs text-ink-muted tracking-widest">
          © 2024 ARYAN ALI KHAN
        </p>
        <div className="flex gap-6">
          {['GITHUB', 'LINKEDIN', 'EMAIL'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-xs text-ink-muted hover:text-cyan transition-colors tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
