"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const navLinks = [
    { title: 'Services', href: '#services' },
    { title: 'Projets', href: '#projects' },
    { title: 'Témoignages', href: '#testimonials' },
    { title: 'Contact', href: '#contact' }
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Transform navbar background opacity based on scroll
    const headerBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
    );

    // Update scroll state
    useEffect(() => {
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
            style={{ backgroundColor: headerBackground }}
        >
            <nav className={`max-w-7xl mx-auto flex items-center justify-between
                           backdrop-blur-sm rounded-full px-4 md:px-6 py-2
                           ${isScrolled ? 'border border-white/10' : ''}`}
            >
                {/* Logo */}
                <motion.div className="relative w-10 h-10 md:w-12 md:h-12">
                    <Link href="/">
                        <Image src="/2.png" alt="Sorci Digit" fill className="object-contain" />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.title}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className="text-white/80 hover:text-[#0CF2A0] transition-colors
                                         relative group text-sm font-medium"
                            >
                                {link.title}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0CF2A0]
                                             group-hover:w-full transition-all duration-300"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </motion.button>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-4 right-4 mt-2 p-4 bg-black/95 backdrop-blur-lg rounded-2xl border border-white/10"
                        >
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        className="text-white/80 hover:text-[#0CF2A0] py-2 px-4 rounded-lg transition-colors"
                                        whileHover={{ x: 10 }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.title}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Navbar;