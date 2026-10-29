import { ArrowUpRight } from '@phosphor-icons/react';
import { Logo, PrototypeNote } from '../ui/Brand';
import { ButtonLink } from '../ui/Button';

const REPO = 'https://github.com/FARUKxKUN/LifePass';

const PEOPLE: { name: string; role: string; href?: string }[] = [
  { name: 'Yassine Bouteraa', role: 'Idéation, design du pitch deck', href: 'https://github.com/yassinebouteraa' },
  { name: 'Rayen Chatti', role: 'Idéation, design du pitch deck', href: 'https://github.com/rayenchatti' },
  { name: 'Ameny Ferchichi', role: 'Pitch' },
  { name: 'Farouk Battikh', role: 'Prototype, pitch', href: 'https://github.com/FARUKxKUN' },
];

const ROW = 'flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 md:px-2';

export function Team() {
  return (
    <>
      <section aria-labelledby="equipe-titre" className="shell pb-24 md:pb-36">
        <h2 id="equipe-titre" className="max-w-4xl text-h1">
          1re place au DevHeist, ISIMa, février 2026.
        </h2>
        <p className="mt-6 max-w-xl text-ink-2">Un projet d'équipe à quatre : l'idéation et le pitch deck, le pitch devant le jury, puis la maquette cliquable.</p>
        <ul className="mt-12 max-w-3xl border-b border-line">
          {PEOPLE.map((p) => (
            <li key={p.name} className="border-t border-line">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" className={`group transition-colors hover:bg-sunk/60 ${ROW}`}>
                  <span className="font-display text-3xl leading-tight">
                    {p.name}
                    <span className="sr-only"> (profil GitHub, nouvel onglet)</span>
                  </span>
                  <span className="flex items-center gap-3 text-ink-2">
                    {p.role}
                    <ArrowUpRight size={20} weight="bold" className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              ) : (
                <div className={ROW}>
                  <span className="font-display text-3xl leading-tight">{p.name}</span>
                  <span className="text-ink-2">{p.role}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink to="/login" size="lg">
            Entrer dans la démo
          </ButtonLink>
          <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center rounded-full border border-ink/25 px-8 text-lg font-semibold transition-colors hover:bg-sunk">
            Voir le code
          </a>
        </div>
      </section>

      <footer className="border-t border-line py-10">
        <div className="shell flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Logo />
            <a href={`${REPO}/tree/hackathon-2026-02`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-small font-semibold text-pulse-deep underline underline-offset-4">
              Version présentée au hackathon
            </a>
          </div>
          <PrototypeNote className="max-w-2xl" />
        </div>
      </footer>
    </>
  );
}
