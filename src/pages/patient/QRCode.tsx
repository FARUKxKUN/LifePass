import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DownloadSimple, Printer, ShareNetwork } from '@phosphor-icons/react';
import { accountName, useAuth } from '../../context/AuthContext';
import { QR_STATS } from '../../data/mockData';
import { PageHeader, Section } from '../../components/app/PageHeader';
import { QrPass } from '../../components/app/QrPass';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { useToast } from '../../components/ui/Toast';

const STEPS = [
  { title: 'Présentez le code', text: 'Montrez votre QR code au professionnel de santé, sur le téléphone ou imprimé.' },
  { title: 'Le médecin scanne', text: "Il le lit depuis son espace praticien et indique qu'il est en consultation avec vous." },
  { title: 'Vous validez', text: "Vous recevez la demande, vous l'acceptez ou la refusez. L'accès est inscrit au journal." },
];

const DESIGN_INTENT = [
  'Le patient valide chaque demande d\'accès.',
  'Chaque ouverture du dossier est inscrite au journal.',
  'Le patient peut retirer un accès à tout moment.',
];

export default function PatientQRCode() {
  const { user } = useAuth();
  const toast = useToast();
  const figure = useRef<HTMLDivElement>(null);
  const value = user && 'qrCode' in user ? user.qrCode : 'LP-DEMO-2026';
  const name = user ? accountName(user) : 'Patient démo';

  const download = () => {
    const svg = figure.current?.querySelector('svg');
    if (!svg) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lifepass-${value}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast('QR code téléchargé en SVG');
  };

  return (
    <>
      <PageHeader title="Mon QR code" lead="Un seul code pour ouvrir votre dossier, seulement quand vous le décidez." />

      <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <div ref={figure} className="flex justify-center lg:justify-start">
            <QrPass value={value} name={name} size={256} className="w-full max-w-sm" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Chip tone="pulse">Actif</Chip>
            <Chip>Code d'accès {value}</Chip>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" onClick={download}>
              <DownloadSimple size={22} /> Télécharger
            </Button>
            <Button size="lg" variant="secondary" onClick={() => window.print()}>
              <Printer size={22} /> Imprimer
            </Button>
            <Button size="lg" variant="secondary" className="col-span-2" onClick={() => toast("Partage temporaire simulé : aucun lien n'est créé")}>
              <ShareNetwork size={22} /> Partager un accès temporaire
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-14">
          <Section title="Comment ça se passe">
            <ol className="flex flex-col">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-5">
                  <span className="font-display text-3xl text-pulse-deep tnum">{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="text-ink-2">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Ce que la conception vise">
            <ul className="flex flex-col">
              {DESIGN_INTENT.map((t) => (
                <li key={t} className="border-t border-line py-4">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-small text-ink-3">
              C'est l'intention du prototype. Rien n'est audité, certifié ou chiffré ici : les données sont fictives.
            </p>
          </Section>

          <Section title="Utilisation">
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-small text-ink-3">Scans</dt>
                <dd className="font-display text-4xl tnum">{QR_STATS.totalScans}</dd>
              </div>
              <div>
                <dt className="text-small text-ink-3">Validés</dt>
                <dd className="font-display text-4xl tnum">{QR_STATS.validated}</dd>
              </div>
            </dl>
            <Link
              to="/patient/access-logs"
              className="mt-6 flex min-h-14 items-center justify-between gap-4 border-t border-line pt-4 transition-opacity hover:opacity-70"
            >
              <span>
                <span className="block text-small text-ink-3">Dernier scan</span>
                <span className="font-semibold">{QR_STATS.lastScan.name}</span>
                <span className="text-ink-2">
                  {' '}
                  {QR_STATS.lastScan.when}, {QR_STATS.lastScan.time}
                </span>
              </span>
              <ArrowRight size={22} weight="bold" aria-hidden="true" />
            </Link>
          </Section>
        </div>
      </div>
    </>
  );
}
