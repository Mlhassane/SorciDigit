'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    MousePointer2,
    Clock,
    ArrowUpRight,
    Filter,
    RefreshCcw,
    Zap,
    Globe,
    ExternalLink
} from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import RealTimeMap from '@/components/dashboard/RealTimeMap';
import AIInsights from '@/components/dashboard/AIInsights';

type DashboardStats = {
    uniqueVisitors: number;
    totalViews: number;
    bounceRate: string;
    avgDuration: string;
    topPages: { path: string; views: number }[];
    topSources: { source: string; percentage: number }[];
    topOS: { item: string; count: number; percentage: number }[];
    performance: { lcp: number; cls: number; inp: number };
    chartData: number[];
    chartLabels: string[];
};

export default function DashboardPage() {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isInsightsOpen, setIsInsightsOpen] = useState(false);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/site-data/stats');
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        // Refresh toutes les 10 secondes pour l'effet "temps réel"
        const interval = setInterval(fetchStats, 10000);
        return () => clearInterval(interval);
    }, []);

    // Valeurs par défaut pour affichage propre au chargement
    const displayStats = stats || {
        uniqueVisitors: 0,
        totalViews: 0,
        bounceRate: "-",
        avgDuration: "-",
        topPages: [],
        topSources: [],
        topOS: [],
        performance: { lcp: 0, cls: 0, inp: 0 },
        chartData: [],
        chartLabels: []
    };

    return (
        <div className="space-y-8 pb-12">
            <RealTimeMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
            <AIInsights isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />

            {/* Header Section */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between px-1">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
                        Vue d'ensemble
                    </h1>
                    <p className="text-white/40 flex items-center gap-2 text-sm">
                        <Globe size={14} className="text-emerald-500" />
                        www.sorcidigit.com
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-xl p-1">
                        {['1H', '24H', '7D', '30D', 'All'].map((period) => (
                            <button
                                key={period}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${period === '7D' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-white/60 hover:text-white transition-colors text-sm font-medium">
                            <Filter size={16} />
                            Filtres
                        </button>
                        <button
                            onClick={fetchStats}
                            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white/60 hover:text-white transition-colors"
                        >
                            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Trial Info Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent border border-rose-500/20"
            >
                {/* Banner Content (unchanged) */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px] -mr-32 -mt-32"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Analytics Actif</p>
                            <p className="text-rose-200/60 text-sm">Les données sont collectées localement dans /data/analytics_db.json</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Metrics Grid with Real Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Visiteurs uniques"
                    value={displayStats.uniqueVisitors.toString()}
                    change="+100%"
                    isPositive={true}
                    icon={<Users size={20} />}
                    delay={0.1}
                />
                <MetricCard
                    title="Pages vues"
                    value={displayStats.totalViews.toString()}
                    change="live"
                    isPositive={true}
                    icon={<MousePointer2 size={20} />}
                    delay={0.2}
                />
                <MetricCard
                    title="Taux de rebond"
                    value={displayStats.bounceRate}
                    change="-"
                    isPositive={true}
                    icon={<ArrowUpRight size={20} />}
                    delay={0.3}
                />
                <MetricCard
                    title="Durée session"
                    value={displayStats.avgDuration}
                    change="-"
                    isPositive={false}
                    icon={<Clock size={20} />}
                    delay={0.4}
                />
            </div>

            {/* Performance Web Vitals Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Zap size={16} />
                        </div>
                        <span className="text-sm font-medium text-white/60">Vitesse (LCP)</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-white">{displayStats.performance?.lcp || 0} ms</h3>
                        <span className="text-xs text-emerald-400">Excellent</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[85%]"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                            <RefreshCcw size={16} />
                        </div>
                        <span className="text-sm font-medium text-white/60">Stabilité (CLS)</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-white">{displayStats.performance?.cls?.toFixed(3) || 0}</h3>
                        <span className="text-xs text-blue-400">Stable</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[92%]"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                            <MousePointer2 size={16} />
                        </div>
                        <span className="text-sm font-medium text-white/60">Réactivité (INP)</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-white">{displayStats.performance?.inp || 0} ms</h3>
                        <span className="text-xs text-amber-400">Rapide</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[78%]"></div>
                    </div>
                </motion.div>
            </div>

            {/* Main Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-3xl bg-white/[0.02] border border-white/5 p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Analyse des visites</h3>
                        <p className="text-white/40 text-sm">Evolution du trafic (Simulé)</p>
                    </div>
                    {/* ... Chart Header ... */}
                </div>
                <div className="h-[350px] w-full mt-4">
                    <AnalyticsChart data={displayStats.chartData} labels={displayStats.chartLabels} />
                </div>
            </motion.div>

            {/* Bottom Grid: Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Real Top Pages */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="rounded-3xl bg-white/[0.02] border border-white/5 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white">Pages les plus visitées</h3>
                    </div>
                    <div className="space-y-4">
                        {displayStats.topPages.length === 0 ? (
                            <div className="text-center text-white/20 py-8">Aucune donnée</div>
                        ) : (
                            displayStats.topPages.map((page, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-6 text-white/20 font-mono text-xs">{i + 1}.</span>
                                        <span className="text-white/80 group-hover:text-white transition-colors">{page.path}</span>
                                        <ExternalLink size={12} className="text-white/20 group-hover:text-white/60" />
                                    </div>
                                    <span className="text-sm font-medium text-white">{page.views}</span>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Real Top Sources */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="rounded-3xl bg-white/[0.02] border border-white/5 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white">Sources de trafic</h3>
                    </div>
                    <div className="space-y-5">
                        {displayStats.topSources.length === 0 ? (
                            <div className="text-center text-white/20 py-8">Aucune source connue</div>
                        ) : (
                            displayStats.topSources.map((source, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/60">{source.source}</span>
                                        <span className="text-white font-medium">{source.percentage}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${source.percentage}%` }}
                                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                                            className="h-full bg-indigo-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* ... (Locations and Systems can be kept static or mapped similarly if data available) ... */}
                {/* Systems Real Data */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="rounded-3xl bg-white/[0.02] border border-white/5 p-6"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <button className="text-sm text-white font-semibold border-b-2 border-rose-500 pb-1">Systèmes</button>
                    </div>
                    <div className="space-y-4">
                        {displayStats.topOS.map((sys, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="text-white/80">{sys.item}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-sm font-medium text-white">{sys.count}</span>
                                    <span className="text-xs text-white/20 w-8 text-right">{sys.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[60]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMapOpen(true)}
                    className="w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-2xl flex items-center justify-center group relative shadow-indigo-500/20"
                >
                    <div className="absolute right-full mr-4 px-2 py-1 rounded bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Carte temps réel</div>
                    <Globe size={24} />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-indigo-600 animate-pulse"></div>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsInsightsOpen(true)}
                    className="w-14 h-14 rounded-2xl bg-rose-600 text-white shadow-2xl flex items-center justify-center group relative shadow-rose-500/20"
                >
                    <div className="absolute right-full mr-4 px-2 py-1 rounded bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Insights IA</div>
                    <Zap size={24} fill="currentColor" />
                </motion.button>
            </div>
        </div>
    );
}
