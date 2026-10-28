import Link from 'next/link'
import { home } from '../data/home.js'

export default function Industries() {
  const { title, text, items } = home.industries

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-5">{text}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-xl border border-line bg-white p-6 transition hover:border-brand"
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
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