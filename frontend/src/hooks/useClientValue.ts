import { useSyncExternalStore } from 'react'
import { todayISO } from '@/components/forms/rules'

const noop = () => () => {}

/**
 * A value that depends on when/where the page is viewed (today's date, the year). Prerendered HTML and the
 * hydration pass use `server` so they match; right after hydration it switches to the visitor's real value.
 */
export function useClientValue<T>(client: () => T, server: T): T {
  return useSyncExternalStore(noop, client, () => server)
}

/** Today as YYYY-MM-DD in the visitor's time zone; '' while prerendering/hydrating. */
export const useTodayISO = () => useClientValue(todayISO, '')

/** Current year; the build year while prerendering/hydrating. */
export const useYear = () => useClientValue(() => new Date().getFullYear(), __BUILD_YEAR__)
