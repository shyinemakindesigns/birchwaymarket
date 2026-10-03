import { Link, useLocation } from 'react-router-dom'
import { PAGES } from '../data/pages.js'
import { BRAND } from '../data/brand.js'
import { SITE_PAIRS, THEMES } from '../data/sitePalette.js'
import { CREDIT } from '../data/credit.js'
import { contrastRatio } from '../lib/contrast.js'
import { LeafMark } from '../creative/Logo.jsx'

// The footer is the proof sheet's colophon and slug line: a closing line,
// the chapter list (where you are in the sequence), the production facts,
// and a printer's colour control strip of the brand swatches.

const SWATCHES = ['spruce', 'cranberry', 'wheat', 'pear', 'clementine', 'cream'].map((k) => ({ key: k, ...BRAND.colors[k] }))

const lowestText = SITE_PAIRS
  .filter(([, , , kind]) => kind === 'text')
  .reduce((min, [, fg, bg]) => Math.min(min, contrastRatio(THEMES.light[fg], THEMES.light[bg]), contrastRatio(THEMES.dark[fg], THEMES.dark[bg])), Infinity)

function RegMark() {
  return (
    <svg className="ft-reg" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 0v22M0 11h22" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  const chapters = PAGES.slice(1)

  const backToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('page-title')?.focus({ preventScroll: true })
  }

  const hasCredit = CREDIT.name.trim().length > 0

  return (
    <footer className="site-footer">
      <div className="ft-main">
        <section className="ft-close" aria-label="About this case study">
          <Link to="/" className="ft-brand">
            <LeafMark size={34} fg="#1B382D" bg="#F6F0E1" />
            <span>Birchway Market</span>
          </Link>
          <p className="ft-statement">One approved creative, eight platform specs, nothing off-brief.</p>
          <p className="ft-disclaimer">
            A self-directed portfolio exercise, not client work. Birchway Market is a fictional brand, and no real retailer’s branding, logos or trademarks appear anywhere in this project.
          </p>
          {hasCredit && (
            <p className="ft-credit">
              Case study by {CREDIT.name}
              {CREDIT.portfolioUrl && <> <a href={CREDIT.portfolioUrl}>Portfolio</a></>}
              {CREDIT.linkedinUrl && <> <a href={CREDIT.linkedinUrl}>LinkedIn</a></>}
            </p>
          )}
          <button type="button" className="ft-top" onClick={backToTop}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 12V2.5M2.5 6.5 7 2l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to top
          </button>
        </section>

        <nav className="ft-chapters" aria-labelledby="ft-chapters-h">
          <h2 id="ft-chapters-h">Chapters</h2>
          <ol>
            {chapters.map((p) => {
              const current = p.path === pathname
              return (
                <li key={p.path}>
                  <Link to={p.path} aria-current={current ? 'page' : undefined}>
                    <span className="ft-ch-name">{p.label}</span>
                    {current && <span className="ft-here">You are here</span>}
                  </Link>
                </li>
              )
            })}
          </ol>
        </nav>

        <section className="ft-colophon" aria-labelledby="ft-colophon-h">
          <h2 id="ft-colophon-h">Colophon</h2>
          <dl>
            <div><dt>Job</dt><dd>BWM-200, Holiday 2026 adaptation package</dd></div>
            <div><dt>Output</dt><dd>1 master, 8 static sizes, 1 HTML5 banner</dd></div>
            <div><dt>Typefaces</dt><dd>Young Serif and Archivo</dd></div>
            <div><dt>Built with</dt><dd>React and Vite. Canva, Claude Design, Illustrator, Figma and Claude Code, credited on <Link to="/reflection">How this was built</Link></dd></div>
            <div><dt>Accessibility</dt><dd>WCAG 2.1 AA in light and dark themes. Lowest text contrast on the site: {lowestText.toFixed(2)}:1, computed on load</dd></div>
          </dl>
        </section>
      </div>

      <div className="ft-slug">
        <div className="ft-strip">
          <RegMark />
          <ul className="ft-bar" aria-label="Brand colour control strip">
            {SWATCHES.map((s) => (
              <li key={s.key}>
                <span className="ft-chip" style={{ background: s.hex }} aria-hidden="true" />
                <span className="ft-swatch-name">{s.name}</span>
                <span className="ft-swatch-hex">{s.hex}</span>
              </li>
            ))}
          </ul>
          <RegMark />
        </div>
        <div className="ft-slugline">
          <span>Birchway_HolidayCampaign_2026, case study proof</span>
          <span>Fictional brand. Self-directed exercise, 2026.</span>
        </div>
      </div>
    </footer>
  )
}
