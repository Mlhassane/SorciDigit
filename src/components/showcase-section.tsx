"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface Project {
  id: number
  title: string
  category: string
  image: string
}

export default function ShowcaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const projects: Project[] = [
    {
      id: 1,
      title: "Harmonie Studio",
      category: "Design & Développement",
      image: "/projets/ecom.jpg",
    },
    {
      id: 2,
      title: "Lumina",
      category: "E-commerce",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "Éclat Digital",
      category: "Branding",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 4,
      title: "Zenith",
      category: "Application Web",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="showcase" className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-monument">Nos réalisations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-clash">
            Découvrez notre portfolio de projets où chaque pixel est pensé pour créer une expérience utilisateur
            exceptionnelle.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <motion.div
                className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
              >
                <p className="text-sm font-clash uppercase tracking-wider text-pink-300 mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold font-monument">{project.title}</h3>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                      className="w-5 h-0.5 bg-white"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-sm font-clash">Voir le projet</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            className="bg-white/80 backdrop-blur-sm text-black px-10 py-4 rounded-full border border-gray-200 hover:shadow-xl hover:shadow-purple-200/30 transition-all font-clash font-bold tracking-wider"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            Voir tous les projets
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
