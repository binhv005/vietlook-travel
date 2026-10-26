import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'white' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap'
const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-white shadow-sm hover:bg-accent-600 focus-visible:outline-accent-500',
  secondary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  outline: 'border border-brand-600 text-brand-700 hover:bg-brand-50',
  white: 'bg-white text-brand-800 shadow-sm hover:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
  whatsapp: 'bg-[#1f9d55] text-white hover:bg-[#188049]',
}
const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-base',
}

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`

interface Common {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

/** Internal (to) or external (href) link styled as a button. */
export function ButtonLink({ to, href, variant, size, className, children, ...rest }: Common & { to?: string; href?: string; 'aria-label'?: string }) {
  const cls = buttonClass(variant, size, className)
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={cls} {...rest}>
      {children}
    </Link>
  )
}

export function Button({ variant, size, className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
