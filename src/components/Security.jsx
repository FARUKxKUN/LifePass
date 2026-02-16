import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Lock, Shield, Link2, Eye, ChevronDown } from 'lucide-react';

const levels = [
    {
        icon: ShieldCheck,
        color: 'text-primary',
        title: 'Niveau 1 : Authentification Médicale',
        items: [
            'Carte CPS (Carte Professionnelle de Santé) obligatoire',
            'Vérification RPPS (Répertoire Partagé Professionnels Santé)',
            'Double authentification pour accès sensibles',
        ],
    },
    {
        icon: Lock,
        color: 'text-secondary',
        title: 'Niveau 2 : Contrôle Patient Total',
        items: [
            'Patient décide QUI accède à QUOI et QUAND',
            'Granularité fine : par type de données, par professionnel',
            'Révocation instantanée possible 24/7',
        ],
    },
    {
        icon: Shield,
        color: 'text-success',
        title: 'Niveau 3 : Chiffrement Militaire',
        items: [
            'AES-256 (même niveau que banques et armées)',
            'Clé privée unique par patient',
            'Impossible à décrypter sans autorisation',
        ],
    },
    {
        icon: Link2,
        color: 'text-warning',
        title: 'Niveau 4 : Blockchain Immuable',
        items: [
            'Chaque accès tracé de façon permanente',
            'Impossible de modifier ou supprimer l\'historique',
            'Audit complet disponible pour le patient',
        ],
    },
    {
        icon: Eye,
        color: 'text-accent',
        title: 'Niveau 5 : IA de Détection d\'Abus',
        items: [
            'Surveillance patterns suspects 24/7',
            'Blocage automatique des accès anormaux',
            'Alertes immédiates au patient',
        ],
    },
];

const badges = [
    { label: 'RGPD', sub: 'Conforme' },
    { label: 'HDS', sub: 'Certifié' },
    { label: 'ISO 27001', sub: 'Certifié' },
    { label: 'ANSSI', sub: 'Conforme' },
];

function AccordionItem({ level, index }) {
    const [open, setOpen] = useState(index === 0);
    const Icon = level.icon;

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={open}
            >
                <Icon className={level.color} size={28} />
                <span className="font-bold text-dark flex-1">{level.title}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} className="text-dark/40" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <ul className="px-5 pb-5 pl-16 space-y-2">
                            {level.items.map((item, i) => (
                                <li key={i} className="text-dark/70 flex items-start gap-2">
                                    <span className="text-success">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Security() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="securite" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Sécurité Niveau Bancaire × 10
                    </h2>
                    <p className="text-dark/60 text-lg">
                        Vos données médicales méritent la protection maximale
                    </p>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {levels.map((level, i) => (
                        <AccordionItem key={i} level={level} index={i} />
                    ))}
                </motion.div>

                {/* Certification badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-12">
                    {badges.map((b, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-light rounded-xl px-6 py-4 text-center shadow-sm border border-gray-100"
                        >
                            <p className="font-bold text-primary text-lg">{b.label}</p>
                            <p className="text-dark/50 text-sm">{b.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
