import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, Mail, Smartphone, CreditCard, Clock, Shield, Info, ArrowRight, Check, Activity as ActivityIcon, Share2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PatientQRCode() {
    const { user } = useAuth();
    const qrValue = user?.qrCode || 'LP-DEMO-2026';

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
            <div className="flex flex-col xl:flex-row gap-12">
                {/* COLONNE GAUCHE (Main QR Card) */}
                <div className="xl:flex-[0.6] space-y-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[4rem] shadow-2xl p-10 lg:p-20 flex flex-col items-center relative overflow-hidden"
                    >
                        {/* Ambient Background Glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

                        <div className="text-center mb-16 relative z-10">
                            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 font-mono">
                                <Shield className="w-3.5 h-3.5" /> ID Sécurisé Blockchain
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">Mon QR Code LifePass</h2>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/20 to-emerald-500/20 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative p-8 bg-white rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] border-4 border-white/10">
                                <QRCodeSVG
                                    value={qrValue}
                                    size={280}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-yellow-400 fill-yellow-400 animate-pulse" />
                        </div>

                        <div className="mt-16 w-full max-w-sm space-y-4">
                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-[1.5rem] border border-white/5">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Statut Patient</span>
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black tracking-widest uppercase border border-emerald-500/20 font-mono">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                                    Vérifié
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-[1.5rem] border border-white/5">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Clé d'Accès</span>
                                <span className="font-black text-white text-base tracking-widest font-mono">{qrValue}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-12">
                            <button className="flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black transition-all shadow-2xl shadow-blue-600/20 active:scale-95 text-sm uppercase tracking-widest">
                                <Download className="w-5 h-5" /> Télécharger
                            </button>
                            <button className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 hover:bg-white/10 text-white rounded-[1.5rem] font-black border border-white/10 transition-all active:scale-95 text-sm uppercase tracking-widest">
                                <Printer className="w-5 h-5" /> Imprimer
                            </button>
                            <button className="sm:col-span-2 flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-[1.5rem] font-black transition-all shadow-2xl shadow-emerald-500/20 active:scale-95 text-sm uppercase tracking-widest">
                                <Share2 className="w-5 h-5" /> Partager Accès Temporaire
                            </button>
                        </div>
                    </motion.div>

                    {/* Formats de poche */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-white flex items-center gap-4 tracking-tight">
                            <Smartphone className="w-8 h-8 text-blue-500" /> Formats Mobiles & Wallet
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] flex flex-col justify-between hover:border-white/10 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
                                <div className="space-y-6 relative z-10">
                                    <Smartphone className="w-14 h-14 text-slate-500 group-hover:text-blue-400 transition-colors" />
                                    <div>
                                        <p className="text-xl font-black text-white">Apple & Google Wallet</p>
                                        <p className="text-sm text-slate-500 font-bold mt-1 leading-relaxed">Installez votre pass santé directement sur votre téléphone.</p>
                                    </div>
                                </div>
                                <div className="mt-10 space-y-3 relative z-10">
                                    <button className="w-full h-14 bg-black rounded-2xl border border-white/10 flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                                        <span className="text-white text-sm font-black uppercase tracking-widest">Add to Apple Wallet</span>
                                    </button>
                                    <button className="w-full h-14 bg-black rounded-2xl border border-white/10 flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                                        <span className="text-white text-sm font-black uppercase tracking-widest">Add to Google Pay</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[3rem] text-white flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-2xl shadow-blue-900/20 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
                                <div className="space-y-6 relative z-10">
                                    <CreditCard className="w-14 h-14 text-white/50 group-hover:text-white transition-colors" />
                                    <div>
                                        <p className="text-xl font-black">Format Carte de Crédit</p>
                                        <p className="text-sm text-blue-100/70 font-bold mt-1">Imprimez une version physique pour votre portefeuille.</p>
                                    </div>
                                </div>
                                <div className="mt-10 relative z-10">
                                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-6">
                                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-2xl">
                                            <QrCodeIcon className="w-10 h-10" />
                                        </div>
                                    </div>
                                    <button className="w-full py-5 bg-white text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-50 active:scale-95 shadow-2xl">
                                        Générer PDF Impression
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLONNE DROITE (Instruction & Security) */}
                <div className="xl:flex-[0.4] space-y-10">
                    {/* How to use */}
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] flex items-center gap-4">
                            <Info className="w-4 h-4" /> Manuel Opérationnel
                        </h4>
                        <div className="space-y-8">
                            {[
                                { step: 1, title: "Présentation", text: "Présentez ce QR code au professionnel de santé agréé." },
                                { step: 2, title: "Scan de Sécurité", text: "Le médecin scanne le code via son interface LifePass Pro." },
                                { step: 3, title: "Validation Mobile", text: "Acceptez ou refusez la demande d'accès sur votre terminal." }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-blue-400 text-sm font-black flex items-center justify-center shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        {item.step}
                                    </div>
                                    <div>
                                        <p className="text-base font-black text-white">{item.title}</p>
                                        <p className="text-xs text-slate-500 font-bold opacity-80 mt-1 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                        <Shield className="absolute -bottom-12 -right-12 w-48 h-48 text-emerald-500/5 group-hover:scale-110 transition-transform duration-1000" />
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] flex items-center gap-4 mb-6">
                            <Shield className="w-4 h-4" /> Protocoles de Protection
                        </h4>
                        <ul className="space-y-4 relative z-10">
                            {[
                                "Chiffrement Militaire AES-256",
                                "Clés à rotation dynamique 24h",
                                "Journalisation Blockchain Immuable",
                                "Certifié HDS & Souveraineté RGPD"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-4 text-xs font-black text-emerald-100/50 group-hover:text-emerald-100 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Usage Statistics */}
                    <div className="bg-slate-900 border border-white/5 p-10 rounded-[3rem] text-white space-y-10 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
                        <div className="flex items-center justify-between relative z-10">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Sûreté & Flux</h4>
                            <ActivityIcon className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 pb-8 border-b border-white/5 relative z-10">
                            <div>
                                <p className="text-4xl font-black tracking-tight tracking-tighter">24</p>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Total Scans</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-emerald-400 tracking-tighter">5</p>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Validés</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between group cursor-pointer relative z-10">
                            <div className="space-y-2">
                                <p className="text-sm font-black text-slate-400 group-hover:text-blue-400 transition-colors uppercase tracking-widest leading-none">Dernier Scan</p>
                                <p className="text-xs text-white font-black leading-none">Dr. Sophie Martin</p>
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Il y a 2 jours • 14:37</p>
                            </div>
                            <Link to="/patient/access-logs" className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-600 transition-all border border-white/10 group-hover:border-blue-600">
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QrCodeIcon({ className }) { return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>; }
