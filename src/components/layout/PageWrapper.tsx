'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_WIPE: [number, number, number, number]      = [0.76, 0, 0.24, 1];

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.01 },
        }}
        exit={{
          opacity: 0,
          y: -16,
          transition: { duration: 0.35, ease: EASE_CINEMATIC },
        }}
        className="relative pt-28 md:pt-32"
      >
        {/* ── Vertical curtain wipe — rises upward, revealing the page ── */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{
            scaleY: 0,
            transition: { duration: 0.75, ease: EASE_WIPE, delay: 0.05 },
          }}
          className="fixed inset-0 pointer-events-none z-[9998] origin-top"
          style={{ backgroundColor: 'var(--color-cyan)' }}
          aria-hidden="true"
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
