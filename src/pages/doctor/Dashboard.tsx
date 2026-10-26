import { Link } from 'react-router-dom';
import { ArrowRight, FilePlus, Scan, Users } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { DOCTOR_ACTIVITY, DOCTOR_REQUESTS } from '../../data/mockData';
import { Section } from '../../components/app/PageHeader';
import { Button, buttonClass } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { Reveal } from '../../components/ui/Reveal';
import { useToast } from '../../components/ui/Toast';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const consulted = user && 'patientsConsulted' in user ? user.patientsConsulted : 0;
  const reports = user && 'reportsCreated' in user ? user.reportsCreated : 0;

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <section aria-labelledby="hello" className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h1 id="hello" className="text-display">
            Bonjour, Dr {user?.lastName}.
          </h1>
        </div>
        <dl className="grid grid-cols-3 gap-4 border-y border-line py-6">
          <Stat term="Patients consultés" value={consulted} note="Ce mois-ci" />
          <Stat term="Rapports créés" value={reports} note="Cette semaine" />
          <Stat term="Demandes" value={DOCTOR_REQUESTS.filter((r) => r.status === 'En attente').length} note="En attente" />
        </dl>
      </section>

      <section aria-label="Actions" className="grid gap-px overflow-hidden rounded-surface bg-line md:grid-cols-[1.4fr_1fr]">
        <Link
          to="/doctor/scan-qr"
          className="group flex min-h-56 flex-col justify-between bg-pulse p-8 text-surface transition-colors hover:bg-pulse-deep md:p-10"
        >
          <Scan size={44} aria-hidden="true" />
          <span>
            <span className="block font-display text-4xl leading-tight md:text-5xl">Scanner un QR code</span>
            <span className="mt-2 flex items-center gap-2 text-lg">
              Ouvrir le dossier d'un patient en consultation
              <ArrowRight size={22} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </span>
        </Link>
        <div className="grid gap-px">
          <Link to="/doctor/add-report" className="group flex min-h-28 items-center gap-5 bg-surface px-8 py-6 transition-colors hover:bg-sunk">
            <FilePlus size={32} className="text-pulse-deep" aria-hidden="true" />
            <span>
              <span className="block text-xl font-semibold">Créer un rapport</span>
              <span className="text-ink-2">Ajout au dossier du patient</span>
            </span>
          </Link>
          <Link to="/doctor/patients" className="group flex min-h-28 items-center gap-5 bg-surface px-8 py-6 transition-colors hover:bg-sunk">
            <Users size={32} className="text-pulse-deep" aria-hidden="true" />
            <span>
              <span className="block text-xl font-semibold">Mes patients</span>
              <span className="text-ink-2">Dossiers suivis</span>
            </span>
          </Link>
        </div>
      </section>

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Section title="Activité récente">
            <ul className="divide-y divide-line border-y border-line">
              {DOCTOR_ACTIVITY.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-4 py-5">
                  <span>
                    <span className="block text-lg font-semibold leading-tight">{a.name}</span>
                    <span className="text-ink-2">{a.action}</span>
                  </span>
                  <span className="shrink-0 text-small text-ink-3">{a.time}</span>
                </li>
              ))}
            </ul>
            <Button variant="secondary" size="sm" className="mt-6" onClick={() => toast("Historique complet simulé")}>
              Tout l'historique
            </Button>
          </Section>
        </Reveal>

        <Reveal delay={0.08}>
          <Section title="Demandes d'accès">
            <ul className="divide-y divide-line border-y border-line">
              {DOCTOR_REQUESTS.map((r) => (
                <li key={r.name} className="flex items-center justify-between gap-4 py-5">
                  <span>
                    <span className="block text-lg font-semibold leading-tight">{r.name}</span>
                    <span className="text-ink-2">{r.desc}</span>
                  </span>
                  <Chip tone={r.status === 'Approuvé' ? 'pulse' : 'caution'}>{r.status}</Chip>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-small text-ink-3">
              Chaque ouverture de dossier est inscrite dans le journal que le patient consulte.
            </p>
            <Link to="/doctor/scan-qr" className={buttonClass('quiet', 'sm', 'mt-2 -ml-4')}>
              Nouvelle demande <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </Section>
        </Reveal>
      </div>
    </div>
  );
}

function Stat({ term, value, note }: { term: string; value: number; note: string }) {
  return (
    <div>
      <dt className="text-small text-ink-3">{term}</dt>
      <dd className="font-display text-4xl tnum md:text-5xl">{value}</dd>
      <dd className="text-small text-ink-3">{note}</dd>
    </div>
  );
}
