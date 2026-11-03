import { connectDB } from '@/lib/db'
import Enrollment from '@/models/Enrollment'
import Enquiry from '@/models/Enquiry'

const TZ = 'Asia/Kathmandu'
const DAY = 24 * 60 * 60 * 1000

export const parseRange = (value) => {
  const n = Number(value)
  return [7, 30, 90].includes(n) ? n : 30
}

const dayKeys = (days) =>
  Array.from({ length: days }, (_, i) =>
    new Date(Date.now() - (days - 1 - i) * DAY).toLocaleDateString('en-CA', { timeZone: TZ }),
  )

const dayExpr = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: TZ } }
const confirmedAmount = { $cond: [{ $eq: ['$status', 'confirmed'] }, '$amount', 0] }
const total = (rows) => rows[0]?.total ?? 0

export async function getBusinessStats(days) {
  await connectDB()
  const now = Date.now()
  const since = new Date(now - days * DAY)
  const prevSince = new Date(now - 2 * days * DAY)
  const inRange = { createdAt: { $gte: since } }
  const inPrev = { createdAt: { $gte: prevSince, $lt: since } }

  const sumConfirmed = (match) => [
    { $match: { ...match, status: 'confirmed' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]

  const [
    enrollNow,
    enrollPrev,
    revenueNow,
    revenuePrev,
    enrollByDay,
    enquiryNow,
    enquiryPrev,
    enquiryByDay,
    byCourse,
    byMethod,
    statusRows,
    pendingAmount,
    newEnquiries,
    latestEnrollments,
    latestEnquiries,
  ] = await Promise.all([
    Enrollment.countDocuments(inRange),
    Enrollment.countDocuments(inPrev),
    Enrollment.aggregate(sumConfirmed(inRange)),
    Enrollment.aggregate(sumConfirmed(inPrev)),
    Enrollment.aggregate([
      { $match: inRange },
      { $group: { _id: dayExpr, count: { $sum: 1 }, revenue: { $sum: confirmedAmount } } },
    ]),
    Enquiry.countDocuments(inRange),
    Enquiry.countDocuments(inPrev),
    Enquiry.aggregate([{ $match: inRange }, { $group: { _id: dayExpr, count: { $sum: 1 } } }]),
    Enrollment.aggregate([
      { $match: inRange },
      { $group: { _id: '$courseTitle', count: { $sum: 1 }, revenue: { $sum: confirmedAmount } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),
    Enrollment.aggregate([
      { $match: inRange },
      { $group: { _id: '$paymentMethod', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),
    Enrollment.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Enrollment.aggregate([{ $match: { status: 'pending' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Enquiry.countDocuments({ status: 'new' }),
    Enrollment.find().sort({ createdAt: -1 }).limit(6).select('name courseTitle status createdAt').lean(),
    Enquiry.find().sort({ createdAt: -1 }).limit(6).select('name topic status createdAt').lean(),
  ])

  const enrollMap = Object.fromEntries(enrollByDay.map((d) => [d._id, d]))
  const enquiryMap = Object.fromEntries(enquiryByDay.map((d) => [d._id, d]))

  const activity = [
    ...latestEnrollments.map((e) => ({
      id: String(e._id),
      type: 'enrollment',
      title: e.name,
      text: `Enrolled in ${e.courseTitle}`,
      status: e.status,
      at: new Date(e.createdAt).toISOString(),
    })),
    ...latestEnquiries.map((q) => ({
      id: String(q._id),
      type: 'enquiry',
      title: q.name,
      text: `Enquiry: ${q.topic}`,
      status: q.status,
      at: new Date(q.createdAt).toISOString(),
    })),
  ]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 8)

  return {
    days,
    enrollments: { now: enrollNow, prev: enrollPrev },
    revenue: { now: total(revenueNow), prev: total(revenuePrev) },
    enquiries: { now: enquiryNow, prev: enquiryPrev },
    newEnquiries,
    pendingAmount: total(pendingAmount),
    statusCounts: Object.fromEntries(statusRows.map((r) => [r._id, r.count])),
    series: dayKeys(days).map((key) => ({
      key,
      enrollments: enrollMap[key]?.count ?? 0,
      revenue: enrollMap[key]?.revenue ?? 0,
      enquiries: enquiryMap[key]?.count ?? 0,
    })),
    byCourse: byCourse.map((r) => ({ label: r._id, count: r.count, revenue: r.revenue })),
    byMethod: byMethod.map((r) => ({ label: r._id, value: r.count })),
    activity,
  }
}