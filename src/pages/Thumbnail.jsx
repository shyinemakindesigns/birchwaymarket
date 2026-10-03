import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Creative from '../creative/Creative.jsx'
import Logo from '../creative/Logo.jsx'
import { SPECS } from '../data/specs.js'

// Development-only: portfolio thumbnails and the link-preview image, composed
// from the real creatives on proof paper. Captured at 2x by headless Chrome
// (see README, "Thumbnails"). Routes: /__thumb?v=cover | og | square
const INK = '#17221C'
const SPEC = '#0B6585'
const PAPER = '#EDEFE8'
const MUTED = '#4A554E'
const SERIF = "'Young Serif', Georgia, serif"
const SANS = "'Archivo', system-ui, sans-serif"

// A creative at a given display width, with spec-ink dimension lines.
function Proof({ id, x, y, width }) {
  const s = SPECS[id]
  const k = width / s.w
  const h = s.h * k
  const dim = { position: 'absolute', color: SPEC, fontFamily: SANS, fontWeight: 600, fontSize: 13, lineHeight: 1, background: PAPER, padding: '0 6px', whiteSpace: 'nowrap', fontStretch: '87.5%' }
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: width + 30, height: h + 30 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width, height: 18 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 9, borderTop: `1px solid ${SPEC}` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 4, bottom: 4, borderLeft: `1px solid ${SPEC}`, borderRight: `1px solid ${SPEC}` }} />
        <span style={{ ...dim, left: '50%', top: 3, transform: 'translateX(-50%)' }}>{s.w} px</span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 26, width, height: h, overflow: 'hidden', boxShadow: '0 14px 34px -20px rgba(23,34,28,.6)' }}>
        <div style={{ width: s.w, height: s.h, transform: `scale(${k})`, transformOrigin: '0 0' }}><Creative id={id} /></div>
      </div>
      <div style={{ position: 'absolute', left: width + 8, top: 26, width: 18, height: h }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 9, borderLeft: `1px solid ${SPEC}` }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 4, right: 4, borderTop: `1px solid ${SPEC}`, borderBottom: `1px solid ${SPEC}` }} />
        <span style={{ ...dim, left: 9, top: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', padding: '0 6px' }}>{s.h} px</span>
      </div>
    </div>
  )
}

function CropMarks({ w, h, inset = 28, len = 22 }) {
  const c = { position: 'absolute', borderColor: SPEC, borderStyle: 'solid', width: len, height: len }
  return (
    <>
      <div style={{ ...c, left: inset, top: inset, borderWidth: '1.5px 0 0 1.5px' }} />
      <div style={{ ...c, right: inset, top: inset, borderWidth: '1.5px 1.5px 0 0' }} />
      <div style={{ ...c, left: inset, bottom: inset, borderWidth: '0 0 1.5px 1.5px' }} />
      <div style={{ ...c, right: inset, bottom: inset, borderWidth: '0 1.5px 1.5px 0' }} />
    </>
  )
}

function Title({ x, y, w, logo, title, sub, subW, gap = 26 }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, display: 'flex', flexDirection: 'column', gap }}>
      <Logo h={logo} color={INK} markFg="#F6F0E1" markBg="#23483A" />
      <div style={{ fontFamily: SERIF, fontSize: title, lineHeight: 1.02, letterSpacing: '-0.015em', color: INK, textWrap: 'balance' }}>Home for the Holidays</div>
      <div style={{ fontFamily: SANS, fontSize: sub, lineHeight: 1.4, color: MUTED, maxWidth: subW }}>A creative production case study: one master, eight platform specs, measured QA and an HTML5 build.</div>
    </div>
  )
}

const note = (x, y, size = 15) => (
  <div style={{ position: 'absolute', left: x, top: y, fontFamily: SANS, fontSize: size, color: MUTED }}>Fictional brand. Self-directed portfolio case study.</div>
)

const VARIANTS = {
  // 4:3 cover for a portfolio grid card
  cover: { w: 1600, h: 1200, render: () => (
    <>
      <Title x={96} y={110} w={600} logo={40} title={100} sub={27} subW={540} />
      <Proof id="master" x={732} y={110} width={772} />
      <Proof id="s1080x1920" x={732} y={700} width={216} />
      <Proof id="r160x600" x={1000} y={700} width={108} />
      <Proof id="r300x250" x={1160} y={700} width={300} />
      <Proof id="r728x90" x={96} y={700} width={560} />
      {note(96, 1086)}
    </>
  ) },
  // 1.91:1 link preview (og:image)
  og: { w: 1200, h: 630, render: () => (
    <>
      <Title x={64} y={70} w={460} logo={30} title={66} sub={21} subW={430} gap={20} />
      <Proof id="master" x={560} y={56} width={560} />
      <Proof id="r728x90" x={560} y={470} width={560} />
      {note(64, 566, 14)}
    </>
  ) },
  // 1:1 square for social or alternate grids
  square: { w: 1080, h: 1080, render: () => (
    <>
      <Title x={72} y={80} w={880} logo={36} title={86} sub={25} subW={760} gap={22} />
      <Proof id="master" x={72} y={470} width={590} />
      <Proof id="s1080x1920" x={716} y={470} width={270} />
      {note(72, 1000, 14)}
    </>
  ) },
}

export default function Thumbnail() {
  const [params] = useSearchParams()
  const v = VARIANTS[params.get('v')] || VARIANTS.cover
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: PAPER }}>
      <div style={{ position: 'relative', width: v.w, height: v.h, background: PAPER, overflow: 'hidden' }}>
        <CropMarks w={v.w} h={v.h} />
        {v.render()}
      </div>
    </div>
  )
}
