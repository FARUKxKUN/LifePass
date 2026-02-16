import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Activity as ActivityIcon, FileText, History, Info, AlertTriangle, CheckCircle2, Pill, Clock, TrendingUp, Download, Eye, Plus, MessageSquare, Shield, Stethoscope } from 'lucide-react';
import { DEMO_PATIENTS, MEDICAL_REPORTS, AI_SYNTHESIS } from '../../data/mockData';

export default function DoctorPatientView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('synthesis'); // 'synthesis' | 'history' | 'timeline'
    const patient = DEMO_PATIENTS.find(p => p.id === id) || DEMO_PATIENTS[0];
    const { profile: medicalProfile, criticalAlerts: alerts, pathologies, activeTreatments: treatments, recentExams, doctorRecommendations: consultationAdvice, generatedAt: lastUpdate } = AI_SYNTHESIS;

    return (
        <div className="space-y-8 pb-12">
            {/* Patient Header Card */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                <button onClick={() => navigate('/doctor/dashboard')} className="p-2.5 bg-white/5 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-between">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                        <div className="w-24 h-24 rounded-3xl bg-blue-600/20 flex items-center justify-center text-4xl border border-blue-500/20 shadow-xl shadow-blue-500/5">
                            {patient.avatar || '👤'}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold text-white">{patient.firstName} {patient.lastName}</h2>
                            <p className="text-slate-400 text-sm font-medium">{patient.age} ans • Né(e) le {new Date(patient.birthDate).toLocaleDateString('fr-FR')}</p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                                <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold uppercase tracking-widest border border-red-500/20">Groupe {patient.bloodType}</span>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20">ID: {patient.qrCode}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-auto">
                        <button onClick={() => navigate('/doctor/add-report')} className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25">
                            <Plus className="w-4 h-4" /> Ajouter Rapport
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all">
                            <Download className="w-4 h-4" /> Export Complet
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex bg-white/5 rounded-2xl p-1.5 border border-white/10 w-full max-w-2xl lg:mx-0 mx-auto">
                {[
                    { id: 'synthesis', label: 'Synthèse du Dossier', icon: Stethoscope },
                    { id: 'history', label: 'Historique Médical', icon: History },
                    { id: 'timeline', label: 'Timeline Evolution', icon: ActivityIcon },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <tab.icon className="w-4 h-4 hidden sm:block" /> {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'synthesis' && (
                    <motion.div key="synthesis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left & Middle: Synthesis Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Alerte Critiques */}
                                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
                                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" /> Alertes Patients & Points de Vigilance
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {alerts.map((alert, i) => (
                                            <div key={i} className="flex flex-col p-4 bg-red-500/10 rounded-xl border border-red-500/10">
                                                <span className="text-[10px] font-black uppercase text-red-600 mb-1">{alert.type}</span>
                                                <span className="font-bold text-red-400">{alert.name}</span>
                                                <span className="text-[10px] text-red-500/70 mt-1 italic tracking-tight">{alert.notes}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pathologies & Traitements */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <ActivityIcon className="w-4 h-4 text-blue-400" /> Pathologies Actives
                                        </h3>
                                        <div className="space-y-3">
                                            {pathologies.map((p, i) => (
                                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{p.name}</p>
                                                        <p className="text-[10px] text-slate-500 uppercase font-medium">{p.since}</p>
                                                    </div>
                                                    <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-lg">{p.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Pill className="w-4 h-4 text-emerald-400" /> Traitements en cours
                                        </h3>
                                        <div className="space-y-3">
                                            {treatments.map((t, i) => (
                                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-bold text-white text-sm">{t.name}</p>
                                                        <span className="text-[10px] font-bold text-emerald-400">{t.dosage}</span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500">{t.purpose} • Depuis {t.since}</p>
                                                    <div className="mt-2 text-[10px] p-1.5 bg-blue-500/5 rounded border border-blue-500/10 text-slate-400 italic">Observance : {t.compliance}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Derniers Examens */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-purple-400" /> Derniers Résultats Significatifs
                                    </h3>
                                    <div className="space-y-4">
                                        {recentExams.map((exam, i) => (
                                            <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/10 transition-all cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{exam.name}</p>
                                                        <p className="text-[10px] text-slate-500">{exam.date} • {exam.provider}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-slate-500 uppercase mb-0.5">Résultat</p>
                                                        <p className={`text-sm font-bold ${exam.status === 'normal' ? 'text-emerald-400' : 'text-blue-400'}`}>{exam.result}</p>
                                                    </div>
                                                    <button className="p-2 bg-white/5 text-slate-500 rounded-lg group-hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: AI Consultation Engine */}
                            <div className="space-y-8">
                                <div className="bg-blue-600/10 border border-blue-500/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl -mr-16 -mt-16" />
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg">
                                            <ActivityIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white">Assistant IA LifePass</h4>
                                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Aide à la consultation • v2.4</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                                            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                                <MessageSquare className="w-3.5 h-3.5" /> Recommandations IA
                                            </h5>
                                            {consultationAdvice.recs.map((rec, i) => (
                                                <div key={i} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                                    {rec}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <h5 className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                                                <TrendingUp className="w-3.5 h-3.5" /> Vigilance Clinique
                                            </h5>
                                            {consultationAdvice.vigilance.map((v, i) => (
                                                <div key={i} className="p-4 bg-orange-600/5 border border-orange-500/20 rounded-xl flex items-start gap-4">
                                                    <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-orange-200/80 leading-relaxed italic">{v}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between text-[10px] text-slate-500 border-t border-white/5">
                                        <span className="uppercase tracking-widest">IA certifiée CE-MD</span>
                                        <span>Mise à jour {lastUpdate}</span>
                                    </div>
                                </div>

                                {/* Actions rapides additionnelles */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Données Vitales (v0)</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase">Poids</p>
                                            <p className="text-lg font-bold text-white">{medicalProfile.weight}kg</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase">Taille</p>
                                            <p className="text-lg font-bold text-white">{medicalProfile.height}cm</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase">IMC</p>
                                            <p className="text-lg font-bold text-emerald-400">{medicalProfile.bmi}</p>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase">Niveau SÉCU</p>
                                            <p className="text-lg font-bold text-blue-400">100% (ALD)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'history' && (
                    <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-white">Full Medical History (DMP + LifePass)</h3>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="text" placeholder="Filter records..." className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden overflow-x-auto">
                                <table className="w-full text-left min-w-[700px]">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/10">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Catégorie</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Document</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Praticien</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {MEDICAL_REPORTS.map((r, i) => (
                                            <tr key={i} className="group hover:bg-white/5 transition-all">
                                                <td className="px-6 py-4 text-sm text-white font-medium">{r.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-2">{r.typeIcon} {r.type}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-white font-bold">{r.title}</td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-white font-medium">{r.doctorName}</p>
                                                    <p className="text-[10px] text-slate-500 tracking-tighter uppercase">{r.doctorSpecialty}</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'timeline' && (
                    <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <ActivityIcon className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-white">Visualisation Chronologique</h3>
                        <p className="text-slate-500 mt-2 max-w-sm mx-auto">Cette vue permet d'analyser l'évolution des marqueurs biologiques et des traitements sur une frise temporelle interactive.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed">Chargement du module (PRO uniquement)</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-emerald-500" />
                    <div>
                        <p className="text-sm font-bold text-white">Accès Certifié & Audité</p>
                        <p className="text-xs text-slate-500">Toutes vos actions sur ce dossier sont enregistrées et consultables par le patient.</p>
                    </div>
                </div>
                <div className="hidden sm:block px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                    Audit ID: SESSION-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
            </div>
        </div>
    );
}
