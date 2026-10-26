import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import { ButtonLink } from '../ui/Button'
import Img from '../ui/Img'

interface Props {
  title?: string
  text?: string
  image?: string
  ctaLabel?: string
  ctaTo?: string
  steps?: string[]
}

/** Full-width "design your own tour" call to action, reused at the end of most pages. */
export default function CtaBanner({ title, text, image = '/images/tours/the-best-lotus-viewing-spots-in-ninh-binh.webp', ctaLabel, ctaTo = '/tailor-made-tour', steps }: Props) {
  const { t, to } = useI18n()
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      <Img src={image} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-40" />
      {/* Even overlay (darker at the edges) so the centred text reads well over any photo. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(7_28_51/0.7),rgb(7_28_51/0.92))]" aria-hidden />
      <div className="container-x py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section text-white">{title ?? t.home.ctaTitle}</h2>
          <p className="mt-4 text-lg text-white/80">{text ?? t.home.ctaText}</p>
          {steps && (
            <ol className="mt-8 grid justify-items-center gap-3 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-white">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-sun font-bold text-brand-950">{i + 1}</span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ol>
          )}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink to={to(ctaTo)} size="lg">
              {ctaLabel ?? t.home.heroCta}
            </ButtonLink>
            <ButtonLink href={site.whatsappHref} variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" aria-hidden /> {t.common.chatWhatsapp}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
