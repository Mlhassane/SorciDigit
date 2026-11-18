import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, createSessionValue, verifyAdminPassword } from '@/lib/admin-auth'

export async function POST(request: Request) {
  let body: { password?: string } = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD non configuré côté serveur' }, { status: 503 })
  }

  if (!verifyAdminPassword(body.password || '')) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
