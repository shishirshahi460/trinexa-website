import BlogsPage from '@/views/BlogsPage'
import { getPublishedPosts } from '@/lib/posts'

// Admin bata save garda aafai naya huncha; yo 5 minute ko backup
export const revalidate = 300

export const metadata = {
  title: 'Blogs',
  description: 'Articles and notes from the TRINEXA team about software, design and building digital products.',
}

export default async function Page() {
  const posts = await getPublishedPosts()
  return <BlogsPage posts={posts} />
}