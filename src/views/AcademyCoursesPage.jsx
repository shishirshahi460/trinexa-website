import Link from 'next/link'
import { ArrowRight, GraduationCap, Handshake, Clock } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import PhotoBox from '../components/PhotoBox.jsx'
import PriceTag from '../components/PriceTag.jsx'
import { institutions as inst, courses as baseCourses } from '../data/academyCourses.js'
import { withTerms, offer } from '../data/courseFees.js'
import { contactInfo } from '../config/site.js'

const courses = baseCourses.map(withTerms)

export default function AcademyCoursesPage() {
  return (
    <>
      {/* Hero: left ma text, right ma photo */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand">Academy</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{inst.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg">{inst.heroText}</p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-forest"
              >
                Contact Us
              </Link>

              {contactInfo.phone && (
                <>
                  <span className="text-sm text-muted">or</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Call us on</p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="text-lg font-bold text-forest hover:text-brand"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          <PhotoBox
            src={inst.heroImage}
            alt="Students learning in a classroom"
            icon={GraduationCap}
            className="aspect-[4/3] rounded-2xl border border-line shadow-lg"
          />
        </div>
      </section>

      {/* Why Academic Learners Choose Us */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={inst.learnersTitle} text={inst.learnersText} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {inst.learners.map((l) => {
              const Icon = l.icon
              return (
                <li
                  key={l.title}
                  className="rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{l.title}</h3>
                  <p className="mt-2 text-sm">{l.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Why Academic Institutions Partner With Us: left ma photo, right ma text */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <PhotoBox
            src={inst.partnerImage}
            alt="Students working on a project with a mentor"
            icon={Handshake}
            className="aspect-[4/3] rounded-2xl border border-line shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">{inst.partnerTitle}</h2>
            <p className="mt-4">{inst.partnerText}</p>
            <ul className="mt-8 space-y-6">
              {inst.partners.map((p) => {
                const Icon = p.icon
                return (
                  <li key={p.title} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft text-brand">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{p.title}</h3>
                      <p className="mt-1 text-sm">{p.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Explore our Courses */}
      <section id="courses" className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            title={inst.coursesTitle}
            text="Practical IT and digital skills courses, now at limited-time offer prices."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/academy/courses/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <div className="relative">
                    <PhotoBox src={c.image} alt={c.title} icon={c.icon} className="aspect-[16/10]" />
                    {c.fee && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow">
                        {offer.label}
                      </span>
                    )}
                  </div>

                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-lg font-bold text-forest">{c.title}</span>
                    <span className="mt-2 line-clamp-3 flex-1 text-sm">{c.summary}</span>

                    {c.duration && (
                      <span className="mt-4 flex items-center gap-2 text-sm text-muted">
                        <Clock size={16} className="text-brand" aria-hidden="true" />
                        {c.duration}
                      </span>
                    )}
                    {c.fee && (
                      <span className="mt-2 block">
                        <PriceTag fee={c.fee} />
                      </span>
                    )}

                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      View course <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Bring practical IT training to your campus</h2>
          <p className="mt-4 text-lg">
            Tell us about your institution and what your students need. We will discuss how we can work together.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-forest"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}