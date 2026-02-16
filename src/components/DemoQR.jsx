import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { QrCode, X } from 'lucide-react';

const patientData = [
    { icon: '👤', label: '45 ans, Masculin' },
    { icon: '🩸', label: 'Groupe sanguin : A+' },
];

const allergies = ['Pénicilline (réaction sévère)', 'Iode'];
const treatments = ['Aspirine 100mg (cardiaque)', 'Statines 20mg'];
const history = ['Infarctus 2023 (stent posé)', 'Hypertension contrôlée'];

export default function DemoQR() {
    const [modalOpen, setModalOpen] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [scanned, setScanned] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const startDemo = () => {
        setModalOpen(true);
        setScanning(true);
        setScanned(false);
        setTimeout(() => {
            setScanning(false);
            setScanned(true);
        }, 2200);
    };

    const closeModal = () => {
        setModalOpen(false);
        setScanning(false);
        setScanned(false);
    };

    return (
        <section id="demo" className="py-24" style={{ background: '#0F172A' }}>
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Essayez la Démo Interactive
                    </h2>
                    <p className="text-white/60 text-lg">
                        Découvrez comment LifePass fonctionne en temps réel
                    </p>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-12"
                >
                    {/* QR Mockup */}
                    <div className="relative">
                        <motion.div
                            animate={{ scale: [1, 1.04, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-52 h-52 bg-white rounded-2xl flex items-center justify-center shadow-2xl"
                            style={{ boxShadow: '0 0 40px rgba(25,118,210,0.4)' }}
                        >
                            <QrCode size={120} className="text-primary" />
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <div className="text-center md:text-left">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startDemo}
                            className="px-10 py-5 bg-secondary hover:bg-primary text-white text-xl font-bold rounded-full shadow-2xl transition-colors"
                        >
                            📱 Scanner le QR Code (Démo)
                        </motion.button>
                        <p className="text-white/40 text-sm mt-4">
                            Simulation avec données fictives
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="bg-primary p-4 flex items-center justify-between">
                                <h3 className="text-white font-bold text-lg">Dossier Médical</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-white/80 hover:text-white"
                                    aria-label="Fermer"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scan animation */}
                            {scanning && (
                                <div className="relative h-48 bg-slate-900 flex items-center justify-center">
                                    <QrCode size={80} className="text-white/20" />
                                    <motion.div
                                        className="absolute left-4 right-4 h-0.5 bg-secondary"
                                        initial={{ top: '10%' }}
                                        animate={{ top: ['10%', '90%', '10%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    <p className="absolute bottom-4 text-white/60 text-sm">Scan en cours...</p>
                                </div>
                            )}

                            {/* Results */}
                            {scanned && (
                                <div className="p-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <h4 className="text-xl font-bold text-dark mb-4 pb-3 border-b">
                                            JEAN DUPONT
                                        </h4>

                                        <div className="space-y-2 mb-5">
                                            {patientData.map((d, i) => (
                                                <motion.p
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * i }}
                                                    className="text-dark/80"
                                                >
                                                    {d.icon} {d.label}
                                                </motion.p>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4"
                                        >
                                            <p className="font-bold text-accent text-sm mb-2">⚠️ ALLERGIES CRITIQUES</p>
                                            {allergies.map((a, i) => (
                                                <p key={i} className="text-dark/80 text-sm">• {a}</p>
                                            ))}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="mb-4"
                                        >
                                            <p className="font-bold text-dark text-sm mb-2">💊 TRAITEMENTS EN COURS</p>
                                            {treatments.map((t, i) => (
                                                <p key={i} className="text-dark/70 text-sm">• {t}</p>
                                            ))}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                            className="mb-4"
                                        >
                                            <p className="font-bold text-dark text-sm mb-2">🏥 DERNIÈRE CONSULTATION</p>
                                            <p className="text-dark/70 text-sm">12 janvier 2026 — Dr. Martin</p>
                                            <p className="text-dark/70 text-sm">Bilan cardiologique — RAS</p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <p className="font-bold text-dark text-sm mb-2">📋 ANTÉCÉDENTS MAJEURS</p>
                                            {history.map((h, i) => (
                                                <p key={i} className="text-dark/70 text-sm">• {h}</p>
                                            ))}
                                        </motion.div>
                                    </motion.div>

                                    <button
                                        onClick={closeModal}
                                        className="mt-6 w-full py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors"
                                    >
                                        Fermer la Démo
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
