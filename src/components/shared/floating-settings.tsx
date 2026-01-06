"use client"

import { useTheme } from "next-themes"
import { useLanguage } from "../language-provider"
import { Sun, Moon, Languages, Laptop, Settings2, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingSettings() {
    const { theme, setTheme } = useTheme()
    const { language, setLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-3 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[160px]"
                    >
                        {/* Section Langue */}
                        <div className="p-2">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 px-2 font-bold">
                                {language === 'fr' ? 'Langue' : 'Language'}
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                <button
                                    onClick={() => setLanguage("fr")}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${language === 'fr' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                >
                                    FR
                                </button>
                                <button
                                    onClick={() => setLanguage("en")}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${language === 'en' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2" />

                        {/* Section Thème */}
                        <div className="p-2">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 px-2 font-bold">
                                {language === 'fr' ? 'Apparence' : 'Appearance'}
                            </p>
                            <div className="grid grid-cols-3 gap-1">
                                <button
                                    onClick={() => setTheme("light")}
                                    className={`p-2 rounded-xl flex items-center justify-center transition-all ${theme === 'light' ? 'bg-yellow-500/10 text-yellow-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400'}`}
                                    title="Light"
                                >
                                    <Sun className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className={`p-2 rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-orange-500/10 text-orange-500' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400'}`}
                                    title="Dark"
                                >
                                    <Moon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setTheme("system")}
                                    className={`p-2 rounded-xl flex items-center justify-center transition-all ${theme === 'system' ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400'}`}
                                    title="System"
                                >
                                    <Laptop className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bouton Principal (Trigger) */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleOpen}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-zinc-900 text-white dark:bg-white dark:text-black rotate-90' : 'bg-white text-black dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800'}`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Settings2 className="w-6 h-6" />}
            </motion.button>
        </div>
    )
}
