"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

const contactMethods = [
  {
    title: "Email",
    value: "contact@sorcidigit.com",
    desc: "Pour toute question ou demande de devis",
    icon: "📧",
    href: "mailto:contact@sorcidigit.com"
  },
  {
    title: "Téléphone",
    value: "+227 77042181",
    desc: "Du lundi au samedi, 9h-18h",
    icon: "📞",
    href: "tel:+22777042181"
  },
  {
    title: "WhatsApp",
    value: "+227 77042181",
    desc: "Réponse rapide pour les urgences",
    icon: "💬",
    href: "https://wa.me/+22777042181"
  }
]

const services = [
  "Création d'applications web & mobiles",
  "Digitalisation & automatisation",
  "Solutions AgriTech",
  "Sites vitrines & e-commerce",
  "Design graphique & branding",
  "Conseil en innovation",
  "Autre projet"
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transitionreading: {
      staggerChildren: 0.15,
    },
  },
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")
    
    // Simulated form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-light mb-6 text-white/90 tracking-tight"
            variants={fadeUp}
            custom={0}
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg font-light max-w-xl mx-auto"
            variants={fadeUp}
            custom={1}
          >
            Discutons de votre projet et trouvons la solution parfaite ensemble
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-2xl font-normal mb-8 text-center text-white/90"
            variants={fadeUp}
            custom={0}
          >
            Nos Coordonnées
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={method.title}
                className="bg-white/3 rounded-2xl p-6 text-center hover:bg-white/5 transition-colors duration-300"
                variants={fadeUp}
                custom={idx + 1}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white/90">{method.title}</h3>
                <a 
                  href={method.href}
                  className="text-gray-300 font-light mb-2 hover:text-white transition-colors inline-block"
                  aria-label={`Contactez-nous via ${method.title}`}
                >
                  {method.value}
                </a>
                <p className="text-gray-400 text-sm font-light">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 
            className="text-2xl font-normal mb-8 text-center text-white/90"
            variants={fadeUp}
            custom={0}
          >
            Envoyez-nous un message
          </motion.h2>
          
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 text-green-400 text-center"
            >
              Message envoyé avec succès ! Nous vous répondrons sous 24h.
            </motion.div>
          )}

          {formError && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400 text-center"
            >
              {formError}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} custom={1}>
                <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="firstName">
                  Prénom *
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                  placeholder="Votre prénom"
                  aria-required="true"
                />
              </motion.div>
              <motion.div variants={fadeUp} custom={2}>
                <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="lastName">
                  Nom *
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                  placeholder="Votre nom"
                  aria-required="true"
                />
              </motion.div>
            </div>

            <motion.div variants={fadeUp} custom={3}>
              <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                placeholder="votre@email.com"
                aria-required="true"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={4}>
              <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="phone">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                placeholder="+33 6 12 34 56 78"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="company">
                Entreprise
              </label>
              <input
                id="company"
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                placeholder="Nom de votre entreprise"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={6}>
              <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="service">
                Service d'intérêt *
              </label>
              <select
                id="service"
                required
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                aria-required="true"
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service, idx) => (
                  <option key={idx} value={service}>{service}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={fadeUp} custom={7}>
              <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="budget">
                Budget estimé
              </label>
              <select
                id="budget"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
              >
                <option value="">Sélectionnez une fourchette</option>
                <option value="<5k">Moins de 5 000€</option>
                <option value="5k-15k">5 000€ - 15 000€</option>
                <option value="15k-50k">15 000€ - 50 000€</option>
                <option value="50k+">Plus de 50 000€</option>
                <option value="discuss">À discuter</option>
              </select>
            </motion.div>

            <motion.div variants={fadeUp} custom={8}>
              <label className="block text-sm font-light text-gray-300 mb-2" htmlFor="project">
                Description de votre projet *
              </label>
              <textarea
                id="project"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light transition-all duration-300"
                placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                aria-required="true"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={9}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="mr-3 rounded border-white/10 bg-black focus:ring-2 focus:ring-white/20 h-5 w-5"
                  aria-required="true"
                />
                <span className="text-sm font-light text-gray-300">
                  J'accepte que mes données soient traitées pour répondre à ma demande *
                </span>
              </label>
            </motion.div>

            <motion.div variants={fadeUp} custom={10}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white/90 text-black font-normal px-7 py-4 rounded-full border border-white/20 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Envoyer le formulaire de contact"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </section>

      {/* Appointment */}
      <section className="py-16 px-4 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-md mx-auto text-center"
        >
          <motion.h2 
            className="text-2xl font-normal mb-4 text-white/90"
            variants={fadeUp}
            custom={0}
          >
            Ou prenez rendez-vous
          </motion.h2>
          <motion.p 
            className="text-gray-300 mb-6 font-light max-w-sm mx-auto"
            variants={fadeUp}
            custom={1}
          >
            Réservez un créneau de 30 minutes pour discuter de votre projet
          </motion.p>
          <motion.div 
            variants={fadeUp} 
            custom={2}
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              href="#"
              className="inline-block bg-white/10 text-white font-normal px-7 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300"
              aria-label="Prendre un rendez-vous"
            >
              Prendre rendez-vous
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
