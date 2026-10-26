import { destinations } from './destinations'
import { themes } from './themes'
import { tours } from './tours'
import { blogCategories, posts } from './posts'

/** Locale-less public paths, used to build sitemap.xml at build time. */
export function sitemapPaths(): string[] {
  return [
    '',
    '/tours',
    ...tours.map((t) => `/tours/${t.slug}`),
    '/destinations',
    ...destinations.map((d) => `/destinations/${d.slug}`),
    '/tour-themes',
    ...themes.map((t) => `/tour-themes/${t.slug}`),
    '/group-tailor-made-tours',
    '/tailor-made-tour',
    '/private-car',
    '/private-car/quote',
    '/visa-fast-track',
    '/travel-guide',
    ...blogCategories.map((c) => `/travel-guide/${c.slug}`),
    ...posts.map((p) => `/travel-guide/${p.slug}`),
    '/about-us',
    '/contact',
    '/travel-trade-partners',
    '/privacy-policy',
    '/terms',
    '/payment-policy',
    '/cancellation-policy',
  ]
}
