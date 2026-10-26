import { FolderOpen, GearSix, QrCode, ShieldCheck, SquaresFour } from '@phosphor-icons/react';
import { AppShell, type NavItem } from '../components/app/AppShell';
import { NOTIFICATIONS_PATIENT } from '../data/mockData';

const NAV: NavItem[] = [
  { to: '/patient/dashboard', label: 'Tableau de bord', short: 'Accueil', icon: SquaresFour },
  { to: '/patient/qr-code', label: 'Mon QR code', short: 'QR code', icon: QrCode },
  { to: '/patient/medical-records', label: 'Dossier médical', short: 'Dossier', icon: FolderOpen },
  { to: '/patient/access-logs', label: 'Gestion des accès', short: 'Accès', icon: ShieldCheck },
  { to: '/patient/settings', label: 'Paramètres', short: 'Réglages', icon: GearSix },
];

export default function PatientLayout() {
  return <AppShell role="patient" roleLabel="Espace patient" nav={NAV} notifications={NOTIFICATIONS_PATIENT} />;
}
