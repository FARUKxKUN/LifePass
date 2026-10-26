import { useEffect, useRef, type ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import { IconButton } from './Button';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Modal built on the native <dialog>: focus trap, Escape and inert background come from the platform.
 * Bottom sheet on phones, centered panel from md up. Enter and exit use the same path.
 */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="sheet m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-surface bg-surface p-0 text-ink md:m-auto md:max-w-3xl md:rounded-surface"
    >
      <div className="flex max-h-[92dvh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
          <h2 className="text-h3">{title}</h2>
          <IconButton label="Fermer" onClick={onClose} className="-mr-2 -mt-1">
            <X size={22} weight="bold" />
          </IconButton>
        </div>
        <div className="overflow-y-auto px-6 py-6 md:px-8">{children}</div>
      </div>
    </dialog>
  );
}
