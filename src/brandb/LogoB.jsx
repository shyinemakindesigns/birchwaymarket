import { BRAND_B as BRAND, CB as C } from './brandB.js'

const SERIF = "'Gloock', 'Gloock Fallback', Georgia, serif"
const SANS = "'Hanken Grotesk', 'Hanken Grotesk Fallback', system-ui, sans-serif"

// The birch-bark rule: a dashed line whose broken segments echo birch bark.
const bark = (c, dir) =>
  `linear-gradient(${dir}deg, ${c} 0 22%, transparent 22% 30%, ${c} 30% 38%, transparent 38% 50%, ${c} 50% 80%, transparent 80% 88%, ${c} 88% 100%)`

export const marketSize = (size) => Math.max(BRAND.marketMinPx, Math.round(size * 0.21 * 2) / 2)

// Birchway wordmark. `size` is the font size of "Birchway"; the MARKET line
// scales from it but never drops below 8 px. `compact` drops the MARKET line
// for formats where it would fall below that minimum.
export function Wordmark({ size = 42, color = C.birch, accent = C.gilt, compact = false, style }) {
  const rule = Math.max(1, Math.round(size * 0.048 * 2) / 2)
  return (
    <div
      className="bw-wordmark"
     
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch', gap: size * 0.14, color, ...style }}
    >
      <span style={{ fontFamily: SERIF, fontSize: size, lineHeight: 1, whiteSpace: 'nowrap' }}>Birchway</span>
      {!compact && (
        <span style={{ display: 'flex', alignItems: 'center', gap: size * 0.19 }}>
          <span style={{ flex: 1, height: rule, background: bark(accent, 90) }} />
          <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: marketSize(size), letterSpacing: '0.5em', marginRight: '-0.5em', color: accent, lineHeight: 1 }}>
            MARKET
          </span>
          <span style={{ flex: 1, height: rule, background: bark(accent, 270) }} />
        </span>
      )}
    </div>
  )
}

// "B" monogram in a ring: avatars, favicons and anything under 120 px wide.
export function Monogram({ size = 40, fg = C.birch, ring = C.birch, bg = 'transparent', style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: '50%', border: `${Math.max(1.5, size * 0.023)}px solid ${ring}`,
        display: 'inline-grid', placeItems: 'center', boxSizing: 'border-box', background: bg,
        fontFamily: SERIF, fontSize: size * 0.59, lineHeight: 1, color: fg, paddingTop: size * 0.045, flex: 'none', ...style,
      }}
    >
      B
    </span>
  )
}

export default Wordmark
