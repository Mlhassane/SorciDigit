"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Pencil, Trash2, LogOut, Globe, Smartphone,
  X, Check, AlertTriangle, Loader2, LayoutDashboard,
  Package, Upload, Download, Image as ImageIcon,
  Sparkles, FileDown, Eye, Store,
} from "lucide-react"
import { getProjects, createProject, updateProject, deleteProject, type Project } from "@/lib/services"
import { uploadToStorage } from "@/lib/storage"

const STORAGE_BUCKET = "projects"

// ─── Helpers ─────────────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  { label: "Bleu", value: "bg-blue-50 text-blue-500" },
  { label: "Vert", value: "bg-emerald-50 text-emerald-500" },
  { label: "Orange", value: "bg-orange-50 text-orange-500" },
  { label: "Violet", value: "bg-purple-50 text-purple-500" },
  { label: "Rose", value: "bg-pink-50 text-pink-500" },
  { label: "Indigo", value: "bg-indigo-50 text-indigo-500" },
  { label: "Jaune", value: "bg-yellow-50 text-yellow-500" },
  { label: "Gris", value: "bg-gray-100 text-gray-500" },
]

const EMPTY_PROJECT: Omit<Project, "id" | "created_at"> = {
  name: "", type: "web", description: "", category: "", developer: "Sorci Digit",
  icon: "", link: "", rating: "5.0", rating_count: "0",
  technologies: [], screenshots: [], color: "bg-blue-50 text-blue-500",
}

function TagInput({ values, onChange, placeholder }: { values: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [input, setInput] = useState("")
  function addTag() {
    const t = input.trim()
    if (t && !values.includes(t)) onChange([...values, t])
    setInput("")
  }
  return (
    <div className="flex flex-wrap gap-2 p-3 bg-[#fafafa] border border-gray-200 rounded-xl min-h-[48px]">
      {values.map(tag => (
        <span key={tag} className="flex items-center gap-1 bg-black text-white text-xs font-bold px-3 py-1 rounded-full grotesk">
          {tag}
          <button type="button" onClick={() => onChange(values.filter(t => t !== tag))}><X className="w-3 h-3" /></button>
        </span>
      ))}
      <input type="text" value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag() } }}
        onBlur={addTag} placeholder={values.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-black placeholder-gray-400 outline-none grotesk" />
    </div>
  )
}

