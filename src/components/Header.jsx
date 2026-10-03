import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PAGES } from '../data/pages.js'
import ThemeSwitch from './ThemeSwitch.jsx'
import ThemeButton from './ThemeButton.jsx'
import { I } from './icons.jsx'

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
          {/* Animated leaf mark: roundel scales in, leaf outline draws then
              fills, veins draw in sequence; sways on hover. Pure CSS, so it
              plays from the prerendered HTML before JavaScript loads. */}
          <svg className="lm" width="34" height="34" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <circle className="lm-ring" cx="32" cy="32" r="32" />
            <g className="lm-leafgrp">
              <path className="lm-leaf" pathLength="1" d="M32 11c10.5 8 14.5 17.5 12.4 26.6C42.7 45 37.6 49.6 32 51c-5.6-1.4-10.7-6-12.4-13.4C17.5 28.5 21.5 19 32 11z" />
              <path className="lm-vein lm-v0" pathLength="1" d="M32 17v38" />
              <path className="lm-vein lm-v1" pathLength="1" d="M25.5 29.5h4.5" />
              <path className="lm-vein lm-v2" pathLength="1" d="M34 35.5h5.5" />
              <path className="lm-vein lm-v3" pathLength="1" d="M25 42h5" />
            </g>
          </svg>
          <span className="hd-brand-text">
            <span className="hd-name"><span className="lm-word">Birchway Market</span></span>
            <span className="hd-sub">Holiday production case study</span>
          </span>
        </Link>
        <div className="hd-actions">
        <ThemeButton />
        <button
          ref={btnRef}
          type="button"
          className="hd-menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <span className="burger" aria-hidden="true"><i /><i /></span>
          Menu
        </button>
        </div>
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
            <I.x size={16} />
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
