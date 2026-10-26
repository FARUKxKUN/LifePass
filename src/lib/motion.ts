import type { Transition } from 'motion/react';

/*
 * Springs are critically damped by default (no overshoot). Bounce is reserved
 * for moments that carry momentum, which in this app is only the QR card.
 */
export const SPRING: Transition = { type: 'spring', stiffness: 420, damping: 40, mass: 1 };
export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 260, damping: 32, mass: 1 };
export const SPRING_LIVELY: Transition = { type: 'spring', stiffness: 300, damping: 22, mass: 1 };
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
