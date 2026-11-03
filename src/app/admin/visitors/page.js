import { Users, Eye, Layers, Radio } from 'lucide-react'
import { requireAdmin } from '@/lib/auth'
import { parseRange } from '@/lib/stats'
import { getAnalytics } from '@/lib/analytics'
import {
  Card,
  Kpi,
  RangeTabs,
  LineChart,
  HBars,
  Donut,
  pct,
  nf,
  shortDate,
  countryName,
  sourceLabel,
  capitalize,
} from '@/components/admin/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin: Visitors' }

export default async function Page({ searchParams }) {
  await requireAdmin()
  const { range } = await searchParams
  const days = parseRange(range)
  const web = await getAnalytics(days, 12)

  const perVisitor = web.visitors ? (web.views / web.visitors).toFixed(1) : '0'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Visitors</h1>
          <p className="mt-1 text-sm text-muted">Last {days} days. Anonymous, cookie-free counting.</p>
        </div>
        <RangeTabs base="/admin/visitors" current={days} />
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Visitors" value={nf.format(web.visitors)} delta={pct(web.visitors, web.prevVisitors)} icon={Users} hint="Unique per day, added up" />
        <Kpi label="Page views" value={nf.format(web.views)} delta={pct(web.views, web.prevViews)} icon={Eye} />
        <Kpi label="Views per visitor" value={perVisitor} icon={Layers} />
        <Kpi label="Active right now" value={nf.format(web.activeNow)} icon={Radio} hint="Last 5 minutes" />
      </ul>

      <Card
        className="mt-6"
        title="Visitors and page views"
        action={
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#6FD9A0]" /> Page views</span>
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

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Countries">
          <HBars items={web.countries.map((c) => ({ label: countryName(c.label), value: c.value }))} />
        </Card>
        <Card title="Cities">
          <HBars items={web.cities.map((c) => ({ label: c.label, value: c.value }))} empty="No city data yet (appears on the live site)" />
        </Card>
        <Card title="Devices">
          <Donut items={web.devices.map((d) => ({ label: capitalize(d.label), value: d.value }))} />
        </Card>
        <Card title="Browsers">
          <HBars items={web.browsers} />
        </Card>
        <Card title="Operating systems">
          <HBars items={web.systems} />
        </Card>
        <Card title="Traffic sources">
          <HBars items={web.sources.map((s) => ({ label: sourceLabel(s.label), value: s.value }))} />
        </Card>
      </div>

      <Card className="mt-6" title="Top pages">
        {web.pages.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No page views yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="py-2 font-semibold">Page</th>
                <th className="py-2 text-right font-semibold">Views</th>
              </tr>
            </thead>
            <tbody>
              {web.pages.map((p) => (
                <tr key={p.label} className="border-b border-line last:border-0">
                  <td className="truncate py-2.5 pr-4 text-forest">{p.label}</td>
                  <td className="py-2.5 text-right font-semibold text-forest">{nf.format(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <p className="mt-6 text-xs text-muted">
        Bot, &quot;Do Not Track&quot; ra admin ko afno visit ginindaina. Yo tracker chalu bhayeko din dekhi matra data chha.
        Google Analytics ko number sanga ali farak huna sakchha.
      </p>
    </div>
  )
}