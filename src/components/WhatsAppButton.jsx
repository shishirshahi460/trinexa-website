import { MessageCircle } from 'lucide-react'
import { contactLinks } from '../config/site.js'

export default function WhatsAppButton() {
  const link = contactLinks.find((l) => l.icon === 'chat')
  if (!link) return null

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-forest"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  )
}