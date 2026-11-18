"use client"

import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, Loader2, Check, Images, ExternalLink } from "lucide-react"
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  type GalleryItem,
} from "@/lib/services"
import { Modal, ConfirmDelete, ImageUploadButton, inputClass, labelClass } from "./shared"

const EMPTY = { title: "", image_url: "", alt: "", link: "" }

export default function GalleryPanel({ onToast }: { onToast: (m: string, t?: "success" | "error") => void }) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<GalleryItem> | null | undefined>(undefined)
  const [deleting, setDeleting] = useState<GalleryItem | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setItems(await getGalleryItems())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDelete() {
    if (!deleting?.id) return
    const ok = await deleteGalleryItem(deleting.id)
    setDeleting(null)
    if (ok) { onToast("Visuel supprimé."); load() } else onToast("Erreur lors de la suppression.", "error")
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between gap-4">
        <span className="text-xs text-gray-400 grotesk font-medium">{items.length} visuel{items.length > 1 ? "s" : ""}</span>
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
          <Images className="w-10 h-10 text-gray-200 mb-4" />
          <p className="text-gray-500 grotesk text-sm font-medium mb-1">Galerie vide</p>
          <p className="text-gray-400 grotesk text-xs">Ajoutez vos réalisations — le carrousel de la page d'accueil s'affichera automatiquement.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {items.map((g) => (
            <li key={g.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#fafafa] transition-colors">
              <img src={g.image_url} alt={g.alt || g.title} className="w-28 h-16 object-cover rounded-xl border border-gray-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black truncate">{g.title}</p>
                {g.link && (
                  <a href={g.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 grotesk hover:underline inline-flex items-center gap-1 mt-0.5">
                    {g.link.replace(/^https?:\/\//, "").slice(0, 48)} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setEditing(g)} className="w-8 h-8 bg-gray-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all" aria-label="Modifier">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleting(g)} className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all" aria-label="Supprimer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {editing !== undefined && (
          <GalleryModal
            item={editing}
            onClose={() => setEditing(undefined)}
            onSave={() => { setEditing(undefined); onToast("Visuel sauvegardé !"); load() }}
            onError={(m) => onToast(m, "error")}
          />
        )}
        {deleting && <ConfirmDelete name={deleting.title} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
      </AnimatePresence>
    </div>
  )
}

function GalleryModal({
  item,
  onClose,
  onSave,
  onError,
}: {
  item: Partial<GalleryItem> | null
  onClose: () => void
  onSave: () => void
  onError: (m: string) => void
}) {
  const isEditing = !!item?.id
  const [form, setForm] = useState({ ...EMPTY, ...(item || {}) })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.image_url.trim()) { onError("Le titre et l'image sont requis."); return }
    setSaving(true)
    const payload = { ...form, alt: form.alt.trim() || form.title, link: form.link.trim() || undefined }
    const ok = isEditing && item?.id
      ? await updateGalleryItem(item.id, payload)
      : await createGalleryItem(payload)
    setSaving(false)
    if (ok) onSave()
    else onError("Erreur lors de la sauvegarde. Vérifiez DATABASE_URL.")
  }

  return (
    <Modal
      title={isEditing ? "Modifier le visuel" : "Ajouter un visuel"}
      subtitle="Galerie réalisations"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.image_url && (
          <img src={form.image_url} alt="aperçu" className="w-full h-44 object-cover rounded-2xl border border-gray-100" />
        )}
        <ImageUploadButton onUploaded={(url) => set("image_url", url)} busy={uploading} />
        <input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="...ou collez une URL d'image" className={inputClass} />
        <div className="space-y-1">
          <label className={labelClass}>Titre *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="ex: Refonte e-commerce Doctana" className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Lien (optionnel)</label>
          <input value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://..." type="url" className={inputClass} />
        </div>
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
