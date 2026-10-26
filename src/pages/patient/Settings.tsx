import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretRight, Key, Lock, SignOut } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { PATIENT_CONTACT } from '../../data/mockData';
import { PageHeader, Section } from '../../components/app/PageHeader';
import { Avatar } from '../../components/ui/Brand';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { TextField } from '../../components/ui/Field';
import { Switch } from '../../components/ui/Switch';
import { useToast } from '../../components/ui/Toast';

interface Pref {
  id: string;
  label: string;
  desc: string;
  locked?: boolean;
}

const PREFS: Pref[] = [
  { id: 'scan', label: 'Accès à la fiche médicale', desc: "Une alerte à chaque scan de votre QR code." },
  { id: 'weekly', label: 'Résumé hebdomadaire', desc: "Un récapitulatif par e-mail de l'activité sur votre dossier." },
  { id: 'security', label: 'Changements de sécurité', desc: 'Toute modification de paramètres sensibles. Toujours active.', locked: true },
];

export default function PatientSettings() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ scan: true, weekly: false, security: true });

  if (!user) return null;

  const save = (e: FormEvent) => {
    e.preventDefault();
    toast('Profil mis à jour (simulé, rien n\'est enregistré)');
  };

  const leave = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <PageHeader
        title="Paramètres"
        actions={
          <Button variant="secondary" onClick={leave}>
            <SignOut size={22} /> Se déconnecter
          </Button>
        }
      />

      <div className="mb-14 flex flex-wrap items-center gap-6 border-y border-line py-8">
        <Avatar first={user.firstName} last={user.lastName} size="lg" />
        <div>
          <p className="font-display text-3xl leading-tight">
            {user.firstName} {user.lastName}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip tone="pulse">Compte de démonstration</Chip>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <Section title="Vos informations">
          <form onSubmit={save} className="grid max-w-3xl gap-6 md:grid-cols-2">
            <TextField label="Prénom" defaultValue={user.firstName} autoComplete="given-name" />
            <TextField label="Nom" defaultValue={user.lastName} autoComplete="family-name" />
            <TextField label="Adresse e-mail" type="email" defaultValue={user.email} autoComplete="email" wrapperClassName="md:col-span-2" />
            <TextField label="Téléphone" type="tel" defaultValue={PATIENT_CONTACT.phone} autoComplete="tel" />
            <TextField label="Adresse" defaultValue={PATIENT_CONTACT.address} autoComplete="street-address" wrapperClassName="md:col-span-2" />
            <div className="md:col-span-2">
              <Button type="submit" size="lg">
                Enregistrer
              </Button>
            </div>
          </form>
        </Section>

        <Section title="Notifications">
          <ul className="max-w-3xl divide-y divide-line border-y border-line">
            {PREFS.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-6 py-5">
                <span>
                  <span className="block font-semibold">{p.label}</span>
                  <span className="text-ink-2">{p.desc}</span>
                </span>
                <Switch
                  label={p.label}
                  checked={prefs[p.id] ?? false}
                  disabled={p.locked}
                  onChange={(next) => setPrefs((prev) => ({ ...prev, [p.id]: next }))}
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Sécurité">
          <ul className="max-w-3xl divide-y divide-line border-y border-line">
            <SecurityRow icon={<Lock size={24} />} title="Authentification en deux étapes" status="Maquette, non fonctionnelle" onClick={() => toast("Cette option n'existe pas dans le prototype")} />
            <SecurityRow icon={<Key size={24} />} title="Clé de chiffrement privée" status="Maquette, non fonctionnelle" onClick={() => toast("Cette option n'existe pas dans le prototype")} />
          </ul>
        </Section>
      </div>
    </>
  );
}

function SecurityRow({ icon, title, status, onClick }: { icon: React.ReactNode; title: string; status: string; onClick: () => void }) {
  return (
    <li>
      <button type="button" onClick={onClick} className="flex min-h-20 w-full items-center gap-5 py-5 text-left transition-opacity hover:opacity-70">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-sunk text-ink-2">{icon}</span>
        <span className="flex-1">
          <span className="block font-semibold">{title}</span>
          <span className="text-small text-ink-3">{status}</span>
        </span>
        <CaretRight size={22} aria-hidden="true" className="text-ink-3" />
      </button>
    </li>
  );
}
