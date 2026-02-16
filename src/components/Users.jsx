import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const roles = [
    { role: 'Patient', level: '🟢 TOTAL', desc: 'Contrôle absolu sur tout', color: 'bg-green-50' },
    { role: 'Médecin', level: '🔵 ÉLEVÉ', desc: 'Historique selon autorisation', color: 'bg-blue-50' },
    { role: 'Pharmacien', level: '🟡 LIMITÉ', desc: 'Ordonnances + allergies', color: 'bg-yellow-50' },
    { role: 'Urgentiste', level: '🔴 AUTO', desc: 'Infos vitales si inconscient', color: 'bg-red-50' },
    { role: 'Labo', level: '🟣 CIBLÉ', desc: 'Résultats analyses seulement', color: 'bg-purple-50' },
    { role: 'Admin', level: '⚪ MINIMAL', desc: 'Données démographiques', color: 'bg-gray-50' },
];

export default function Users() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="py-24 bg-light">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Qui Accède à Quoi ? Transparence Totale
                    </h2>
                    <p className="text-dark/60 text-lg">
                        Chaque rôle a un niveau d'accès adapté, contrôlé par vous
                    </p>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Desktop table */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="text-left py-4 px-6 font-semibold">Rôle</th>
                                    <th className="text-left py-4 px-6 font-semibold">Niveau</th>
                                    <th className="text-left py-4 px-6 font-semibold">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((r, i) => (
                                    <tr
                                        key={i}
                                        className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${i % 2 === 1 ? 'bg-gray-50/50' : ''
                                            }`}
                                    >
                                        <td className="py-4 px-6 font-semibold text-dark">{r.role}</td>
                                        <td className="py-4 px-6">{r.level}</td>
                                        <td className="py-4 px-6 text-dark/70">{r.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-3">
                        {roles.map((r, i) => (
                            <div key={i} className={`${r.color} rounded-xl p-4 border border-gray-100`}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-dark">{r.role}</span>
                                    <span className="text-sm">{r.level}</span>
                                </div>
                                <p className="text-dark/60 text-sm">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center mt-8">
                    <p className="text-primary font-medium">
                        💡 Vous configurez tous ces accès dans votre tableau de bord patient
                    </p>
                </div>
            </div>
        </section>
    );
}
