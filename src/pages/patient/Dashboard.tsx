import { Link } from 'react-router-dom';
import { ArrowRight, Eye, FileText, Flask, WarningCircle } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { ACTIVITY_FEED, AI_SYNTHESIS } from '../../data/mockData';
import type { ActivityType } from '../../types';
import { Assistant } from '../../components/app/Assistant';
import { Section } from '../../components/app/PageHeader';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { Reveal } from '../../components/ui/Reveal';
import { useToast } from '../../components/ui/Toast';

const ACTIVITY_ICON: Record<ActivityType, typeof Eye> = { access: Eye, report: FileText, lab: Flask };

export default function PatientDashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const { profile, criticalAlerts, activeTreatments, trends, recommendations, generatedAt } = AI_SYNTHESIS;

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <section aria-labelledby="hello" className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <h1 id="hello" className="text-display">
            Bonjour, {user?.firstName}.
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-ink-2">
            Votre QR code est actif. Montrez-le à un professionnel de santé : il ouvre votre dossier, vous voyez l'accès dans le journal.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/patient/qr-code" size="lg">
              Afficher mon QR code
            </ButtonLink>
            <ButtonLink to="/patient/access-logs" variant="secondary" size="lg">
              Qui a consulté ?
            </ButtonLink>
          </div>
        </div>
      </section>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 md:grid-cols-4">
        <Fact term="Dossier" value="12 fichiers" />
        <Fact term="Dernier accès" value="Dr. S. Martin" note="Il y a 2 jours" />
        <Fact term="Allergies" value={`${criticalAlerts.length} signalées`} tone="alert" />
        <Fact term="Demandes en attente" value="2" to="/patient/access-logs" />
      </dl>

      <Reveal>
        <Section
          title="Votre synthèse santé"
          aside={
            <Button variant="secondary" size="sm" onClick={() => toast("Export PDF simulé : aucun fichier n'est généré dans ce prototype")}>
              Exporter en PDF
            </Button>
          }
        >
          <p className="-mt-3 mb-10 max-w-2xl text-small text-ink-3">
            Synthèse fictive, mise à jour {generatedAt.toLowerCase()}. Elle n'a aucune valeur médicale.
          </p>

          <div className="grid gap-12 md:grid-cols-2 md:gap-x-16">
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="mb-4 text-h3">Profil</h3>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <Fact term="Âge" value={`${profile.age} ans`} compact />
                  <Fact term="Groupe sanguin" value={profile.bloodType} compact />
                  <Fact term="Poids et taille" value={`${profile.weight} kg, ${profile.height} cm`} compact />
                  <Fact term="IMC" value={String(profile.bmi)} compact />
                </dl>
              </div>
              <div>
                <h3 className="mb-4 text-h3">Allergies</h3>
                <ul className="flex flex-col gap-3">
                  {criticalAlerts.map((a) => (
                    <li key={a.name} className="flex items-center justify-between gap-4 rounded-control bg-alert-tint px-5 py-4">
                      <span className="flex items-center gap-3 font-semibold text-alert">
                        <WarningCircle size={24} weight="fill" aria-hidden="true" />
                        {a.name}
                      </span>
                      <Chip tone={a.severity === 'mortelle' ? 'alert' : 'caution'} className="bg-surface">
                        Sévérité {a.severity}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h3 className="mb-4 text-h3">Traitements en cours</h3>
                <ul className="divide-y divide-line border-y border-line">
                  {activeTreatments.map((t) => (
                    <li key={t.name} className="flex items-center justify-between gap-4 py-4">
                      <span>
                        <span className="block font-semibold">{t.name}</span>
                        <span className="text-small text-ink-3">
                          Depuis {t.since}, {t.purpose.toLowerCase()}
                        </span>
                      </span>
                      <Chip>{t.dosage}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-h3">Tendances</h3>
                <dl className="grid grid-cols-3 gap-4">
                  {trends.map((t) => (
                    <Fact key={t.label} term={t.label} value={t.status} compact />
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-4 text-h3">À prévoir</h3>
            <ul className="grid gap-x-16 md:grid-cols-2">
              {recommendations.map((r) => (
                <li key={r.text} className="flex items-start gap-3 border-t border-line py-4">
                  {r.type === 'warning' && <WarningCircle size={24} weight="fill" className="mt-0.5 shrink-0 text-caution" aria-label="Attention" />}
                  <span>
                    <span className="block font-medium">{r.text}</span>
                    {r.when && <span className="text-small text-ink-3">{r.when}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section
          title="Activité récente"
          aside={
            <Link to="/patient/access-logs" className="inline-flex min-h-11 items-center gap-2 font-semibold text-pulse-deep underline-offset-4 hover:underline">
              Tout voir <ArrowRight size={18} weight="bold" />
            </Link>
          }
        >
          <ul className="divide-y divide-line border-y border-line">
            {ACTIVITY_FEED.map((a) => {
              const Icon = ACTIVITY_ICON[a.type];
              return (
                <li key={a.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 py-5">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-pulse-tint text-pulse-deep">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{a.title}</span>
                    <span className="block text-ink-2">{a.desc}</span>
                    <span className="text-small text-ink-3">Il y a {a.daysAgo} jours</span>
                  </span>
                  <Button variant="secondary" size="sm" onClick={() => toast('Détail simulé : ce prototype ne charge pas de document')}>
                    {a.type === 'access' ? "Voir l'accès" : 'Voir le rapport'}
                  </Button>
                </li>
              );
            })}
          </ul>
        </Section>
      </Reveal>

      <Assistant />
    </div>
  );
}

interface FactProps {
  term: string;
  value: string;
  note?: string;
  to?: string;
  tone?: 'alert';
  compact?: boolean;
}

function Fact({ term, value, note, to, tone, compact }: FactProps) {
  const valueClass = `${compact ? 'text-lg' : 'font-display text-2xl'} mt-1 font-medium leading-tight ${tone === 'alert' ? 'text-alert' : ''}`;
  return (
    <div>
      <dt className="text-small text-ink-3">{term}</dt>
      <dd className={valueClass}>
        {to ? (
          <Link to={to} className="inline-flex min-h-11 items-center underline decoration-pulse decoration-2 underline-offset-4">
            {value}
          </Link>
        ) : (
          value
        )}
      </dd>
      {note && <dd className="text-small text-ink-3">{note}</dd>}
    </div>
  );
}
