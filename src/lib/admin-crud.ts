import { NextResponse } from 'next/server'
import { isRequestAuthenticated } from './admin-auth'
import { ADMIN_TABLES, createRow, updateRow, deleteRow } from './cms-server'

function unauthorized() {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
}

function tableError(table: string) {
  return NextResponse.json({ error: 'Table inconnue' }, { status: 400 })
}

export async function createRowHandler(table: string, request: Request) {
  if (!isRequestAuthenticated(request)) return unauthorized()
  if (!ADMIN_TABLES.includes(table)) return tableError(table)
  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }
  try {
    const row = await createRow(table, body)
    return NextResponse.json(row, { status: 201 })
  } catch (error) {
    console.error(`createRow(${table}):`, error)
    return NextResponse.json({ error: 'Échec de la création' }, { status: 500 })
  }
}

export async function updateRowHandler(table: string, id: string, request: Request) {
  if (!isRequestAuthenticated(request)) return unauthorized()
  if (!ADMIN_TABLES.includes(table)) return tableError(table)
  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }
  try {
    const row = await updateRow(table, id, body)
    if (!row) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    return NextResponse.json(row)
  } catch (error) {
    console.error(`updateRow(${table}):`, error)
    return NextResponse.json({ error: 'Échec de la mise à jour' }, { status: 500 })
  }
}

export async function deleteRowHandler(table: string, id: string, request: Request) {
  if (!isRequestAuthenticated(request)) return unauthorized()
  if (!ADMIN_TABLES.includes(table)) return tableError(table)
  try {
    await deleteRow(table, id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(`deleteRow(${table}):`, error)
    return NextResponse.json({ error: 'Échec de la suppression' }, { status: 500 })
  }
}
