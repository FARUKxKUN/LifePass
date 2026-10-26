import { Link } from 'react-router-dom';
import { cn } from '../../lib/format';
import { initials } from '../../lib/format';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('inline-flex min-h-11 items-center gap-3', className)} aria-label="LifePass, accueil">
      <img src="/logo.svg" alt="" width={36} height={36} className="size-9" />
      <span className="font-display text-2xl font-medium tracking-tight" style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 60" }}>
        LifePass
      </span>
    </Link>
  );
}

/** Initials in a plain disc. Replaces the emoji avatars of the original. */
export function Avatar({ first, last, size = 'md', className }: { first: string; last: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const dim = size === 'lg' ? 'size-20 text-3xl' : size === 'sm' ? 'size-10 text-small' : 'size-12 text-lg';
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-pulse-tint font-display font-medium text-pulse-deep',
        dim,
        className,
      )}
    >
      {initials(first, last)}
    </span>
  );
}

/** Always-visible honesty note. Present on every public and app screen. */
export function PrototypeNote({ className }: { className?: string }) {
  return (
    <p className={cn('text-small text-ink-3', className)}>
      Prototype de démonstration. Toutes les données sont fictives. Ne saisissez aucune information réelle : cette application n'est ni sécurisée ni conforme pour des données de santé.
    </p>
  );
}
