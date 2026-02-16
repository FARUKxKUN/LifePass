import { motion } from 'framer-motion';
import { QrCode, FileText, Eye, Activity as ActivityIcon, Info, AlertTriangle, CheckCircle2, TrendingUp, Download, ArrowRight, Clock, User as UserIcon, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AI_SYNTHESIS, ACTIVITY_FEED } from '../../data/mockData';
import AIChatBot from '../../components/AIChatBot';

export default function PatientDashboard() {
    const { profile, criticalAlerts, activeTreatments, pathologies, recentExams, trends, recommendations, generatedAt } = AI_SYNTHESIS;

    return (
        <div className="space-y-12 pb-24">
            {/* 📊 Top Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* CARD 1: Votre QR Code */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] group hover:border-blue-500/50 hover:bg-slate-900/80 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all" />
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <QrCode className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Votre QR Code</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                                <span className="text-sm font-black text-emerald-400">Statut : Actif</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-12">
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">Vu il y a 2 jours</p>
                        <Link to="/patient/qr-code" className="text-sm font-black text-blue-400 flex items-center gap-2 hover:gap-4 transition-all">
                            Accéder <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* CARD 2: Rapports Médicaux */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] group hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all" />
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Dossier Médical</p>
                            <p className="text-2xl font-black text-white mt-1">12 fichiers</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-12">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-7 h-7 rounded-xl bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] font-bold text-slate-400">📄</div>)}
                        </div>
                        <Link to="/patient/medical-records" className="text-sm font-black text-emerald-400 flex items-center gap-2 hover:gap-4 transition-all">
                            Explorer <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* CARD 3: Accès Récents */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all" />
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
                            <Eye className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Confidentialité</p>
                            <p className="text-2xl font-black text-white mt-1">3 Alertes</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-12">
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] leading-none">Dernier : Dr. S. Martin</p>
                        <Link to="/patient/access-logs" className="text-sm font-black text-white flex items-center gap-2 hover:gap-4 transition-all">
                            Gérer <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* AI MEDICAL RECORD SECTION */}
            <motion.section
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="bg-white/5 p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-600/20 relative">
                            <ActivityIcon className="w-10 h-10" />
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Synthèse Santé LifePass IA</h2>
                            <p className="text-[10px] text-slate-500 font-black mt-2 uppercase tracking-[0.3em] flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                                Mises à jour le {generatedAt}
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-4 px-10 py-5 bg-white/5 text-white rounded-2xl font-black text-sm hover:bg-white/10 transition-all border border-white/10 active:scale-95">
                        <Download className="w-5 h-5" /> Exporter PDF
                    </button>
                </div>

                <div className="p-10 lg:p-16 space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Profile & Alerts */}
                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-4">
                                    <UserIcon className="w-4 h-4" /> Profil & Vitalité
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: 'Âge', value: `${profile.age} ans`, color: 'text-white' },
                                        { label: 'Sang', value: profile.bloodType, color: 'text-red-500 font-black' },
                                        { label: 'Poids/Taille', value: `${profile.weight}kg / ${profile.height}cm`, color: 'text-white' },
                                        { label: 'IMC', value: profile.bmi, color: 'text-emerald-400 font-bold' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 p-6 rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-all">
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] flex items-center gap-4">
                                    <AlertTriangle className="w-4 h-4" /> Alertes Critiques
                                </h3>
                                <div className="space-y-4">
                                    {criticalAlerts.map((alert, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-6 rounded-[1.5rem] bg-red-500/5 border border-red-500/10 group hover:bg-red-500/10 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                                                    <AlertTriangle className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-red-400/60 uppercase tracking-[0.2em]">Sévérité : {alert.severity}</p>
                                                    <p className="text-xl font-black text-red-500 mt-0.5">{alert.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Treatments & Trends */}
                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-4">
                                    <Clock className="w-4 h-4" /> Traitements Actifs
                                </h3>
                                <div className="bg-white/5 border border-white/5 rounded-[2.5rem] divide-y divide-white/5 overflow-hidden">
                                    {activeTreatments.map((t, idx) => (
                                        <div key={idx} className="p-6 flex items-center justify-between hover:bg-white/5 transition-all">
                                            <div>
                                                <p className="font-black text-white text-lg leading-tight">{t.name}</p>
                                                <p className="text-xs text-slate-500 font-semibold mt-1">Depuis {t.since} • {t.purpose}</p>
                                            </div>
                                            <span className="px-5 py-2.5 bg-blue-600/10 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-600/20">{t.dosage}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-4">
                                    <TrendingUp className="w-4 h-4" /> Tendances Biométriques
                                </h3>
                                <div className="grid grid-cols-3 gap-6">
                                    {trends.map((trend, idx) => (
                                        <div key={idx} className="bg-white/5 p-6 rounded-[1.5rem] text-center border border-white/5 hover:border-emerald-500/30 transition-all">
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3 leading-none">{trend.label}</p>
                                            <div className="text-emerald-400 flex flex-col items-center gap-1">
                                                <TrendingUp className="w-5 h-5 opacity-50" />
                                                <span className="text-xs font-black uppercase tracking-widest">{trend.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Recommendations */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] flex items-center gap-4">
                            <Sparkles className="w-4 h-4" /> Recommandations Intelligence Vie
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {recommendations.map((rec, idx) => (
                                <div key={idx} className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 group hover:bg-white/10 hover:border-blue-500/30 transition-all">
                                    <div className={`mt-1 p-4 rounded-[1.5rem] transition-colors ${rec.type === 'warning' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                        {rec.type === 'warning' ? <AlertTriangle className="w-7 h-7" /> : <Info className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <p className={`text-lg font-black leading-snug ${rec.type === 'warning' ? 'text-orange-200' : 'text-blue-100'}`}>{rec.text}</p>
                                        {rec.when && <p className="text-[10px] text-slate-500 font-black mt-3 uppercase tracking-[0.2em] italic">{rec.when}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[#020617] p-8 flex items-center justify-center gap-4 text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] border-t border-white/5">
                    <Shield className="w-4 h-4 text-blue-600" /> Sécurité HDS & Chiffrement Blockchain Actif
                </div>
            </motion.section>

            {/* Recent Activity */}
            <div className="space-y-12 pt-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-5">
                        <Clock className="w-10 h-10 text-blue-500" /> Fil d'activité
                    </h2>
                    <Link to="/patient/access-logs" className="text-[10px] font-black text-blue-400 border border-blue-400/20 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-[1.25rem] transition-all uppercase tracking-[0.3em]">
                        Tout voir
                    </Link>
                </div>

                <div className="space-y-6">
                    {ACTIVITY_FEED.map((activity, idx) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}
                            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-8 hover:bg-slate-900/80 transition-all border-l-4"
                            style={{ borderLeftColor: activity.type === 'access' ? '#3b82f6' : activity.type === 'report' ? '#10b981' : '#a855f7' }}
                        >
                            <div className="flex items-center gap-7">
                                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl ${activity.type === 'access' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : activity.type === 'report' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20' : 'bg-purple-600/10 text-purple-400 border border-purple-600/20'}`}>
                                    {activity.type === 'access' ? <Eye className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mb-2">{activity.daysAgo} Jours</p>
                                    <p className="text-xl font-black text-white leading-tight">{activity.title}</p>
                                    <p className="text-sm text-slate-400 font-medium mt-1 leading-relaxed">{activity.desc}</p>
                                </div>
                            </div>
                            <button className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black transition-all border border-white/10 uppercase tracking-[0.3em]">
                                {activity.type === 'access' ? 'Détails Log' : 'Voir Rapport'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AIChatBot />
        </div>
    );
}

