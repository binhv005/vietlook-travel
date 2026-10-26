/**
 * Writes a ready-made HTML file for every public page (both languages) after `vite build`, so the browser can
 * paint the page and start loading its hero image before any JavaScript runs. The app then hydrates it (main.tsx).
 * Files are saved as dist/en/tours.html etc. and served without the extension (cleanUrls in vercel.json).
 * Run by `npm run build`; needs the SSR bundle from `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render, sitemapPaths } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
// React puts the page's <title>, meta, canonical/hreflang links, preloads and JSON-LD first; they belong in <head>.
const HEAD_TAG = /^(?:<(?:title)[^>]*>[\s\S]*?<\/title>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>|<(?:meta|link)\b[^>]*\/?>)/

let count = 0
for (const lang of ['en', 'zh']) {
  // Plus /booking, which is noindex (so not in the sitemap) but is where most calls to action lead.
  for (const p of [...sitemapPaths(), '/booking']) {
    const url = `/${lang}${p}`
    let body = await render(url)
    let head = ''
    for (let m; (m = body.match(HEAD_TAG)); ) {
      head += m[0]
      body = body.slice(m[0].length)
    }
    const html = template
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace('<html lang="en">', `<html lang="${lang === 'zh' ? 'zh-Hans' : 'en'}">`)
      .replace('</head>', `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    const file = path.join(dist, `${url}.html`)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, html)
    count++
  }
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${count} pages`)
