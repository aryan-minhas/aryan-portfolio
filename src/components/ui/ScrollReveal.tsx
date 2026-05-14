'use client';

import React, { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { initGSAP } from '@/lib/animations/gsap-config';
import type { RevealVariant } from '@/lib/hooks/useScrollReveal';

interface ScrollRevealProps {
  children:         ReactNode;
  variant?:         RevealVariant;
  delay?:           number;
  duration?:        number;
  stagger?:         number;
  start?:           string;
  once?:            boolean;
  staggerChildren?: boolean;
  className?:       string;
  style?:           React.CSSProperties;
  'aria-label'?:    string;
  as?: 'div' | 'section' | 'article' | 'aside' | 'ul' | 'ol';
}

export default function ScrollReveal({
  children,
  variant         = 'slide-up',
  delay           = 0,
  duration        = 0.8,
  stagger         = 0.08,
  start           = 'top 85%',
  once            = true,
  staggerChildren = false,
  className,
  style,
  'aria-label':  ariaLabel,
  as:            Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    initGSAP();
    const el = ref.current;
    if (!el) return;

    const targets: Element[] = staggerChildren
      ? Array.from(el.children)
      : [el];

    const fromMap: Record<RevealVariant, gsap.TweenVars> = {
      'slide-up':   { y: 40, opacity: 0 },
      'slide-left': { x: -60, opacity: 0 },
      'clip-up':    { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
      'fade-in':    { opacity: 0 },
      'count-up':   { opacity: 0 },
    };

    const toMap: Record<RevealVariant, gsap.TweenVars> = {
      'slide-up':   { y: 0, opacity: 1 },
      'slide-left': { x: 0, opacity: 1 },
      'clip-up':    { clipPath: 'inset(0% 0% 0% 0%)' },
      'fade-in':    { opacity: 1 },
      'count-up':   { opacity: 1 },
    };

    gsap.set(targets, fromMap[variant]);

    const tweenVars: gsap.TweenVars = {
      ...toMap[variant],
      delay,
      duration,
      ease: 'power3.out',
      ...(staggerChildren && { stagger }),
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => gsap.to(targets, tweenVars),
    });

    return () => {
      trigger.kill();
      gsap.set(targets, { clearProps: 'all' });
    };
  }, [variant, delay, duration, stagger, start, once, staggerChildren]);

  return React.createElement(
    Tag as string,
    { ref, className: cn(className), style, 'aria-label': ariaLabel },
    children
  );
}
