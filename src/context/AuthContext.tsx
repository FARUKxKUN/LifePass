import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEMO_DOCTORS, DEMO_PATIENTS } from '../data/mockData';
import type { Account, Doctor, Patient, SignupInput } from '../types';

type AuthResult = { success: true; user: Account } | { success: false; error: string };

interface AuthValue {
  user: Account | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => AuthResult;
  signup: (input: SignupInput) => AuthResult;
  logout: () => void;
}

const SESSION_KEY = 'lifepass.session';
const AuthContext = createContext<AuthValue | null>(null);

const demoAccounts: Account[] = [...DEMO_PATIENTS, ...DEMO_DOCTORS];

function readSession(): Account | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

function writeSession(user: Account | null): void {
  try {
    if (user) sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage can be blocked (private mode). The session then lasts until reload.
  }
}

function buildAccount(input: SignupInput): Account {
  const stamp = Date.now().toString();
  const base = {
    id: `${input.role}-${stamp}`,
    email: input.email,
    password: input.password,
    firstName: input.firstName,
    lastName: input.lastName,
  };
  if (input.role === 'patient') {
    const patient: Patient = {
      ...base,
      birthDate: '',
      age: 0,
      gender: '',
      bloodType: input.bloodType ?? 'A+',
      weight: 0,
      height: 0,
      qrCode: `LP-2026-${input.firstName.charAt(0)}${input.lastName.charAt(0)}-${stamp.slice(-4)}`.toUpperCase(),
      role: 'patient',
    };
    return patient;
  }
  const doctor: Doctor = {
    ...base,
    specialty: input.specialty ?? '',
    rppsNumber: input.rppsNumber ?? '',
    establishment: '',
    role: 'doctor',
    patientsConsulted: 0,
    reportsCreated: 0,
  };
  return doctor;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(readSession);

  const login = useCallback((email: string, password: string): AuthResult => {
    const found = demoAccounts.find((u) => u.email === email.trim() && u.password === password);
    if (!found) return { success: false, error: 'Email ou mot de passe incorrect' };
    setUser(found);
    writeSession(found);
    return { success: true, user: found };
  }, []);

  const signup = useCallback((input: SignupInput): AuthResult => {
    const account = buildAccount(input);
    setUser(account);
    writeSession(account);
    return { success: true, user: account };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ user, isAuthenticated: user !== null, login, signup, logout }),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function accountName(user: Account): string {
  return `${user.firstName} ${user.lastName}`;
}
