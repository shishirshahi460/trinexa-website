const styles = {
  primary: 'bg-brand text-white hover:bg-forest',
  secondary: 'border border-line bg-white text-forest hover:border-brand',
}

export default function Button({ href, variant = 'primary', children, ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${styles[variant]}`}
      {...props}
    >
      {children}
    </a>
  )
}