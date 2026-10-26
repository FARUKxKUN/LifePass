import type { ComponentType } from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SignOut, type IconProps } from '@phosphor-icons/react';
import { accountName, useAuth } from '../../context/AuthContext';
import type { AppNotification, Role } from '../../types';
import { cn } from '../../lib/format';
import { Avatar, Logo, PrototypeNote } from '../ui/Brand';
import { Button } from '../ui/Button';
import { NotificationCenter } from './NotificationCenter';

export interface NavItem {
  to: string;
  label: string;
  short: string;
  icon: ComponentType<IconProps>;
}

interface AppShellProps {
  role: Role;
  roleLabel: string;
  nav: NavItem[];
  notifications: AppNotification[];
}

export function AppShell({ role, roleLabel, nav, notifications }: AppShellProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'} replace />;
  }

  const leave = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[17rem_1fr]">
      <a href="#contenu" className="skip-link">
        Passer au contenu
      </a>

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-paper px-5 py-6 md:flex">
        <Logo to={`/${role}/dashboard`} className="px-2" />
        <p className="label mt-3 px-3">{roleLabel}</p>
        <nav aria-label="Navigation principale" className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <RailLink key={item.to} item={item} />
          ))}
        </nav>
        <div className="flex flex-col gap-4 border-t border-line pt-5">
          <div className="flex items-center gap-3 px-2">
            <Avatar first={user.firstName} last={user.lastName} size="sm" />
            <span className="min-w-0 text-small">
              <span className="block truncate font-semibold">{accountName(user)}</span>
              <span className="block truncate text-ink-3">{role === 'doctor' && 'specialty' in user ? user.specialty : user.email}</span>
            </span>
          </div>
          <Button variant="quiet" size="sm" onClick={leave} className="justify-start">
            <SignOut size={20} /> Se déconnecter
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-md md:justify-end md:px-10">
          <Logo to={`/${role}/dashboard`} className="md:hidden" />
          <div className="flex items-center gap-2">
            <NotificationCenter initial={notifications} />
            <Button variant="quiet" size="sm" onClick={leave} className="md:hidden" aria-label="Se déconnecter">
              <SignOut size={20} />
            </Button>
          </div>
        </header>

        <main id="contenu" className="flex-1 px-5 pb-32 pt-8 md:px-10 md:pb-16 md:pt-12">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
            <PrototypeNote className="mt-16 max-w-2xl border-t border-line pt-6" />
          </div>
        </main>

        {/* Phone tab bar */}
        <nav
          aria-label="Navigation principale"
          className="fixed inset-x-0 bottom-0 z-30 grid border-t border-line bg-paper/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
          style={{ gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` }}
        >
          {nav.map((item) => (
            <TabLink key={item.to} item={item} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function RailLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          'flex min-h-12 items-center gap-3 rounded-full px-4 text-base font-medium transition-colors',
          isActive ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sunk hover:text-ink',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
          {item.label}
        </>
      )}
    </NavLink>
  );
}

function TabLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          'flex min-h-16 flex-col items-center justify-center gap-1 px-1 pt-1 text-[0.75rem] font-semibold transition-colors',
          isActive ? 'text-pulse-deep' : 'text-ink-3',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={26} weight={isActive ? 'fill' : 'regular'} />
          <span className="truncate">{item.short}</span>
        </>
      )}
    </NavLink>
  );
}
