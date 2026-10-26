import { useMemo, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BedDouble, CalendarRange, Check, Clock, Flag, Hotel, MapPin, Phone, Utensils, X, Baby, FileText, CalendarCheck, Star } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { getTour, tours } from '@/data/tours'
import { getTheme } from '@/data/themes'
import { getDestination } from '@/data/destinations'
import { site, SITE_URL } from '@/data/site'
import type { Tour } from '@/data/types'
import { fmt, useDuration, useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Img from '@/components/ui/Img'
import Accordion from '@/components/ui/Accordion'
import { ButtonLink, buttonClass } from '@/components/ui/Button'
import WeChatButton from '@/components/layout/WeChatButton'
import { formatDate } from '@/components/guide/PostCard'
import Gallery from '@/components/tour/Gallery'
import TourCard, { PriceLabel } from '@/components/tour/TourCard'
import YouTubeEmbed from '@/components/tour/YouTubeEmbed'
import NotFound from './NotFound'

function related(tour: Tour) {
  return tours
    .filter((x) => x.slug !== tour.slug)
    .map((x) => ({ x, score: x.themes.filter((th) => tour.themes.includes(th)).length * 2 + x.regions.filter((r) => tour.regions.includes(r)).length }))
    .sort((a, b) => b.score - a.score || a.x.order - b.x.order)
    .slice(0, 3)
    .map((r) => r.x)
}

function BookingPanel({ tour }: { tour: Tour }) {
  const { t, l, to } = useI18n()
  const consult = `${site.whatsappHref}?text=${encodeURIComponent(fmt(t.tour.whatsappMsg, { name: l(tour.title) }))}`
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_10px_40px_rgba(15,40,70,0.08)]">
      <p className="text-xs font-bold tracking-wide text-muted uppercase">{t.tour.priceTitle}</p>
      <PriceLabel tour={tour} large className="mt-1" />
      <p className="mt-3 text-sm leading-relaxed text-muted">{t.tour.priceText}</p>
      <div className="mt-5 grid gap-3">
        <ButtonLink to={to(`/booking/${tour.slug}`)} size="lg" className="w-full">
          {t.tour.book}
        </ButtonLink>
        <ButtonLink href={consult} variant="whatsapp" size="lg" className="w-full">
          <WhatsAppIcon className="size-5" aria-hidden /> {t.common.quickConsult}
        </ButtonLink>
        <ButtonLink to={`${to('/tailor-made-tour')}?tour=${tour.slug}`} variant="outline" size="lg" className="w-full">
          {t.tour.customise}
        </ButtonLink>
      </div>
      <div className="mt-6 border-t border-line pt-5">
        <p className="text-sm font-semibold">{t.tour.help}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <WeChatButton className={buttonClass('ghost', 'sm', 'border border-line')} />
          <ButtonLink href={site.phoneHref} variant="ghost" size="sm" className="border border-line">
            <Phone className="size-4" aria-hidden /> {t.common.call}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default function TourDetail() {
  const { slug = '' } = useParams()
  const tour = getTour(slug)
  const { t, l, ll, to, lang } = useI18n()
  const duration = useDuration()
  const [open, setOpen] = useState<Set<string>>(() => new Set(['0']))
  const [faqOpen, setFaqOpen] = useState<Set<string>>(() => new Set(['faq-0']))
  const rel = useMemo(() => (tour ? related(tour) : []), [tour])

  if (!tour) return <NotFound />

  const allKeys = tour.itinerary.map((_, i) => String(i))
  const allOpen = open.size === allKeys.length
  const toggle = (k: string) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })

  const facts = [
    { icon: Clock, label: t.common.duration, value: duration(tour.days, tour.nights) },
    { icon: Flag, label: t.common.startEnd, value: `${l(tour.start)} → ${l(tour.end)}` },
    { icon: MapPin, label: t.common.route, value: l(tour.route) },
    { icon: CalendarRange, label: t.common.type, value: t.tourType[tour.type] },
    { icon: Hotel, label: t.common.level, value: t.tourLevel[tour.level] },
    {
      icon: CalendarCheck,
      label: t.tour.departures,
      value: tour.departures?.length ? tour.departures.map((d) => formatDate(d, lang)).join(' · ') : t.tour.departuresPrivate,
    },
  ]

  // Tour FAQ: tour-specific questions first, then standard ones built from the tour's own data.
  const q = t.tour.faqQ
  const list = (xs: string[]) => (
    <ul className="list-disc space-y-1 pl-5">
      {xs.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  )
  const faqs: { q: string; a: ReactNode; text: string }[] = [
    ...(tour.faqs ?? []).map((x) => ({ q: l(x.q), a: l(x.a), text: l(x.a) })),
    (() => {
      const a = fmt(q.lengthA, { duration: duration(tour.days, tour.nights), start: l(tour.start), end: l(tour.end), route: l(tour.route) })
      return { q: q.length, a, text: a }
    })(),
    { q: q.included, a: list(ll(tour.included)), text: ll(tour.included).join('; ') },
    { q: q.excluded, a: list(ll(tour.excluded)), text: ll(tour.excluded).join('; ') },
    (() => {
      const a = `${t.tourType[tour.type]}. ${tour.departures?.length ? `${t.tour.departures}: ${tour.departures.map((d) => formatDate(d, lang)).join(', ')}.` : t.tour.departuresPrivate}`
      return { q: q.type, a, text: a }
    })(),
    { q: q.custom, a: q.customA, text: q.customA },
    { q: q.book, a: q.bookA, text: q.bookA },
    { q: q.cancel, a: q.cancelA, text: q.cancelA },
  ]
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.text } })),
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: l(tour.title),
    description: l(tour.summary),
    image: `${SITE_URL}${tour.image}`,
    touristType: tour.themes.map((th) => getTheme(th)?.name.en).filter(Boolean),
    provider: { '@type': 'TravelAgency', name: site.name, telephone: site.phone },
    // Offers only for published (non-sample) prices.
    ...(tour.priceFrom != null && !tour.priceIsSample ? { offers: { '@type': 'Offer', price: tour.priceFrom, priceCurrency: 'USD', availability: 'https://schema.org/InStock' } } : {}),
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: l(d.title), description: l(d.text) })),
    },
  }

  return (
    <>
      <Seo title={l(tour.seo.title)} description={l(tour.seo.description)} path={`/tours/${tour.slug}`} image={tour.image} jsonLd={[jsonLd, faqLd]} />

      {/* Header band: the tour's cover photo as a softened background under a light wash, so the dark text stays readable. */}
      <div className="relative isolate overflow-hidden">
        <Img src={tour.image} alt="" priority className="absolute inset-0 -z-20 size-full scale-110 object-cover blur-[3px]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/75 to-white/55" aria-hidden />
      <div className="container-x pt-8 pb-8">
        <Breadcrumb items={[{ label: t.nav.tours, to: '/tours' }, { label: l(tour.title) }]} />
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {tour.themes.map((th) => (
                <Link key={th} to={to(`/tour-themes/${th}`)} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                  {l(getTheme(th)?.name ?? { en: th, zh: th })}
                </Link>
              ))}
            </div>
            <h1 className="h-display mt-3">{l(tour.title)}</h1>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted">
            <li className="flex items-center gap-1.5">
              <Clock className="size-4 text-brand-500" aria-hidden /> {duration(tour.days, tour.nights)}
            </li>
            <li className="flex items-center gap-1.5">
              <Flag className="size-4 text-brand-500" aria-hidden /> {l(tour.start)} → {l(tour.end)}
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <Gallery images={tour.gallery} title={l(tour.title)} />
        </div>
      </div>
      </div>

      <div className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_360px] lg:gap-14">
        <div className="min-w-0 space-y-14">
          <section id="overview" aria-labelledby="h-overview">
            <h2 id="h-overview" className="h-section text-2xl! sm:text-3xl!">
              {t.tour.overview}
            </h2>
            <p className="prose-body mt-4">{l(tour.summary)}</p>
            <dl className="mt-6 grid gap-4 rounded-2xl bg-mist p-6 sm:grid-cols-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold tracking-wide text-muted uppercase">{label}</dt>
                    <dd className="mt-0.5 font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {tour.destinations.map((d) => {
                const dest = getDestination(d)
                return dest ? (
                  <Link key={d} to={to(`/destinations/${d}`)} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700 transition hover:bg-brand-600 hover:text-white">
                    <MapPin className="size-3.5" aria-hidden /> {l(dest.name)}
                  </Link>
                ) : null
              })}
            </div>
            <div className="mt-8 lg:hidden">
              <BookingPanel tour={tour} />
            </div>
          </section>

          <section id="highlights" aria-labelledby="h-highlights">
            <h2 id="h-highlights" className="h-section text-2xl! sm:text-3xl!">
              {t.tour.highlights}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ll(tour.highlights).map((h) => (
                <li key={h} className="flex gap-3 rounded-xl border border-line p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
                  <span className="font-medium">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {tour.video && (
            <section aria-labelledby="h-video">
              <h2 id="h-video" className="h-section text-2xl! sm:text-3xl!">
                {t.tour.video}
              </h2>
              <YouTubeEmbed id={tour.video} title={l(tour.title)} />
            </section>
          )}

          <section id="itinerary" aria-labelledby="h-itinerary">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="h-itinerary" className="h-section text-2xl! sm:text-3xl!">
                {t.tour.itinerary}
              </h2>
              <button type="button" onClick={() => setOpen(allOpen ? new Set() : new Set(allKeys))} className="text-sm font-bold text-brand-700 hover:underline">
                {allOpen ? t.tour.collapseAll : t.tour.expandAll}
              </button>
            </div>
            <div className="mt-6">
              <Accordion
                open={open}
                onToggle={toggle}
                items={tour.itinerary.map((d, i) => ({
                  key: String(i),
                  title: (
                    <span className="flex items-center gap-4">
                      <span className="inline-flex h-10 min-w-16 items-center justify-center rounded-lg bg-brand-600 px-2 text-sm font-bold text-white">{fmt(t.tour.day, { n: i + 1 })}</span>
                      <span>{l(d.title)}</span>
                    </span>
                  ),
                  content: (
                    <div className="border-l-2 border-brand-100 pl-5 md:ml-8">
                      <p className="leading-relaxed text-muted">{l(d.text)}</p>
                      {(d.meals || d.stay) && (
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          {d.meals && (
                            <span className="inline-flex items-center gap-1.5">
                              <Utensils className="size-4 text-brand-500" aria-hidden />
                              <strong>{t.tour.meals}:</strong> {d.meals}
                            </span>
                          )}
                          {d.stay && (
                            <span className="inline-flex items-center gap-1.5">
                              <BedDouble className="size-4 text-brand-500" aria-hidden />
                              <strong>{t.tour.stay}:</strong> {l(d.stay)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ),
                }))}
              />
              <p className="mt-3 text-xs text-muted">{t.tour.mealsLegend}</p>
            </div>
          </section>

          <section id="included" aria-labelledby="h-included" className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
              <h2 id="h-included" className="text-xl font-bold">
                {t.tour.included}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {ll(tour.included).map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent-100 bg-accent-50/50 p-6">
              <h2 className="text-xl font-bold">{t.tour.excluded}</h2>
              <ul className="mt-4 space-y-2.5">
                {ll(tour.excluded).map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <X className="mt-0.5 size-5 shrink-0 text-accent-500" aria-hidden /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="info" aria-labelledby="h-info">
            <h2 id="h-info" className="h-section text-2xl! sm:text-3xl!">
              {t.tour.info}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Baby, ...t.tour.infoItems.children },
                { icon: FileText, ...t.tour.infoItems.conditions },
                { icon: CalendarCheck, ...t.tour.infoItems.departures },
              ].map(({ icon: Icon, t: title, d }) => (
                <div key={title} className="rounded-xl bg-mist p-5">
                  <Icon className="size-6 text-brand-600" aria-hidden />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="faq" aria-labelledby="h-faq">
            <h2 id="h-faq" className="h-section text-2xl! sm:text-3xl!">
              {t.tour.faqTitle}
            </h2>
            <div className="mt-6">
              <Accordion
                items={faqs.map((x, i) => ({ key: `faq-${i}`, title: x.q, content: <div className="leading-relaxed text-muted">{x.a}</div> }))}
                open={faqOpen}
                onToggle={(k) =>
                  setFaqOpen((cur) => {
                    const n = new Set(cur)
                    if (n.has(k)) n.delete(k)
                    else n.add(k)
                    return n
                  })
                }
              />
            </div>
          </section>

          <section id="reviews" aria-labelledby="h-reviews">
            <h2 id="h-reviews" className="h-section text-2xl! sm:text-3xl!">
              {t.tour.reviewsTitle}
            </h2>
            {tour.reviews?.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tour.reviews.map((r, i) => (
                  <figure key={i} className="rounded-xl border border-line bg-white p-5">
                    {r.rating && (
                      <p className="flex gap-0.5 text-sun" aria-label={`${r.rating}/5`}>
                        {Array.from({ length: 5 }, (_, n) => (
                          <Star key={n} className={`size-4 ${n < r.rating! ? 'fill-current' : 'text-amber-200'}`} aria-hidden />
                        ))}
                      </p>
                    )}
                    <blockquote className="mt-3 leading-relaxed text-muted" lang={r.lang}>
                      {l(r.text)}
                    </blockquote>
                    <figcaption className="mt-3 text-sm font-semibold">
                      {r.author}
                      {r.country && <span className="font-normal text-muted"> · {r.country}</span>}
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs font-normal text-brand-700 underline">
                          {r.source === 'tripadvisor' ? 'TripAdvisor' : 'Google'}
                        </a>
                      ) : (
                        <span className="ml-2 text-xs font-normal text-muted">{r.source === 'tripadvisor' ? 'TripAdvisor' : 'Google'}</span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-4 rounded-xl bg-mist p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted">{t.tour.reviewsNone}</p>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <ButtonLink href={site.googleReviewsUrl} variant="outline" size="sm">
                    <Star className="size-4 fill-sun text-sun" aria-hidden /> {t.tour.reviewsGoogle}
                  </ButtonLink>
                  {site.tripadvisorUrl && (
                    <ButtonLink href={site.tripadvisorUrl} variant="outline" size="sm">
                      {t.tour.reviewsTripadvisor}
                    </ButtonLink>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-[180px]">
            <BookingPanel tour={tour} />
          </div>
        </aside>
      </div>

      {/* Fixed booking bar below lg, where the sticky side panel is hidden; sits above the mobile contact bar. */}
      <div className="h-20 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-14 z-20 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-6px_20px_rgba(15,40,70,0.1)] backdrop-blur md:right-24 md:bottom-4 md:left-4 md:rounded-2xl md:border lg:hidden print:hidden">
        <div className="flex items-center justify-between gap-3">
          <PriceLabel tour={tour} />
          <ButtonLink to={to(`/booking/${tour.slug}`)} className="shrink-0">
            {t.tour.stickyBook}
          </ButtonLink>
        </div>
      </div>

      {rel.length > 0 && (
        <section className="bg-sand py-16 md:py-20">
          <div className="container-x">
            <h2 className="h-section mb-8">{t.tour.related}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {rel.map((x) => (
                <TourCard key={x.slug} tour={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
