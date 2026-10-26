import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck } from '@phosphor-icons/react';
import { ACCESS_LOGS, DEMO_PATIENTS } from '../../data/mockData';
import { EASE_OUT_SOFT, SPRING_LIVELY } from '../../lib/motion';
import { QrPass } from '../app/QrPass';
import { ButtonLink } from '../ui/Button';

const LINES = ['Votre dossier médical', 'tient dans un QR code.'];

export function Hero() {
  const reduce = useReducedMotion();
  const patient = DEMO_PATIENTS[0];
  const log = ACCESS_LOGS[0];

  return (
    <section aria-labelledby="titre" className="shell grid gap-16 pb-24 pt-12 md:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-center lg:gap-12 lg:py-16">
      <div className="relative z-10">
        <h1 id="titre" className="text-hero">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.12, ease: EASE_OUT_SOFT }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-8 max-w-md text-xl text-ink-2"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_SOFT }}
        >
          Le patient le montre, le médecin ouvre le dossier, le patient voit qui l'a consulté.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: EASE_OUT_SOFT }}
        >
          <ButtonLink to="/login" size="lg">
            Entrer dans la démo
          </ButtonLink>
          <a href="#parcours" className="inline-flex min-h-14 items-center rounded-full border border-ink/25 px-8 text-lg font-semibold transition-colors hover:bg-sunk">
            Voir le parcours
          </a>
        </motion.div>
      </div>

      <div className="relative flex justify-center lg:justify-end lg:pr-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 48, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={reduce ? { duration: 0 } : { ...SPRING_LIVELY, delay: 0.3 }}
        >
          <QrPass value={patient.qrCode} name={`${patient.firstName} ${patient.lastName}`} size={216} />
        </motion.div>
        <motion.p
          className="panel absolute -bottom-28 left-0 flex max-w-72 items-start gap-3 p-4 text-small shadow-[0_20px_40px_-20px_rgb(43_26_19/0.4)] sm:left-8 lg:-left-16"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT_SOFT }}
        >
          <ShieldCheck size={26} weight="fill" className="mt-0.5 shrink-0 text-pulse-deep" aria-hidden="true" />
          <span>
            <span className="block font-semibold">{log.doctorName} a ouvert votre dossier</span>
            <span className="text-ink-3">
              {log.documentAccessed}, {log.time}
            </span>
          </span>
        </motion.p>
      </div>
    </section>
  );
}
