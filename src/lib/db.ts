import { neon } from '@neondatabase/serverless'

let cached: ReturnType<typeof neon> | null | undefined

/** Client Neon (HTTP) — serveur uniquement. Null si DATABASE_URL est absente. */
export function getDb() {
  if (cached !== undefined) return cached
  const url = process.env.DATABASE_URL
  cached = url ? neon(url) : null
  return cached
}
