import { NextResponse } from 'next/server'
import { isRequestAuthenticated } from '@/lib/admin-auth'
import { createRowHandler } from '@/lib/admin-crud'
import { getProjects, getTestimonials, getGalleryItems, getActivities } from '@/lib/cms-server'

export async function GET(request: Request) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    const data = await { projects: getProjects, testimonials: getTestimonials, gallery_items: getGalleryItems, activities: getActivities }['activities']()
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET activities:', error)
    return NextResponse.json({ error: 'Échec du chargement' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  return createRowHandler('activities', request)
}
