import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const impacts = [
    {
        value: 2,
        suffix: ' Md€',
        color: 'text-success',
        label: 'économisés par an (France)',
        detail: 'Examens redondants + gain temps',
    },
    {
        value: 15000,
        suffix: '',
        color: 'text-accent',
        label: 'vies sauvées par an (Europe)',
        detail: 'Erreurs médicales évitées',
        separator: ' ',
    },
    {
        value: 50,
        suffix: 'M',
        color: 'text-warning',
        label: 'heures gagnées par an',
        detail: 'Patients + Médecins + Administratif',
    },
];

function ImpactCard({ item, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-shadow text-center"
        >
            <div className={`text-5xl sm:text-6xl font-black ${item.color} mb-3`}>
                {inView ? (
                    <CountUp
                        end={item.value}
                        duration={2.5}
                        suffix={item.suffix}
                        separator={item.separator || ''}
                    />
                ) : (
                    `0${item.suffix}`
                )}
            </div>
            <p className="text-dark font-semibold text-lg mb-1">{item.label}</p>
            <p className="text-dark/50 text-sm">{item.detail}</p>
        </motion.div>
    );
}

export default function Impact() {
    return (
        <section
            id="impact"
            className="py-24"
            style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)' }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Impact Quantifiable de LifePass
                    </h2>
                    <p className="text-dark/60 text-lg">Des résultats mesurables, un ROI immédiat</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {impacts.map((item, i) => (
                        <ImpactCard key={i} item={item} index={i} />
                    ))}
                </div>

                <div className="bg-success text-white rounded-2xl p-6 text-center max-w-3xl mx-auto">
                    <p className="text-lg font-medium">
                        💡 ROI immédiat pour l'État : Les économies dépassent largement les coûts d'implémentation
                    </p>
                </div>
            </div>
        </section>
    );
}
