"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const FloatingLogo = () => {
    return (
        <motion.div 
            className="fixed top-8 left-8 z-50 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    easings: ["easeInOut"]
                }}
                className="relative w-16 h-16"
            >
                <Image
                    src="/2.png"
                    alt="Sorci Digit Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_15px_rgba(12,242,160,0.3)]"
                />
            </motion.div>
        </motion.div>
    );
};

export default FloatingLogo;