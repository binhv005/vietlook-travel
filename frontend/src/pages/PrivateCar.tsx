import { Link } from 'react-router-dom'
import { ArrowRight, Luggage, MapPin } from 'lucide-react'
import { carFaqs, carServices, serviceAreas, vehicles } from '@/data/vehicles'
import { fmt, useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import Img from '@/components/ui/Img'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import FaqList from '@/components/sections/FaqList'
import VehicleCard from '@/components/car/VehicleCard'
import MapBackdrop from '@/components/ui/MapBackdrop'
import CtaBanner from '@/components/sections/CtaBanner'
import { ButtonLink } from '@/components/ui/Button'

/** Private car hire landing page, laid out after the HLT Car Service reference: hero with quote CTA, fleet by seats, services, FAQ. */
export default function PrivateCar() {
  const { t, l, to } = useI18n()

  return (
    <>
      <Seo title={t.car.heroEyebrow} description={t.car.heroText} path="/private-car" image="/images/cars/road-hero.webp" />

      <section className="relative isolate overflow-hidden bg-brand-950">
        <Img src="/images/cars/road-hero.webp" alt={l({ en: 'Mountain road at sunrise', zh: '日出时的山路' })} priority className="absolute inset-0 -z-10 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/20" aria-hidden />
        <div className="container-x py-14 md:py-20">
          <div>
            <Breadcrumb items={[{ label: t.nav.car }]} light />
            <p className="eyebrow mt-6 mb-3 text-sun">{t.car.heroEyebrow}</p>
            <h1 className="h-display text-white">{t.car.heroTitle}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">{t.car.heroText}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {vehicles.map((v) => (
                <li key={v.slug} className="rounded-full border border-white/25 px-3 py-1 text-sm font-semibold text-white">
                  {fmt(t.car.seats, { n: v.seats })}
                </li>
              ))}
            </ul>
            <ButtonLink to={to('/private-car/quote')} size="lg" className="mt-8">
              {t.home.carCta} <ArrowRight className="size-5" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="fleet">
        <div className="container-x">
          <SectionHeading eyebrow={t.car.fleetEyebrow} title={t.car.fleetTitle} text={t.car.fleetText} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v, i) => (
              <Reveal key={v.slug} delay={i * 50}>
                <VehicleCard vehicle={v} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-1.5 text-sm text-muted">
            <Luggage className="size-4" aria-hidden /> {t.car.luggage}
          </p>
        </div>
      </section>

      <section className="bg-mist py-20" aria-labelledby="car-services">
        <div className="container-x">
          <SectionHeading eyebrow={t.car.servicesEyebrow} title={t.car.servicesTitle} />
          <div className="grid gap-6 md:grid-cols-2">
            {carServices.map((s, i) => {
              const copy = t.car.services[s.key]
              return (
                <Reveal key={s.key} delay={i * 60}>
                  <Link
                    to={`${to('/private-car/quote')}?service=${s.key === 'groups' ? 'group' : s.key === 'intercity' ? 'intercity' : s.key}`}
                    className="group grid overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg sm:grid-cols-[200px_1fr]"
                  >
                    <Img src={s.image} alt="" className="aspect-[16/10] size-full object-cover sm:aspect-auto" />
                    <div className="p-6">
                      <h3 className="text-lg font-bold group-hover:text-brand-700">{copy.t}</h3>
                      <p className="mt-2 text-muted">{copy.d}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-600">
                        {t.home.carCta} <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="car-areas">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <div>
            <p className="eyebrow mb-3">{t.car.areasEyebrow}</p>
            <h2 id="car-areas" className="h-section">
              {t.car.areasTitle}
            </h2>
            <p className="prose-body mt-4">{t.car.areasText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {serviceAreas.map((a) => (
              <div key={a.region.en} className="group relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-lg">
                <Img src={a.image} alt="" className="absolute inset-0 -z-20 size-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/10" aria-hidden />
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <MapPin className="size-4 text-sun" aria-hidden /> {l(a.region)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-sand py-20" aria-labelledby="car-faq">
        <MapBackdrop />
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 id="car-faq" className="h-section">
              {t.car.faqTitle}
            </h2>
            <Img src="/images/cars/minivan-premium.webp" alt="" className="mt-8 hidden aspect-[4/3] w-full rounded-2xl object-cover lg:block" />
          </div>
          <FaqList faqs={carFaqs} />
        </div>
      </section>

      <CtaBanner title={t.car.ctaTitle} text={t.car.ctaText} image="/images/cars/van16-white.webp" ctaLabel={t.home.carCta} ctaTo="/private-car/quote" />
    </>
  )
}
