import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Bell, Check, X, Settings, Trash2, Clock, Info, UserCheck, History, AlertCircle, ChevronRight, Lock, TrendingUp as TrendingUpIcon, Activity } from 'lucide-react';
import { PENDING_REQUESTS as INITIAL_PENDING, AUTHORIZED_PROFESSIONALS as INITIAL_AUTHORIZED, ACCESS_LOGS } from '../../data/mockData';

export default function PatientAccessLogs() {
    const [pending, setPending] = useState(INITIAL_PENDING);
    const [authorized, setAuthorized] = useState(INITIAL_AUTHORIZED);

    const handleApprove = (req) => {
        setPending(pending.filter(p => p.id !== req.id));
        setAuthorized([{
            name: req.doctorName,
            role: req.specialty,
            level: 'Total (Lecture/Écriture)',
            expires: 'Dans 24h',
            note: 'Approbation temporaire'
        }, ...authorized]);
    };

    const handleReject = (id) => {
        setPending(pending.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-12 pb-24">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Accès ce mois', value: '24', sub: '+12% vs mois dernier', color: 'text-blue-400', glow: 'shadow-blue-500/10' },
                    { label: 'Pros Autorisés', value: authorized.length, sub: 'Dossier sécurisé', color: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
                    { label: 'Demandes Actives', value: pending.length, sub: "Action requise", color: 'text-orange-400', glow: 'shadow-orange-500/10' }
                ].map((stat, i) => (
                    <div key={i} className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] shadow-xl ${stat.glow}`}>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                        <p className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-6 flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-current ${stat.color}`} />
                            {stat.sub}
                        </p>
                    </div>
                ))}
            </div>

            {/* Section : Demandes en Attente */}
            <AnimatePresence>
                {pending.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, height: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                                <Bell className="w-6 h-6 text-orange-400 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Demandes d'accès ({pending.length})</h2>
                                <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">Actions prioritaires requises</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {pending.map((req) => (
                                <motion.div
                                    key={req.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-slate-900 border border-orange-500/20 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col group relative"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl pointer-events-none" />
                                    <div className="p-10 space-y-8 flex-1 relative z-10">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-black text-white text-2xl tracking-tighter">{req.doctorName}</h3>
                                                <p className="text-sm text-blue-400 font-bold mt-1">{req.specialty} • {req.establishment}</p>
                                            </div>
                                            <div className="px-4 py-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono">
                                                {req.requestedAt}
                                            </div>
                                        </div>

                                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 space-y-6">
                                            <div className="flex items-center gap-3 text-slate-500">
                                                <Lock className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Accès Demandé</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {req.requestedAccess.map((access, i) => (
                                                    <span key={i} className="text-[10px] bg-white/5 text-slate-300 px-4 py-2 rounded-xl border border-white/10 font-black uppercase tracking-widest flex items-center gap-2 group-hover:border-blue-500/30 transition-colors">
                                                        <Check className="w-3.5 h-3.5 text-emerald-400" /> {access}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="pt-6 border-t border-white/5">
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 font-mono">Motif Consultation</p>
                                                <p className="text-base text-slate-300 font-medium italic leading-relaxed">"{req.reason}"</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-8 border-t border-white/5 grid grid-cols-2 gap-6">
                                        <button
                                            onClick={() => handleApprove(req)}
                                            className="px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
                                        >
                                            Approuver
                                        </button>
                                        <button
                                            onClick={() => handleReject(req.id)}
                                            className="px-8 py-5 bg-white/5 hover:bg-red-500/10 text-red-400 border border-white/10 hover:border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                                        >
                                            Refuser
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Section : Professionnels Autorisés */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                            <UserCheck className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Espace de Confiance</h2>
                    </div>
                    <button className="text-[10px] font-black py-4 px-8 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition-all uppercase tracking-widest shadow-2xl shadow-blue-600/20">
                        + Pré-autorisation
                    </button>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Praticien</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Permissions</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Validité</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] text-right">Contrôle</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {authorized.map((pro, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-all">
                                        <td className="px-10 py-8">
                                            <p className="text-base font-black text-white">{pro.name}</p>
                                            <p className="text-xs text-blue-400 font-bold mt-0.5">{pro.role}</p>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                                                <span className="text-xs font-black text-slate-300">{pro.level}</span>
                                            </div>
                                            {pro.note && <p className="text-[10px] text-slate-500 mt-2 italic font-bold">({pro.note})</p>}
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3 text-slate-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-xs font-black uppercase tracking-widest font-mono">{pro.expires}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 text-slate-400 hover:text-white bg-white/5 rounded-xl border border-white/10 transition-all">
                                                    <Settings className="w-5 h-5" />
                                                </button>
                                                <button className="p-3 text-slate-400 hover:text-red-500 bg-white/5 rounded-xl border border-white/10 transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Section : Historique des Accès */}
            <section className="space-y-10">
                <div className="flex items-center gap-5">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                        <History className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Audit Log Immuable</h2>
                </div>

                <div className="space-y-6">
                    {ACCESS_LOGS.map((log) => (
                        <div key={log.id} className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-8 hover:bg-slate-900/80 transition-all cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all border border-white/10">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-3">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-blue-600 px-3 py-1.5 rounded-lg shadow-lg shadow-blue-600/20">LECTURE DOSSIER</span>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] font-mono">{log.date} • {log.time}</p>
                                    </div>
                                    <p className="text-2xl font-black text-white tracking-tighter">{log.doctorName}</p>
                                    <p className="text-sm text-slate-400 font-bold mt-1 leading-relaxed">{log.doctorSpecialty} • <span className="text-blue-400 font-black">"{log.documentAccessed}"</span></p>
                                </div>
                            </div>

                            <div className="flex items-center gap-10 justify-between sm:justify-end relative z-10">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] mb-2 font-mono">DURÉE SESSION</p>
                                    <p className="text-lg font-black text-white">{log.duration}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl text-slate-500 group-hover:text-white transition-all border border-white/10 group-hover:bg-white/10">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-8 border-2 border-dashed border-white/5 rounded-[3rem] text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 hover:border-white/10 transition-all active:scale-[0.99]">
                        Charger l'historique complet
                    </button>
                </div>
            </section>

            {/* Info Caveat */}
            <div className="bg-[#020617] p-10 lg:p-14 rounded-[4rem] text-white relative overflow-hidden shadow-2xl border border-white/5">
                <Shield className="absolute -top-16 -right-16 w-64 h-64 text-blue-600/10 group-hover:scale-110 transition-transform duration-1000" />
                <div className="flex items-start gap-8 relative z-10">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Info className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-2xl font-black tracking-tight leading-none">Transparence & Souveraineté</p>
                        <p className="text-base text-slate-400 font-medium leading-relaxed max-w-3xl">
                            Toutes les actions effectuées sur votre dossier médical sont enregistrées de manière immuable via notre architecture blockchain.
                            Conformément aux lois de bioéthique et au RGPD, vous conservez un droit total de révocation instantanée sur tout accès professionnel, ainsi que le contrôle sur la granularité de vos données partagées.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
