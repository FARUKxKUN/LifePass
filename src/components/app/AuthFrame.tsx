import type { ReactNode } from 'react';
import { DEMO_PATIENTS } from '../../data/mockData';
import { Logo, PrototypeNote } from '../ui/Brand';
import { QrPass } from './QrPass';

interface AuthFrameProps {
  title: string;
  lead: string;
  children: ReactNode;
}

/** Shared frame for login and signup: the form on the left, the product's one object on the right. */
export function AuthFrame({ title, lead, children }: AuthFrameProps) {
  const demo = DEMO_PATIENTS[0];
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <a href="#formulaire" className="skip-link">
        Passer au formulaire
      </a>
      <main id="formulaire" className="flex flex-col px-5 py-8 sm:px-10 lg:px-16">
        <Logo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="text-h1">{title}</h1>
          <p className="mt-4 text-ink-2">{lead}</p>
          <div className="mt-10">{children}</div>
        </div>
        <PrototypeNote className="mx-auto max-w-md" />
      </main>

      <aside aria-hidden="true" className="hidden items-center justify-center bg-sunk p-16 lg:flex">
        <div className="flex flex-col items-start gap-8">
          <p className="max-w-xs font-display text-4xl leading-tight">Un code. Le médecin lit. Vous gardez la main.</p>
          <QrPass value={demo.qrCode} name={`${demo.firstName} ${demo.lastName}`} size={200} className="-rotate-2" />
        </div>
      </aside>
    </div>
  );
}
