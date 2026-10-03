import Logo from './Logo.jsx'
import TableArt from './TableArt.jsx'
import { BRAND, C } from '../data/brand.js'
import { SPECS } from '../data/specs.js'
import { LAYOUTS, DRAFT_300x250 } from './layouts.js'

const SERIF = "'Young Serif', 'Young Serif Fallback', Georgia, serif"
const SANS = "'Archivo', 'Archivo Fallback', system-ui, sans-serif"

function Cta({ cfg, style }) {
  return (
    <span
      data-qa="cta"
      style={{
        display: 'inline-block',
        alignSelf: 'flex-start',
        fontFamily: SANS,
        fontWeight: 650,
        fontSize: cfg.fs,
        lineHeight: 1.1,
        padding: `${cfg.py}px ${cfg.px}px`,
        borderRadius: 999,
        background: cfg.draftFill ? C.pear : C.cranberry,
        color: C.cream,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {BRAND.copy.cta}
    </span>
  )
}

// Renders a creative at its true pixel size. Wrap in <ScaledFrame> to fit it
// into the page. Purely visual, so it is aria-hidden; the frame carries alt.
export default function Creative({ id, draft = false, showSafe = false }) {
  const spec = SPECS[id]
  const L = draft ? DRAFT_300x250 : LAYOUTS[id]
  const { w, h } = spec
  return (
    <div
      aria-hidden="true"
      data-qa-root=""
      style={{ position: 'relative', width: w, height: h, overflow: 'hidden', background: C.spruce, color: C.cream }}
    >
      <div style={{ position: 'absolute', left: L.art.x, top: L.art.y, width: L.art.s, height: L.art.s }}>
        <TableArt idSuffix={`${id}${draft ? 'd' : ''}`} />
      </div>

      <Logo qa h={L.logo.h} style={{ position: 'absolute', left: L.logo.x, top: L.logo.y }} />

      <div
        data-qa="text"
        style={{
          position: 'absolute',
          left: L.text.x,
          top: L.text.y,
          width: L.text.w,
          display: 'flex',
          flexDirection: 'column',
          gap: L.text.gap,
        }}
      >
        <p data-qa="hl" style={{ margin: 0, fontFamily: SERIF, fontSize: L.hl, lineHeight: 1.02, letterSpacing: '-0.01em', color: C.cream, textWrap: 'balance' }}>
          {BRAND.copy.headline}
        </p>
        {L.sub && (
          <p data-qa="sub" style={{ margin: 0, fontFamily: SANS, fontSize: L.sub, lineHeight: 1.3, color: C.wheat, fontWeight: 450 }}>
            {BRAND.copy.sub}
          </p>
        )}
        {L.signoff && (
          <p data-qa="sub" style={{ margin: 0, fontFamily: SANS, fontSize: L.signoff, lineHeight: 1.25, color: C.wheat, fontWeight: 550 }}>
            {BRAND.copy.doohSignoff}
          </p>
        )}
        {L.cta && <Cta cfg={L.cta} style={{ marginTop: L.cta.fs * 0.3 }} />}
        {L.legal.inline && (
          <p data-qa="legal" style={{ margin: 0, fontFamily: SANS, fontSize: L.legal.fs, lineHeight: 1.3, color: C.cream }}>
            {BRAND.copy.legal}
          </p>
        )}
      </div>

      {L.ctaAbs && <Cta cfg={L.ctaAbs} style={{ position: 'absolute', left: L.ctaAbs.x, top: L.ctaAbs.y }} />}

      {!L.legal.inline && <p data-qa="legal" style={{ position: 'absolute', left: L.legal.x, top: L.legal.y, margin: 0, fontFamily: SANS, fontSize: L.legal.fs, lineHeight: 1.3, color: C.cream, width: L.legal.w, whiteSpace: L.legal.w ? 'normal' : 'nowrap' }}>
        {BRAND.copy.legal}
      </p>}

      {showSafe && <SafeZone spec={spec} />}
    </div>
  )
}

function SafeZone({ spec }) {
  const { top, right, bottom, left } = spec.safe
  const tall = top > 100
  // never thinner than 2.5px at native size, so it reads on the small display units
  const stroke = Math.max(2.5, (spec.w / 300) * 1.5)
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {tall && (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: top, background: 'repeating-linear-gradient(135deg, rgba(240,90,200,.28) 0 12px, rgba(240,90,200,.08) 12px 24px)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: bottom, background: 'repeating-linear-gradient(135deg, rgba(240,90,200,.28) 0 12px, rgba(240,90,200,.08) 12px 24px)' }} />
        </>
      )}
      <div
        style={{
          position: 'absolute',
          top, right, bottom, left,
          outline: `${stroke}px dashed #FF6AD5`,
          // dark track under the dashes keeps the line visible over light artwork
          boxShadow: `0 0 0 ${stroke}px #17221C`,
        }}
      />
    </div>
  )
}
