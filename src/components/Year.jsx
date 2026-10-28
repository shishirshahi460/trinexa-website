'use client'

import { useSyncExternalStore } from 'react'

// Server ma sthir year (2026) dekhaucha, browser ma asli year dekhaucha.
const subscribe = () => () => {}

export default function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  )
  return <>{year}</>
}