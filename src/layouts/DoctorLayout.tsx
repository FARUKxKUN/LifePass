import { FilePlus, GearSix, Scan, SquaresFour, Users } from '@phosphor-icons/react';
import { AppShell, type NavItem } from '../components/app/AppShell';
import { NOTIFICATIONS_DOCTOR } from '../data/mockData';

const NAV: NavItem[] = [
  { to: '/doctor/dashboard', label: 'Tableau de bord', short: 'Accueil', icon: SquaresFour },
  { to: '/doctor/scan-qr', label: 'Scanner un QR', short: 'Scanner', icon: Scan },
  { to: '/doctor/patients', label: 'Mes patients', short: 'Patients', icon: Users },
  { to: '/doctor/add-report', label: 'Ajouter un rapport', short: 'Rapport', icon: FilePlus },
  { to: '/doctor/settings', label: 'Paramètres', short: 'Réglages', icon: GearSix },
];

export default function DoctorLayout() {
  return <AppShell role="doctor" roleLabel="Espace praticien" nav={NAV} notifications={NOTIFICATIONS_DOCTOR} />;
}
