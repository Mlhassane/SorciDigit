"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        sessionStorage.setItem("admin_auth", "true")
        router.push("/admin")
      } else {
        setError("Mot de passe incorrect.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 font-sans">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-gray-200/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-gray-200/30 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_60px_rgba(0,0,0,0.06)] p-10 md:p-12">
          {/* Icon */}
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-2 grotesk">
              Espace privé
            </p>
            <h1 className="text-3xl font-bold text-black tracking-tight serif italic">
              Administration
            </h1>
            <p className="text-gray-500 grotesk text-sm mt-2">
              Connexion requise pour accéder au tableau de bord.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Mot de passe admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-5 py-4 text-black text-sm grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors pr-12"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs grotesk font-medium px-1"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full group relative flex items-center justify-center gap-3 bg-black text-white font-bold py-4 rounded-xl grotesk text-sm transition-all hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Connexion...
                </span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 grotesk mt-8">
            Sorci Digit · Tableau de bord privé
          </p>
        </div>
      </motion.div>
    </div>
  )
}
