import { supabase } from './supabase'

/**
 * Upload a file to Supabase Storage and return its public URL.
 * @param bucket  The bucket name (must be public)
 * @param file    The File object to upload
 * @param folder  Optional subfolder (e.g. "apks" or "screenshots")
 */
export async function uploadToStorage(
  bucket: string,
  file: File,
  folder: string = ''
): Promise<string | null> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = folder ? `${folder}/${Date.now()}-${safeName}` : `${Date.now()}-${safeName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, cacheControl: '3600' })

  if (error) {
    console.error('Storage upload error:', error.message)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}

/**
 * Delete a file from Supabase Storage by its public URL.
 */
export async function deleteFromStorage(bucket: string, publicUrl: string): Promise<boolean> {
  // Extract the path from the public URL
  const urlObj = new URL(publicUrl)
  const pathStart = urlObj.pathname.indexOf(`/object/public/${bucket}/`) + `/object/public/${bucket}/`.length
  const filePath = urlObj.pathname.slice(pathStart)

  const { error } = await supabase.storage.from(bucket).remove([filePath])
  if (error) {
    console.error('Storage delete error:', error.message)
    return false
  }
  return true
}
