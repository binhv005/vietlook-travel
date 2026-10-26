import { Link, useLocation } from 'react-router-dom'
import { Ship } from 'lucide-react'
import { tours } from '@/data/tours'
import { regions } from '@/data/destinations'
import { useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageIntro from '@/components/sections/PageIntro'
import TourExplorer from '@/components/tour/TourExplorer'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Tours() {
  const { t, l, to } = useI18n()
  const { search } = useLocation()
  // Package groupings from the brief: by region, 1/2/3-week tours, Ha Long Bay cruises.
  const quick = [
    { label: t.tours.quickCruise, qs: 'type=cruise&dest=halong-bay', icon: true },
    { label: t.tours.quickWeek1, qs: 'duration=5-8' },
    { label: t.tours.quickWeek2, qs: 'duration=9-14' },
    { label: t.tours.quickWeek3, qs: 'duration=15%2B' },
    { label: t.tours.quickDay, qs: 'duration=1' },
    ...regions.map((r) => ({ label: l(r.name), qs: `region=${r.slug}` })),
  ]
  const current = new URLSearchParams(search).toString()
  return (
    <>
      <Seo title={t.tours.title} description={t.tours.intro} path="/tours" />
      <PageIntro crumbs={[{ label: t.nav.tours }]} title={t.tours.title} intro={t.tours.intro} image="/images/tours/ha-long.webp">
        <nav aria-label={t.tours.quick} className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-white/80">{t.tours.quick}:</span>
          {quick.map((c) => {
            const active = current === new URLSearchParams(decodeURIComponent(c.qs)).toString()
            return (
              <Link
                key={c.qs}
                to={`${to('/tours')}?${c.qs}`}
                preventScrollReset
                aria-current={active ? 'true' : undefined}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  active ? 'border-brand-600 bg-brand-600 text-white' : 'border-white bg-white text-ink hover:border-brand-400 hover:text-brand-700'
                }`}
              >
                {c.icon && <Ship className="size-4" aria-hidden />}
                {c.label}
              </Link>
            )
          })}
        </nav>
      </PageIntro>
      <section className="container-x py-10 md:py-14">
        <TourExplorer scope={tours} />
      </section>
      <CtaBanner />
    </>
  )
}
