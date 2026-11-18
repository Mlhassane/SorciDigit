"use client"

import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, Loader2, Check, Megaphone, ExternalLink } from "lucide-react"
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  type Activity,
} from "@/lib/services"
import { Modal, ConfirmDelete, ImageUploadButton, inputClass, labelClass } from "./shared"

const EMPTY = { title: "", excerpt: "", image_url: "", link: "", published_at: "" }

export default function ActivitiesPanel({ onToast }: { onToast: (m: string, t?: "success" | "error") => void }) {
  const [items, setItems] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Activity> | null | undefined>(undefined)
  const [deleting, setDeleting] = useState<Activity | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setItems(await getActivities())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDelete() {
    if (!deleting?.id) return
    const ok = await deleteActivity(deleting.id)
    setDeleting(null)
    if (ok) { onToast("Activité supprimée."); load() } else onToast("Erreur lors de la suppression.", "error")
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between gap-4">
        <span className="text-xs text-gray-400 grotesk font-medium">{items.length} activité{items.length > 1 ? "s" : ""}</span>
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
          <Megaphone className="w-10 h-10 text-gray-200 mb-4" />
          <p className="text-gray-500 grotesk text-sm font-medium mb-1">Aucune activité</p>
          <p className="text-gray-400 grotesk text-xs">Partagez vos actualités — elles s'affichent sur la page d'accueil.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {items.map((a) => (
            <li key={a.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#fafafa] transition-colors">
              {a.image_url && (
                <img src={a.image_url} alt={a.title} className="w-24 h-16 object-cover rounded-xl border border-gray-100 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black leading-snug">{a.title}</p>
                <p className="text-xs text-gray-400 grotesk mt-0.5 line-clamp-1">
                  {a.published_at ? new Date(a.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}
                  {a.link && (
                    <a href={a.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1 ml-2">
                      Voir <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setEditing(a)} className="w-8 h-8 bg-gray-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all" aria-label="Modifier">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleting(a)} className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all" aria-label="Supprimer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {editing !== undefined && (
          <ActivityModal
            item={editing}
            onClose={() => setEditing(undefined)}
            onSave={() => { setEditing(undefined); onToast("Activité sauvegardée !"); load() }}
            onError={(m) => onToast(m, "error")}
          />
        )}
        {deleting && <ConfirmDelete name={deleting.title} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
      </AnimatePresence>
    </div>
  )
}

function ActivityModal({
  item,
  onClose,
  onSave,
  onError,
}: {
  item: Partial<Activity> | null
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
    if (!form.title.trim()) { onError("Le titre est requis."); return }
    setSaving(true)
    const payload = {
      ...form,
      excerpt: form.excerpt.trim() || undefined,
      image_url: form.image_url.trim() || undefined,
      link: form.link.trim() || undefined,
      published_at: form.published_at || undefined,
    }
    const ok = isEditing && item?.id
      ? await updateActivity(item.id, payload)
      : await createActivity(payload)
    setSaving(false)
    if (ok) onSave()
    else onError("Erreur lors de la sauvegarde. Vérifiez DATABASE_URL.")
  }

  return (
    <Modal
      title={isEditing ? "Modifier l'activité" : "Ajouter une activité"}
      subtitle="Activité / actualité"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.image_url && (
          <img src={form.image_url} alt="aperçu" className="w-full h-40 object-cover rounded-2xl border border-gray-100" />
        )}
        <ImageUploadButton onUploaded={(url) => set("image_url", url)} busy={uploading} />
        <div className="space-y-1">
          <label className={labelClass}>Titre *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="ex: Livraison du site Doctana en 6 semaines" className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Résumé</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Une ou deux phrases..." className={`${inputClass} resize-none`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Date</label>
            <input type="date" value={form.published_at || ""} onChange={(e) => set("published_at", e.target.value)} className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Lien (optionnel)</label>
            <input value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://..." type="url" className={inputClass} />
          </div>
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
