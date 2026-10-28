'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Search, Mail, MessageCircle, Copy, Clock, CalendarDays } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import PriceTag from '../components/PriceTag.jsx'
import { courses as baseCourses } from '../data/academyCourses.js'
import { withTerms, npr } from '../data/courseFees.js'
import { minAmount, paymentGroups } from '../data/payment.js'
import { contactLinks } from '../config/site.js'

const courses = baseCourses.map(withTerms)
const allMethods = paymentGroups.flatMap((g) => g.methods)
const stepLabels = ['Enroll Form', 'Payment Method', 'Review Details']

const stepMeta = {
  1: {
    title: 'Enroll now',
    text: 'Please fill out the form below to enroll. All fields marked with an asterisk (*) are mandatory.',
  },
  2: {
    title: 'Select a payment method',
    text: 'Select your preferred payment method to continue.',
  },
  3: {
    title: 'Verify your details',
    text: 'Check and verify your details before submitting your admission request.',
  },
}

const fieldClass =
  'mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-forest placeholder:text-muted focus:border-brand'
const primaryBtn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest'
const ghostBtn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-brand bg-white px-6 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-soft'

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-forest">
        {label}
        {required && (
          <span className="text-red-600" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Alternate (odd) rows ma halka hariyo background
function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 rounded-md px-4 py-3 text-sm odd:bg-soft">
      <dt className="font-semibold text-forest">{label}</dt>
      <dd className="text-right">{value || '-'}</dd>
    </div>
  )
}

