import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
    delay?: number;
}

const MetricCard = ({ title, value, change, isPositive, icon, delay = 0 }: MetricCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-white/10 transition-colors"></div>

            <div className="flex items-start justify-between relative">
                <div>
                    <p className="text-sm font-medium text-white/40 mb-1">{title}</p>
                    <h3 className="text-3xl font-semibold text-white tracking-tight">{value}</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 text-white/80 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 relative">
                <div className={cn(
                    "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                    isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {change}
                </div>
                <span className="text-xs text-white/20">vs last 30d</span>
            </div>
        </motion.div>
    );
};

export default MetricCard;
