'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Search } from 'lucide-react'
import { npr } from '../data/courseFees.js'

const statusOptions = {
  enrollments: ['pending', 'confirmed', 'cancelled'],
  enquiries: ['new', 'contacted', 'closed'],
}

const badge = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-amber-100 text-amber-800',
  closed: 'bg-gray-100 text-gray-700',
}

const fieldClass =
  'rounded-lg border border-line bg-white px-3 py-2 text-sm text-forest focus:border-brand'

// suppressHydrationWarning: server ra browser ko time zone alag huna sakchha
function When({ iso }) {
  if (!iso) return null
  return (
    <time dateTime={iso} suppressHydrationWarning className="text-xs text-muted">
      {new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
    </time>
  )
}

function StatusSelect({ value, options, disabled, onChange }) {
  return (
    <select
      aria-label="Status"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`${fieldClass} font-semibold capitalize disabled:opacity-60`}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export default function AdminDashboard({ email, enrollments: initialEnrollments, enquiries: initialEnquiries }) {
  const router = useRouter()
  const [tab, setTab] = useState('enrollments')
  const [enrollments, setEnrollments] = useState(initialEnrollments)
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  const isEnrollments = tab === 'enrollments'
  const list = isEnrollments ? enrollments : enquiries
  const options = statusOptions[tab]
  const type = isEnrollments ? 'enrollment' : 'enquiry'

  const pendingCount = enrollments.filter((e) => e.status === 'pending').length
  const newCount = enquiries.filter((e) => e.status === 'new').length

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return list.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false
      if (!q) return true
      return [item.name, item.email, item.mobile, item.reference, item.courseTitle, item.topic].some((v) =>
        v?.toLowerCase().includes(q),
      )
    })
  }, [list, query, statusFilter])

  const switchTab = (next) => {
    setTab(next)
    setStatusFilter('all')
    setQuery('')
  }

  const updateStatus = async (id, status) => {
    setBusy(id)
    setError('')
    try {
      const res = await fetch('/api/admin/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status }),
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('Could not update the status. Please try again.')
      const apply = (items) => items.map((i) => (i._id === id ? { ...i, status } : i))
      if (isEnrollments) setEnrollments(apply)
      else setEnquiries(apply)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <section className="bg-soft py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin dashboard</h1>
            <p className="mt-1 text-sm text-muted">Signed in as {email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-5 py-2 text-sm font-semibold text-forest transition-colors hover:border-brand"
          >
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </div>

        {/* Counts */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-xl border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Pending enrollments</p>
            <p className="mt-2 text-3xl font-bold text-forest">{pendingCount}</p>
          </li>
          <li className="rounded-xl border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">New enquiries</p>
            <p className="mt-2 text-3xl font-bold text-forest">{newCount}</p>
          </li>
          <li className="rounded-xl border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Total records</p>
            <p className="mt-2 text-3xl font-bold text-forest">{enrollments.length + enquiries.length}</p>
          </li>
        </ul>

        {/* Tabs + filters */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {[
            ['enrollments', `Enrollments (${enrollments.length})`],
            ['enquiries', `Enquiries (${enquiries.length})`],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => switchTab(id)}
              aria-pressed={tab === id}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === id ? 'bg-brand text-white' : 'border border-line bg-white text-forest hover:border-brand'
              }`}
            >
              {label}
            </button>
          ))}

          <div className="relative ml-auto w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, code..."
              aria-label="Search"
              className={`${fieldClass} w-full pl-9`}
            />
          </div>

          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${fieldClass} capitalize`}
          >
            <option value="all">All statuses</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {/* List */}
        <ul className="mt-6 space-y-4">
          {visible.length === 0 && (
            <li className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-muted">
              Nothing to show.
            </li>
          )}

          {isEnrollments &&
            visible.map((e) => {
              const partial = e.expectedFee != null && e.amount < e.expectedFee
              return (
                <li key={e._id} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-lg font-bold text-forest">{e.reference}</p>
                      <When iso={e.createdAt} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge[e.status]}`}>
                        {e.status}
                      </span>
                      <StatusSelect
                        value={e.status}
                        options={options}
                        disabled={busy === e._id}
                        onChange={(s) => updateStatus(e._id, s)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 text-sm md:grid-cols-3">
                    <div>
                      <p className="font-semibold text-forest">{e.courseTitle}</p>
                      {e.otherCourse && <p className="text-muted">Also interested: {e.otherCourse}</p>}
                      {e.college && <p className="text-muted">College: {e.college}</p>}
                    </div>
                    <div>
                      <p className="font-semibold text-forest">{e.name}</p>
                      <p>
                        <a href={`mailto:${e.email}`} className="text-brand hover:underline">{e.email}</a>
                      </p>
                      <p>
                        <a href={`tel:${e.mobile.replace(/\s/g, '')}`} className="text-brand hover:underline">{e.mobile}</a>
                      </p>
                      <p className="text-muted">{e.address}</p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold text-forest">{npr(e.amount)}</span> via {e.paymentMethod}
                      </p>
                      {e.expectedFee != null && (
                        <p className={partial ? 'font-medium text-amber-700' : 'text-muted'}>
                          Offer fee {npr(e.expectedFee)}
                          {partial ? ' (partial / advance)' : ''}
                        </p>
                      )}
                      <p className="text-muted">Transaction ID: {e.transactionRef || '-'}</p>
                      {e.remarks && <p className="text-muted">Remarks: {e.remarks}</p>}
                    </div>
                  </div>
                </li>
              )
            })}

          {!isEnrollments &&
            visible.map((q) => (
              <li key={q._id} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-forest">{q.name}</p>
                    <When iso={q.createdAt} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge[q.status]}`}>
                      {q.status}
                    </span>
                    <StatusSelect
                      value={q.status}
                      options={options}
                      disabled={busy === q._id}
                      onChange={(s) => updateStatus(q._id, s)}
                    />
                  </div>
                </div>

                <div className="mt-3 text-sm">
                  <p>
                    <a href={`mailto:${q.email}`} className="text-brand hover:underline">{q.email}</a>
                    {' · '}
                    <a href={`tel:${q.mobile.replace(/\s/g, '')}`} className="text-brand hover:underline">{q.mobile}</a>
                  </p>
                  <p className="mt-2 font-semibold text-forest">{q.topic}</p>
                  <p className="mt-1 whitespace-pre-line">{q.message}</p>
                </div>
              </li>
            ))}
        </ul>

        <p className="mt-6 text-xs text-muted">Showing the latest 200 records of each type.</p>
      </div>
    </section>
  )
}