"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactSection = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputClasses = `w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#0CF2A0]
                         focus:ring-1 focus:ring-[#0CF2A0] backdrop-blur-sm transition-colors`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Ajoutez ici votre logique d'envoi de formulaire
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
    };

    return (
        <section className="py-24 bg-black relative overflow-hidden min-h-screen" id="contact">
            {/* Background Elements */}
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
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <motion.span 
                        className="text-[#0CF2A0] text-sm font-semibold tracking-wider uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Contactez-nous
                    </motion.span>
                    <motion.h2 
                        className="mt-3 text-4xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Discutons de votre projet
                    </motion.h2>
                    <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Prêt à donner vie à vos idées ? Contactez-nous pour transformer votre vision en réalité.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="block text-white mb-2">Nom</label>
                                <input
                                    type="text"
                                    className={inputClasses}
                                    placeholder="John Doe"
                                    required
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-white mb-2">Email</label>
                                <input
                                    type="email"
                                    className={inputClasses}
                                    placeholder="john@example.com"
                                    required
                                />
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-white mb-2">Sujet</label>
                            <input
                                type="text"
                                className={inputClasses}
                                placeholder="Votre sujet"
                                required
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-white mb-2">Message</label>
                            <textarea
                                className={`${inputClasses} resize-none h-32`}
                                placeholder="Votre message"
                                required
                            />
                        </motion.div>
                        <motion.button
                            type="submit"
                            className="w-full bg-[#0CF2A0] text-black font-medium py-3 px-6 rounded-lg
                                     hover:bg-[#0CF2A0]/90 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full inline-block"
                                    />
                                    Envoi en cours...
                                </div>
                            ) : (
                                "Envoyer le message"
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-4">Informations de contact</h3>
                            <div className="space-y-4">
                                <ContactInfo
                                    icon="📧"
                                    title="Email"
                                    content="contact@sorcidigit.com"
                                    link="mailto:contact@sorcidigit.com"
                                />
                                <ContactInfo
                                    icon="📱"
                                    title="Téléphone"
                                    content="+33 1 23 45 67 89"
                                    link="tel:+33123456789"
                                />
                                <ContactInfo
                                    icon="📍"
                                    title="Adresse"
                                    content="Paris, France"
                                    link="https://goo.gl/maps"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-4">Suivez-nous</h3>
                            <div className="flex gap-4">
                                <SocialLink icon="twitter" href="#" />
                                <SocialLink icon="linkedin" href="#" />
                                <SocialLink icon="github" href="#" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ContactInfo = ({ icon, title, content, link }: {
    icon: string;
    title: string;
    content: string;
    link: string;
}) => (
    <motion.a
        href={link}
        className="flex items-start gap-4 text-gray-400 hover:text-white group transition-colors"
        whileHover={{ x: 5 }}
    >
        <span className="text-2xl">{icon}</span>
        <div>
            <p className="text-white font-medium">{title}</p>
            <p className="group-hover:text-[#0CF2A0] transition-colors">{content}</p>
        </div>
    </motion.a>
);

const SocialLink = ({ icon, href }: { icon: string; href: string }) => (
    <motion.a
        href={href}
        className="w-10 h-10 flex items-center justify-center rounded-full
                   bg-white/5 hover:bg-[#0CF2A0]/20 hover:text-[#0CF2A0]
                   text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        <i className={`fab fa-${icon}`}></i>
    </motion.a>
);

export default ContactSection;