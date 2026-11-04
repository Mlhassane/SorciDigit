"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import React from "react"
import { ArrowRight, Code2, Users, Target, Rocket } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black pt-32 pb-24 px-4 overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-gray-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center md:text-left mb-20"
        >
          <motion.span
            variants={fadeUp} custom={0}
            className="inline-block text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 grotesk"
          >
            Notre Histoire
          </motion.span>
          <motion.h1
            className="text-5xl md:text-[5.5rem] font-medium mb-6 text-black tracking-tight serif italic leading-[1]"
            variants={fadeUp}
            custom={1}
          >
            Les <span className="not-italic block md:inline font-bold">Sorciers du digital.</span>
          </motion.h1>
          <motion.p
            className="text-gray-500 text-lg md:text-2xl max-w-3xl grotesk leading-relaxed"
            variants={fadeUp}
            custom={2}
          >
            Nous sommes une agence digitale basée en Afrique de l'Ouest. Nous faisons apparaître des résultats là où les autres ne voient que des problèmes.
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-gray-600 text-lg leading-relaxed grotesk"
          >
            <p>
              Sorci Digit est née d'un constat simple : la plupart des entreprises africaines ont d'excellents produits ou services, mais elles peinent à les valoriser dans un environnement numérique saturé et complexe.
            </p>
            <p>
              Notre mission est de combler ce fossé. Nous ne créons pas de simples "sites e-commerce" ou des "applications web". Nous construisons des machines à convertir, pensées pour l'utilisateur final et optimisées pour générer de la rentabilité.
            </p>
            <p className="font-bold text-black border-l-4 border-black pl-5 mt-8 italic">
              "L'élégance technologique au service de votre croissance."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { icon: <Target className="w-6 h-6" />, title: "Approche ROIste", desc: "Chaque action que nous menons est pensée pour votre rentabilité." },
              { icon: <Code2 className="w-6 h-6" />, title: "Excellence Tech", desc: "Nous utilisons Next.js, React et les meilleures stacks du marché." },
              { icon: <Users className="w-6 h-6" />, title: "Humain & Local", desc: "Une compréhension profonde des réalités du marché ouest-africain." },
              { icon: <Rocket className="w-6 h-6" />, title: "Accompagnement", desc: "Nous ne livrons pas qu'un code, nous formons vos équipes." },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="bg-[#fafafa] w-12 h-12 flex items-center justify-center rounded-2xl mb-4 border border-gray-100 text-black">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-black mb-2 grotesk">{feature.title}</h3>
                <p className="text-sm text-gray-500 grotesk">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-black text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-50"></div>
          
          <h2 className="text-3xl md:text-5xl font-medium mb-6 serif italic relative z-10">Prêt à lancer votre projet ?</h2>
          <p className="text-gray-400 text-lg grotesk max-w-2xl mx-auto mb-10 relative z-10">
            Parlons de vos objectifs. Nous analysons vos besoins et vous proposons une solution digitale sur mesure, sans engagement.
          </p>
          
          <Link href="/contact" className="inline-block relative z-10">
            <button className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full text-lg font-bold overflow-hidden transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10">Discuter de votre projet</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
