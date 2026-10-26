import { useMemo, useState } from 'react';
import { DownloadSimple, EnvelopeSimple, FileArrowUp, MagnifyingGlass, Printer } from '@phosphor-icons/react';
import { MEDICAL_REPORTS } from '../../data/mockData';
import type { MedicalReport } from '../../types';
import { formatDate, LONG_DATE, SHORT_DATE } from '../../lib/format';
import { REPORT_ICONS } from '../../lib/reportIcons';
import { PageHeader } from '../../components/app/PageHeader';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { SelectField, TextField } from '../../components/ui/Field';
import { Segmented } from '../../components/ui/Segmented';
import { Sheet } from '../../components/ui/Sheet';
import { useToast } from '../../components/ui/Toast';

type View = 'list' | 'timeline';

const TYPE_OPTIONS = [
  { value: 'all', label: 'Tous les types' },
  { value: 'radiologie', label: 'Radiologie' },
  { value: 'analyses', label: 'Analyses' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'ordonnance', label: 'Ordonnance' },
  { value: 'certificat', label: 'Certificat' },
];

export default function PatientMedicalRecords() {
  const toast = useToast();
  const [view, setView] = useState<View>('list');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [selected, setSelected] = useState<MedicalReport | null>(null);
  const [lastSelected, setLastSelected] = useState<MedicalReport | null>(null);
  const openReport = (report: MedicalReport) => {
    setLastSelected(report);
    setSelected(report);
  };

  const reports = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MEDICAL_REPORTS.filter((r) => {
      const matchesText = !q || r.title.toLowerCase().includes(q) || r.doctorName.toLowerCase().includes(q);
      const matchesType = type === 'all' || r.type.toLowerCase() === type;
      return matchesText && matchesType;
    });
  }, [search, type]);

  const years = useMemo(() => [...new Set(reports.map((r) => r.date.slice(0, 4)))].sort().reverse(), [reports]);

  return (
    <>
      <PageHeader
        title="Dossier médical"
        lead="Tous vos rapports au même endroit, du plus récent au plus ancien."
        actions={
          <Button variant="secondary" onClick={() => toast("Ajout simulé : ce prototype n'enregistre aucun fichier")}>
            <FileArrowUp size={22} /> Ajouter un document
          </Button>
        }
      />

      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_16rem_auto] md:items-end">
        <TextField
          label="Rechercher"
          type="search"
          placeholder="Un rapport ou un praticien"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SelectField label="Type" value={type} onChange={(e) => setType(e.target.value)} options={TYPE_OPTIONS} />
        <Segmented
          label="Affichage"
          value={view}
          onChange={setView}
          options={[
            { value: 'list', label: 'Liste' },
            { value: 'timeline', label: 'Chronologie' },
          ]}
        />
      </div>

      {reports.length === 0 ? (
        <div className="border-y border-line py-20 text-center">
          <MagnifyingGlass size={40} className="mx-auto text-ink-3" aria-hidden="true" />
          <p className="mt-4 font-semibold">Aucun rapport ne correspond.</p>
          <p className="text-ink-2">Essayez un autre mot ou retirez le filtre.</p>
        </div>
      ) : view === 'list' ? (
        <ul className="divide-y divide-line border-y border-line">
          {reports.map((r) => (
            <ReportRow key={r.id} report={r} onOpen={() => openReport(r)} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-12">
          {years.map((year) => (
            <section key={year} aria-label={`Rapports de ${year}`} className="grid gap-4 md:grid-cols-[6rem_1fr] md:gap-10">
              <h2 className="font-display text-4xl text-pulse-deep tnum md:sticky md:top-24 md:self-start">{year}</h2>
              <ul className="divide-y divide-line border-y border-line">
                {reports
                  .filter((r) => r.date.startsWith(year))
                  .map((r) => (
                    <ReportRow key={r.id} report={r} onOpen={() => openReport(r)} />
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <Sheet open={selected !== null} onClose={() => setSelected(null)} title={(selected ?? lastSelected)?.title ?? ''}>
        {selected && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="pulse">{selected.type}</Chip>
              <span className="text-ink-2">{formatDate(selected.date, LONG_DATE)}</span>
            </div>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-small text-ink-3">Praticien</dt>
                <dd className="font-semibold">{selected.doctorName}</dd>
                <dd className="text-ink-2">{selected.doctorSpecialty}</dd>
              </div>
              <div>
                <dt className="text-small text-ink-3">Établissement</dt>
                <dd className="font-semibold">{selected.establishment}</dd>
              </div>
            </dl>
            <div>
              <h3 className="mb-2 text-h3">Observations</h3>
              <p className="text-ink-2">{selected.content}</p>
            </div>
            <div className="border-l-4 border-pulse pl-5">
              <h3 className="mb-2 text-h3">Conclusion</h3>
              <p className="font-display text-2xl leading-snug">{selected.conclusion}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast('Téléchargement simulé : aucun PDF réel dans ce prototype')}>
                <DownloadSimple size={22} /> Télécharger
              </Button>
              <Button variant="secondary" onClick={() => window.print()}>
                <Printer size={22} /> Imprimer
              </Button>
              <Button variant="secondary" onClick={() => toast("Envoi simulé : aucun e-mail n'est envoyé")}>
                <EnvelopeSimple size={22} /> Envoyer
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </>
  );
}

function ReportRow({ report, onOpen }: { report: MedicalReport; onOpen: () => void }) {
  const Icon = REPORT_ICONS[report.type];
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="grid w-full min-h-20 grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-5 text-left transition-colors hover:bg-sunk/60 md:grid-cols-[6rem_auto_1fr_auto] md:px-2"
      >
        <span className="hidden font-mono text-small text-ink-3 md:block">{formatDate(report.date, SHORT_DATE)}</span>
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-pulse-tint text-pulse-deep">
          <Icon size={24} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-semibold leading-tight">{report.title}</span>
          <span className="block text-small text-ink-2">
            {report.doctorName}, {report.doctorSpecialty}
          </span>
          <span className="block font-mono text-label text-ink-3 md:hidden">{formatDate(report.date, LONG_DATE)}</span>
        </span>
        <Chip className="justify-self-end">{report.type}</Chip>
      </button>
    </li>
  );
}
