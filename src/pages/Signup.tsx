import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFrame } from '../components/app/AuthFrame';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/Field';
import { Segmented } from '../components/ui/Segmented';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/format';
import type { Role } from '../types';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const MIN_PASSWORD = 8;

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('patient');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodType: 'A+',
    specialty: '',
    rppsNumber: '',
  });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password.length < MIN_PASSWORD) {
      setError(`Le mot de passe doit contenir au moins ${MIN_PASSWORD} caractères.`);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    const result = signup({
      role,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      bloodType: form.bloodType,
      specialty: form.specialty.trim(),
      rppsNumber: form.rppsNumber.trim(),
    });
    if (!result.success) {
      setError(result.error);
      return;
    }
    navigate(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };

  return (
    <AuthFrame title="Créer un compte" lead="Compte de démonstration : rien n'est envoyé ni enregistré, saisissez des données inventées.">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <Segmented
          label="Type de compte"
          value={role}
          onChange={setRole}
          options={[
            { value: 'patient', label: 'Patient' },
            { value: 'doctor', label: 'Médecin' },
          ]}
          className="w-full"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Prénom" autoComplete="given-name" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
          <TextField label="Nom" autoComplete="family-name" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
        </div>
        <TextField label="Adresse e-mail" type="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />

        {role === 'doctor' ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Spécialité" value={form.specialty} onChange={(e) => update('specialty', e.target.value)} placeholder="Cardiologue" required />
            <TextField label="Numéro RPPS" inputMode="numeric" value={form.rppsNumber} onChange={(e) => update('rppsNumber', e.target.value)} placeholder="Numéro fictif" required />
          </div>
        ) : (
          <fieldset>
            <legend className="mb-2 text-small font-semibold">Groupe sanguin</legend>
            <div className="flex flex-wrap gap-2">
              {BLOOD_TYPES.map((bt) => (
                <label
                  key={bt}
                  className={cn(
                    'inline-flex min-h-11 min-w-14 cursor-pointer items-center justify-center rounded-full border px-4 font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pulse',
                    form.bloodType === bt ? 'border-pulse bg-pulse text-surface' : 'border-ink/25 hover:bg-sunk',
                  )}
                >
                  <input type="radio" name="bloodType" value={bt} checked={form.bloodType === bt} onChange={() => update('bloodType', bt)} className="sr-only" />
                  {bt}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Mot de passe" type="password" autoComplete="new-password" value={form.password} onChange={(e) => update('password', e.target.value)} hint={`${MIN_PASSWORD} caractères minimum`} required />
          <TextField label="Confirmer" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} required />
        </div>

        <label className="flex min-h-11 cursor-pointer items-start gap-4">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-6 shrink-0 accent-pulse" required />
          <span>Je comprends que ceci est une démonstration et que je n'y saisis aucune donnée réelle.</span>
        </label>

        {error && (
          <p role="alert" className="rounded-control bg-alert-tint px-4 py-3 font-medium text-alert">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" disabled={!consent}>
          Créer le compte
        </Button>
        <p className="text-ink-2">
          Déjà un compte ?{' '}
          <Link to="/login" className="inline-flex min-h-11 items-center font-semibold text-pulse-deep underline underline-offset-4">
            Se connecter
          </Link>
        </p>
      </form>
    </AuthFrame>
  );
}
