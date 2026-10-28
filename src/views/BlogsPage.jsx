import { blogs } from '../data/extraPages.js'

export default function BlogsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Resources</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Blogs</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{blogs.intro}</p>
        </div>

        <div className="mt-12">
          {blogs.posts.length ? (
            <ul className="space-y-5">
              {blogs.posts.map((post) => (
                <li key={post.title} className="rounded-xl border border-line bg-white p-6">
                  {post.date && <p className="text-xs font-semibold text-muted">{post.date}</p>}
                  <h2 className="mt-1 text-xl font-bold">{post.title}</h2>
                  {post.summary && <p className="mt-2 text-sm">{post.summary}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-line bg-soft p-8 text-center">{blogs.empty}</p>
          )}
        </div>
      </div>
    </section>
  )
}