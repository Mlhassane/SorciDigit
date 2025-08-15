"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const contactMethods = [
  {
    title: "Email",
    value: "contact@sorcidigit.com",
    desc: "Pour toute question ou demande de devis",
    icon: "📧"
  },
  {
    title: "Téléphone",
    value: "+33 1 23 45 67 89",
    desc: "Du lundi au vendredi, 9h-18h",
    icon: "📞"
  },
  {
    title: "WhatsApp",
    value: "+33 6 12 34 56 78",
    desc: "Réponse rapide pour les urgences",
    icon: "💬"
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
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function ContactPage() {
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
            className="text-4xl md:text-5xl font-light mb-6 text-white/90"
            variants={fadeUp}
            custom={0}
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg font-light"
            variants={fadeUp}
            custom={1}
          >
            Discutons de votre projet et trouvons la solution parfaite ensemble
          </motion.p>
        </motion.div>
      </section>

      {/* Méthodes de contact */}
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
                className="bg-white/3 rounded-2xl p-6 text-center hover:bg-white/5 transition-colors"
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white/90">{method.title}</h3>
                <p className="text-gray-300 font-light mb-2">{method.value}</p>
                <p className="text-gray-400 text-sm font-light">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Formulaire */}
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} custom={1}>
                <label className="block text-sm font-light text-gray-300 mb-2">Prénom *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
                  placeholder="Votre prénom"
                />
              </motion.div>
              <motion.div variants={fadeUp} custom={2}>
                <label className="block text-sm font-light text-gray-300 mb-2">Nom *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
                  placeholder="Votre nom"
                />
              </motion.div>
            </div>

            <motion.div variants={fadeUp} custom={3}>
              <label className="block text-sm font-light text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
                placeholder="votre@email.com"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={4}>
              <label className="block text-sm font-light text-gray-300 mb-2">Téléphone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
                placeholder="+33 6 12 34 56 78"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <label className="block text-sm font-light text-gray-300 mb-2">Entreprise</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
                placeholder="Nom de votre entreprise"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={6}>
              <label className="block text-sm font-light text-gray-300 mb-2">Service d'intérêt *</label>
              <select
                required
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service, idx) => (
                  <option key={idx} value={service}>{service}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={fadeUp} custom={7}>
              <label className="block text-sm font-light text-gray-300 mb-2">Budget estimé</label>
              <select className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20 font-light">
                <option value="">Sélectionnez une fourchette</option>
                <option value="<5k">Moins de 5 000€</option>
                <option value="5k-15k">5 000€ - 15 000€</option>
                <option value="15k-50k">15 000€ - 50 000€</option>
                <option value="50k+">Plus de 50 000€</option>
                <option value="discuss">À discuter</option>
              </select>
            </motion.div>

            <motion.div variants={fadeUp} custom={8}>
              <label className="block text-sm font-light text-gray-300 mb-2">Description de votre projet *</label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 font-light"
                placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={9}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="mr-3 rounded border-white/10 bg-black focus:ring-2 focus:ring-white/20"
                />
                <span className="text-sm font-light text-gray-300">
                  J'accepte que mes données soient traitées pour répondre à ma demande *
                </span>
              </label>
            </motion.div>

            <motion.div variants={fadeUp} custom={10}>
              <button
                type="submit"
                className="w-full bg-white/90 text-black font-normal px-7 py-4 rounded-full border border-white/20 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Envoyer ma demande
              </button>
            </motion.div>
          </form>
        </motion.div>
      </section>

      {/* Prise de rendez-vous */}
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
            className="text-gray-300 mb-6 font-light"
            variants={fadeUp}
            custom={1}
          >
            Réservez un créneau de 30 minutes pour discuter de votre projet
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Link 
              href="#" 
              className="inline-block bg-white/10 text-white font-normal px-7 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              Prendre rendez-vous
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
} 