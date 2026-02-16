import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = isHome
        ? [
            { label: 'Problème', href: '#probleme' },
            { label: 'Solution', href: '#solution' },
        ]
        : [];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="group-hover:scale-110 transition-transform">
                        <img src="/logo.png" alt="LifePass Logo" className="w-14 h-14 object-contain" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">
                        LifePass
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`text-sm font-bold transition-all hover:text-blue-400 ${scrolled || !isHome ? 'text-slate-300' : 'text-white/80'}`}
                        >
                            {link.label}
                        </a>
                    ))}

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-bold text-white hover:text-blue-400 transition-colors"
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                            >
                                Rejoindre la Beta
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-white/80">
                                {user.firstName} {user.lastName}
                            </span>
                            <button
                                onClick={logout}
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                                title="Déconnexion"
                            >
                                <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/5 p-8 lg:hidden shadow-2xl space-y-6"
                    >
                        {navLinks.map((link) => (
                            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block text-xl font-bold text-white hover:text-blue-400">{link.label}</a>
                        ))}
                        <div className="h-px bg-white/5" />
                        {!user ? (
                            <div className="space-y-4">
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-xl font-bold text-white">Connexion</Link>
                                <Link to="/signup" onClick={() => setMobileOpen(false)} className="block w-full py-4 bg-blue-600 text-white text-center rounded-2xl font-black shadow-xl shadow-blue-600/20">Rejoindre la Beta</Link>
                            </div>
                        ) : (
                            <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 text-red-500 font-bold text-xl">
                                <LogOut className="w-6 h-6" /> Déconnexion
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
