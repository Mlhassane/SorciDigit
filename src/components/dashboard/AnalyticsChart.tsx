"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnalyticsChartProps {
    data?: number[];
    labels?: string[];
}

const AnalyticsChart = ({ data = [], labels = [] }: AnalyticsChartProps) => {
    // Use real data or fallback to a flat line if empty
    const points = data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0];
    const max = Math.max(...points, 1); // Avoid division by zero
    const width = 800;
    const height = 300;
    const step = width / (points.length - 1);

    const pathData = points.reduce((acc, point, i) => {
        const x = i * step;
        const y = height - (point / max) * height * 0.8 - 40;
        return acc + (i === 0 ? `M ${x} ${y} ` : ` L ${x} ${y} `);
    }, "");

    const areaData = pathData + ` L ${width} ${height} L 0 ${height} Z`;

    return (
        <div className="w-full h-full relative group">
            <svg
                viewBox={`0 0 ${width} ${height} `}
                className="w-full h-full transform transition-transform duration-500"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <line
                        key={i}
                        x1="0"
                        y1={(height / 4) * i}
                        x2={width}
                        y2={(height / 4) * i}
                        stroke="white"
                        strokeOpacity="0.05"
                        strokeDasharray="4 4"
                    />
                ))}

                {/* Area */}
                <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d={areaData}
                    fill="url(#chartGradient)"
                />

                {/* Path line */}
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d={pathData}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Interactive dots */}
                {points.map((point, i) => (
                    <motion.circle
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        cx={i * step}
                        cy={height - (point / max) * height * 0.8 - 40}
                        r="4"
                        fill="white"
                        className="cursor-pointer"
                        whileHover={{ r: 8 }}
                    />
                ))}
            </svg>

            {/* Tooltip Simulation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg text-[10px] text-white/60">
                    <p className="text-white font-bold">1,240 Visitors</p>
                    <p>Jan 12, 2024</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsChart;
