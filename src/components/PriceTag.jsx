import { npr } from '../data/courseFees.js'

// Offer chha bhane: offer price, kateko purano price ra bachat. Chhaina bhane regular price matra.
export default function PriceTag({ fee, size = 'sm', className = '' }) {
  if (!fee) return null
  const save = fee.original - fee.offer

  return (
    <span className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className={`font-bold text-brand ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>{npr(fee.offer)}</span>
      {save > 0 && (
        <>
          <span className="text-sm text-muted line-through">
            <span className="sr-only">Original price </span>
            {npr(fee.original)}
          </span>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
            Save {npr(save)}
          </span>
        </>
      )}
    </span>
  )
}