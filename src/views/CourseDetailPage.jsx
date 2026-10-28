'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, ChevronDown, Quote } from 'lucide-react'
import PhotoBox from '../components/PhotoBox.jsx'
import PriceTag from '../components/PriceTag.jsx'

import { courses } from '../data/academyCourses.js'
import { courseExtras } from '../data/courseDetails.js'
import { withTerms, offer, npr } from '../data/courseFees.js'

const primaryBtn =
  'inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-forest'
const secondaryBtn =
  'inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-white px-8 py-3 text-base font-semibold text-forest transition-colors hover:border-brand'

const defaultWhy = (course) => [
  { title: 'Practical, project-based', text: 'You learn by doing real tasks, so you can apply the skills straight away.' },
  { title: 'Clear structure', text: 'Lessons follow an organised plan, from the basics to more advanced topics.' },
  { title: 'Guidance from the team', text: 'Ask questions and get feedback from people who work with this subject.' },
  { title: 'A clear starting point', text: course.prerequisite },
]

const defaultFaqs = (course) => [
  { q: 'What are the prerequisites for this course?', a: course.prerequisite },
  {
    q: 'What can I expect after completing it?',
    a: `You will be able to: ${course.outcomes.join('; ').toLowerCase()}. Your results depend on how much you practise.`,
  },
  {
    q: 'What kind of support do I get during the course?',
    a: 'You can ask questions during sessions and get feedback on your work from the team. Support details are confirmed for each batch.',
  },
  {
    q: 'Can I choose a class schedule that fits my availability?',
    a: 'We plan to offer flexible schedules. Tell us what suits you when you enquire, and we will check what is possible for the next batch.',
  },
  { q: 'What is the training mode for the course?', a: 'Whether a batch runs online, on-site or both is confirmed when you enquire.' },
]

