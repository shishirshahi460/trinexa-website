import Link from 'next/link'
import { industries } from '../data/industries.js'
import { industryImages } from '../data/industryImages.js'

// Default service cards. Kunai page ma afno `offered` diyo bhane tyo use huncha.
const defaultOffered = [
  {
    title: 'Website & Portals',
    text: 'A clear online presence that lets customers find you and understand what you offer.',
    to: '/services/website-portals',
  },
  {
    title: 'Custom Web & Mobile App',
    text: 'Applications designed around your specific requirements and workflow.',
    to: '/services/custom-apps',
  },
  {
    title: 'Training & Consulting',
    text: 'Guidance and training to help your team make suitable technology decisions.',
    to: '/services/training-consulting',
  },
]

export default function IndustryPage({ path }) {
  
  const data = industries[path]
  if (!data) return null

  const photo = industryImages[path]
  const offered = data.offered ?? defaultOffered
  const numbered = data.numbered !== false
  // 3 ya 6 card bhaye 3 column, nabhaye 4 column
  const stepsGrid = data.steps.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'

  const letsTalk = (
    <Link
      href="/contact"
      className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-forest"
    >
      Let's Talk
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
              <p className="text-sm font-bold uppercase tracking-wider text-brand">
                {data.eyebrow ?? 'Industry types'}
              </p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.label}</h1>
              <p className="mt-6 max-w-xl text-lg">{data.intro}</p>
              {letsTalk}
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
            <p className="text-sm font-bold uppercase tracking-wider text-brand">
              {data.eyebrow ?? 'Industry types'}
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{data.label}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg">{data.intro}</p>
            {letsTalk}
          </div>
        )}
      </section>

      {/* Steps */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.stepsTitle}</h2>
          <ol className={`grid gap-5 sm:grid-cols-2 ${stepsGrid}`}>
            {data.steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-line bg-white p-6">
                {numbered && (
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                )}
                <h3 className={`text-lg font-semibold ${numbered ? 'mt-4' : ''}`}>{s.title}</h3>
                <p className="mt-2 text-sm">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">
            {data.offeredTitle ?? 'What kind of service are you looking for?'}
          </h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {offered.map((o) => (
              <li key={o.title} className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:border-brand">
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 flex-1 text-sm">{o.text}</p>
                <Link href={o.to} className="mt-4 text-sm font-semibold text-brand hover:underline">
                  {o.linkLabel ?? 'Learn more'}
                  <span className="sr-only"> about {o.title}</span> →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why TRINEXA */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">{data.whyTitle}</h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {data.why.map((w) => (
              <li key={w.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold">Frequently asked questions</h2>
          <div className="divide-y divide-line rounded-xl border border-line">
            {data.faqs.map((f) => (
              <details key={f.q} className="group p-5">
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