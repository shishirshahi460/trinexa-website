import Link from 'next/link'
import SectionTitle from '../components/SectionTitle.jsx'
import { home } from '../data/home.js'

export default function StartupSupport() {
  const { title, text, items } = home.support

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle title={title} text={text} />
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:border-brand"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm">{item.text}</p>
              <Link href={item.to} className="mt-4 text-sm font-semibold text-brand hover:underline">
                Learn more<span className="sr-only"> about {item.title}</span> →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}