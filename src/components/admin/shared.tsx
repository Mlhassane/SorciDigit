"use client"

import React from "react"
import { motion } from "framer-motion"
import { X, AlertTriangle } from "lucide-react"

export const inputClass =
  "w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors"

export const labelClass =
  "text-xs font-bold text-gray-500 grotesk uppercase tracking-wider"

export function Modal({
  title,
  subtitle,
  onClose,
  children,
  wide,
}: {
  title: string
  subtitle?: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`relative z-10 w-full ${wide ? "max-w-2xl" : "max-w-lg"} bg-white rounded-[2rem] shadow-2xl max-h-[92vh] overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 pt-8 pb-5 border-b border-gray-100">
          <div>
            {subtitle && (
              <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase grotesk mb-1">
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl font-bold text-black serif italic">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="px-8 pb-8 pt-6 space-y-5">{children}</div>
      </motion.div>
    </div>
  )
}

export function ConfirmDelete({
  name,
  onConfirm,
  onCancel,
}: {
  name: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 bg-white rounded-[2rem] p-10 max-w-sm w-full shadow-2xl text-center"
      >
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-black serif italic mb-2">Supprimer ?</h3>
        <p className="text-gray-500 grotesk text-sm mb-8">
          Vous êtes sur le point de supprimer <strong className="text-black">«{name}»</strong>. Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold grotesk text-sm hover:border-gray-300 transition-colors">
            Annuler
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold grotesk text-sm hover:bg-red-600 transition-colors">
            Supprimer
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/** Bouton upload d'image (aperçu + sélection de fichier). */
export function ImageUploadButton({
  onUploaded,
  busy,
}: {
  onUploaded: (url: string) => void
  busy?: boolean
}) {
  const ref = React.useRef<HTMLInputElement>(null)
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const { uploadToStorage } = await import("@/lib/storage")
          const url = await uploadToStorage("projects", file, "media")
          if (url) onUploaded(url)
          e.target.value = ""
        }}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => ref.current?.click()}
        className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 text-sm text-gray-500 grotesk font-bold hover:border-gray-400 hover:bg-[#fafafa] transition-all disabled:opacity-50"
      >
        {busy ? "Téléversement..." : "Téléverser une image"}
      </button>
    </>
  )
}
