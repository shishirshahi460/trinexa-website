import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { connectDB } from '@/lib/db'
import Enquiry from '@/models/Enquiry'
import { contactSchema } from '@/lib/validators'
import { sendNotification } from '@/lib/mailer'

export const runtime = 'nodejs'

const hashIp = (ip) =>
  createHash('sha256').update(`${process.env.IP_SALT ?? ''}${ip}`).digest('hex')

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

  // Dherai chhito (3 second bhanda kam) bhayo bhane bot hola
  if (typeof body?.startedAt === 'number' && Date.now() - body.startedAt < 3000) {
    return NextResponse.json({ error: 'Please take a moment and try again.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 400 })
  }
  const data = parsed.data

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const ipHash = hashIp(ip)

  try {
    await connectDB()

    // Ek IP bata 10 minute ma 3 bhanda badhi navayo
    const since = new Date(Date.now() - 10 * 60 * 1000)
    const recent = await Enquiry.countDocuments({ ipHash, createdAt: { $gte: since } })
    if (recent >= 3) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a few minutes and try again.' },
        { status: 429 },
      )
    }

    await Enquiry.create({
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      topic: data.topic,
      message: data.message,
      ipHash,
    })

    await sendNotification({
      subject: `New website enquiry: ${data.topic}`,
      replyTo: data.email,
      text: [
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        `Email: ${data.email}`,
        `Looking for: ${data.topic}`,
        '',
        data.message,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}