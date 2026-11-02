import { NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import Enrollment from '@/models/Enrollment'
import Enquiry from '@/models/Enquiry'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_ROWS = 5000

const statuses = {
  enrollments: ['pending', 'confirmed', 'cancelled'],
  enquiries: ['new', 'contacted', 'closed'],
}

const dateField = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

const querySchema = z.object({
  type: z.enum(['enrollments', 'enquiries']),
  status: z.string().max(20).optional(),
  from: dateField.optional(),
  to: dateField.optional(),
})

// Excel ma formula chalna nadine: =, +, -, @ le shuru hune text ko agadi tab rakhne
const safe = (value) => {
  const s = value == null ? '' : String(value)
  return /^[=+\-@\t\r]/.test(s) ? `\t${s}` : s
}
const cell = (value) => `"${safe(value).replace(/"/g, '""')}"`
const line = (values) => values.map(cell).join(',')

// Nepal samaya: 2026-11-02 14:05:09
const when = (d) => (d ? new Date(d).toLocaleString('sv-SE', { timeZone: 'Asia/Kathmandu' }) : '')

const bad = (message = 'Invalid request.') => NextResponse.json({ error: message }, { status: 400 })

export async function GET(request) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams))
  if (!parsed.success) return bad()
  const { type, status, from, to } = parsed.data

  const filter = {}
  if (status && status !== 'all') {
    if (!statuses[type].includes(status)) return bad()
    filter.status = status
  }
  if (from || to) {
    const start = from ? new Date(`${from}T00:00:00+05:45`) : null
    const end = to ? new Date(`${to}T23:59:59.999+05:45`) : null
    if ((start && Number.isNaN(start.getTime())) || (end && Number.isNaN(end.getTime()))) return bad('Invalid date.')
    filter.createdAt = {}
    if (start) filter.createdAt.$gte = start
    if (end) filter.createdAt.$lte = end
  }

  try {
    await connectDB()
    let header
    let rows

    if (type === 'enrollments') {
      const docs = await Enrollment.find(filter).sort({ createdAt: -1 }).limit(MAX_ROWS).lean()
      header = [
        'Reference', 'Created (Nepal time)', 'Status', 'Course', 'Name', 'Email', 'Mobile', 'Address',
        'College', 'Other course', 'Payment method', 'Amount (NPR)', 'Offer fee (NPR)', 'Transaction ID', 'Remarks',
      ]
      rows = docs.map((d) => [
        d.reference, when(d.createdAt), d.status, d.courseTitle, d.name, d.email, d.mobile, d.address,
        d.college, d.otherCourse, d.paymentMethod, d.amount, d.expectedFee ?? '', d.transactionRef, d.remarks,
      ])
    } else {
      const docs = await Enquiry.find(filter).sort({ createdAt: -1 }).limit(MAX_ROWS).lean()
      header = ['Created (Nepal time)', 'Status', 'Name', 'Email', 'Mobile', 'Topic', 'Message']
      rows = docs.map((d) => [when(d.createdAt), d.status, d.name, d.email, d.mobile, d.topic, d.message])
    }

    // \uFEFF = Excel le Nepali akshar thik padhna
    const csv = `\uFEFF${[header, ...rows].map(line).join('\r\n')}\r\n`
    const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kathmandu' })

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="trinexa-${type}-${day}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Export error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}