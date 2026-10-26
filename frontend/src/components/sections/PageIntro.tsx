import type { ReactNode } from 'react'
import Breadcrumb, { type Crumb } from '../ui/Breadcrumb'
import Img from '../ui/Img'

interface Props {
  crumbs: Crumb[]
  title: string
  intro?: string
  /** Background photo behind the header; a dark gradient keeps the text readable. */
  image?: string
  children?: ReactNode
}

/** Page header (breadcrumb + H1 + SEO intro) over a darkened photo, for listing and form pages. */
export default function PageIntro({ crumbs, title, intro, image = '/images/tours/ha-long.webp', children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      <Img src={image} alt="" priority className="absolute inset-0 -z-10 size-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/35" aria-hidden />
      <div className="container-x py-14 md:py-20">
        <Breadcrumb items={crumbs} light />
        <h1 className="h-display mt-5 max-w-3xl text-white">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/85">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
