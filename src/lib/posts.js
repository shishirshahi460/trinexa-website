import { isValidObjectId } from 'mongoose'
import { connectDB } from '@/lib/db'
import Post from '@/models/Post'

const iso = (d) => (d ? new Date(d).toISOString() : null)

const toShape = (d) => ({
  id: String(d._id),
  title: d.title,
  slug: d.slug,
  excerpt: d.excerpt ?? '',
  content: d.content,
  coverImage: d.coverImage ?? '',
  status: d.status,
  publishedAt: iso(d.publishedAt),
  createdAt: iso(d.createdAt),
  updatedAt: iso(d.updatedAt),
})

// Public site: published post matra. Database nabhetepani site chalchha.
export async function getPublishedPosts() {
  try {
    await connectDB()
    const docs = await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).lean()
    return docs.map(toShape)
  } catch (err) {
    console.error('Could not load posts:', err.message)
    return []
  }
}

export async function getPostBySlug(slug) {
  try {
    await connectDB()
    const doc = await Post.findOne({ slug, status: 'published' }).lean()
    return doc ? toShape(doc) : null
  } catch (err) {
    console.error('Could not load post:', err.message)
    return null
  }
}

// Admin: draft sahit sabai
export async function getAdminPosts() {
  await connectDB()
  const docs = await Post.find().sort({ createdAt: -1 }).lean()
  return docs.map(toShape)
}

export async function getPostForAdmin(id) {
  if (!isValidObjectId(id)) return null
  await connectDB()
  const doc = await Post.findById(id).lean()
  return doc ? toShape(doc) : null
}