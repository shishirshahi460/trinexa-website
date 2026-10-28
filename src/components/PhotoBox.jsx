// Photo chha bhane photo, chhaina bhane halka hariyo placeholder (icon sahit).
export default function PhotoBox({ src, alt = '', icon: Icon, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width="1200"
        height="900"
        loading="lazy"
        className={`w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-gradient-to-br from-[#EAF3EC] to-[#DCE8DD] text-brand/60 ${className}`}
    >
      {Icon && <Icon size={56} />}
    </div>
  )
}