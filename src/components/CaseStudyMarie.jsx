import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check } from 'lucide-react';

const beforeItems = [
    'Inconsciente, pas de famille joignable',
    'Médecin ne sait pas : allergie pénicilline',
    'Administration antibiotique → Choc anaphylactique',
    'Complications graves',
    '3 semaines d\'hospitalisation',
];

const afterItems = [
    'Scan bracelet LifePass : 3 secondes',
    'Alerte immédiate : ALLERGIE PÉNICILLINE',
    'Médecin choisit antibiotique alternatif',
    'VIE SAUVÉE',
    'Sortie en 48h',
];

export default function CaseStudyMarie() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Cas Réel : Marie, 28 ans — Accident de Voiture
                    </h2>
                    <div className="h-1 w-16 bg-accent mx-auto" />
                </div>

                <div ref={ref} className="grid md:grid-cols-2 gap-8">
                    {/* BEFORE */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="bg-red-50 rounded-2xl p-8 border border-red-100"
                    >
                        <span className="inline-block bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                            ❌ AVANT LifePass
                        </span>
                        <ul className="space-y-4 mb-8">
                            {beforeItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <X className="text-accent shrink-0 mt-0.5" size={20} />
                                    <span className="text-dark/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                            <p className="font-bold text-accent text-lg">💸 Coût : 45 000€</p>
                            <p className="font-bold text-accent">☠️ Issue : Presque fatale</p>
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
                            <p className="font-bold text-success text-lg">💚 Coût : 2 000€</p>
                            <p className="font-bold text-success">🎉 Gain : 1 VIE + 43 000€ économisés</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
