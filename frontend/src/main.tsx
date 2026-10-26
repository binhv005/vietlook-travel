import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { markAppReady } from './splash'
import './fonts'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// Pages prerendered at build time (scripts/prerender.mjs) arrive with their markup and are hydrated in place.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

// Let the first frame of the app paint before fading the splash out.
requestAnimationFrame(() => requestAnimationFrame(markAppReady))
