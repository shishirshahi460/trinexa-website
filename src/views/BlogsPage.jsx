import Link from 'next/link'
import { FileText } from 'lucide-react'
import PhotoBox from '../components/PhotoBox.jsx'

const date = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kathmandu' })

export default function BlogsPage({ posts = [] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Resources</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Blogs</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Articles and notes from our team about software, design and building digital products.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-line bg-soft p-8 text-center">
            We have not published any posts yet. Please check back soon.
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/resources/blogs/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <PhotoBox src={p.coverImage || null} alt={p.title} icon={FileText} className="aspect-[16/9]" />
                  <span className="flex flex-1 flex-col p-5">
                    <time dateTime={p.publishedAt} className="text-xs font-semibold text-muted">
                      {date(p.publishedAt)}
                    </time>
                    <span className="mt-2 text-lg font-bold text-forest">{p.title}</span>
                    {p.excerpt && <span className="mt-2 line-clamp-3 flex-1 text-sm">{p.excerpt}</span>}
                    <span className="mt-4 text-sm font-semibold text-brand">Read more →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}