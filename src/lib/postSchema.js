import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().trim().min(3).max(150),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().max(300).default(''),
  content: z.string().trim().min(20).max(50000),
  // Kebal site ko afnai photo (public folder bata), jastai /Blog/first-post.jpg
  coverImage: z.union([z.literal(''), z.string().trim().max(200).regex(/^\/[A-Za-z0-9_\-./]+$/)]).default(''),
  status: z.enum(['draft', 'published']),
})