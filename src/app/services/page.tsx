"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"

const services = [
  {
    title: "Création d'applications web & mobiles",
    desc: "Développement d'applications sur mesure pour répondre à vos besoins spécifiques.",
    details: [
      "Applications web modernes et responsives",
      "Applications mobiles iOS et Android",
      "Interfaces utilisateur intuitives",
      "Intégration avec vos systèmes existants",
      "Maintenance et support technique"
    ],
    icon: "💻"
  },
  {
    title: "Digitalisation & automatisation des processus métiers",
    desc: "Optimisez vos processus grâce à la technologie et l'automatisation intelligente.",
    details: [
      "Audit de vos processus actuels",
      "Conception de solutions automatisées",
      "Intégration de systèmes ERP/CRM",
      "Formation de vos équipes",
      "Suivi et optimisation continue"
    ],
    icon: "⚙️"
  },
  {
    title: "Solutions pour l'agriculture intelligente (AgriTech)",
    desc: "Technologies innovantes pour moderniser l'agriculture et améliorer la productivité.",
    details: [
      "Applications de gestion des cultures",
      "Systèmes de monitoring IoT",
      "Solutions de stockage intelligent",
      "Plateformes de vente directe",
      "Analytics et prévisions météo"
    ],
    icon: "🌾"
  },
  {
    title: "Création de sites vitrines & e-commerce",
    desc: "Sites web professionnels qui convertissent vos visiteurs en clients.",
    details: [
      "Sites vitrines modernes et élégants",
      "Boutiques en ligne complètes",
      "Optimisation SEO et performance",
      "Intégration de moyens de paiement",
      "Analytics et suivi des conversions"
    ],
    icon: "🛒"
  },
  {
    title: "Design graphique & identité de marque",
    desc: "Créez une identité visuelle forte qui vous démarque de la concurrence.",
    details: [
      "Logo et charte graphique",
      "Supports de communication",
      "Design d'interfaces utilisateur",
      "Branding et positionnement",
      "Guidelines et documentation"
    ],
    icon: "🎨"
  },
  {
    title: "Accompagnement stratégique et conseil en innovation",
    desc: "Stratégie digitale sur mesure pour transformer votre entreprise.",
    details: [
      "Audit digital complet",
      "Roadmap de transformation",
      "Formation et accompagnement",
      "Veille technologique",
      "Suivi des objectifs"
    ],
    icon: "🚀"
  }
]

const process = [
  {
    step: "01",
    title: "Découverte",
    desc: "Nous analysons vos besoins, objectifs et contraintes pour comprendre votre projet."
  },
  {
    step: "02",
    title: "Stratégie",
    desc: "Nous définissons ensemble la meilleure approche technique et méthodologique."
  },
  {
    step: "03",
    title: "Conception",
    desc: "Nous créons les maquettes, prototypes et architectures de votre solution."
  },
  {
    step: "04",
    title: "Développement",
    desc: "Nous développons votre solution avec des technologies modernes et robustes."
  },
  {
    step: "05",
    title: "Livraison",
    desc: "Nous testons, déployons et formons vos équipes à utiliser la solution."
  },
  {
    step: "06",
    title: "Suivi",
    desc: "Nous assurons la maintenance, les mises à jour et l'optimisation continue."
  }
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function ServicesPage() {
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
            Nos Services
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg font-light"
            variants={fadeUp}
            custom={1}
          >
            Des solutions digitales sur mesure pour transformer votre entreprise
          </motion.p>
        </motion.div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                className="mb-16 last:mb-0"
                variants={fadeUp}
                custom={idx}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h2 className="text-2xl font-normal mb-3 text-white/90">{service.title}</h2>
                    <p className="text-gray-300 font-light">{service.desc}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="space-y-2">
                      {service.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="flex items-start">
                          <span className="text-white/60 mr-3 mt-1">•</span>
                          <span className="text-gray-300 font-light">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notre processus */}
      <section className="py-16 px-4 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-3xl font-normal mb-12 text-center text-white/90"
            variants={fadeUp}
            custom={0}
          >
            Notre Processus
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, idx) => (
              <motion.div
                key={step.step}
                className="bg-white/3 rounded-2xl p-6 hover:bg-white/5 transition-colors"
                variants={fadeUp}
                custom={idx + 1}
              >
                <div className="text-2xl font-light text-white/60 mb-3">{step.step}</div>
                <h3 className="text-lg font-semibold mb-2 text-white/90">{step.title}</h3>
                <p className="text-gray-300 text-sm font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
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
            Prêt à commencer ?
          </motion.h2>
          <motion.p
            className="text-gray-300 mb-6 font-light"
            variants={fadeUp}
            custom={1}
          >
            Discutons de votre projet et trouvons la solution parfaite
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              href="/contact"
              className="inline-block bg-white/90 text-black font-normal px-7 py-3 rounded-full border border-white/20 hover:bg-white transition-colors"
            >
              Nous contacter
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}