import Link from 'next/link'
import { getAdmin } from '@/lib/auth'

// Admin page Google ma dekhinna
export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

const links = [
  ['/admin', 'Dashboard'],
  ['/admin/courses', 'Courses'],
  ['/admin/blog', 'Blog'],
]

export default async function AdminLayout({ children }) {
  const admin = await getAdmin()

  return (
    <>
      {admin && (
        <nav aria-label="Admin" className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-6xl gap-6 px-4 text-sm font-semibold sm:px-6">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="border-b-2 border-transparent py-3 text-body hover:border-brand hover:text-brand"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
      {children}
    </>
  )
}