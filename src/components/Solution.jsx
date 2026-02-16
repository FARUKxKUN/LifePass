import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { QrCode, Shield, UserCheck, Brain, ArrowRight, Zap, Database, Lock } from 'lucide-react';

export default function Solution() {
    const solutionPillars = [
        {
            icon: QrCode,
            title: 'QR Code Universel',
            desc: 'Un identifiant unique pour agréger tout votre historique médical en un scan instantané.',
            color: 'text-blue-400',
            glow: 'group-hover:shadow-blue-500/20'
        },
        {
            icon: Shield,
            title: 'Sécurité Blockchain',
            desc: 'Vos données sont chiffrées de bout en bout et immuables sur une architecture souveraine.',
            color: 'text-emerald-400',
            glow: 'group-hover:shadow-emerald-500/20'
        },
        {
            icon: UserCheck,
            title: 'Souveraineté Totale',
            desc: 'Vous êtes le seul maître de vos données. Révoquez ou autorisez les accès en un clic.',
            color: 'text-purple-400',
            glow: 'group-hover:shadow-purple-500/20'
        },
        {
            icon: Brain,
            title: 'IA Médicale',
            desc: 'Notre IA trie et synthétise vos rapports complexes pour une lecture rapide par les médecins.',
            color: 'text-orange-400',
            glow: 'group-hover:shadow-orange-500/20'
        },
    ];

    return (
        <section id="solution" className="py-32 bg-[#020617] relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            UNE SOLUTION <br />
                            <span className="text-blue-500">SANS COMPROMIS.</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mt-8">
                            LifePass réunit le meilleur de la technologie pour protéger votre bien le plus précieux : votre santé.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {solutionPillars.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-white/0 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                            <div className={`relative h-full bg-slate-900/50 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-slate-900/80 group-hover:border-white/10 ${item.glow}`}>
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-300 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-12 text-slate-300"
                    >
                        <div className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px]">
                            <Database className="w-4 h-4" /> Cloud Souverain
                        </div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px]">
                            <Lock className="w-4 h-4" /> Zero Knowledge
                        </div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px]">
                            <Zap className="w-4 h-4" /> Scan Instantané
                        </div>
                    </motion.div>

                    <Link
                        to="/signup"
                        className="group relative px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-xl transition-all flex items-center gap-4 overflow-hidden shadow-2xl shadow-blue-600/20 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        Commencer l'aventure
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
