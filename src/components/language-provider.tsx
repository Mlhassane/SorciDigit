"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    fr: {
        "nav.home": "Accueil",
        "nav.services": "Services",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "nav.call": "Appellez nous",
        "hero.title": "Accélérez votre transformation digital avec des solutions",
        "hero.subtitle": "innovantes",
        "hero.desc": "Parce que chaque projet mérite une attention particulière, alors notre vision s'étend au delà de votre imagination",
        "hero.cta": "Réserver un appel",
        "services.title": "Nos Services",
        "services.subtitle": "Des solutions digitales sur mesure pour transformer votre entreprise",
        "services.cta.title": "Prêt à commencer ?",
        "services.cta.desc": "Discutons de votre projet et trouvons la solution parfaite",
        "services.cta.btn": "Nous contacter",
        "services.process.title": "Notre Processus",
        "portfolio.title": "Nos Projets",
        "portfolio.subtitle": "Découvrez nos réalisations qui transforment les entreprises et impactent les communautés",
        "portfolio.cta.title": "Votre projet ici ?",
        "portfolio.cta.desc": "Transformons votre idée en réalité avec notre expertise",
        "portfolio.cta.btn": "Discuter de votre projet",
        "contact.title": "Contactez-nous",
        "contact.subtitle": "Discutons de votre projet et trouvons la solution parfaite ensemble",
        "contact.methods.title": "Nos Coordonnées",
        "contact.form.title": "Envoyez-nous un message",
        "contact.form.firstName": "Prénom *",
        "contact.form.lastName": "Nom *",
        "contact.form.email": "Email *",
        "contact.form.phone": "Téléphone",
        "contact.form.company": "Entreprise",
        "contact.form.service": "Service d'intérêt *",
        "contact.form.budget": "Budget estimé",
        "contact.form.project": "Description de votre projet *",
        "contact.form.privacy": "J'accepte que mes données soient traitées pour répondre à ma demande *",
        "contact.form.submit": "Envoyer ma demande",
        "contact.form.submitting": "Envoi en cours...",
        "contact.form.success": "Message envoyé avec succès ! Nous vous répondrons sous 24h.",
        "contact.appointment.title": "Ou prenez rendez-vous",
        "contact.appointment.desc": "Réservez un créneau de 30 minutes pour discuter de votre projet",
        "contact.appointment.btn": "Prendre rendez-vous",
    },
    en: {
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "nav.call": "Call us",
        "hero.title": "Accelerate your digital transformation with solutions",
        "hero.subtitle": "innovative",
        "hero.desc": "Because every project deserves special attention, our vision extends beyond your imagination",
        "hero.cta": "Book a call",
        "services.title": "Our Services",
        "services.subtitle": "Tailored digital solutions to transform your business",
        "services.cta.title": "Ready to start?",
        "services.cta.desc": "Let's discuss your project and find the perfect solution",
        "services.cta.btn": "Contact us",
        "services.process.title": "Our Process",
        "portfolio.title": "Our Projects",
        "portfolio.subtitle": "Discover our achievements that transform businesses and impact communities",
        "portfolio.cta.title": "Your project here?",
        "portfolio.cta.desc": "Let's transform your idea into reality with our expertise",
        "portfolio.cta.btn": "Discuss your project",
        "contact.title": "Contact Us",
        "contact.subtitle": "Let's discuss your project and find the perfect solution together",
        "contact.methods.title": "Our Details",
        "contact.form.title": "Send us a message",
        "contact.form.firstName": "First Name *",
        "contact.form.lastName": "Last Name *",
        "contact.form.email": "Email *",
        "contact.form.phone": "Phone",
        "contact.form.company": "Company",
        "contact.form.service": "Service of interest *",
        "contact.form.budget": "Estimated budget",
        "contact.form.project": "Project description *",
        "contact.form.privacy": "I agree that my data will be processed to respond to my request *",
        "contact.form.submit": "Send my request",
        "contact.form.submitting": "Sending...",
        "contact.form.success": "Message sent successfully! We will get back to you within 24 hours.",
        "contact.appointment.title": "Or book an appointment",
        "contact.appointment.desc": "Book a 30-minute slot to discuss your project",
        "contact.appointment.btn": "Book appointment",
    }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("fr")

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language
        if (savedLang && (savedLang === "fr" || savedLang === "en")) {
            setLanguage(savedLang)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem("language", lang)
    }

    const t = (key: string) => {
        return (translations[language] as any)[key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
