import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3 h-12">
                            <img src="/logo.png" alt="LifePass Logo" className="w-12 h-12 object-contain" />
                            <span className="text-2xl font-black tracking-tighter text-white">LifePass</span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Un QR code. 3 secondes. Une vie sauvée.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-300">
                        <Link to="#" className="hover:text-blue-400 transition-colors">CGU</Link>
                        <Link to="#" className="hover:text-blue-400 transition-colors">Confidentialité</Link>
                        <Link to="#" className="hover:text-blue-400 transition-colors">Contact</Link>
                        <Link to="#" className="hover:text-blue-400 transition-colors">Sécurité (HDS)</Link>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="mailto:contact@lifepass.health" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] uppercase tracking-widest font-bold">
                    © 2026 LifePass — Plateforme certifiée HDS & ISO 27001
                </div>
            </div>
        </footer>
    );
}
