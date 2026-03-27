"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Star, Monitor, Smartphone, Loader2, Download, ExternalLink } from "lucide-react"
import { getProjects } from "@/lib/services"

// ─── Fallback data (used when Supabase is not yet configured) ────────────────

const mobileAppsFallback: any[] = [
  {
    id: "agrona",
    name: "Agrona",
    developer: "Sorci Digit",
    category: "Productivité",
    rating: "4.8",
    rating_count: "1.2k",
    description:
      "L'application mobile de référence pour optimiser chaque étape du cycle agricole, des semences à la vente. Gérez vos rendements ou parcelles directement avec notre intelligence artificielle.",
    icon: "🌾",
    link: "https://agrona.sorcidigit.com/download.apk",
    screenshots: [
      "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=600&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=600&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&h=1200&fit=crop",
    ],
  },
  {
    id: "healthconnect",
    name: "HealthConnect",
    developer: "Sorci Digit",
    category: "Santé et forme",
    rating: "4.9",
    rating_count: "850",
    description:
      "Plateforme de télémédecine complète. Consultez des médecins en vidéo, prenez vos rendez-vous instantanément et recevez vos ordonnances sécurisées sur votre téléphone.",
    icon: "🏥",
    link: "https://healthconnect.sorcidigit.com/download.apk",
    screenshots: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=1200&fit=crop",
    ],
  },
  {
    id: "payflow",
    name: "PayFlow",
    developer: "Sorci Digit",
    category: "Finance",
    rating: "4.9",
    rating_count: "3.4k",
    description:
      "Gérez vos finances en toute simplicité. Suivez vos dépenses, transférez de l'argent instantanément et accédez à vos statistiques mensuelles dans une interface sécurisée et intuitive.",
    icon: "💸",
    link: "https://payflow.sorcidigit.com/download.apk",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?q=80&w=600&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&h=1200&fit=crop",
    ],
  },
]

const webProjectsFallback: any[] = [
  {
    id: "docuflow",
    name: "DocuFlow",
    category: "Plateforme SaaS",
    description:
      "Automatisation de la gestion documentaire avec IA intégrée. Vos documents sont traités, classés et archivés en temps réel sans intervention humaine.",
    icon: "📄",
    technologies: ["Vue.js", "Python", "OCR", "AWS"],
    color: "bg-blue-50 text-blue-500",
    screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=800&fit=crop"],
    link: "https://docuflow.sorcidigit.com",
  },
  {
    id: "ecotrack",
    name: "EcoTrack",
    category: "Tableau de Bord B2B",
    description:
      "Suivi environnemental pour les entreprises industrielles. Mesurez, réduisez et compensez votre impact environnemental grâce à nos sondes IoT connectées.",
    icon: "🌱",
    technologies: ["React", "Node.js", "PostgreSQL", "IoT"],
    color: "bg-emerald-50 text-emerald-500",
    screenshots: ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&h=800&fit=crop"],
    link: "https://ecotrack.sorcidigit.com",
  },
  {
    id: "startkit",
    name: "StartKit",
    category: "E-Commerce & Vitrine",
    description:
      "Identité digitale complète pour les marques ambitieuses : boutiques ultra-rapides, parcours d'achat optimisé et design sur mesure.",
    icon: "🚀",
    technologies: ["Next.js", "Tailwind", "Stripe", "Sanity"],
    color: "bg-orange-50 text-orange-500",
    screenshots: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=800&fit=crop"],
    link: "https://startkit.sorcidigit.com",
  },
  {
    id: "smartgrenier",
    name: "SmartGrenier",
    category: "Dashboard IoT",
    description:
      "Système de stockage intelligent piloté par IA pour conserver les céréales plus longtemps et réduire la perte agricole de 60%.",
    icon: "🏭",
    technologies: ["TensorFlow", "React", "Cloud"],
    color: "bg-purple-50 text-purple-500",
    screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=800&fit=crop"],
    link: "https://smartgrenier.sorcidigit.com",
  },
]

// ─── Animation variants ──────────────────────────────────────────────────────

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

