import type { ReactNode } from 'react';
import { cn } from '../../lib/format';

type Tone = 'neutral' | 'pulse' | 'alert' | 'caution';

const tones: Record<Tone, string> = {
  neutral: 'bg-sunk text-ink-2',
  pulse: 'bg-pulse-tint text-pulse-deep',
  alert: 'bg-alert-tint text-alert',
  caution: 'bg-caution-tint text-caution',
};

export function Chip({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
