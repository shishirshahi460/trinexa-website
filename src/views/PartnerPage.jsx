import SectionTitle from '../components/SectionTitle.jsx'
import { partner } from '../data/extraPages.js'
import { contactLinks } from '../config/site.js'

export default function PartnerPage() {
  const emailLink = contactLinks.find((l) => l.icon === 'mail')

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Resources</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Become a Partner</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{partner.intro}</p>
        </div>
      </section>

      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={partner.waysTitle} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partner.ways.map((w) => (
              <li key={w.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={partner.stepsTitle} />
          <ol className="grid gap-5 md:grid-cols-3">
            {partner.steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-line bg-white p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">{partner.ctaTitle}</h2>
          <p className="mt-4">{partner.ctaText}</p>
          {emailLink && (
            <a
              href={emailLink.href}
              className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              {partner.ctaLabel}
            </a>
          )}
        </div>
      </section>
    </>
  )
}