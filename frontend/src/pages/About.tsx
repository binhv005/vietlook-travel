import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, FileCheck2, Headset, Layers, MessagesSquare, PenTool, Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'

/** One icon per "How we work" step: listen, design, combine, confirm, stay reachable. */
const APPROACH_ICONS = [MessagesSquare, PenTool, Layers, FileCheck2, Headset]

export default function About() {
  const { t, to } = useI18n()
  const services = [
    { label: t.home.cap.tailor.t, text: t.home.cap.tailor.d, path: '/tailor-made-tour', image: '/images/tours/khamphadanhthangvietnam.webp' },
    { label: t.nav.tours, text: t.tours.intro, path: '/tours', image: '/images/tours/tam-coc-bich-dong.webp' },
    { label: t.home.cap.car.t, text: t.home.cap.car.d, path: '/private-car', image: '/images/cars/minivan-golf.webp' },
    { label: t.home.cap.visa.t, text: t.home.cap.visa.d, path: '/visa-fast-track', image: '/images/tours/welcome-vietlook.webp' },
  ]
  return (
    <>
      <Seo title={t.about.eyebrow} description={t.about.intro} path="/about-us" />
      <PageHero image="/images/tours/west-lake-hanoi.webp" imageAlt="Hanoi" eyebrow={t.about.eyebrow} title={t.about.title} crumbs={[{ label: t.nav.about }]} />

      <section className="py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">{t.about.introEyebrow}</p>
            <h2 className="h-section mb-5">{t.about.introTitle}</h2>
            <p className="prose-body text-lg!">{t.about.intro}</p>
            <h2 className="mt-10 text-xl font-bold">{t.about.roleTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.about.role.map((x) => (
                <li key={x} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                  <span className="font-medium">{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <Img src={site.logo} alt={site.name} className="absolute -top-6 -left-4 z-10 h-24 w-auto rounded-xl bg-white p-2 shadow-lg" />
            <Img src="/images/tours/hoi-an-9-copy.webp" alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHeading title={t.about.servicesTitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.path} delay={i * 60}>
                <Link to={to(s.path)} className="card group block h-full">
                  <Img src={s.image} alt="" className="aspect-[3/2] w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-bold group-hover:text-brand-700">{s.label}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted">{s.text}</p>
                    <ArrowRight className="mt-3 size-5 text-accent-500 transition group-hover:translate-x-1" aria-hidden />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading title={t.about.approachTitle} align="center" />

          {/* xl and up: a horizontal timeline, steps alternating above and below the line, each tied to it by a stem and a dot.
              Every stem sits at the same offset in its column, so the dots are evenly spaced and 2 and 4 fall midway between their neighbours. */}
          <ol className="relative hidden grid-cols-[1fr_1fr_1fr_1fr_1.5fr] xl:grid">
            <span className="absolute inset-x-0 top-[190px] h-0.5 bg-ink" aria-hidden />
            {t.about.approach.map((a, i) => {
              const Icon = APPROACH_ICONS[i % APPROACH_ICONS.length]
              const up = i % 2 === 0
              const badge = (
                <span className="flex items-center gap-1.5">
                  <span className="w-7 text-right font-display text-2xl font-semibold text-brand-900">{i + 1}.</span>
                  <span className="flex size-16 items-center justify-center rounded-full bg-brand-900 text-white shadow-md">
                    <Icon className="size-7" aria-hidden />
                  </span>
                </span>
              )
              return (
                <li key={a.t} className="relative h-[380px]">
                  {up ? (
                    <>
                      <div className="absolute top-0 left-0">{badge}</div>
                      <span className="absolute top-[72px] left-[67px] h-[118px] w-0.5 bg-ink" aria-hidden />
                      <div className={`absolute top-[86px] left-[82px] ${i === t.about.approach.length - 1 ? 'right-2' : 'w-[calc(170%-96px)]'}`}>
                        <h3 className="text-sm font-bold tracking-wide uppercase">{a.t}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.d}</p>
                      </div>
                      <span className="absolute top-[190px] left-[68px] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" aria-hidden />
                    </>
                  ) : (
                    <>
                      <span className="absolute top-[190px] left-[68px] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" aria-hidden />
                      <span className="absolute top-[190px] left-[67px] h-[118px] w-0.5 bg-ink" aria-hidden />
                      {/* Text sits left of the stem, running back over the column before (whose step is above the line); upper texts likewise run on over the next column, so lines wrap only when needed. */}
                      <div className="absolute top-[206px] right-[calc(100%-54px)] w-[calc(140%-60px)] text-right">
                        <h3 className="text-sm font-bold tracking-wide uppercase">{a.t}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.d}</p>
                      </div>
                      <div className="absolute top-[308px] left-0">{badge}</div>
                    </>
                  )}
                </li>
              )
            })}
          </ol>

          {/* Below xl: the same steps on a vertical line. */}
          <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-8 before:w-0.5 before:bg-ink xl:hidden">
            {t.about.approach.map((a, i) => {
              const Icon = APPROACH_ICONS[i % APPROACH_ICONS.length]
              return (
                <li key={a.t} className="relative flex gap-4">
                  <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white shadow-md">
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <div className="pt-2">
                    <h3 className="text-sm font-bold tracking-wide uppercase">
                      {i + 1}. {a.t}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{a.d}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-brand-900 py-16 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="h-section text-white">{t.about.contactTitle}</h2>
            <p className="mt-2 text-white/75">
              {t.contact.person}: {site.contactPerson} · {site.phone}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.whatsappHref} variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" aria-hidden /> WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="white" size="lg">
              <Phone className="size-5" aria-hidden /> {t.common.call}
            </ButtonLink>
            <ButtonLink to={to('/travel-trade-partners')} size="lg">
              {t.home.b2bCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
