'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Inbox, GraduationCap, FileText, Globe, Download, LogOut, Menu, X, ExternalLink } from 'lucide-react'
import Logo from '../Logo.jsx'

const nav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/visitors', label: 'Visitors', icon: Globe },
  { href: '/admin/records', label: 'Enrollments & enquiries', icon: Inbox },
  { href: '/admin/courses', label: 'Courses', icon: GraduationCap },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/export', label: 'Export', icon: Download },
]

export default function AdminShell({ email, children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const isActive = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href))

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F4F8F3]">
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-white transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/admin" aria-label="Admin overview" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-forest lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Admin" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive(href) ? 'bg-brand text-white shadow-sm' : 'text-body hover:bg-soft hover:text-brand'
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-line p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-body hover:text-brand"
          >
            <ExternalLink size={16} aria-hidden="true" /> View website
          </Link>
          <button
            type="button"
            onClick={logout}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-body hover:text-brand"
          >
            <LogOut size={16} aria-hidden="true" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-forest lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
          <p className="text-sm font-semibold text-forest">Admin panel</p>
          <span className="ml-auto truncate text-sm text-muted">{email}</span>
        </header>

        {children}
      </div>
    </div>
  )
}