import { getAdmin } from '@/lib/auth'
import AdminShell from '@/components/admin/AdminShell'

// Admin page Google ma dekhinna
export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }) {
  const admin = await getAdmin()
  // Login page ma sidebar chahidaina
  if (!admin) return children
  return <AdminShell email={admin.email}>{children}</AdminShell>
}