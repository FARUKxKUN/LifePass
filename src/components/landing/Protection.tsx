import { Reveal } from '../ui/Reveal';

const AIMS = [
  "Le patient valide chaque demande d'accès.",
  'Chaque ouverture du dossier laisse une trace lisible par le patient.',
  "Le patient retire un accès quand il le souhaite.",
  'Le médecin indique être en consultation avant de lire.',
];

const MISSING = [
  'Aucun chiffrement réel : les données ne quittent pas votre navigateur.',
  'Aucune certification ni audit de sécurité.',
  "Aucun hébergement de données de santé, aucun serveur.",
  'Aucune donnée réelle : tous les noms et dossiers sont inventés.',
];

export function Protection() {
  return (
    <section id="protection" aria-labelledby="protection-titre" className="bg-sunk py-24 md:py-32">
      <div className="shell">
        <h2 id="protection-titre" className="max-w-3xl text-h1">
          Ce que la conception vise, et ce que ce prototype n'est pas.
        </h2>
        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h3 className="text-h3">Visé par la conception</h3>
            <ul className="mt-5 border-b border-ink/15">
              {AIMS.map((t) => (
                <li key={t} className="border-t border-ink/15 py-4">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-h3">Absent de ce prototype</h3>
            <ul className="mt-5 border-b border-ink/15">
              {MISSING.map((t) => (
                <li key={t} className="border-t border-ink/15 py-4">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="mt-12 max-w-2xl text-ink-2">
          Pour un vrai produit, il faudrait un hébergeur agréé pour les données de santé, un audit de sécurité et un avis juridique. Rien de cela n'existe ici : ne saisissez aucune information réelle.
        </p>
      </div>
    </section>
  );
}
