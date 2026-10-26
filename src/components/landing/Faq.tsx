import { Plus } from '@phosphor-icons/react';

const QUESTIONS = [
  {
    q: 'Puis-je y mettre mon vrai dossier ?',
    a: "Non. C'est un prototype de démonstration, sans serveur ni protection adaptée aux données de santé. Utilisez uniquement les comptes fictifs.",
  },
  {
    q: 'Comment le patient garde-t-il la main ?',
    a: "Chaque demande d'accès arrive chez lui. Il l'accepte ou la refuse, et il peut retirer un accès accordé. Le prototype montre ces gestes.",
  },
  {
    q: "Et si le patient perd son téléphone ?",
    a: "Le code serait renouvelable et les accès révocables. Ce parcours n'est pas réalisé dans le prototype.",
  },
  {
    q: 'Quels comptes de démonstration ?',
    a: "Sur la page de connexion, un bouton remplit les identifiants d'un patient (Jean Dupont) ou d'un médecin (Dr Sophie Martin).",
  },
  {
    q: "D'où vient ce projet ?",
    a: "Il a remporté la 1re place du DevHeist à l'ISIMa en février 2026. Cette version est une refonte visuelle : même produit, même parcours.",
  },
];

export function Faq() {
  return (
    <section id="questions" aria-labelledby="faq-titre" className="shell py-24 md:py-36">
      <h2 id="faq-titre" className="text-h1">
        Questions.
      </h2>
      <div className="mt-12 max-w-3xl border-b border-line">
        {QUESTIONS.map((item) => (
          <details key={item.q} className="group border-t border-line">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus size={24} weight="bold" aria-hidden="true" className="shrink-0 text-pulse-deep transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-2xl pb-6 text-ink-2">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
