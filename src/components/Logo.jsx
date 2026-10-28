export default function Logo({ light = false, className = '' }) {
  return (
    <img
      src={light ? '/trinexa-logo-white.png' : '/trinexa-logo.png'}
      alt="TRINEXA Technologies Pvt. Ltd."
      width="900"
      height="204"
      className={`h-10 w-auto sm:h-12 ${className}`}
    />
  )
}