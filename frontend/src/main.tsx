import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { markAppReady } from './splash'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Let the first frame of the app paint before fading the splash out.
requestAnimationFrame(() => requestAnimationFrame(markAppReady))
