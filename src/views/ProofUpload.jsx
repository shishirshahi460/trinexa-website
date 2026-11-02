'use client'

import { useState } from 'react'
import { Upload, Check } from 'lucide-react'

const MAX_BYTES = 4 * 1024 * 1024

export default function ProofUpload({ reference, token }) {
  const [status, setStatus] = useState('idle') // idle | uploading | done | error
  const [message, setMessage] = useState('')

  const onChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // ek-i file pheri chunna milne
    if (!file) return

    if (file.size > MAX_BYTES) {
      setStatus('error')
      setMessage('Please choose a file under 4 MB.')
      return
    }

    setStatus('uploading')
    setMessage('')
    try {
      const body = new FormData()
      body.append('reference', reference)
      body.append('token', token)
      body.append('file', file)

      const res = await fetch('/api/enroll/proof', { method: 'POST', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Upload failed. Please try again.')

      setStatus('done')
      setMessage(`Uploaded: ${file.name}`)
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <div className="mt-5 rounded-xl border border-line bg-soft p-4 text-left">
      <p className="text-sm font-semibold text-forest">Upload payment proof</p>
      <p className="mt-1 text-xs text-muted">If you have already paid. JPG, PNG, WebP or PDF, up to 4 MB.</p>

      <label className="mt-3 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-brand bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors focus-within:ring-2 focus-within:ring-brand hover:bg-soft">
        {status === 'done' ? <Check size={16} aria-hidden="true" /> : <Upload size={16} aria-hidden="true" />}
        {status === 'uploading' ? 'Uploading...' : status === 'done' ? 'Upload another file' : 'Choose file'}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={onChange}
          disabled={status === 'uploading'}
          className="sr-only"
        />
      </label>

      {message && (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          className={`mt-3 text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-green-700'}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}