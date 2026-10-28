import Link from 'next/link'
import { serviceDetails } from '../data/serviceDetails.js'
import { industryImages } from '../data/industryImages.js'

export default function ServicePage({ path }) {
  
  const data = serviceDetails[path]
  if (!data) return null

  const photo = industryImages[path]

  const contactButton = (
    <Link
      href="/contact"
      className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-forest"
    >
      Contact Us
    </Link>
  )

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        {photo ? (
          // Photo chha: left ma text, right ma photo
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand">Services</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.label}</h1>
              <p className="mt-6 max-w-xl text-lg">{data.intro}</p>
              {contactButton}
            </div>

            <img
              src={photo.src}
              alt={photo.alt ?? ''}
              width="1200"
              height="900"
              className="aspect-[4/3] w-full rounded-2xl border border-line object-cover shadow-lg"
            />
          </div>
        ) : (
          // Photo chhaina: bich ma center text
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-bold uppercase tracking-wider text-brand">Services</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.label}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg">{data.intro}</p>
            {contactButton}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.featuresTitle}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f) => (
              <li key={f.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What to build */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.buildTitle}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.build.map((b) => (
              <li key={b.title} className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:border-brand">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 flex-1 text-sm">{b.text}</p>
                <Link href="/contact" className="mt-4 text-sm font-semibold text-brand hover:underline">
                  Get started<span className="sr-only"> with {b.title}</span> →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold">Frequently asked questions</h2>
          <div className="divide-y divide-line rounded-xl border border-line bg-white">
            {data.faqs.map((f) => (
              <details key={f.q} className="p-5">
                <summary className="cursor-pointer list-none font-medium text-forest marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}