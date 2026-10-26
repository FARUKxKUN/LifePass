import { Link } from 'react-router-dom';
import { Logo } from '../ui/Brand';
import { ButtonLink } from '../ui/Button';

const LINKS = [
  { href: '#parcours', label: 'Le parcours' },
  { href: '#cotes', label: 'Patient et médecin' },
  { href: '#protection', label: 'Protection' },
  { href: '#questions', label: 'Questions' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Sections de la page" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center rounded-full px-4 font-medium text-ink-2 transition-colors hover:bg-sunk hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden min-h-11 items-center rounded-full px-4 font-semibold hover:bg-sunk sm:inline-flex">
            Se connecter
          </Link>
          <ButtonLink to="/login" size="sm">
            Essayer la démo
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
