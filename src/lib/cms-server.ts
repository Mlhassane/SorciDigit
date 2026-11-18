import 'server-only'
import { getDb } from './db'
import type { Project, Testimonial, GalleryItem, Activity } from './services'

export type { Project, Testimonial, GalleryItem, Activity }

// ─── Column whitelists (never trust client payloads blindly) ────────────────

const PROJECT_COLS = [
  'name', 'type', 'description', 'category', 'developer', 'icon', 'link',
  'rating', 'rating_count', 'technologies', 'screenshots', 'color',
] as const

const TESTIMONIAL_COLS = ['text', 'name', 'username', 'avatar_url'] as const
const GALLERY_COLS = ['title', 'image_url', 'alt', 'link'] as const
const ACTIVITY_COLS = ['title', 'excerpt', 'image_url', 'link', 'published_at'] as const

type TableDef = { cols: readonly string[]; jsonCols?: readonly string[] }
const TABLES: Record<string, TableDef> = {
  projects: { cols: PROJECT_COLS, jsonCols: ['technologies', 'screenshots'] },
  testimonials: { cols: TESTIMONIAL_COLS },
  gallery_items: { cols: GALLERY_COLS },
  activities: { cols: ACTIVITY_COLS },
}

export const ADMIN_TABLES = Object.keys(TABLES)

function pick(table: string, body: Record<string, unknown>): Record<string, unknown> {
  const { cols, jsonCols = [] } = TABLES[table]
  const out: Record<string, unknown> = {}
  for (const col of cols) {
    if (!(col in body)) continue
    let v = body[col]
    if (jsonCols.includes(col)) {
      v = Array.isArray(v) ? JSON.stringify(v) : '[]'
    }
    out[col] = v
  }
  return out
}

function fromRow(table: string, row: Record<string, unknown>): Record<string, unknown> {
  const { jsonCols = [] } = TABLES[table]
  if (jsonCols.length === 0) return row
  const out = { ...row }
  for (const col of jsonCols) {
    const v = out[col]
    if (typeof v === 'string') {
      try { out[col] = JSON.parse(v) } catch { out[col] = [] }
    }
  }
  return out
}

// ─── Public reads (fall back gracefully when DB unconfigured) ───────────────

export async function getProjects(): Promise<Project[]> {
  const sql = getDb()
  if (!sql) return []
  try {
    const rows = (await sql`SELECT * FROM projects ORDER BY created_at DESC`) as unknown as Record<string, unknown>[]
    return rows.map((r) => fromRow('projects', r) as unknown as Project)
  } catch (error) {
    console.error('getProjects:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const sql = getDb()
  if (!sql) return []
  try {
    return (await sql`SELECT * FROM testimonials ORDER BY created_at DESC`) as unknown as Testimonial[]
  } catch (error) {
    console.error('getTestimonials:', error)
    return []
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const sql = getDb()
  if (!sql) return []
  try {
    return (await sql`SELECT * FROM gallery_items ORDER BY created_at DESC`) as unknown as GalleryItem[]
  } catch (error) {
    console.error('getGalleryItems:', error)
    return []
  }
}

export async function getActivities(): Promise<Activity[]> {
  const sql = getDb()
  if (!sql) return []
  try {
    return (await sql`SELECT * FROM activities ORDER BY published_at DESC NULLS LAST, created_at DESC`) as unknown as Activity[]
  } catch (error) {
    console.error('getActivities:', error)
    return []
  }
}

// ─── Admin mutations (called only from authenticated API routes) ────────────

export async function createRow(table: string, body: Record<string, unknown>) {
  const sql = getDb()
  if (!TABLES[table]) throw new Error('Table inconnue')
  if (!sql) throw new Error('DATABASE_URL non configurée')
  const values = pick(table, body)
  const cols = Object.keys(values)
  if (cols.length === 0) throw new Error('Aucun champ valide')
  const { jsonCols = [] } = TABLES[table]
  const placeholders = cols.map((c, i) => (jsonCols.includes(c) ? `$${i + 1}::jsonb` : `$${i + 1}`))
  const rows = (await sql.query(
    `INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(', ')})
     VALUES (${placeholders.join(', ')}) RETURNING *`,
    Object.values(values),
  )) as unknown as Record<string, unknown>[]
  return fromRow(table, rows[0])
}

export async function updateRow(table: string, id: string, body: Record<string, unknown>) {
  const sql = getDb()
  if (!TABLES[table]) throw new Error('Table inconnue')
  if (!sql) throw new Error('DATABASE_URL non configurée')
  const values = pick(table, body)
  const cols = Object.keys(values)
  if (cols.length === 0) throw new Error('Aucun champ valide')
  const { jsonCols = [] } = TABLES[table]
  const sets = cols
    .map((c, i) => `"${c}" = ${jsonCols.includes(c) ? `$${i + 1}::jsonb` : `$${i + 1}`}`)
    .join(', ')
  const rows = (await sql.query(
    `UPDATE "${table}" SET ${sets} WHERE id = $${cols.length + 1} RETURNING *`,
    [...Object.values(values), id],
  )) as unknown as Record<string, unknown>[]
  return rows[0] ? fromRow(table, rows[0]) : null
}

export async function deleteRow(table: string, id: string) {
  const sql = getDb()
  if (!TABLES[table]) throw new Error('Table inconnue')
  if (!sql) throw new Error('DATABASE_URL non configurée')
  await sql.query(`DELETE FROM "${table}" WHERE id = $1`, [id])
  return true
}
