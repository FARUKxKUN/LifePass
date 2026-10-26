import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Clock, Lock, Plus, Trash } from '@phosphor-icons/react';
import { ACCESS_LOGS, AUTHORIZED_PROFESSIONALS, PENDING_REQUESTS } from '../../data/mockData';
import type { AccessLevel, AccessRequest, AuthorizedProfessional } from '../../types';
import { SPRING } from '../../lib/motion';
import { PageHeader, Section } from '../../components/app/PageHeader';
import { Button, IconButton } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { useToast } from '../../components/ui/Toast';

const LEVEL_TONE: Record<AccessLevel, 'pulse' | 'neutral' | 'caution'> = {
  total: 'pulse',
  cardio: 'pulse',
  limited: 'caution',
  targeted: 'neutral',
};

export default function PatientAccessLogs() {
  const toast = useToast();
  const reduce = useReducedMotion();
  const [pending, setPending] = useState<AccessRequest[]>(PENDING_REQUESTS);
  const [authorized, setAuthorized] = useState<AuthorizedProfessional[]>(AUTHORIZED_PROFESSIONALS);

  const approve = (req: AccessRequest) => {
    setPending((prev) => prev.filter((p) => p.id !== req.id));
    setAuthorized((prev) => [
      {
        name: req.doctorName,
        role: req.specialty,
        level: 'total',
        levelLabel: 'Total, lecture et écriture',
        expires: `Pendant ${req.duration}`,
        note: 'Approbation temporaire',
      },
      ...prev,
    ]);
    toast(`Accès accordé à ${req.doctorName}`);
  };

  const reject = (req: AccessRequest) => {
    setPending((prev) => prev.filter((p) => p.id !== req.id));
    toast(`Demande de ${req.doctorName} refusée`);
  };

  const revoke = (pro: AuthorizedProfessional) => {
    setAuthorized((prev) => prev.filter((p) => p.name !== pro.name));
    toast(`Accès retiré à ${pro.name}`);
  };

  return (
    <>
      <PageHeader title="Gestion des accès" lead="Qui peut ouvrir votre dossier, et qui l'a ouvert." />

      <dl className="mb-16 grid grid-cols-3 gap-6 border-y border-line py-8">
        <Stat term="Accès ce mois" value="24" />
        <Stat term="Professionnels autorisés" value={String(authorized.length)} />
        <Stat term="Demandes en attente" value={String(pending.length)} tone={pending.length > 0 ? 'caution' : undefined} />
      </dl>

      <div className="flex flex-col gap-20">
        <Section title={`Demandes d'accès (${pending.length})`}>
          {pending.length === 0 ? (
            <p className="border-y border-line py-10 text-ink-2">Aucune demande en attente. Vous serez prévenu à la prochaine.</p>
          ) : (
            <ul className="grid gap-6 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {pending.map((req) => (
                  <motion.li
                    key={req.id}
                    layout={!reduce}
                    initial={false}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={reduce ? { duration: 0.12 } : SPRING}
                    className="panel flex flex-col gap-6 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-h3">{req.doctorName}</h3>
                        <p className="text-ink-2">
                          {req.specialty}, {req.establishment}
                        </p>
                      </div>
                      <Chip tone="caution" className="shrink-0">
                        {req.requestedAt}
                      </Chip>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-small font-semibold text-ink-3">
                        <Lock size={18} aria-hidden="true" /> Accès demandé pendant {req.duration}
                      </p>
                      <ul className="mt-2 flex flex-col gap-1">
                        {req.requestedAccess.map((a) => (
                          <li key={a} className="flex items-start gap-2">
                            <Check size={20} weight="bold" className="mt-1 shrink-0 text-pulse" aria-hidden="true" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="border-l-4 border-line pl-4 text-ink-2">Motif : {req.reason}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={() => approve(req)}>Approuver</Button>
                      <Button variant="danger" onClick={() => reject(req)}>
                        Refuser
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </Section>

        <Section
          title="Professionnels autorisés"
          aside={
            <Button variant="secondary" size="sm" onClick={() => toast("Pré-autorisation simulée : aucun professionnel n'est ajouté")}>
              <Plus size={18} weight="bold" /> Pré-autoriser
            </Button>
          }
        >
          <ul className="divide-y divide-line border-y border-line">
            <AnimatePresence initial={false}>
              {authorized.map((pro) => (
                <motion.li
                  key={pro.name}
                  layout={!reduce}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  transition={reduce ? { duration: 0.12 } : SPRING}
                  className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5"
                >
                  <span className="min-w-0 flex-1 basis-56">
                    <span className="block text-lg font-semibold leading-tight">{pro.name}</span>
                    <span className="text-ink-2">
                      {pro.role}
                      {pro.note && <span className="text-ink-3">, {pro.note}</span>}
                    </span>
                  </span>
                  <Chip tone={LEVEL_TONE[pro.level]}>{pro.levelLabel}</Chip>
                  <span className="flex min-w-36 items-center gap-2 text-small text-ink-2">
                    <Clock size={18} aria-hidden="true" /> {pro.expires}
                  </span>
                  <IconButton label={`Retirer l'accès de ${pro.name}`} onClick={() => revoke(pro)} className="hover:bg-alert-tint hover:text-alert">
                    <Trash size={22} />
                  </IconButton>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Section>

        <Section title="Journal des accès">
          <ul className="divide-y divide-line border-y border-line">
            {ACCESS_LOGS.map((log) => (
              <li key={log.id} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-mono text-small text-ink-3">
                    {log.date.split('-').reverse().join('/')} à {log.time}
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-tight">{log.doctorName}</p>
                  <p className="text-ink-2">
                    {log.doctorSpecialty}, a ouvert « {log.documentAccessed} »
                  </p>
                </div>
                <p className="text-small text-ink-3 md:text-right">
                  Durée
                  <span className="block text-lg font-semibold text-ink">{log.duration}</span>
                </p>
              </li>
            ))}
          </ul>
          <Button variant="secondary" className="mt-6" onClick={() => toast("Historique complet simulé : le prototype garde trois entrées")}>
            Charger l'historique complet
          </Button>
        </Section>

        <aside className="max-w-2xl border-l-4 border-pulse pl-6">
          <h2 className="text-h3">Votre contrôle</h2>
          <p className="mt-2 text-ink-2">
            Dans ce prototype, vous acceptez, refusez ou retirez un accès en un geste. C'est le comportement que le produit viserait. Aucune garantie de sécurité n'est donnée ici : tout est simulé.
          </p>
        </aside>
      </div>
    </>
  );
}

function Stat({ term, value, tone }: { term: string; value: string; tone?: 'caution' }) {
  return (
    <div>
      <dt className="text-small text-ink-3">{term}</dt>
      <dd className={`mt-1 font-display text-4xl tnum md:text-5xl ${tone === 'caution' ? 'text-caution' : ''}`}>{value}</dd>
    </div>
  );
}
