import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Building2, TrendingUp, Globe } from 'lucide-react';

const phases = [
    {
        icon: Rocket,
        title: 'MVP',
        period: 'Mois 1-3',
        items: ['QR code + Authentification', 'Patient + Médecin + Pharmacien', 'Test : 1 hôpital, 100 patients'],
        progress: 100,
        color: 'bg-success',
    },
    {
        icon: Building2,
        title: 'Consolidation',
        period: 'Mois 4-6',
        items: ['Blockchain complète', 'Bracelet NFC', 'Déploiement : 5 hôpitaux, 5000 patients'],
        progress: 60,
        color: 'bg-secondary',
    },
    {
        icon: TrendingUp,
        title: 'Expansion',
        period: 'Mois 7-12',
        items: ['Intégration HL7 FHIR', 'App mobile grand public', '50 000 utilisateurs'],
        progress: 20,
        color: 'bg-gray-400',
    },
    {
        icon: Globe,
        title: 'National',
        period: 'Année 2+',
        items: ['Télémédecine intégrée', 'Dispositifs IoT médicaux', 'Millions d\'utilisateurs'],
        progress: 0,
        color: 'bg-gray-300',
    },
];

function PhaseCard({ phase, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const Icon = phase.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
            <Icon className="text-primary mb-4" size={40} strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-dark mb-1">{phase.title}</h3>
            <p className="text-dark/50 text-sm mb-4">{phase.period}</p>
            <ul className="space-y-1.5 mb-5">
                {phase.items.map((item, i) => (
                    <li key={i} className="text-dark/70 text-sm">• {item}</li>
                ))}
            </ul>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className={`absolute inset-y-0 left-0 ${phase.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${phase.progress}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.3 + index * 0.15 }}
                />
            </div>
            <p className="text-xs text-dark/40 mt-1.5 text-right">{phase.progress}%</p>
        </motion.div>
    );
}

export default function Roadmap() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        De l'Idée à l'Impact National
                    </h2>
                    <p className="text-dark/60 text-lg">
                        Notre feuille de route pour révolutionner la santé
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {phases.map((p, i) => (
                        <PhaseCard key={i} phase={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
