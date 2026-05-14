'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAP } from '@/lib/animations/gsap-config';

export type RevealVariant =
  | 'slide-up'
  | 'slide-left'
  | 'clip-up'
  | 'fade-in'
  | 'count-up';

export interface UseScrollRevealOptions {
  variant?:          RevealVariant;
  delay?:            number;
  duration?:         number;
  stagger?:          number;
  start?:            string;
  once?:             boolean;
  staggerChildren?:  boolean;
}

function fromVars(variant: RevealVariant): gsap.TweenVars {
  switch (variant) {
    case 'slide-up':   return { y: 40, opacity: 0 };
    case 'slide-left': return { x: -60, opacity: 0 };
    case 'clip-up':    return { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 };
    case 'count-up':
    case 'fade-in':    return { opacity: 0 };
  }
}

function toVars(variant: RevealVariant): gsap.TweenVars {
  switch (variant) {
    case 'slide-up':   return { y: 0, opacity: 1 };
    case 'slide-left': return { x: 0, opacity: 1 };
    case 'clip-up':    return { clipPath: 'inset(0% 0% 0% 0%)' };
    case 'count-up':
    case 'fade-in':    return { opacity: 1 };
  }
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    variant         = 'slide-up',
    delay           = 0,
    duration        = 0.8,
    stagger         = 0.08,
    start           = 'top 85%',
    once            = true,
    staggerChildren = false,
  } = options;

  useEffect(() => {
    initGSAP();
    const el = ref.current;
    if (!el) return;

    const targets: Element[] = staggerChildren
      ? Array.from(el.children)
      : [el];

    gsap.set(targets, fromVars(variant));

    const tweenVars: gsap.TweenVars = {
      ...toVars(variant),
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

  return ref;
}
