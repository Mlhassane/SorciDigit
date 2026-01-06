"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Beam } from "@/components/ui/gridbeam"
import { useState } from "react"

const projects = [
  {
    name: "Agrona",
    category: { fr: "AgriTech", en: "AgriTech" },
    desc: {
      fr: "Application mobile révolutionnaire pour aider les agriculteurs à mieux gérer leurs cultures.",
      en: "Revolutionary mobile app to help farmers better manage their crops."
    },
    fullDesc: {
      fr: "Agrona est une plateforme complète qui combine IoT, IA et analytics pour optimiser chaque étape du cycle agricole.",
      en: "Agrona is a comprehensive platform that combines IoT, AI, and analytics to optimize every stage of the agricultural cycle."
    },
    technologies: ["React Native", "Node.js", "MongoDB", "IoT"],
    results: {
      fr: ["+30% productivité", "-40% pertes post-récolte"],
      en: ["+30% productivity", "-40% post-harvest losses"]
    },
    icon: "🌾"
  },
  {
    name: "SmartGrenier",
    category: { fr: "IoT & IA", en: "IoT & AI" },
    desc: {
      fr: "Système de stockage intelligent piloté par IA pour conserver les céréales.",
      en: "AI-driven smart storage system for grain preservation."
    },
    fullDesc: {
      fr: "SmartGrenier utilise des capteurs IoT et l'IA pour monitorer les conditions de stockage.",
      en: "SmartGrenier uses IoT sensors and AI to monitor storage conditions."
    },
    technologies: ["Python", "TensorFlow", "IoT", "AWS"],
    results: {
      fr: ["-60% pertes stockage", "Monitoring 24/7"],
      en: ["-60% storage losses", "24/7 Monitoring"]
    },
    icon: "🏭"
  },
  {
    name: "DocuFlow",
    category: { fr: "Automatisation", en: "Automation" },
    desc: {
      fr: "Outil automatisé pour gérer et classer des documents professionnels.",
      en: "Automated tool to manage and classify professional documents."
    },
    fullDesc: {
      fr: "DocuFlow révolutionne la gestion documentaire avec l'IA et l'OCR.",
      en: "DocuFlow revolutionizes document management with AI and OCR."
    },
    technologies: ["Vue.js", "Python", "OCR", "AWS"],
    results: {
      fr: ["-90% temps de traitement", "Erreur zéro"],
      en: ["-90% processing time", "Zero error"]
    },
    icon: "📄"
  },
  {
    name: "StartKit",
    category: { fr: "Pack Digital", en: "Digital Pack" },
    desc: {
      fr: "Pack digital complet pour les startups (web, logo, comm).",
      en: "Complete digital pack for startups (web, logo, comm)."
    },
    fullDesc: {
      fr: "StartKit est une solution clé en main pour les startups qui veulent se lancer rapidement.",
      en: "StartKit is a turnkey solution for startups that want to launch quickly."
    },
    technologies: ["Next.js", "Figma", "Stripe"],
    results: { fr: ["Livraison 2 semaines", "98% satisfaction"], en: ["2-week delivery", "98% satisfaction"] },
    icon: "🚀"
  }
]

const categories = [
  { fr: "Tous", en: "All" },
  { fr: "AgriTech", en: "AgriTech" },
  { fr: "IoT & IA", en: "IoT & AI" },
  { fr: "Automatisation", en: "Automation" },
  { fr: "Pack Digital", en: "Digital Pack" }
]

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8 },
  }),
}

export default function PortfolioPage() {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("Tous")

  const filteredProjects = projects.filter(p => {
    if (activeCategory === "Tous" || activeCategory === "All") return true
    return (p.category as any)[language] === activeCategory
  })

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <img src="/vector2.png" alt="" className="w-96" />
      </div>
      <div className="absolute top-40 right-0 z-0 pointer-events-none opacity-50 dark:opacity-30 rotate-180">
        <img src="/vector1.png" alt="" className="w-96" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <Beam />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <TextAnimate
              className="text-5xl md:text-7xl font-light mb-6 serif tracking-tight"
              animation="blurInUp"
              duration={1}
            >
              {t("portfolio.title")}
            </TextAnimate>
          </motion.div>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 px-4 relative z-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, idx) => {
            const catName = (cat as any)[language]
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveCategory(catName)}
                className={`px-6 py-2 rounded-full text-sm font-light transition-all duration-300 border ${activeCategory === catName
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-black dark:hover:border-white"
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {catName}
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                className="group relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx % 2}
              >
                <div className="aspect-[4/3] rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out opacity-50 dark:opacity-30">
                    {project.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-medium border border-white/50 dark:border-zinc-800">
                      {(project.category as any)[language]}
                    </span>
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="text-3xl font-light mb-3 serif">
                    {project.name}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-500 font-light text-sm mb-4 leading-relaxed max-w-md">
                    {(project.desc as any)[language]}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-8">
                    {(project.results as any)[language].map((res: string, rIdx: number) => (
                      <div key={rIdx}>
                        <div className="text-xs font-medium">{res.split(" ")[0]}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-tighter">{res.split(" ").slice(1).join(" ")}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 border-t border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 serif tracking-tight">
              {t("portfolio.cta.title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light mb-10">
              {t("portfolio.cta.desc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-white dark:text-black bg-black dark:bg-white rounded-full hover:scale-105 transition-all duration-300 font-medium shadow-xl"
            >
              {t("portfolio.cta.btn")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}