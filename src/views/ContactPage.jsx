'use client'
import { useRef, useState } from 'react'
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react'
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

const empty = { name: '', mobile: '', email: '', topic: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('')
  const formRef = useRef(null)

  const emailLink = contactLinks.find((l) => l.icon === 'mail')
  const whatsappLink = contactLinks.find((l) => l.icon === 'chat')
  const emailAddress = emailLink?.href.replace('mailto:', '')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const buildBody = () =>
    [
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Email: ${form.email}`,
      `Looking for: ${form.topic}`,
      '',
      'About the project:',
      form.message,
    ].join('\n')

  const subject = `Website enquiry: ${form.topic || 'General'}`

  const openWhatsApp = () => {
    window.open(`${whatsappLink.href}?text=${encodeURIComponent(buildBody())}`, '_blank', 'noopener,noreferrer')
    setStatus('WhatsApp should open with your message ready. Please press send there to deliver it.')
  }

  // Submit: email set bhaye email, nabhaye WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailLink) {
      window.location.href = `${emailLink.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`
      setStatus('Your email app should open with your message ready. Please press send there to deliver it.')
    } else if (whatsappLink) {
      openWhatsApp()
    } else {
      setStatus('Contact details are not set up yet, so your message could not be prepared. Please try again later.')
    }
  }

  const handleWhatsApp = () => {
    if (!formRef.current.reportValidity()) return
    openWhatsApp()
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
                Contact details are not set yet. Add your email, phone and address in <code>src/config/site.js</code>.
              </p>
            )}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:col-span-3">
            <h2 className="text-xl font-bold">Tell us about your project</h2>
            <p className="mt-2 text-sm text-muted">
              This form opens your email app (or WhatsApp) with your message ready. Nothing is sent until you press
              send there.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-forest">Full Name</label>
                  <input id="name" name="name" required value={form.name} onChange={update} className={fieldClass} placeholder="Your full name" autoComplete="name" />
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
                <textarea id="message" name="message" required rows={5} value={form.message} onChange={update} className={fieldClass} placeholder="What would you like to build or improve?" />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center rounded-lg bg-brand px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
                >
                  Submit
                </button>
                {emailLink && whatsappLink && (
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-brand"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    Send on WhatsApp
                  </button>
                )}
              </div>

              {status && (
                <p role="status" className="rounded-lg border border-line bg-soft p-4 text-sm text-forest">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}