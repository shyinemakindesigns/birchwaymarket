import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LeafMark } from '../creative/Logo.jsx'
import { PAGES } from '../data/pages.js'
import ThemeSwitch from './ThemeSwitch.jsx'

// Burger-only navigation at every breakpoint, named entries only.
// The sheet is a modal dialog: focus moves in on open, is trapped while
// open, Escape closes it, and focus returns to the Menu button.
// It is portalled to <body> so no ancestor (sticky header, filters,
// transforms) can become its containing block and clip it.
export default function Header() {
  const [open, setOpen] = useState(false)
  // The menu is portalled to <body>, which only exists in the browser, so it
  // mounts after hydration (it is closed and hidden at that point anyway).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const btnRef = useRef(null)
  const sheetRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const focusables = () => [...sheet.querySelectorAll('a[href], button:not([disabled]), input:checked')]
    focusables()[0]?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      } else if (e.key === 'Tab') {
        const f = focusables()
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      const a = document.activeElement
      if (!a || a === document.body || sheet.contains(a)) btnRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="hd-in">
        <Link to="/" className="hd-brand">
          <LeafMark size={30} fg="#F6F0E1" bg="#23483A" />
          <span className="hd-brand-text">
            <span className="hd-name">Birchway Market</span>
            <span className="hd-sub">Holiday production case study</span>
          </span>
        </Link>
        <button
          ref={btnRef}
          type="button"
          className="hd-menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <span className="burger" aria-hidden="true"><i /><i /><i /></span>
          Menu
        </button>
      </div>

      {mounted && createPortal(
        <>
      <div className={`menu-scrim${open ? ' open' : ''}`} onClick={() => setOpen(false)} hidden={!open} />
      <div
        id="site-menu"
        ref={sheetRef}
        className={`menu-sheet${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="menu-top">
          <span className="menu-title">Case study</span>
          <button type="button" className="menu-close" onClick={() => setOpen(false)}>
            Close
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="menu-list">
            {PAGES.map((p, i) => (
              <li key={p.path} style={{ '--i': i }}>
                <NavLink to={p.path} end={p.path === '/'} className="menu-link" onClick={() => setOpen(false)}>
                  {p.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeSwitch />
        <p className="menu-foot">Birchway Market is a fictional brand created for this exercise.</p>
      </div>
        </>,
        document.body,
      )}
    </header>
  )
}
