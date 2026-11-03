'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Pratyek page kholda server lai sano message pathaucha (cookie chahidaina)
export default function PageViewTracker() {
  const pathname = usePathname()
  const first = useRef(true)

  useEffect(() => {
    let referrer = ''
    if (first.current) {
      first.current = false
      const utm = new URLSearchParams(window.location.search).get('utm_source')
      if (utm) {
        referrer = `utm:${utm.slice(0, 40)}`
      } else if (document.referrer) {
        try {
          referrer = new URL(document.referrer).hostname
        } catch {
          referrer = ''
        }
      }
    }

    const body = JSON.stringify({ path: pathname, referrer })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  }, [pathname])

  return null
}