import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, CheckCircle, DeviceMobile, Image as ImageIcon, Key } from '@phosphor-icons/react';
import { DEMO_PATIENTS } from '../../data/mockData';
import { cn } from '../../lib/format';
import { SPRING_SOFT } from '../../lib/motion';
import { PageHeader } from '../../components/app/PageHeader';
import { Avatar } from '../../components/ui/Brand';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/Field';
import { useToast } from '../../components/ui/Toast';

type Step = 1 | 2 | 3;

const SCAN_MS = 2000;
const APPROVAL_MS = 3000;
const PIN_LENGTH = 4;

export default function DoctorScanQR() {
  const navigate = useNavigate();
  const toast = useToast();
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(1);
  const [scanning, setScanning] = useState(false);
  const [pin, setPin] = useState('');
  const [consent, setConsent] = useState(false);
  const patient = DEMO_PATIENTS[0];

  useEffect(() => {
    if (!scanning) return;
    const id = window.setTimeout(() => {
      setScanning(false);
      setStep(2);
    }, SCAN_MS);
    return () => window.clearTimeout(id);
  }, [scanning]);

  useEffect(() => {
    if (step !== 3) return;
    const id = window.setTimeout(() => navigate(`/doctor/patient/${patient.id}`), APPROVAL_MS);
    return () => window.clearTimeout(id);
  }, [step, navigate, patient.id]);

  const canValidate = pin.length === PIN_LENGTH && consent;

  const motionProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: SPRING_SOFT,
      };

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="quiet" size="sm" onClick={() => navigate(-1)} className="-ml-4 mb-6">
        <ArrowLeft size={20} weight="bold" /> Retour
      </Button>
      <PageHeader title="Scanner le QR code du patient" lead={`Étape ${step} sur 3`} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="scan" {...motionProps} className="flex flex-col gap-8">
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-surface bg-ink">
              {[
                'left-6 top-6 border-l-4 border-t-4 rounded-tl-2xl',
                'right-6 top-6 border-r-4 border-t-4 rounded-tr-2xl',
                'bottom-6 left-6 border-b-4 border-l-4 rounded-bl-2xl',
                'bottom-6 right-6 border-b-4 border-r-4 rounded-br-2xl',
              ].map((c) => (
                <span key={c} aria-hidden="true" className={cn('absolute size-12 border-paper', c)} />
              ))}
              {scanning && !reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-8 h-0.5 bg-pulse-tint shadow-[0_0_24px_4px_rgb(210_226_236/0.7)]"
                  initial={{ top: '15%' }}
                  animate={{ top: '85%' }}
                  transition={{ duration: SCAN_MS / 1000 / 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                />
              )}
              <p className="relative px-10 text-center text-lg text-paper" role="status">
                {scanning ? 'Lecture du code en cours' : 'Cadrez le QR code du patient'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button size="lg" onClick={() => setScanning(true)} disabled={scanning} className="w-full max-w-sm">
                {scanning ? 'Lecture en cours' : 'Démarrer la caméra'}
              </Button>
              <p className="text-center text-small text-ink-3">
                Aucune vraie caméra n'est utilisée : le prototype simule la lecture du code de Jean Dupont.
              </p>
              <Button variant="secondary" onClick={() => toast("Import simulé : aucun fichier n'est lu")} className="w-full max-w-sm">
                <ImageIcon size={22} /> Importer une image
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="identity" {...motionProps} className="flex flex-col gap-8">
            <div className="flex items-center gap-5 border-y border-line py-6">
              <Avatar first={patient.firstName} last={patient.lastName} size="lg" />
              <div>
                <p className="flex items-center gap-2 text-small font-semibold text-pulse-deep">
                  <CheckCircle size={20} weight="fill" aria-hidden="true" /> QR code identifié
                </p>
                <p className="font-display text-3xl leading-tight">
                  {patient.firstName} {patient.lastName}, {patient.age} ans
                </p>
                <p className="font-mono text-small text-ink-3">ID {patient.qrCode}</p>
              </div>
            </div>

            <TextField
              label="Votre code secret CPS"
              hint="Il signe l'accès au dossier. Saisissez quatre chiffres quelconques pour la démo."
              type="password"
              inputMode="numeric"
              autoComplete="off"
              maxLength={PIN_LENGTH}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              className="max-w-48 text-center font-mono text-2xl tracking-[0.5em]"
            />

            <label className="flex min-h-14 cursor-pointer items-start gap-4 rounded-control bg-sunk px-5 py-4">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-6 shrink-0 accent-pulse"
              />
              <span>Je suis en consultation avec ce patient et j'ai recueilli son accord oral pour consulter son dossier.</span>
            </label>

            <Button size="lg" disabled={!canValidate} onClick={() => setStep(3)}>
              <Key size={22} /> Valider et ouvrir le dossier
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="wait" {...motionProps} className="flex flex-col items-center gap-8 py-10 text-center">
            <span className="relative inline-flex size-28 items-center justify-center">
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-4 border-pulse"
                  animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="inline-flex size-24 items-center justify-center rounded-full bg-pulse-tint text-pulse-deep">
                <DeviceMobile size={44} aria-hidden="true" />
              </span>
            </span>
            <div role="status">
              <h2 className="text-h2">Demande envoyée</h2>
              <p className="mx-auto mt-3 max-w-sm text-ink-2">
                {patient.firstName} {patient.lastName} reçoit une notification pour valider votre accès. Dans ce prototype, la validation arrive toute seule.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
