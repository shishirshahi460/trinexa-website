import { industries } from '@/data/industries'
import { serviceDetails } from '@/data/serviceDetails'
import { ventures } from '@/data/ventures'
import { programs } from '@/data/academyPrograms'
import { courses } from '@/data/academyCourses'

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const staticPaths = [
  '/',
  '/contact',
  '/ventures',
  '/academy',
  '/academy/courses',
  '/company/about',
  '/company/careers',
  '/resources/blogs',
  '/resources/partner',
  '/resources/working-methodology',
  '/privacy-policy',
  '/terms',
]

export default function sitemap() {
  const paths = [
    ...staticPaths,
    ...Object.keys(industries),
    ...Object.keys(serviceDetails),
    ...Object.keys(ventures),
    ...programs.map((p) => `/academy/${p.slug}`),
    ...courses.map((c) => `/academy/courses/${c.slug}`),
  ]

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/academy/courses/') ? 0.8 : 0.6,
  }))
}