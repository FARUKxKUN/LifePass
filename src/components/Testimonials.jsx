import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
    return (
        <section className="py-32 bg-[#020617] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-12 lg:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-700"
                >
                    {/* Decorative quotes */}
                    <div className="absolute top-10 left-10 text-blue-600/10 pointer-events-none">
                        <Quote className="w-32 h-32 rotate-180" />
                    </div>

                    <div className="relative z-10 text-center space-y-10">
                        <div className="flex justify-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
                            ))}
                        </div>

                        <blockquote className="text-3xl lg:text-5xl font-black text-white leading-tight italic tracking-tight">
                            "LifePass m'a sauvé la vie. Accident à l'étranger, les médecins ont vu mon allergie à la pénicilline en 3 secondes. Sans ça, je ne serais plus là."
                        </blockquote>

                        <div className="flex flex-col items-center gap-6 pt-6">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-full blur-lg opacity-50" />
                                <div className="relative w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-4xl shadow-xl border-2 border-white/10">
                                    👩
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-white tracking-tight">Sophie M.</p>
                                <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Utilisatrice Beta • Paris, FR</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
