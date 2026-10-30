import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const SESSION_COOKIE = 'trinexa_admin'
const MAX_AGE = 60 * 60 * 8 // 8 ghanta

const secretKey = () => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET must be at least 32 characters')
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(email) {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey())
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: MAX_AGE,
}

// Login bhayeko admin bhaye { email }, nabhaye null
export async function getAdmin() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] })
    return payload.role === 'admin' ? { email: payload.sub } : null
  } catch {
    return null
  }
}

// Admin page ma: login nabhaye login page ma pathaune
export async function requireAdmin() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  return admin
}