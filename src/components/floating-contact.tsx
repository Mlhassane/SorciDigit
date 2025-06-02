"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Masquer le bouton lors du défilement vers le bas
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const buttonVariants = {
        initial: { scale: 1, y: 0 },
        hover: { scale: 1.1, y: -5 },
        tap: { scale: 0.95 },
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const menuVariants = {
        hidden: { 
            opacity: 0,
            y: 20,
            transition: { 
                staggerChildren: 0.05, 
                staggerDirection: -1,
                when: "afterChildren"
            }
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: { 
                staggerChildren: 0.07, 
                delayChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        },
        hover: { x: 5, backgroundColor: "rgba(255,255,255,0.1)" }
    };

    const contactOptions = [
        { 
            emoji: "✉️", 
            label: "Email", 
            link: "mailto:contact@votreagence.com",
            description: "Réponse sous 24h" 
        },
        { 
            emoji: "💬", 
            label: "Messagerie", 
            link: "https://m.me/votreagence",
            description: "Chat en direct" 
        },
        { 
            emoji: "📞", 
            label: "Téléphone", 
            link: "tel:+33612345678",
            description: "Appel direct" 
        },
        { 
            emoji: "📅", 
            label: "RDV", 
            link: "https://calendly.com/votreagence",
            description: "Planifier un appel" 
        }
    ];

    return (
        <motion.div 
            className="fixed bottom-6 right-6 z-50"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={buttonVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bottom-full right-0 mb-4 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-gray-700/50"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="p-3 border-b border-gray-700/50">
                            <h3 className="text-sm font-semibold text-[#3B82F6]">Contactez-nous</h3>
                            <p className="text-xs text-gray-400">Plusieurs canaux disponibles</p>
                        </div>
                        
                        <div className="divide-y divide-gray-700/50">
                            {contactOptions.map((option, index) => (
                                <motion.a
                                    key={index}
                                    href={option.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition-colors"
                                    variants={itemVariants}
                                    whileHover="hover"
                                >
                                    <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{option.label}</p>
                                        <p className="text-xs text-gray-400 truncate">{option.description}</p>
                                    </div>
                                    <span className="text-gray-400">→</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`rounded-full p-4 shadow-lg flex items-center justify-center ${
                    isOpen ? "bg-gray-800 border border-gray-700" : "bg-[#3B82F6] hover:bg-[#3B82F6]/90"
                } transition-colors`}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer les contacts" : "Ouvrir les contacts"}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? (
                        <span className="text-xl">✕</span>
                    ) : (
                        <span className="text-xl">💬</span>
                    )}
                </motion.div>
            </motion.button>
        </motion.div>
    );
};

export default FloatingContact;