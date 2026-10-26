/**
 * Intro splash defined in index.html.
 * - Leaves automatically about AUTO_MS after the page starts loading.
 * - A scroll-down gesture (wheel, swipe up, ↓ / PageDown / Space / Enter) or a click enters the site at once.
 * - Shown only on the first visit to the home page (see index.html); never stays longer than MAX_MS, even if rendering fails.
 * The splash only goes away once the app has rendered, so visitors never land on a blank page.
 */
const AUTO_MS = 3000
const MAX_MS = 6000
const ENTER_KEYS = ['ArrowDown', 'PageDown', ' ', 'Enter']

const el = document.getElementById('splash')
let appReady = false
let wantsEnter = false
let done = false

function hide() {
  if (!el || done) return
  done = true
  window.scrollTo(0, 0)
  el.classList.add('splash-hide')
  document.documentElement.classList.remove('splash-lock')
  removeListeners()
  window.setTimeout(() => el.remove(), 700)
}

const tryHide = () => {
  if (appReady && wantsEnter) hide()
}

const enter = () => {
  wantsEnter = true
  tryHide()
}

const onWheel = (e: WheelEvent) => {
  if (e.deltaY > 4) enter()
}
let touchY: number | null = null
const onTouchStart = (e: TouchEvent) => {
  touchY = e.touches[0]?.clientY ?? null
}
const onTouchMove = (e: TouchEvent) => {
  // Finger moving up = scrolling down.
  if (touchY !== null && touchY - (e.touches[0]?.clientY ?? touchY) > 30) enter()
}
const onKey = (e: KeyboardEvent) => {
  if (ENTER_KEYS.includes(e.key)) {
    e.preventDefault()
    enter()
  }
}

function removeListeners() {
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('keydown', onKey)
}

if (el && !document.documentElement.classList.contains('no-splash')) {
  try {
    localStorage.setItem('vl-splash-seen', '1')
  } catch {
    // Storage blocked: the splash simply shows again next time.
  }
  window.addEventListener('wheel', onWheel, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('keydown', onKey)
  el.addEventListener('click', enter)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(enter, Math.max(0, (reduced ? 1200 : AUTO_MS) - performance.now()))
  window.setTimeout(hide, Math.max(0, MAX_MS - performance.now()))
} else {
  document.documentElement.classList.remove('splash-lock')
  el?.remove()
}

/** Called by main.tsx once the app's first frame has painted. */
export function markAppReady() {
  appReady = true
  tryHide()
}
