import { connectDB } from '@/lib/db'
import PageView from '@/models/PageView'

const TZ = 'Asia/Kathmandu'
const DAY = 24 * 60 * 60 * 1000

const dayKeys = (days) =>
  Array.from({ length: days }, (_, i) =>
    new Date(Date.now() - (days - 1 - i) * DAY).toLocaleDateString('en-CA', { timeZone: TZ }),
  )

const withDay = {
  $addFields: { day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: TZ } } },
}

// Ek din ma ek visitor ek choti ginne
const uniqueBy = (expr, limit) => [
  { $group: { _id: { d: '$day', v: '$visitorHash', k: expr } } },
  { $group: { _id: '$_id.k', visitors: { $sum: 1 } } },
  { $sort: { visitors: -1 } },
  { $limit: limit },
]

const rows = (list = []) => list.map((r) => ({ label: r._id ?? '', value: r.visitors }))

export async function getAnalytics(days, limit = 8) {
  await connectDB()
  const now = Date.now()
  const since = new Date(now - days * DAY)
  const prevSince = new Date(now - 2 * days * DAY)

  const daily = (match) => [
    { $match: match },
    withDay,
    { $group: { _id: { d: '$day', v: '$visitorHash' }, views: { $sum: 1 } } },
    { $group: { _id: '$_id.d', visitors: { $sum: 1 }, views: { $sum: '$views' } } },
  ]

  const [current, previous, facets, active] = await Promise.all([
    PageView.aggregate(daily({ createdAt: { $gte: since } })),
    PageView.aggregate(daily({ createdAt: { $gte: prevSince, $lt: since } })),
    PageView.aggregate([
      { $match: { createdAt: { $gte: since } } },
      withDay,
      {
        $facet: {
          countries: uniqueBy('$country', limit),
          cities: [
            { $match: { city: { $ne: '' } } },
            ...uniqueBy({ $concat: ['$city', ', ', '$country'] }, limit),
          ],
          devices: uniqueBy('$device', 5),
          browsers: uniqueBy('$browser', limit),
          systems: uniqueBy('$os', limit),
          sources: uniqueBy('$referrer', limit),
          pages: [{ $group: { _id: '$path', views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: limit + 4 }],
        },
      },
    ]),
    PageView.distinct('visitorHash', { createdAt: { $gte: new Date(now - 5 * 60 * 1000) } }),
  ])

  const byDay = Object.fromEntries(current.map((d) => [d._id, d]))
  const series = dayKeys(days).map((key) => ({
    key,
    visitors: byDay[key]?.visitors ?? 0,
    views: byDay[key]?.views ?? 0,
  }))
  const sum = (list, field) => list.reduce((t, x) => t + x[field], 0)
  const f = facets[0] ?? {}

  return {
    series,
    visitors: sum(current, 'visitors'),
    views: sum(current, 'views'),
    prevVisitors: sum(previous, 'visitors'),
    prevViews: sum(previous, 'views'),
    activeNow: active.length,
    countries: rows(f.countries),
    cities: rows(f.cities),
    devices: rows(f.devices),
    browsers: rows(f.browsers),
    systems: rows(f.systems),
    sources: rows(f.sources),
    pages: (f.pages ?? []).map((r) => ({ label: r._id, value: r.views })),
  }
}