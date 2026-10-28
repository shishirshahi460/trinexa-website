import Link from 'next/link'
import { methodology } from '../data/methodology.js'

export default function MethodologyPage() {
  const { label, intro, phases, factorsTitle, factorsSubtitle, factors } = methodology
  let stepNumber = 0 // step number sabai phase ma continuous

  return (
    <>
      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Resources</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{label}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg">{intro}</p>
        </div>

        {/* 3 phase overview cards */}
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-5 md:grid-cols-3">
            {phases.map((p, i) => {
              const Icon = p.icon
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="group flex h-full flex-col items-center rounded-2xl border border-line bg-white p-7 text-center transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
                  >
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon size={28} aria-hidden="true" />
                    </span>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                      Phase {i + 1}
                    </span>
                    <span className="mt-1 text-lg font-bold text-forest">{p.title}</span>
                    <span className="mt-2 text-sm">{p.summary}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Phases */}
      {phases.map((phase, index) => (
        <section
          key={phase.id}
          id={phase.id}
          className={`${index % 2 === 0 ? 'bg-soft' : ''} py-16 md:py-24`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-bold">{phase.title}</h2>
              <p className="mt-3">{phase.text}</p>
            </div>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {phase.steps.map((step) => {
                stepNumber += 1
                return (
                  <li key={step.title} className="rounded-xl border border-line bg-white p-6">
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                      {stepNumber}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm">{step.text}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      ))}

      {/* Key factors */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{factorsTitle}</h2>
            <p className="mt-1 text-2xl font-semibold text-brand sm:text-3xl">{factorsSubtitle}</p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((f) => {
              const Icon = f.icon
              return (
                <li
                  key={f.title}
                  className="rounded-2xl border border-line bg-white p-6 transition hover:border-brand hover:shadow-md"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm">{f.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Looking to discuss your technical needs?</h2>
          <p className="mt-4">Tell us about you and your project, and we will get back to you.</p>
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