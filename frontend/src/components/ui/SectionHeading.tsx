import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: string
  text?: string
  align?: 'left' | 'center'
  action?: ReactNode
  light?: boolean
  as?: 'h1' | 'h2'
}

export default function SectionHeading({ eyebrow, title, text, align = 'left', action, light, as: H = 'h2' }: Props) {
  const center = align === 'center'
  return (
    <div className={`mb-10 flex flex-col gap-5 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-3xl'}>
        {eyebrow && <p className={`eyebrow mb-3 ${light ? 'text-sun' : ''}`}>{eyebrow}</p>}
        <H className={`h-section ${light ? 'text-white' : ''}`}>{title}</H>
        {text && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/80' : 'text-muted'}`}>{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
