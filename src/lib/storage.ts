/**
 * Uploads a file to Vercel Blob through the admin API
 * (the browser never writes to storage directly).
 * @param bucket  Kept for compatibility (ignored)
 * @param file    The File object to upload
 * @param folder  Optional subfolder (e.g. "apks" or "screenshots")
 */
export async function uploadToStorage(
  bucket: string,
  file: File,
  folder: string = ''
): Promise<string | null> {
  const form = new FormData()
  form.append('file', file)
  form.append('bucket', bucket)
  form.append('folder', folder)

  try {
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error('Upload error:', data.error || res.statusText)
      return null
    }
    return data.url as string
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}
