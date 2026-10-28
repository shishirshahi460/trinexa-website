import Link from 'next/link'
import { ventures } from '../data/ventures.js'

function CardGrid({ items, cols = 'lg:grid-cols-3' }) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((item) => (
        <li key={item.title} className="rounded-xl border border-line bg-white p-6">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

export default function VenturePage({ path }) {
  
  const data = ventures[path]
  if (!data) return null

  return (
    <>
      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Ventures</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{data.label}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{data.intro}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.problemTitle}</h2>
          <CardGrid items={data.problems} cols="lg:grid-cols-4" />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.featuresTitle}</h2>
          <CardGrid items={data.features} />
        </div>
      </section>

      {/* Audience */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.audienceTitle}</h2>
          <CardGrid items={data.audience} />
        </div>
      </section>

      {/* Note */}
      {data.note && (
        <section className="pt-16">
          <p className="mx-auto max-w-3xl rounded-lg border border-line bg-soft px-5 py-4 text-sm text-forest">
            {data.note}
          </p>
        </section>
      )}

      {/* Interest */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">{data.interestTitle}</h2>
          <p className="mt-4">{data.interestText}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Let's Talk
          </Link>
        </div>
      </section>
    </>
  )
}