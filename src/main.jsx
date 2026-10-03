import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { ROUTE_PAGES, preloadAll } from './App.jsx'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/pages.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate only when the prerendered markup is for this exact route; an SPA
// fallback (unknown URL served the home page HTML) renders fresh instead.
const page = ROUTE_PAGES[window.location.pathname]
if (page && root.dataset.route === window.location.pathname) {
  page.preload().then(() => hydrateRoot(root, app))
} else {
  root.textContent = ''
  createRoot(root).render(app)
}

// Fetch the other chapters once the browser is idle, so later navigation is instant.
const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500))
window.addEventListener('load', () => idle(() => { preloadAll() }), { once: true })
