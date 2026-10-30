import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import LoginAttempt from '@/models/LoginAttempt'
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from '@/lib/auth'

export const runtime = 'nodejs'

const schema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
})

const hashIp = (ip) =>
  createHash('sha256').update(`${process.env.IP_SALT ?? ''}${ip}`).digest('hex')

// Email galat bhaye pani password compare garne (samaya ko pharak bata email chinna nasakos)
let dummyHash
const getDummyHash = async () => {
  if (!dummyHash) dummyHash = await bcrypt.hash('not-the-password', 12)
  return dummyHash
}

export async function POST(request) {
  const { ADMIN_EMAIL, ADMIN_PASSWORD_HASH_B64 } = process.env
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH_B64) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 400 })
  }
  const { email, password } = parsed.data

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const ipHash = hashIp(ip)

  try {
    await connectDB()

    // 15 minute ma 5 choti galat bhayo bhane block
    const failures = await LoginAttempt.countDocuments({ ipHash })
    if (failures >= 5) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again in 15 minutes.' },
        { status: 429 },
      )
    }

    const realHash = Buffer.from(ADMIN_PASSWORD_HASH_B64, 'base64').toString('utf8')
    const emailOk = email.toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()
    const passwordOk = await bcrypt.compare(password, emailOk ? realHash : await getDummyHash())

    if (!emailOk || !passwordOk) {
      await LoginAttempt.create({ ipHash })
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    await LoginAttempt.deleteMany({ ipHash })
    const token = await createSessionToken(ADMIN_EMAIL.trim().toLowerCase())
    const response = NextResponse.json({ ok: true })
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions)
    return response
  } catch (err) {
    console.error('Admin login error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}