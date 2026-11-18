// Client-safe API wrappers for the admin dashboard.
// The browser never talks to the database directly — every call goes through
// /api/admin/* which verifies the admin session cookie.

export type Project = {
  id?: string
  name: string
  type: 'web' | 'mobile'
  description: string
  category: string
  developer: string
  icon: string
  link: string
  rating: string
  rating_count: string
  technologies: string[]
  screenshots: string[]
  color: string
  created_at?: string
}

export type Testimonial = {
  id?: string
  text: string
  name: string
  username: string
  avatar_url?: string
  created_at?: string
}

export type GalleryItem = {
  id?: string
  title: string
  image_url: string
  alt?: string
  link?: string
  created_at?: string
}

export type Activity = {
  id?: string
  title: string
  excerpt?: string
  image_url?: string
  link?: string
  published_at?: string
  created_at?: string
}

async function safeFetch<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(path, { cache: 'no-store' })
    if (!res.ok) return []
    return (await res.json()) as T[]
  } catch (error) {
    console.error(`safeFetch(${path}):`, error)
    return []
  }
}

async function apiMutate(path: string, method: string, body?: unknown): Promise<boolean> {
  try {
    const res = await fetch(path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.error(`${method} ${path}:`, data.error || res.statusText)
      return false
    }
    return true
  } catch (error) {
    console.error(`${method} ${path}:`, error)
    return false
  }
}

export const getProjects = () => safeFetch<Project>('/api/admin/projects')
export const getTestimonials = () => safeFetch<Testimonial>('/api/admin/testimonials')
export const getGalleryItems = () => safeFetch<GalleryItem>('/api/admin/gallery-items')
export const getActivities = () => safeFetch<Activity>('/api/admin/activities')

export async function createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<boolean> {
  return apiMutate('/api/admin/projects', 'POST', project)
}
export async function updateProject(id: string, project: Partial<Project>): Promise<boolean> {
  return apiMutate(`/api/admin/projects/${id}`, 'PUT', project)
}
export async function deleteProject(id: string): Promise<boolean> {
  return apiMutate(`/api/admin/projects/${id}`, 'DELETE')
}

export async function createTestimonial(t: Omit<Testimonial, 'id' | 'created_at'>): Promise<boolean> {
  return apiMutate('/api/admin/testimonials', 'POST', t)
}
export async function updateTestimonial(id: string, t: Partial<Testimonial>): Promise<boolean> {
  return apiMutate(`/api/admin/testimonials/${id}`, 'PUT', t)
}
export async function deleteTestimonial(id: string): Promise<boolean> {
  return apiMutate(`/api/admin/testimonials/${id}`, 'DELETE')
}

export async function createGalleryItem(g: Omit<GalleryItem, 'id' | 'created_at'>): Promise<boolean> {
  return apiMutate('/api/admin/gallery-items', 'POST', g)
}
export async function updateGalleryItem(id: string, g: Partial<GalleryItem>): Promise<boolean> {
  return apiMutate(`/api/admin/gallery-items/${id}`, 'PUT', g)
}
export async function deleteGalleryItem(id: string): Promise<boolean> {
  return apiMutate(`/api/admin/gallery-items/${id}`, 'DELETE')
}

export async function createActivity(a: Omit<Activity, 'id' | 'created_at'>): Promise<boolean> {
  return apiMutate('/api/admin/activities', 'POST', a)
}
export async function updateActivity(id: string, a: Partial<Activity>): Promise<boolean> {
  return apiMutate(`/api/admin/activities/${id}`, 'PUT', a)
}
export async function deleteActivity(id: string): Promise<boolean> {
  return apiMutate(`/api/admin/activities/${id}`, 'DELETE')
}
