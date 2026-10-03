import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Pager from './components/Pager.jsx'
import { PAGES, pageTitle } from './data/pages.js'
import Home from './pages/Home.jsx'
import Brief from './pages/Brief.jsx'
import Gallery from './pages/Gallery.jsx'
import QA from './pages/QA.jsx'
import Assets from './pages/Assets.jsx'
import Board from './pages/Board.jsx'
import Process from './pages/Process.jsx'
import Reflection from './pages/Reflection.jsx'
import BrandB from './pages/BrandB.jsx'
import NotFound from './pages/NotFound.jsx'
import ExportFrame from './pages/ExportFrame.jsx'

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
    document.getElementById('page-title')?.focus({ preventScroll: true })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brief" element={<Brief />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/board" element={<Board />} />
          <Route path="/process" element={<Process />} />
          <Route path="/brand-direction" element={<BrandB />} />
          <Route path="/reflection" element={<Reflection />} />
          {import.meta.env.DEV && <Route path="/__export" element={<ExportFrame />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Pager />
      </main>
      <Footer />
    </>
  )
}
