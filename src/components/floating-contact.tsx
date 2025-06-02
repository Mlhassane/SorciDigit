"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
            icon: "/icons/email.svg", 
            label: "Email", 
            link: "mailto:contact@votreagence.com",
            description: "Contactez-nous par email" 
        },
        { 
            icon: "/icons/whatsapp.svg", 
            label: "WhatsApp", 
            link: "https://wa.me/33612345678",
            description: "Discutons en direct" 
        },
        { 
            icon: "/icons/phone.svg", 
            label: "Appel", 
            link: "tel:+33612345678",
            description: "Appelez-nous directement" 
        },
        { 
            icon: "/icons/calendar.svg", 
            label: "RDV", 
            link: "https://calendly.com/votreagence",
            description: "Prenez rendez-vous" 
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
                            <h3 className="text-sm font-semibold text-[#3B82F6]">Contact rapide</h3>
                            <p className="text-xs text-gray-400">Nous répondons sous 24h</p>
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
                                    <div className="relative w-6 h-6 flex-shrink-0">
                                        <Image
                                            src={option.icon}
                                            alt={option.label}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{option.label}</p>
                                        <p className="text-xs text-gray-400 truncate">{option.description}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`rounded-full p-4 shadow-lg flex items-center justify-center ${
                    isOpen ? "bg-gray-800 border border-gray-700" : "bg-[#3B82F6]"
                }`}
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
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    )}
                </motion.div>
            </motion.button>
        </motion.div>
    );
};

export default FloatingContact;