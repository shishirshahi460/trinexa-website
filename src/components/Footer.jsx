import Link from 'next/link'
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react'
import Logo from './Logo.jsx'
import Year from './Year.jsx'
import { site, contactLinks, contactInfo } from '../config/site.js'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/company/about' },
      { label: 'Careers', to: '/company/careers' },
      { label: 'Academy', to: '/academy' },
    ],
  },
  {
    title: 'Ventures',
    links: [
      { label: 'Business Power Platform', to: '/ventures/business-power-platform' },
      { label: 'Education', to: '/ventures/education' },
      { label: 'Health Care', to: '/ventures/health-care' },
      { label: 'Food & Delivery', to: '/ventures/food-delivery' },
      { label: 'HR Care', to: '/ventures/hr-care' },
      { label: 'Travel & Recreation', to: '/ventures/travel-recreation' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Website & Portals', to: '/services/website-portals' },
      { label: 'Custom Web & Mobile App', to: '/services/custom-apps' },
      { label: 'Enterprise Application', to: '/services/enterprise' },
      { label: 'Training & Consulting', to: '/services/training-consulting' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blogs', to: '/resources/blogs' },
      { label: 'Working Methodology', to: '/resources/working-methodology' },
      { label: 'Become a Partner', to: '/resources/partner' },
    ],
  },
]

const icons = { mail: Mail, chat: MessageCircle }

const pill =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10'

export default function Footer() {
  const hasContact = contactLinks.length > 0 || contactInfo.phone || contactInfo.address

  return (
    <footer className="relative overflow-hidden bg-forest text-white/75">
      {/* mathi ko hariyo gradient strip */}
      <div className="h-1 bg-gradient-to-r from-brand via-[#6fd9a0] to-brand" aria-hidden="true" />

      {/* halka glow */}
      <div
        className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-brand/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-[#6fd9a0]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Logo + contact */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="TRINEXA home" className="inline-block">
              <Logo light />
            </Link>

            {hasContact && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {contactLinks.map(({ label, href, icon }) => {
                  const Icon = icons[icon]
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        className={pill}
                        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        <Icon size={16} aria-hidden="true" />
                        {label}
                      </a>
                    </li>
                  )
                })}
                {contactInfo.phone && (
                  <li>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className={pill}>
                      <Phone size={16} aria-hidden="true" />
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo.address && (
                  <li className="inline-flex items-center gap-2 text-sm">
                    <MapPin size={16} className="shrink-0" aria-hidden="true" />
                    {contactInfo.address}
                  </li>
                )}
              </ul>
            )}

            {site.social.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-4 text-sm">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-heading text-lg font-bold !text-white">{col.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        href={l.to}
                        className="inline-block transition-all hover:translate-x-1 hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom: ek matra line, sabai center ma */}
        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs">
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
          </p>
          <p className="mt-3">
            © <Year /> {site.legalName} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}