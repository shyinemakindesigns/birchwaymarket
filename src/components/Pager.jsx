import { Link, useLocation } from 'react-router-dom'
import { PAGES } from '../data/pages.js'

export default function Pager() {
  const { pathname } = useLocation()
  const i = PAGES.findIndex((p) => p.path === pathname)
  if (i < 0) return null
  const prev = PAGES[i - 1]
  const next = PAGES[i + 1]
  return (
    <nav className="pager" aria-label="Previous and next page">
      {prev ? (
        <Link to={prev.path} className="pager-link pager-prev">
          <span className="pager-dir">Previous</span>
          <span className="pager-name">{prev.label}</span>
        </Link>
      ) : <span />}
      {next && (
        <Link to={next.path} className="pager-link pager-next">
          <span className="pager-dir">Next</span>
          <span className="pager-name">{next.label}</span>
        </Link>
      )}
    </nav>
  )
}
