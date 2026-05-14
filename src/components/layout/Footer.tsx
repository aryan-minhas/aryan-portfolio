import Link from 'next/link';
import { personal } from '@/lib/data';

const NAV_LINKS = [
  { label: 'ABOUT',      href: '/about'      },
  { label: 'PROJECTS',   href: '/projects'   },
  { label: 'EXPERIENCE', href: '/experience' },
  { label: 'CONTACT',    href: '/contact'    },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-void"
      style={{ paddingInline: 'var(--section-pad-x)' }}
    >
      {/* Main row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-12">

        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-ink hover:text-cyan transition-colors duration-300"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          aria-label="Home"
        >
          AAK
        </Link>

        {/* Nav */}
        <nav className="flex flex-wrap gap-6 md:gap-8" aria-label="Footer navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-[10px] text-ink-faint hover:text-cyan tracking-[0.25em] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-3" aria-label="Social links">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="font-mono text-[10px] text-ink-faint hover:text-cyan tracking-[0.2em] transition-colors duration-300 px-3 py-2 border border-[var(--color-border)] hover:border-cyan/40"
          >
            GH
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="font-mono text-[10px] text-ink-faint hover:text-cyan tracking-[0.2em] transition-colors duration-300 px-3 py-2 border border-[var(--color-border)] hover:border-cyan/40"
          >
            LI
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="font-mono text-[10px] text-ink-faint hover:text-cyan tracking-[0.2em] transition-colors duration-300 px-3 py-2 border border-[var(--color-border)] hover:border-cyan/40"
          >
            EM
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-4 border-t border-[var(--color-border)]"
      >
        <p className="font-mono text-[10px] text-ink-faint tracking-[0.2em]">
          &copy; {year} ARYAN ALI KHAN. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-[10px] text-ink-faint tracking-[0.2em]">
          BUILT WITH NEXT.JS &middot; GSAP &middot; THREE.JS
        </p>
      </div>
    </footer>
  );
}
