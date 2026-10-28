import Link from 'next/link'
import Illustration from '../components/Illustration.jsx'
import { home } from '../data/home.js'

export default function DigitalWorld() {
  const { title, paragraphs, image } = home.digital

  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <div className="mt-5 space-y-4">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <Illustration src={image} alt="" />
      </div>
    </section>
  )
}