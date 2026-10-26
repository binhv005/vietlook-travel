import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { citiesOf, regions } from '@/data/destinations'
import { themes } from '@/data/themes'
import { DURATION_BUCKETS, PRICE_BUCKETS, TOUR_TYPES, type ListKey, type TourFilters } from '@/lib/tourFilters'
import { useI18n } from '@/i18n'

interface Props {
  filters: TourFilters
  onToggle: (key: ListKey, value: string) => void
  /** Hide groups that are fixed by the page (e.g. theme on a theme page). */
  hide?: ListKey[]
  counts?: Partial<Record<ListKey, Record<string, number>>>
}

function Group({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line py-4 last:border-0">
      <h3>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between text-sm font-bold tracking-wide text-ink uppercase">
          {title}
          <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </h3>
      {open && <div className="mt-3 space-y-1.5">{children}</div>}
    </div>
  )
}

function Check({ checked, onChange, label, count, indent }: { checked: boolean; onChange: () => void; label: string; count?: number; indent?: boolean }) {
  return (
    <label className={`flex cursor-pointer items-center gap-2.5 rounded-md py-1 text-[0.93rem] hover:text-brand-700 ${indent ? 'pl-6' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 rounded border-slate-300 accent-brand-600" />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-muted">{count}</span>}
    </label>
  )
}

/** Faceted tour filters, shared by the sidebar (desktop) and the drawer (mobile). */
export default function FilterPanel({ filters, onToggle, hide = [], counts }: Props) {
  const { t, l } = useI18n()
  const show = (k: ListKey) => !hide.includes(k)
  return (
    <div>
      {show('region') && (
        <Group title={t.tours.destination}>
          {regions.map((r) => (
            <div key={r.slug}>
              <Check checked={filters.region.includes(r.slug)} onChange={() => onToggle('region', r.slug)} label={l(r.name)} count={counts?.region?.[r.slug]} />
              {show('dest') &&
                citiesOf(r.slug).map((c) => (
                  <Check key={c.slug} indent checked={filters.dest.includes(c.slug)} onChange={() => onToggle('dest', c.slug)} label={l(c.name)} count={counts?.dest?.[c.slug]} />
                ))}
            </div>
          ))}
        </Group>
      )}
      {show('theme') && (
        <Group title={t.tours.theme}>
          {themes.map((th) => (
            <Check key={th.slug} checked={filters.theme.includes(th.slug)} onChange={() => onToggle('theme', th.slug)} label={l(th.name)} count={counts?.theme?.[th.slug]} />
          ))}
        </Group>
      )}
      {show('duration') && (
        <Group title={t.tours.duration}>
          {DURATION_BUCKETS.map((b) => (
            <Check key={b} checked={filters.duration.includes(b)} onChange={() => onToggle('duration', b)} label={t.tours.durations[b]} count={counts?.duration?.[b]} />
          ))}
        </Group>
      )}
      {show('price') && (
        <Group title={t.tours.price}>
          <p className="-mt-1 mb-1 text-xs text-muted">{t.tours.priceHint}</p>
          {PRICE_BUCKETS.map((b) => (
            <Check key={b} checked={filters.price.includes(b)} onChange={() => onToggle('price', b)} label={t.tours.priceBuckets[b]} count={counts?.price?.[b]} />
          ))}
        </Group>
      )}
      {show('type') && (
        <Group title={t.tours.tourType}>
          {TOUR_TYPES.map((ty) => (
            <Check key={ty} checked={filters.type.includes(ty)} onChange={() => onToggle('type', ty)} label={t.tourType[ty]} count={counts?.type?.[ty]} />
          ))}
        </Group>
      )}
    </div>
  )
}
