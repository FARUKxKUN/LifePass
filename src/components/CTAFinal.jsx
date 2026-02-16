import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Stethoscope, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function CTAFinal() {
    return (
        <section className="py-40 bg-[#020617] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-emerald-500/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto space-y-16"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4"
                        >
                            <Zap className="w-3 h-3 fill-blue-400" /> Accès Anticipé Ouvert
                        </motion.div>
                        <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                            VOTRE SANTÉ <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                MÉRITE LE MEILLEUR.
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Rejoignez 15 000+ pionniers qui ont déjà sécurisé leur avenir médical. Simple, gratuit et vital.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Link
                            to="/signup"
                            className="group relative flex flex-col items-start p-10 bg-slate-900 border border-white/5 rounded-[3rem] text-left hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute top-6 right-6 p-2 bg-blue-600/10 rounded-full group-hover:bg-blue-600 transition-colors">
                                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-white" />
                            </div>
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-600/20 group-hover:scale-110 transition-transform duration-500">
                                <User className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Espace Patient</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Obtenez votre LifePass et sécurisez votre dossier santé gratuitement.</p>
                        </Link>

                        <Link
                            to="/signup"
                            className="group relative flex flex-col items-start p-10 bg-slate-900 border border-white/5 rounded-[3rem] text-left hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute top-6 right-6 p-2 bg-emerald-600/10 rounded-full group-hover:bg-emerald-600 transition-colors">
                                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:text-white" />
                            </div>
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Stethoscope className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tight text-emerald-400">Espace Médecin</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Accédez instantanément aux dossiers vitaux de vos patients.</p>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] pt-12">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-500" /> Chiffrement AES-256
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-500" /> Hébergement HDS
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-500" /> Conformité RGPD
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
