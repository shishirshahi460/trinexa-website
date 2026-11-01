'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

const options = {
  enrollments: ['pending', 'confirmed', 'cancelled'],
  enquiries: ['new', 'contacted', 'closed'],
}

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-forest focus:border-brand'

export default function AdminExport() {
  const [type, setType] = useState('enrollments')
  const [status, setStatus] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const invalidRange = from && to && from > to

  const params = new URLSearchParams({ type, status })
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  const href = `/api/admin/export?${params.toString()}`

  return (
    <section className="bg-soft py-10 md:py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold">Export to CSV</h1>
        <p className="mt-2 text-muted">
          Excel ya Google Sheets ma khulne file download garnus. Status ra miti anusar filter garna milchha.
        </p>

        <div className="mt-8 space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <fieldset>
            <legend className="text-sm font-semibold text-forest">What to export</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {[
                ['enrollments', 'Enrollments'],
                ['enquiries', 'Enquiries'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={type === value}
                  onClick={() => {
                    setType(value)
                    setStatus('all')
                  }}
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                    type === value ? 'bg-brand text-white' : 'border border-line bg-white text-forest hover:border-brand'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="status" className="text-sm font-semibold text-forest">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={`${fieldClass} capitalize`}>
              <option value="all">All statuses</option>
              {options[type].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="from" className="text-sm font-semibold text-forest">From (optional)</label>
              <input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="to" className="text-sm font-semibold text-forest">To (optional)</label>
              <input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} className={fieldClass} />
            </div>
          </div>

          {invalidRange && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              The &quot;From&quot; date must be before the &quot;To&quot; date.
            </p>
          )}

          <a
            href={invalidRange ? undefined : href}
            aria-disabled={invalidRange ? 'true' : undefined}
            className={`inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest ${
              invalidRange ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <Download size={16} aria-hidden="true" /> Download CSV
          </a>

          <p className="rounded-lg bg-soft p-4 text-xs text-muted">
            Yo file ma student ko naam, phone, email ra address chha. Download garepachhi surakshit thau ma rakhnus, kasailai
            share nagarnus, ra kaam sakepachhi delete garnus.
          </p>
        </div>
      </div>
    </section>
  )
}