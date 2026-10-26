import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle } from '@phosphor-icons/react';
import { SPRING } from '../../lib/motion';

const ToastContext = createContext<(message: string) => void>(() => undefined);

/** Demo buttons that have no backend answer with a toast, so nothing feels dead. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const reduce = useReducedMotion();

  const show = useCallback((next: string) => {
    window.clearTimeout(timer.current);
    setMessage(next);
    timer.current = window.setTimeout(() => setMessage(null), 3200);
  }, []);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 md:bottom-8">
        <AnimatePresence>
          {message && (
            <motion.p
              key={message}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0.12 } : SPRING}
              className="flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-small font-medium text-paper shadow-[0_16px_32px_-12px_rgb(43_26_19/0.5)]"
            >
              <CheckCircle size={20} weight="fill" className="text-pulse-tint" />
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): (message: string) => void {
  return useContext(ToastContext);
}
