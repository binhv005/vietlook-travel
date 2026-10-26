import { useId, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  key: string
  title: ReactNode
  content: ReactNode
}

interface Props {
  items: AccordionItem[]
  open: Set<string>
  onToggle: (key: string) => void
  variant?: 'card' | 'plain'
}

/** Controlled accordion using native buttons with aria-expanded/aria-controls. */
export default function Accordion({ items, open, onToggle, variant = 'card' }: Props) {
  const id = useId()
  return (
    <div className={variant === 'card' ? 'space-y-3' : 'divide-y divide-line border-y border-line'}>
      {items.map((it) => {
        const isOpen = open.has(it.key)
        const panelId = `${id}-${it.key}`
        return (
          <div key={it.key} className={variant === 'card' ? `rounded-xl border bg-white transition ${isOpen ? 'border-brand-200 shadow-sm' : 'border-line'}` : ''}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(it.key)}
                className={`flex w-full items-center justify-between gap-4 text-left font-semibold text-ink ${variant === 'card' ? 'px-5 py-4' : 'py-5'}`}
              >
                <span className="flex-1">{it.title}</span>
                <ChevronDown className={`size-5 shrink-0 text-brand-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
            </h3>
            <div id={panelId} role="region" hidden={!isOpen} className={variant === 'card' ? 'px-5 pb-5' : 'pb-5'}>
              {it.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
