import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, FileText, Upload, Check, ChevronRight, Search, Stethoscope, Microscope, Pill, Activity as ActivityIcon, Shield, Key, Loader2 } from 'lucide-react';
import { DEMO_PATIENTS } from '../../data/mockData';

const reportTypes = [
    { id: 'Consultation', icon: Stethoscope, color: 'bg-blue-500' },
    { id: 'Radiologie', icon: ActivityIcon, color: 'bg-indigo-500' },
    { id: 'Biologie', icon: Microscope, color: 'bg-emerald-500' },
    { id: 'Ordonnance', icon: Pill, color: 'bg-purple-500' },
    { id: 'Hospitalisation', icon: FileText, color: 'bg-red-500' },
];

export default function DoctorAddReport() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        patientId: 'pat-001',
        type: 'Consultation',
        title: '',
        content: '',
        conclusion: '',
        files: [],
        pin: ''
    });
    const navigate = useNavigate();

    const selectedPatient = DEMO_PATIENTS.find(p => p.id === formData.patientId) || DEMO_PATIENTS[0];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/doctor/dashboard');
        }, 2000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
            {/* Header & Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2.5 bg-white/5 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Nouveau Rapport Médical</h2>
                        <p className="text-slate-500 text-sm">Étape {step} sur 3</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`h-1.5 w-10 rounded-full transition-all ${s <= step ? 'bg-blue-600' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">1. Sélectionner le patient</label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        defaultValue={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        readOnly
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">SCAN ACTIF</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-xl">{selectedPatient.avatar}</div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{selectedPatient.firstName} {selectedPatient.lastName}</p>
                                        <p className="text-xs text-slate-400">ID: {selectedPatient.qrCode} • Né(e) le {selectedPatient.birthDate}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">2. Nature de l'examen</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {reportTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setFormData({ ...formData, type: type.id })}
                                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${formData.type === type.id ? 'bg-blue-600/10 border-blue-500/50 text-white shadow-lg shadow-blue-500/5' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${formData.type === type.id ? type.color : 'bg-white/5'} transition-all`}>
                                                <type.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-tighter">{type.id}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button onClick={handleNext} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25">
                                    Continuer <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">Titre du rapport</label>
                                <input
                                    type="text"
                                    placeholder="ex: Échographie cardiaque de contrôle"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">Observations détaillées</label>
                                <textarea
                                    rows={6}
                                    placeholder="Décrivez ici le contenu de l'examen..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">Conclusion</label>
                                <textarea
                                    rows={2}
                                    placeholder="Résumé ou conclusion pour l'IA et le patient..."
                                    value={formData.conclusion}
                                    onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none italic"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button onClick={handleBack} className="py-4 bg-white/5 hover:bg-white/10 text-slate-400 font-bold rounded-2xl transition-all">Retour</button>
                                <button onClick={handleNext} disabled={!formData.title || !formData.content} className="py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/25">Continuer</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">3. Pièces jointes (PDF, Images)</label>
                                <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-pointer group">
                                    <div className="p-4 bg-blue-600/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-white">Glissez-déposez vos documents</p>
                                        <p className="text-xs text-slate-500 mt-1">Ou cliquez pour parcourir vos fichiers</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1">Certification & Signature</label>
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
                                    <div className="flex items-center gap-3 text-emerald-400 border-b border-white/5 pb-4">
                                        <Check className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Contenu validé par LifePass IA</span>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] px-1">Code PIN CPS (Signature Numérique)</label>
                                        <input
                                            type="password"
                                            maxLength={4}
                                            placeholder="••••"
                                            value={formData.pin}
                                            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-mono tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button onClick={handleBack} className="py-4 bg-white/5 hover:bg-white/10 text-slate-400 font-bold rounded-2xl transition-all">Retour</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={formData.pin.length < 4 || loading}
                                    className="py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Shield className="w-5 h-5" /> Signer & Publier</>}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-400 shrink-0" />
                <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Stockage Sécurisé HDS</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        En publiant ce rapport, les données seront immédiatement chiffrées et stockées sur nos serveurs certifiés Hébergeur de Données de Santé (HDS).
                        Le patient sera notifié instantanément de l'ajout d'un nouveau document à son dossier.
                    </p>
                </div>
            </div>
        </div>
    );
}
