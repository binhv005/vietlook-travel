/**
 * Self-hosted web fonts (same families and weights the site used from Google Fonts).
 * Bundled with the app CSS, so there is no render-blocking third-party stylesheet; each
 * @font-face carries a unicode-range, so only the subsets a page actually uses are downloaded.
 * Chinese fonts stay on Google Fonts and are loaded on demand (see index.html and Layout.tsx).
 */
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/be-vietnam-pro/700.css'
import '@fontsource/be-vietnam-pro/800.css'
import '@fontsource/be-vietnam-pro/900.css'
import '@fontsource/lora/500.css'
import '@fontsource/lora/600.css'
import '@fontsource/lora/700.css'
import '@fontsource/oswald/500.css'
import '@fontsource/oswald/600.css'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/600.css'
