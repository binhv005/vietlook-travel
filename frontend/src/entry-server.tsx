/**
 * Build-time prerender entry (see scripts/prerender.mjs). Renders one URL to HTML, waiting for the
 * lazily loaded page so the markup is complete; the browser then hydrates it (main.tsx).
 */
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { routes } from './App'
import { setServerHeaderOverlay } from './lib/headerOverlay'
import { sitemapPaths } from './data/sitemap'

export { sitemapPaths }

export async function render(url: string): Promise<string> {
  setServerHeaderOverlay(url)
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`http://localhost${url}`))
  if (context instanceof Response) throw new Error(`${url} redirected`)
  const router = createStaticRouter(handler.dataRoutes, context)
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}
