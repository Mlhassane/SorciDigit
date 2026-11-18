import { updateRowHandler, deleteRowHandler } from '@/lib/admin-crud'
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return updateRowHandler('gallery_items', id, request)
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return deleteRowHandler('gallery_items', id, request)
}
