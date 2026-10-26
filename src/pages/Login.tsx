import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFrame } from '../components/app/AuthFrame';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/Field';
import { Segmented } from '../components/ui/Segmented';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

const DEMO: Record<Role, { email: string; password: string }> = {
  patient: { email: 'jean@email.com', password: 'demo1234' },
  doctor: { email: 'dr.martin@email.com', password: 'demo1234' },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    navigate(result.user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
  };

  const fillDemo = (next: Role) => {
    setRole(next);
    setEmail(DEMO[next].email);
    setPassword(DEMO[next].password);
    setError('');
  };

  return (
    <AuthFrame title="Connexion" lead="Choisissez un compte de démonstration pour entrer, ou saisissez ses identifiants.">
      <div className="flex flex-col gap-8">
        <Segmented
          label="Type de compte de démonstration"
          value={role}
          onChange={fillDemo}
          options={[
            { value: 'patient', label: 'Patient' },
            { value: 'doctor', label: 'Médecin' },
          ]}
          className="w-full"
        />

        <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
          <TextField label="Adresse e-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@email.com" required />
          <div className="flex flex-col gap-2">
            <TextField
              label="Mot de passe"
              type={reveal ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setReveal((v) => !v)} className="min-h-11 self-start text-small font-semibold text-pulse-deep underline-offset-4 hover:underline" aria-pressed={reveal}>
              {reveal ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            </button>
          </div>
          {error && (
            <p role="alert" className="rounded-control bg-alert-tint px-4 py-3 font-medium text-alert">
              {error}
            </p>
          )}
          <Button type="submit" size="lg">
            Se connecter
          </Button>
        </form>

        <p className="text-ink-2">
          Pas de compte ?{' '}
          <Link to="/signup" className="inline-flex min-h-11 items-center font-semibold text-pulse-deep underline underline-offset-4">
            Créer un compte de démonstration
          </Link>
        </p>
      </div>
    </AuthFrame>
  );
}
