import { useEffect, useSyncExternalStore } from 'react'

/**
 * Lets a full-bleed page hero tell the Header to float transparently over it.
 * The hero calls `useHeaderOverlay()` and adds HERO_UNDER_HEADER so it starts
 * underneath the sticky header; pages without such a hero keep a solid header.
 */

/** Pulls the hero up under the sticky header (main bar 97/113px + 40px top bar from md) and pads its content back down. */
export const HERO_UNDER_HEADER = '-mt-[97px] pt-[97px] sm:-mt-[113px] sm:pt-[113px] md:-mt-[153px] md:pt-[153px]'

let count = 0
// Only the home page has an overlay hero. Prerendered HTML is built with that knowledge (setServerHeaderOverlay),
// and a page that starts on the home URL assumes it too until HomeHero mounts, so hydration matches and nothing flickers.
const isHome = (path: string) => /^\/(en|zh)\/?$/.test(path)
let serverOverlay = false
let pending = typeof window !== 'undefined' && isHome(window.location.pathname)
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((fn) => fn())

const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useHeaderOverlay() {
  useEffect(() => {
    count++
    pending = false
    emit()
    return () => {
      count--
      emit()
    }
  }, [])
}

/** Build-time prerender only: whether the URL being rendered is the home page. */
export function setServerHeaderOverlay(url: string) {
  serverOverlay = isHome(url)
}

export function useHasHeaderOverlay() {
  return useSyncExternalStore(
    subscribe,
    () => count > 0 || pending,
    () => (typeof window === 'undefined' ? serverOverlay : pending),
  )
}
