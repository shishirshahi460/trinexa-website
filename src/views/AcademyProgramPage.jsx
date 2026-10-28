import Link from 'next/link'
import { Clock, BookOpen, CalendarDays } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'

import { programs } from '../data/academyPrograms.js'
import { contactLinks } from '../config/site.js'

const primaryBtn =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest'

export default function AcademyProgramPage({ slug }) {
  
  const program = programs.find((p) => p.slug === slug)
  if (!program) return null

  const emailLink = contactLinks.find((l) => l.icon === 'mail')

  // Track ko button: 'cv' bhaye email (set bhaye), nabhaye Contact page
  const trackButton = (track) => {
    const label = (
      <>
        {track.cta}
        <span className="sr-only"> for {track.title}</span>
      </>
    )
    if (track.action === 'cv' && emailLink) {
      return (
        <a
          href={`${emailLink.href}?subject=${encodeURIComponent('Internship application')}`}
          className={`${primaryBtn} w-full`}
        >
          {label}
        </a>
      )
    }
    return (
      <Link href="/contact" className={`${primaryBtn} w-full`}>
        {label}
      </Link>
    )
  }

  return (
    <>
      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/academy" className="font-semibold text-brand hover:underline">
              Academy
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{program.title}</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">{program.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{program.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={primaryBtn}>
              {program.tracks ? 'Apply Now' : 'Enquire Now'}
            </Link>
            <Link
              href="/academy"
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-brand"
            >
              All programs
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title="What to expect" />
          <ul className="grid gap-5 md:grid-cols-3">
            {program.highlights.map((h) => (
              <li key={h.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{h.title}</h3>
                <p className="mt-2 text-sm">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tracks (Internship ma) */}
      {program.tracks && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle title={program.tracksTitle} text={program.tracksText} />
            <ul className="grid gap-5 lg:grid-cols-3">
              {program.tracks.map((t) => (
                <li
                  key={t.title}
                  className="flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:border-brand hover:shadow-md sm:p-7"
                >
                  <span className="w-fit rounded-full bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                    {t.badge}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{t.title}</h3>
                  <p className="mt-3 text-sm">{t.text}</p>

                  <p className="mt-4 text-sm">
                    <span className="font-semibold text-forest">Best for: </span>
                    {t.bestFor}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-muted">
                    <li className="flex items-center gap-2">
                      <Clock size={16} className="shrink-0 text-brand" aria-hidden="true" />
                      {t.duration}
                    </li>
                    <li className="flex items-center gap-2">
                      <CalendarDays size={16} className="shrink-0 text-brand" aria-hidden="true" />
                      {t.intake}
                    </li>
                  </ul>

                  <div className="mt-auto pt-6">{trackButton(t)}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Areas (Internship ma) */}
      {program.areas && (
        <section className="bg-soft py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <SectionTitle title={program.areasTitle} text={program.areasText} />
            <ul className="flex flex-wrap justify-center gap-3">
              {program.areas.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-forest"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Courses (Professional Courses ma) */}
      {program.courses && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle title={program.coursesTitle} text={program.coursesText} />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.courses.map((c) => {
                const Icon = c.icon
                return (
                  <li
                    key={c.title}
                    className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:border-brand"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-soft text-brand">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm">{c.text}</p>

                    {c.topics && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.topics.map((t) => (
                          <li key={t} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-forest">
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}

                    {(c.duration || c.format) && (
                      <ul className="mt-4 space-y-1.5 text-sm text-muted">
                        {c.duration && (
                          <li className="flex items-center gap-2">
                            <Clock size={16} className="text-brand" aria-hidden="true" />
                            {c.duration}
                          </li>
                        )}
                        {c.format && (
                          <li className="flex items-center gap-2">
                            <BookOpen size={16} className="text-brand" aria-hidden="true" />
                            {c.format}
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="mt-auto pt-6">
                      <Link href="/contact" className={`${primaryBtn} w-full`}>
                        Enquire Now
                        <span className="sr-only"> about {c.title}</span>
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Steps (Internship ma) */}
      {program.steps && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle title={program.stepsTitle} />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {program.steps.map((s, i) => (
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
      )}

      {/* Audience */}
      {program.audience && (
        <section className="bg-soft py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionTitle title={program.audienceTitle} />
            <ul className="grid gap-5 sm:grid-cols-2">
              {program.audience.map((a) => (
                <li key={a.title} className="rounded-xl border border-line bg-white p-6">
                  <h3 className="text-lg font-bold">{a.title}</h3>
                  <p className="mt-2 text-sm">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Have a question?</h2>
          <p className="mt-4">Tell us what you would like to learn, and we will get back to you with the details.</p>
          <Link href="/contact" className={`mt-8 ${primaryBtn}`}>
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}