import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, FileText, Flask, Hospital, Pill, ShieldCheck, Stethoscope, UploadSimple, Scan } from '@phosphor-icons/react';
import { DEMO_PATIENTS } from '../../data/mockData';
import { cn } from '../../lib/format';
import { SPRING_SOFT } from '../../lib/motion';
import { PageHeader } from '../../components/app/PageHeader';
import { Avatar } from '../../components/ui/Brand';
import { Button } from '../../components/ui/Button';
import { TextArea, TextField } from '../../components/ui/Field';
import { useToast } from '../../components/ui/Toast';

const TYPES = [
  { id: 'Consultation', icon: Stethoscope },
  { id: 'Radiologie', icon: Scan },
  { id: 'Biologie', icon: Flask },
  { id: 'Ordonnance', icon: Pill },
  { id: 'Hospitalisation', icon: Hospital },
] as const;

const PIN_LENGTH = 4;
const SUBMIT_MS = 1600;

interface Draft {
  type: string;
  title: string;
  content: string;
  conclusion: string;
  pin: string;
}

export default function DoctorAddReport() {
  const navigate = useNavigate();
  const toast = useToast();
  const reduce = useReducedMotion();
  const fileInput = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Draft>({ type: 'Consultation', title: '', content: '', conclusion: '', pin: '' });
  const patient = DEMO_PATIENTS[0];

  const patch = (change: Partial<Draft>) => setDraft((prev) => ({ ...prev, ...change }));

  useEffect(() => {
    if (!saving) return;
    const id = window.setTimeout(() => {
      toast('Rapport signé et publié (simulé)');
      navigate('/doctor/dashboard');
    }, SUBMIT_MS);
    return () => window.clearTimeout(id);
  }, [saving, navigate, toast]);

  const motionProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: SPRING_SOFT };

  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="quiet" size="sm" onClick={() => navigate(-1)} className="-ml-4 mb-6">
        <ArrowLeft size={20} weight="bold" /> Retour
      </Button>
      <PageHeader title="Nouveau rapport médical" lead={`Étape ${step} sur 3`} />

      <div className="mb-10 flex gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step} aria-label="Progression">
        {[1, 2, 3].map((s) => (
          <span key={s} className={cn('h-1.5 flex-1 rounded-full transition-colors duration-300', s <= step ? 'bg-pulse' : 'bg-line')} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" {...motionProps} className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 text-h3">Patient</h2>
              <div className="flex items-center gap-4 border-y border-line py-5">
                <Avatar first={patient.firstName} last={patient.lastName} />
                <div>
                  <p className="text-lg font-semibold leading-tight">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="font-mono text-small text-ink-3">{patient.qrCode}</p>
                </div>
              </div>
            </div>

            <fieldset>
              <legend className="mb-4 text-h3" style={{ fontFamily: 'var(--font-display)' }}>
                Nature du rapport
              </legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {TYPES.map(({ id, icon: Icon }) => {
                  const active = draft.type === id;
                  return (
                    <label
                      key={id}
                      className={cn(
                        'flex min-h-20 cursor-pointer flex-col items-start justify-between gap-3 rounded-control border p-4 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pulse',
                        active ? 'border-pulse bg-pulse-tint text-pulse-deep' : 'border-ink/25 hover:bg-sunk',
                      )}
                    >
                      <input type="radio" name="type" value={id} checked={active} onChange={() => patch({ type: id })} className="sr-only" />
                      <Icon size={26} aria-hidden="true" />
                      <span className="font-semibold">{id}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Button size="lg" onClick={() => setStep(2)}>
              Continuer
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" {...motionProps} className="flex flex-col gap-6">
            <TextField label="Titre du rapport" placeholder="Échographie cardiaque de contrôle" value={draft.title} onChange={(e) => patch({ title: e.target.value })} />
            <TextArea label="Observations détaillées" rows={7} placeholder="Décrivez l'examen" value={draft.content} onChange={(e) => patch({ content: e.target.value })} />
            <TextArea label="Conclusion" rows={3} hint="Ce que le patient doit retenir." value={draft.conclusion} onChange={(e) => patch({ conclusion: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="lg" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button size="lg" disabled={!draft.title.trim() || !draft.content.trim()} onClick={() => setStep(3)}>
                Continuer
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" {...motionProps} className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 text-h3">Pièces jointes</h2>
              <input
                ref={fileInput}
                type="file"
                multiple
                accept="application/pdf,image/*"
                className="sr-only"
                tabIndex={-1}
                onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
              />
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-surface border-2 border-dashed border-ink/30 px-6 py-8 text-center transition-colors hover:bg-sunk"
              >
                <UploadSimple size={36} className="text-pulse-deep" aria-hidden="true" />
                <span className="font-semibold">Choisir des fichiers PDF ou image</span>
                <span className="text-small text-ink-3">Ils restent dans votre navigateur : rien n'est envoyé.</span>
              </button>
              {files.length > 0 && (
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {files.map((f) => (
                    <li key={f} className="flex items-center gap-3 py-3">
                      <FileText size={22} className="text-ink-3" aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="mb-4 text-h3">Signature</h2>
              <TextField
                label="Code secret CPS"
                hint="Quatre chiffres quelconques pour la démo."
                type="password"
                inputMode="numeric"
                autoComplete="off"
                maxLength={PIN_LENGTH}
                value={draft.pin}
                onChange={(e) => patch({ pin: e.target.value.replace(/\D/g, '') })}
                className="max-w-48 text-center font-mono text-2xl tracking-[0.5em]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="lg" onClick={() => setStep(2)} disabled={saving}>
                Retour
              </Button>
              <Button size="lg" disabled={draft.pin.length < PIN_LENGTH || saving} onClick={() => setSaving(true)}>
                <ShieldCheck size={22} /> {saving ? 'Signature en cours' : 'Signer et publier'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
