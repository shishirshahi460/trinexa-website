import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostBody from '@/components/PostBody'
import { getPostBySlug, getPublishedPosts } from '@/lib/posts'

export const revalidate = 300

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const date = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kathmandu' })

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const description = post.excerpt || post.content.replace(/[#*\-]/g, '').slice(0, 155).trim()
  return {
    title: post.title,
    description,
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 675, alt: post.title }] : undefined,
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage ? `${base}${post.coverImage}` : undefined,
    author: { '@type': 'Organization', name: 'TRINEXA Technologies Pvt. Ltd.' },
    publisher: { '@type': 'Organization', name: 'TRINEXA Technologies Pvt. Ltd.' },
  }

  return (
    <article className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/resources/blogs" className="font-semibold text-brand hover:underline">
            Blogs
          </Link>
        </nav>

        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">
          By TRINEXA Team · <time dateTime={post.publishedAt}>{date(post.publishedAt)}</time>
        </p>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            width="1200"
            height="675"
            className="mt-8 aspect-[16/9] w-full rounded-2xl border border-line object-cover"
          />
        )}

        <div className="mt-10">
          <PostBody content={post.content} />
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-soft p-6 text-center sm:p-8">
          <h2 className="text-2xl font-bold">Have a project in mind?</h2>
          <p className="mt-2">Tell us what you are planning and we will discuss how technology can help.</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </article>
  )
}