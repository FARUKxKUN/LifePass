import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Shield, Clock, FileText, User, ChevronRight, Check } from 'lucide-react';

export default function NotificationCenter({ notifications: initialNotifications, isDoctor = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'access': return <Shield className={`w-5 h-5 ${isDoctor ? 'text-emerald-500' : 'text-blue-400'}`} />;
            case 'report': return <FileText className={`w-5 h-5 ${isDoctor ? 'text-blue-500' : 'text-emerald-400'}`} />;
            case 'warning': return <Shield className="w-5 h-5 text-red-500" />;
            default: return <Bell className="w-5 h-5 text-slate-400" />;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-4 rounded-2xl transition-all border ${isDoctor
                    ? 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white border-white/10'
                    }`}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className={`absolute top-3 right-3 w-3 h-3 rounded-full border-2 animate-pulse ${isDoctor ? 'bg-emerald-500 border-white' : 'bg-blue-500 border-[#020617]'
                        }`} />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            className={`absolute right-0 mt-4 w-96 border rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 overflow-hidden ${isDoctor ? 'bg-white border-slate-200' : 'bg-[#0f172a] border-white/10'
                                }`}
                        >
                            <div className={`p-6 border-b flex items-center justify-between ${isDoctor ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-white/5'
                                }`}>
                                <h3 className={`font-black text-sm uppercase tracking-widest ${isDoctor ? 'text-slate-900' : 'text-white'}`}>Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className={`text-[10px] font-black transition-colors uppercase tracking-widest flex items-center gap-2 ${isDoctor ? 'text-emerald-600 hover:text-emerald-800' : 'text-blue-400 hover:text-white'
                                            }`}
                                    >
                                        <Check className="w-3.5 h-3.5" /> Tout marquer
                                    </button>
                                )}
                            </div>

                            <div className="max-h-[450px] overflow-y-auto scrollbar-hide py-2">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`group p-6 transition-all flex gap-5 cursor-pointer border-b last:border-0 relative ${isDoctor ? 'border-slate-100 hover:bg-slate-50' : 'border-white/5 hover:bg-white/5'
                                                } ${notif.unread ? '' : 'opacity-60'}`}
                                        >
                                            <div className="relative">
                                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${isDoctor ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
                                                    }`}>
                                                    {getIcon(notif.type)}
                                                </div>
                                                {notif.unread && (
                                                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 ${isDoctor ? 'bg-emerald-500 border-white' : 'bg-blue-500 border-[#0f172a]'
                                                        }`} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className={`text-xs font-bold ${isDoctor ? 'text-slate-600' : 'text-slate-300'}`}>{notif.title}</p>
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter whitespace-nowrap">{notif.time}</span>
                                                </div>
                                                <p className={`text-[11px] font-medium leading-relaxed line-clamp-2 ${isDoctor ? 'text-slate-500' : 'text-slate-400'}`}>{notif.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-slate-600 space-y-3">
                                        <Bell className="w-12 h-12 mx-auto opacity-10" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Aucune notification</p>
                                    </div>
                                )}
                            </div>

                            <div className={`border-t p-4 text-center ${isDoctor ? 'border-slate-100 bg-slate-50/30' : 'border-white/5 bg-white/5'
                                }`}>
                                <button className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto grayscale group hover:grayscale-0">
                                    Historique complet <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
