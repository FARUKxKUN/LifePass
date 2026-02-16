import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, List, Calendar, Eye, Download, X, FileText, Activity as ActivityIcon, Microscope, Pill, Shield, Printer, Mail, ChevronRight, ChevronLeft, Database, FileUp } from 'lucide-react';
import { MEDICAL_REPORTS } from '../../data/mockData';

export default function PatientMedicalRecords() {
    const [view, setView] = useState('list'); // 'list' | 'timeline'
    const [search, setSearch] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [filterType, setFilterType] = useState('all');

    const filteredReports = MEDICAL_REPORTS.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
            report.doctorName.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'all' || report.type.toLowerCase() === filterType.toLowerCase();
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-12 pb-24">
            {/* Header avec filtres */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 lg:p-12 space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10">
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tighter leading-none">Archives Médicales</h2>
                        <p className="text-sm text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Database className="w-4 h-4 text-blue-500" /> Stockage Chiffré AES-256
                        </p>
                    </div>
                    <div className="flex bg-white/5 rounded-2xl p-1.5 border border-white/5 backdrop-blur-md">
                        <button
                            onClick={() => setView('list')}
                            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'list' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            <List className="w-4 h-4" /> Liste
                        </button>
                        <button
                            onClick={() => setView('timeline')}
                            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'timeline' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            <Calendar className="w-4 h-4" /> Chronologie
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                    <div className="md:col-span-12 lg:col-span-6 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Rechercher un rapport, un praticien ou un diagnostic..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500/30 transition-all font-medium"
                        />
                    </div>
                    <div className="md:col-span-6 lg:col-span-3">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer font-black uppercase tracking-widest"
                        >
                            <option value="all" className="bg-slate-900">Tout Types</option>
                            <option value="radiologie" className="bg-slate-900">Radiologie</option>
                            <option value="analyses" className="bg-slate-900">Analyses</option>
                            <option value="consultation" className="bg-slate-900">Consultation</option>
                            <option value="ordonnance" className="bg-slate-900">Ordonnance</option>
                        </select>
                    </div>
                    <button className="md:col-span-6 lg:col-span-3 flex items-center justify-center gap-4 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-[0.98]">
                        <FileUp className="w-5 h-5 text-emerald-400" /> Ajouter un Document
                    </button>
                </div>
            </div>

            {/* Main Content View */}
            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div
                        key="list" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[900px]">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/5">
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Date</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Secteur</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Désignation</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Praticien & Origine</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredReports.map((report) => (
                                        <tr key={report.id} className="group hover:bg-white/5 transition-all">
                                            <td className="px-10 py-10">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-black text-white">{new Date(report.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest font-mono">{new Date(report.date).getFullYear()}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                        {report.typeIcon}
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{report.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <p className="text-lg font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{report.title}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Signé & Certifié</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10">
                                                <p className="text-base font-black text-white">{report.doctorName}</p>
                                                <p className="text-xs text-slate-500 font-bold mt-1 opacity-80 uppercase tracking-tight">{report.doctorSpecialty} • {report.establishment}</p>
                                            </td>
                                            <td className="px-10 py-10 text-right">
                                                <div className="flex items-center justify-end gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setSelectedDoc(report)} className="p-4 bg-blue-600/10 text-blue-400 rounded-2xl hover:bg-blue-600 hover:text-white border border-blue-600/20 transition-all shadow-xl shadow-blue-600/10">
                                                        <Eye className="w-6 h-6" />
                                                    </button>
                                                    <button className="p-4 bg-white/5 text-slate-400 rounded-2xl hover:bg-white/10 hover:text-white border border-white/10 transition-all">
                                                        <Download className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredReports.length === 0 && (
                            <div className="p-24 text-center space-y-4">
                                <Search className="w-16 h-16 text-slate-700 mx-auto" />
                                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Aucune donnée ne correspond à votre filtre</p>
                            </div>
                        )}

                        <div className="px-10 py-8 border-t border-white/5 flex items-center justify-between bg-white/5">
                            <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Indexé : 1-{filteredReports.length} • Vol : 2.4 MB</p>
                            <div className="flex items-center gap-3">
                                <button className="p-3 text-slate-600 hover:text-white disabled:opacity-30 border border-white/5 rounded-xl" disabled><ChevronLeft className="w-5 h-5" /></button>
                                <button className="w-10 h-10 rounded-xl bg-blue-600 text-white text-sm font-black shadow-xl shadow-blue-600/20">1</button>
                                <button className="p-3 text-slate-600 hover:text-white disabled:opacity-30 border border-white/5 rounded-xl" disabled><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="timeline" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                        className="space-y-12 pl-6 lg:pl-12"
                    >
                        <div className="relative space-y-16 py-8 before:absolute before:left-[-2px] before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-600 before:via-emerald-500 before:to-slate-800 before:rounded-full">
                            {['2026', '2025'].map(year => (
                                <div key={year} className="space-y-10">
                                    <div className="relative">
                                        <div className="absolute left-[-2px] -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-slate-950 shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                                        <h3 className="pl-10 text-3xl font-black text-white tracking-[0.2em]">{year}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-10">
                                        {filteredReports
                                            .filter(r => r.date.startsWith(year))
                                            .map(report => (
                                                <div key={report.id} className="relative group">
                                                    <div className="absolute left-[-52px] top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white/10 group-hover:bg-blue-600 transition-colors" />
                                                    <div
                                                        onClick={() => setSelectedDoc(report)}
                                                        className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between hover:bg-slate-900/80 hover:border-blue-500/30 transition-all cursor-pointer shadow-xl relative overflow-hidden"
                                                    >
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
                                                        <div className="flex items-center gap-6 relative z-10">
                                                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                                                {report.typeIcon}
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mb-2">{new Date(report.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}</p>
                                                                <p className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{report.title}</p>
                                                                <p className="text-xs text-slate-500 font-bold mt-2 opacity-80 uppercase tracking-tighter">{report.doctorName} • {report.doctorSpecialty}</p>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL : Détails d'un Document */}
            <AnimatePresence>
                {selectedDoc && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDoc(null)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 40 }}
                            className="relative w-full max-w-6xl bg-slate-900 border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600" />

                            {/* Modal Header */}
                            <div className="p-8 lg:p-12 border-b border-white/5 flex items-center justify-between bg-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center text-4xl shadow-2xl shadow-blue-600/30">
                                        {selectedDoc.typeIcon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] mb-3">Rapport Certifié Blockchain</p>
                                        <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter leading-none">{selectedDoc.title}</h3>
                                        <div className="flex items-center gap-4 mt-4">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{selectedDoc.type}</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">{new Date(selectedDoc.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedDoc(null)} className="p-4 text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5 relative z-10">
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-8 lg:p-14 space-y-12">
                                {/* Preview Placeholder */}
                                <div className="aspect-video w-full bg-slate-950 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-slate-800 gap-6 group cursor-pointer hover:bg-slate-800/20 transition-all shadow-inner">
                                    <FileText className="w-24 h-24 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700" />
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-2">Chargement de l'aperçu HD</p>
                                        <p className="text-xs text-slate-700 font-bold">Sécurisé par LifePass Crypto-Engine</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
                                    {/* Info Sidebar */}
                                    <div className="md:col-span-4 space-y-10">
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mb-6 px-1 flex items-center gap-3">
                                                <ActivityIcon className="w-4 h-4 text-blue-500" /> Méta-données
                                            </p>
                                            <div className="bg-white/5 rounded-[2.5rem] p-8 space-y-8 border border-white/5">
                                                <div>
                                                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2 font-mono">Expert Médical</p>
                                                    <p className="text-lg font-black text-white">{selectedDoc.doctorName}</p>
                                                    <p className="text-xs text-blue-400 font-bold">{selectedDoc.doctorSpecialty}</p>
                                                </div>
                                                <div className="pt-8 border-t border-white/5">
                                                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2 font-mono">Structure Émettrice</p>
                                                    <p className="text-base font-black text-white leading-tight">{selectedDoc.establishment}</p>
                                                </div>
                                                <div className="pt-8 border-t border-white/5">
                                                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2 font-mono">ID Document</p>
                                                    <p className="text-[10px] text-white font-black font-mono break-all opacity-40 uppercase tracking-tighter">LP-TX-8829-MR-2026-V1</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] p-8 group overflow-hidden relative">
                                            <Shield className="absolute -bottom-10 -right-10 w-32 h-32 text-emerald-500/5 group-hover:scale-110 transition-transform duration-1000" />
                                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                                <Shield className="w-5 h-5 text-emerald-400" />
                                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Certificat Intégrité</span>
                                            </div>
                                            <p className="text-[10px] text-emerald-500/60 font-bold leading-relaxed relative z-10">Ce document est scellé cryptographiquement. Toute altération invalidera le certificat blockchain attaché.</p>
                                        </div>
                                    </div>

                                    {/* Results Content */}
                                    <div className="md:col-span-8 space-y-12">
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mb-6 border-b border-white/5 pb-4">Analyse Détaillée & Observations</p>
                                            <p className="text-slate-300 leading-relaxed whitespace-pre-line text-lg font-medium opacity-90 first-letter:text-4xl first-letter:font-black first-letter:text-blue-500 first-letter:mr-3 first-letter:float-left">
                                                {selectedDoc.content}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mb-6 border-b border-white/5 pb-4">Directives & Synthèse</p>
                                            <div className="bg-blue-600/5 border-l-4 border-blue-600 p-10 lg:p-14 rounded-r-[3rem] shadow-2xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
                                                <p className="text-blue-100/90 font-black italic text-xl sm:text-2xl leading-relaxed relative z-10 group-hover:text-white transition-colors">
                                                    "{selectedDoc.conclusion}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="p-8 lg:p-12 border-t border-white/5 bg-white/5 flex flex-col sm:flex-row gap-6 justify-between items-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
                                <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
                                        <Download className="w-5 h-5 font-bold" /> Dossier PDF Complet
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none p-5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/10 transition-all flex justify-center"><Printer className="w-6 h-6" /></button>
                                    <button className="flex-1 sm:flex-none p-5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/10 transition-all flex justify-center"><Mail className="w-6 h-6" /></button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

