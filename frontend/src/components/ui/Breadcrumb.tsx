import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SITE_URL } from '@/data/site'
import { useI18n } from '@/i18n'

export interface Crumb {
  label: string
  /** Locale-less path; omit for the current page. */
  to?: string
}

export default function Breadcrumb({ items, light }: { items: Crumb[]; light?: boolean }) {
  const { t, to, lang } = useI18n()
  const all: Crumb[] = [{ label: t.nav.home, to: '' }, ...items]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to !== undefined ? { item: `${SITE_URL}/${lang}${c.to}` } : {}),
    })),
  }
  return (
    <nav aria-label={t.common.breadcrumb} className={`text-sm ${light ? 'text-white/85' : 'text-muted'}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            {c.to !== undefined && i < all.length - 1 ? (
              <Link to={to(c.to)} className={`hover:underline ${light ? 'hover:text-white' : 'hover:text-brand-700'}`}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={`font-medium ${light ? 'text-white' : 'text-ink'}`}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </nav>
  )
}
