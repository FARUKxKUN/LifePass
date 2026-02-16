import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ScanLine, Users, FilePlus, Settings, LogOut, Menu, Shield, Bell, ChevronDown, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from '../components/NotificationCenter';
import { NOTIFICATIONS_DOCTOR } from '../data/mockData';

const navItems = [
    { to: '/doctor/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/doctor/scan-qr', icon: ScanLine, label: 'Scanner QR' },
    { to: '/doctor/patients', icon: Users, label: 'Mes Patients' },
    { to: '/doctor/add-report', icon: FilePlus, label: 'Ajouter Rapport' },
    { to: '/doctor/settings', icon: Settings, label: 'Paramètres' },
];

export default function DoctorLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Logo */}
            <div className="p-8 pb-12">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src="/logo.png" alt="LifePass" className="w-14 h-14 object-contain mr-2" />
                    <span className="text-2xl font-black tracking-tighter text-slate-900">LifePass</span>
                </Link>
                <div className="mt-4 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-lg inline-block">
                    Espace Praticien
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${isActive
                                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* User info */}
            <div className="p-6 border-t border-slate-200">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                        {user?.lastName?.charAt(0) || 'D'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate">Dr. {user?.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{user?.specialty || 'Généraliste'}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-5 py-3 mt-4 rounded-xl text-sm font-black text-red-500 hover:bg-red-50 transition-all">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex">
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-slate-50 border-r border-slate-200 fixed inset-y-0 left-0 z-30">
                <SidebarContent />
            </aside>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                        <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 flex flex-col lg:hidden">
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="flex-1 lg:ml-72 bg-white">
                {/* Top header */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 lg:px-10 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-xl font-black text-slate-900">Bonjour Dr. {user?.lastName} 👋</h1>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest hidden sm:block">LifePass Pro • Certifié CPS</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <NotificationCenter notifications={NOTIFICATIONS_DOCTOR} isDoctor={true} />
                            <div className="relative">
                                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-slate-50 hover:bg-white transition-all border border-slate-200 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50">
                                            <NavLink to="/doctor/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                                                <Settings className="w-4 h-4" /> Paramètres
                                            </NavLink>
                                            <div className="h-px bg-slate-100 my-1" />
                                            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-black text-red-500 hover:bg-red-50 rounded-xl transition-all text-left">
                                                <LogOut className="w-4 h-4" /> Déconnexion
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
