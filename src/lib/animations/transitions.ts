import type { Variants } from 'framer-motion';

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_WIPE: [number, number, number, number]      = [0.76, 0, 0.24, 1];

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.35 },
  },
};

export const overlayWipe: Variants = {
  initial: { scaleX: 1 },
  animate: {
    scaleX: 0,
    transition: { duration: 0.65, ease: EASE_WIPE, delay: 0.05 },
  },
  exit: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE_WIPE },
  },
};
