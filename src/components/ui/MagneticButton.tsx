'use client';

import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import type { CursorVariant } from '@/types';

interface MagneticButtonProps {
  children:       ReactNode;
  strength?:      number;
  className?:     string;
  cursorVariant?: CursorVariant;
  cursorLabel?:   string;
}

export default function MagneticButton({
  children,
  strength      = 0.4,
  className,
  cursorVariant = 'hover',
  cursorLabel   = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const setCursorLabel   = useAppStore((s) => s.setCursorLabel);

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect    = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    gsap.to(ref.current, {
      x:        (e.clientX - centerX) * strength,
      y:        (e.clientY - centerY) * strength,
      duration: 0.3,
      ease:     'power2.out',
    });
  }

  function handleMouseEnter() {
    setCursorVariant(cursorVariant);
    if (cursorLabel) setCursorLabel(cursorLabel);
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x:        0,
      y:        0,
      duration: 0.7,
      ease:     'elastic.out(1, 0.3)',
    });
    setCursorVariant('default');
    setCursorLabel('');
  }

  return (
    <div
      ref={ref}
      className={cn('inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
