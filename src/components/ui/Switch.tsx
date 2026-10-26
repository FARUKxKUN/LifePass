import { cn } from '../../lib/format';

interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-200 disabled:opacity-45',
        checked ? 'bg-pulse' : 'bg-ink/25',
      )}
    >
      <span
        className={cn(
          'block size-6 rounded-full bg-surface shadow-sm transition-transform duration-200 ease-out-soft',
          checked ? 'translate-x-6' : 'translate-x-0',
        )}
      />
    </button>
  );
}
