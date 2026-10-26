import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChatCircleDots, PaperPlaneTilt, X } from '@phosphor-icons/react';
import { AI_SYNTHESIS } from '../../data/mockData';
import { cn } from '../../lib/format';
import { SPRING } from '../../lib/motion';
import { Button, IconButton } from '../ui/Button';

interface Message {
  role: 'bot' | 'user';
  content: string;
  time: string;
}

const PROMPTS = ['Résumé complet de mes rapports', 'Quels sont mes rappels ?', 'Analyse de mes constantes'];

const now = () => new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

function bmiStatus(bmi: number): string {
  if (bmi < 18.5) return 'Insuffisance pondérale';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Surpoids';
  return 'Obésité';
}

/** Scripted replies for the demo. There is no model behind this. */
function scriptedReply(question: string): string {
  const { basedOnReportsCount, recommendations, profile, pathologies } = AI_SYNTHESIS;
  if (question.includes('Résumé')) {
    return `D'après les **${basedOnReportsCount} rapports** du dossier fictif :\n\n• **Cardiologie :** la dernière échographie montre une fonction ventriculaire gauche préservée.\n• **Bilan lipidique :** le LDL est proche de la cible sous traitement.\n• **Suivi :** prochain bilan sanguin dans environ 3 mois.`;
  }
  if (question.includes('rappels')) {
    const lines = recommendations.map((r) => `• **${r.text}**${r.when ? ` (${r.when})` : ''}`).join('\n');
    return `Voici les rappels du dossier fictif :\n\n${lines}`;
  }
  if (question.includes('constantes')) {
    return `• **IMC :** ${profile.bmi}, soit "${bmiStatus(profile.bmi)}".\n• **Poids :** ${profile.weight} kg pour ${profile.height} cm.\n• **Pathologies suivies :** ${pathologies.map((p) => p.name).join(', ')}.`;
  }
  return "Je ne sais répondre qu'aux trois questions proposées. C'est une démonstration scriptée.";
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
  );
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Bonjour. Je suis l'assistant de démonstration de LifePass. Choisissez une question ci-dessous.", time: now() },
  ]);
  const end = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const reply = useRef<number | undefined>(undefined);
  const panelId = useId();
  const reduce = useReducedMotion();

  useEffect(() => () => window.clearTimeout(reply.current), []);
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLInputElement>('input')?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    toggle.current?.focus();
  };

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end', behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, reduce]);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || typing) return;
    setMessages((prev) => [...prev, { role: 'user', content, time: now() }]);
    setInput('');
    setTyping(true);
    reply.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', content: scriptedReply(content), time: now() }]);
      setTyping(false);
    }, 900);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <Button
        ref={toggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="fixed bottom-24 right-5 z-30 shadow-[0_16px_32px_-12px_rgb(29_68_103/0.6)] md:bottom-8 md:right-8"
      >
        {open ? <X size={22} weight="bold" /> : <ChatCircleDots size={22} weight="fill" />}
        {open ? 'Fermer' : 'Assistant'}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.section
            ref={panel}
            id={panelId}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close();
            }}
            aria-label="Assistant de démonstration"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={reduce ? { duration: 0.12 } : SPRING}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-4 bottom-40 z-30 flex h-[min(34rem,calc(100dvh-14rem))] flex-col overflow-hidden rounded-surface bg-surface shadow-[0_0_0_1px_rgb(43_26_19/0.1),0_32px_64px_-24px_rgb(43_26_19/0.45)] md:inset-x-auto md:bottom-24 md:right-8 md:h-[34rem] md:w-[26rem]"
          >
            <header className="border-b border-line px-5 py-4">
              <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>Assistant de démonstration</h2>
              <p className="text-small text-ink-3">Réponses scriptées. Aucune IA réelle, aucun avis médical.</p>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4" role="log" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex flex-col gap-1', m.role === 'user' ? 'items-end' : 'items-start')}>
                  <p
                    className={cn(
                      'max-w-[88%] whitespace-pre-line rounded-surface px-4 py-3 text-base',
                      m.role === 'user' ? 'rounded-br-md bg-pulse text-surface' : 'rounded-bl-md bg-sunk text-ink',
                    )}
                  >
                    {renderInline(m.content)}
                  </p>
                  <span className="px-1 font-mono text-label text-ink-3">{m.time}</span>
                </div>
              ))}
              {typing && (
                <p className="w-fit rounded-surface rounded-bl-md bg-sunk px-4 py-3 text-ink-3" aria-label="L'assistant écrit">
                  ...
                </p>
              )}
              <div ref={end} />
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    disabled={typing}
                    className="min-h-11 rounded-full border border-ink/25 px-4 text-small font-medium transition-colors hover:bg-sunk active:scale-[0.97] disabled:opacity-45"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <form onSubmit={submit} className="flex gap-2">
                <label htmlFor="assistant-input" className="sr-only">
                  Votre question
                </label>
                <input
                  id="assistant-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Votre question"
                  className="min-h-12 min-w-0 flex-1 rounded-full border border-ink/25 bg-paper px-5 text-base placeholder:text-ink-3 focus:border-pulse focus:outline-none"
                />
                <IconButton label="Envoyer" type="submit" disabled={!input.trim() || typing} className="bg-pulse text-surface hover:bg-pulse-deep hover:text-surface disabled:opacity-45">
                  <PaperPlaneTilt size={22} weight="fill" />
                </IconButton>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
