import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { L, LList, Lang } from '@/data/types'
import en, { type Dict } from './en'
import zh from './zh'

const dicts: Record<Lang, Dict> = { en, zh }

export const isLang = (v: string | undefined): v is Lang => v === 'en' || v === 'zh'

/** Replaces `{key}` placeholders. */
export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''))

/** Swaps the locale segment of a pathname, keeping the rest of the URL. */
export const switchLangPath = (pathname: string, lang: Lang) =>
  pathname.replace(/^\/(en|zh)(?=\/|$)/, `/${lang}`) || `/${lang}`

interface I18n {
  lang: Lang
  t: Dict
  /** Picks the current locale from a localised string. */
  l: (x: L) => string
  ll: (x: LList) => string[]
  /** Prefixes a locale-less path with the current locale. */
  to: (path?: string) => string
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<I18n>(
    () => ({
      lang,
      t: dicts[lang],
      l: (x) => x[lang] || x.en,
      ll: (x) => (x[lang]?.length ? x[lang] : x.en),
      to: (path = '') => `/${lang}${path}`,
    }),
    [lang],
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}

/** Duration label such as "14 days 13 nights" / "1 day". */
export function useDuration() {
  const { t } = useI18n()
  return (days: number, nights: number) => {
    if (nights <= 0) return days === 1 ? t.common.day : fmt(t.common.days, { n: days })
    return fmt(t.common.daysNights, { d: days, n: nights })
  }
}
