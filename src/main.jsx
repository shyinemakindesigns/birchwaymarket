import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
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
if (root.dataset.route && root.dataset.route === window.location.pathname) {
  hydrateRoot(root, app)
} else {
  root.textContent = ''
  createRoot(root).render(app)
}
