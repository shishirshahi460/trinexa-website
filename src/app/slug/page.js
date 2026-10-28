import { notFound } from 'next/navigation'
import IndustryPage from '@/views/IndustryPage'
import ServicePage from '@/views/ServicePage'
import { industries } from '@/data/industries'
import { serviceDetails } from '@/data/serviceDetails'
import { short } from '@/lib/seo'

const toSlug = (p) => p.split('/').pop()

export function generateStaticParams() {
  return [...Object.keys(industries), ...Object.keys(serviceDetails)].map((p) => ({ slug: toSlug(p) }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const path = `/services/${slug}`
  const data = industries[path] ?? serviceDetails[path]
  if (!data) return {}
  return { title: data.label, description: short(data.intro) }
}

export default async function Page({ params }) {
  const { slug } = await params
  const path = `/services/${slug}`
  if (industries[path]) return <IndustryPage path={path} />
  if (serviceDetails[path]) return <ServicePage path={path} />
  notFound()
}