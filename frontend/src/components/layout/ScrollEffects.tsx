import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Site-wide scroll effects, applied automatically to every page so pages need no markup changes:
 * - a reading-progress bar along the top edge;
 * - reveal-on-scroll with varied effects: eyebrows widen their letter-spacing, headings sharpen from a blur,
 *   the paragraph after a heading follows softly, list items slide in one by one, two-column halves come in
 *   from the sides, each card grid on a page gets its own effect (rise, flip, pop, tilt – staggered), large
 *   images open with a wipe and small ones zoom. Elements re-animate each time they re-enter the viewport,
 *   from below when scrolling down and from above when scrolling back up;
 * - a gentle parallax on full-bleed section background photos.
 * The page hero (the block holding the h1) and form fields are left alone. Styles live in index.css
 * and switch off for reduced-motion visitors.
 */
const TARGETS = 'main .eyebrow, main h2, main h2 + p, main .grid > *, main section ul:not(.grid) > li, main section img, main article section img'
const SKIP = 'form *, [role="dialog"] *, [data-no-reveal], [data-no-reveal] *, [aria-hidden="true"] *, main section > img.absolute'
/** Effects handed out to card grids in page order, so neighbouring sections feel different. */
const GRID_VARIANTS = ['up', 'flip', 'pop', 'tilt']

