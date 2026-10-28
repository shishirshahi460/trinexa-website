export default function Illustration({ src, alt = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width="640"
        height="480"
        loading="lazy"
        className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-xs md:max-w-sm" aria-hidden="true">
      <svg viewBox="0 0 320 320" className="h-auto w-full">
        <rect x="8" y="8" width="304" height="304" rx="48" fill="#F4F8F3" stroke="#DCE8DD" strokeWidth="2" />
        <path d="M70 84h180v50h-65v110h-50V134H70z" fill="#16834A" />
        <path d="M185 244h65l-65-55z" fill="#153D2B" opacity=".55" />
      </svg>
    </div>
  )
}