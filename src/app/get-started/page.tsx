"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import React, { FormEvent, useState } from "react"
import { Mail, Phone, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react"

const contactMethods = [
  {
    title: "Email",
    value: "contact@sorcidigit.com",
    desc: "Pour toute question ou demande de devis",
    icon: <Mail className="w-6 h-6 text-black" />,
    href: "mailto:contact@sorcidigit.com"
  },
  {
    title: "Téléphone",
    value: "+227 77042181",
    desc: "Du lundi au samedi, 9h-18h",
    icon: <Phone className="w-6 h-6 text-black" />,
    href: "tel:+22777042181"
  },
  {
    title: "WhatsApp",
    value: "+227 77042181",
    desc: "Réponse rapide pour les urgences",
    icon: <MessageSquare className="w-6 h-6 text-black" />,
    href: "https://wa.me/+22777042181"
  }
]

const services = [
  "Branding & Design",
  "Création de site vitrine",
  "Site E-commerce",
  "Application Web / Mobile",
  "Audit & SEO",
  "Marketing & Réseaux sociaux",
  "Autre projet"
]

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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      budget: formData.get("budget") as string,
      project: formData.get("project") as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }

      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 5000)
      e.currentTarget.reset()
    } catch (error) {
      setFormError("Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-black pt-32 pb-24 px-4 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-gray-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center md:text-left mb-16 md:mb-24"
        >
          <motion.span
            variants={fadeUp} custom={0}
            className="inline-block text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-6 grotesk"
          >
         On commence ici
          </motion.span>
          <motion.h1
            className="text-6xl md:text-[6rem] font-medium mb-6 text-black tracking-tight serif italic leading-[1]"
            variants={fadeUp}
            custom={1}
          >
            Et si on parlait de votre <span className="italic block md:inline font-semi-bold">projet.</span>
          </motion.h1>
          <motion.p
            className="text-gray-500 text-lg md:text-2xl max-w-2xl "
            variants={fadeUp}
            custom={2}
          >
            Vous avez une idée ambitieuse ? Nous avons l'expertise pour la réaliser. Discutons de vos objectifs.
          </motion.p>
        </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-8"
          >
            <motion.div
              variants={fadeUp}
              custom={4}
              className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.03)]"
            >
              <h2 className="text-3xl font-bold mb-8 text-black serif italic">Dites nous plus sur votre projet</h2>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50/50 border border-green-200 rounded-2xl p-6 mb-8 flex items-center gap-4 text-green-800 grotesk"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Message envoyé avec succès</h4>
                    <p className="text-green-700/80 text-sm">Nous avons bien reçu votre demande et nous vous recontacterons sous 24h.</p>
                  </div>
                </motion.div>
              )}

              {formError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50/50 border border-red-200 rounded-2xl p-4 mb-8 text-red-600 grotesk text-sm font-medium"
                >
                  {formError}
                </motion.div>
              )}

              <form className="space-y-6 grotesk" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="firstName">
                      Prénom <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-300 outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="lastName">
                      Nom <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-300 outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="email">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-300 outline-none"
                      placeholder="john@entreprise.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="phone">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-300 outline-none"
                      placeholder="+227 00 00 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="service">
                    Service souhaité <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-300 outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Sélectionnez un domaine d'expertise</option>
                      {services.map((service, idx) => (
                        <option key={idx} value={service} className="text-black">{service}</option>
                      ))}
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="project">
                    Parlez-nous de votre projet <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl bg-[#fafafa] border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-300 outline-none resize-none"
                    placeholder="Objectifs, vision, contraintes..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-black text-white rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_40px_rgba(0,0,0,0.1)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-wait"
                  >
                    <span className="relative z-10">{isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}</span>
                    {!isSubmitting && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                    <div className="absolute inset-0 bg-gray-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                  </button>
                  <p className="mt-4 text-xs text-gray-400">
                    Vos données sont confidentielles. Nous détestons le spam autant que vous.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>

      </div>
    </div>
  )
}