import { ButtonLink } from '../../components/ui/Button';
import { PageHeader } from '../../components/app/PageHeader';

export default function NotInPrototype({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="max-w-xl border-y border-line py-12">
        <p className="text-h3 font-display">Cet écran n'est pas dans le prototype.</p>
        <p className="mt-3 text-ink-2">Les écrans présentés au hackathon couvraient le scan, le dossier du patient et l'ajout d'un rapport.</p>
        <ButtonLink to="/doctor/dashboard" variant="secondary" className="mt-6">
          Retour au tableau de bord
        </ButtonLink>
      </div>
    </>
  );
}
