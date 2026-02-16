import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Shield, Brain, ArrowRight, User, Bot } from 'lucide-react';
import { AI_SYNTHESIS } from '../data/mockData';

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Bonjour ! Je suis votre assistant LifePass IA. Comment puis-je vous aider aujourd'hui ?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const prompts = [
        { id: 'resume', label: 'Résumé complet de mes rapports', icon: '📄' },
        { id: 'rappels', label: 'Quels sont mes rappels ?', icon: '🔔' },
        { id: 'constantes', label: 'Analyse de mes constantes', icon: '📊' }
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handlePromptClick = (prompt) => {
        handleSendMessage(prompt.label);
    };

    const handleSendMessage = (content) => {
        if (!content.trim()) return;

        const newUserMessage = {
            role: 'user',
            content: content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI Logic
        setTimeout(() => {
            let response = "";
            if (content.includes("Résumé")) {
                response = `D'après l'analyse de vos **${AI_SYNTHESIS.basedOnReportsCount} rapports récents** (incluant Radiologie, Analyses de sang et Consultations spécialisées) :

• **Bilan Cardiovasculaire :** Votre dernière échographie montre une fonction ventriculaire gauche préservée. Le rythme est sinusal, sans anomalie majeure.
• **Métabolisme :** Excellente progression sur votre bilan lipidique. Le LDL est en baisse de 15% par rapport à l'année dernière. 
• **Points d'attention :** Une légère carence en Vitamine D a été notée dans votre dernière prise de sang. Une supplémentation pourrait être discutée lors de votre prochain RDV.

Globalement, votre trajectoire de santé est très positive.`;
            } else if (content.includes("rappels")) {
                response = `Voici vos prochains jalons de santé importants identifiés par l'IA :

${AI_SYNTHESIS.recommendations.map(r => `• **${r.text}** : Prévu pour *${r.when}*.`).join('\n')}

**Note :** N'oubliez pas de jeûner 12h avant votre prochaine prise de sang pour garantir la précision des résultats.`;
            } else if (content.includes("constantes")) {
                const bmi = AI_SYNTHESIS.profile.bmi;
                response = `Analyse approfondie de vos constantes biométriques :

• **Indice de Masse Corporelle (IMC) :** Votre score est de **${bmi}**, ce qui correspond à un statut **"${profileStatus(bmi)}"**. 
• **Poids :** ${AI_SYNTHESIS.profile.weight} kg. On observe une stabilisation stable sur les 3 derniers mois.
• **Tension Artérielle :** Moyenne de 125/80 mmHg lors de vos dernières mesures, ce qui est optimal.
• **Pathologies suivies :** ${AI_SYNTHESIS.pathologies.map(p => p.name).join(', ')}. Vos constantes sont en parfaite adéquation avec la gestion de ces pathologies.`;
            } else {
                response = "Je peux vous aider à analyser vos documents médicaux de manière approfondie. Essayez l'un des raccourcis ci-dessous pour une démonstration de mes capacités d'analyse.";
            }

            const botResponse = {
                role: 'bot',
                content: response,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const profileStatus = (bmi) => {
        if (bmi < 18.5) return "Insuffisance pondérale";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Surpoids";
        return "Obésité";
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all z-[60] border border-white/10"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                            <X className="w-8 h-8" />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                            <div className="relative">
                                <MessageSquare className="w-8 h-8" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-600 animate-pulse" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[60] flex flex-col overflow-hidden backdrop-blur-3xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-sm uppercase tracking-widest">LifePass AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Assistant Médical</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                                <Shield className="w-4 h-4 text-blue-400" />
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] space-y-2 ${msg.role === 'bot' ? 'items-start' : 'items-end flex flex-col'}`}>
                                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-line ${msg.role === 'bot'
                                            ? 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none'
                                            : 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10'
                                            }`}>
                                            {msg.content}
                                        </div>
                                        <span className="text-[10px] text-slate-600 font-bold font-mono px-2 uppercase">{msg.time}</span>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Prompts */}
                        {!isTyping && messages.length < 3 && (
                            <div className="px-6 pb-4 space-y-2">
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest px-2 mb-3">Analyses Rapides</p>
                                <div className="space-y-2">
                                    {prompts.map(prompt => (
                                        <button
                                            key={prompt.id}
                                            onClick={() => handlePromptClick(prompt)}
                                            className="text-white/80 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-base">{prompt.icon}</span>
                                                <span className="uppercase tracking-widest">{prompt.label}</span>
                                            </span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-slate-900/50 backdrop-blur-xl">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Posez une question à l'IA..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all pr-16"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 p-3 bg-blue-600 rounded-xl text-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                            <div className="flex items-center justify-center gap-2 mt-4 text-[9px] text-slate-700 font-black uppercase tracking-[0.2em]">
                                <Sparkles className="w-2.5 h-2.5" /> IA LifePass Certifiée HDS
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
