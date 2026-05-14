'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const SPRING = { damping: 28, stiffness: 350, mass: 0.5 };

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const RING_ANIMATE = {
  default: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid var(--color-cyan)',
    backgroundColor: 'transparent',
  },
  hover: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    border: '1px solid var(--color-cyan)',
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
  },
  text: {
    width: 3,
    height: 28,
    borderRadius: '2px',
    border: 'none',
    backgroundColor: 'var(--color-cyan)',
  },
  drag: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    border: '1px solid var(--color-cyan)',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
  },
} as const;

export default function CustomCursor() {
  const cursorVariant = useAppStore((s) => s.cursorVariant);
  const cursorLabel   = useAppStore((s) => s.cursorLabel);

  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const ringX  = useSpring(mouseX, SPRING);
  const ringY  = useSpring(mouseY, SPRING);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const hideDot =
    cursorVariant === 'hover' || cursorVariant === 'text';

  return (
    <>
      {/* ── Dot — exact cursor position ──────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, marginLeft: -4, marginTop: -4 }}
        animate={{ opacity: hideDot ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />

      {/* ── Ring — spring-lagged, centered via x/y: '-50%' ───────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ x: '-50%', y: '-50%' }}
          animate={RING_ANIMATE[cursorVariant] ?? RING_ANIMATE.default}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {cursorVariant === 'drag' && (
            <motion.span
              className="font-mono text-[8px] text-cyan tracking-[0.15em] select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              DRAG
            </motion.span>
          )}
          {cursorVariant === 'hover' && cursorLabel && (
            <motion.span
              className="font-mono text-[8px] text-cyan tracking-[0.1em] text-center px-1 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
