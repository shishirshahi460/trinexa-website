import Link from 'next/link'
import SectionTitle from '../components/SectionTitle.jsx'
import { ventures } from '../data/ventures.js'

const support = [
  {
    title: 'Consultation',
    text: 'Talk through your idea with us. We help you understand the problem, your users and a sensible first version.',
    to: '/services/startups',
    cta: 'Learn more',
  },
  {
    title: 'Build your product',
    text: 'We design and build websites and applications for early-stage products, with clean code that can grow.',
    to: '/services/custom-apps',
    cta: 'Learn more',
  },
  {
    title: 'Learning & mentorship',
    text: 'Guidance and learning resources for students and young innovators interested in technology and product building.',
    to: '/academy',
    cta: 'Explore Academy',
  },
]

export default function VenturesIndex() {
  const items = Object.entries(ventures)

  return (
    <>
      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">TRINEXA</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Ventures</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Beyond client projects, we are exploring our own digital products in areas where technology can make everyday work simpler. These ventures are at an early stage, and we are open to ideas, feedback and partnerships.
          </p>
        </div>
      </section>

      {/* Venture cards */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title="Our Ventures" text="Six areas we are planning to build in." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(([to, v]) => (
              <li
                key={to}
                className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand"
              >
                <h3 className="text-lg font-bold">{v.label}</h3>
                <p className="mt-2 line-clamp-4 flex-1 text-sm">{v.intro}</p>
                <Link href={to} className="mt-4 text-sm font-semibold text-brand hover:underline">
                  Learn more<span className="sr-only"> about {v.label}</span> →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Startup support */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            title="Startup Support"
            text="Good ideas need planning to become real products. We want to help early-stage founders take their first steps with clear guidance."
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {support.map((s) => (
              <li
                key={s.title}
                className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:border-brand"
              >
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm">{s.text}</p>
                <Link href={s.to} className="mt-4 text-sm font-semibold text-brand hover:underline">
                  {s.cta}
                  <span className="sr-only"> about {s.title}</span> →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Have a startup idea?</h2>
          <p className="mt-4">
            Tell us about your idea and what you want to achieve. We would like to hear it and suggest a sensible next step.
          </p>
          <Link
            href="/services/startups"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            See How We Support Startups
          </Link>
        </div>
      </section>
    </>
  )
}