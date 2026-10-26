import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { sitemapPaths } from './src/data/sitemap'

/** Emits sitemap.xml (with hreflang alternates) from the content data at build time. */
function sitemap(siteUrl: string): Plugin {
  return {
    name: 'vietlook-sitemap',
    apply: 'build',
    generateBundle() {
      const base = siteUrl.replace(/\/$/, '')
      const urls = sitemapPaths()
        .map((p) => {
          const alt = (lang: string) => `${base}/${lang}${p}`
          return ['en', 'zh']
            .map(
              (lang) => `  <url>
    <loc>${alt(lang)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${alt('en')}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${alt('zh')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${alt('en')}"/>
  </url>`,
            )
            .join('\n')
        })
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://www.vietlooktravel.com'
  return {
    plugins: [react(), tailwindcss(), sitemap(siteUrl)],
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    build: { chunkSizeWarningLimit: 700 },
    define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  }
})
