import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  lead?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, lead, actions }: PageHeaderProps) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 md:mb-14">
      <div className="min-w-0 max-w-2xl">
        <h1 className="text-h1">{title}</h1>
        {lead && <p className="mt-4 text-ink-2">{lead}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}

/** A titled block of a page. Rules and space group content, not boxes. */
export function Section({ title, aside, children, className }: { title: string; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-h2">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
