import { supabase } from './supabase'

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

/** Récupère tous les projets triés par date */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erreur getProjects:', error.message)
    return []
  }
  return data as Project[]
}

/** Crée un nouveau projet */
export async function createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) {
    console.error('Erreur createProject:', error.message)
    return null
  }
  return data as Project
}

/** Met à jour un projet existant */
export async function updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erreur updateProject:', error.message)
    return null
  }
  return data as Project
}

/** Supprime un projet */
export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erreur deleteProject:', error.message)
    return false
  }
  return true
}
