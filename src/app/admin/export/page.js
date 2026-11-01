import { requireAdmin } from '@/lib/auth'
import AdminExport from '@/views/AdminExport'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin: Export' }

export default async function Page() {
  await requireAdmin()
  return <AdminExport />
}