// ─── Upload Drop Zone ────────────────────────────────────────────────────────
function DropZone({
  accept, label, sublabel, icon: Icon, onFile, loading, uploaded,
}: {
  accept: string; label: string; sublabel: string; icon: any;
  onFile: (file: File) => void; loading?: boolean; uploaded?: string;
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${dragging ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400 hover:bg-[#fafafa]"}`}
    >
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={e => { if (e.target.files?.[0]) onFile(e.target.files[0]) }} />
      {loading ? (
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      ) : uploaded ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-sm font-bold text-black grotesk">{uploaded.length > 40 ? uploaded.slice(0, 37) + "..." : uploaded}</p>
          <p className="text-xs text-gray-400 grotesk">Cliquez pour changer</p>
        </div>
      ) : (
        <>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-black grotesk">{label}</p>
            <p className="text-xs text-gray-400 grotesk mt-1">{sublabel}</p>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Screenshot Image Uploader ────────────────────────────────────────────────
function ScreenshotUploader({ screenshots, onChange }: { screenshots: string[]; onChange: (v: string[]) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files) return
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const url = await uploadToStorage(STORAGE_BUCKET, file, "screenshots")
      if (url) urls.push(url)
    }
    onChange([...screenshots, ...urls])
    setUploading(false)
  }

  return (
    <div className="space-y-3">
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />

      {/* Existing screenshots */}
      {screenshots.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {screenshots.map((src, i) => (
            <div key={i} className="relative group">
              {src.startsWith("http") ? (
                <img src={src} alt="" className="w-20 h-36 object-cover rounded-xl border border-gray-100" />
              ) : (
                <div className={`w-20 h-36 rounded-xl bg-gradient-to-br ${src} border border-gray-100 flex items-center justify-center`}>
                  <span className="text-xs text-white/80 grotesk text-center px-1">Gradient</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => onChange(screenshots.filter((_, j) => j !== i))}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-sm text-gray-500 grotesk font-bold hover:border-gray-400 hover:bg-[#fafafa] transition-all disabled:opacity-50"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        {uploading ? "Téléversement..." : "Ajouter des captures d'écran"}
      </button>
    </div>
  )
}

// ─── URL Auto-Fetch Section ───────────────────────────────────────────────────
function WebUrlFetch({ onFetched }: { onFetched: (data: { title: string; description: string; image: string; favicon: string }) => void }) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<{ title: string; description: string; image: string; favicon: string } | null>(null)

  async function fetchMeta() {
    if (!url) return
    setLoading(true); setError(""); setPreview(null)
    try {
      const res = await fetch("/api/fetch-url-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPreview(data)
    } catch (e: any) {
      setError("Impossible de charger ce site. Vérifiez l'URL.")
    }
    setLoading(false)
  }

  function applyFetch() {
    if (preview) { onFetched(preview) }
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5" /> URL du site *
      </label>
      <div className="flex gap-2">
        <input
          type="url" value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); fetchMeta() } }}
          placeholder="https://votre-projet.com"
          className="flex-1 bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
        />
        <button
          type="button" onClick={fetchMeta} disabled={loading || !url}
          className="flex items-center gap-2 bg-black text-white font-bold px-4 py-3 rounded-xl grotesk text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "..." : "Charger"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs grotesk flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> {error}
        </p>
      )}

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="border border-emerald-200 bg-emerald-50 rounded-2xl overflow-hidden"
        >
          {preview.image && (
            <img src={preview.image} alt="" className="w-full h-32 object-cover" />
          )}
          <div className="p-4">
            <div className="flex items-start gap-3">
              {preview.favicon && <img src={preview.favicon} alt="" className="w-8 h-8 rounded-lg flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-black text-sm grotesk truncate">{preview.title || "Sans titre"}</p>
                <p className="text-gray-500 text-xs grotesk mt-1 line-clamp-2">{preview.description || "Aucune description"}</p>
              </div>
            </div>
            <button
              type="button" onClick={applyFetch}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-2.5 rounded-xl grotesk text-xs hover:bg-gray-900 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Appliquer ces informations
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─── Store URL Auto-Fetch (Google Play / App Store) ──────────────────────────
function StoreUrlFetch({ onFetched }: {
  onFetched: (data: { name: string; description: string; icon: string; screenshot: string }) => void
}) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<{ name: string; description: string; icon: string; screenshot: string } | null>(null)

  async function fetchStore() {
    if (!url) return
    setLoading(true); setError(""); setPreview(null)
    try {
      const res = await fetch("/api/fetch-url-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPreview({
        name: data.title?.replace(/ - (Applications|Apps) sur Google Play.*$/i, "").replace(/ on the App Store.*$/i, "").trim() || "",
        description: data.description || "",
        icon: data.image || "",
        screenshot: data.image || "",
      })
    } catch {
      setError("Impossible de charger la page du store. Vérifiez l'URL.")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider flex items-center gap-1.5">
        <Store className="w-3.5 h-3.5" /> Lien Play Store ou App Store <span className="normal-case font-normal">(optionnel)</span>
      </label>
      <div className="flex gap-2">
        <input
          type="url" value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); fetchStore() } }}
          placeholder="https://play.google.com/store/apps/details?id=..."
          className="flex-1 bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
        />
        <button
          type="button" onClick={fetchStore} disabled={loading || !url}
          className="flex items-center gap-2 bg-black text-white font-bold px-4 py-3 rounded-xl grotesk text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "..." : "Charger"}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs grotesk flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> {error}</p>}

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="border border-emerald-200 bg-emerald-50 rounded-2xl overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              {preview.icon && <img src={preview.icon} alt="" className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-gray-100" />}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-black text-sm grotesk">{preview.name || "Nom introuvable"}</p>
                <p className="text-gray-500 text-xs grotesk mt-1 line-clamp-2">{preview.description || ""}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onFetched(preview)}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-2.5 rounded-xl grotesk text-xs hover:bg-gray-900 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Appliquer ces informations
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─── APK Upload Section ───────────────────────────────────────────────────────
function ApkUpload({ onUploaded }: { onUploaded: (url: string, suggestedName: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [filename, setFilename] = useState("")
  const [url, setUrl] = useState("")

  async function handleApk(file: File) {
    setUploading(true)
    const uploadedUrl = await uploadToStorage(STORAGE_BUCKET, file, "apks")
    setUploading(false)
    if (uploadedUrl) {
      // Suggest name from filename: "mon-app-v1.2.apk" → "Mon App"
      const base = file.name.replace(/\.apk$/i, "").replace(/[-_v]?\d+[\d.]*$/, "")
        .replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase()).trim()
      setFilename(file.name)
      setUrl(uploadedUrl)
      onUploaded(uploadedUrl, base)
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider flex items-center gap-1.5">
        <FileDown className="w-3.5 h-3.5" /> Fichier APK
      </label>
      <DropZone
        accept=".apk,application/vnd.android.package-archive"
        label="Déposez votre fichier APK"
        sublabel="Cliquez ou glissez-déposez · Max 50MB"
        icon={Upload}
        onFile={handleApk}
        loading={uploading}
        uploaded={filename || undefined}
      />
      {url && (
        <a href={url} target="_blank" className="flex items-center gap-2 text-xs text-blue-500 grotesk hover:underline">
          <Eye className="w-3.5 h-3.5" /> Vérifier le lien de téléchargement
        </a>
      )}
    </div>
  )
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, onSave }: {
  project: Partial<Project> | null; onClose: () => void; onSave: () => void
}) {
  const isEditing = !!project?.id
  const [form, setForm] = useState<Omit<Project, "id" | "created_at">>(
    project ? {
      name: project.name || "", type: project.type || "web",
      description: project.description || "", category: project.category || "",
      developer: project.developer || "Sorci Digit", icon: project.icon || "",
      link: project.link || "", rating: project.rating || "5.0",
      rating_count: project.rating_count || "0",
      technologies: project.technologies || [],
      screenshots: project.screenshots || [],
      color: project.color || "bg-blue-50 text-blue-500",
    } : { ...EMPTY_PROJECT }
  )
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState("")

  function set(field: string, value: any) { setForm(f => ({ ...f, [field]: value })) }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.description) { setErr("Nom et description sont requis."); return }
    setSaving(true); setErr("")
    const ok = isEditing && project?.id
      ? !!(await updateProject(project.id, form))
      : !!(await createProject(form))
    setSaving(false)
    if (ok) onSave()
    else setErr("Erreur lors de la sauvegarde. Vérifiez votre connexion Supabase.")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 pt-8 pb-5 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase grotesk mb-1">
              {isEditing ? "Modifier le projet" : "Nouveau projet"}
            </p>
            <h2 className="text-2xl font-bold text-black serif italic">
              {isEditing ? form.name : "Ajouter un projet"}
            </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSave} className="px-8 pb-8 pt-6 space-y-6">

          {/* Type selector */}
          <div className="grid grid-cols-2 gap-3">
            {([
              { value: "web", label: "Web / Plateforme", icon: Globe },
              { value: "mobile", label: "Application Mobile", icon: Smartphone },
            ] as const).map(({ value, label, icon: Icon }) => (
              <button key={value} type="button" onClick={() => set("type", value)}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm grotesk border-2 transition-all ${form.type === value ? "border-black bg-black text-white" : "border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          {/* ── WEB FIELDS ─────────────────────────────────────────── */}
          {form.type === "web" && (
            <div className="space-y-5 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
              <WebUrlFetch onFetched={data => {
                if (data.title) set("name", data.title)
                if (data.description) set("description", data.description)
                if (data.image) set("screenshots", [...(form.screenshots || []), data.image])
                if (data.favicon) set("icon", data.favicon || form.icon)
              }} />
              <p className="text-[11px] text-blue-500 grotesk font-medium -mt-2">
                ✦ Saisissez l'URL et cliquez "Charger" pour remplir automatiquement les informations.
              </p>
            </div>
          )}

          {/* ── MOBILE APK ─────────────────────────────────────────── */}
          {form.type === "mobile" && (
            <div className="space-y-5 p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
              <StoreUrlFetch onFetched={data => {
                if (data.name) set("name", data.name)
                if (data.description) set("description", data.description)
                if (data.icon) set("icon", data.icon)
                if (data.screenshot) set("screenshots", [data.screenshot, ...(form.screenshots || [])])
              }} />
              <div className="border-t border-emerald-200 pt-4">
                <ApkUpload onUploaded={(url, name) => {
                  set("link", url)
                  if (!form.name) set("name", name)
                }} />
              </div>
              {form.link?.includes("supabase") && (
                <div className="flex items-center gap-2 bg-emerald-100 rounded-xl px-4 py-3">
                  <Download className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-700 grotesk">APK prêt au téléchargement</p>
                    <a href={form.link} target="_blank" className="text-[11px] text-emerald-600 grotesk hover:underline truncate block">{form.link}</a>
                  </div>
                </div>
              )}
              <p className="text-[11px] text-emerald-600 grotesk font-medium">
                ✦ Entrez le lien du store pour charger les infos automatiquement, puis déposez l'APK pour le téléchargement direct.
              </p>
            </div>
          )}

          {/* ── COMMON FIELDS ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Nom *</label>
              <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="ex: DocuFlow"
                className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Icône (emoji ou URL)</label>
              <input value={form.icon} onChange={e => set("icon", e.target.value)} placeholder="📄 ou https://..."
                className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Catégorie</label>
              <input value={form.category} onChange={e => set("category", e.target.value)} placeholder="ex: Plateforme SaaS, Santé et forme..."
                className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Description *</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} placeholder="Décrivez le projet..."
                className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none" />
            </div>

            {/* Web: manual URL if not auto-fetched */}
            {form.type === "web" && (
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">URL du projet</label>
                <input value={form.link} onChange={e => set("link", e.target.value)} placeholder="https://..."
                  className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
              </div>
            )}

            {/* Mobile extra fields */}
            {form.type === "mobile" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Note</label>
                  <input value={form.rating} onChange={e => set("rating", e.target.value)} placeholder="4.9"
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Nb d'avis</label>
                  <input value={form.rating_count} onChange={e => set("rating_count", e.target.value)} placeholder="1.2k"
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3 text-sm text-black grotesk placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
                </div>
              </>
            )}

            {/* Technologies */}
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Technologies <span className="normal-case font-normal">(Entrée pour valider)</span></label>
              <TagInput values={form.technologies} onChange={v => set("technologies", v)} placeholder="Next.js, Flutter, Supabase..." />
            </div>

            {/* Screenshots */}
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">
                {form.type === "mobile" ? "Captures d'écran (images)" : "Aperçu du projet (images)"}
              </label>
              <ScreenshotUploader screenshots={form.screenshots} onChange={v => set("screenshots", v)} />
            </div>

            {/* Color (web only) */}
            {form.type === "web" && (
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 grotesk uppercase tracking-wider">Couleur de la carte</label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_OPTIONS.map(c => (
                    <button key={c.value} type="button" onClick={() => set("color", c.value)}
                      className={`py-2 rounded-xl text-xs font-bold grotesk border-2 transition-all ${c.value} ${form.color === c.value ? "border-black scale-95" : "border-transparent hover:border-gray-300"}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {err && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-sm grotesk rounded-xl px-4 py-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {err}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold grotesk text-sm hover:border-gray-300 transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black text-white font-bold grotesk text-sm hover:bg-gray-900 transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {saving ? "Sauvegarde..." : isEditing ? "Mettre à jour" : "Créer le projet"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function DeleteModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 bg-white rounded-[2rem] p-10 max-w-sm w-full shadow-2xl text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-black serif italic mb-2">Supprimer le projet ?</h3>
        <p className="text-gray-500 grotesk text-sm mb-8">
          Vous êtes sur le point de supprimer <strong className="text-black">«{name}»</strong>. Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold grotesk text-sm hover:border-gray-300 transition-colors">Annuler</button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold grotesk text-sm hover:bg-red-600 transition-colors">Supprimer</button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Project Row ──────────────────────────────────────────────────────────────
function ProjectRow({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void }) {
  const icon = project.icon
  const isUrl = icon?.startsWith("http")
  return (
    <tr className="border-t border-gray-50 hover:bg-[#fafafa] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {isUrl ? (
            <img src={icon} alt="" className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
          ) : (
            <span className="text-2xl flex-shrink-0">{icon}</span>
          )}
          <div>
            <p className="font-bold text-black text-sm">{project.name}</p>
            <p className="text-gray-400 grotesk text-xs">{project.category}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold grotesk ${project.type === "web" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
          {project.type === "web" ? <Globe className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
          {project.type === "web" ? "Web" : "Mobile"}
        </span>
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {(project.technologies || []).slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500 grotesk">{t}</span>
          ))}
          {(project.technologies || []).length > 3 && (
            <span className="text-xs text-gray-400 grotesk">+{project.technologies!.length - 3}</span>
          )}
        </div>
      </td>
      <td className="px-4 py-4 hidden lg:table-cell">
        {project.link ? (
          project.type === "mobile" ? (
            <a href={project.link} target="_blank" className="flex items-center gap-1 text-xs text-emerald-600 grotesk hover:underline font-bold">
              <Download className="w-3 h-3" /> Télécharger APK
            </a>
          ) : (
            <a href={project.link} target="_blank" className="text-xs text-blue-500 grotesk hover:underline truncate max-w-[160px] block">
              {project.link.replace(/^https?:\/\//, "")}
            </a>
          )
        ) : (
          <span className="text-gray-300 text-xs grotesk">—</span>
        )}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="w-8 h-8 bg-gray-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(false)
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all")
  const [editingProject, setEditingProject] = useState<Partial<Project> | null | undefined>(undefined)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true")
      router.replace("/admin/login")
  }, [router])

  const load = useCallback(async () => {
    setLoading(true)
    setDbError(false)
    const data = await getProjects()
    // If fetch returned [] AND there's no connectivity (TypeError), mark db as errored
    setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  async function handleDelete() {
    if (!deletingProject?.id) return
    const ok = await deleteProject(deletingProject.id)
    setDeletingProject(null)
    if (ok) { showToast(`«${deletingProject.name}» supprimé.`); load() }
    else showToast("Erreur lors de la suppression.", "error")
  }

  const filtered = filter === "all" ? projects : projects.filter(p => p.type === filter)
  const webCount = projects.filter(p => p.type === "web").length
  const mobileCount = projects.filter(p => p.type === "mobile").length

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 flex-col z-40 hidden lg:flex">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <p className="font-bold text-black text-sm">Sorci Digit</p>
              <p className="text-gray-400 text-xs grotesk">Administration</p>
            </div>
          </div>
        </div>
        <nav className="p-4 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl font-bold text-sm grotesk">
            <LayoutDashboard className="w-4 h-4" /> Tableau de bord
          </button>
          <button onClick={() => router.push("/")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl font-bold text-sm grotesk mt-1 transition-colors">
            <Globe className="w-4 h-4" /> Voir le site
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => { sessionStorage.removeItem("admin_auth"); router.push("/admin/login") }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm grotesk transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold text-black text-sm">Admin</span>
        </div>
        <button onClick={() => { sessionStorage.removeItem("admin_auth"); router.push("/admin/login") }} className="text-gray-500 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="lg:ml-64 pt-16 lg:pt-0 p-6 md:p-10">

        {/* Supabase setup banner */}
        {!loading && projects.length === 0 && (
          <div className="mb-6 flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-800 grotesk">Table Supabase non configurée</p>
              <p className="text-xs text-amber-600 grotesk mt-1">
                Exécutez le script SQL dans votre <a href="https://supabase.com/dashboard/project/xteynhrutebkbgxxxaca/sql/new" target="_blank" className="underline font-bold">SQL Editor Supabase</a>, puis créez un bucket Storage public nommé <code className="bg-amber-100 px-1 rounded">projects</code>.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pt-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-1 grotesk">Tableau de bord</p>
            <h1 className="text-3xl md:text-4xl font-medium text-black serif italic leading-tight">
              Mes <span className="not-italic font-bold">Projets.</span>
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: projects.length, icon: <Package className="w-5 h-5" />, bg: "bg-white" },
            { label: "Web", value: webCount, icon: <Globe className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50" },
            { label: "Mobile", value: mobileCount, icon: <Smartphone className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3 border border-gray-100`}>{s.icon}</div>
              <p className="text-2xl font-bold text-black">{loading ? "—" : s.value}</p>
              <p className="text-xs text-gray-400 grotesk font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(["all", "web", "mobile"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold grotesk transition-all ${filter === f ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                  {f === "all" ? "Tous" : f === "web" ? "Web" : "Mobile"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-xs text-gray-400 grotesk">{filtered.length} projet{filtered.length > 1 ? "s" : ""}</span>
              <button onClick={() => setEditingProject({})}
                className="flex items-center gap-2 bg-black text-white font-bold px-4 py-2.5 rounded-full grotesk text-xs hover:bg-gray-900 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gray-300 mb-3" />
              <p className="text-gray-400 grotesk text-sm">Chargement...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 grotesk text-sm font-medium mb-1">Aucun projet</p>
              <p className="text-gray-400 grotesk text-xs mb-6">Commencez par ajouter votre premier projet.</p>
              <button onClick={() => setEditingProject({})}
                className="flex items-center gap-2 bg-black text-white font-bold px-5 py-2.5 rounded-full grotesk text-xs">
                <Plus className="w-3.5 h-3.5" /> Ajouter un projet
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    {["Projet", "Type", "Technologies", "Lien / APK", "Actions"].map((h, i) => (
                      <th key={h} className={`px-${i === 0 || i === 4 ? "6" : "4"} py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest grotesk ${i === 2 ? "hidden md:table-cell" : ""} ${i === 3 ? "hidden lg:table-cell" : ""} ${i === 4 ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(project => (
                    <ProjectRow key={project.id} project={project}
                      onEdit={() => setEditingProject(project)}
                      onDelete={() => setDeletingProject(project)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {editingProject !== undefined && (
          <ProjectModal
            project={!editingProject || Object.keys(editingProject).length === 0 ? null : editingProject}
            onClose={() => setEditingProject(undefined)}
            onSave={() => { setEditingProject(undefined); showToast("Projet sauvegardé !"); load() }}
          />
        )}
        {deletingProject && (
          <DeleteModal name={deletingProject.name} onConfirm={handleDelete} onCancel={() => setDeletingProject(null)} />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg text-sm font-bold grotesk ${toast.type === "success" ? "bg-black text-white" : "bg-red-500 text-white"}`}
          >
            {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
