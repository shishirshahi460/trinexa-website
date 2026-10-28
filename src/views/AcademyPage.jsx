import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import PhotoBox from '../components/PhotoBox.jsx'
import { academy } from '../data/extraPages.js'
import { academyContent } from '../data/academyContent.js'
import { programs } from '../data/academyPrograms.js'

// Photo `public/Academy/Academy.jpg` ma chha. Naam ra capital letter exact milnu parchha.
const academyImage = {
  src: '/Academy/Academy.jpg',
  alt: 'Students learning together at TRINEXA Academy',
}

export default function AcademyPage() {
  const c = academyContent

  return (
    <>
      {/* What is TRINEXA Academy? : left ma text, right ma photo */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold sm:text-5xl">{c.whatTitle}</h1>
            <div className="mt-6 space-y-4 text-lg">
              {c.whatText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <PhotoBox
            src={academyImage.src}
            alt={academyImage.alt}
            className="aspect-[4/3] rounded-2xl border border-line shadow-lg"
          />
        </div>
      </section>

      {/* Programs */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={academy.programsTitle} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => (
              <li key={p.slug} className="flex flex-col rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm">{p.text}</p>
                <Link
                  href={`/academy/${p.slug}`}
                  className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest"
                >
                  Get Started
                  <span className="sr-only"> with {p.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Premium box: Explore our courses */}
          <Link
            href="/academy/courses"
            className="group relative mt-10 block overflow-hidden rounded-3xl bg-forest p-8 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:p-10"
          >
            <span
              className="absolute inset-x-0 top-0 block h-1 bg-gradient-to-r from-brand via-[#6fd9a0] to-brand"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -right-16 -top-16 block size-64 rounded-full bg-brand/30 blur-3xl"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -bottom-20 -left-16 block size-56 rounded-full bg-[#6fd9a0]/10 blur-3xl"
              aria-hidden="true"
            />

            <span className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <span className="block">
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#6fd9a0]">
                  For students, colleges and universities
                </span>
                <span className="mt-2 block font-heading text-2xl font-bold text-white sm:text-3xl">
                  Practical IT and digital skills courses
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold uppercase tracking-wider text-forest transition-colors group-hover:bg-soft">
                Explore Our Courses <ArrowRight size={16} aria-hidden="true" />
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* How is it useful for you? */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={c.usefulTitle} text={c.usefulText} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.useful.map((u) => (
              <li
                key={u.title}
                className="rounded-xl border border-line bg-white p-6 transition hover:border-brand"
              >
                <h3 className="text-lg font-bold">{u.title}</h3>
                <p className="mt-2 text-sm">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={academy.whoTitle} />
          <ul className="grid gap-5 md:grid-cols-3">
            {academy.who.map((w) => (
              <li key={w.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">{academy.ctaTitle}</h2>
          <p className="mt-4">{academy.ctaText}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            {academy.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  )
}