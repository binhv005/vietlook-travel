import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { themes } from '@/data/themes'
import { toursByTheme } from '@/data/tours'
import { fmt, useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import CtaBanner from '@/components/sections/CtaBanner'

/** Theme index (Aurora "tour styles"): alternating image/text rows rather than identical cards. */
export default function Themes() {
  const { t, l, ll, to } = useI18n()
  return (
    <>
      <Seo title={t.themes.title} description={t.themes.intro} path="/tour-themes" />
      <PageHero image="/images/hero/ninh-binh.webp" imageAlt={l({ en: 'Limestone hills and wetlands of Ninh Binh', zh: '宁平的喀斯特山峦与湿地' })} title={t.themes.title} text={t.themes.intro} crumbs={[{ label: t.nav.themes }]} />

      <nav aria-label={t.themes.title} className="border-b border-line bg-white">
        <ul className="container-x flex gap-2 overflow-x-auto py-4">
          {themes.map((th) => (
            <li key={th.slug}>
              <a href={`#${th.slug}`} className="block rounded-full border border-line px-4 py-2 text-sm font-semibold whitespace-nowrap hover:border-brand-400 hover:text-brand-700">
                {l(th.name)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x space-y-20 py-16 md:space-y-28 md:py-24">
        {themes.map((th, i) => {
          const n = toursByTheme(th.slug).length
          return (
            <section key={th.slug} id={th.slug} className="grid items-center gap-10 md:grid-cols-2 lg:gap-16" aria-labelledby={`th-${th.slug}`}>
              <Reveal className={i % 2 ? 'md:order-2' : ''}>
                <Link to={to(`/tour-themes/${th.slug}`)} className="group relative block overflow-hidden rounded-2xl">
                  <Img src={th.image} alt={l(th.name)} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-800">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </Reveal>
              <Reveal delay={80}>
                <p className="eyebrow mb-3">{n === 1 ? t.common.tour : fmt(t.common.tours, { n })}</p>
                <h2 id={`th-${th.slug}`} className="h-section">
                  {l(th.name)}
                </h2>
                <p className="mt-2 text-lg font-medium text-brand-700">{l(th.short)}</p>
                <p className="prose-body mt-4">{ll(th.intro)[0]}</p>
                <Link to={to(`/tour-themes/${th.slug}`)} className="mt-6 inline-flex items-center gap-2 font-bold text-accent-600 hover:underline">
                  {fmt(t.themes.browse, { name: l(th.name) })} <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Reveal>
            </section>
          )
        })}
      </div>
      <CtaBanner />
    </>
  )
}
