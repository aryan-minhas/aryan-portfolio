'use client';

import { useRef } from 'react';
import type { MouseEvent } from 'react';
import gsap from 'gsap';

export function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLElement>(null);

  function onMouseMove(e: MouseEvent) {
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

  function onMouseLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x:        0,
      y:        0,
      duration: 0.7,
      ease:     'elastic.out(1, 0.3)',
    });
  }

  return { ref, onMouseMove, onMouseLeave } as const;
}
