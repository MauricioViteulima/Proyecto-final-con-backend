import { Link } from 'react-router-dom'

const variants = {
  primary: 'border-[#ff4b00] bg-[#ff4b00] text-white hover:bg-[#ff6726]',
  outline: 'border-[#ff4b00] text-[#ff7a3d] hover:bg-[#ff4b00] hover:text-white',
  ghost: 'border-white/10 bg-white/5 text-slate-100 hover:bg-white/10',
}

export default function Button({ children, to, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
