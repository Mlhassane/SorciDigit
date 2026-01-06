"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Beam } from "@/components/ui/gridbeam"

const services = [
  {
    title: {
      fr: "Création d'applications web & mobiles",
      en: "Web & Mobile App Development"
    },
    desc: {
      fr: "Développement d'applications sur mesure pour répondre à vos besoins spécifiques.",
      en: "Custom application development to meet your specific needs."
    },
    details: {
      fr: [
        "Applications web modernes et responsives",
        "Applications mobiles iOS et Android",
        "Interfaces utilisateur intuitives",
        "Intégration avec vos systèmes existants",
        "Maintenance et support technique"
      ],
      en: [
        "Modern and responsive web applications",
        "iOS and Android mobile applications",
        "Intuitive user interfaces",
        "Integration with your existing systems",
        "Maintenance and technical support"
      ]
    },
    icon: "💻"
  },
  {
    title: {
      fr: "Digitalisation & automatisation des processus métiers",
      en: "Business Process Digitalization & Automation"
    },
    desc: {
      fr: "Optimisez vos processus grâce à la technologie et l'automatisation intelligente.",
      en: "Optimize your processes with technology and intelligent automation."
    },
    details: {
      fr: [
        "Audit de vos processus actuels",
        "Conception de solutions automatisées",
        "Intégration de systèmes ERP/CRM",
        "Formation de vos équipes",
        "Suivi et optimisation continue"
      ],
      en: [
        "Audit of your current processes",
        "Design of automated solutions",
        "ERP/CRM system integration",
        "Team training",
        "Continuous monitoring and optimization"
      ]
    },
    icon: "⚙️"
  },
  {
    title: {
      fr: "Solutions pour l'agriculture intelligente (AgriTech)",
      en: "Smart Agriculture Solutions (AgriTech)"
    },
    desc: {
      fr: "Technologies innovantes pour moderniser l'agriculture et améliorer la productivité.",
      en: "Innovative technologies to modernize agriculture and improve productivity."
    },
    details: {
      fr: [
        "Applications de gestion des cultures",
        "Systèmes de monitoring IoT",
        "Solutions de stockage intelligent",
        "Plateformes de vente directe",
        "Analytics et prévisions météo"
      ],
      en: [
        "Crop management applications",
        "IoT monitoring systems",
        "Smart storage solutions",
        "Direct sales platforms",
        "Analytics and weather forecasting"
      ]
    },
    icon: "🌾"
  },
  {
    title: {
      fr: "Création de sites vitrines & e-commerce",
      en: "Showcase & E-commerce Website Creation"
    },
    desc: {
      fr: "Sites web professionnels qui convertissent vos visiteurs en clients.",
      en: "Professional websites that convert your visitors into customers."
    },
    details: {
      fr: [
        "Sites vitrines modernes et élégants",
        "Boutiques en ligne complètes",
        "Optimisation SEO et performance",
        "Intégration de moyens de paiement",
        "Analytics et suivi des conversions"
      ],
      en: [
        "Modern and elegant showcase sites",
        "Complete online stores",
        "SEO and performance optimization",
        "Payment method integration",
        "Analytics and conversion tracking"
      ]
    },
    icon: "🛒"
  },
  {
    title: {
      fr: "Design graphique & identité de marque",
      en: "Graphic Design & Brand Identity"
    },
    desc: {
      fr: "Créez une identité visuelle forte qui vous démarque de la concurrence.",
      en: "Create a strong visual identity that sets you apart from the competition."
    },
    details: {
      fr: [
        "Logo et charte graphique",
        "Supports de communication",
        "Design d'interfaces utilisateur",
        "Branding et positionnement",
        "Guidelines et documentation"
      ],
      en: [
        "Logo and graphic charter",
        "Communication materials",
        "User interface design",
        "Branding and positioning",
        "Guidelines and documentation"
      ]
    },
    icon: "🎨"
  },
  {
    title: {
      fr: "Accompagnement stratégique et conseil en innovation",
      en: "Strategic Support & Innovation Consulting"
    },
    desc: {
      fr: "Stratégie digitale sur mesure pour transformer votre entreprise.",
      en: "Tailored digital strategy to transform your business."
    },
    details: {
      fr: [
        "Audit digital complet",
        "Roadmap de transformation",
        "Formation et accompagnement",
        "Veille technologique",
        "Suivi des objectifs"
      ],
      en: [
        "Complete digital audit",
        "Transformation roadmap",
        "Training and support",
        "Technological watch",
        "Target tracking"
      ]
    },
    icon: "🚀"
  }
]

const process = {
  fr: [
    { step: "01", title: "Découverte", desc: "Nous analysons vos besoins, objectifs et contraintes." },
    { step: "02", title: "Stratégie", desc: "Nous définissons ensemble la meilleure approche." },
    { step: "03", title: "Conception", desc: "Nous créons les maquettes et prototypes." },
    { step: "04", title: "Développement", desc: "Nous développons votre solution avec soin." },
    { step: "05", title: "Livraison", desc: "Nous testons, déployons et formons vos équipes." },
    { step: "06", title: "Suivi", desc: "Nous assurons la maintenance et l'optimisation." }
  ],
  en: [
    { step: "01", title: "Discovery", desc: "We analyze your needs, goals and constraints." },
    { step: "02", title: "Strategy", desc: "We define together the best approach." },
    { step: "03", title: "Design", desc: "We create mockups and prototypes." },
    { step: "04", title: "Development", desc: "We develop your solution with care." },
    { step: "05", title: "Delivery", desc: "We test, deploy and train your teams." },
    { step: "06", title: "Follow-up", desc: "We ensure maintenance and optimization." }
  ]
}

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8 },
  }),
}

export default function ServicesPage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <img src="/vector1.png" alt="" className="w-96" />
      </div>
      <div className="absolute top-20 left-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <img src="/vector2.png" alt="" className="w-96" />
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
              {t("services.title")}
            </TextAnimate>
          </motion.div>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            {t("services.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm hover:border-black dark:hover:border-white transition-all duration-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-6 bg-white dark:bg-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-normal mb-4 serif tracking-tight">
                  {(service.title as any)[language]}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-light mb-6 text-sm leading-relaxed">
                  {(service.desc as any)[language]}
                </p>
                <ul className="space-y-3">
                  {(service.details as any)[language].map((detail: string, dIdx: number) => (
                    <li key={dIdx} className="flex items-start gap-3 text-xs text-zinc-500 dark:text-zinc-500 font-light">
                      <span className="mt-1 w-1 h-1 rounded-full bg-black dark:bg-white shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
          <img src="/vector4.png" alt="" className="absolute -bottom-20 left-0 w-[500px]" />
          <img src="/vector3.png" alt="" className="absolute top-0 right-0 w-[500px]" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-light mb-16 text-center serif tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {t("services.process.title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {(process as any)[language].map((item: any, idx: number) => (
              <motion.div
                key={idx}
                className="relative pl-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
              >
                <div className="absolute left-0 top-0 text-3xl font-light text-zinc-300 dark:text-zinc-800 serif">
                  {item.step}
                </div>
                <h4 className="text-lg font-normal mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 serif tracking-tight">
              {t("services.cta.title")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light mb-10">
              {t("services.cta.desc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-white dark:text-black bg-black dark:bg-white rounded-full hover:scale-105 transition-all duration-300 font-medium shadow-xl"
            >
              {t("services.cta.btn")}
            </Link>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinc-100 dark:bg-zinc-900/20 blur-3xl -z-10 rounded-full" />
      </section>
    </div>
  )
}