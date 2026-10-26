import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Bell, Check, FileText, ShieldCheck, WarningCircle } from '@phosphor-icons/react';
import type { AppNotification, NotificationType } from '../../types';
import { cn } from '../../lib/format';
import { SPRING } from '../../lib/motion';
import { Button, IconButton } from '../ui/Button';

const ICONS: Record<NotificationType, typeof Bell> = {
  access: ShieldCheck,
  report: FileText,
  warning: WarningCircle,
  system: Bell,
};

/** Popover that grows from the bell. Closes on outside press and Escape. */
export function NotificationCenter({ initial }: { initial: AppNotification[] }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initial);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reduce = useReducedMotion();
  const unread = items.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      root.current?.querySelector('button')?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <IconButton
        label={unread > 0 ? `Notifications, ${unread} non lues` : 'Notifications'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative"
      >
        <Bell size={24} />
        {unread > 0 && <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-alert ring-2 ring-paper" />}
      </IconButton>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label="Notifications"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -6 }}
            transition={reduce ? { duration: 0.12 } : SPRING}
            style={{ transformOrigin: 'top right' }}
            className="fixed inset-x-4 top-16 z-40 overflow-hidden rounded-surface bg-surface shadow-[0_0_0_1px_rgb(43_26_19/0.1),0_24px_48px_-16px_rgb(43_26_19/0.4)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>Notifications</h2>
              {unread > 0 && (
                <Button variant="quiet" size="sm" onClick={markAll}>
                  <Check size={18} weight="bold" /> Tout lire
                </Button>
              )}
            </div>
            {items.length === 0 ? (
              <p className="px-5 py-10 text-center text-ink-3">Aucune notification.</p>
            ) : (
              <ul className="max-h-[26rem] overflow-y-auto">
                {items.map((n) => {
                  const Icon = ICONS[n.type];
                  return (
                    <li key={n.id} className="flex gap-4 border-b border-line px-5 py-4 last:border-b-0">
                      <span
                        className={cn(
                          'mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full',
                          n.type === 'warning' ? 'bg-caution-tint text-caution' : 'bg-pulse-tint text-pulse-deep',
                        )}
                      >
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-baseline justify-between gap-3">
                          <span className={cn('text-base', n.unread ? 'font-semibold' : 'font-medium text-ink-2')}>{n.title}</span>
                          <span className="shrink-0 text-small text-ink-3">{n.time}</span>
                        </p>
                        <p className="text-small text-ink-2">{n.message}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