// ─── Page component ──────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"mobile" | "web">("mobile")
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        console.error("Erreur de chargement des projets :", err)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const mobileApps =
    projects.filter((p) => p.type === "mobile").length > 0
      ? projects.filter((p) => p.type === "mobile")
      : mobileAppsFallback

  const webProjects =
    projects.filter((p) => p.type === "web").length > 0
      ? projects.filter((p) => p.type === "web")
      : webProjectsFallback

  return (
    <div className="min-h-screen bg-[#fafafa] text-black pt-32 pb-24 px-4 overflow-hidden font-sans">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-gray-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 grotesk"
          >
            Réalisations
          </motion.span>
          <motion.h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-[6rem] font-medium mb-6 text-black tracking-tight serif italic leading-[1.1] md:leading-[1]"
            variants={fadeUp}
            custom={1}
          >
            Notre <span className="not-italic font-bold">Portfolio.</span>
          </motion.h1>
          <motion.p
            className="text-gray-500 text-lg md:text-2xl max-w-2xl mx-auto grotesk leading-relaxed"
            variants={fadeUp}
            custom={2}
          >
            Découvrez nos plateformes web hautes performances et nos applications mobiles 5 étoiles.
          </motion.p>
        </motion.div>

        {/* Toggle Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex p-1 sm:p-1.5 bg-gray-200/50 backdrop-blur-md rounded-full max-w-[280px] xs:max-w-sm mx-auto mb-10 sm:mb-16 border border-gray-200/50"
        >
          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 rounded-full font-bold text-[10px] xs:text-xs sm:text-sm transition-all duration-300 grotesk ${activeTab === "mobile" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black hover:bg-white/50"}`}
          >
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Apps
          </button>
          <button
            onClick={() => setActiveTab("web")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 rounded-full font-bold text-[10px] xs:text-xs sm:text-sm transition-all duration-300 grotesk ${activeTab === "web" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black hover:bg-white/50"}`}
          >
            <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Web
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">

          {/* ── MOBILE TAB ─────────────────────────────────────────────── */}
          {activeTab === "mobile" && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-16"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-300 mb-4" />
                  <p className="text-gray-400 grotesk">Chargement des applications...</p>
                </div>
              ) : (
                mobileApps.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-[3rem] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden"
                  >
                    {/* App Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 px-2 md:px-4">
                      <div className="flex items-center gap-5 md:gap-6">
                        {/* Icon Container with App Store Aesthetic */}
                        <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[1.2rem] sm:rounded-[1.8rem] bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 flex-shrink-0 overflow-hidden relative group">
                          <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                          {project.icon?.startsWith("http") || project.icon?.startsWith("/") ? (
                            <img src={project.icon} alt={project.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-sm select-none">
                              {project.icon}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight tracking-tight truncate">
                            {project.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm md:text-base font-semibold grotesk mt-0.5 tracking-tight">
                            {project.developer || "Sorci Digit"}
                          </p>
                          <div className="flex items-center gap-1 mt-1.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-[10px] sm:text-xs text-gray-400 font-bold ml-1.5 grotesk">
                              {project.rating_count || project.ratingCount || "0"} notes
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto flex flex-col items-center sm:items-end">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            download={project.link.includes('supabase') || project.link.endsWith('.apk')}
                            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 grotesk flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95"
                          >
                            <Download className="w-4 h-4" />
                            Télécharger
                          </a>
                        ) : (
                          <button className="w-full sm:w-auto bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0ea5e9] font-extrabold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors grotesk flex items-center justify-center gap-2">
                            OBTENIR
                          </button>
                        )}
                        <p className="text-[9px] sm:text-[10px] text-gray-400 text-center sm:text-right mt-2 grotesk font-medium tracking-tight">
                          {project.link ? "Téléchargement direct · APK" : "Bientôt disponible"}
                        </p>
                      </div>
                    </div>

                    {/* App Description */}
                    <div className="px-2 md:px-4 mb-10">
                      <p className="text-gray-500 grotesk text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Screenshots */}
                    <div className="flex gap-4 overflow-x-auto pb-6 px-2 md:px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {(project.screenshots || []).map((bg: string, i: number) => {
                        const isReal = bg.startsWith("http") || bg.startsWith("/")
                        return (
                          <div
                            key={i}
                            className={`w-[220px] md:w-[260px] h-[460px] md:h-[540px] flex-shrink-0 snap-center rounded-[2.5rem] md:rounded-[3rem] relative shadow-lg flex flex-col ${
                              isReal ? "border-[8px] md:border-[12px] border-[#1c1c1e] bg-black" : `border-[8px] border-white overflow-hidden ${bg.startsWith("from-") ? `bg-gradient-to-br ${bg}` : ""}`
                            }`}
                            style={!isReal && !bg.startsWith("from-") ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                          >
                            {/* ----- REAL IMAGE (iPhone Mockup) ----- */}
                            {isReal && (
                              <>
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[20px] md:h-[24px] bg-[#1c1c1e] rounded-b-3xl z-10" />
                                {/* Screen Area */}
                                <div className="relative w-full h-full flex-1 rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden bg-gray-100">
                                  <img 
                                    src={bg} 
                                    alt="Screenshot" 
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                              </>
                            )}

                            {/* ----- FALLBACK GRADIENT (Mock UI) ----- */}
                            {!isReal && (
                              <>
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black/10 rounded-full backdrop-blur-sm" />
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-black/20 rounded-full" />
                                <div className="p-6 pt-16 h-full flex flex-col gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md" />
                                    <div className="h-4 w-24 bg-white/40 rounded flex-1" />
                                  </div>
                                  <div className="h-32 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-6xl shadow-sm">
                                    {project.icon}
                                  </div>
                                  <div className="h-6 w-3/4 bg-white/40 rounded mt-4" />
                                  <div className="h-4 w-full bg-white/20 rounded" />
                                  <div className="h-4 w-5/6 bg-white/20 rounded" />
                                  <div className="mt-auto h-12 rounded-xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                                    <span className="text-white/80 font-bold text-sm grotesk">Continuer</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {/* ── WEB TAB ────────────────────────────────────────────────── */}
          {activeTab === "web" && (
            <motion.div
              key="web"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {loading ? (
                <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-gray-300 mb-4" />
                  <p className="text-gray-400 grotesk">Chargement des projets...</p>
                </div>
              ) : (
                webProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className={`${idx === 0 || idx === 3 ? "md:col-span-2" : ""} group`}
                  >
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden h-full flex flex-col">

                      {/* Browser Bar */}
                      <div className="bg-[#fafafa] px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 flex items-center gap-2">
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="ml-2 sm:ml-4 flex-1 h-7 sm:h-8 bg-white rounded-md border border-gray-200/50 flex items-center px-2 sm:px-3 gap-2 max-w-[120px] xs:max-w-xs sm:max-w-sm">
                          {/* Favicon */}
                          {project.icon?.startsWith("http") || project.icon?.startsWith("/") ? (
                            <img src={project.icon} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm flex-shrink-0 object-contain" />
                          ) : (
                            <span className="text-[10px] sm:text-sm leading-none flex-shrink-0">{project.icon}</span>
                          )}
                          <span className="text-[9px] sm:text-[11px] text-gray-400 font-mono tracking-tighter truncate">
                            {project.link
                              ? project.link.replace(/^https?:\/\//, "")
                              : `sorcidigit.com/projects/${project.id}`}
                          </span>
                        </div>
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            onClick={e => e.stopPropagation()}
                            className="ml-auto flex-shrink-0 flex items-center gap-1 bg-black text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg grotesk hover:bg-gray-800 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" /> <span className="hidden xs:inline">Visiter</span>
                          </Link>
                        )}
                      </div>

                      {/* Website screenshot preview */}
                      {(project.screenshots || []).length > 0 && project.screenshots![0]?.startsWith("http") && (
                        <Link
                          href={project.link || "#"}
                          target={project.link ? "_blank" : undefined}
                          className="block relative overflow-hidden bg-gray-100 border-b border-gray-100 cursor-pointer"
                          style={{ height: idx === 0 || idx === 3 ? "280px" : "200px" }}
                        >
                          <img
                            src={project.screenshots![0]}
                            alt={project.name}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-4 py-2 rounded-full grotesk flex items-center gap-1.5 shadow-lg">
                              <ExternalLink className="w-3 h-3" /> Ouvrir le site
                            </span>
                          </div>
                        </Link>
                      )}

                      {/* Project Content */}
                      <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl ${project.color || "bg-gray-50 text-gray-500"} border border-gray-100/50 shadow-sm flex-shrink-0 overflow-hidden`}>
                            {project.icon?.startsWith("http") || project.icon?.startsWith("/") ? (
                              <img src={project.icon} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="select-none">{project.icon}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest grotesk block truncate">
                              {project.category}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight leading-loose truncate">
                              {project.name}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm md:text-base grotesk mb-6 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-5 border-t border-gray-50">
                          <div className="flex flex-wrap gap-2">
                            {(project.technologies || []).map((tag: string) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-[#fafafa] border border-gray-100 rounded-lg text-xs font-bold text-gray-500 grotesk"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={project.link || "#"}
                            target={project.link ? "_blank" : undefined}
                            className="flex items-center gap-1.5 text-black font-bold text-sm grotesk group-hover:text-blue-600 transition-colors"
                          >
                            Découvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 max-w-3xl mx-auto text-center"
        >
          <div className="bg-white rounded-[3rem] p-12 py-20 border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-black serif italic relative z-10">
              Prêt à concevoir la vôtre ?
            </h2>
            <p className="text-gray-500 mb-10 text-lg grotesk max-w-lg mx-auto relative z-10">
              Que ce soit une application native 5 étoiles ou une plateforme web complexe, nous avons l'équipe qu'il vous faut.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_40px_rgba(0,0,0,0.1)] grotesk z-10"
            >
              <span className="relative z-10">Démarrer votre projet</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gray-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}