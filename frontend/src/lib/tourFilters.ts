import type { Lang, Tour, TourType } from '@/data/types'

export const DURATION_BUCKETS = ['1', '2-4', '5-8', '9-14', '15+'] as const
export type DurationBucket = (typeof DURATION_BUCKETS)[number]
export const PRICE_BUCKETS = ['under-500', '500-1000', '1000-2000', '2000+'] as const
export type PriceBucket = (typeof PRICE_BUCKETS)[number]
export const TOUR_TYPES: TourType[] = ['private', 'small-group', 'day-trip', 'cruise']
export const SORTS = ['recommended', 'short', 'long', 'priceLow', 'priceHigh', 'name'] as const
export type Sort = (typeof SORTS)[number]

export interface TourFilters {
  q: string
  region: string[]
  dest: string[]
  theme: string[]
  duration: DurationBucket[]
  price: PriceBucket[]
  type: TourType[]
  sort: Sort
  page: number
}

export type ListKey = 'region' | 'dest' | 'theme' | 'duration' | 'price' | 'type'
export const LIST_KEYS: ListKey[] = ['region', 'dest', 'theme', 'duration', 'price', 'type']

export const inBucket = (days: number, b: DurationBucket) => {
  if (b === '1') return days === 1
  if (b === '15+') return days >= 15
  const [min, max] = b.split('-').map(Number)
  return days >= min && days <= max
}

/** Tours without a price ("on request") never match a price range. */
export const inPriceBucket = (price: number | null, b: PriceBucket) => {
  if (price == null) return false
  if (b === 'under-500') return price < 500
  if (b === '2000+') return price >= 2000
  const [min, max] = b.split('-').map(Number)
  return price >= min && price < max
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
const oneOf = <T extends string>(values: readonly T[]) => (v: string): v is T => (values as readonly string[]).includes(v)

export function parseFilters(sp: URLSearchParams): TourFilters {
  const list = (k: string) => sp.getAll(k).flatMap((v) => v.split(',')).filter(Boolean)
  const sort = sp.get('sort') ?? ''
  return {
    q: sp.get('q') ?? '',
    region: list('region'),
    dest: list('dest'),
    theme: list('theme'),
    duration: list('duration').filter(oneOf(DURATION_BUCKETS)),
    price: list('price').filter(oneOf(PRICE_BUCKETS)),
    type: list('type').filter(oneOf(TOUR_TYPES)),
    sort: oneOf(SORTS)(sort) ? sort : 'recommended',
    page: Math.max(1, Number(sp.get('page')) || 1),
  }
}

export function toSearchParams(f: Partial<TourFilters>): URLSearchParams {
  const sp = new URLSearchParams()
  if (f.q) sp.set('q', f.q)
  for (const k of LIST_KEYS) {
    const v = f[k]
    if (v?.length) sp.set(k, v.join(','))
  }
  if (f.sort && f.sort !== 'recommended') sp.set('sort', f.sort)
  if (f.page && f.page > 1) sp.set('page', String(f.page))
  return sp
}

/**
 * Applies every filter. Within one group options are OR-ed (e.g. two themes),
 * across groups they are AND-ed. Search matches titles and summaries in both
 * languages and the route.
 */
export function filterTours(tours: Tour[], f: TourFilters, lang: Lang): Tour[] {
  const q = norm(f.q.trim())
  const res = tours.filter((t) => {
    if (q && ![t.title.en, t.title.zh, t.summary[lang], t.route[lang], t.route.en].some((s) => norm(s).includes(q))) return false
    if (f.region.length && !f.region.some((r) => (t.regions as string[]).includes(r))) return false
    if (f.dest.length && !f.dest.some((d) => t.destinations.includes(d))) return false
    if (f.theme.length && !f.theme.some((th) => t.themes.includes(th))) return false
    if (f.duration.length && !f.duration.some((b) => inBucket(t.days, b))) return false
    if (f.price.length && !f.price.some((b) => inPriceBucket(t.priceFrom, b))) return false
    if (f.type.length && !f.type.includes(t.type)) return false
    return true
  })
  // Unpriced tours sort after priced ones in both price orders.
  const price = (t: Tour, dir: 1 | -1) => (t.priceFrom == null ? Infinity : t.priceFrom * dir)
  const sorters: Record<Sort, (a: Tour, b: Tour) => number> = {
    recommended: (a, b) => a.order - b.order,
    short: (a, b) => a.days - b.days || a.order - b.order,
    long: (a, b) => b.days - a.days || a.order - b.order,
    priceLow: (a, b) => price(a, 1) - price(b, 1) || a.order - b.order,
    priceHigh: (a, b) => price(a, -1) - price(b, -1) || a.order - b.order,
    name: (a, b) => a.title[lang].localeCompare(b.title[lang], lang === 'zh' ? 'zh-Hans' : 'en'),
  }
  return res.sort(sorters[f.sort])
}

export const activeFilterCount = (f: TourFilters) => LIST_KEYS.reduce((n, k) => n + f[k].length, 0) + (f.q ? 1 : 0)
