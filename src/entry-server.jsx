import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App, { preloadAll } from './App.jsx'

export { preloadAll }

// Build-time prerender (scripts/prerender.mjs): each route becomes real
// static HTML that the client then hydrates.
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
