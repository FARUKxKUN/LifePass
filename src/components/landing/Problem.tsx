import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "Vos analyses sont chez le laboratoire. Vos ordonnances chez le généraliste. Vos radios chez le radiologue. Aux urgences, personne ne connaît vos allergies. LifePass réunit tout, et vous décidez qui l'ouvre.";

/**
 * Words light up at reading pace as the paragraph crosses the viewport.
 * The motion mirrors the point: information that was dim and scattered becomes clear.
 */
export function Problem() {
  const root = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => STATEMENT.split(' '), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const spans = el.querySelectorAll<HTMLElement>('[data-word]');
      gsap.fromTo(
        spans,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section aria-label="Le problème" className="shell py-24 md:py-36">
      <p ref={root} className="max-w-5xl font-display text-[clamp(1.875rem,4.4vw,3.75rem)] leading-[1.12] tracking-[-0.025em]" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}>
        {words.map((w, i) => (
          <span key={i} data-word>
            {w}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}
