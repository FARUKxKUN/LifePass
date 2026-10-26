import { useId, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/format';
import { SPRING } from '../../lib/motion';

interface Tab<T extends string> {
  value: T;
  label: string;
}

interface TabsProps<T extends string> {
  label: string;
  value: T;
  tabs: Tab<T>[];
  onChange: (value: T) => void;
  /** Id prefix for the panel; the panel must carry id `${panelPrefix}-${value}`. */
  panelPrefix: string;
}

/** Tab list with arrow-key navigation. The underline travels between tabs on a spring. */
export function Tabs<T extends string>({ label, value, tabs, onChange, panelPrefix }: TabsProps<T>) {
  const group = useId();
  const reduce = useReducedMotion();

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((t) => t.value === value);
    const next = e.key === 'ArrowRight' ? index + 1 : e.key === 'ArrowLeft' ? index - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length];
    onChange(target.value);
    document.getElementById(`${panelPrefix}-tab-${target.value}`)?.focus();
  };

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKey} className="flex gap-1 overflow-x-auto border-b border-line">
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            id={`${panelPrefix}-tab-${t.value}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`${panelPrefix}-${t.value}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.value)}
            className={cn(
              'relative min-h-12 shrink-0 px-5 text-base font-semibold transition-colors',
              active ? 'text-ink' : 'text-ink-3 hover:text-ink',
            )}
          >
            {t.label}
            {active && (
              <motion.span
                layoutId={`tab-line-${group}`}
                transition={reduce ? { duration: 0 } : SPRING}
                className="absolute inset-x-3 -bottom-px h-0.5 bg-pulse"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
