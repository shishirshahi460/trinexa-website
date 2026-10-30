'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-forest placeholder:text-muted focus:border-brand'

export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Login failed.')
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <span className="flex size-12 items-center justify-center rounded-xl bg-soft text-brand">
            <Lock size={22} aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-bold">Admin login</h1>
          <p className="mt-1 text-sm text-muted">Authorised users only.</p>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-forest">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} autoComplete="username" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-forest">Password</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={fieldClass} autoComplete="current-password" />
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}