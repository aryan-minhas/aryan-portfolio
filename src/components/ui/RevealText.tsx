'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { initGSAP } from '@/lib/animations/gsap-config';

gsap.registerPlugin(SplitText);

type SplitType = 'words' | 'chars' | 'lines';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface RevealTextProps {
  children:  string;
  as?:       TextTag;
  splitBy?:  SplitType;
  delay?:    number;
  duration?: number;
  stagger?:  number;
  start?:    string;
  className?: string;
}

export default function RevealText({
  children,
  as:       Tag = 'p',
  splitBy   = 'words',
  delay     = 0,
  duration  = 0.9,
  stagger   = 0.045,
  start     = 'top 88%',
  className,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initGSAP();
      const el = ref.current;
      if (!el) return;

      const split   = new SplitText(el, { type: splitBy });
      const targets = split[splitBy] as HTMLElement[];

      gsap.set(targets, { y: '105%', opacity: 0 });

      gsap.to(targets, {
        y:       '0%',
        opacity: 1,
        stagger,
        duration,
        ease:    'power3.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          once:    true,
        },
        onComplete: () => split.revert(),
      });
    },
    { scope: ref }
  );

  return (
    React.createElement(
    Tag as string,
    { ref, className: cn('overflow-hidden', className) },
    children
  )
  );
}
