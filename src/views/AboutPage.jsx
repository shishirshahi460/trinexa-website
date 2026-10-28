'use client'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import TeamModal from '../components/TeamModal.jsx'
import { about } from '../data/about.js'
import { team } from '../data/team.js'
import { site } from '../config/site.js'

export default function AboutPage() {
  const [selected, setSelected] = useState(null)
  const closeModal = useCallback(() => setSelected(null), [])

  // useFounder: true bhaye site.js ko founder ko naam/role/photo, ra team.js ko summary/bio/website jodne
  const groups = team.groups
    .map((g) => ({
      ...g,
      members: g.members.map((m) => (m.useFounder ? { ...site.founder, ...m, featured: true } : m)),
    }))
    .filter((g) => g.members.length > 0)

  return (
    <>
      {/* Intro: left ma text, right ma company logo */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Company</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-5xl">About TRINEXA</h1>
            <p className="mt-5 text-lg">{about.intro}</p>
          </div>

          <div className="relative">
            {/* logo ko pachhadi ko hariyo offset block */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-brand/15"
              aria-hidden="true"
            />
            <div className="relative flex aspect-[4/3] items-center justify-center rounded-3xl border border-line bg-white p-8 shadow-lg sm:p-12">
              <img
                src="/trinexa-logo.png"
                alt="TRINEXA Technologies Pvt. Ltd. logo"
                width="900"
                height="204"
                className="h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={about.areasTitle} />
          <ul className="grid gap-5 md:grid-cols-3">
            {about.areas.map((a) => (
              <li key={a.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{about.missionTitle}</h2>
          <p className="mt-5 text-lg">{about.mission}</p>
        </div>
      </section>

      {/* Leadership & Teams */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={team.title} text={team.text} />

          {groups.map((group) => (
            <div key={group.title} className="mt-12 first:mt-0">
              <h3 className="mb-6 text-center text-xl font-bold text-brand">{group.title}</h3>
              <ul className="flex flex-wrap justify-center gap-5">
                {group.members.map((m, i) =>
                  m.featured ? (
                    /* Premium card: Founder */
                    <li key={`${m.name}-${i}`} className="w-full max-w-3xl">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setSelected(m)}
                        className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl bg-forest p-6 text-left shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:p-8"
                      >
                        {/* mathi ko gradient strip ra glow */}
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

                        <span className="relative grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                          {/* Photo, masino safed ring sahit */}
                          <span className="mx-auto block rounded-full bg-white p-[3px] shadow-lg">
                            {m.photo ? (
                              <img
                                src={m.photo}
                                alt={`${m.name}, ${m.role}`}
                                width="192"
                                height="192"
                                className="size-40 rounded-full object-cover sm:size-48"
                              />
                            ) : (
                              <span
                                className="flex size-40 items-center justify-center rounded-full bg-soft text-brand sm:size-48"
                                aria-hidden="true"
                              >
                                <User size={64} />
                              </span>
                            )}
                          </span>

                          <span className="block text-center sm:text-left">
                            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#6fd9a0]">
                              {m.role}
                            </span>
                            <span className="mt-2 block font-heading text-3xl font-bold text-white sm:text-4xl">
                              {m.name}
                            </span>
                            {(m.summary ?? m.bio) && (
                              <span className="mt-4 line-clamp-3 block text-sm leading-relaxed text-white/75">
                                {m.summary ?? m.bio}
                              </span>
                            )}
                            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-white/20">
                              View full profile →
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  ) : (
                    /* Sadharan card */
                    <li key={`${m.name}-${i}`} className="w-full sm:w-64">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setSelected(m)}
                        className="block w-full cursor-pointer rounded-xl border border-line bg-white p-6 text-center transition hover:border-brand hover:shadow-md"
                      >
                        {m.photo ? (
                          <img
                            src={m.photo}
                            alt={`${m.name}, ${m.role}`}
                            width="160"
                            height="160"
                            loading="lazy"
                            className="mx-auto size-40 rounded-full border border-line object-cover"
                          />
                        ) : (
                          <span
                            className="mx-auto flex size-40 items-center justify-center rounded-full border border-line bg-soft text-brand"
                            aria-hidden="true"
                          >
                            <User size={56} />
                          </span>
                        )}
                        <span className="mt-5 block text-lg font-bold text-forest">{m.name}</span>
                        <span className="mt-1 block text-sm text-muted">{m.role}</span>
                        <span className="mt-3 block text-sm font-semibold text-brand">View profile →</span>
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle title={about.valuesTitle} text={about.valuesText} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v) => (
              <li key={v.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">See how we can help</h2>
          <p className="mt-4">Explore our services and the industries we work with.</p>
          <Link
            href="/#services"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Explore Services
          </Link>
        </div>
      </section>

      <TeamModal member={selected} onClose={closeModal} />
    </>
  )
}