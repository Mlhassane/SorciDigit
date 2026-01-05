import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Globe, Settings, User, Bell, ExternalLink } from 'lucide-react';

const DashboardNav = () => {
    return (
        <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-xl">S</span>
                            </div>
                            <span className="text-white font-medium text-lg hidden sm:block">Sorci Analytics</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg flex items-center gap-2">
                                <LayoutDashboard size={16} />
                                Tableau de bord
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                                <Globe size={16} />
                                Websites
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-white/60 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-black"></span>
                        </button>

                        <div className="h-4 w-px bg-white/10 mx-2"></div>

                        <button className="flex items-center gap-3 p-1 pl-3 pr-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                            <span className="text-sm font-medium text-white/80 hidden sm:block">Sorci Digit</span>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
                                SD
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNav;
