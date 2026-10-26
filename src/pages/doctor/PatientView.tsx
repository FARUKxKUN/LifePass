import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, DownloadSimple, Plus, ShieldCheck, WarningCircle } from '@phosphor-icons/react';
import { AI_SYNTHESIS, DEMO_PATIENTS, MEDICAL_REPORTS } from '../../data/mockData';
import { formatDate, LONG_DATE } from '../../lib/format';
import { REPORT_ICONS } from '../../lib/reportIcons';
import { Section } from '../../components/app/PageHeader';
import { Avatar } from '../../components/ui/Brand';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { TextField } from '../../components/ui/Field';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';

type Tab = 'synthesis' | 'history' | 'timeline';

const TABS = [
  { value: 'synthesis' as const, label: 'Synthèse' },
  { value: 'history' as const, label: 'Historique' },
  { value: 'timeline' as const, label: 'Évolution' },
];

const PANEL = 'patient-tabs';

export default function DoctorPatientView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState<Tab>('synthesis');
  const [filter, setFilter] = useState('');
  const [sessionId] = useState(() => `SESSION-${Math.random().toString(36).slice(2, 11).toUpperCase()}`);
  const patient = DEMO_PATIENTS.find((p) => p.id === id) ?? DEMO_PATIENTS[0];
  const { profile, criticalAlerts, pathologies, activeTreatments, recentExams, doctorRecommendations } = AI_SYNTHESIS;

  const reports = MEDICAL_REPORTS.filter((r) => {
    const q = filter.trim().toLowerCase();
    return !q || r.title.toLowerCase().includes(q) || r.doctorName.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-10">
      <Button variant="quiet" size="sm" onClick={() => navigate('/doctor/dashboard')} className="-ml-4 self-start">
        <ArrowLeft size={20} weight="bold" /> Tableau de bord
      </Button>

      <header className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar first={patient.firstName} last={patient.lastName} size="lg" />
          <div>
            <h1 className="text-h1">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="mt-2 text-ink-2">
              {patient.age} ans, né(e) le {formatDate(patient.birthDate, { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip tone="pulse">Groupe {patient.bloodType}</Chip>
              <Chip className="font-mono">{patient.qrCode}</Chip>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate('/doctor/add-report')}>
            <Plus size={20} weight="bold" /> Ajouter un rapport
          </Button>
          <Button variant="secondary" onClick={() => toast('Export simulé : aucun fichier généré')}>
            <DownloadSimple size={20} /> Exporter
          </Button>
        </div>
      </header>

      <Tabs label="Sections du dossier" value={tab} tabs={TABS} onChange={setTab} panelPrefix={PANEL} />

      {tab === 'synthesis' && (
        <div id={`${PANEL}-synthesis`} role="tabpanel" aria-labelledby={`${PANEL}-tab-synthesis`} className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-14">
            <section aria-label="Allergies" className="rounded-surface bg-alert-tint p-6">
              <h2 className="flex items-center gap-3 text-h3 text-alert">
                <WarningCircle size={28} weight="fill" aria-hidden="true" /> Allergies à connaître
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {criticalAlerts.map((a) => (
                  <li key={a.name} className="flex items-center justify-between gap-3 border-t border-alert/25 pt-3">
                    <span className="text-lg font-semibold text-alert">{a.name}</span>
                    <span className="text-small font-semibold text-alert">Sévérité {a.severity}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid gap-12 md:grid-cols-2 md:gap-10">
              <Section title="Pathologies">
                <ul className="divide-y divide-line border-y border-line">
                  {pathologies.map((p) => (
                    <li key={p.name} className="flex items-center justify-between gap-3 py-4">
                      <span className="font-semibold">{p.name}</span>
                      <Chip>{p.status}</Chip>
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Traitements">
                <ul className="divide-y divide-line border-y border-line">
                  {activeTreatments.map((t) => (
                    <li key={t.name} className="py-4">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{t.name}</span>
                        <span className="text-small font-semibold text-pulse-deep">{t.dosage}</span>
                      </span>
                      <span className="text-small text-ink-3">
                        {t.purpose}, depuis {t.since}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            <Section title="Derniers résultats">
              <ul className="divide-y divide-line border-y border-line">
                {recentExams.map((e) => (
                  <li key={e.name} className="flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="block font-semibold">{e.name}</span>
                      <span className="font-mono text-small text-ink-3">{e.date}</span>
                    </span>
                    <Chip tone={e.status === 'normal' ? 'pulse' : 'neutral'}>{e.result}</Chip>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="flex flex-col gap-12">
            <section aria-labelledby="aid">
              <h2 id="aid" className="text-h2">
                Aide à la consultation
              </h2>
              <p className="mt-2 text-small text-ink-3">Texte fictif de démonstration, sans valeur médicale.</p>
              <Hints title="Points d'attention" items={doctorRecommendations.attentionPoints} />
              <Hints title="Questions à poser" items={doctorRecommendations.questionsToAsk} />
              <Hints title="Examens à envisager" items={doctorRecommendations.examsToConsider} />
            </section>
            <section aria-labelledby="vitals">
              <h2 id="vitals" className="mb-4 text-h3">
                Données vitales
              </h2>
              <dl className="grid grid-cols-3 gap-4 border-y border-line py-5">
                <Vital term="Poids" value={`${profile.weight} kg`} />
                <Vital term="Taille" value={`${profile.height} cm`} />
                <Vital term="IMC" value={String(profile.bmi)} />
              </dl>
            </section>
          </aside>
        </div>
      )}

      {tab === 'history' && (
        <div id={`${PANEL}-history`} role="tabpanel" aria-labelledby={`${PANEL}-tab-history`} className="flex flex-col gap-8">
          <TextField label="Filtrer les rapports" type="search" placeholder="Un titre ou un praticien" value={filter} onChange={(e) => setFilter(e.target.value)} wrapperClassName="max-w-md" />
          {reports.length === 0 ? (
            <p className="border-y border-line py-12 text-ink-2">Aucun rapport ne correspond.</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {reports.map((r) => {
                const Icon = REPORT_ICONS[r.type];
                return (
                  <li key={r.id} className="flex flex-wrap items-center gap-x-5 gap-y-2 py-5">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-pulse-tint text-pulse-deep">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 basis-60">
                      <span className="block text-lg font-semibold leading-tight">{r.title}</span>
                      <span className="text-ink-2">
                        {r.doctorName}, {r.doctorSpecialty}
                      </span>
                    </span>
                    <span className="text-small text-ink-3">{formatDate(r.date, LONG_DATE)}</span>
                    <Chip>{r.type}</Chip>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {tab === 'timeline' && (
        <div id={`${PANEL}-timeline`} role="tabpanel" aria-labelledby={`${PANEL}-tab-timeline`} className="border-y border-line py-16 text-center">
          <h2 className="text-h2">Évolution dans le temps</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-2">
            Cette vue tracerait les marqueurs biologiques et les traitements sur une frise. Elle n'existe pas encore dans le prototype.
          </p>
        </div>
      )}

      <aside className="flex flex-wrap items-center justify-between gap-4 border-l-4 border-pulse pl-6">
        <div className="flex items-start gap-4">
          <ShieldCheck size={28} className="mt-1 shrink-0 text-pulse-deep" aria-hidden="true" />
          <div>
            <p className="font-semibold">Accès inscrit au journal</p>
            <p className="text-ink-2">Le patient voit cette consultation dans son journal d'accès.</p>
          </div>
        </div>
        <span className="font-mono text-small text-ink-3">{sessionId}</span>
      </aside>
    </div>
  );
}

function Hints({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h3 className="mb-2 text-lg font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
        {title}
      </h3>
      <ul>
        {items.map((t) => (
          <li key={t} className="border-t border-line py-3 text-ink-2">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Vital({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-small text-ink-3">{term}</dt>
      <dd className="font-display text-xl">{value}</dd>
    </div>
  );
}
