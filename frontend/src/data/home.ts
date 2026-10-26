import type { L, LList } from './types'

/**
 * Homepage content blocks. Shaped like the future CMS records
 * ("Quản lý banner trang chủ" / "Quản lý các khối nội dung trang chủ"), so the
 * page renders the same once this file is replaced by an API call.
 */
export interface HeroBanner {
  /** Fallback / poster image (also used when the visitor prefers reduced motion or data saving). */
  image: string
  /** Optional background video: compressed H.264 MP4s, muted, looping. Source master kept in /media-source. */
  video?: { desktop: string; mobile: string; poster: string }
  imageAlt: L
  /**
   * Destination cards in the hero (slugs from data/destinations). The card shows `card` and picking it makes `bg`
   * the hero background; both are cut from the same photo (the sharpest relevant original in AnhSanpham /
   * media-source): `bg` is 1920px wide, `card` a 384x560 portrait crop. Files live in /images/hero.
   */
  cards: { slug: string; bg: string; card: string }[]
  eyebrow: L
  title: L
  text: L
  /** Short benefit points shown under the text. */
  benefits: LList
  /** Label before the "from" price; the amount is computed from the tour data (cheapest multi-day tour). */
  priceLabel: L
  /** The single primary call to action. */
  cta: { label: L; path: string }
}

export const heroBanner: HeroBanner = {
  image: '/videos/hero-sunset-poster.webp',
  video: { desktop: '/videos/hero-sunset-736.mp4', mobile: '/videos/hero-sunset-640.mp4', poster: '/videos/hero-sunset-poster.webp' },
  imageAlt: { en: 'Sunset over a mountain peak rising above a sea of clouds', zh: '日落时分，山峰耸立于云海之上' },
  cards: ['halong-bay', 'ninh-binh', 'ha-giang', 'sapa', 'hoi-an', 'hue', 'da-nang', 'phu-quoc'].map((slug) => ({
    slug,
    bg: `/images/hero/${slug}.webp`,
    card: `/images/hero/${slug}-card.webp`,
  })),
  // Product + benefit + "from" price + one CTA (landing-page brief for Ads).
  eyebrow: { en: 'Local tour operator in Hanoi · since 2009', zh: '河内本地地接社 · 始于 2009 年' },
  title: { en: 'Private & Small-Group Vietnam Tours', zh: '越南私人团与小团游' },
  text: {
    en: 'Tailor-made itineraries from Hanoi to the Mekong, with a private car, local guides and hotels chosen for you.',
    zh: '从河内到湄公河的定制行程，配备专车、当地导游，并为您精选酒店。',
  },
  benefits: {
    en: ['Private car & local guide', 'Free quote within 48 hours', 'No online payment'],
    zh: ['专车与当地导游', '48 小时内免费报价', '无需在线付款'],
  },
  priceLabel: { en: 'Tours from', zh: '线路起价' },
  cta: { label: { en: 'Get a free quote', zh: '免费获取报价' }, path: '/tailor-made-tour' },
}

/** Slugs of the long tours featured on the homepage (first one is shown large). */
export const featuredTourSlugs = ['vietnam-classic-14-days', 'vietnam-grand-journey-21-days', 'halong-ninh-binh-danang-hoi-an-10-days', 'northern-vietnam-highlights-7-days']

export interface Review {
  author: string
  country?: string
  text: L
  source: 'google' | 'tripadvisor'
  /** Star rating (1–5) exactly as given on the source listing. */
  rating?: number
  /** BCP 47 code of the language the review was written in, when it is shown untranslated. */
  lang?: string
  url?: string
  /** Guest photo from the trip, shown at the top of the card. */
  image?: string
  /** Review headline as written by the guest on the source listing. */
  title?: L
}

/**
 * Guest reviews. Intentionally empty: only real reviews copied from Vietlook's
 * Google / TripAdvisor listings may be added here (or imported via the CMS).
 */
export const reviews: Review[] = []

const same = (s: string): L => ({ en: s, zh: s })

/**
 * Layout preview only: rendered in `npm run dev` while `reviews` is empty and
 * never shipped in a production build. Not real guest reviews.
 */
export const sampleReviews: Review[] = [
  { author: 'Emily Carter', rating: 5, image: '/images/tours/hoang-su-phi-ha-giang.webp', title: same('Sample headline'), country: 'UK', lang: 'en', source: 'google', text: same('Sample review text in English, shown only in development to preview the slider layout.') },
  { author: 'Camille Laurent', rating: 5, image: '/images/tours/dam-van-long-ninh-binh.webp', title: same('Titre d’exemple'), country: 'France', lang: 'fr', source: 'tripadvisor', text: same('Exemple d’avis en français, affiché uniquement en développement pour prévisualiser le carrousel.') },
  { author: 'Lukas Becker', rating: 5, image: '/images/tours/ha-long.webp', title: same('Beispieltitel'), country: 'Germany', lang: 'de', source: 'google', text: same('Beispielbewertung auf Deutsch, nur in der Entwicklung sichtbar, um das Layout zu testen.') },
  { author: 'Wang Li', rating: 5, image: '/images/tours/hoi-an-9-copy.webp', title: same('示例标题'), country: 'China', lang: 'zh', source: 'tripadvisor', text: same('中文示例评价，仅在开发环境中显示，用于预览轮播布局。') },
  { author: 'Lucía Martínez', rating: 5, image: '/images/tours/mua-cave.webp', title: same('Título de ejemplo'), country: 'Spain', lang: 'es', source: 'google', text: same('Reseña de ejemplo en español, visible solo en desarrollo para previsualizar el carrusel.') },
  { author: 'Kim Min-ji', rating: 5, image: '/images/tours/da-lat.webp', title: same('샘플 제목'), country: 'Korea', lang: 'ko', source: 'tripadvisor', text: same('개발 환경에서만 표시되는 한국어 샘플 리뷰로, 슬라이더 레이아웃을 미리 보기 위한 것입니다.') },
]