function Bullets({ items }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function CourseDetailPage({ slug }) {
  
  const found = courses.find((c) => c.slug === slug)
  const course = found ? withTerms(found) : null
  const extra = course ? courseExtras[course.slug] ?? {} : {}
  const testimonials = extra.testimonials ?? []
  const stories = extra.stories ?? []

  const tabs = course
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'why', label: 'Why This Course?' },
        ...(testimonials.length ? [{ id: 'testimonials', label: 'Testimonials' }] : []),
        ...(stories.length ? [{ id: 'success', label: 'Success Stories' }] : []),
        { id: 'faqs', label: 'FAQs' },
      ]
    : []

  const [active, setActive] = useState('overview')

  // Scroll garda active tab aafai badlincha
  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean)
    if (!els.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slug, tabs.length]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!course) return <NotFound />

  const goTo = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const enrollTo = `/enroll?course=${course.slug}`
  const overviewParagraphs = extra.overviewLong ?? [course.overview]
  const why = extra.why ?? defaultWhy(course)

  const feeFaq = {
    q: 'What is the course fee?',
    a: course.fee
      ? `The current offer fee is ${npr(course.fee.offer)} (regular price ${npr(course.fee.original)}) for a ${course.duration} course. This is a limited-time offer.`
      : 'Fees are shared when you enquire.',
  }
  const faqs = [...(extra.faqs ?? defaultFaqs(course)), feeFaq]

  const details = [
    { label: 'Duration', content: course.duration ?? 'Shared when you enquire' },
    { label: 'Format', content: course.format ?? 'Shared when you enquire' },
    {
      label: 'Fee',
      content: course.fee ? <PriceTag fee={course.fee} size="lg" className="justify-center" /> : 'Shared when you enquire',
    },
  ]

  const related = (extra.related
    ? extra.related.map((s) => courses.find((c) => c.slug === s)).filter(Boolean)
    : courses.filter((c) => c.slug !== course.slug).slice(0, 3)
  ).map(withTerms)

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/academy" className="font-semibold text-brand hover:underline">
                Academy
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href="/academy/courses" className="font-semibold text-brand hover:underline">
                Courses
              </Link>
            </nav>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{course.title}</h1>
            <p className="mt-6 max-w-xl text-lg">{course.summary}</p>

            {course.fee && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {offer.label}
                  {offer.ends ? ` · Valid until ${offer.ends}` : ''}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {course.duration && (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
                      <Clock size={16} className="text-brand" aria-hidden="true" />
                      {course.duration}
                    </span>
                  )}
                  <PriceTag fee={course.fee} size="lg" />
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={enrollTo} className={primaryBtn}>
                Enroll Now
              </Link>
              <Link href="/contact" className={secondaryBtn}>
                Contact Us
              </Link>
            </div>
          </div>

          <PhotoBox
            src={course.image}
            alt={course.title}
            icon={course.icon}
            className="aspect-[4/3] rounded-2xl border border-line shadow-lg"
          />
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-16 z-30 border-y border-line bg-white/95 backdrop-blur">
        <nav aria-label="Course sections" className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex min-w-max gap-1">
            {tabs.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => goTo(t.id)}
                  aria-current={active === t.id ? 'true' : undefined}
                  className={`border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors ${
                    active === t.id ? 'border-brand text-brand' : 'border-transparent text-body hover:text-brand'
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overview */}
      <section id="overview" className="scroll-mt-32 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Course Overview</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg">
            {overviewParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {details.map((d) => (
              <li key={d.label} className="rounded-xl border border-line bg-white p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{d.label}</p>
                <div className="mt-2 font-semibold text-forest">{d.content}</div>
              </li>
            ))}
          </ul>

          {extra.tools && (
            <div className="mt-12">
              <h3 className="text-xl font-bold">Tools covered</h3>
              <p className="mt-1 text-sm text-muted">Some of the tools you will work with in this course.</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {extra.tools.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-soft px-4 py-1.5 text-sm font-medium text-forest">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12">
            <h3 className="text-xl font-bold">What you will be able to do</h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {course.outcomes.map((o) => (
                <li key={o} className="rounded-xl border border-line bg-white p-5">
                  <p className="font-medium text-forest">{o}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold">Who it is for</h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {course.audience.map((a) => (
                <li key={a} className="rounded-xl border border-line bg-white p-5">
                  <p className="font-medium text-forest">{a}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl border border-line bg-soft p-5 text-sm">
              <span className="font-semibold text-forest">Before you start: </span>
              {course.prerequisite}
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="scroll-mt-32 bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Curriculum</h2>
          <p className="mt-2 text-muted">
            {extra.curriculum
              ? 'What you will learn, lesson by lesson.'
              : 'The main topics covered. The detailed plan is shared when you enquire.'}
          </p>

          {extra.curriculum ? (
            <div className="mt-8 space-y-3">
              {extra.curriculum.map((lesson, i) => (
                <details
                  key={lesson.title}
                  open={i === 0}
                  className="group rounded-xl border border-line bg-white open:border-brand"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:hidden">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold text-forest">{lesson.title}</span>
                      {lesson.sections && (
                        <span className="mt-0.5 block text-xs text-muted">
                          {lesson.sections.length} {lesson.sections.length === 1 ? 'section' : 'sections'}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-transform group-open:rotate-180"
                    />
                  </summary>

                  <div className="space-y-5 border-t border-line px-5 pb-6 pt-5">
                    {lesson.sections ? (
                      lesson.sections.map((sec) => (
                        <div key={sec.title}>
                          <h3 className="text-sm font-bold text-brand">{sec.title}</h3>
                          <div className="mt-2">
                            <Bullets items={sec.topics} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <Bullets items={lesson.topics} />
                    )}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {course.topics.map((t, i) => (
                <li key={t} className="flex items-center gap-4 rounded-xl border border-line bg-white p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="font-medium text-forest">{t}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Why this course */}
      <section id="why" className="scroll-mt-32 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Why This Course?</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w) => (
              <li key={w.title} className="rounded-2xl border border-line bg-white p-6 transition hover:border-brand hover:shadow-md">
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials (sachho data bhayepachhi matra) */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="scroll-mt-32 bg-soft py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold">Testimonials</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.name} className="rounded-2xl border border-line bg-white p-6">
                  <Quote size={24} className="text-brand" aria-hidden="true" />
                  <p className="mt-3 text-sm">{t.text}</p>
                  <p className="mt-4 font-bold text-forest">{t.name}</p>
                  {t.course && <p className="text-xs text-muted">{t.course}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Success stories (sachho data bhayepachhi matra) */}
      {stories.length > 0 && (
        <section id="success" className="scroll-mt-32 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stories.map((s) => (
                <li key={s.name} className="rounded-2xl border border-line bg-white p-6">
                  <p className="text-lg font-bold text-forest">{s.name}</p>
                  <dl className="mt-3 space-y-1 text-sm">
                    {s.college && (
                      <div>
                        <dt className="inline font-semibold">College: </dt>
                        <dd className="inline">{s.college}</dd>
                      </div>
                    )}
                    {s.company && (
                      <div>
                        <dt className="inline font-semibold">Working at: </dt>
                        <dd className="inline">{s.company}</dd>
                      </div>
                    )}
                    {s.position && (
                      <div>
                        <dt className="inline font-semibold">Position: </dt>
                        <dd className="inline">{s.position}</dd>
                      </div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section id="faqs" className="scroll-mt-32 bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forest marker:hidden">
                  {f.q}
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related courses */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold">Related Courses</h2>
              <p className="mt-1 text-muted">Learners who viewed this course also looked at these.</p>
            </div>
            <Link href="/academy/courses" className="text-sm font-semibold text-brand hover:underline">
              View all courses →
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/academy/courses/${c.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <PhotoBox src={c.image} alt={c.title} icon={c.icon} className="aspect-[16/10]" />
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-lg font-bold text-forest">{c.title}</span>
                    {c.duration && <span className="mt-1 text-sm text-muted">{c.duration}</span>}
                    {c.fee && (
                      <span className="mt-2 block">
                        <PriceTag fee={c.fee} />
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Ready to start {course.title}?</h2>
          <p className="mt-4 text-lg">
            Enroll now to reserve your place, or contact us if you have questions about the course.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={enrollTo} className={primaryBtn}>
              Enroll Now
            </Link>
            <Link href="/contact" className={secondaryBtn}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}