'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-forest placeholder:text-muted focus:border-brand'

// "15 Jan 2027 | 07:00 AM - 08:30 AM, 05:00 PM - 06:30 PM" (ek line = ek date)
const batchesToText = (batches) => batches.map((b) => `${b.date} | ${b.times.join(', ')}`).join('\n')

const textToBatches = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [date, rest = ''] = line.split('|')
      return {
        date: date.trim(),
        times: rest
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }
    })
    .filter((b) => b.date)

const toValues = (s) => ({
  duration: s.duration,
  original: String(s.original),
  offer: String(s.offer),
  offerEnds: s.offerEnds,
  batches: batchesToText(s.batches),
})

function CourseEditor({ item }) {
  const router = useRouter()
  const [custom, setCustom] = useState(item.custom)
  const [values, setValues] = useState(toValues(item))
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }))

  const request = async (method, body) => {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/courses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return null
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Could not save. Please try again.')
      return data
    } catch (err) {
      setMessage({ ok: false, text: err.message })
      return null
    } finally {
      setBusy(false)
    }
  }

  const save = async () => {
    const data = await request('PUT', {
      slug: item.slug,
      duration: values.duration.trim(),
      original: Number(values.original),
      offer: Number(values.offer),
      offerEnds: values.offerEnds,
      batches: textToBatches(values.batches),
    })
    if (data) {
      setValues(toValues(data.settings))
      setCustom(true)
      setMessage({ ok: true, text: 'Saved. The website is updated.' })
    }
  }

  const reset = async () => {
    if (!window.confirm('Reset this course to the default values from the code?')) return
    const data = await request('DELETE', { slug: item.slug })
    if (data) {
      setValues(toValues(data.settings))
      setCustom(false)
      setMessage({ ok: true, text: 'Reset to default.' })
    }
  }

  return (
    <li className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            custom ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {custom ? 'Customised' : 'Default'}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor={`${item.slug}-duration`} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Duration
          </label>
          <input id={`${item.slug}-duration`} value={values.duration} onChange={set('duration')} className={fieldClass} placeholder="3 months" />
        </div>
        <div>
          <label htmlFor={`${item.slug}-original`} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Regular fee (NPR)
          </label>
          <input id={`${item.slug}-original`} type="number" min="0" value={values.original} onChange={set('original')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${item.slug}-offer`} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Offer fee (NPR)
          </label>
          <input id={`${item.slug}-offer`} type="number" min="0" value={values.offer} onChange={set('offer')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${item.slug}-ends`} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Offer ends on
          </label>
          <input id={`${item.slug}-ends`} type="date" value={values.offerEnds} onChange={set('offerEnds')} className={fieldClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${item.slug}-batches`} className="text-xs font-semibold uppercase tracking-wider text-muted">
          Batches (ek line ma ek date: <code>date | time, time</code>)
        </label>
        <textarea
          id={`${item.slug}-batches`}
          rows={3}
          value={values.batches}
          onChange={set('batches')}
          className={`${fieldClass} font-mono`}
          placeholder={'15 Jan 2027 | 07:00 AM - 08:30 AM, 05:00 PM - 06:30 PM\n01 Feb 2027 | 07:00 AM - 08:30 AM'}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="inline-flex min-h-10 items-center rounded-lg bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60"
        >
          {busy ? 'Saving...' : 'Save'}
        </button>
        {custom && (
          <button
            type="button"
            onClick={reset}
            disabled={busy}
            className="inline-flex min-h-10 items-center rounded-lg border border-line bg-white px-5 py-2 text-sm font-semibold text-forest transition-colors hover:border-brand disabled:opacity-60"
          >
            Reset to default
          </button>
        )}
        {message && (
          <p role="status" className={`text-sm font-medium ${message.ok ? 'text-green-700' : 'text-red-700'}`}>
            {message.text}
          </p>
        )}
      </div>
    </li>
  )
}

export default function AdminCourses({ items }) {
  return (
    <section className="bg-soft py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="mt-2 max-w-3xl text-muted">
          Fee, offer, duration ra batch yaha badalnus. Save garne bittikai website ma dekhinchha. Offer ko miti pugepachhi
          offer aafai band huncha ra regular fee matra dekhinchha. Batch halna chhadyo bhane &quot;dates not announced&quot;
          dekhinchha.
        </p>

        <ul className="mt-8 space-y-5">
          {items.map((item) => (
            <CourseEditor key={item.slug} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}