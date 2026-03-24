"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { MonitorSmartphone, Workflow, Leaf, ShoppingCart, PenTool, Rocket, ArrowRight } from "lucide-react"

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
    icon: <MonitorSmartphone className="w-8 h-8 text-black" />
  },
  {
    title: "Digitalisation & automatisation métiers",
    desc: "Optimisez vos processus grâce à la technologie et l'automatisation intelligente.",
    details: [
      "Audit de vos processus actuels",
      "Conception de solutions automatisées",
      "Intégration de systèmes ERP/CRM",
      "Formation de vos équipes",
      "Suivi et optimisation continue"
    ],
    icon: <Workflow className="w-8 h-8 text-black" />
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
    icon: <ShoppingCart className="w-8 h-8 text-black" />
  },
  {
    title: "Solutions AgriTech intelligentes",
    desc: "Technologies innovantes pour moderniser l'agriculture et améliorer la productivité.",
    details: [
      "Applications de gestion des cultures",
      "Systèmes de monitoring IoT",
      "Solutions de stockage intelligent",
      "Plateformes de vente directe",
      "Analytics et prévisions météo"
    ],
    icon: <Leaf className="w-8 h-8 text-black" />
  },
  {
    title: "Design graphique & identité",
    desc: "Créez une identité visuelle forte qui vous démarque de la concurrence.",
    details: [
      "Logo et charte graphique",
      "Supports de communication",
      "Design d'interfaces utilisateur (UI/UX)",
      "Branding et positionnement",
      "Guidelines et documentation"
    ],
    icon: <PenTool className="w-8 h-8 text-black" />
  },
  {
    title: "Stratégie & Conseil digital",
    desc: "Stratégie digitale sur mesure pour transformer votre entreprise.",
    details: [
      "Audit digital complet",
      "Roadmap de transformation",
      "Formation et accompagnement",
      "Veille technologique",
      "Suivi des objectifs"
    ],
    icon: <Rocket className="w-8 h-8 text-black" />
  }
]

const process = [
  { step: "01", title: "Découverte", desc: "Nous analysons vos besoins et contraintes pour comprendre votre projet." },
  { step: "02", title: "Stratégie", desc: "Nous définissons ensemble la meilleure approche technique." },
  { step: "03", title: "Conception", desc: "Nous créons les maquettes et l'architecture de votre solution." },
  { step: "04", title: "Développement", desc: "Nous développons avec des technologies modernes et robustes." },
  { step: "05", title: "Livraison", desc: "Nous testons, déployons et formons vos équipes à l'utilisation." },
  { step: "06", title: "Suivi", desc: "Nous assurons la maintenance et l'optimisation continue." }
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-gray-200/40 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/3 pointer-events-none z-0"></div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.span
            variants={fadeUp} custom={0}
            className="inline-block text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 grotesk"
          >
            Expertises
          </motion.span>
          <motion.h1
            className="text-6xl md:text-[6rem] font-medium mb-6 text-black tracking-tight serif italic leading-[1]"
            variants={fadeUp}
            custom={1}
          >
            Nos <span className="not-italic font-bold">Services.</span>
          </motion.h1>
          <motion.p
            className="text-gray-500 text-lg md:text-2xl max-w-2xl mx-auto grotesk leading-relaxed"
            variants={fadeUp}
            custom={2}
          >
            Des solutions digitales sur mesure et haute performance pour transformer votre entreprise.
          </motion.p>
        </motion.div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col group"
                variants={fadeUp}
                custom={idx}
              >
                <div className="w-16 h-16 bg-[#fafafa] rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm mb-8 group-hover:scale-110 group-hover:bg-black transition-all duration-300">
                  {React.cloneElement(service.icon as React.ReactElement, { className: 'w-8 h-8 text-black group-hover:text-white transition-colors duration-300' })}
                </div>

                <h2 className="text-2xl font-bold mb-4 text-black tracking-tight leading-tight">{service.title}</h2>
                <p className="text-gray-500 grotesk mb-8 leading-relaxed flex-grow text-sm">{service.desc}</p>

                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 grotesk">
                    Ce que cela inclut
                  </div>
                  <ul className="space-y-3">
                    {service.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="flex items-start">
                        <span className="text-black mr-3 text-sm font-bold">✦</span>
                        <span className="text-gray-600 font-light grotesk text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notre processus */}
      <section className="py-24 px-4 bg-white border-t border-gray-100 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16 md:mb-24">
            <motion.h2
              className="text-4xl md:text-6xl font-medium mb-6 text-black serif italic"
              variants={fadeUp}
              custom={0}
            >
              Notre Processus
            </motion.h2>
            <motion.p className="text-gray-500 grotesk max-w-xl mx-auto text-lg" variants={fadeUp} custom={1}>
              Une méthodologie éprouvée pour garantir le succès de chaque projet.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {process.map((step, idx) => (
              <motion.div
                key={step.step}
                className="bg-[#fafafa] rounded-[2rem] p-8 md:p-10 border border-gray-100/50 hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300"
                variants={fadeUp}
                custom={idx + 2}
              >
                <div className="text-5xl font-light text-gray-200 mb-6 serif italic tracking-tighter">{step.step}</div>
                <h3 className="text-xl font-bold mb-3 text-black">{step.title}</h3>
                <p className="text-gray-500 text-sm grotesk leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="bg-white rounded-[3rem] p-12 py-20 border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.03)]"
          >
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-black serif italic">
              Prêt à commencer ?
            </h2>
            <p className="text-gray-500 mb-10 text-lg md:text-xl grotesk max-w-lg mx-auto">
              Discutons de votre projet et trouvons la solution parfaite.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_40px_rgba(0,0,0,0.1)] grotesk"
            >
              <span className="relative z-10">Nous consulter</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gray-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}