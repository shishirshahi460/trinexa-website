import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getAdminPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin: Blog' }

const date = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { dateStyle: 'medium', timeZone: 'Asia/Kathmandu' }) : '-'

export default async function Page() {
  await requireAdmin()
  const posts = await getAdminPosts()

  return (
    <section className="bg-soft py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Blog</h1>
            <p className="mt-1 text-muted">Publish gareko post matra website ma dekhinchha.</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            New post
          </Link>
        </div>

        <ul className="mt-8 space-y-3">
          {posts.length === 0 && (
            <li className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-muted">
              No posts yet. Create your first post.
            </li>
          )}
          {posts.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm"
            >
              <div className="min-w-0">
                <p className="font-bold text-forest">{p.title}</p>
                <p className="mt-1 text-xs text-muted">
                  /resources/blogs/{p.slug} · {p.status === 'published' ? `Published ${date(p.publishedAt)}` : `Created ${date(p.createdAt)}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    p.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {p.status}
                </span>
                {p.status === 'published' && (
                  <Link href={`/resources/blogs/${p.slug}`} className="text-sm font-semibold text-brand hover:underline">
                    View
                  </Link>
                )}
                <Link
                  href={`/admin/blog/${p.id}`}
                  className="inline-flex min-h-9 items-center rounded-lg border border-line px-4 py-1.5 text-sm font-semibold text-forest hover:border-brand"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}