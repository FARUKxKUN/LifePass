import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, ScanLine, FileText, Cpu } from 'lucide-react';

const steps = [
    {
        num: 1,
        icon: Smartphone,
        title: 'Patient Génère son QR',
        desc: 'Unique, sécurisé, sur smartphone ou bracelet NFC',
    },
    {
        num: 2,
        icon: ScanLine,
        title: 'Médecin Scanne le Code',
        desc: 'Authentification CPS automatique, accès en 3 secondes',
    },
    {
        num: 3,
        icon: FileText,
        title: 'Consultation des Informations',
        desc: 'Infos vitales immédiatement, même hors ligne. Historique selon autorisation.',
    },
    {
        num: 4,
        icon: Cpu,
        title: 'Rapport Médical Ajouté',
        desc: 'IA agrège automatiquement dans le dossier. Patient notifié de l\'accès.',
    },
];

function StepItem({ step, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const Icon = step.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex gap-6 items-start"
        >
            {/* Timeline */}
            <div className="flex flex-col items-center shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {step.num}
                </div>
                {index < steps.length - 1 && (
                    <div className="w-0.5 h-20 bg-primary/20 mt-2" />
                )}
            </div>

            {/* Content */}
            <div className="pb-12">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-dark">{step.title}</h3>
                    <Icon className="text-secondary" size={24} />
                </div>
                <p className="text-dark/60">{step.desc}</p>
            </div>
        </motion.div>
    );
}

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Comment ça Marche ?
                    </h2>
                    <p className="text-dark/60 text-lg">4 étapes pour révolutionner votre santé</p>
                </div>

                <div>
                    {steps.map((s, i) => (
                        <StepItem key={i} step={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
