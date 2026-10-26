import { Link, useLocation } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { switchLangPath, useI18n } from '@/i18n'
import type { Lang } from '@/data/types'

const LABELS: Record<Lang, string> = { en: 'EN', zh: '中文' }

/** Links to the same page in the other locale. */
export default function LanguageSwitcher({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { lang, t } = useI18n()
  const { pathname, search, hash } = useLocation()
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={t.nav.language}>
      <Globe className={`size-4 ${tone === 'light' ? 'text-white/70' : 'text-muted'}`} aria-hidden />
      {(Object.keys(LABELS) as Lang[]).map((l) => (
        <Link
          key={l}
          to={`${switchLangPath(pathname, l)}${search}${hash}`}
          hrefLang={l === 'zh' ? 'zh-Hans' : 'en'}
          lang={l === 'zh' ? 'zh-Hans' : 'en'}
          aria-current={l === lang ? 'true' : undefined}
          className={`rounded px-1.5 py-0.5 text-sm font-semibold whitespace-nowrap transition ${
            l === lang
              ? tone === 'light'
                ? 'bg-white/15 text-white'
                : 'bg-brand-50 text-brand-700'
              : tone === 'light'
                ? 'text-white/70 hover:text-white'
                : 'text-muted hover:text-brand-700'
          }`}
        >
          {LABELS[l]}
        </Link>
      ))}
    </div>
  )
}
