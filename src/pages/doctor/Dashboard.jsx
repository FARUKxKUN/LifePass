import { motion } from 'framer-motion';
import { ScanLine, FilePlus, Users, Activity as ActivityIcon, Bell, Clock, ArrowRight, Shield, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DoctorDashboard() {
    const { user } = useAuth();

    return (
        <div className="space-y-12 pb-20">
            {/* Header Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Patients consultés', value: user?.patientsConsulted || 45, sub: 'Ce mois-ci', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Rapports créés', value: user?.reportsCreated || 12, sub: 'Cette semaine', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: "Demandes d'accès", value: 3, sub: 'En attente', color: 'text-orange-600', bg: 'bg-orange-50' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                    >
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-slate-500 font-bold mt-4 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${stat.color === 'text-blue-600' ? 'bg-blue-500' : stat.color === 'text-emerald-600' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                            {stat.sub}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <section className="space-y-6">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Actions Prioritaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/doctor/scan-qr" className="group bg-blue-600 hover:bg-blue-700 p-8 rounded-[2.5rem] flex flex-col gap-6 transition-all shadow-2xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
                            <ScanLine className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white leading-tight">Scanner QR Code</p>
                            <p className="text-sm text-blue-100 font-bold mt-2 opacity-80 italic">Identification instantanée</p>
                        </div>
                    </Link>

                    <Link to="/doctor/add-report" className="group bg-white border border-slate-200 hover:border-emerald-500/50 p-8 rounded-[2.5rem] flex flex-col gap-6 transition-all shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] active:scale-95">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <FilePlus className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 leading-tight">Créer Rapport</p>
                            <p className="text-sm text-slate-500 font-bold mt-2 italic">Ajout sécurisé au dossier</p>
                        </div>
                    </Link>

                    <Link to="/doctor/patients" className="group bg-slate-900 p-8 rounded-[2.5rem] flex flex-col gap-6 transition-all shadow-xl hover:scale-[1.02] active:scale-95">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-purple-400 group-hover:text-white transition-all">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white leading-tight">Patientèle</p>
                            <p className="text-sm text-slate-500 font-bold mt-2 italic">Gérer vos dossiers suivis</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Recent Activity / Patients */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                <section className="space-y-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                            <Clock3 className="w-7 h-7 text-blue-600" /> Activité Récente
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Jean Dupont', action: 'Consultation Cardiologie', time: 'Il y a 2h', color: 'bg-blue-500' },
                            { name: 'Marie Leroux', action: 'Dossier mis à jour', time: 'Il y a 5h', color: 'bg-emerald-500' },
                            { name: 'Pierre Simon', action: 'Accès QR Validé', time: 'Hier, 16:40', color: 'bg-slate-400' },
                        ].map((activity, i) => (
                            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between group hover:shadow-lg hover:border-blue-500/20 transition-all cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className={`w-2 h-12 rounded-full ${activity.color}`} />
                                    <div>
                                        <p className="text-lg font-black text-slate-900">{activity.name}</p>
                                        <p className="text-sm text-slate-500 font-bold opacity-70">{activity.action}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">{activity.time}</span>
                            </div>
                        ))}
                        <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-400 text-[10px] font-black rounded-xl uppercase tracking-[0.3em] transition-all border border-slate-200">
                            Tout l'historique
                        </button>
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                            <Bell className="w-7 h-7 text-orange-500" /> Notifications
                        </h2>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] divide-y divide-slate-100 shadow-sm overflow-hidden">
                        {[
                            { name: 'Lucie Bernard', status: 'En attente', desc: 'Demande QR envoyée' },
                            { name: 'Marc Vasseur', status: 'Approuvé', desc: 'Accès patient actif' },
                        ].map((req, i) => (
                            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                                <div>
                                    <p className="text-lg font-black text-slate-900">{req.name}</p>
                                    <p className="text-sm text-slate-500 font-medium italic">{req.desc}</p>
                                </div>
                                <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${req.status === 'Approuvé' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {req.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-600/20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Shield className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 flex items-start gap-5">
                            <Shield className="w-8 h-8 text-blue-200 flex-shrink-0" />
                            <div className="space-y-3">
                                <p className="text-xl font-black">Certifié HDS & CPS</p>
                                <p className="text-sm text-blue-100 font-medium leading-relaxed opacity-90">Votre session est sécurisée par le protocole LifePass. Tous vos actes sont tracés et horodatés conformément à la réglementation française.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
