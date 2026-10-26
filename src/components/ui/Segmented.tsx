import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/format';
import { SPRING } from '../../lib/motion';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  className?: string;
}

/** Segmented control. The thumb slides on a spring and follows the value. */
export function Segmented<T extends string>({ label, value, options, onChange, className }: SegmentedProps<T>) {
  const group = useId();
  const reduce = useReducedMotion();
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('inline-flex rounded-full bg-sunk p-1', className)}
    >
      {options.map((o, index) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            id={`${group}-${o.value}`}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={(event) => {
              const step =
                event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
              if (!step) return;
              event.preventDefault();
              const next = options[(index + step + options.length) % options.length];
              onChange(next.value);
              document.getElementById(`${group}-${next.value}`)?.focus();
            }}
            className={cn(
              'relative min-h-11 flex-1 rounded-full px-5 text-small font-semibold transition-colors',
              active ? 'text-ink' : 'text-ink-3 hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={`thumb-${group}`}
                transition={reduce ? { duration: 0 } : SPRING}
                className="absolute inset-0 rounded-full bg-surface shadow-[0_1px_2px_rgb(43_26_19/0.12),0_0_0_1px_rgb(43_26_19/0.06)]"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
