import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check } from 'lucide-react';

const beforeItems = [
    'Se perd dans une ville inconnue',
    'Police ne peut pas l\'identifier',
    '48h en cellule de dégrisement',
    'Désorientation et stress extrême',
    'Hospitalisation psychiatrique 1 semaine',
];

const afterItems = [
    'Police scanne le bracelet',
    'Identité + pathologie + contact en 5 sec',
    'Famille alertée, arrive en 1h',
    'Retour à domicile sain et sauf',
    'Zéro traumatisme',
];

export default function CaseStudyJacques() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-24 bg-light">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Cas Réel : Jacques, 75 ans — Alzheimer Avancé
                    </h2>
                    <div className="h-1 w-16 bg-accent mx-auto" />
                </div>

                <div ref={ref} className="grid md:grid-cols-2 gap-8">
                    {/* BEFORE */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="bg-orange-50 rounded-2xl p-8 border border-orange-100"
                    >
                        <span className="inline-block bg-warning text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                            ❌ AVANT LifePass
                        </span>
                        <ul className="space-y-4 mb-8">
                            {beforeItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <X className="text-warning shrink-0 mt-0.5" size={20} />
                                    <span className="text-dark/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-warning/10 rounded-xl p-4 border border-warning/20">
                            <p className="font-bold text-warning text-lg">💔 Dignité brisée</p>
                            <p className="font-bold text-warning">💸 Coût : 8 000€</p>
                        </div>
                    </motion.div>

                    {/* AFTER */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-green-50 rounded-2xl p-8 border border-green-100"
                    >
                        <span className="inline-block bg-success text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                            ✓ AVEC LifePass
                        </span>
                        <ul className="space-y-4 mb-8">
                            {afterItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="text-success shrink-0 mt-0.5" size={20} />
                                    <span className="text-dark/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-success/10 rounded-xl p-4 border border-success/20">
                            <p className="font-bold text-success text-lg">💚 Dignité préservée</p>
                            <p className="font-bold text-success">🎉 Économie : 8 000€</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
