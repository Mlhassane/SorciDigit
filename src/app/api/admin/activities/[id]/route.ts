import { updateRowHandler, deleteRowHandler } from '@/lib/admin-crud'
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return updateRowHandler('activities', id, request)
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return deleteRowHandler('activities', id, request)
}
