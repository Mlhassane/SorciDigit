"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

interface Testimonial {
    id: string;
    content: string;
    author: string;
    position: string;
    company: string;
    rating: number;
    image: string;
    logo: string;
}

const testimonials: Testimonial[] = [
    {
        id: "1",
        content: "L'équipe de Sorci Digit a transformé notre vision en réalité avec une expertise remarquable. Leur approche créative et leur attention aux détails ont dépassé nos attentes.",
        author: "Marie Laurent",
        position: "Directrice Marketing",
        company: "TechFlow",
        rating: 5, // Max 5
        image: "/testimonials/project-techflow.jpg", // Illustrative image for the testimonial/project
        logo: "/avatars/marie-laurent.jpg"      // Author's avatar
    },
    {
        id: "2",
        content: "Une équipe exceptionnelle qui a su comprendre nos besoins et livrer un produit qui nous démarque vraiment de la concurrence.",
        author: "Thomas Dubois",
        position: "CEO",
        company: "InnovStart",
        rating: 5,
        image: "/testimonials/project-innovstart.jpg",
        logo: "/avatars/thomas-dubois.jpg"
    },
    {
        id: "3",
        content: "Le processus de développement était transparent et professionnel. Le résultat final a dépassé nos objectifs initiaux.",
        author: "Sophie Martin",
        position: "Product Owner",
        company: "DataFlow",
        rating: 5,
        image: "/testimonials/project-dataflow.jpg",
        logo: "/avatars/sophie-martin.jpg"
    }
];

const NavigationButton = ({ direction, onClick }: { 
    direction: 'prev' | 'next';
    onClick: () => void;
}) => {
    return (
        <motion.button
            onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 ${
                direction === 'prev' ? 'left-0 md:-left-8 xl:-left-16' : 'right-0 md:-right-8 xl:-right-16'
            } bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50 rounded-full p-3
            text-white/80 hover:text-[#0CF2A0] hover:border-[#0CF2A0]/50
            transition-colors z-10`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: direction === 'prev' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {direction === 'prev' ? (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
        </motion.button>
    );
};

const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setActiveIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
    };

    return (
        <section ref={containerRef} className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
            <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#0CF2A0] text-sm font-semibold tracking-wider uppercase">
                        Ce qu'ils en pensent
                    </span>
                    <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white mb-4">
                        La voix de nos clients
                    </h2>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="relative h-[550px] sm:h-[480px] md:h-[450px] lg:h-[420px] w-full max-w-4xl mx-auto">
                    {/* Navigation Buttons */}
                    <NavigationButton
                        direction="prev"
                        onClick={() => paginate(-1)}
                    />
                    <NavigationButton
                        direction="next"
                        onClick={() => paginate(1)}
                    />

                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full"
                        >
                            <div className="bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-gray-800/50
                                            rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-lg border border-gray-700/60 shadow-2xl
                                            flex flex-col md:flex-row overflow-hidden h-full">
                                
                                    {/* Text Content Area */}
                                    <div className="flex flex-col justify-between md:w-3/5 md:pr-8 space-y-6">
                                        <div>
                                            {/* Rating Stars */}
                                            <div className="flex gap-1 mb-4">
                                            {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                                <motion.svg
                                                    key={i}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#0CF2A0]"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </motion.svg>
                                            ))}
                                            </div>

                                            {/* Testimonial Quote */}
                                            <blockquote className="relative">
                                                <motion.svg 
                                                    className="absolute -top-2 -left-4 sm:-left-6 w-8 h-8 sm:w-10 sm:h-10 text-[#0CF2A0]/30 transform rotate-180" 
                                                    fill="currentColor" viewBox="0 0 32 32"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <path d="M9.333 22.667h4L16 16V9.333H2.667V16H8l-2.667 6.667H9.333zM25.333 22.667h4L32 16V9.333H18.667V16H24l-2.667 6.667h4z"></path>
                                                </motion.svg>
                                                <motion.p
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed relative z-10"
                                                >
                                                    {testimonials[activeIndex].content}
                                                </motion.p>
                                            </blockquote>
                                        </div>

                                        {/* Author Info */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-gray-700/50"
                                        >
                                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                                                <Image
                                                    src={testimonials[activeIndex].logo} // Author's avatar
                                                    alt={testimonials[activeIndex].author} // Use author's name for alt text
                                                    fill
                                                    className="object-cover rounded-full shadow-md"
                                                    sizes="56px"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-base sm:text-lg">
                                                    {testimonials[activeIndex].author}
                                                </h4>
                                                <p className="text-gray-400 text-sm sm:text-base">
                                                    {testimonials[activeIndex].position}, <span className="font-medium text-gray-300">{testimonials[activeIndex].company}</span>
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Image Area (Right side on md+) */}
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="hidden md:block md:w-2/5 relative rounded-2xl overflow-hidden shadow-lg min-h-[250px] self-stretch"
                                    >
                                        <Image
                                            src={testimonials[activeIndex].image}
                                            alt="Project Preview"
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 40vw, 0vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/10 pointer-events-none" />
                                    </motion.div>
                                </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Dots */}
                    {/* <motion.div 
                        className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {testimonials.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={`relative h-3 rounded-full transition-all duration-300
                                    ${index === activeIndex ? "w-10 sm:w-12 bg-[#0CF2A0]" : "w-3 bg-gray-600 hover:bg-gray-500"}`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {index === activeIndex && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-[#0CF2A0]/30"
                                        animate={{ // Subtle pulse for active dot
                                            scale: [1, 1.4, 1],
                                            opacity: [1, 0.6, 0]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "loop"
                                        }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div> */}
                     </div>
            </motion.div>
        </section>
                    );
                     }

export default TestimonialsSection;