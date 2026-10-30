import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Enrollment from '@/models/Enrollment'
import Enquiry from '@/models/Enquiry'
import AdminDashboard from '@/views/AdminDashboard'

export const dynamic = 'force-dynamic'

const iso = (d) => (d ? new Date(d).toISOString() : null)

// Client ma kebal chahine field pathaune (ipHash jasta kura pathaudainau)
const toEnrollment = (d) => ({
  _id: String(d._id),
  reference: d.reference,
  courseTitle: d.courseTitle,
  name: d.name,
  email: d.email,
  mobile: d.mobile,
  address: d.address,
  college: d.college ?? '',
  otherCourse: d.otherCourse ?? '',
  paymentMethod: d.paymentMethod,
  amount: d.amount,
  expectedFee: d.expectedFee ?? null,
  transactionRef: d.transactionRef ?? '',
  remarks: d.remarks ?? '',
  status: d.status,
  createdAt: iso(d.createdAt),
})

const toEnquiry = (d) => ({
  _id: String(d._id),
  name: d.name,
  email: d.email,
  mobile: d.mobile,
  topic: d.topic,
  message: d.message,
  status: d.status,
  createdAt: iso(d.createdAt),
})

export default async function Page() {
  const admin = await requireAdmin()
  await connectDB()

  const [enrollments, enquiries] = await Promise.all([
    Enrollment.find().sort({ createdAt: -1 }).limit(200).lean(),
    Enquiry.find().sort({ createdAt: -1 }).limit(200).lean(),
  ])

  return (
    <AdminDashboard
      email={admin.email}
      enrollments={enrollments.map(toEnrollment)}
      enquiries={enquiries.map(toEnquiry)}
    />
  )
}