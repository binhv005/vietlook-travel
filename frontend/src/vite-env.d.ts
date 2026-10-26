/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_API_URL?: string
}

/** Year of the build (vite.config.ts), used where prerendered HTML shows the year. */
declare const __BUILD_YEAR__: number
