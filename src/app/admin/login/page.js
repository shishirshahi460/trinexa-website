import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import AdminLoginForm from '@/views/AdminLoginForm'

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (await getAdmin()) redirect('/admin')
  return <AdminLoginForm />
}