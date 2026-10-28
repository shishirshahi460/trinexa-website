import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import { careers } from '../data/careers.js'
import { about } from '../data/about.js'
import { contactLinks } from '../config/site.js'

const primaryBtn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-forest'

export default function CareersPage() {
  const emailLink = contactLinks.find((l) => l.icon === 'mail')
  const cvHref = emailLink ? `${emailLink.href}?subject=${encodeURIComponent('Career enquiry')}` : null

  const fitButton = cvHref ? (
    <a href={cvHref} className={`mt-8 ${primaryBtn}`}>
      {careers.fitCta}
    </a>
  ) : (
    <Link href="/contact" className={`mt-8 ${primaryBtn}`}>
      {careers.fitCta}
    </Link>
  )

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF3EC] via-[#F4F8F3] to-white">
        <div
          className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-brand/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 md:pb-24 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Careers</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{careers.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg">{careers.intro}</p>
          <a href="#openings" className={`mt-8 ${primaryBtn}`}>
            Browse All Jobs <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Ways to join */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-5 md:grid-cols-3">
            {careers.ways.map((w) => {
              const Icon = w.icon
              const isAnchor = w.to.startsWith('#')
              const linkClass =
                'mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline'
              return (
                <li
                  key={w.title}
                  className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold">{w.title}</h2>
                  <p className="mt-2 flex-1 text-sm">{w.text}</p>
                  {isAnchor ? (
                    <a href={w.to} className={linkClass}>
                      {w.cta} <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={w.to} className={linkClass}>
                      {w.cta} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* People-centric company (gaaro hariyo) */}
      <section className="relative overflow-hidden bg-forest py-16 text-white/75 md:py-24">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-[#6fd9a0] to-brand" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-brand/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-[#6fd9a0]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6fd9a0]">
              {careers.culture.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold !text-white sm:text-5xl">{careers.culture.title}</h2>
            <p className="mt-5 text-lg">{careers.culture.text}</p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {careers.culture.points.map((p) => {
              const Icon = p.icon
              return (
                <li key={p.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-[#6fd9a0]">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold !text-white">{p.title}</h3>
                  <p className="mt-2 text-sm">{p.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={about.valuesTitle} text={about.valuesText} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <li
                key={v.title}
                className="relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition hover:border-brand hover:shadow-md"
              >
                <span
                  className="absolute right-5 top-3 font-heading text-5xl font-bold text-soft"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="relative text-lg font-bold">{v.title}</h3>
                <p className="relative mt-2 text-sm">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fit CTA */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{careers.fitTitle}</h2>
          <p className="mt-4 text-lg">{careers.fitText}</p>
          {fitButton}
        </div>
      </section>

      {/* Current openings */}
      <section id="openings" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle title={careers.openingsTitle} />
          {careers.openings.length ? (
            <ul className="space-y-4">
              {careers.openings.map((job) => (
                <li
                  key={job.title}
                  className="rounded-2xl border border-line bg-white p-6 transition hover:border-brand hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    {job.type && (
                      <span className="rounded-full border border-line bg-soft px-3 py-0.5 text-xs font-semibold text-forest">
                        {job.type}
                      </span>
                    )}
                  </div>
                  {job.text && <p className="mt-2 text-sm">{job.text}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-line bg-soft p-8 text-center">
              <p>{careers.noOpenings}</p>
              {cvHref ? (
                <a href={cvHref} className={`mt-6 ${primaryBtn}`}>
                  Send Your CV
                </a>
              ) : (
                <Link href="/contact" className={`mt-6 ${primaryBtn}`}>
                  Contact Us
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}