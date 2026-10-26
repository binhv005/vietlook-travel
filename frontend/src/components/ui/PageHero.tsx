import type { ReactNode } from 'react'
import Breadcrumb, { type Crumb } from './Breadcrumb'
import Img from './Img'

const FOCUS = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
}

interface Props {
  image: string
  imageAlt: string
  eyebrow?: string
  title: string
  text?: string
  crumbs?: Crumb[]
  size?: 'md' | 'lg'
  children?: ReactNode
  /** Vertical focus of the background image, so text does not cover the subject. */
  focus?: keyof typeof FOCUS
}

/** Full-bleed image banner used at the top of listing and landing pages. */
export default function PageHero({ image, imageAlt, eyebrow, title, text, crumbs, size = 'md', children, focus = 'center' }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {/* Never taller than the screen below the header (97/113px, 153px with the top bar from md), so the title and text show in full on arrival. */}
      <div
        className={`flex items-end ${
          size === 'lg'
            ? 'min-h-[min(560px,calc(100svh-97px))] sm:min-h-[min(560px,calc(100svh-113px))] md:min-h-[min(620px,calc(100svh-153px))]'
            : 'min-h-[min(380px,calc(100svh-97px))] sm:min-h-[min(380px,calc(100svh-113px))] md:min-h-[min(440px,calc(100svh-153px))]'
        }`}
      >
        <Img src={image} alt={imageAlt} priority className={`absolute inset-0 -z-10 size-full object-cover ${FOCUS[focus]}`} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-950/10" aria-hidden />
        <div className="container-x pt-28 pb-12 md:pb-16">
          {crumbs && (
            <div className="mb-5">
              <Breadcrumb items={crumbs} light />
            </div>
          )}
          {eyebrow && <p className="eyebrow mb-3 text-sun">{eyebrow}</p>}
          <h1 className="h-display max-w-3xl text-white">{title}</h1>
          {text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
