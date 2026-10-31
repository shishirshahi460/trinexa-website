import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { getPostForAdmin } from '@/lib/posts'
import AdminPostForm from '@/views/AdminPostForm'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin: Edit post' }

export default async function Page({ params }) {
  await requireAdmin()
  const { id } = await params
  const post = await getPostForAdmin(id)
  if (!post) notFound()
  return <AdminPostForm post={post} />
}