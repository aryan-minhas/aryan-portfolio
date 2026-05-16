'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useAppStore } from '@/lib/store';

export default function CustomCursor() {
  const cursorVariant = useAppStore((s) => s.cursorVariant);

  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

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

  const isHover = cursorVariant === 'hover' || cursorVariant === 'drag';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: mouseX, y: mouseY, marginLeft: -6, marginTop: -6 }}
      aria-hidden="true"
    >
      <motion.div
        className="w-3 h-3 rounded-full bg-[#c2a649]"
        animate={{
          scale: isHover ? 1.5 : 1,
          opacity: isHover ? 0.5 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
