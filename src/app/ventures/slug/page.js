import { notFound } from 'next/navigation'
import VenturePage from '@/views/VenturePage'
import { ventures } from '@/data/ventures'
import { short } from '@/lib/seo'

export function generateStaticParams() {
  return Object.keys(ventures).map((p) => ({ slug: p.split('/').pop() }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const data = ventures[`/ventures/${slug}`]
  if (!data) return {}
  return { title: data.label, description: short(data.intro) }
}

export default async function Page({ params }) {
  const { slug } = await params
  const path = `/ventures/${slug}`
  if (!ventures[path]) notFound()
  return <VenturePage path={path} />
}