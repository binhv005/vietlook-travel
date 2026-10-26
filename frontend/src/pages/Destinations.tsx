import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { citiesOf, regions } from '@/data/destinations'
import { toursByDestination } from '@/data/tours'
import { fmt, useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Destinations() {
  const { t, l, ll, to } = useI18n()
  const count = (slug: string) => {
    const n = toursByDestination(slug).length
    return n === 1 ? t.common.tour : fmt(t.common.tours, { n })
  }
  return (
    <>
      <Seo title={t.destinations.title} description={t.destinations.intro} path="/destinations" />
      <PageHero image="/images/tours/hoang-su-phi-ha-giang.webp" imageAlt={l({ en: 'Terraced fields in Ha Giang', zh: '河江梯田' })} title={t.destinations.title} text={t.destinations.intro} crumbs={[{ label: t.nav.destinations }]} />

      {regions.map((r, i) => (
        <section key={r.slug} className={`py-16 md:py-20 ${i % 2 ? 'bg-sand' : ''}`} aria-labelledby={`r-${r.slug}`}>
          <div className="container-x">
            <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal>
                <Img src={r.hero} alt={l(r.name)} className="aspect-[16/10] w-full rounded-2xl object-cover" />
              </Reveal>
              <Reveal delay={80}>
                <p className="eyebrow mb-3">{count(r.slug)}</p>
                <h2 id={`r-${r.slug}`} className="h-section">
                  {l(r.name)}
                </h2>
                <p className="mt-2 text-lg font-medium text-brand-700">{l(r.tagline)}</p>
                <p className="prose-body mt-4">{ll(r.intro)[0]}</p>
                <ButtonLink to={to(`/destinations/${r.slug}`)} variant="secondary" className="mt-7">
                  {fmt(t.destinations.regionLink, { name: l(r.name) })} <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </Reveal>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {citiesOf(r.slug).map((c, j) => (
                <Reveal key={c.slug} delay={j * 60}>
                  <Link to={to(`/destinations/${c.slug}`)} className="group relative block aspect-[4/5] overflow-hidden rounded-xl">
                    <Img src={c.image} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 to-transparent" aria-hidden />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-bold text-white">{l(c.name)}</h3>
                      <p className="text-xs text-white/75">{count(c.slug)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBanner />
    </>
  )
}
