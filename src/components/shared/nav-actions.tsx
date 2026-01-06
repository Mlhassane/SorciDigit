"use client"

import { useTheme } from "next-themes"
import { useLanguage } from "../language-provider"
import { Sun, Moon, Languages, Laptop, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function NavActions() {
    const { theme, setTheme } = useTheme()
    const { language, setLanguage } = useLanguage()
    const [mounted, setMounted] = useState(false)

    // Éviter les erreurs d'hydratation
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200 dark:border-zinc-700 backdrop-blur-md">
            {/* Langue */}
            <button
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white dark:hover:bg-zinc-700 transition-all duration-300 group"
            >
                <Languages className="w-4 h-4 text-zinc-500 group-hover:text-black dark:group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {language}
                </span>
            </button>

            <div className="w-[1px] h-4 bg-zinc-300 dark:bg-zinc-600 mx-1" />

            {/* Thème Cycle (Light -> Dark -> System) */}
            <button
                onClick={() => {
                    if (theme === 'light') setTheme('dark')
                    else if (theme === 'dark') setTheme('system')
                    else setTheme('light')
                }}
                className="p-1.5 rounded-full hover:bg-white dark:hover:bg-zinc-700 transition-all duration-300 group"
                title={`Thème actuel: ${theme}`}
            >
                {theme === "dark" && <Moon className="w-4 h-4 text-orange-300" />}
                {theme === "light" && <Sun className="w-4 h-4 text-yellow-500" />}
                {theme === "system" && <Laptop className="w-4 h-4 text-blue-400" />}
            </button>
        </div>
    )
}
