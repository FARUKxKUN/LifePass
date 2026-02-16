import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, ArrowLeft, User, Stethoscope, Lock, Mail, BadgeCheck, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [role, setRole] = useState('patient');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', bloodType: 'A+', specialty: '', rppsNumber: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        if (form.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        const result = signup({ ...form, role });
        if (result.success) {
            navigate(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
        }
    };

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const specialties = ['Médecin Généraliste', 'Cardiologue', 'Pneumologue', 'Dermatologue', 'Ophtalmologue', 'Neurologue', 'Chirurgien', 'Radiologue', 'Autre'];

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
            {/* Left Side: Branding */}
            <div className={`hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden transition-colors duration-700 ${role === 'patient' ? 'bg-[#0F172A]' : 'bg-[#064E3B]'}`}>
                <div className="absolute top-0 right-0 w-full h-full opacity-20">
                    <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700 ${role === 'patient' ? 'bg-blue-600' : 'bg-emerald-400'}`} />
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
                        {role === 'patient' ? 'Reprenez le contrôle' : 'Simplifiez votre practice'} <br />
                        <span className={`text-5xl transition-colors duration-700 ${role === 'patient' ? 'text-blue-500' : 'text-emerald-400'}`}>
                            {role === 'patient' ? 'de votre santé.' : 'au quotidien.'}
                        </span>
                    </h2>

                    <div className="pt-8">
                        <div className="w-64 h-64 bg-white/5 border border-white/10 rounded-[3rem] p-8 mx-auto backdrop-blur-3xl flex items-center justify-center">
                            <motion.div
                                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
                                className="w-full aspect-square bg-white rounded-2xl p-4 flex items-center justify-center relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 opacity-10 ${role === 'patient' ? 'bg-blue-600' : 'bg-emerald-600'}`} />
                                <span className="text-6xl relative z-10">{role === 'patient' ? '👤' : '🩺'}</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-8 py-8"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900">Créer un compte</h1>
                        <p className="text-slate-500 font-medium">Rejoignez la révolution médicale en 2 minutes.</p>
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
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Prénom</label>
                                <input
                                    type="text"
                                    value={form.firstName} onChange={(e) => update('firstName', e.target.value)}
                                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nom</label>
                                <input
                                    type="text"
                                    value={form.lastName} onChange={(e) => update('lastName', e.target.value)}
                                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email professionnel</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={form.email} onChange={(e) => update('email', e.target.value)}
                                    placeholder="nom@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
                                    required
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {role === 'doctor' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                    className="space-y-5 overflow-hidden"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Spécialité</label>
                                        <select
                                            value={form.specialty} onChange={(e) => update('specialty', e.target.value)}
                                            className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium appearance-none text-slate-900"
                                            required
                                        >
                                            <option value="">Choisir votre spécialité...</option>
                                            {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Numéro RPPS</label>
                                        <div className="relative">
                                            <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={form.rppsNumber} onChange={(e) => update('rppsNumber', e.target.value)}
                                                placeholder="12 chiffres"
                                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-900"
                                                required
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {role === 'patient' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Groupe Sanguin</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {bloodTypes.map((bt) => (
                                            <button
                                                key={bt} type="button"
                                                onClick={() => update('bloodType', bt)}
                                                className={`py-3 rounded-xl border text-sm font-bold transition-all ${form.bloodType === bt ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-500'}`}
                                            >
                                                {bt}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mot de passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={form.password} onChange={(e) => update('password', e.target.value)}
                                        className="w-full pl-9 pr-3 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-sm text-slate-900"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirmer</label>
                                <input
                                    type="password"
                                    value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)}
                                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-sm text-slate-900"
                                    required
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500" required />
                            <span className="text-xs font-medium text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                                J'accepte les conditions d'utilisation et la politique de protection des données de santé (HDS).
                            </span>
                        </label>

                        <button
                            type="submit"
                            className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${role === 'patient' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}
                        >
                            Créer mon compte
                        </button>
                    </form>

                    <p className="text-center text-sm font-semibold text-slate-500">
                        Déjà inscrit ? <Link to="/login" className="text-blue-600 font-black hover:underline">Se connecter</Link>
                    </p>

                    <Link to="/" className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-bold">
                        <ArrowLeft className="w-4 h-4" /> Retour au site
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
