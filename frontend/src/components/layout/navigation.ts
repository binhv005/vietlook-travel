import type { Dict } from '@/i18n/en'
import type { L } from '@/data/types'
import { citiesOf, regions } from '@/data/destinations'
import { themes } from '@/data/themes'
import { blogCategories } from '@/data/blogCategories'

export interface NavLink {
  label: string
  path: string
  image?: string
}
export interface NavColumn {
  title?: string
  path?: string
  image?: string
  links: NavLink[]
}
export interface NavItem {
  key: string
  label: string
  path: string
  /** mega = multi-column panel; tiles = image grid (Aurora style); list = simple dropdown. */
  panel?: { kind: 'mega' | 'tiles' | 'list'; columns: NavColumn[] }
}

/** Single source for desktop and mobile navigation. */
export function buildNav(t: Dict, l: (x: L) => string): NavItem[] {
  return [
    {
      key: 'tours',
      label: t.nav.tours,
      path: '/tours',
      panel: {
        kind: 'mega',
        columns: [
          { title: t.nav.byRegion, links: regions.map((r) => ({ label: l(r.name), path: `/tours?region=${r.slug}` })) },
          {
            title: t.nav.byDuration,
            links: [
              { label: t.nav.dayTrips, path: '/tours?duration=1' },
              { label: t.nav.oneWeek, path: '/tours?duration=5-8' },
              { label: t.nav.twoWeeks, path: '/tours?duration=9-14' },
              { label: t.nav.threeWeeks, path: '/tours?duration=15%2B' },
            ],
          },
          { title: t.nav.byTheme, path: '/tour-themes', links: themes.slice(0, 6).map((th) => ({ label: l(th.name), path: `/tour-themes/${th.slug}` })) },
          {
            title: t.nav.allTours,
            path: '/tours',
            image: '/images/tours/khamphadanhthangvietnam.webp',
            links: [
              { label: t.nav.allTours, path: '/tours' },
              { label: t.tours.quickCruise, path: '/tours?type=cruise&dest=halong-bay' },
              { label: t.nav.groupTours, path: '/group-tailor-made-tours' },
              { label: t.nav.tailorMade, path: '/tailor-made-tour' },
            ],
          },
        ],
      },
    },
    {
      key: 'destinations',
      label: t.nav.destinations,
      path: '/destinations',
      panel: {
        kind: 'mega',
        columns: regions.map((r) => ({
          title: l(r.name),
          path: `/destinations/${r.slug}`,
          image: r.image,
          links: citiesOf(r.slug).map((c) => ({ label: l(c.name), path: `/destinations/${c.slug}` })),
        })),
      },
    },
    {
      key: 'themes',
      label: t.nav.themes,
      path: '/tour-themes',
      panel: {
        kind: 'tiles',
        columns: [{ links: themes.map((th) => ({ label: l(th.name), path: `/tour-themes/${th.slug}`, image: th.image })) }],
      },
    },
    {
      key: 'car',
      label: t.nav.car,
      path: '/private-car',
      panel: {
        kind: 'list',
        columns: [
          {
            links: [
              { label: t.car.heroEyebrow, path: '/private-car' },
              { label: t.carQuote.title, path: '/private-car/quote' },
            ],
          },
        ],
      },
    },
    { key: 'visa', label: t.nav.visa, path: '/visa-fast-track' },
    {
      key: 'guide',
      label: t.nav.guide,
      path: '/travel-guide',
      // Multi-level guide menu (Local Vietnam style): one column per parent category, leaf categories grouped last.
      panel: {
        kind: 'mega',
        columns: [
          ...blogCategories
            .filter((c) => !c.parent && blogCategories.some((x) => x.parent === c.slug))
            .map((c) => ({
              title: l(c.name),
              path: `/travel-guide/${c.slug}`,
              links: blogCategories.filter((x) => x.parent === c.slug).map((x) => ({ label: l(x.name), path: `/travel-guide/${x.slug}` })),
            })),
          {
            title: t.guide.title,
            path: '/travel-guide',
            links: [
              ...blogCategories
                .filter((c) => !c.parent && !blogCategories.some((x) => x.parent === c.slug))
                .map((c) => ({ label: l(c.name), path: `/travel-guide/${c.slug}` })),
              { label: t.guide.all, path: '/travel-guide' },
            ],
          },
        ],
      },
    },
    {
      key: 'about',
      label: t.nav.about,
      path: '/about-us',
      panel: {
        kind: 'list',
        columns: [
          {
            links: [
              { label: t.nav.about, path: '/about-us' },
              { label: t.nav.partners, path: '/travel-trade-partners' },
            ],
          },
        ],
      },
    },
    { key: 'contact', label: t.nav.contact, path: '/contact' },
  ]
}
