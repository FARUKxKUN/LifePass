import { motion } from 'framer-motion';
import { User, Bell, Shield, Key, Mail, Phone, MapPin, Check, Save, Camera, CreditCard, LogOut, Fingerprint, Lock, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PatientSettings() {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-6xl space-y-16 pb-32">
            {/* Header section with profile overview */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12 border-b border-white/5 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                        <div className="relative w-40 h-40 rounded-[2.8rem] bg-slate-900 border-4 border-white/10 flex items-center justify-center text-6xl shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
                            {user?.avatar || '👤'}
                            <div className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                                <Camera className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 border-4 border-slate-950 rounded-2xl flex items-center justify-center shadow-xl">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-5xl font-black text-white tracking-tighter leading-none">{user?.firstName} {user?.lastName}</h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                            <span className="px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">Membre Premium</span>
                            <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Identité Vérifiée
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                    <button onClick={logout} className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 group">
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quitter la session
                    </button>
                    <button className="flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
                        <Save className="w-5 h-5" /> Mettre à jour le profil
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
                {/* Left side: Essential Info */}
                <div className="xl:col-span-12 space-y-20">
                    <section className="space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-[1.2rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                                <User className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tight">Configuration du Compte</h3>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Données Personnelles & Chiffrement</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { label: 'Prénom', val: user?.firstName, icon: null },
                                { label: 'Nom de famille', val: user?.lastName, icon: null },
                                { label: 'Adresse Email', val: user?.email, icon: Mail },
                                { label: 'Numéro de Téléphone', val: '+33 6 12 34 56 78', icon: Phone },
                                { label: 'Adresse Domicile', val: '15 rue de la République, 13001 Marseille', icon: MapPin, full: true }
                            ].map((field, i) => (
                                <div key={i} className={`space-y-4 ${field.full ? 'md:col-span-2' : ''}`}>
                                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                                        {field.label} {field.full && <Globe className="w-3 h-3 text-blue-500" />}
                                    </label>
                                    <div className="relative group">
                                        {field.icon && <field.icon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-hover:text-blue-500 transition-colors" />}
                                        <input
                                            type="text"
                                            defaultValue={field.val}
                                            className={`w-full ${field.icon ? 'pl-16' : 'px-8'} py-5 bg-slate-900/40 border border-white/5 rounded-2xl text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500/30 transition-all placeholder:text-slate-700`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-white/5">
                        {/* Notifications */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Alertes & Canaux</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Préférences de communication</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: 'Accès Fiche Médicale', desc: 'Alerte instantanée lors d\'un scan de votre QR Code.', active: true },
                                    { label: 'Rapports Hebdomadaires', desc: 'Synthèse par mail de l\'activité sur votre dossier.', active: false },
                                    { label: 'Sécurité Exceptionnelle', desc: 'Modification de paramètres critiques du compte.', active: true, immutable: true },
                                ].map((notif, i) => (
                                    <div key={i} className="flex items-center justify-between p-8 bg-white/5 border border-white/5 rounded-[2.2rem] hover:bg-white/10 transition-all group relative overflow-hidden">
                                        <div className="max-w-[75%] relative z-10">
                                            <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors">{notif.label}</p>
                                            <p className="text-xs text-slate-500 font-bold mt-2 leading-relaxed opacity-80">{notif.desc}</p>
                                        </div>
                                        <button
                                            disabled={notif.immutable}
                                            className={`w-14 h-7 rounded-full relative transition-all duration-300 ${notif.active ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'bg-slate-800'} ${notif.immutable ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
                                        >
                                            <div className={`absolute top-1.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notif.active ? 'right-1.5' : 'left-1.5 shadow-md'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Security */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Sécurité Active</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Protection Crypto-Médicale</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <button className="w-full flex items-center justify-between p-8 bg-slate-900/40 border border-white/5 rounded-[2.2rem] group hover:border-blue-500/30 hover:bg-slate-900/60 transition-all text-left relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl" />
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                                            <Lock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-white">Authentification Forte (2FA)</p>
                                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">Double facteur actif</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-slate-800 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                                </button>

                                <button className="w-full flex items-center justify-between p-8 bg-slate-900/40 border border-white/5 rounded-[2.2rem] group hover:border-blue-500/30 hover:bg-slate-900/60 transition-all text-left relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl" />
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                                            <Key className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-white">Clé de Chiffrement Privée</p>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Sauvegardée sur appareil</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-slate-800 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                                </button>

                                <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-[2.2rem] flex items-start gap-4">
                                    <Fingerprint className="w-8 h-8 text-blue-500 shrink-0" />
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                                        Votre dossier est sécurisé par un <span className="text-blue-400">protocole HDS (Hébergement Données de Santé)</span>. L'accès biométrique est requis pour toute action d'exportation de données sensibles.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
