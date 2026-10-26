/**
 * Handwritten side note with a curved arrow, used to fill quiet spaces beside section content.
 * Decorative: hidden from screen readers (the same message is already conveyed by the section).
 */
type Arrow = 'up-right' | 'down-left' | 'down-right'

const ARROW_TRANSFORM: Record<Arrow, string> = {
  'up-right': '',
  'down-left': 'rotate(180 60 45)',
  'down-right': 'scale(1 -1) translate(0 -90)',
}

export default function HandNote({ lines, arrow = 'up-right', className = '' }: { lines: string[]; arrow?: Arrow; className?: string }) {
  const arrowFirst = arrow === 'down-left'
  const svg = (
    <svg viewBox="0 0 120 90" className="h-16 w-24 shrink-0 text-[#16795b]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <g transform={ARROW_TRANSFORM[arrow]}>
        <path d="M8 84 C 22 44, 58 16, 108 12" />
        <path d="M94 3 L108 12 L95 22" />
      </g>
    </svg>
  )
  return (
    <div className={`pointer-events-none flex items-end gap-3 select-none ${className}`} aria-hidden>
      {arrowFirst && svg}
      <p className="font-hand text-[1.7rem] leading-[1.15] font-semibold text-[#16795b] -rotate-2">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </p>
      {!arrowFirst && svg}
    </div>
  )
}
