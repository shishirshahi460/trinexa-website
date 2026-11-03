'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import PageViewTracker from './PageViewTracker.jsx'

export default function SiteChrome({ children }) {
  const pathname = usePathname()

  // Admin ma site ko Navbar, Footer, WhatsApp ra tracker chahidaina
  if (pathname.startsWith('/admin')) return <main>{children}</main>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <PageViewTracker />
    </>
  )
}