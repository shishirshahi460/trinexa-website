import { notFound } from 'next/navigation'
import CourseDetailPage from '@/views/CourseDetailPage'
import { courses } from '@/data/academyCourses'
import { withTerms } from '@/data/courseFees'
import { getCourseTerms } from '@/lib/courseTerms'
import { short } from '@/lib/seo'

export const revalidate = 300

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const found = courses.find((c) => c.slug === slug)
  if (!found) return {}
  const course = withTerms(found)
  return {
    title: `${course.title} | Academy`,
    description: short(course.summary),
    openGraph: course.image
      ? { images: [{ url: course.image, width: 1200, height: 900, alt: course.title }] }
      : undefined,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!courses.some((c) => c.slug === slug)) notFound()
  const terms = await getCourseTerms()
  return <CourseDetailPage slug={slug} terms={terms} />
}