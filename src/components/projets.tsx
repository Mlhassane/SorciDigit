"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

interface Project {
    title: string;
    description: string;
    category: string;
    image: string;
    technologies: string[];
    link: string;
}

const projects: Project[] = [
    {
        title: "Réservation Bistro",
        description: "Système de réservation intelligent pour restaurants",
        category: "Application Web",
        image: "/projets/reservation.jpg",
        technologies: ["Next.js", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        title: "E-commerce Pro",
        description: "Plateforme e-commerce transparente et intégrée",
        category: "E-commerce",
        image: "/projets/ecommerce.jpg",
        technologies: ["React", "Shopify", "Tailwind"],
        link: "#"
    },
    {
        title: "Engagement+",
        description: "Système de fidélisation utilisateur",
        category: "CRM",
        image: "/projets/pro.jpg",
        technologies: ["Vue.js", "Firebase", "Analytics"],
        link: "#"
    }
];

const projectDetailsVariants = {
    hidden: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1, 
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94] 
        } 
    },
};

// Constante pour définir la "distance" de défilement nécessaire pour passer d'un projet à l'autre.
// Par exemple, 75vh signifie que l'utilisateur doit faire défiler 75% de la hauteur de l'écran
// pour que le projet suivant s'affiche pendant que la section est épinglée.
const SCROLL_VH_PER_PROJECT_TRANSITION = 75;

const ProjectsSection: React.FC = () => {
    const containerRef = useRef(null);
    const [activeProject, setActiveProject] = useState(0);
    
    // Calcul de la hauteur minimale du conteneur de défilement
    // 100vh pour le premier projet (la hauteur de l'élément sticky)
    // + (nombre de projets - 1) * la distance de défilement par transition de projet.
    const containerMinHeightVh = projects.length > 0 ? 100 + (projects.length - 1) * SCROLL_VH_PER_PROJECT_TRANSITION : 100;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // Changement de l'offset pour un meilleur effet de "pinning"
    });

    const transformedProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, projects.length]
    );

    useEffect(() => {
        const unsubscribe = transformedProgress.onChange(latest => {
            if (projects.length > 0) {
                const projectIndex = Math.min(
                    projects.length - 1,
                    Math.max(0, Math.floor(latest)) // Assurer que l'index n'est pas négatif
                );
                setActiveProject(projectIndex);
            }
        });

        return () => unsubscribe();
    }, [transformedProgress, projects.length]);

    return (
        <section className="bg-black text-white">
            {/* Section Title Area */}
            <div className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Nos Réalisations Récentes
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-neutral-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        Découvrez une sélection de projets qui illustrent notre expertise et notre passion pour l'innovation digitale.
                    </motion.p>
                </div>
            </div>

            {/* Scrollable Project Showcase Area */}
            <div 
                ref={containerRef}
                className="relative" 
                style={{ minHeight: projects.length > 0 ? `${containerMinHeightVh}vh` : 'auto' }}
            >
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                            {/* Left Side - Project Image */}
                            <div className="relative h-[55vh] sm:h-[60vh] md:h-[70vh]">
                                {projects.map((project, index) => (
                                    projects.length > 0 && (
                                    <motion.div
                                        key={project.title + "-image"}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                                        animate={{
                                            opacity: activeProject === index ? 1 : 0,
                                            scale: activeProject === index ? 1 : 0.95,
                                            filter: activeProject === index ? "blur(0px)" : "blur(8px)",
                                        }}
                                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                                        </div>
                                    </motion.div>
                                    )
                                ))}
                            </div>

                            {/* Right Side - Project Details */}
                            <div className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] flex items-center">
                            {projects.map((project, index) => (
                                projects.length > 0 && (
                                <motion.div
                                    key={project.title + "-details"}
                                    className="absolute w-full"
                                    initial="hidden"
                                    animate={activeProject === index ? "visible" : "hidden"}
                                    variants={projectDetailsVariants}
                                >
                                    <motion.span 
                                        className="text-sm font-medium text-[#0CF2A0] mb-2 md:mb-3 block tracking-wider uppercase"
                                        variants={itemVariants}
                                    >
                                        {project.category}
                                    </motion.span>
                                    <motion.h3 
                                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6"
                                        variants={itemVariants}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.p 
                                        className="text-neutral-300 text-base md:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed"
                                        variants={itemVariants}
                                    >
                                        {project.description}
                                    </motion.p>
                                    <motion.div 
                                        className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-8"
                                        variants={itemVariants}
                                    >
                                        {project.technologies.map((tech) => (
                                            <motion.span
                                                key={tech}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800/70 text-xs sm:text-sm text-neutral-300 rounded-full
                                                           transition-colors duration-200 hover:bg-gray-700/90 hover:text-white"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3
                                                   bg-[#0CF2A0] text-black font-semibold rounded-md
                                                   hover:bg-opacity-85 transition-all duration-300 ease-out
                                                   focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:ring-offset-2 focus:ring-offset-black
                                                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        variants={itemVariants}
                                        whileTap={{ scale: 0.97, translateY: 0 }}
                                    >
                                        Voir le Projet
                                        <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </motion.a>
                                </motion.div>
                                )
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;