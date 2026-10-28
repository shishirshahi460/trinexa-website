import { notFound } from 'next/navigation'
import AcademyProgramPage from '@/views/AcademyProgramPage'
import { programs } from '@/data/academyPrograms'
import { short } from '@/lib/seo'

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const program = programs.find((p) => p.slug === slug)
  if (!program) return {}
  return { title: `${program.title} | Academy`, description: short(program.text) }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!programs.some((p) => p.slug === slug)) notFound()
  return <AcademyProgramPage slug={slug} />
}