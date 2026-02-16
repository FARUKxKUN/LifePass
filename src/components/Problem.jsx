import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingDown, ShieldAlert } from 'lucide-react';

export default function Problem() {
    return (
        <section id="probleme" className="py-32 bg-[#020617] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            L'INÉFFICACITÉ <br />
                            <span className="text-red-500/80">VOUS MET EN DANGER.</span>
                        </h2>
                        <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                            Le système actuel repose sur des papiers perdus et des données fragmentées.
                            Chaque seconde compte en situation d'urgence.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: Clock,
                            value: '22 min',
                            label: 'perdues en moyenne par patient à l\'accueil des urgences.',
                            color: 'text-orange-400',
                            border: 'border-orange-500/20',
                            bg: 'bg-orange-500/5'
                        },
                        {
                            icon: TrendingDown,
                            value: '2.5 Md€',
                            label: 'gaspillés chaque année en examens et analyses redondants.',
                            color: 'text-red-400',
                            border: 'border-red-500/20',
                            bg: 'bg-red-500/5'
                        },
                        {
                            icon: AlertTriangle,
                            value: '30%',
                            label: 'des erreurs médicales sont dues à un manque d\'historique patient.',
                            color: 'text-amber-400',
                            border: 'border-amber-500/20',
                            bg: 'bg-amber-500/5'
                        },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`${stat.bg} ${stat.border} p-10 rounded-[3rem] border backdrop-blur-sm group hover:-translate-y-2 transition-all duration-500`}
                        >
                            <div className={`w-16 h-16 rounded-[1.5rem] ${stat.bg} ${stat.border} border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <p className={`text-5xl font-black ${stat.color} mb-4 tracking-tighter`}>{stat.value}</p>
                            <p className="text-slate-300 font-bold leading-relaxed">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-1 bg-gradient-to-r from-red-500/20 via-red-500/50 to-red-500/20 rounded-[2.5rem] overflow-hidden"
                >
                    <div className="bg-slate-950/90 rounded-[2.4rem] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="p-5 bg-red-500/10 rounded-3xl border border-red-500/20">
                            <ShieldAlert className="w-12 h-12 text-red-500" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-3xl font-black text-white tracking-tight">C'est une question de vie ou de mort.</p>
                            <p className="text-red-400 font-bold uppercase tracking-[0.2em] text-sm italic">
                                150 000 décès évitables par an en Europe dus au manque d'information médicale.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <a href="#solution" className="inline-block w-full md:w-auto px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest text-xs">
                                Découvrir la solution
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
