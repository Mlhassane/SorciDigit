"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Users } from 'lucide-react';

interface RealTimeMapProps {
    isOpen: boolean;
    onClose: () => void;
}

const RealTimeMap = ({ isOpen, onClose }: RealTimeMapProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-6xl h-full max-h-[800px] bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Globe size={24} className="animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Carte en temps réel</h2>
                                    <p className="text-white/40 text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                        14 visiteurs actifs en ce moment
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Map Area */}
                        <div className="flex-1 relative bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-map-dark-v2-RKkUKH2OXWk9adKbDnozmndkwseTQh.png')] bg-center bg-no-repeat bg-contain opacity-40">
                            {/* Pulsing points simulation */}
                            <div className="absolute top-[40%] left-[45%] w-4 h-4">
                                <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping"></div>
                                <div className="absolute inset-1 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
                            </div>
                            <div className="absolute top-[35%] left-[20%] w-3 h-3">
                                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping"></div>
                                <div className="absolute inset-1 bg-indigo-500 rounded-full"></div>
                            </div>
                            <div className="absolute top-[60%] left-[80%] w-3 h-3">
                                <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping"></div>
                                <div className="absolute inset-1 bg-amber-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Live Feed Footer */}
                        <div className="p-6 bg-white/[0.02] border-t border-white/5">
                            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {[
                                    { country: 'Niger', city: 'Niamey', page: '/', time: 'Il y a 2s' },
                                    { country: 'France', city: 'Paris', page: '/services', time: 'Il y a 15s' },
                                    { country: 'USA', city: 'New York', page: '/portfolio', time: 'Il y a 45s' },
                                    { country: 'Niger', city: 'Zinder', page: '/', time: 'Il y a 1m' },
                                ].map((visit, i) => (
                                    <div key={i} className="flex-shrink-0 flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-4 py-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <div className="text-xs">
                                            <p className="text-white font-medium">{visit.city}, {visit.country}</p>
                                            <p className="text-white/40">{visit.page} • {visit.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RealTimeMap;
