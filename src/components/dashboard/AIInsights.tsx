"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, Lightbulb, Zap } from 'lucide-react';

interface AIInsightsProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIInsights = ({ isOpen, onClose }: AIInsightsProps) => {
    const insights = [
        {
            title: "Pic de trafic détecté",
            description: "Votre trafic a augmenté de 25% hier entre 18h et 20h. La source principale était LinkedIn.",
            icon: <TrendingUp className="text-emerald-400" />,
            color: "border-emerald-500/20 bg-emerald-500/5"
        },
        {
            title: "Optimisation SEO",
            description: "La page '/services' a un taux de rebond plus élevé que la moyenne. Pensez à ajouter un call-to-action plus visible.",
            icon: <Lightbulb className="text-amber-400" />,
            color: "border-amber-500/20 bg-amber-500/5"
        },
        {
            title: "Audience Internationale",
            description: "Nous remarquons une croissance organique de 15% venant de France. Envisagez une campagne ciblée sur cette zone.",
            icon: <Zap className="text-indigo-400" />,
            color: "border-indigo-500/20 bg-indigo-500/5"
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-end p-4 sm:p-6"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Slide-over Content */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-md h-full bg-[#0D0D0D] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-l-[32px]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-br from-rose-500/10 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                                    <Sparkles size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Insights IA</h2>
                                    <p className="text-white/40 text-xs">Analyse intelligente de vos données</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {insights.map((insight, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    key={i}
                                    className={`p-5 rounded-2xl border ${insight.color} space-y-3 relative overflow-hidden group`}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                        {insight.icon}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            {insight.icon}
                                        </div>
                                        <h3 className="font-semibold text-white">{insight.title}</h3>
                                    </div>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        {insight.description}
                                    </p>
                                    <button className="text-xs font-semibold text-white/40 hover:text-white flex items-center gap-1 transition-colors pt-2">
                                        En savoir plus <X size={12} className="rotate-45" />
                                    </button>
                                </motion.div>
                            ))}

                            {/* Weekly Summary Card */}
                            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl -mr-16 -mt-16"></div>
                                <h4 className="text-white font-bold mb-2">Résumé de la semaine</h4>
                                <p className="text-indigo-200/60 text-sm mb-4">Votre performance globale est en hausse de 8% par rapport à la semaine dernière.</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '68%' }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-indigo-500 rounded-full"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-indigo-400">Score 68/100</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-black/20">
                            <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98]">
                                Générer un rapport complet
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIInsights;
