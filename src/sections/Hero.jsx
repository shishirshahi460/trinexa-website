import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { home } from '../data/home.js'

// Photo `public/Academy/Academy.jpg` ma chha. Arko photo halna yo path badalnus.
const heroImage = {
  src: '/Academy/Academy.jpg',
  alt: 'TRINEXA team working together in the office',
}

// Tagline ko teen bhaag
const tagline = ['Simple Ideas', 'Thoughtful Technology', 'Real Solutions']

export default function Hero() {
  const { title, text } = home.hero

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#EAF3EC] via-[#F4F8F3] to-[#E3EEE5]"
    >
      {/* halka shadow jasto glow */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 size-96 rounded-full bg-forest/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-24 md:pt-16">
        {/* Left: text */}
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg">{text}</p>
          <div className="mt-10">
            <Link
              href="/ventures"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              Learn More About Our Ventures <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative pb-6">
          {/* photo ko pachhadi ko hariyo offset block */}
          <div
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-brand/20"
            aria-hidden="true"
          />

          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width="1200"
            height="900"
            fetchPriority="high"
            className="relative aspect-[4/3] w-full rounded-3xl border-4 border-white object-cover shadow-2xl"
          />

          {/* Sano premium tagline card: safed line, gaaro shadow */}
          <div className="absolute -bottom-1 left-8 overflow-hidden rounded-xl border-2 border-white bg-forest px-3 py-2 shadow-[0_14px_32px_-4px_rgba(21,61,43,0.65)] md:left-8">
            <span
              className="absolute inset-x-0 top-0 block h-0.5 bg-gradient-to-r from-brand via-[#6fd9a0] to-brand"
              aria-hidden="true"
            />
            <p className="sr-only">Simple Ideas. Thoughtful Technology. Real Solutions.</p>
            <ul
              aria-hidden="true"
              className="font-heading text-[9px] font-semibold uppercase leading-snug tracking-wider text-white sm:text-[10px]"
            >
              {tagline.map((line) => (
                <li key={line}>
                  {line}
                  <span className="text-[#6fd9a0]">.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}