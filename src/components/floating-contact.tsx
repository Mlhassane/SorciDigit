"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    const menuVariants = {
        hidden: { 
            opacity: 0,
            x: 20,
            y: 10,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        },
        visible: { 
            opacity: 1,
            x: 0,
            y: 0,
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

    const contactOptions = [
        { icon: "📧", label: "Email", link: "mailto:contact@sorcidigit.com" },
        { icon: "📱", label: "WhatsApp", link: "https://wa.me/yourphone" },
        { icon: "💬", label: "Telegram", link: "https://t.me/yourusername" }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bottom-full right-0 mb-4 bg-gray-900/90 backdrop-blur-md rounded-lg p-2 min-w-[200px]"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={index}
                                href={option.link}
                                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <span className="text-xl">{option.icon}</span>
                                <span className="text-sm font-medium">{option.label}</span>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="bg-[#0CF2A0] text-black rounded-full p-4 shadow-lg shadow-[#0CF2A0]/20"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsOpen(!isOpen)}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        {isOpen ? (
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        ) : (
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" 
                            />
                        )}
                    </svg>
                </motion.div>
            </motion.button>
        </div>
    );
};

export default FloatingContact;