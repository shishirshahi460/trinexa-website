import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import Post from '@/models/Post'
import { postSchema } from '@/lib/postSchema'

export const runtime = 'nodejs'

export async function POST(request) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

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
    const post = await Post.create({
      ...d,
      publishedAt: d.status === 'published' ? new Date() : null,
    })
    revalidatePath('/resources/blogs', 'layout')
    revalidatePath('/sitemap.xml')
    return NextResponse.json({ ok: true, id: String(post._id) })
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'This URL (slug) is already used. Please change it.' }, { status: 409 })
    }
    console.error('Post create error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
