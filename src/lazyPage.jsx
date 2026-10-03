import { lazy } from 'react'

// Route-level code splitting that still prerenders and hydrates cleanly.
// Each page module loads on demand. Once preloaded (all of them during the
// build-time prerender, the current one before the client hydrates), the page
// renders synchronously, so server and client produce the same tree.
export function lazyPage(load) {
  let mod = null
  let pending = null
  const preload = () => (pending ??= load().then((m) => { mod = m; return m }))
  const Lazy = lazy(preload)
  function Page(props) {
    const C = mod?.default
    return C ? <C {...props} /> : <Lazy {...props} />
  }
  Page.preload = preload
  return Page
}
