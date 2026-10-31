import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isValidObjectId } from 'mongoose'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import Post from '@/models/Post'
import { postSchema } from '@/lib/postSchema'

export const runtime = 'nodejs'

function refreshSite() {
  revalidatePath('/resources/blogs', 'layout')
  revalidatePath('/sitemap.xml')
}

export async function PUT(request, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  const { id } = await params
  if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the fields. The title needs 3+ characters and the content 20+ characters.' },
      { status: 400 },
    )
  }
  const d = parsed.data

  try {
    await connectDB()
    const post = await Post.findById(id)
    if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })

    post.set(d)
    if (d.status === 'published' && !post.publishedAt) post.publishedAt = new Date()
    await post.save()

    refreshSite()
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'This URL (slug) is already used. Please change it.' }, { status: 409 })
    }
    console.error('Post update error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  const { id } = await params
  if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  try {
    await connectDB()
    await Post.findByIdAndDelete(id)
    refreshSite()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Post delete error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}