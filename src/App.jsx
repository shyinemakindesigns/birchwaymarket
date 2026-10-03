import { Suspense, useEffect, useRef } from 'react'
import { lazyPage } from './lazyPage.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Pager from './components/Pager.jsx'
import { PAGES, pageTitle } from './data/pages.js'
const Home = lazyPage(() => import('./pages/Home.jsx'))
const Brief = lazyPage(() => import('./pages/Brief.jsx'))
const Gallery = lazyPage(() => import('./pages/Gallery.jsx'))
const QA = lazyPage(() => import('./pages/QA.jsx'))
const Assets = lazyPage(() => import('./pages/Assets.jsx'))
const Board = lazyPage(() => import('./pages/Board.jsx'))
const Process = lazyPage(() => import('./pages/Process.jsx'))
const Reflection = lazyPage(() => import('./pages/Reflection.jsx'))
const BrandB = lazyPage(() => import('./pages/BrandB.jsx'))
const DesignSystem = lazyPage(() => import('./pages/DesignSystem.jsx'))
const BrandGraphics = lazyPage(() => import('./pages/BrandGraphics.jsx'))
const Overview = lazyPage(() => import('./pages/Overview.jsx'))
const Strategy = lazyPage(() => import('./pages/Strategy.jsx'))
const Copy = lazyPage(() => import('./pages/Copy.jsx'))
const NotFound = lazyPage(() => import('./pages/NotFound.jsx'))
const ExportFrame = import.meta.env.DEV ? lazyPage(() => import('./pages/ExportFrame.jsx')) : null
const Thumbnail = import.meta.env.DEV ? lazyPage(() => import('./pages/Thumbnail.jsx')) : null
const Social = import.meta.env.DEV ? lazyPage(() => import('./pages/Social.jsx')) : null

// On route change: reset scroll, update <title>, and move focus to the new
// page's h1 so keyboard and screen-reader users land at the new content.
function RouteEffects() {
  const { pathname, hash } = useLocation()
  const prev = useRef(pathname)
  useEffect(() => {
    const page = PAGES.find((p) => p.path === pathname)
    document.title = pageTitle(page)
    if (prev.current === pathname) return // first load: leave focus at the top
    prev.current = pathname
    if (hash) return
    window.scrollTo(0, 0)
    // The page chunk may still be loading: wait for its h1 (up to ~1 s).
    let tries = 0
    let raf = 0
    const focus = () => {
      const h = document.getElementById('page-title')
      if (h) h.focus({ preventScroll: true })
      else if (tries++ < 60) raf = requestAnimationFrame(focus)
    }
    focus()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
  return null
}

// Path -> page, for preloading before hydration and during the prerender.
export const ROUTE_PAGES = {
  '/': Home, '/overview': Overview, '/brief': Brief, '/strategy': Strategy, '/gallery': Gallery, '/copy': Copy,
  '/qa': QA, '/assets': Assets, '/board': Board, '/process': Process, '/brand-direction': BrandB,
  '/brand-graphics': BrandGraphics, '/reflection': Reflection, '/design-system': DesignSystem,
}
export const preloadAll = () => Promise.all([...Object.values(ROUTE_PAGES), NotFound].map((P) => P.preload()))

export default function App() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/copy" element={<Copy />} />
          <Route path="/brief" element={<Brief />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/board" element={<Board />} />
          <Route path="/process" element={<Process />} />
          <Route path="/brand-direction" element={<BrandB />} />
          <Route path="/brand-graphics" element={<BrandGraphics />} />
          <Route path="/reflection" element={<Reflection />} />
          <Route path="/design-system" element={<DesignSystem />} />
          {import.meta.env.DEV && <Route path="/__export" element={<ExportFrame />} />}
          {import.meta.env.DEV && <Route path="/__thumb" element={<Thumbnail />} />}
          {import.meta.env.DEV && <Route path="/__social" element={<Social />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <Pager />
      </main>
      <Footer />
    </>
  )
}
