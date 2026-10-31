import { requireAdmin } from '@/lib/auth'
import AdminPostForm from '@/views/AdminPostForm'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin: New post' }

export default async function Page() {
  await requireAdmin()
  return <AdminPostForm />
}