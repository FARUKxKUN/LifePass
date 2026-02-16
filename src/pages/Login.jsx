import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, ArrowLeft, User, Stethoscope, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('patient');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const result = login(email, password);
        if (result.success) {
            navigate(result.user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
        } else {
            setError(result.error);
        }
    };

    const demoAccounts = {
        patient: { email: 'jean@email.com', pass: 'demo1234' },
        doctor: { email: 'dr.martin@email.com', pass: 'demo1234' },
    };

    const fillDemo = (type) => {
        setEmail(demoAccounts[type].email);
        setPassword(demoAccounts[type].pass);
        setRole(type);
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
            {/* Left Side: Illustration & Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] relative flex-col items-center justify-center p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-20">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center space-y-8"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <img src="/logo.png" alt="LifePass Logo" className="w-20 h-20 object-contain" />
                        <span className="text-4xl font-black tracking-tighter text-white">LifePass</span>
                    </div>

                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Vos données vitales, <br />
                        <span className="text-blue-500 text-5xl">en toute sécurité.</span>
                    </h2>

                    <div className="pt-8">
                        <div className="w-64 h-64 bg-white/5 border border-white/10 rounded-[3rem] p-8 mx-auto backdrop-blur-3xl flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="w-full aspect-square bg-white rounded-2xl p-4 flex items-center justify-center"
                            >
                                <span className="text-6xl">📱</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 left-12 right-12 flex justify-between text-blue-300 text-xs font-bold uppercase tracking-widest opacity-40">
                    <span>HDS CERTIFIED</span>
                    <span>ISO 27001</span>
                    <span>GDPR COMPLIANT</span>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900">Content de vous revoir</h1>
                        <p className="text-slate-500 font-medium">Connectez-vous à votre espace personnel sécurisé.</p>
                    </div>

                    {/* Role Selector */}
                    <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-200/50 rounded-2xl border border-slate-200">
                        <button
                            onClick={() => setRole('patient')}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'patient' ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <User className="w-4 h-4" /> Patient
                        </button>
                        <button
                            onClick={() => setRole('doctor')}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'doctor' ? 'bg-white text-emerald-600 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Stethoscope className="w-4 h-4" /> Médecin
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nom@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Mot de passe</label>
                                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Oublié ?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${role === 'patient' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}
                        >
                            Se connecter
                        </button>
                    </form>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-slate-200" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ou utiliser la démo</span>
                            <div className="flex-1 h-px bg-slate-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => fillDemo('patient')} className="py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2">
                                <span className="text-base text-blue-500">🏥</span> Patient
                            </button>
                            <button onClick={() => fillDemo('doctor')} className="py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2">
                                <span className="text-base text-emerald-500">🩺</span> Médecin
                            </button>
                        </div>

                        <p className="text-center text-sm font-semibold text-slate-500">
                            Nouveau sur LifePass ? <Link to="/signup" className="text-blue-600 font-black hover:underline">Créer un compte</Link>
                        </p>
                    </div>

                    <Link to="/" className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-bold">
                        <ArrowLeft className="w-4 h-4" /> Retour au site
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
