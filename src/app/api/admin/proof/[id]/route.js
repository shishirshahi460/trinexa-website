import { NextResponse } from 'next/server'
import { isValidObjectId } from 'mongoose'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import Enrollment from '@/models/Enrollment'
import cloudinary from '@/lib/cloudinary'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Admin le "View payment proof" thichda yo GET chalchha
export async function GET(_request, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  const { id } = await params
  if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  try {
    await connectDB()
    const doc = await Enrollment.findById(id).lean()
    if (!doc?.proof?.publicId) {
      return NextResponse.json({ error: 'No payment proof found.' }, { status: 404 })
    }

    const url = cloudinary.url(doc.proof.publicId, {
      type: 'authenticated',
      resource_type: doc.proof.resourceType || 'image',
      sign_url: true,
      secure: true,
      format: doc.proof.format || undefined,
    })
    return NextResponse.redirect(url, { status: 302, headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('Proof view error:', err.message)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
