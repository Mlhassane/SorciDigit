import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'sd_admin_session'
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7 // 7 jours

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

function sign(payload: string): string {
  const secret = getSecret()
  if (!secret) throw new Error('ADMIN_PASSWORD (ou ADMIN_SESSION_SECRET) non configuré')
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

/** Vérifie le mot de passe admin (comparaison à temps constant). */
export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || !password) return false
  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

/** Crée la valeur du cookie de session : "<issuedAt>.<hmac>" */
export function createSessionValue(): string {
  const issuedAt = Date.now().toString()
  return `${issuedAt}.${sign(issuedAt)}`
}

/** Vérifie une valeur de session (format + signature + expiration). */
export function verifySessionValue(value: string | undefined | null): boolean {
  if (!value || !getSecret()) return false
  const [issuedAt, signature] = value.split('.')
  if (!issuedAt || !signature) return false
  const expected = sign(issuedAt)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false
  const issued = Number(issuedAt)
  if (!Number.isFinite(issued)) return false
  return Date.now() - issued < SESSION_MAX_AGE_MS
}

/** Depuis un Server Component : session valide ou non. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return verifySessionValue(store.get(ADMIN_SESSION_COOKIE)?.value)
}

/** Depuis une route API : lit et vérifie la session de la requête. */
export function isRequestAuthenticated(request: Request): boolean {
  const header = request.headers.get('cookie') || ''
  const match = header
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`))
  const value = match ? decodeURIComponent(match.slice(ADMIN_SESSION_COOKIE.length + 1)) : undefined
  return verifySessionValue(value)
}
