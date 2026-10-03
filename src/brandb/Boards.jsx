import { Wordmark, Monogram } from './LogoB.jsx'
import { BRAND_B, CB } from './brandB.js'
import { contrastRatio } from '../lib/contrast.js'

const SERIF = "'Gloock', 'Gloock Fallback', Georgia, serif"
const SANS = "'Hanken Grotesk', 'Hanken Grotesk Fallback', system-ui, sans-serif"
// Board labels: #5A4E45 on Birch measures 6.85:1 (the file's #7A6E64 on #E4DFD6 was 3.73:1).
const LABEL = '#5A4E45'

const label = (color) => ({ fontFamily: SANS, fontSize: 15, fontWeight: 600, color })

// Brand system board, 1600 × 1000, after the Claude Design file's board 01.
export function BrandBoard() {
  const swatches = [
    { k: 'spruce', fg: CB.birch, wide: true },
    { k: 'birch', fg: CB.bark, wide: true, ring: true },
    { k: 'cranberry', fg: CB.birch, wide: true },
    { k: 'gilt', fg: CB.bark },
    { k: 'bark', fg: CB.birch },
  ]
  return (
    <div style={{ width: 1600, height: 1000, background: CB.birch, display: 'grid', gridTemplateColumns: '960px 1fr', gridTemplateRows: '600px 1fr', overflow: 'hidden', fontFamily: SANS, color: CB.bark }}>
      <div style={{ background: CB.spruce, display: 'grid', placeItems: 'center', position: 'relative' }}>
        <Wordmark size={132} />
        <span style={{ ...label(CB.gilt), position: 'absolute', left: 48, bottom: 40 }}>Primary lockup, Birch on Spruce</span>
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
        <div style={{ display: 'grid', placeItems: 'center', position: 'relative', borderBottom: '1px solid #DCD2C2' }}>
          <Wordmark size={68} color={CB.spruce} accent={CB.cranberry} />
          <span style={{ ...label(LABEL), position: 'absolute', left: 32, bottom: 24 }}>Spruce on Birch</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: CB.cranberry, display: 'grid', placeItems: 'center', position: 'relative' }}>
            <Monogram size={132} />
            <span style={{ ...label(CB.birch), position: 'absolute', left: 24, bottom: 20 }}>Monogram</span>
          </div>
          <div style={{ background: CB.gilt, display: 'grid', placeItems: 'center', position: 'relative' }}>
            <Monogram size={132} fg={CB.spruce} ring={CB.spruce} />
            <span style={{ ...label(CB.spruce), position: 'absolute', left: 24, bottom: 20 }}>Monogram, seal</span>
          </div>
        </div>
      </div>
      <div style={{ padding: 48, display: 'flex', flexDirection: 'column', gap: 20, borderRight: '1px solid #DCD2C2' }}>
        <span style={label(CB.cranberry)}>Seasonal palette, with the contrast of its text colour</span>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr', gap: 12, flex: 1 }}>
          {swatches.map((s) => {
            const c = BRAND_B.colors[s.k]
            const r = contrastRatio(s.fg, c.hex).toFixed(2)
            return (
              <div key={s.k} style={{ background: c.hex, color: s.fg, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 4, boxShadow: s.ring ? 'inset 0 0 0 1px #D6CBB9' : 'none' }}>
                <span style={{ fontFamily: SERIF, fontSize: s.wide ? 26 : 22 }}>{c.name}</span>
                <span style={{ fontSize: 14 }}>{c.hex}</span>
                <span style={{ fontSize: 14 }}>{r}:1</span>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ padding: 48, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={label(CB.cranberry)}>Type pairing</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <span style={{ fontFamily: SERIF, fontSize: 96, lineHeight: 1, color: CB.spruce }}>Aa</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: SERIF, fontSize: 28 }}>Gloock</span>
            <span style={{ fontSize: 16, color: LABEL }}>Display: headlines, wordmark</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <span style={{ fontSize: 72, lineHeight: 1, fontWeight: 500, color: CB.spruce, width: 96 }}>Aa</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>Hanken Grotesk</span>
            <span style={{ fontSize: 16, color: LABEL }}>Eyebrows, copy, CTAs: 400 and 600</span>
          </span>
        </div>
      </div>
    </div>
  )
}

// Clearspace diagram, 640 × 300: x = cap height of the B.
export function ClearspaceBoard() {
  const size = 60
  const x = Math.round(size * BRAND_B.capHeight)
  const guide = 'rgba(201, 162, 94, 0.75)'
  return (
    <div style={{ width: 640, height: 300, background: CB.spruce, display: 'grid', placeItems: 'center' }}>
      <div style={{ position: 'relative', padding: x, border: `1.5px dashed ${CB.gilt}` }}>
        <span style={{ position: 'absolute', left: '50%', top: 0, height: x, width: 1, background: guide }} />
        <span style={{ position: 'absolute', left: 'calc(50% + 6px)', top: x / 2 - 9, fontFamily: SANS, fontSize: 15, fontWeight: 600, color: CB.gilt }}>x</span>
        <span style={{ position: 'absolute', top: '50%', left: 0, width: x, height: 1, background: guide }} />
        <span style={{ position: 'absolute', top: '50%', right: 0, width: x, height: 1, background: guide }} />
        <span style={{ position: 'absolute', left: '50%', bottom: 0, height: x, width: 1, background: guide }} />
        <Wordmark size={size} />
      </div>
    </div>
  )
}

// Usage tiles, 320 × 170 each.
export function UsageTile({ kind }) {
  const base = { width: 320, height: 170, display: 'grid', placeItems: 'center', overflow: 'hidden' }
  if (kind === 'do') return <div style={{ ...base, background: CB.spruce }}><Wordmark size={40} /></div>
  if (kind === 'stretch') return <div style={{ ...base, background: CB.spruce }}><div style={{ transform: 'scaleX(1.45) scaleY(0.8)' }}><Wordmark size={40} /></div></div>
  if (kind === 'gilt') return <div style={{ ...base, background: CB.gilt }}><Wordmark size={40} color={CB.cranberry} accent={CB.birch} /></div>
  return <div style={{ ...base, background: CB.spruce }}><div style={{ transform: 'rotate(-12deg)', filter: `drop-shadow(3px 3px 0 ${CB.cranberry})` }}><Wordmark size={40} /></div></div>
}
