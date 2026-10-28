import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import { home } from '../data/home.js'

export default function TalkCard() {
  const { text, name, role, button } = home.talk

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative rounded-3xl border border-line bg-white px-6 py-10 shadow-xl sm:px-10 md:pb-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_2fr]">
            <div className="flex justify-center">
              <div className="scale-125">
                <Logo />
              </div>
            </div>

            <div>
              <p className="text-lg">{text}</p>
              <p className="mt-6 text-lg font-semibold text-forest">{name}</p>
              <p className="text-sm text-muted">{role}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end md:mt-0">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-brand px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-forest md:absolute md:-bottom-6 md:right-10"
            >
              {button}
              <span className="flex size-5 items-center justify-center rounded-full bg-white text-brand" aria-hidden="true">
                <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}