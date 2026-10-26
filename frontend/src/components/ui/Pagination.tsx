import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fmt, useI18n } from '@/i18n'

export default function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  const { t } = useI18n()
  if (pages <= 1) return null
  const btn = 'inline-flex size-10 items-center justify-center rounded-full border text-sm font-semibold transition'
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <button type="button" className={`${btn} border-line hover:border-brand-400 disabled:opacity-40`} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label={t.common.previous}>
        <ChevronLeft className="size-4" aria-hidden />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={fmt(t.common.page, { n: p })}
          className={`${btn} ${p === page ? 'border-brand-600 bg-brand-600 text-white' : 'border-line hover:border-brand-400'}`}
        >
          {p}
        </button>
      ))}
      <button type="button" className={`${btn} border-line hover:border-brand-400 disabled:opacity-40`} disabled={page === pages} onClick={() => onChange(page + 1)} aria-label={t.common.next}>
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  )
}
