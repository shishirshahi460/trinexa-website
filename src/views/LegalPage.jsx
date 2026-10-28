import Link from 'next/link'
import { legal } from '../data/legal.js'
import { contactLinks } from '../config/site.js'

export default function LegalPage({ path }) {
  const data = legal[path]
  if (!data) return null

  const emailLink = contactLinks.find((l) => l.icon === 'mail')

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Legal</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{data.title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {data.updated}</p>
        <p className="mt-6 text-lg">{data.intro}</p>

        <div className="mt-10 space-y-8">
          {data.sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-2">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-line bg-soft p-6">
          <h2 className="text-xl font-bold">Questions?</h2>
          <p className="mt-2">
            If you have questions about this page, please{' '}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              contact us
            </Link>
            {emailLink && (
              <>
                {' '}or email{' '}
                <a href={emailLink.href} className="font-semibold text-brand hover:underline">
                  {emailLink.href.replace('mailto:', '')}
                </a>
              </>
            )}
            .
          </p>
        </div>
      </div>
    </section>
  )
}