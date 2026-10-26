import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, SearchX } from 'lucide-react'
import type { Tour } from '@/data/types'
import { getDestination } from '@/data/destinations'
import { getTheme } from '@/data/themes'
import {
  activeFilterCount,
  DURATION_BUCKETS,
  filterTours,
  inBucket,
  inPriceBucket,
  LIST_KEYS,
  parseFilters,
  PRICE_BUCKETS,
  SORTS,
  TOUR_TYPES,
  toSearchParams,
  type DurationBucket,
  type ListKey,
  type PriceBucket,
  type Sort,
  type TourFilters,
} from '@/lib/tourFilters'
import { fmt, useI18n } from '@/i18n'
import FilterPanel from './FilterPanel'
import TourCard from './TourCard'
import Pagination from '../ui/Pagination'
import { ButtonLink } from '../ui/Button'

const PAGE_SIZE = 9

interface Props {
  /** Tours in scope (all tours, or those of one theme/destination). */
  scope: Tour[]
  hide?: ListKey[]
}

/** Search + faceted filters + sort + pagination, synced with the URL query string. */
export default function TourExplorer({ scope, hide = [] }: Props) {
  const { t, l, lang, to } = useI18n()
  const [sp, setSp] = useSearchParams()
  const filters = useMemo(() => parseFilters(sp), [sp])
  const [drawer, setDrawer] = useState(false)
  const [query, setQuery] = useState(filters.q)
  const topRef = useRef<HTMLDivElement>(null)

  const update = (next: Partial<TourFilters>, resetPage = true) => setSp(toSearchParams({ ...filters, ...next, ...(resetPage ? { page: 1 } : {}) }), { replace: true, preventScrollReset: true })

  // URL → search input when the query changes from outside (quick links, back button).
  useEffect(() => {
    setQuery(filters.q)
  }, [filters.q])

  // Debounced search input → URL.
  useEffect(() => {
    if (query === filters.q) return
    const id = window.setTimeout(() => update({ q: query }), 250)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const toggle = (key: ListKey, value: string) => {
    const cur = filters[key] as string[]
    update({ [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] } as Partial<TourFilters>)
  }

  const results = useMemo(() => filterTours(scope, filters, lang), [scope, filters, lang])

  const counts = useMemo(() => {
    const count = (key: ListKey, values: readonly string[], match: (tour: Tour, v: string) => boolean) => {
      const base = filterTours(scope, { ...filters, [key]: [] }, lang)
      return Object.fromEntries(values.map((v) => [v, base.filter((tour) => match(tour, v)).length]))
    }
    const regionSlugs = ['northern-vietnam', 'central-vietnam', 'southern-vietnam']
    const destSlugs = [...new Set(scope.flatMap((x) => x.destinations))]
    const themeSlugs = [...new Set(scope.flatMap((x) => x.themes))]
    return {
      region: count('region', regionSlugs, (x, v) => (x.regions as string[]).includes(v)),
      dest: count('dest', destSlugs, (x, v) => x.destinations.includes(v)),
      theme: count('theme', themeSlugs, (x, v) => x.themes.includes(v)),
      duration: count('duration', DURATION_BUCKETS, (x, v) => inBucket(x.days, v as DurationBucket)),
      price: count('price', PRICE_BUCKETS, (x, v) => inPriceBucket(x.priceFrom, v as PriceBucket)),
      type: count('type', TOUR_TYPES, (x, v) => x.type === v),
    }
  }, [scope, filters, lang])

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const page = Math.min(filters.page, pages)
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const active = activeFilterCount(filters)

  const chipLabel = (key: ListKey, v: string) => {
    if (key === 'region' || key === 'dest') return l(getDestination(v)?.name ?? { en: v, zh: v })
    if (key === 'theme') return l(getTheme(v)?.name ?? { en: v, zh: v })
    if (key === 'duration') return t.tours.durations[v as keyof typeof t.tours.durations]
    if (key === 'price') return t.tours.priceBuckets[v as PriceBucket]
    return t.tourType[v as keyof typeof t.tourType]
  }

  const clearAll = () => {
    setQuery('')
    setSp(new URLSearchParams(), { replace: true, preventScrollReset: true })
  }

  const panel = <FilterPanel filters={filters} onToggle={toggle} hide={hide} counts={counts} />

  return (
    <div ref={topRef} className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block" aria-label={t.tours.filters}>
        <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-line bg-white p-5">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold">
              <SlidersHorizontal className="size-4" aria-hidden /> {t.tours.filters}
            </h2>
            {active > 0 && (
              <button type="button" onClick={clearAll} className="text-sm font-semibold text-accent-600 hover:underline">
                {t.tours.clear}
              </button>
            )}
          </div>
          {panel}
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">{t.tours.search}</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.tours.search} className="field-input pl-10" />
          </label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setDrawer(true)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold lg:hidden">
              <SlidersHorizontal className="size-4" aria-hidden /> {t.tours.showFilters}
              {active > 0 && <span className="rounded-full bg-brand-600 px-2 text-xs text-white">{active}</span>}
            </button>
            <label className="flex flex-1 items-center gap-2 sm:flex-none">
              <span className="sr-only text-sm whitespace-nowrap text-muted sm:not-sr-only">{t.tours.sort}</span>
              <select value={filters.sort} onChange={(e) => update({ sort: e.target.value as Sort })} className="field-input min-w-0 py-2">
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {
                      {
                        recommended: t.tours.sortRecommended,
                        short: t.tours.sortShort,
                        long: t.tours.sortLong,
                        priceLow: t.tours.sortPriceLow,
                        priceHigh: t.tours.sortPriceHigh,
                        name: t.tours.sortName,
                      }[s]
                    }
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
          <p className="mr-2 text-sm font-semibold text-ink">{results.length === 1 ? t.tours.result : fmt(t.tours.results, { n: results.length })}</p>
          {LIST_KEYS.flatMap((k) =>
            (filters[k] as string[]).map((v) => (
              <button key={`${k}-${v}`} type="button" onClick={() => toggle(k, v)} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                {chipLabel(k, v)} <X className="size-3" aria-hidden />
              </button>
            )),
          )}
        </div>

        {visible.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-line bg-mist px-6 py-16 text-center">
            <SearchX className="size-10 text-brand-400" aria-hidden />
            <h3 className="mt-4 text-xl font-bold">{t.tours.emptyTitle}</h3>
            <p className="mt-2 max-w-md text-muted">{t.tours.emptyText}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={clearAll} className="rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                {t.tours.clear}
              </button>
              <ButtonLink to={to('/tailor-made-tour')}>{t.nav.tailorMade}</ButtonLink>
            </div>
          </div>
        )}

        <Pagination
          page={page}
          pages={pages}
          onChange={(p) => {
            update({ page: p }, false)
            topRef.current?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.tours.filters}>
          <div className="absolute inset-0 bg-brand-950/50" onClick={() => setDrawer(false)} aria-hidden />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] animate-fade-up flex-col rounded-t-2xl bg-white">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-bold">{t.tours.filters}</h2>
              <button type="button" onClick={() => setDrawer(false)} aria-label={t.common.close} className="inline-flex size-10 items-center justify-center rounded-full border border-line">
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">{panel}</div>
            <div className="flex gap-3 border-t border-line p-4">
              <button type="button" onClick={clearAll} className="flex-1 rounded-full border border-line px-4 py-3 text-sm font-semibold">
                {t.tours.clear}
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="flex-[2] rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white">
                {fmt(t.tours.applyFilters, { n: results.length })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
