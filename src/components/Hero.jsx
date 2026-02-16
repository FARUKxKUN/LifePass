import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Stethoscope, Shield, CheckCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#020617]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-150 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Plateforme Médicale Nouvelle Génération
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter"
                            >
                                VOTRE SANTÉ <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-emerald-400">
                                    DANS VOTRE POCHE.
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-xl text-slate-300 max-w-xl leading-relaxed font-medium"
                            >
                                Accédez à votre dossier médical universel en un scan.
                                Sécurisé, instantané, et vital en cas d'urgence.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link
                                to="/login"
                                className="group relative px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-blue-600/20 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <User className="w-6 h-6" />
                                Espace Patient
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="px-10 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <Stethoscope className="w-6 h-6 text-emerald-400" />
                                Espace Médecin
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-80"
                        >
                            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4 text-emerald-500" /> Chiffré AES-256
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4 text-emerald-500" /> Certifié HDS
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4 text-emerald-500" /> RGPD Compliant
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Visual Container */}
                    <div className="flex-1 relative w-full max-w-[600px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="relative"
                        >
                            {/* Card Mockup */}
                            <div className="relative z-10 p-1 bg-gradient-to-br from-blue-500/20 via-white/5 to-emerald-500/20 rounded-[3rem] backdrop-blur-3xl border border-white/10 overflow-hidden shadow-2xl">
                                <div className="bg-[#0f172a]/80 rounded-[2.8rem] overflow-hidden">
                                    {/* Hero Image Section */}
                                    <div className="relative aspect-[4/5] sm:aspect-square group overflow-hidden">
                                        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors duration-700" />

                                        {/* Dynamic visualization placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-4/5 h-4/5 border-2 border-dashed border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                                            <div className="absolute w-3/5 h-3/5 border-2 border-dashed border-emerald-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                                            <div className="relative z-20 flex flex-col items-center gap-6">
                                                <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-white/10 overflow-hidden">
                                                    <img src="/logo.png" alt="LifePass Logo" className="w-28 h-28 object-contain" />
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <div className="h-2 w-24 bg-blue-500/20 rounded-full overflow-hidden mx-auto">
                                                        <motion.div
                                                            animate={{ x: ['-100%', '100%'] }}
                                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                            className="w-full h-full bg-blue-500"
                                                        />
                                                    </div>
                                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Identity Verified</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating UI Elements */}
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 4 }}
                                            className="absolute top-10 right-10 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                                                <div className="h-1.5 w-8 bg-white/10 rounded-full" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Decorative Orbs */}
                            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
                            <div className="absolute -z-10 -bottom-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-300 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
            </motion.div>
        </section>
    );
}
