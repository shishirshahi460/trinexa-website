import { createHash, timingSafeEqual } from 'node:crypto'

export const hashToken = (token) =>
  createHash('sha256').update(`${process.env.IP_SALT ?? ''}${token}`).digest('hex')

export function safeEqual(a, b) {
  const x = Buffer.from(String(a))
  const y = Buffer.from(String(b))
  return x.length === y.length && timingSafeEqual(x, y)
}

// File ko asli type (naam ya browser ko type ma bharosa gardainau)
export function detectType(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png'
  if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') return 'webp'
  if (buf.subarray(0, 5).toString('ascii') === '%PDF-') return 'pdf'
  return null
}