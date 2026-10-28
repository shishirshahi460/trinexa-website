import Link from 'next/link'
import SectionTitle from '../components/SectionTitle.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <section id="services" className="bg-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          title="Our Services"
          text="Technology services for startups, SMEs, corporations and government organizations."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, icon: Icon, description, to }) => (
            <li key={title}>
              <Link
                href={to}
                className="flex h-full flex-col rounded-xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand"
              >
                <Icon className="text-brand" size={28} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm">{description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}