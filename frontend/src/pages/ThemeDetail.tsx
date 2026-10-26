import { Link, Navigate, useParams } from 'react-router-dom'
import { getTheme, legacyThemes, themes } from '@/data/themes'
import { toursByTheme } from '@/data/tours'
import { fmt, useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import TourExplorer from '@/components/tour/TourExplorer'
import CtaBanner from '@/components/sections/CtaBanner'
import NotFound from './NotFound'

export default function ThemeDetail() {
  const { slug = '' } = useParams()
  const th = getTheme(slug)
  const { t, l, to } = useI18n()
  // Themes merged into the current styles keep working as redirects.
  if (!th && legacyThemes[slug]) return <Navigate to={to(`/tour-themes/${legacyThemes[slug]}`)} replace />
  if (!th) return <NotFound />
  const name = l(th.name)
  const others = themes.filter((x) => x.slug !== th.slug)

  return (
    <>
      <Seo title={l(th.seo.title)} description={l(th.seo.description)} path={`/tour-themes/${th.slug}`} image={th.image} />
      <PageHero image={th.image} imageAlt={name} eyebrow={t.nav.themes} title={name} text={l(th.short)} crumbs={[{ label: t.nav.themes, to: '/tour-themes' }, { label: name }]} />

      <section className="container-x pt-14 pb-16" aria-labelledby="theme-tours">
        <h2 id="theme-tours" className="h-section mb-8">
          {fmt(t.themes.samples, { name })}
        </h2>
        {/* key resets local search state when switching theme */}
        <TourExplorer key={th.slug} scope={toursByTheme(th.slug)} hide={['theme', 'type']} />
      </section>

      <section className="border-t border-line bg-mist py-12">
        <div className="container-x">
          <h2 className="mb-5 text-sm font-bold tracking-[0.14em] text-muted uppercase">{t.nav.allThemes}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {others.map((x) => (
              <Link key={x.slug} to={to(`/tour-themes/${x.slug}`)} className="group relative flex h-28 w-56 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm hover:shadow-md">
                <Img src={x.image} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" aria-hidden />
                <span className="relative px-3 text-center text-base font-semibold text-white drop-shadow">{l(x.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title={fmt(t.themes.cta, { name })} text={t.themes.ctaText} image={th.image} ctaTo={`/tailor-made-tour?theme=${th.slug}`} />
    </>
  )
}
