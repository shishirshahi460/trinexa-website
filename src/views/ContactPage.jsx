'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Mail, MessageCircle, Phone, MapPin, Check } from 'lucide-react'
import { contactLinks, contactInfo } from '../config/site.js'

const options = [
  'Technical Consultation',
  'Build a Business Website',
  'Build an Online Store (eCommerce)',
  'Custom Business Application',
  'Digital Marketing Solutions',
  'Partnership Opportunities',
  'Internship',
  'Others',
]

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-forest placeholder:text-muted focus:border-brand'

const empty = { name: '', mobile: '', email: '', topic: '', message: '', website: '' }

export default function ContactPage() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')
  const formRef = useRef(null)
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const emailLink = contactLinks.find((l) => l.icon === 'mail')
  const whatsappLink = contactLinks.find((l) => l.icon === 'chat')
  const emailAddress = emailLink?.href.replace('mailto:', '')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.')
      setStatus('success')
      setForm(empty)
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  // Backup: WhatsApp ma pathaune
  const sendWhatsApp = () => {
    if (!formRef.current.reportValidity() || !whatsappLink) return
    const text = [
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Email: ${form.email}`,
      `Looking for: ${form.topic}`,
      '',
      'About the project:',
      form.message,
    ].join('\n')
    window.open(`${whatsappLink.href}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  const hasDetails = emailLink || whatsappLink || contactInfo.phone || contactInfo.address

  return (
    <>
      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Contact us to discuss your project</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Please tell us a bit about you, your project, and how best to reach you. We will get back to you.
          </p>
        </div>
      </section>

      <section className="bg-soft pb-16 pt-12 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-5">
          {/* Contact details */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:col-span-2">
            <h2 className="text-xl font-bold">Get in touch</h2>
            {hasDetails ? (
              <ul className="mt-5 space-y-5 text-sm">
                {emailLink && (
                  <li className="flex gap-3">
                    <Mail size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-forest">Email</p>
                      <a href={emailLink.href} className="hover:text-brand">{emailAddress}</a>
                    </div>
                  </li>
                )}
                {contactInfo.phone && (
                  <li className="flex gap-3">
                    <Phone size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-forest">Phone</p>
                      <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-brand">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </li>
                )}
                {whatsappLink && (
                  <li className="flex gap-3">
                    <MessageCircle size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-forest">WhatsApp</p>
                      <a href={whatsappLink.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                        Chat with us
                      </a>
                    </div>
                  </li>
                )}
                {contactInfo.address && (
                  <li className="flex gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-forest">Office</p>
                      <p>{contactInfo.address}</p>
                    </div>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-4 rounded-lg border border-line bg-soft p-4 text-sm">
                Use the form to send us a message. We will reply by email or phone.
              </p>
            )}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:col-span-3">
            {status === 'success' ? (
              <div className="py-8 text-center" role="status">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand text-white">
                  <Check size={28} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-bold">Thank you, we received your message</h2>
                <p className="mt-3">We will review it and get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-brand"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">Tell us about your project</h2>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate={false}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-semibold text-forest">Full Name</label>
                      <input id="name" name="name" required minLength={2} maxLength={100} value={form.name} onChange={update} className={fieldClass} placeholder="Your full name" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="mobile" className="text-sm font-semibold text-forest">Mobile</label>
                      <input id="mobile" name="mobile" type="tel" required value={form.mobile} onChange={update} className={fieldClass} placeholder="Your mobile number" autoComplete="tel" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-forest">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={update} className={fieldClass} placeholder="you@example.com" autoComplete="email" />
                  </div>

                  <div>
                    <label htmlFor="topic" className="text-sm font-semibold text-forest">What are you looking for?</label>
                    <select id="topic" name="topic" required value={form.topic} onChange={update} className={fieldClass}>
                      <option value="">Please choose</option>
                      {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-semibold text-forest">Tell us about your project</label>
                    <textarea id="message" name="message" required minLength={5} maxLength={3000} rows={5} value={form.message} onChange={update} className={fieldClass} placeholder="What would you like to build or improve?" />
                  </div>

                  {/* Honeypot: manche le dekhdaina, bot le bharchha */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex min-h-11 items-center rounded-lg bg-brand px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending...' : 'Submit'}
                    </button>
                    {whatsappLink && (
                      <button
                        type="button"
                        onClick={sendWhatsApp}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-brand"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        Send on WhatsApp
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-muted">
                    We use your details only to reply to your enquiry. See our{' '}
                    <Link href="/privacy-policy" className="font-semibold text-brand hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}