import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock, MapPin } from 'lucide-react'
import type { Tour } from '@/data/types'
import { fmt, useDuration, useI18n } from '@/i18n'
import Img from '../ui/Img'

/** USD price with the original price struck through when discounted; "Price on request" when unpriced. */
export function PriceLabel({ tour, className = '', large }: { tour: Tour; className?: string; large?: boolean }) {
  const { t } = useI18n()
  if (tour.priceFrom == null) return <span className={`font-semibold text-ink ${className}`}>{t.common.priceOnRequest}</span>
  const discounted = tour.priceOriginal != null && tour.priceOriginal > tour.priceFrom
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-xs text-muted">{t.common.from}</span>
        {discounted && (
          <del className="text-sm text-muted" aria-label={`USD ${tour.priceOriginal!.toLocaleString('en-US')}`}>
            USD {tour.priceOriginal!.toLocaleString('en-US')}
          </del>
        )}
        <span className={`font-bold text-accent-600 ${large ? 'text-2xl' : 'text-lg'}`}>USD {tour.priceFrom.toLocaleString('en-US')}</span>
        <span className="text-xs text-muted">/ {t.common.perPerson}</span>
      </span>
    </span>
  )
}

/** Discount badge shown on the image when a promotional price applies. */
function SaveBadge({ tour }: { tour: Tour }) {
  const { t } = useI18n()
  if (tour.priceFrom == null || tour.priceOriginal == null || tour.priceOriginal <= tour.priceFrom) return null
  const pct = Math.round((1 - tour.priceFrom / tour.priceOriginal) * 100)
  return <span className="absolute bottom-3 left-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-white shadow">{fmt(t.tour.save, { n: pct })}</span>
}

/** Standard tour card: 3:2 image, duration chip, route, short description, price and CTA. */
export default function TourCard({ tour, priority, showBook }: { tour: Tour; priority?: boolean; showBook?: boolean }) {
  const { t, l, ll, to } = useI18n()
  const duration = useDuration()
  const href = to(`/tours/${tour.slug}`)
  return (
    <article className="card group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={href} className="relative block aspect-[3/2] overflow-hidden" tabIndex={-1} aria-hidden>
        <Img src={tour.image} alt="" priority={priority} className="size-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-800 shadow-sm">
          <Clock className="size-3.5" aria-hidden /> {duration(tour.days, tour.nights)}
        </span>
        <SaveBadge tour={tour} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold tracking-wide text-accent-500 uppercase">{t.tourType[tour.type]}</p>
        <h3 className="text-lg leading-snug font-bold">
          <Link to={href} className="hover:text-brand-700">
            {l(tour.title)}
          </Link>
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
          <span>{l(tour.route)}</span>
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/80">{l(tour.summary)}</p>
        <ul className="mt-3 mb-4 space-y-1.5 text-sm text-ink/85">
          {ll(tour.highlights)
            .slice(0, 2)
            .map((h) => (
              <li key={h} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                {h}
              </li>
            ))}
        </ul>
        <div className="mt-auto border-t border-line pt-4">
          <div className="flex items-end justify-between gap-3">
            <PriceLabel tour={tour} />
            {!showBook && (
              <Link to={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand-700 hover:text-accent-600">
                {t.common.viewTour} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            )}
          </div>
          {showBook && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to={href} className="inline-flex items-center justify-center rounded-full border border-brand-600 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                {t.common.viewTour}
              </Link>
              <Link to={to(`/booking/${tour.slug}`)} className="inline-flex items-center justify-center rounded-full bg-accent-500 px-3 py-2 text-sm font-semibold text-white hover:bg-accent-600">
                {t.common.bookNow}
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

/** Horizontal card for featured long journeys (Lily's-style "best packages" block). */
export function TourCardWide({ tour }: { tour: Tour }) {
  const { t, l, ll, to } = useI18n()
  const duration = useDuration()
  const href = to(`/tours/${tour.slug}`)
  return (
    <article className="card group grid overflow-hidden transition duration-300 hover:shadow-xl md:grid-cols-[1.15fr_1fr]">
      <Link to={href} className="relative block aspect-[3/2] overflow-hidden md:aspect-auto md:min-h-full" tabIndex={-1} aria-hidden>
        <Img src={tour.image} alt="" className="size-full object-cover transition duration-700 group-hover:scale-105" />
        {tour.priceOriginal != null && tour.priceFrom != null && tour.priceOriginal > tour.priceFrom && (
          <span className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-accent-600 shadow">
            {fmt(t.tour.save, { n: Math.round((1 - tour.priceFrom / tour.priceOriginal) * 100) })}
          </span>
        )}
        <span className="absolute bottom-4 left-4 rounded-lg bg-accent-500 px-3 py-2 text-center leading-none font-bold text-white shadow">
          <span className="block text-2xl">{tour.days}</span>
          <span className="text-[0.7rem] tracking-wider uppercase">{tour.days === 1 ? t.common.day.replace('1', '').trim() : t.common.days.replace('{n}', '').trim()}</span>
        </span>
      </Link>
      <div className="flex flex-col p-6 lg:p-8">
        <p className="text-xs font-semibold tracking-wide text-accent-500 uppercase">
          {duration(tour.days, tour.nights)} · {t.tourType[tour.type]}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-snug font-semibold">
          <Link to={href} className="hover:text-brand-700">
            {l(tour.title)}
          </Link>
        </h3>
        <p className="mt-3 flex items-start gap-1.5 text-sm text-muted">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
          {l(tour.route)}
        </p>
        <ul className="mt-4 grid gap-1.5 text-sm text-ink/85">
          {ll(tour.highlights)
            .slice(0, 4)
            .map((h) => (
              <li key={h} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                {h}
              </li>
            ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <PriceLabel tour={tour} large />
          <div className="flex flex-wrap gap-2">
            <Link to={href} className="inline-flex items-center gap-1.5 rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              {t.common.viewTour}
            </Link>
            <Link to={to(`/booking/${tour.slug}`)} className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600">
              {t.common.bookNow} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
