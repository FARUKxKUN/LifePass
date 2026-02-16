import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientLayout from './layouts/PatientLayout';
import DoctorLayout from './layouts/DoctorLayout';

// Helper for protected routes
const ProtectedRoute = ({ children, allowedRole }) => {
    // In a real app we'd check AuthContext here
    // For the MVP we'll rely on the layouts and redirection in components
    return children;
};

// Placeholder components for routes we haven't built yet
const Placeholder = ({ name }) => (
    <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
        <p className="text-slate-400">Cette page est en cours de développement.</p>
    </div>
);

// We'll import real pages as we build them
import PatientDashboard from './pages/patient/Dashboard';
import PatientQRCode from './pages/patient/QRCode';
import PatientMedicalRecords from './pages/patient/MedicalRecords';
import PatientAccessLogs from './pages/patient/AccessLogs';
import PatientSettings from './pages/patient/Settings';

import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorScanQR from './pages/doctor/ScanQR';
import DoctorPatientView from './pages/doctor/PatientView';
import DoctorAddReport from './pages/doctor/AddReport';

/**
 * 📐 COMPLETE ARCHITECTURE
 * 
 * /                          → Landing page
 * /login                     → Connexion
 * /signup                    → Inscription
 * /patient/dashboard         → Dashboard patient
 * /patient/qr-code           → Mon QR code
 * /patient/medical-records   → Mon dossier médical
 * /patient/access-logs       → Gestion des accès
 * /patient/settings          → Paramètres
 * /doctor/dashboard          → Dashboard médecin
 * /doctor/scan-qr            → Scanner QR patient
 * /doctor/patient/:id        → Dossier patient consulté
 * /doctor/add-report         → Ajouter un rapport médical
 */

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/patient',
        element: <PatientLayout />,
        children: [
            { path: '', element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <PatientDashboard /> },
            { path: 'qr-code', element: <PatientQRCode /> },
            { path: 'medical-records', element: <PatientMedicalRecords /> },
            { path: 'access-logs', element: <PatientAccessLogs /> },
            { path: 'settings', element: <PatientSettings /> },
        ],
    },
    {
        path: '/doctor',
        element: <DoctorLayout />,
        children: [
            { path: '', element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <DoctorDashboard /> },
            { path: 'scan-qr', element: <DoctorScanQR /> },
            { path: 'patient/:id', element: <DoctorPatientView /> },
            { path: 'patients', element: <Placeholder name="Mes Patients" /> },
            { path: 'add-report', element: <DoctorAddReport /> },
            { path: 'settings', element: <Placeholder name="Paramètres" /> },
        ],
    },
]);
