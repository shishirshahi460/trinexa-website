import { NextResponse } from 'next/server'
import { createHash, randomBytes } from 'node:crypto'
import { connectDB } from '@/lib/db'
import Enrollment from '@/models/Enrollment'
import { enrollSchema } from '@/lib/validators'
import { sendNotification } from '@/lib/mailer'
import { courses } from '@/data/academyCourses'
import { courseTerms } from '@/data/courseFees'
import { paymentGroups } from '@/data/payment'

export const runtime = 'nodejs'

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // O, 0, I, 1 chhodeko (padhna sajilo)

const hashIp = (ip) =>
  createHash('sha256').update(`${process.env.IP_SALT ?? ''}${ip}`).digest('hex')

function makeReference() {
  const bytes = randomBytes(6)
  return `TRX-${Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')}`
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: bot le bharyo bhane success jasto dekhaune, tara save nagarne
  if (typeof body?.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Dherai chhito (5 second bhanda kam) bhayo bhane bot hola
  if (typeof body?.startedAt === 'number' && Date.now() - body.startedAt < 5000) {
    return NextResponse.json({ error: 'Please take a moment and try again.' }, { status: 400 })
  }

  const parsed = enrollSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 400 })
  }
  const data = parsed.data

  // Course ra payment method sachho ho ki server ma pheri check
  const course = courses.find((c) => c.slug === data.course)
  const method = paymentGroups.flatMap((g) => g.methods).find((m) => m.id === data.method)
  if (!course || !method) {
    return NextResponse.json({ error: 'Please choose a valid course and payment method.' }, { status: 400 })
  }
  const expectedFee = courseTerms[course.slug]?.fee?.offer

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const ipHash = hashIp(ip)

  try {
    await connectDB()

    // Ek IP bata 10 minute ma 5 bhanda badhi navayo
    const since = new Date(Date.now() - 10 * 60 * 1000)
    const recent = await Enrollment.countDocuments({ ipHash, createdAt: { $gte: since } })
    if (recent >= 5) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes and try again.' },
        { status: 429 },
      )
    }

    // Reference code banaune (duplicate bhayo bhane pheri try)
    let doc = null
    for (let i = 0; i < 3 && !doc; i += 1) {
      try {
        doc = await Enrollment.create({
          reference: makeReference(),
          courseSlug: course.slug,
          courseTitle: course.title,
          name: data.name,
          email: data.email,
          mobile: `+977 ${data.mobile}`,
          address: data.address,
          college: data.college,
          otherCourse: data.otherCourse,
          paymentMethod: method.label,
          amount: data.amount,
          expectedFee,
          transactionRef: data.ref,
          remarks: data.remarks,
          agreedToTerms: true,
          ipHash,
        })
      } catch (err) {
        if (err.code !== 11000) throw err
      }
    }
    if (!doc) throw new Error('Could not create a reference code')

    await sendNotification({
      subject: `New enrollment ${doc.reference}: ${course.title}`,
      replyTo: data.email,
      text: [
        `Reference: ${doc.reference}`,
        `Course: ${course.title}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Mobile: +977 ${data.mobile}`,
        `Address: ${data.address}`,
        `College: ${data.college || '-'}`,
        `Other course: ${data.otherCourse || '-'}`,
        '',
        `Payment method: ${method.label}`,
        `Amount: NPR ${data.amount}${expectedFee ? ` (offer fee: NPR ${expectedFee})` : ''}`,
        `Transaction ID: ${data.ref || '-'}`,
        `Remarks: ${data.remarks || '-'}`,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true, reference: doc.reference })
  } catch (err) {
    console.error('Enroll API error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}