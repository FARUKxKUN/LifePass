import { ButtonLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

const PATIENT = [
  ['Tableau de bord', 'Une synthèse de santé, les allergies en premier, et l\'activité récente.'],
  ['Dossier médical', 'Les rapports en liste ou en chronologie, avec recherche et filtre.'],
  ['QR code personnel', 'À afficher, télécharger ou imprimer.'],
  ['Journal des accès', "Accepter, refuser ou retirer l'accès d'un professionnel."],
  ['Paramètres', 'Profil, notifications, options de sécurité.'],
];

const DOCTOR = [
  ['Scan du QR code', "Lecture du code, code secret, accord du patient."],
  ['Dossier du patient', 'Synthèse, allergies, traitements, historique.'],
  ['Nouveau rapport', 'En trois étapes, signé avant publication.'],
  ['Tableau de bord', 'Patients récents et demandes en attente.'],
];

export function Sides() {
  return (
    <section id="cotes" aria-labelledby="cotes-titre" className="shell py-24 md:py-36">
      <h2 id="cotes-titre" className="max-w-3xl text-h1">
        Deux espaces, un seul dossier.
      </h2>
      <div className="mt-16 grid gap-20 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h3 className="font-display text-4xl">Côté patient</h3>
          <p className="mt-3 max-w-sm text-ink-2">Pensé pour le téléphone, avec de grands caractères et de grandes zones à toucher.</p>
          <FeatureList items={PATIENT} />
          <ButtonLink to="/login" className="mt-8">
            Ouvrir l'espace patient
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1} className="md:mt-32">
          <h3 className="font-display text-4xl">Côté médecin</h3>
          <p className="mt-3 max-w-sm text-ink-2">Aller droit au dossier, puis laisser une trace claire de ce qu'on a vu.</p>
          <FeatureList items={DOCTOR} />
          <ButtonLink to="/login" variant="secondary" className="mt-8">
            Ouvrir l'espace praticien
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureList({ items }: { items: string[][] }) {
  return (
    <ul className="mt-8 border-b border-line">
      {items.map(([title, text]) => (
        <li key={title} className="border-t border-line py-4">
          <span className="block font-semibold">{title}</span>
          <span className="text-ink-2">{text}</span>
        </li>
      ))}
    </ul>
  );
}
