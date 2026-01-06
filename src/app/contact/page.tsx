"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Beam } from "@/components/ui/gridbeam"
import { FormEvent, useState } from "react"
import { Mail, Phone, MessageSquare, ChevronRight } from "lucide-react"

const contactMethods = [
  {
    title: { fr: "Email", en: "Email" },
    value: "contact@sorcidigit.com",
    icon: <Mail className="w-6 h-6" />,
    href: "mailto:contact@sorcidigit.com"
  },
  {
    title: { fr: "Téléphone", en: "Phone" },
    value: "+227 77042181",
    icon: <Phone className="w-6 h-6" />,
    href: "tel:+22777042181"
  },
  {
    title: { fr: "WhatsApp", en: "WhatsApp" },
    value: "+227 77042181",
    icon: <MessageSquare className="w-6 h-6" />,
    href: "https://wa.me/+22777042181"
  }
]

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8 },
  }),
}

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 5000)
      e.currentTarget.reset()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <img src="/vector1.png" alt="" className="w-[500px]" />
      </div>
      <div className="absolute bottom-0 left-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <img src="/vector5.png" alt="" className="w-[500px]" />
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
              {t("contact.title")}
            </TextAnimate>
          </motion.div>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Contact Info */}
            <div className="lg:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {contactMethods.map((method, idx) => (
                  <motion.a
                    key={idx}
                    href={method.href}
                    className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all duration-500"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={idx}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                      {method.icon}
                    </div>
                    <h3 className="text-zinc-400 dark:text-zinc-500 text-xs font-medium uppercase tracking-widest mb-2">
                      {(method.title as any)[language]}
                    </h3>
                    <p className="text-xl font-light truncate">
                      {method.value}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <motion.div
                className="p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h2 className="text-3xl font-light mb-10 serif tracking-tight">
                  {t("contact.form.title")}
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 mb-8 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl border border-green-200 dark:border-green-800 text-center font-light text-sm"
                  >
                    {t("contact.form.success")}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1 font-medium">{t("contact.form.firstName")}</label>
                      <input required type="text" className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 px-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1 font-medium">{t("contact.form.lastName")}</label>
                      <input required type="text" className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 px-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1 font-medium">{t("contact.form.email")}</label>
                    <input required type="email" className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 px-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1 font-medium">{t("contact.form.project")}</label>
                    <textarea required rows={4} className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 px-1 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light resize-none" />
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="group flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar / Appointment */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                className="p-10 rounded-[2.5rem] bg-zinc-950 text-white relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 blur-3xl -z-0 rounded-full" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-light mb-4 serif tracking-tight">
                    {t("contact.appointment.title")}
                  </h3>
                  <p className="text-zinc-400 font-light mb-8 text-sm leading-relaxed">
                    {t("contact.appointment.desc")}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors font-medium text-sm"
                  >
                    {t("contact.appointment.btn")}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
              >
                <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 mb-6 font-medium">Social</h4>
                <div className="flex flex-col gap-4">
                  <Link href="#" className="flex items-center justify-between group">
                    <span className="font-light hover:underline italic">LinkedIn</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between group">
                    <span className="font-light hover:underline italic">Instagram</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="#" className="flex items-center justify-between group">
                    <span className="font-light hover:underline italic">X (formerly Twitter)</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
