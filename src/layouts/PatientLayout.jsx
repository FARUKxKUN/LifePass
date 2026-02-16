import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, QrCode, FileText, Shield, Bell, Settings, LogOut, Menu, X, ChevronDown, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from '../components/NotificationCenter';
import { NOTIFICATIONS_PATIENT } from '../data/mockData';

const navItems = [
    { to: '/patient/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/patient/qr-code', icon: QrCode, label: 'Mon QR Code' },
    { to: '/patient/medical-records', icon: FileText, label: 'Dossier Médical' },
    { to: '/patient/access-logs', icon: Shield, label: 'Gestion Accès' },
    { to: '/patient/settings', icon: Settings, label: 'Paramètres' },
];

export default function PatientLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#020617]">
            {/* Logo */}
            <div className="p-10 pb-16">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="group-hover:scale-110 transition-transform">
                        <div className="group-hover:scale-110 transition-transform">
                            <img src="/logo.png" alt="LifePass" className="w-16 h-16 object-contain" />
                        </div>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">LifePass</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-6 space-y-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-sm font-black transition-all duration-300 ${isActive
                                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20'
                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* User info */}
            <div className="p-8 border-t border-white/5">
                <div className="bg-white/5 p-5 rounded-[2rem] flex items-center gap-4 border border-white/5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 font-black text-lg border border-blue-600/20">
                        {user?.firstName?.charAt(0) || 'P'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white truncate">{user?.firstName} {user?.lastName}</p>
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] truncate">Patient Pass</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-6 py-4 mt-6 rounded-[1.5rem] text-sm font-black text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] flex selection:bg-blue-500/30 selection:text-white">
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-80 bg-[#020617] border-r border-white/5 fixed inset-y-0 left-0 z-30 shadow-2xl">
                <SidebarContent />
            </aside>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                        <motion.aside initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }} transition={{ type: 'spring', damping: 25, stiffness: 80 }} className="fixed inset-y-0 left-0 w-80 bg-[#020617] shadow-2xl z-50 flex flex-col lg:hidden border-r border-white/5">
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="flex-1 lg:ml-80 bg-[#020617]">
                {/* Top header */}
                <header className="sticky top-0 z-20 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 px-8 lg:px-12 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 text-slate-400 hover:text-white bg-white/5 rounded-xl border border-white/10 transition-colors">
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black text-white tracking-tight">Bonjour {user?.firstName} 👋</h1>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em] hidden sm:block mt-1">Sytème de Santé LifePass Sécurisé</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <NotificationCenter notifications={NOTIFICATIONS_PATIENT} />
                            <div className="relative">
                                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1.5 pr-4 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 font-black">
                                        {user?.firstName?.charAt(0)}
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="absolute right-0 mt-4 w-64 bg-[#0f172a] border border-white/10 rounded-[1.5rem] shadow-2xl p-3 z-50">
                                            <NavLink to="/patient/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-4 px-5 py-4 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                <Settings className="w-5 h-5" /> Paramètres
                                            </NavLink>
                                            <div className="h-px bg-white/5 my-2" />
                                            <button onClick={handleLogout} className="flex items-center gap-4 w-full px-5 py-4 text-sm font-black text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left">
                                                <LogOut className="w-5 h-5" /> Déconnexion
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="p-8 lg:p-14 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
