"use client"

import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, Loader2, Check, MessageSquareQuote, AlertTriangle } from "lucide-react"
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type Testimonial,
} from "@/lib/services"
import { Modal, ConfirmDelete, inputClass, labelClass } from "./shared"

const EMPTY = { text: "", name: "", username: "", avatar_url: "" }

export default function TestimonialsPanel({ onToast }: { onToast: (m: string, t?: "success" | "error") => void }) {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Testimonial> | null | undefined>(undefined)
  const [deleting, setDeleting] = useState<Testimonial | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setItems(await getTestimonials())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDelete() {
    if (!deleting?.id) return
    const ok = await deleteTestimonial(deleting.id)
    setDeleting(null)
    if (ok) { onToast("Témoignage supprimé."); load() } else onToast("Erreur lors de la suppression.", "error")
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between gap-4">
        <span className="text-xs text-gray-400 grotesk font-medium">{items.length} témoignage{items.length > 1 ? "s" : ""}</span>
        <button onClick={() => setEditing({})}
          className="flex items-center gap-2 bg-black text-white font-bold px-4 py-2.5 rounded-full grotesk text-xs hover:bg-gray-900 transition-all">
          <Plus className="w-3.5 h-3.5" /> Ajouter
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300 mb-3" />
          <p className="text-gray-400 grotesk text-sm">Chargement...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <MessageSquareQuote className="w-10 h-10 text-gray-200 mb-4" />
          <p className="text-gray-500 grotesk text-sm font-medium mb-1">Aucun témoignage</p>
          <p className="text-gray-400 grotesk text-xs">Ajoutez vos premiers avis clients — ils s'affichent sur la page d'accueil.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {items.map((t) => (
            <li key={t.id} className="px-6 py-4 flex items-start gap-4 hover:bg-[#fafafa] transition-colors">
              {t.avatar_url ? (
                <img src={t.avatar_url} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-gray-100 flex-shrink-0" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-bold flex-shrink-0">
                  {t.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-black leading-snug line-clamp-2">“{t.text}”</p>
                <p className="text-xs text-gray-400 grotesk mt-1.5"><span className="font-bold text-black">{t.name}</span> · {t.username}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setEditing(t)} className="w-8 h-8 bg-gray-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all" aria-label="Modifier">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleting(t)} className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all" aria-label="Supprimer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {editing !== undefined && (
          <TestimonialModal
            testimonial={editing}
            onClose={() => setEditing(undefined)}
            onSave={() => { setEditing(undefined); onToast("Témoignage sauvegardé !"); load() }}
            onError={(m) => onToast(m, "error")}
          />
        )}
        {deleting && <ConfirmDelete name={deleting.name} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
      </AnimatePresence>
    </div>
  )
}

const AVATARS = Array.from({ length: 9 }, (_, i) => `/assets/avatars/avatar-${i + 1}.webp`)

function TestimonialModal({
  testimonial,
  onClose,
  onSave,
  onError,
}: {
  testimonial: Partial<Testimonial> | null
  onClose: () => void
  onSave: () => void
  onError: (m: string) => void
}) {
  const isEditing = !!testimonial?.id
  const [form, setForm] = useState({ ...EMPTY, ...(testimonial || {}) })
  const [saving, setSaving] = useState(false)
  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.text.trim() || !form.name.trim()) { onError("Le texte et le nom sont requis."); return }
    setSaving(true)
    const payload = { ...form, avatar_url: form.avatar_url.trim() || undefined }
    const ok = isEditing && testimonial?.id
      ? await updateTestimonial(testimonial.id, payload)
      : await createTestimonial(payload)
    setSaving(false)
    if (ok) onSave()
    else onError("Erreur lors de la sauvegarde. Vérifiez DATABASE_URL.")
  }

  return (
    <Modal
      title={isEditing ? "Modifier l'avis" : "Ajouter un avis"}
      subtitle="Témoignage client"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className={labelClass}>Citation *</label>
          <textarea value={form.text} onChange={(e) => set("text", e.target.value)} rows={3} required placeholder="Ce que le client pense de votre travail..." className={`${inputClass} resize-none`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Nom *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Hadiza Sani" className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Identifiant</label>
            <input value={form.username} onChange={(e) => set("username", e.target.value)} placeholder="@hadiza_s" className={inputClass} />
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Avatar</label>
          <div className="flex gap-2 flex-wrap">
            {AVATARS.map((src) => (
              <button key={src} type="button" onClick={() => set("avatar_url", src)}
                className={`rounded-full border-2 transition-all ${form.avatar_url === src ? "border-black scale-110" : "border-transparent hover:border-gray-300"}`}>
                <img src={src} alt="" className="w-10 h-10 rounded-full object-cover" />
              </button>
            ))}
          </div>
          <input value={form.avatar_url} onChange={(e) => set("avatar_url", e.target.value)} placeholder="...ou collez une URL d'image" className={inputClass} />
        </div>
        {form.avatar_url && (
          <div className="flex items-center gap-3 bg-[#fafafa] border border-gray-100 rounded-2xl p-3">
            <img src={form.avatar_url} alt="aperçu" className="w-12 h-12 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-black">{form.name || "Nom du client"}</p>
              <p className="text-xs text-gray-400 grotesk">{form.username || "@username"}</p>
            </div>
          </div>
        )}
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold grotesk text-sm hover:border-gray-300 transition-colors">Annuler</button>
          <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black text-white font-bold grotesk text-sm hover:bg-gray-900 transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {isEditing ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