function isHalves(parent: HTMLElement | null) {
  return !!parent?.classList.contains('grid') && parent.children.length === 2 && /grid-cols-(2|\[)/.test(parent.className)
}

function variantFor(el: HTMLElement, gridVariant: (grid: Element) => string): string {
  if (el.tagName === 'IMG') return el.getBoundingClientRect().width > 480 ? 'wipe' : 'zoom'
  if (el.classList.contains('eyebrow')) return 'track'
  if (el.tagName === 'H2') return 'blur'
  if (el.tagName === 'P') return 'soft'
  const parent = el.parentElement
  if (el.tagName === 'LI' && !parent?.classList.contains('grid')) return 'slide'
  if (isHalves(parent)) return el === parent!.firstElementChild ? 'left' : 'right'
  if (parent?.classList.contains('grid')) return gridVariant(parent)
  return 'up'
}

export default function ScrollEffects() {
  const { pathname } = useLocation()
  const bar = useRef<HTMLDivElement>(null)

  // Reading progress.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Decorative backgrounds: a static layout choice, so it also runs for reduced-motion visitors.
  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return
    // Decorative photo backgrounds on tinted sections: paper and hills take turns down the page, and a
    // tinted section that directly follows a photo section stays plain, so photos are never back to back.
    const decorate = () => {
      let next: 'paper' | 'hills' = 'paper'
      let prevHadPhoto = false
      Array.from(main.children).forEach((el) => {
        const tinted = el.tagName === 'SECTION' && (el.classList.contains('bg-sand') || el.classList.contains('bg-mist'))
        const node = el as HTMLElement
        if (tinted && !prevHadPhoto) {
          if (node.dataset.bg !== next) node.dataset.bg = next
          next = next === 'paper' ? 'hills' : 'paper'
          prevHadPhoto = true
        } else {
          if (node.dataset.bg) delete node.dataset.bg
          prevHadPhoto = false
        }
      })
    }

    let frame = 0
    const mo = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), decorate()))
    })
    decorate()
    mo.observe(main, { childList: true })
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
    }
  }, [pathname])

  // Reveal on scroll.
  useEffect(() => {
    const main = document.getElementById('main')
    if (!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers = new WeakMap<Element, number>()
    // Elements watched by *this* run. React reuses DOM nodes between pages of the same kind (one destination
    // to another), so an attribute left from the previous page must not be taken as "already handled".
    const watched = new WeakSet<Element>()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement
          if (e.isIntersecting) {
            const delay = Number(el.dataset.revealDelay || 0)
            el.style.transitionDelay = `${delay}ms`
            // A data attribute, not a class: React rewrites className on re-render and would drop it.
            el.dataset.revealed = ''
            // Drop the stagger delay afterwards so hover transitions stay instant.
            window.clearTimeout(timers.get(el))
            timers.set(el, window.setTimeout(() => (el.style.transitionDelay = ''), delay + 800))
          } else {
            // Hidden again: remember which side it left from, so it comes back from that side.
            el.dataset.from = e.boundingClientRect.top < 0 ? 'above' : 'below'
            el.style.transitionDelay = ''
            delete el.dataset.revealed
          }
        })
      },
      // threshold 0 (not a ratio) so very tall blocks, like a whole page column, still reveal.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    const gridVariants = new WeakMap<Element, string>()
    let gridCount = 0
    const gridVariant = (grid: Element) => {
      let v = gridVariants.get(grid)
      if (!v) gridVariants.set(grid, (v = GRID_VARIANTS[gridCount++ % GRID_VARIANTS.length]))
      return v
    }

    const tag = () => {
      const hero = main.querySelector('h1')?.closest('#main > *')
      const counters = new Map<Element, number>()
      main.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        // Skip blocks that already animate themselves with <Reveal> (marked data-no-reveal).
        if (watched.has(el) || el.matches(SKIP) || hero?.contains(el) || el.querySelector('[data-no-reveal]')) return
        if (el.parentElement?.closest('[data-reveal]')) return
        watched.add(el)
        const v = variantFor(el, gridVariant)
        el.dataset.reveal = v
        // Stagger siblings within the same grid or list; a heading follows its eyebrow and the paragraph its heading.
        const parent = el.parentElement
        if (parent && (parent.classList.contains('grid') || v === 'slide')) {
          const n = counters.get(parent) ?? 0
          counters.set(parent, n + 1)
          el.dataset.revealDelay = String(v === 'slide' ? Math.min(n, 8) * 60 : (n % 4) * 90)
        } else if (v === 'blur' && el.previousElementSibling?.classList.contains('eyebrow')) {
          el.dataset.revealDelay = '100'
        } else if (v === 'soft') {
          el.dataset.revealDelay = '180'
        }
        io.observe(el)
      })
    }

    let frame = 0
    const mo = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), tag()))
    })
    tag()
    mo.observe(main, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
      io.disconnect()
      // Leave nothing hidden behind: strip every reveal attribute so reused nodes start visible on the next page.
      main.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        window.clearTimeout(timers.get(el))
        delete el.dataset.reveal
        delete el.dataset.revealed
        delete el.dataset.revealDelay
        delete el.dataset.from
        el.style.transitionDelay = ''
      })
    }
  }, [pathname])

  // Parallax on full-bleed section background photos (an <img> placed straight inside a section, covering it).
  useEffect(() => {
    const main = document.getElementById('main')
    if (!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let imgs: HTMLElement[] = []
    const collect = () => {
      const hero = main.querySelector('h1')?.closest('#main > *')
      imgs = Array.from(main.querySelectorAll<HTMLElement>('section > img.absolute.inset-0')).filter((el) => !hero?.contains(el))
    }
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      imgs.forEach((el) => {
        const r = (el.parentElement as HTMLElement).getBoundingClientRect()
        if (r.bottom < -100 || r.top > vh + 100) return
        // -1 when the section's centre is at the bottom of the screen, +1 at the top.
        const p = (vh / 2 - (r.top + r.height / 2)) / vh
        el.style.transform = `translate3d(0, ${(p * 60).toFixed(1)}px, 0) scale(1.12)`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const mo = new MutationObserver(() => {
      collect()
      onScroll()
    })
    collect()
    update()
    mo.observe(main, { childList: true, subtree: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      imgs.forEach((el) => (el.style.transform = ''))
    }
  }, [pathname])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] print:hidden" aria-hidden>
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-sun" />
    </div>
  )
}
