import type { Review } from './home'
export type Lang = 'en' | 'zh'
export const LANGS: Lang[] = ['en', 'zh']

/** A string with one value per locale. */
export type L = Record<Lang, string>
/** A list of strings with one list per locale. */
export type LList = Record<Lang, string[]>

export type RegionSlug = 'northern-vietnam' | 'central-vietnam' | 'southern-vietnam'

export interface Seo {
  title: L
  description: L
}

export interface Highlight {
  name: L
  text: L
  image: string
}

export interface Destination {
  slug: string
  kind: 'region' | 'city'
  /** Parent region for a city; undefined for a region. */
  region?: RegionSlug
  name: L
  tagline: L
  intro: LList
  hero: string
  image: string
  highlights: Highlight[]
  /** General seasonal guidance. Shown with a "confirm for your dates" note. */
  bestTime?: L
  seo: Seo
}

export interface TourTheme {
  slug: string
  name: L
  short: L
  intro: LList
  image: string
  seo: Seo
}

export type TourType = 'private' | 'small-group' | 'day-trip' | 'cruise'
export type TourLevel = 'standard' | 'superior' | 'luxury'

export interface ItineraryDay {
  title: L
  text: L
  /** Meal codes as agreed in the programme: B = breakfast, L = lunch, D = dinner. */
  meals?: string
  stay?: L
}

export interface Tour {
  slug: string
  title: L
  summary: L
  days: number
  nights: number
  start: L
  end: L
  regions: RegionSlug[]
  destinations: string[]
  themes: string[]
  type: TourType
  level: TourLevel
  image: string
  gallery: string[]
  route: L
  highlights: LList
  itinerary: ItineraryDay[]
  included: LList
  excluded: LList
  featured?: boolean
  /** Display order in "recommended" sort; lower first. */
  order: number
  /** Price per person in USD. null = not provided by the business yet → "Price on request". */
  priceFrom: number | null
  /** Original price shown struck through when a promotion applies. */
  priceOriginal?: number | null
  /** True while the price is an illustrative value for layout testing, not a published rate. */
  priceIsSample?: boolean
  /** YouTube video id for the detail page embed. */
  video?: string
  /** Fixed departure dates (ISO). Empty/undefined = private tour on dates of the client's choice. */
  departures?: string[]
  /** Tour-specific questions, shown before the standard ones generated from the tour data. */
  faqs?: Faq[]
  /** Verified reviews of this tour, copied from Google / TripAdvisor. Never invented. */
  reviews?: Review[]
  /** Sample record used to demonstrate templates; not a published product. */
  isDemo: boolean
  seo: Seo
}

export interface Vehicle {
  slug: string
  seats: string
  name: L
  /** Representative models, e.g. "Toyota Vios, Hyundai Accent". Exact model confirmed per booking. */
  models?: string
  /** Starting price per trip in VND. null/undefined = quoted on request. */
  priceFromVnd?: number | null
  /** True while the price is illustrative and not yet confirmed by Vietlook. */
  priceIsSample?: boolean
  suitable: L
  uses: LList
  image?: string
  gallery: string[]
}

export interface BlogCategory {
  slug: string
  parent?: string
  name: L
  description: L
}

export interface PostSection {
  heading: L
  body: LList
  image?: string
}

export interface Post {
  slug: string
  category: string
  title: L
  excerpt: L
  /** Further intro paragraphs shown after the excerpt, before the table of contents. */
  intro?: LList
  cover: string
  /** ISO date. Demo values until real articles are imported. */
  published: string
  updated?: string
  destinations: string[]
  themes: string[]
  relatedTours: string[]
  featured?: boolean
  sections: PostSection[]
  isDemo: boolean
}

export interface Faq {
  q: L
  a: L
}
