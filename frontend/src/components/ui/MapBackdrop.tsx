/**
 * Map of Vietnam (white background removed) as a faint backdrop on the right of a section.
 * The parent section needs `relative isolate overflow-hidden`.
 */
export default function MapBackdrop({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/vn-map.webp"
      data-no-reveal
      alt=""
      aria-hidden
      loading="lazy"
      className={`pointer-events-none absolute top-1/2 right-[2%] -z-10 h-[90%] w-auto max-w-none -translate-y-1/2 opacity-25 select-none md:right-[6%] ${className}`}
    />
  )
}