export default function EnrollPage({ initialCourse }) {
  const preselected = courses.find((c) => c.slug === initialCourse)

  const [step, setStep] = useState(1)
  const [picking, setPicking] = useState(false)
  const [picked, setPicked] = useState(preselected?.slug ?? '')
  const [query, setQuery] = useState('')
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    course: preselected?.slug ?? '',
    name: '',
    email: '',
    mobile: '',
    address: '',
    college: '',
    otherCourse: '',
    method: '',
    amount: preselected?.fee ? String(preselected.fee.offer) : '',
    ref: '',
    remarks: '',
    agree: false,
  })

  const emailLink = contactLinks.find((l) => l.icon === 'mail')
  const whatsappLink = contactLinks.find((l) => l.icon === 'chat')

  const selected = courses.find((c) => c.slug === form.course)
  const pickedCourse = courses.find((c) => c.slug === picked)
  const method = allMethods.find((m) => m.id === form.method)
  const payNow = Boolean(method && (method.details?.length || method.qr))

  const update = (e) => {
    const { name, type, checked, value } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const go = (n) => {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openPicker = () => {
    setPicked(form.course)
    setPicking(true)
  }

  const confirmCourse = () => {
    if (!pickedCourse) return
    setForm((f) => ({
      ...f,
      course: pickedCourse.slug,
      amount: pickedCourse.fee ? String(pickedCourse.fee.offer) : f.amount,
    }))
    setPicking(false)
    setQuery('')
  }

  const next1 = () => {
    const e = {}
    if (!form.course) e.course = 'Please choose a course.'
    if (!form.name.trim()) e.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!/^\d{7,15}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Please enter a valid mobile number.'
    if (!form.address.trim()) e.address = 'Please enter your address.'
    setErrors(e)
    if (!Object.keys(e).length) go(2)
  }

  const next2 = () => {
    const e = {}
    if (!form.method) e.method = 'Please select a payment method.'
    if (!(Number(form.amount) >= minAmount)) e.amount = `The amount must be at least Rs. ${minAmount.toLocaleString('en-US')}.`
    if (payNow && !form.ref.trim()) e.ref = 'Please enter your transaction ID.'
    setErrors(e)
    if (!Object.keys(e).length) go(3)
  }

  const complete = () => {
    if (!form.agree) {
      setErrors({ agree: 'Please accept the Terms & Conditions to continue.' })
      return
    }
    setErrors({})
    setCopied(false)
    setDone(true)
  }

  // Course chooser khulda Escape le banda garne, ra pachhadi ko page scroll nagarne
  useEffect(() => {
    if (!picking) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setPicking(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [picking])

  // Popup khulda Escape le banda garne
  useEffect(() => {
    if (!done) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setDone(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [done])

  const message = [
    'Enrollment request',
    `Course: ${selected?.title ?? ''}`,
    `Full name: ${form.name}`,
    `Email: ${form.email}`,
    `Mobile: +977 ${form.mobile}`,
    `Address: ${form.address}`,
    `College: ${form.college || '-'}`,
    `Other course: ${form.otherCourse || '-'}`,
    '',
    `Payment method: ${method?.label ?? ''}`,
    `Amount: ${npr(Number(form.amount) || 0)}`,
    `Transaction ID: ${form.ref || '-'}`,
    `Remarks: ${form.remarks || '-'}`,
  ].join('\n')

  const emailHref = emailLink
    ? `${emailLink.href}?subject=${encodeURIComponent(`Enrollment: ${selected?.title ?? ''}`)}&body=${encodeURIComponent(message)}`
    : null
  const whatsappHref = whatsappLink ? `${whatsappLink.href}?text=${encodeURIComponent(message)}` : null

  const copyDetails = () => {
    navigator.clipboard?.writeText(message).then(() => setCopied(true))
  }

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(query.trim().toLowerCase()))
  const meta = stepMeta[step]
  const batchCount = pickedCourse?.batches.length ?? 0

  const selectButton = (
    <button
      type="button"
      disabled={!pickedCourse}
      onClick={confirmCourse}
      className={`${primaryBtn} w-full disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {pickedCourse ? 'Select (1 course)' : 'Select a course'}
    </button>
  )

  return (
    <section className="bg-soft py-8 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm lg:grid-cols-[250px_1fr]">
          {/* Left: stepper */}
          <aside className="border-b border-line bg-white p-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
            <Link href="/" aria-label="TRINEXA home" className="hidden justify-center lg:flex">
              <Logo />
            </Link>

            <ol
              className="flex w-full items-start gap-2 lg:mt-12 lg:flex-col lg:items-center lg:gap-0"
              aria-label="Enrollment steps"
            >
              {stepLabels.map((label, i) => {
                const n = i + 1
                const state = n < step ? 'done' : n === step ? 'active' : 'todo'
                return (
                  <Fragment key={label}>
                    {i > 0 && (
                      <li
                        aria-hidden="true"
                        className={`mt-5 h-px flex-1 lg:mt-0 lg:h-14 lg:w-px lg:flex-none ${
                          n <= step ? 'bg-brand' : 'bg-line'
                        }`}
                      />
                    )}
                    <li
                      aria-current={state === 'active' ? 'step' : undefined}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <span
                        className={`flex size-11 items-center justify-center rounded-full text-sm font-semibold lg:size-12 ${
                          state === 'todo'
                            ? 'border border-line bg-white text-muted'
                            : state === 'active'
                              ? 'bg-brand text-white ring-4 ring-brand/20'
                              : 'bg-brand text-white'
                        }`}
                      >
                        {state === 'done' ? <Check size={18} aria-hidden="true" /> : n}
                      </span>
                      <span className={`text-xs font-semibold lg:text-sm ${state === 'todo' ? 'text-muted' : 'text-brand'}`}>
                        {label}
                      </span>
                    </li>
                  </Fragment>
                )
              })}
            </ol>

            <p className="mt-10 hidden text-center text-sm text-muted lg:block">
              Need help?{' '}
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Contact us
              </Link>
            </p>
          </aside>

          {/* Right: content */}
          <div className="bg-soft p-5 sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold text-muted">
                Step {step}: {stepLabels[step - 1]}
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{meta.title}</h1>
              <p className="mt-2 text-muted">{meta.text}</p>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                  <div className="space-y-5">
                    <Field id="course" label="Course" required error={errors.course}>
                      <button
                        id="course"
                        type="button"
                        onClick={openPicker}
                        className={`${fieldClass} flex items-center justify-between text-left`}
                      >
                        <span className={selected ? 'font-medium' : 'text-muted'}>
                          {selected ? selected.title : 'Choose a Course...'}
                        </span>
                        <span className="text-xs font-semibold text-brand">Change</span>
                      </button>
                    </Field>

                    <Field id="name" label="Full Name" required error={errors.name}>
                      <input id="name" name="name" value={form.name} onChange={update} className={fieldClass} placeholder="Your full name" autoComplete="name" />
                    </Field>

                    <Field id="email" label="Email" required error={errors.email}>
                      <input id="email" name="email" type="email" value={form.email} onChange={update} className={fieldClass} placeholder="you@example.com" autoComplete="email" />
                    </Field>

                    <Field id="mobile" label="Mobile" required error={errors.mobile}>
                      <div className="mt-1.5 flex">
                        <span className="flex items-center rounded-l-lg border border-r-0 border-line bg-soft px-3 text-sm font-medium text-forest">
                          +977
                        </span>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          value={form.mobile}
                          onChange={update}
                          className="w-full rounded-r-lg border border-line bg-white px-4 py-2.5 text-sm text-forest placeholder:text-muted focus:border-brand"
                          placeholder="98XXXXXXXX"
                          autoComplete="tel-national"
                        />
                      </div>
                    </Field>

                    <Field id="address" label="Address" required error={errors.address}>
                      <input id="address" name="address" value={form.address} onChange={update} className={fieldClass} placeholder="Your address" autoComplete="street-address" />
                    </Field>

                    <Field id="college" label="College Name">
                      <input id="college" name="college" value={form.college} onChange={update} className={fieldClass} placeholder="Your college (optional)" />
                    </Field>

                    <Field id="otherCourse" label="Other Course">
                      <input id="otherCourse" name="otherCourse" value={form.otherCourse} onChange={update} className={fieldClass} placeholder="Another course you are interested in (optional)" />
                    </Field>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button type="button" onClick={next1} className={primaryBtn}>
                      Next <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                  <div className="space-y-6">
                    {paymentGroups.map((g) => (
                      <div key={g.title}>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-brand">{g.title}</h3>
                        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                          {g.methods.map((m) => (
                            <li key={m.id}>
                              <button
                                type="button"
                                aria-pressed={form.method === m.id}
                                onClick={() => setForm((f) => ({ ...f, method: m.id }))}
                                className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold transition hover:border-brand ${
                                  form.method === m.id ? 'border-brand bg-soft text-forest' : 'border-line bg-white text-body'
                                }`}
                              >
                                {m.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {errors.method && (
                      <p className="text-xs font-medium text-red-600" role="alert">
                        {errors.method}
                      </p>
                    )}
                  </div>

                  {method && (
                    <div className="mt-6 rounded-xl border border-line bg-soft p-5">
                      <h3 className="font-bold">{method.label}</h3>
                      {payNow ? (
                        <>
                          {method.details?.length > 0 && (
                            <ul className="mt-2 space-y-1 text-sm">
                              {method.details.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          )}
                          {method.qr && (
                            <img
                              src={method.qr}
                              alt={`${method.label} QR code`}
                              width="224"
                              height="224"
                              className="mt-4 size-56 rounded-lg border border-line bg-white object-contain"
                            />
                          )}
                          <p className="mt-3 text-sm">Pay using these details, then enter your transaction ID below.</p>
                        </>
                      ) : (
                        <p className="mt-2 text-sm">
                          Payment details for {method.label} will be shared by our team after you submit your request. You do
                          not need to pay yet.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-6 space-y-5">
                    <Field id="amount" label="Amount (Rs.)" required error={errors.amount}>
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        min={minAmount}
                        value={form.amount}
                        onChange={update}
                        className={fieldClass}
                        placeholder="Enter your amount..."
                      />
                      <p className="mt-1 text-xs text-muted">
                        The amount must be at least Rs. {minAmount.toLocaleString('en-US')}.
                        {selected?.fee ? ` Offer fee for this course: ${npr(selected.fee.offer)}.` : ''}
                      </p>
                    </Field>

                    {payNow && (
                      <>
                        <Field id="ref" label="Transaction ID / Reference" required error={errors.ref}>
                          <input id="ref" name="ref" value={form.ref} onChange={update} className={fieldClass} placeholder="Enter your transaction ID" />
                        </Field>
                        <p className="rounded-lg border border-line bg-soft p-4 text-sm">
                          After you submit, please also send a screenshot of your payment in the same email or WhatsApp chat.
                          This website cannot upload files yet.
                        </p>
                      </>
                    )}

                    <Field id="remarks" label="Remarks">
                      <textarea id="remarks" name="remarks" rows={3} value={form.remarks} onChange={update} className={fieldClass} placeholder="Anything we should know (optional)" />
                    </Field>
                  </div>

                  <div className="mt-8 flex justify-between gap-3">
                    <button type="button" onClick={() => go(1)} className={ghostBtn}>
                      <ArrowLeft size={16} aria-hidden="true" /> Back
                    </button>
                    <button type="button" onClick={next2} className={primaryBtn}>
                      Next <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="mt-8">
                  <div className="grid gap-6 xl:grid-cols-2">
                    <div>
                      <h2 className="text-xl font-bold">Admission Details</h2>
                      <dl className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
                        <Row label="Full Name" value={form.name} />
                        <Row label="Email" value={form.email} />
                        <Row label="Mobile" value={`+977 ${form.mobile}`} />
                        <Row label="Address" value={form.address} />
                        <Row label="College Name" value={form.college} />
                        <Row label="Selected Course" value={selected?.title} />
                        <Row label="Other Course" value={form.otherCourse} />
                      </dl>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">Payment</h2>
                      <dl className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
                        <Row label="Purpose" value="Admission" />
                        <Row label="Amount" value={npr(Number(form.amount) || 0)} />
                        <Row label="Method" value={method?.label} />
                        <Row label="Transaction ID" value={form.ref} />
                        <Row label="Remarks" value={form.remarks} />
                      </dl>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={form.agree}
                        onChange={update}
                        className="mt-0.5 size-4 shrink-0 accent-[#16834A]"
                      />
                      <span>
                        I understand and agree to the{' '}
                        <Link href="/terms" target="_blank" className="font-semibold text-brand underline">
                          Terms & Conditions
                        </Link>
                      </span>
                    </label>
                    {errors.agree && (
                      <p className="mt-1 text-xs font-medium text-red-600" role="alert">
                        {errors.agree}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button type="button" onClick={() => go(2)} className={ghostBtn}>
                      Back
                    </button>
                    <button type="button" onClick={complete} className={primaryBtn}>
                      Complete <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Choose your course: full-screen */}
      {picking && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose your course"
          className="fixed inset-0 z-[70] overflow-y-auto bg-white"
        >
          <div className="mx-auto grid min-h-full max-w-7xl lg:grid-cols-[1fr_380px]">
            {/* Left: course list */}
            <div className="p-5 pb-8 sm:p-8 lg:p-10">
              <button
                type="button"
                onClick={() => setPicking(false)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-brand"
              >
                <ArrowLeft size={18} aria-hidden="true" /> Back
              </button>

              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Choose your course</h2>
              <p className="mt-2 text-lg text-muted">Select the course that matches your goals</p>

              <div className="relative mt-6 max-w-md">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search for courses..."
                  aria-label="Search courses"
                  className={`${fieldClass} mt-0 pl-10`}
                />
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c) => {
                  const isSel = c.slug === picked
                  return (
                    <li key={c.slug}>
                      <button
                        type="button"
                        aria-pressed={isSel}
                        onClick={() => setPicked(c.slug)}
                        className={`flex h-full w-full items-start gap-4 rounded-xl p-5 text-left transition ${
                          isSel ? 'bg-[#E3EEE5] ring-1 ring-brand' : 'bg-soft hover:bg-[#E9F1EA]'
                        }`}
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand text-lg font-bold text-white">
                          {isSel ? <Check size={22} aria-hidden="true" /> : c.title[0]}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold leading-snug text-forest">{c.title}</span>
                          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-brand">
                            {c.duration && (
                              <span className="inline-flex items-center gap-1">
                                <Clock size={14} aria-hidden="true" />
                                {c.duration}
                              </span>
                            )}
                            {c.batches.length > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <CalendarDays size={14} aria-hidden="true" />
                                {c.batches.length} upcoming classes
                              </span>
                            )}
                            {c.fee && <span>{npr(c.fee.offer)}</span>}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
                {filtered.length === 0 && (
                  <li className="col-span-full py-8 text-center text-sm text-muted">No course found.</li>
                )}
              </ul>
            </div>

            {/* Right: Upcoming classes */}
            <aside className="bg-soft p-5 sm:p-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
              <h2 className="text-2xl font-bold">Upcoming Classes</h2>
              <p className="mt-2 text-sm">
                {batchCount > 0 ? (
                  <>
                    <span className="font-semibold text-brand">{batchCount} upcoming classes</span> from the selected course
                  </>
                ) : (
                  <span className="text-muted">No class dates announced yet</span>
                )}
              </p>

              <div className="mt-6 flex-1 lg:overflow-y-auto">
                {pickedCourse ? (
                  <div className="rounded-2xl border border-line bg-white p-5">
                    <h3 className="text-lg font-bold leading-snug">{pickedCourse.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      {pickedCourse.duration && (
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          <Clock size={14} className="text-brand" aria-hidden="true" />
                          {pickedCourse.duration}
                        </span>
                      )}
                      {pickedCourse.fee && <PriceTag fee={pickedCourse.fee} />}
                    </div>

                    {batchCount > 0 ? (
                      <ul className="mt-5 space-y-4">
                        {pickedCourse.batches.map((b) => (
                          <li key={b.date}>
                            <p className="flex items-center gap-2 font-bold text-brand">
                              <CalendarDays size={16} aria-hidden="true" />
                              {b.date}
                            </p>
                            <ul className="mt-2 flex flex-wrap gap-2">
                              {b.times.map((t) => (
                                <li
                                  key={t}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-soft px-3 py-1.5 text-sm font-medium"
                                >
                                  <Check size={14} className="text-muted" aria-hidden="true" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-5 rounded-lg bg-soft p-4 text-sm">
                        Class dates are not announced yet. Our team will share the next batch details after you submit your
                        enrollment request.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-line bg-white p-5 text-sm text-muted">
                    Select a course to see its details.
                  </p>
                )}
              </div>

              <div className="mt-6 hidden lg:block">{selectButton}</div>
            </aside>
          </div>

          {/* Mobile: sticky Select button */}
          <div className="sticky bottom-0 border-t border-line bg-white p-4 lg:hidden">{selectButton}</div>
        </div>
      )}

      {/* Popup */}
      {done && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDone(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enroll-done-title"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-7 text-center shadow-2xl"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand text-white">
              <Check size={28} aria-hidden="true" />
            </span>
            <h2 id="enroll-done-title" className="mt-5 text-2xl font-bold">
              Enrollment request ready
            </h2>
            <p className="mt-3 text-sm">
              Your details are ready. Press a button below, then press <strong>send</strong> in your email or WhatsApp app to
              submit your request. Our team will confirm your seat after checking your payment.
            </p>
            {payNow && (
              <p className="mt-3 text-sm">If you have already paid, please also send your payment screenshot in the same chat or email.</p>
            )}

            <div className="mt-6 flex flex-col gap-3">
              {emailHref && (
                <a href={emailHref} className={primaryBtn}>
                  <Mail size={16} aria-hidden="true" /> Send by Email
                </a>
              )}
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={emailHref ? ghostBtn : primaryBtn}>
                  <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
                </a>
              )}
              {!emailHref && !whatsappHref && (
                <p className="rounded-lg border border-line bg-soft p-4 text-sm">
                  Our email and WhatsApp details are not set up yet. Please copy your details and contact us directly.
                </p>
              )}
              <button type="button" onClick={copyDetails} className={ghostBtn}>
                <Copy size={16} aria-hidden="true" /> {copied ? 'Copied' : 'Copy details'}
              </button>
              <button type="button" onClick={() => setDone(false)} className="text-sm font-semibold text-muted hover:text-forest">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}