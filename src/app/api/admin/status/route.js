import { NextResponse } from 'next/server'
import { isValidObjectId } from 'mongoose'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import Enquiry from '@/models/Enquiry'
import Enrollment from '@/models/Enrollment'

export const runtime = 'nodejs'

const allowed = {
  enquiry: ['new', 'contacted', 'closed'],
  enrollment: ['pending', 'confirmed', 'cancelled'],
}

export async function PATCH(request) {
  const admin = await getAdmin()
  if (!admin) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { type, id, status } = body ?? {}
  if (!allowed[type] || !isValidObjectId(id) || !allowed[type].includes(status)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  try {
    await connectDB()
    const Model = type === 'enquiry' ? Enquiry : Enrollment
    const doc = await Model.findByIdAndUpdate(id, { status }, { new: true })
    if (!doc) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin status error:', err.message)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}