"use client"

import { motion, Variants } from "framer-motion"
import { Link } from "lucide-react"

const projects = [
  {
    name: "Agrona",
    category: "AgriTech",
    desc: "Application mobile révolutionnaire pour aider les agriculteurs à mieux gérer leurs cultures, récoltes et ventes.",
    fullDesc: "Agrona est une plateforme complète qui combine IoT, IA et analytics pour optimiser chaque étape du cycle agricole. L'application permet aux agriculteurs de suivre leurs cultures en temps réel, prévoir les récoltes, gérer l'inventaire et vendre directement aux consommateurs.",
    technologies: ["React Native", "Node.js", "MongoDB", "IoT", "Machine Learning"],
    results: [
      "30% d'augmentation de la productivité",
      "Réduction de 40% des pertes post-récolte",
      "15 000+ agriculteurs utilisateurs",
      "Prix Innovation Agricole 2023"
    ],
    image: "/public/projets/ecom.jpg",
    icon: "🌾"
  },
  {
    name: "SmartGrenier",
    category: "IoT & IA",
    desc: "Système de stockage intelligent piloté par IA pour conserver les céréales plus longtemps.",
    fullDesc: "SmartGrenier utilise des capteurs IoT et l'intelligence artificielle pour monitorer automatiquement les conditions de stockage (température, humidité, ventilation) et optimiser la conservation des céréales. Le système prévient les pertes et améliore la qualité des stocks.",
    technologies: ["Python", "TensorFlow", "IoT", "AWS", "React"],
    results: [
      "Réduction de 60% des pertes de stockage",
      "Économies de 25% sur les coûts de conservation",
      "Monitoring 24/7 automatisé",
      "Certification qualité ISO"
    ],
    image: "/public/projets/engagement.jpg",
    icon: "🏭"
  },
  {
    name: "DocuFlow",
    category: "Automatisation",
    desc: "Outil automatisé pour gérer, classer et envoyer des documents administratifs ou professionnels.",
    fullDesc: "DocuFlow révolutionne la gestion documentaire avec l'IA. L'application scanne, classe automatiquement et route les documents vers les bonnes personnes. Elle intègre la reconnaissance de texte, la signature électronique et l'archivage sécurisé.",
    technologies: ["Vue.js", "Python", "OCR", "Blockchain", "AWS"],
    results: [
      "90% de réduction du temps de traitement",
      "Élimination des erreurs de classement",
      "Conformité RGPD garantie",
      "1000+ entreprises clientes"
    ],
    image: "/public/projets/pro2.jpg",
    icon: "📄"
  },
  {
    name: "StartKit",
    category: "Pack Digital",
    desc: "Pack digital complet pour les startups (site web, logo, communication rapide).",
    fullDesc: "StartKit est une solution clé en main pour les startups qui veulent se lancer rapidement. Le pack inclut un site web moderne, une identité visuelle complète, des templates de communication et une formation pour l'équipe.",
    technologies: ["Next.js", "Figma", "Stripe", "Mailchimp", "Google Analytics"],
    results: [
      "Livraison en 2 semaines",
      "100+ startups accompagnées",
      "Taux de satisfaction 98%",
      "ROI moyen de 300%"
    ],
    image: "/public/projets/pro3.jpg",
    icon: "🚀"
  },
  {
    name: "EcoTrack",
    category: "SaaS",
    desc: "Plateforme de suivi environnemental pour les entreprises et collectivités.",
    fullDesc: "EcoTrack aide les organisations à mesurer, réduire et compenser leur impact environnemental. La plateforme combine IoT, analytics et reporting pour fournir des insights actionnables et des recommandations personnalisées.",
    technologies: ["React", "Node.js", "PostgreSQL", "D3.js", "Docker"],
    results: [
      "Réduction moyenne de 35% de l'empreinte carbone",
      "500+ entreprises utilisatrices",
      "Certification ISO 14001 facilitée",
      "Prix Green Tech 2023"
    ],
    image: "/public/projets/ecommerce.jpg",
    icon: "🌱"
  },
  {
    name: "HealthConnect",
    category: "HealthTech",
    desc: "Application de télémédecine pour connecter patients et médecins.",
    fullDesc: "HealthConnect révolutionne l'accès aux soins avec une plateforme de télémédecine complète. L'application permet les consultations vidéo, la prescription électronique, le suivi médical et l'intégration avec les systèmes de santé existants.",
    technologies: ["Flutter", "WebRTC", "Firebase", "HIPAA", "Stripe"],
    results: [
      "50 000+ consultations réalisées",
      "Réduction de 70% des temps d'attente",
      "Accès aux soins en zones rurales",
      "Certification médicale obtenue"
    ],
    image: "/public/projets/reservation.jpg",
    icon: "🏥"
  }
]

const categories = ["Tous", "AgriTech", "IoT & IA", "Automatisation", "Pack Digital", "SaaS", "HealthTech"]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
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

export default function ProjetsPage() {
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
            Nos Projets
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg font-light"
            variants={fadeUp}
            custom={1}
          >
            Découvrez nos réalisations qui transforment les entreprises et impactent les communautés
          </motion.p>
        </motion.div>
      </section>

      {/* Filtres */}
      <section className="py-8 px-4 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, idx) => (
              <motion.button
                key={category}
                className="px-6 py-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors font-light"
                variants={fadeUp}
                custom={idx}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projets */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                className="mb-20 last:mb-0"
                variants={fadeUp}
                custom={idx}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Image */}
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/3 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{project.icon}</div>
                        <div className="text-white/60 text-sm">{project.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{project.icon}</span>
                      <span className="text-white/60 text-sm">{project.category}</span>
                    </div>
                    <h2 className="text-3xl font-normal mb-4 text-white/90">{project.name}</h2>
                    <p className="text-gray-300 font-light mb-6">{project.fullDesc}</p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-white/90">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 font-light">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Résultats */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-white/90">Résultats</h3>
                      <ul className="space-y-2">
                        {project.results.map((result, resultIdx) => (
                          <li key={resultIdx} className="flex items-start">
                            <span className="text-green-400 mr-3 mt-1">✓</span>
                            <span className="text-gray-300 font-light text-sm">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
            Votre projet ici ?
          </motion.h2>
          <motion.p 
            className="text-gray-300 mb-6 font-light"
            variants={fadeUp}
            custom={1}
          >
            Transformons votre idée en réalité avec notre expertise
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Link 
              href="/contact" 
              className="inline-block bg-white/90 text-black font-normal px-7 py-3 rounded-full border border-white/20 hover:bg-white transition-colors"
            >
              Discuter de votre projet
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
} 