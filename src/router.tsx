import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

/*
 * /                          landing
 * /login, /signup            demo accounts
 * /patient/*                 dashboard, qr-code, medical-records, access-logs, settings
 * /doctor/*                  dashboard, scan-qr, patient/:id, add-report, patients, settings
 *
 * Every screen is its own chunk, so the landing page does not pay for the app and vice versa.
 */
const page = (load: () => Promise<{ default: React.ComponentType }>): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => ({ Component: (await load()).default }),
});

const NotInPrototype = (title: string): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => {
    const { default: Screen } = await import('./pages/doctor/NotInPrototype');
    return { Component: () => <Screen title={title} /> };
  },
});

export const router = createBrowserRouter([
  { path: '/', ...page(() => import('./pages/Home')) },
  { path: '/login', ...page(() => import('./pages/Login')) },
  { path: '/signup', ...page(() => import('./pages/Signup')) },
  {
    path: '/patient',
    ...page(() => import('./layouts/PatientLayout')),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', ...page(() => import('./pages/patient/Dashboard')) },
      { path: 'qr-code', ...page(() => import('./pages/patient/QRCode')) },
      { path: 'medical-records', ...page(() => import('./pages/patient/MedicalRecords')) },
      { path: 'access-logs', ...page(() => import('./pages/patient/AccessLogs')) },
      { path: 'settings', ...page(() => import('./pages/patient/Settings')) },
    ],
  },
  {
    path: '/doctor',
    ...page(() => import('./layouts/DoctorLayout')),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', ...page(() => import('./pages/doctor/Dashboard')) },
      { path: 'scan-qr', ...page(() => import('./pages/doctor/ScanQR')) },
      { path: 'patient/:id', ...page(() => import('./pages/doctor/PatientView')) },
      { path: 'patients', ...NotInPrototype('Mes patients') },
      { path: 'add-report', ...page(() => import('./pages/doctor/AddReport')) },
      { path: 'settings', ...NotInPrototype('Paramètres') },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
