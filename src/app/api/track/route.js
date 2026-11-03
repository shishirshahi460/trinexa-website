import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import PageView from '@/models/PageView'
import { parseUA } from '@/lib/ua'

export const runtime = 'nodejs'

const done = () => new NextResponse(null, { status: 204 })

export async function POST(request) {
  try {
    // "Do Not Track" ko samman
    if (request.headers.get('dnt') === '1') return done()

    const ua = request.headers.get('user-agent') ?? ''
    const { isBot, device, browser, os } = parseUA(ua)
    if (isBot) return done()

    let body
    try {
      body = await request.json()
    } catch {
      return done()
    }

    const path = typeof body?.path === 'string' ? body.path.slice(0, 200) : ''
    if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/admin') || path.startsWith('/api')) {
      return done()
    }

    // Admin (tapai) afno visit gindaina
    if (await getAdmin()) return done()

    let referrer = ''
    if (typeof body.referrer === 'string' && body.referrer) {
      const r = body.referrer.trim().slice(0, 100).toLowerCase().replace(/^www\./, '')
      const own = (request.headers.get('host') ?? '').toLowerCase().split(':')[0]
      referrer = r === own ? '' : r
    }

    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
    const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kathmandu' })
    const visitorHash = createHash('sha256')
      .update(`${process.env.IP_SALT ?? ''}|${day}|${ip}|${ua}`)
      .digest('hex')
      .slice(0, 32)

    const country = (request.headers.get('x-vercel-ip-country') ?? 'Unknown').slice(0, 10)
    let city = request.headers.get('x-vercel-ip-city') ?? ''
    try {
      city = decodeURIComponent(city)
    } catch {
      /* chhodidine */
    }

    await connectDB()
    await PageView.create({ path, visitorHash, country, city: city.slice(0, 80), device, browser, os, referrer })
  } catch (err) {
    console.error('Track error:', err.message)
  }
  return done()
}