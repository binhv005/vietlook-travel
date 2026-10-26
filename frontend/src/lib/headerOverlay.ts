import { useEffect, useSyncExternalStore } from 'react'

/**
 * Lets a full-bleed page hero tell the Header to float transparently over it.
 * The hero calls `useHeaderOverlay()` and adds HERO_UNDER_HEADER so it starts
 * underneath the sticky header; pages without such a hero keep a solid header.
 */

/** Pulls the hero up under the sticky header (main bar 97/113px + 40px top bar from md) and pads its content back down. */
export const HERO_UNDER_HEADER = '-mt-[97px] pt-[97px] sm:-mt-[113px] sm:pt-[113px] md:-mt-[153px] md:pt-[153px]'

let count = 0
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((fn) => fn())

const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useHeaderOverlay() {
  useEffect(() => {
    count++
    emit()
    return () => {
      count--
      emit()
    }
  }, [])
}

export function useHasHeaderOverlay() {
  return useSyncExternalStore(subscribe, () => count > 0)
}
