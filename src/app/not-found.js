import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-xl px-4">
        <p className="text-sm font-bold uppercase tracking-wider text-brand">404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-lg">
          This page does not exist yet, or it is still being moved to the new site.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
        >
          Go to home
        </Link>
      </div>
    </section>
  )
}