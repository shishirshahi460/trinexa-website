'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo.jsx'
import { menu } from '../data/menu.js'

const linkClass = 'text-sm font-medium text-body transition-colors hover:text-brand'
const groupTitleClass = 'text-sm font-bold uppercase tracking-wider text-brand'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null) // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSub, setMobileSub] = useState(null)
  const navRef = useRef(null)

  // Kunai link thichda sabai menu banda
  const closeAll = () => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSub(null)
  }

  // Bahira click ya Escape thichda dropdown banda
  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <nav ref={navRef} className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" aria-label="TRINEXA home" onClick={closeAll}>
          <Logo />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-7 lg:flex">
          {menu.map((m) => (
            <li key={m.label} className="relative">
              {m.to ? (
                <Link href={m.to} className={linkClass} onClick={closeAll}>
                  {m.label}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${linkClass} inline-flex items-center gap-1`}
                    aria-expanded={openMenu === m.label}
                    onClick={() => setOpenMenu(openMenu === m.label ? null : m.label)}
                  >
                    {m.label}
                    <ChevronDown size={14} aria-hidden="true" className={openMenu === m.label ? 'rotate-180' : ''} />
                  </button>
                  {openMenu === m.label && (
                    <div
                      className={`absolute left-0 top-full mt-3 grid gap-6 rounded-xl border border-line bg-white p-5 shadow-lg ${
                        m.groups.length > 1 ? 'w-[30rem] grid-cols-2' : 'w-64'
                      }`}
                    >
                      {m.groups.map((g, i) => (
                        <div key={i}>
                          {g.title && <p className={`mb-2 ${groupTitleClass}`}>{g.title}</p>}
                          <ul className="space-y-1">
                            {g.items.map((item) => (
                              <li key={item.to}>
                                <Link
                                  href={item.to}
                                  onClick={closeAll}
                                  className="block rounded-md px-2 py-1.5 text-sm text-body hover:bg-soft hover:text-brand"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={closeAll}
              className="inline-flex min-h-11 items-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile button */}
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-forest lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="max-h-[80vh] overflow-y-auto border-t border-line bg-white px-4 pb-4 lg:hidden">
          {menu.map((m) => (
            <li key={m.label} className="border-b border-line last:border-0">
              {m.to ? (
                <Link href={m.to} onClick={closeAll} className="block py-3 text-base font-medium text-forest">
                  {m.label}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-base font-medium text-forest"
                    aria-expanded={mobileSub === m.label}
                    onClick={() => setMobileSub(mobileSub === m.label ? null : m.label)}
                  >
                    {m.label}
                    <ChevronDown size={18} aria-hidden="true" className={mobileSub === m.label ? 'rotate-180' : ''} />
                  </button>
                  {mobileSub === m.label && (
                    <div className="pb-3 pl-3">
                      {m.groups.map((g, i) => (
                        <div key={i} className="mb-2">
                          {g.title && <p className={`mb-1 ${groupTitleClass}`}>{g.title}</p>}
                          <ul>
                            {g.items.map((item) => (
                              <li key={item.to}>
                                <Link href={item.to} onClick={closeAll} className="block py-2 text-sm text-body">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/contact"
              onClick={closeAll}
              className="flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}