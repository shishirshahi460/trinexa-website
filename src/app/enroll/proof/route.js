import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Enrollment from '@/models/Enrollment'
import cloudinary, { cloudinaryReady } from '@/lib/cloudinary'
import { hashToken, safeEqual, detectType } from '@/lib/proof'
import { sendNotification } from '@/lib/mailer'

export const runtime = 'nodejs'

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB (Vercel ko request limit 4.5 MB)
const MAX_UPLOADS = 3

const uploadBuffer = (buffer, options) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (err, result) => (err ? reject(err) : resolve(result))).end(buffer)
  })

const fail = (error, status) => NextResponse.json({ error }, { status })

export async function POST(request) {
  if (!cloudinaryReady()) {
    return fail('Upload is not available right now. Please send your screenshot on WhatsApp or email.', 503)
  }

  let form
  try {
    form = await request.formData()
  } catch {
    return fail('Invalid request.', 400)
  }

  const reference = String(form.get('reference') ?? '').trim().toUpperCase()
  const token = String(form.get('token') ?? '')
  const file = form.get('file')

  if (!/^TRX-[A-Z2-9]{6}$/.test(reference) || token.length < 20 || !(file instanceof File)) {
    return fail('Invalid request.', 400)
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return fail('Please choose a file under 4 MB.', 400)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const type = detectType(buffer)
  if (!type) return fail('Please upload a JPG, PNG or WebP image, or a PDF.', 400)

  try {
    await connectDB()
    const doc = await Enrollment.findOne({ reference }).select('+proofTokenHash')
    if (!doc || !doc.proofTokenHash || !safeEqual(doc.proofTokenHash, hashToken(token))) {
      return fail('We could not verify this upload.', 403)
    }
    if (doc.proofUploads >= MAX_UPLOADS) {
      return fail('Upload limit reached. Please send your screenshot on WhatsApp or email.', 429)
    }

    const result = await uploadBuffer(buffer, {
      folder: 'trinexa/proofs',
      public_id: `${reference}-${Date.now()}`,
      type: 'authenticated', // private: link bina sign garera khulna sakdaina
      resource_type: 'auto',
      overwrite: false,
    })

    const old = doc.proof?.publicId ? { publicId: doc.proof.publicId, resourceType: doc.proof.resourceType } : null

    doc.proof = {
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format ?? '',
      bytes: result.bytes,
      uploadedAt: new Date(),
    }
    doc.proofUploads += 1
    await doc.save()

    // Purano file hataune (nasake pani thik chha)
    if (old) {
      cloudinary.uploader
        .destroy(old.publicId, { type: 'authenticated', resource_type: old.resourceType })
        .catch(() => {})
    }

    await sendNotification({
      subject: `Payment proof uploaded for ${reference}`,
      text: `${doc.name} uploaded a payment proof for ${doc.courseTitle} (${reference}).\nOpen the admin dashboard and click "View payment proof".`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Proof upload error:', err.message)
    return fail('Upload failed. Please try again.', 500)
  }
}