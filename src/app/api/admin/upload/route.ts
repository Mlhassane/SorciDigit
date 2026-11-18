import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isRequestAuthenticated } from '@/lib/admin-auth'

const ALLOWED_FOLDERS = new Set(['apks', 'screenshots', 'media', 'gallery', ''])
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

export async function POST(request: Request) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN non configuré côté serveur (Vercel Blob)' },
      { status: 503 },
    )
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Formulaire invalide' }, { status: 400 })
  }

  const file = form.get('file')
  const folder = String(form.get('folder') || '').replace(/[^a-zA-Z0-9/_-]/g, '')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
  }
  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ error: 'Dossier non autorisé' }, { status: 400 })
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 50 Mo)' }, { status: 413 })
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const pathname = folder ? `${folder}/${Date.now()}-${safeName}` : `${Date.now()}-${safeName}`

  try {
    const blob = await put(pathname, file, { access: 'public' })
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Blob upload error:', error)
    return NextResponse.json({ error: "Échec de l'envoi du fichier" }, { status: 500 })
  }
}
