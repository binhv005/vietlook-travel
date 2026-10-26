import { Loader2 } from 'lucide-react'

/** Shown while a lazily loaded page chunk is fetched. Full screen height so the footer never jumps when the page arrives (CLS). */
export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-live="polite">
      <Loader2 className="size-8 animate-spin text-brand-500" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
