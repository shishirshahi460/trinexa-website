'use client'
import { useEffect, useRef } from 'react'
import { X, User, Globe } from 'lucide-react'

export default function TeamModal({ member, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!member) return undefined

    const previouslyFocused = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden' // pachhadi ko page scroll nahos
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [member, onClose])

  if (!member) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose() // bahira click garda banda
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-modal-name"
        className="relative grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:grid-cols-[2fr_3fr] sm:gap-8 sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-forest"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {member.photo ? (
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            width="400"
            height="500"
            className="aspect-[4/5] w-full rounded-xl border border-line object-cover"
          />
        ) : (
          <div
            className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border border-line bg-soft text-brand"
            aria-hidden="true"
          >
            <User size={72} />
          </div>
        )}

        <div className="sm:pr-10">
          <h2 id="team-modal-name" className="text-2xl font-bold !text-brand">
            {member.name}
          </h2>
          <p className="mt-1 text-muted">{member.role}</p>
          <p className="mt-5 whitespace-pre-line leading-relaxed">
            {member.bio ?? 'Profile details will be added soon.'}
          </p>

          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <Globe size={16} aria-hidden="true" />
              {member.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}