import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Shield, Smartphone, ArrowLeft, Check, Camera, Image as ImageIcon, Key, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEMO_PATIENTS } from '../../data/mockData';

export default function DoctorScanQR() {
    const [step, setStep] = useState(1); // 1: scan, 2: identity, 3: approval
    const [pin, setPin] = useState('');
    const [certified, setCertified] = useState(false);
    const [scanning, setScanning] = useState(false);
    const navigate = useNavigate();

    const handleScan = () => {
        setScanning(true);
        // Simulate scan detection
        setTimeout(() => {
            setScanning(false);
            setStep(2);
        }, 2000);
    };

    const handleValidateIdentity = () => {
        if (pin.length < 4 || !certified) return;
        setStep(3);
        // Simulate patient approval
        setTimeout(() => {
            navigate('/doctor/patient/pat-001');
        }, 3000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
            </button>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-blue-600/10 p-6 border-b border-white/10 text-center">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest">Scanner le QR Code Patient</h2>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                {/* Camera View mockup */}
                                <div className="relative aspect-square max-w-sm mx-auto bg-slate-900 rounded-3xl border-4 border-white/10 overflow-hidden flex flex-col items-center justify-center group">
                                    {scanning ? (
                                        <>
                                            <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                                            <div className="absolute top-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan" />
                                            <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                                            <p className="mt-4 text-xs font-bold text-blue-400 uppercase tracking-widest">Analyse en cours...</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-blue-500/40 rounded-2xl group-hover:border-blue-400 transition-all" />
                                            <Camera className="w-16 h-16 text-slate-700 group-hover:text-slate-600" />
                                            <button onClick={handleScan} className="absolute bottom-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 transition-all">
                                                Démarrer la caméra
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="text-center space-y-2">
                                    <p className="text-sm font-medium text-slate-300">Positionnez le QR code dans le cadre</p>
                                    <p className="text-xs text-slate-500 max-w-xs mx-auto italic">Si vous consultez un patient à distance, demandez-lui de partager son écran ou d'envoyer son ID temporaire.</p>
                                </div>

                                <div className="flex items-center gap-3 my-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">OU</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>

                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                                    <ImageIcon className="w-4 h-4" /> Importer une image
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">QR Code Identifié</h3>
                                    <div className="mt-4 p-4 bg-white/5 border border-white/5 rounded-2xl inline-block text-left">
                                        <p className="text-sm font-bold text-white">Jean Dupont, 45 ans</p>
                                        <p className="text-xs text-slate-400 font-mono mt-0.5">ID: LP-2026-JD-7849</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-500 font-bold uppercase tracking-widest px-1 flex items-center gap-2">
                                            <Key className="w-3 h-3 text-blue-400" /> Votre code secret CPS
                                        </label>
                                        <input
                                            type="password"
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value)}
                                            placeholder="••••"
                                            maxLength={4}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xl text-center font-mono tracking-[1em] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        />
                                        <p className="text-[10px] text-center text-slate-500 mt-1">Nécessaire pour signer numériquement l'accès au dossier.</p>
                                    </div>

                                    <label className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={certified}
                                            onChange={(e) => setCertified(e.target.checked)}
                                            className="mt-1 rounded border-white/20 bg-white/5 text-blue-500"
                                        />
                                        <span className="text-xs text-slate-300 leading-relaxed font-medium transition-colors">
                                            Je certifie être actuellement en consultation avec ce patient et avoir obtenu son consentement oral pour consulter ses données médicales.
                                        </span>
                                    </label>

                                    <button
                                        onClick={handleValidateIdentity}
                                        disabled={pin.length < 4 || !certified}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm uppercase tracking-widest"
                                    >
                                        Valider l'Accès & Ouvrir Dossier
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 space-y-8 text-center">
                                <div className="relative w-24 h-24 mx-auto">
                                    <Loader2 className="w-full h-full text-blue-500 animate-spin absolute inset-0" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Smartphone className="w-8 h-8 text-white opacity-50" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-white">Demande d'accès envoyée</h3>
                                    <p className="text-slate-400 max-w-sm mx-auto">Le patient ("Jean Dupont") a reçu une notification sur son smartphone pour valider votre accès.</p>
                                </div>
                                <div className="bg-blue-600/5 border border-blue-500/10 p-4 rounded-xl max-w-xs mx-auto">
                                    <div className="flex items-center gap-2 justify-center text-blue-400 text-xs font-bold mb-1">
                                        <AlertCircle className="w-4 h-4" /> ATTENTE DE SON APPROBATION
                                    </div>
                                    <p className="text-[10px] text-slate-500 italic">Cette étape peut prendre 10 à 30 secondes selon sa connexion...</p>
                                </div>
                                <div className="pt-4 flex items-center justify-center gap-5">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-100" />
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-200" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-900 border border-white/5 rounded-2xl">
                <Shield className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Sécurité de l'Accès</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Conformément au Code de la Santé Publique, tout accès au Dossier Médical Partagé via LifePass fait l'objet d'une traçabilité rigoureuse.
                        Votre signature numérique (PIN CPS) garantit votre identité professionnelle.
                    </p>
                </div>
            </div>

            {/* Animation classes in Tailwind.config (done) but used here */}
            <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
        </div>
    );
}
