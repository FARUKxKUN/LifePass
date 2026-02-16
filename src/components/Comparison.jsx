import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const rows = [
    { criteria: 'Taux d\'adoption', dmp: '5% (échec)', lifepass: '90% visé' },
    { criteria: 'Accès hors ligne', dmp: '❌ Non', lifepass: '✅ Oui (3s)' },
    { criteria: 'QR code instant', dmp: '❌ Non', lifepass: '✅ Oui' },
    { criteria: 'Contrôle patient', dmp: '⚠️ Limité', lifepass: '✅ Total' },
    { criteria: 'IA d\'agrégation', dmp: '❌ Non', lifepass: '✅ Auto' },
    { criteria: 'Blockchain', dmp: '❌ Non', lifepass: '✅ Intégrée' },
    { criteria: 'Mobile-first', dmp: '❌ Non', lifepass: '✅ Natif' },
    { criteria: 'Temps d\'accès', dmp: '3-5 min', lifepass: '3 secondes' },
    { criteria: 'Interopérabilité', dmp: '⚠️ Faible', lifepass: '✅ Totale' },
];

function TableRow({ row, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    return (
        <motion.tr
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="border-b border-white/10 hover:bg-white/5 transition-colors"
        >
            <td className="py-3 px-4 font-medium text-white/90">{row.criteria}</td>
            <td className="py-3 px-4 text-red-400 text-center">{row.dmp}</td>
            <td className="py-3 px-4 text-green-400 text-center font-semibold">{row.lifepass}</td>
        </motion.tr>
    );
}

export default function Comparison() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="py-24" style={{ background: '#0F172A' }}>
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Pourquoi le DMP a Échoué… et Nous Réussirons
                    </h2>
                    <p className="text-white/60 text-lg">
                        Comparaison honnête avec le système actuel
                    </p>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="overflow-x-auto"
                >
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="border-b-2 border-white/20">
                                <th className="py-3 px-4 text-left text-white/60 uppercase text-sm tracking-wider">Critère</th>
                                <th className="py-3 px-4 text-center text-red-400 uppercase text-sm tracking-wider">DMP (État)</th>
                                <th className="py-3 px-4 text-center text-green-400 uppercase text-sm tracking-wider">LifePass ✅</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <TableRow key={i} row={row} index={i} />
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                    <p className="text-white/80 italic text-lg mb-2">
                        "Le DMP était trop complexe. LifePass est si simple qu'un enfant pourrait l'utiliser."
                    </p>
                    <p className="text-white/40 text-sm">— Dr. Sophie Martin, Urgentiste</p>
                </motion.div>
            </div>
        </section>
    );
}
