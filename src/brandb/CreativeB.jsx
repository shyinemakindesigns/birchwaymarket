import { Wordmark } from './LogoB.jsx'
import TableArt from '../creative/TableArt.jsx'
import { BRAND_B as BRAND, CB as C } from './brandB.js'

const SERIF = "'Gloock', 'Gloock Fallback', Georgia, serif"
const SANS = "'Hanken Grotesk', 'Hanken Grotesk Fallback', system-ui, sans-serif"

function Arrow({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" style={{ flex: 'none' }}>
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Cta({ cfg, style }) {
  return (
    <span
     
      style={{
        display: 'inline-flex', alignItems: 'center', gap: cfg.fs * 0.55, alignSelf: 'flex-start',
        fontFamily: SANS, fontWeight: 600, fontSize: cfg.fs, letterSpacing: '0.04em', lineHeight: 1.1,
        padding: `${cfg.py}px ${cfg.px}px`, borderRadius: 2,
        background: cfg.draftFill ? C.gilt : C.cranberry, color: C.birch, whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {BRAND.copy.cta}
      <Arrow size={Math.round(cfg.fs * 0.95)} />
    </span>
  )
}

function Arch({ a, art, id }) {
  const innerW = a.w - a.gap * 2
  const innerH = a.h - a.gap
  // Size from the arch width so the whole plate sits inside the arch (the
  // plate is ~68% of the art box), capped by height for short, wide arches.
  const size = Math.min(innerW * (art?.scale ?? 1.32), innerH * 1.35)
  const cy = innerH * (art?.cy ?? 0.58)
  return (
    <>
      <div
       
        style={{
          position: 'absolute', left: a.x, top: a.y, width: a.w, height: a.h,
          border: `${a.stroke}px solid ${C.gilt}`, borderBottom: 'none',
          borderRadius: `${a.w / 2}px ${a.w / 2}px 0 0`, boxSizing: 'border-box', pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', left: a.x + a.gap, top: a.y + a.gap, width: innerW, height: innerH,
          background: C.archFill, overflow: 'hidden', borderRadius: `${innerW / 2}px ${innerW / 2}px 0 0`,
        }}
      >
        <div style={{ position: 'absolute', width: size, height: size, left: (innerW - size) / 2, top: cy - size / 2 }}>
          <TableArt idSuffix={id} />
        </div>
      </div>
    </>
  )
}

// Renders a direction B creative at its true pixel size from a layout
// (layoutsB.js). Wrap it in <SpecFrame> to fit it to the page; it is
// aria-hidden because the frame carries the alt text.
export default function CreativeB({ layout: L, w, h, safe, showSafe = false, id = 'b' }) {
  const center = !!L.text.center
  const lines = L.lines || [BRAND.copy.headline]

  return (
    <div aria-hidden="true" data-b-root="" style={{ position: 'relative', width: w, height: h, overflow: 'hidden', background: C.spruce, color: C.birch }}>
      {L.frame != null && (
        <div style={{ position: 'absolute', inset: L.frame, border: `${Math.max(1, w / 900)}px solid rgba(201, 162, 94, 0.55)`, pointerEvents: 'none' }} />
      )}

      <Arch a={L.arch} art={L.art} id={id} />

      {L.rule && <div style={{ position: 'absolute', left: L.rule.x1, top: L.rule.y, width: L.rule.x2 - L.rule.x1, height: 2, background: C.gilt }} />}
      {L.divider && <div style={{ position: 'absolute', left: L.divider.x, top: L.divider.y, width: 1, height: L.divider.h, background: 'rgba(201, 162, 94, 0.6)' }} />}

      <div data-b="logo" style={L.logo.center ? { position: 'absolute', top: L.logo.y, left: 0, right: 0, display: 'flex', justifyContent: 'center' } : { position: 'absolute', left: L.logo.x, top: L.logo.y }}>
        <Wordmark size={L.logo.size} compact={!!L.logo.compact} />
      </div>

      <div
        data-b="text"
        style={{
          position: 'absolute', top: L.text.y, width: L.text.w,
          left: center ? (w - L.text.w) / 2 : L.text.x,
          display: 'flex', flexDirection: 'column', gap: L.text.gap,
          alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left',
        }}
      >
        {L.eyebrow && (
          <p style={{ margin: 0, fontFamily: SANS, fontWeight: 600, fontSize: L.eyebrow, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gilt, lineHeight: 1.2 }}>
            {BRAND.copy.eyebrow}
          </p>
        )}
        <p style={{ margin: 0, fontFamily: SERIF, fontSize: L.hl, lineHeight: 0.98, letterSpacing: '-0.01em', color: C.birch, whiteSpace: L.lines ? 'normal' : 'nowrap' }}>
          {lines.map((ln, i) => (
            <span key={i} style={{ display: L.lines ? 'block' : 'inline' }}>{ln}{i < lines.length - 1 ? ' ' : ''}</span>
          ))}
        </p>
        {L.sub && (
          <p style={{ margin: 0, fontFamily: SANS, fontSize: L.sub, lineHeight: 1.45, color: C.mist, maxWidth: L.text.w }}>
            {BRAND.copy.sub}
          </p>
        )}
        {L.signoff && (
          <p style={{ margin: 0, fontFamily: SANS, fontWeight: 500, fontSize: L.signoff, lineHeight: 1.25, color: C.mist }}>
            {BRAND.copy.doohSignoff}
          </p>
        )}
        {L.cta && <Cta cfg={L.cta} style={{ marginTop: L.cta.fs * 0.45, alignSelf: center ? 'center' : 'flex-start' }} />}
        {L.legal.inline && (
          <p style={{ margin: 0, fontFamily: SANS, fontSize: L.legal.fs, lineHeight: 1.3, color: C.birch }}>{BRAND.copy.legal}</p>
        )}
      </div>

      {L.ctaAbs && <Cta cfg={L.ctaAbs} style={{ position: 'absolute', left: L.ctaAbs.x, top: L.ctaAbs.y }} />}

      {!L.legal.inline && (
        <p style={{ position: 'absolute', left: L.legal.x, top: L.legal.y, margin: 0, fontFamily: SANS, fontSize: L.legal.fs, lineHeight: 1.3, color: C.birch, width: L.legal.w, whiteSpace: L.legal.w ? 'normal' : 'nowrap' }}>
          {BRAND.copy.legal}
        </p>
      )}

      {showSafe && safe && <SafeZone w={w} safe={safe} />}
    </div>
  )
}

function SafeZone({ w, safe }) {
  const { top, right, bottom, left } = safe
  const tall = top > 100
  // never thinner than 2.5px at native size, so it reads on the small display units
  const stroke = Math.max(2.5, (w / 300) * 1.5)
  const band = 'repeating-linear-gradient(135deg, rgba(240,90,200,.28) 0 12px, rgba(240,90,200,.08) 12px 24px)'
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {tall && (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: top, background: band }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: bottom, background: band }} />
        </>
      )}
      <div
        style={{
          position: 'absolute', top, right, bottom, left,
          outline: `${stroke}px dashed #FF6AD5`,
          // dark track under the dashes keeps the line visible over light artwork
          boxShadow: `0 0 0 ${stroke}px #17221C`,
        }}
      />
    </div>
  )
}
