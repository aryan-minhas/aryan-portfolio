import type { Variants } from 'framer-motion';

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_CINEMATIC },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};
