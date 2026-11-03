import Link from 'next/link'
import { Users, GraduationCap, Wallet, Mail, Radio } from 'lucide-react'
import { requireAdmin } from '@/lib/auth'
import { getBusinessStats, parseRange } from '@/lib/stats'
import { getAnalytics } from '@/lib/analytics'
import {
  Card,
  Kpi,
  RangeTabs,
  LineChart,
  BarChart,
  HBars,
  Donut,
  pct,
  nf,
  npr,
  shortDate,
  countryName,
  sourceLabel,
  capitalize,
  timeAgo,
  badge,
} from '@/components/admin/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin: Overview' }

export default async function Page({ searchParams }) {
  await requireAdmin()
  const { range } = await searchParams
  const days = parseRange(range)

  const [biz, web] = await Promise.all([getBusinessStats(days), getAnalytics(days, 6)])
  const today = web.series[web.series.length - 1]
  const pending = biz.statusCounts.pending ?? 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="mt-1 text-sm text-muted">Last {days} days compared with the {days} days before.</p>
        </div>
        <RangeTabs base="/admin" current={days} />
      </div>

      {/* KPI */}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Visitors" value={nf.format(web.visitors)} delta={pct(web.visitors, web.prevVisitors)} icon={Users} hint={`${nf.format(web.views)} page views`} />
        <Kpi label="Enrollments" value={nf.format(biz.enrollments.now)} delta={pct(biz.enrollments.now, biz.enrollments.prev)} icon={GraduationCap} hint={`${pending} pending review`} />
        <Kpi label="Revenue (confirmed)" value={npr(biz.revenue.now)} delta={pct(biz.revenue.now, biz.revenue.prev)} icon={Wallet} hint={`${npr(biz.pendingAmount)} waiting for confirmation`} />
        <Kpi label="Enquiries" value={nf.format(biz.enquiries.now)} delta={pct(biz.enquiries.now, biz.enquiries.prev)} icon={Mail} hint={`${biz.newEnquiries} new, not answered`} />
      </ul>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Left / main */}
        <div className="space-y-6 xl:col-span-2">
          <Card
            title="Visitors and page views"
            action={
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#6FD9A0]" /> Views</span>
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-brand" /> Visitors</span>
              </div>
            }
          >
            <LineChart
              data={web.series.map((s) => ({ label: shortDate(s.key), visitors: s.visitors, views: s.views }))}
              lines={[
                { key: 'views', color: '#6FD9A0', fill: true },
                { key: 'visitors', color: '#16834A' },
              ]}
            />
          </Card>

          <Card title="Enrollments per day">
            <BarChart data={biz.series.map((s) => ({ label: shortDate(s.key), value: s.enrollments }))} />
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Top countries">
              <HBars items={web.countries.map((c) => ({ label: countryName(c.label), value: c.value }))} />
            </Card>
            <Card title="Devices">
              <Donut items={web.devices.map((d) => ({ label: capitalize(d.label), value: d.value }))} />
            </Card>
            <Card title="Traffic sources">
              <HBars items={web.sources.map((s) => ({ label: sourceLabel(s.label), value: s.value }))} />
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Top pages" action={<Link href="/admin/visitors" className="text-xs font-semibold text-brand hover:underline">See all</Link>}>
              <HBars items={web.pages.slice(0, 6)} format={(v) => `${nf.format(v)} views`} />
            </Card>
            <Card title="Courses (enrollments)">
              <HBars
                items={biz.byCourse.map((c) => ({ label: c.label, value: c.count }))}
                empty="No enrollments in this period"
              />
            </Card>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <section className="rounded-2xl bg-gradient-to-br from-brand to-forest p-5 text-white shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <Radio size={16} aria-hidden="true" /> Active visitors right now
            </div>
            <p className="mt-2 font-heading text-4xl font-bold">{nf.format(web.activeNow)}</p>
            <p className="mt-1 text-xs text-white/70">
              Last 5 minutes. Today: {nf.format(today?.visitors ?? 0)} visitors, {nf.format(today?.views ?? 0)} page views.
            </p>
            <Link href="/admin/visitors" className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-white hover:underline">
              Full visitor report →
            </Link>
          </section>

          <Card title="Activity" action={<Link href="/admin/records" className="text-xs font-semibold text-brand hover:underline">Open</Link>}>
            {biz.activity.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">Nothing yet.</p>
            ) : (
              <ul className="space-y-4">
                {biz.activity.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        a.type === 'enrollment' ? 'bg-brand text-white' : 'bg-soft text-brand'
                      }`}
                    >
                      {a.title.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-forest">{a.title}</p>
                      <p className="truncate text-xs text-muted">{a.text}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${badge[a.status]}`}>
                        {a.status}
                      </span>
                      <p className="mt-1 text-[11px] text-muted">{timeAgo(a.at)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Enrollment status (all time)">
            <Donut
              items={['pending', 'confirmed', 'cancelled']
                .map((s) => ({ label: capitalize(s), value: biz.statusCounts[s] ?? 0 }))
                .filter((i) => i.value > 0)}
            />
          </Card>

          <Card title="Payment methods">
            <HBars items={biz.byMethod} format={(v) => `${nf.format(v)} orders`} empty="No payments in this period" />
          </Card>
        </div>
      </div>
    </div>
  )
}