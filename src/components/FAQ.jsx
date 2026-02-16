import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'Mes données sont-elles vraiment sécurisées ?',
        a: "Absolument. Nous utilisons un chiffrement militaire AES-256, le même que les banques et les armées. Vos données sont fragmentées et stockées sur une blockchain immuable. Même nous, en tant qu'entreprise, ne pouvons pas accéder à vos données sans votre autorisation explicite. Nous sommes conformes RGPD, certifiés HDS et ISO 27001.",
    },
    {
        q: 'Que se passe-t-il si je perds mon téléphone ?',
        a: "Vous pouvez révoquer l'accès à distance en 30 secondes depuis n'importe quel appareil (ordinateur, tablette, téléphone d'un proche). Vos données sont sauvegardées de façon chiffrée dans le cloud. Vous pouvez également utiliser un bracelet physique NFC comme solution de secours.",
    },
    {
        q: 'Comment les médecins accèdent-ils à mes données ?',
        a: "Le médecin scanne votre QR code avec son smartphone professionnel. Il doit ensuite s'authentifier avec sa Carte CPS (Carte Professionnelle de Santé). Vous êtes immédiatement notifié de cet accès. Vous pouvez voir dans votre historique qui a consulté quoi et quand.",
    },
    {
        q: "C'est payant ?",
        a: "La version basique est GRATUITE à vie (QR code + informations vitales). La version Premium coûte 2,99€/mois et inclut l'historique complet, l'IA d'agrégation et les alertes prédictives. Le bracelet NFC physique coûte 19,99€ (achat unique, pas d'abonnement).",
    },
    {
        q: 'Que se passe-t-il si je suis inconscient ?',
        a: "Mode urgence automatique. Les services d'urgence (pompiers, SAMU, urgentistes) peuvent scanner votre QR code et accèdent IMMÉDIATEMENT à vos informations vitales : groupe sanguin, allergies mortelles, pathologies graves, traitements en cours, contact d'urgence. Pas besoin d'autorisation dans ce cas. Vous êtes notifié dès que vous vous réveillez.",
    },
    {
        q: 'Ça remplace le DMP (Dossier Médical Partagé) ?',
        a: "Oui, mais en mieux. Le DMP a un taux d'adoption de 5% car il est trop complexe et lent (3-5 minutes pour accéder à une info). LifePass, c'est 3 secondes. Mobile-first. Contrôle patient total. Et ça fonctionne même hors ligne.",
    },
];

function FAQItem({ faq, index }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={open}
            >
                <span className="font-bold text-dark">{faq.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
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
                        <p className="px-5 pb-5 text-dark/70 leading-relaxed">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const left = faqs.slice(0, 3);
    const right = faqs.slice(3);

    return (
        <section id="faq" className="py-24 bg-light">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                        Questions Fréquentes
                    </h2>
                    <p className="text-dark/60 text-lg">Toutes vos réponses en un clic</p>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-4"
                >
                    <div className="space-y-4">
                        {left.map((faq, i) => (
                            <FAQItem key={i} faq={faq} index={i} />
                        ))}
                    </div>
                    <div className="space-y-4">
                        {right.map((faq, i) => (
                            <FAQItem key={i + 3} faq={faq} index={i + 3} />
                        ))}
                    </div>
                </motion.div>

                <div className="text-center mt-12">
                    <p className="text-dark/60 mb-4">D'autres questions ? Contactez notre support 24/7</p>
                    <button className="px-8 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-full transition-colors">
                        Nous Contacter
                    </button>
                </div>
            </div>
        </section>
    );
}
