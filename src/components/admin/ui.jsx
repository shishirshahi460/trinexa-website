import Link from 'next/link'
import { ArrowUp, ArrowDown } from 'lucide-react'

export const nf = new Intl.NumberFormat('en-US')
export const npr = (n) => `NPR ${Math.round(n).toLocaleString('en-US')}`

export const pct = (now, prev) => {
  if (!prev) return now > 0 ? 100 : 0
  return Math.round(((now - prev) / prev) * 100)
}

export const shortDate = (key) =>
  new Date(`${key}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })

export const countryName = (code) => {
  if (!code || code === 'Unknown') return 'Unknown'
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}

export const sourceLabel = (value) => {
  if (!value) return 'Direct'
  if (value.startsWith('utm:')) return `${value.slice(4)} (campaign)`
  return value
}

export const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

export function timeAgo(iso) {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000))
  if (s < 60) return 'just now'
  const m = Math.round(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} hr ago`
  return `${Math.round(h / 24)} d ago`
}

export const badge = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-amber-100 text-amber-800',
  closed: 'bg-gray-100 text-gray-700',
}

export const palette = ['#16834A', '#6FD9A0', '#153D2B', '#F59E0B', '#94A3B8', '#38BDF8']

export function Card({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-5 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-sm font-bold uppercase tracking-wider text-forest">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Delta({ value }) {
  if (value === 0) return <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">0%</span>
  const up = value > 0
  const Icon = up ? ArrowUp : ArrowDown
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
        up ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
      }`}
    >
      <Icon size={12} aria-hidden="true" />
      {Math.abs(value)}%
    </span>
  )
}

export function Kpi({ label, value, delta, hint, icon: Icon }) {
  return (
    <li className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand">
          <Icon size={22} aria-hidden="true" />
        </span>
        {delta != null && <Delta value={delta} />}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-heading text-2xl font-bold text-forest">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </li>
  )
}

export function RangeTabs({ base, current }) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-white p-1" role="group" aria-label="Date range">
      {[7, 30, 90].map((d) => (
        <Link
          key={d}
          href={`${base}?range=${d}`}
          aria-current={current === d ? 'true' : undefined}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
            current === d ? 'bg-brand text-white' : 'text-body hover:text-brand'
          }`}
        >
          {d} days
        </Link>
      ))}
    </div>
  )
}

function AxisLabels({ data }) {
  if (!data.length) return null
  const mid = data[Math.floor(data.length / 2)]
  return (
    <div className="mt-2 flex justify-between text-xs text-muted">
      <span>{data[0].label}</span>
      <span>{mid.label}</span>
      <span>{data[data.length - 1].label}</span>
    </div>
  )
}

// lines: [{ key, color, fill }]
export function LineChart({ data, lines }) {
  const W = 600
  const H = 180
  const pad = 8
  const max = Math.max(1, ...data.flatMap((d) => lines.map((l) => d[l.key])))
  const x = (i) => (data.length > 1 ? (i / (data.length - 1)) * W : W / 2)
  const y = (v) => H - pad - (v / max) * (H - pad * 2)

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-48 w-full" role="img" aria-label="Trend chart">
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} stroke="#E5EDE6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {lines.map((l) => {
          const pts = data.map((d, i) => `${x(i)},${y(d[l.key])}`).join(' ')
          return (
            <g key={l.key}>
              {l.fill && <polygon points={`0,${H} ${pts} ${W},${H}`} fill={l.color} opacity="0.12" />}
              <polyline
                points={pts}
                fill="none"
                stroke={l.color}
                strokeWidth="2.5"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>
      <AxisLabels data={data} />
    </div>
  )
}

export function BarChart({ data, color = '#16834A', format = (v) => nf.format(v) }) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <div>
      <div className="flex h-44 items-end gap-[3px]">
        {data.map((d) => (
          <div key={d.label} title={`${d.label}: ${format(d.value)}`} className="relative h-full flex-1">
            <div className="absolute inset-0 rounded-t bg-soft" />
            <div
              className="absolute inset-x-0 bottom-0 rounded-t"
              style={{ height: `${(d.value / max) * 100}%`, background: color, minHeight: d.value ? 3 : 0 }}
            />
          </div>
        ))}
      </div>
      <AxisLabels data={data} />
    </div>
  )
}

export function HBars({ items, format = (v) => nf.format(v), empty = 'No data yet' }) {
  if (!items.length) return <p className="py-6 text-center text-sm text-muted">{empty}</p>
  const max = Math.max(...items.map((i) => i.value)) || 1
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.label}>
          <div className="flex justify-between gap-3 text-sm">
            <span className="truncate text-forest">{i.label}</span>
            <span className="shrink-0 font-semibold text-forest">{format(i.value)}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-soft">
            <div className="h-full rounded-full bg-brand" style={{ width: `${(i.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Donut({ items, empty = 'No data yet' }) {
  const sum = items.reduce((t, i) => t + i.value, 0)
  if (!sum) return <p className="py-6 text-center text-sm text-muted">{empty}</p>

  const R = 40
  const C = 2 * Math.PI * R
  let offset = 0

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="size-32 shrink-0 -rotate-90" role="img" aria-label="Breakdown chart">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#F4F8F3" strokeWidth="14" />
        {items.map((it, i) => {
          const len = (it.value / sum) * C
          const el = (
            <circle
              key={it.label}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={palette[i % palette.length]}
              strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
            />
          )
          offset += len
          return el
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full" style={{ background: palette[i % palette.length] }} />
              <span className="truncate">{it.label}</span>
            </span>
            <span className="font-semibold text-forest">{Math.round((it.value / sum) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}