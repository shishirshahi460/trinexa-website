import { requireAdmin } from '@/lib/auth'
import { getAdminCourseSettings } from '@/lib/courseTerms'
import { courses } from '@/data/academyCourses'
import AdminCourses from '@/views/AdminCourses'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Admin: Courses' }

export default async function Page() {
  await requireAdmin()
  const settings = await getAdminCourseSettings()
  const items = courses.map((c) => ({ title: c.title, ...settings[c.slug] }))
  return <AdminCourses items={items} />
}