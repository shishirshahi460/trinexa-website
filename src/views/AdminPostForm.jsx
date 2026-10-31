'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-forest placeholder:text-muted focus:border-brand'

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export default function AdminPostForm({ post }) {
  const router = useRouter()
  const editing = Boolean(post)
  const [slugTouched, setSlugTouched] = useState(editing)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    coverImage: post?.coverImage ?? '',
    content: post?.content ?? '',
    status: post?.status ?? 'draft',
  })

  const set = (name) => (e) => {
    const value = e.target.value
    setForm((f) => {
      const next = { ...f, [name]: value }
      if (name === 'title' && !slugTouched) next.slug = slugify(value)
      return next
    })
  }

  const send = async (method, url, body) => {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return false
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Could not save. Please try again.')
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setBusy(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const ok = editing
      ? await send('PUT', `/api/admin/posts/${post.id}`, form)
      : await send('POST', '/api/admin/posts', form)
    if (ok) {
      router.push('/admin/blog')
      router.refresh()
    }
  }

  const remove = async () => {
    if (!window.confirm('Delete this post permanently?')) return
    const ok = await send('DELETE', `/api/admin/posts/${post.id}`)
    if (ok) {
      router.push('/admin/blog')
      router.refresh()
    }
  }

  return (
    <section className="bg-soft py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/admin/blog" className="text-sm font-semibold text-brand hover:underline">
          ← All posts
        </Link>
        <h1 className="mt-3 text-3xl font-bold">{editing ? 'Edit post' : 'New post'}</h1>

        <form onSubmit={submit} className="mt-6 space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-forest">Title</label>
            <input id="title" required minLength={3} maxLength={150} value={form.title} onChange={set('title')} className={fieldClass} />
          </div>

          <div>
            <label htmlFor="slug" className="text-sm font-semibold text-forest">URL (slug)</label>
            <input
              id="slug"
              required
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
              }}
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-muted">/resources/blogs/{form.slug || 'your-post-url'}</p>
          </div>

          <div>
            <label htmlFor="excerpt" className="text-sm font-semibold text-forest">Short summary (Google ra share ma dekhincha)</label>
            <textarea id="excerpt" rows={2} maxLength={300} value={form.excerpt} onChange={set('excerpt')} className={fieldClass} />
            <p className="mt-1 text-xs text-muted">{form.excerpt.length}/300</p>
          </div>

          <div>
            <label htmlFor="coverImage" className="text-sm font-semibold text-forest">Cover photo path (optional)</label>
            <input id="coverImage" value={form.coverImage} onChange={set('coverImage')} className={fieldClass} placeholder="/Blog/first-post.jpg" />
            <p className="mt-1 text-xs text-muted">Photo pahile <code>public/Blog/</code> folder ma rakhnus (1200 x 675, 150 KB bhanda sano).</p>
          </div>

          <div>
            <label htmlFor="content" className="text-sm font-semibold text-forest">Content</label>
            <textarea id="content" required minLength={20} rows={16} value={form.content} onChange={set('content')} className={`${fieldClass} font-mono`} />
            <p className="mt-2 rounded-lg bg-soft p-3 text-xs text-muted">
              Paragraph ko bich ma khali line rakhnus. <code>## Heading</code>, <code>### Sub-heading</code>, <code>- bullet</code> (har line ma), <code>**bold**</code>.
            </p>
          </div>

          <div>
            <label htmlFor="status" className="text-sm font-semibold text-forest">Status</label>
            <select id="status" value={form.status} onChange={set('status')} className={fieldClass}>
              <option value="draft">Draft (website ma dekhidaina)</option>
              <option value="published">Published (website ma dekhincha)</option>
            </select>
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-11 items-center rounded-lg bg-brand px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60"
            >
              {busy ? 'Saving...' : editing ? 'Save changes' : 'Create post'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={remove}
                disabled={busy}
                className="inline-flex min-h-11 items-center rounded-lg border border-red-200 bg-white px-6 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}