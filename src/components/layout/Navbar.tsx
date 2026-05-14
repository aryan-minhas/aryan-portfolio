'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

gsap.registerPlugin();

const NAV_LINKS = [
  { href: '/about',      label: 'ABOUT'      },
  { href: '/projects',   label: 'PROJECTS'   },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/contact',    label: 'CONTACT'    },
];

const MENU_OVERLAY_VARIANTS = {
  closed: {
    clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as const },
  },
  open: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const MOBILE_ITEM_VARIANTS = {
  closed: { opacity: 0, y: 24 },
  open:   (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25 + i * 0.07,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef   = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useGSAP(
    () => {
      if (!linksRef.current) return;
      const links = linksRef.current.querySelectorAll('.nav-link');
      gsap.from(links, {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.4,
      });
    },
    { scope: navRef }
  );

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled && 'border-b border-[var(--color-border)]'
        )}
        style={
          scrolled
            ? { background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(20px)' }
            : { background: 'transparent' }
        }
      >
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          style={{ paddingInline: 'var(--section-pad-x)' }}
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-widest text-ink hover:text-cyan transition-colors duration-300"
            aria-label="Aryan Ali Khan — Home"
          >
            ARY<span className="text-cyan">AN</span>
          </Link>

          {/* ── Desktop Links ── */}
          <div
            ref={linksRef}
            className="hidden md:flex items-center gap-8"
            role="list"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  className={cn(
                    'nav-link relative font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 py-1',
                    isActive ? 'text-cyan' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-px left-0 right-0 h-px bg-cyan"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="relative md:hidden z-[60] w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block w-6 h-px bg-ink"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block w-6 h-px bg-ink"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-px bg-ink"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={MENU_OVERLAY_VARIANTS}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center"
            style={{
              background: 'rgba(5,5,7,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <nav className="flex flex-col items-center gap-6">
              {[{ href: '/', label: 'HOME' }, ...NAV_LINKS].map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={MOBILE_ITEM_VARIANTS}
                  initial="closed"
                  animate="open"
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'font-display text-6xl tracking-widest transition-colors duration-300',
                      pathname === link.href
                        ? 'text-cyan'
                        : 'text-ink hover:text-cyan'
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-10 flex gap-8 font-mono text-xs text-ink-muted tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              <a
                href="mailto:aryanaliminhas@gmail.com"
                className="hover:text-cyan transition-colors"
              >
                EMAIL
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan transition-colors"
              >
                LINKEDIN
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
