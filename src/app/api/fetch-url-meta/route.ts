import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL manquante' }, { status: 400 })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SorciDigitBot/1.0)' },
    })
    clearTimeout(timeout)

    const html = await res.text()

    // Extract OG / meta tags
    const og = (prop: string) =>
      html.match(new RegExp(`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']+)["']`, 'i'))?.[1] ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${prop}["']`, 'i'))?.[1] || ''

    const meta = (name: string) =>
      html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))?.[1] ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'))?.[1] || ''

    const title = og('title') || html.match(/<title>([^<]+)<\/title>/i)?.[1] || ''
    const description = og('description') || meta('description') || ''
    const image = og('image') || ''
    const siteName = og('site_name') || ''

    const { hostname } = new URL(url)
    const favicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`

    return NextResponse.json({ title: title.trim(), description: description.trim(), image, siteName, favicon })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Impossible de charger l\'URL' }, { status: 400 })
  }
}
