"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    gridArea: string;
    color: string;
    features: string[];
    longDescription?: string;
    benefits?: string[];
    process?: {
        step: string;
        description: string;
    }[];
}

const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.3 }
    }
};

const ServiceCard = ({ service }: { service: Service }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const containerVariants = {
        initial: { scale: 1, rotateY: 0 },
        hover: { 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(12, 242, 160, 0.2)",
            transition: { duration: 0.3 }
        },
        clicked: { 
            scale: [1, 0.95, 1.05, 1],
            rotateY: [0, -10, 10, 0],
            transition: { duration: 0.4 }
        }
    };

    return (
        <>
            <motion.div
                className={`relative rounded-3xl overflow-hidden cursor-pointer
                           bg-gradient-to-br ${service.color}`}
                variants={containerVariants}
                initial="initial"
                whileHover="hover"
                animate={isClicked ? "clicked" : "initial"}
                onClick={() => {
                    setIsClicked(true);
                    setIsModalOpen(true);
                    setTimeout(() => setIsClicked(false), 500);
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                    <div>
                        <motion.span 
                            className="text-4xl mb-4 inline-block"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.2, y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            {service.icon}
                        </motion.span>

                        <motion.h3 
                            className="text-2xl font-bold text-white mb-2"
                            animate={{
                                scale: isHovered ? 1.05 : 1
                            }}
                        >
                            {service.title}
                        </motion.h3>

                        <motion.p
                            className="text-gray-300/80"
                            animate={{
                                opacity: isHovered ? 1 : 0.8
                            }}
                        >
                            {service.description}
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate={isHovered ? "visible" : "hidden"}
                    >
                        {service.features.map((feature) => (
                            <motion.span
                                key={feature}
                                className="px-3 py-1 bg-black/30 text-sm text-white/80 rounded-full
                                         backdrop-blur-sm hover:bg-[#0CF2A0]/20 hover:text-white"
                                variants={featureItemVariants}
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </motion.div>

                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-[#0CF2A0] rounded-full"
                                    animate={{
                                        y: [-10, -50],
                                        x: Math.random() * 100 - 50,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0]
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: i * 0.2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <ServiceModal 
                service={service} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
};

const ServiceModal = ({ service, isOpen, onClose }: { 
    service: Service; 
    isOpen: boolean; 
    onClose: () => void;
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        // className="relative bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white z-20 bg-black/50 p-2 rounded-full transition-colors duration-200"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {service.image && (
                            <div className="relative w-full h-48 md:h-60 flex-shrink-0">
                                <Image
                                    src={service.image}
                                    alt={`${service.title} illustration`}
                                    fill
                                    className="object-cover rounded-t-2xl"
                                    priority
                                    sizes="(min-width: 1024px) 768px, 100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent rounded-t-2xl pointer-events-none"></div>
                            </div>
                        )}

                        <div className={`p-6 md:p-8 ${service.image ? 'pt-6' : 'pt-12 md:pt-16'}`}>
                            <div className="flex items-center gap-3 md:gap-4 mb-6">
                                <span className="text-3xl md:text-4xl">{service.icon}</span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h3>
                            </div>

                            {service.longDescription && (
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    {service.longDescription}
                                </p>
                            )}

                            {service.benefits && service.benefits.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-lg md:text-xl font-semibold text-[#0CF2A0] mb-3 md:mb-4">Avantages Clés</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                        {service.benefits.map((benefit, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start gap-2 text-gray-300"
                                            >
                                                <span className="text-[#0CF2A0] mt-1">✓</span>
                                                <span>{benefit}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {service.process && service.process.length > 0 && (
                                <div>
                                    <h4 className="text-lg md:text-xl font-semibold text-[#0CF2A0] mb-3 md:mb-4">Notre Processus</h4>
                                    <div className="space-y-4">
                                        {service.process.map((step, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.2 }}
                                                className="bg-gray-800/70 p-4 rounded-lg shadow-md"
                                            >
                                                <h5 className="text-white font-semibold mb-1 md:mb-2 text-base md:text-lg">
                                                    Étape {index + 1}: {step.step}
                                                </h5>
                                                <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const services: Service[] = [
    {
        id: "1",
        title: "Design UI/UX",
        description: "Création d'interfaces innovantes et intuitives pour une expérience utilisateur exceptionnelle.",
        icon: "✨",
        image: "/services/design.jpg",
        gridArea: "1 / 1 / 3 / 3", // Grande carte
        color: "from-blue-500/20 to-purple-500/20",
        features: ["Design System", "Prototypage", "Tests UX", "Responsive Design"],
        longDescription: "Notre approche du design combine créativité et méthodologie pour créer des interfaces qui captivent et convertissent."
    },
    {
        id: "2",
        title: "Applications Web",
        description: "Développement d'applications web performantes, évolutives et sur mesure.",
        icon: "🚀",
        image: "/services/web.jpg",
        gridArea: "1 / 3 / 2 / 4", // Petite carte
        color: "from-emerald-500/20 to-blue-500/20",
        features: ["Next.js", "React", "Node.js"],
        longDescription: "Nous concevons des applications web modernes qui allient performance, esthétique et fonctionnalités avancées pour répondre à vos besoins spécifiques.",
        benefits: ["Expérience utilisateur optimisée", "Scalabilité et maintenance facilitées", "Technologies de pointe", "Sécurité renforcée"],
        process: [
            { step: "Analyse des besoins", description: "Compréhension approfondie de vos objectifs et de votre public cible." },
            { step: "Conception et Prototypage", description: "Création de maquettes interactives et validation du design." },
            { step: "Développement Agile", description: "Cycles de développement courts avec feedback continu." },
            { step: "Tests et Déploiement", description: "Assurance qualité rigoureuse et mise en production fluide." }
        ]
    },
    {
        id: "3",
        title: "E-commerce",
        description: "Solutions e-commerce sur mesure pour booster vos ventes en ligne.",
        icon: "🛍️",
        image: "/services/ecommerce.jpg",
        gridArea: "2 / 3 / 3 / 4", // Petite carte
        color: "from-orange-500/20 to-red-500/20",
        features: ["Shopify", "WooCommerce", "Payment"],
        longDescription: "Transformez votre activité avec une boutique en ligne performante, sécurisée et optimisée pour la conversion."
    },
    {
        id: "4",
        title: "Applications Mobile",
        description: "Création d'applications mobiles natives et cross-platform engageantes.",
        icon: "📱",
        image: "/services/mobile.jpg",
        gridArea: "3 / 1 / 4 / 4", // Carte large
        color: "from-purple-500/20 to-pink-500/20",
        features: ["iOS", "Android", "React Native"],
        longDescription: "Des applications mobiles qui marquent les esprits."
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 20%, rgba(12, 242, 160, 0.05) 0%, transparent 25%),
                            radial-gradient(circle at 80% 80%, rgba(12, 242, 160, 0.05) 0%, transparent 25%)
                        `
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.span 
                        className="text-[#0CF2A0] text-sm font-semibold tracking-wider uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Nos Services
                    </motion.span>
                    <motion.h2 
                        className="mt-3 text-4xl md:text-5xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Solutions Digitales Sur Mesure
                    </motion.h2>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4 md:gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="relative"
                            style={{ gridArea: service.gridArea }}
                        >
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;