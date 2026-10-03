import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Logo from '../creative/Logo.jsx'
import { LAYERS, LayerArt } from '../creative/kitLayers.jsx'
import { SCENE_MOTION } from '../creative/kitMotion.js'

// Development-only: social assets of the layered diorama, 1080 x 1350 (4:5,
// LinkedIn and Instagram feed). Every value is a function of time t, so a
// capture script can step through frames deterministically:
//   /__social?v=video  window.__setT(seconds) then screenshot, 12 s loop
//   /__social?v=cover  static image
const W = 1080
const H = 1350
const DUR = 12
const INK = '#17221C'
const SPEC = '#0B6585'
const PAPER = '#EDEFE8'
const MUTED = '#4A554E'
const SERIF = "'Young Serif', Georgia, serif"
const SANS = "'Archivo', system-ui, sans-serif"

const clamp = (v) => Math.min(1, Math.max(0, v))
const ease = (v) => { const x = clamp(v); return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2 }
const seg = (t, a, b) => ease((t - a) / (b - a))
const lerp = (a, b, k) => a + (b - a) * k
const FRONT = ['garnish', 'produce', 'pie', 'base']

function timeline(t) {
  const gap = t < 1.6 ? 0 : t < 3.2 ? seg(t, 1.6, 3.2) : t < 9 ? 1 : 1 - seg(t, 9, 10.4)
  let rotZ = -38
  if (t < 1.6) rotZ = lerp(-38, -30, seg(t, 0, 1.6))
  else if (t < 7.2) rotZ = -30
  else if (t < 9) rotZ = lerp(-30, -22, seg(t, 7.2, 9))
  else rotZ = lerp(-22, -38, seg(t, 9, 10.4))
  // Isolation: one layer per second, front to back, with quick crossfades.
  const opacity = {}
  const iso = t >= 3.2 && t < 7.2
  const idx = iso ? Math.min(3, Math.floor(t - 3.2)) : -1
  LAYERS.forEach((l) => {
    if (!iso) { opacity[l.id] = 1; return }
    const into = clamp(Math.min((t - 3.2) / 0.25, (7.2 - t) / 0.25))
    opacity[l.id] = FRONT[idx] === l.id ? 1 : lerp(1, 0.1, into)
  })
  const fade = (a, b) => clamp(Math.min((t - a) / 0.35, (b - t) / 0.35))
  return {
    gap, rotZ, opacity, solo: iso ? FRONT[idx] : null,
    heads: [
      fade(0, 1.6),
      fade(1.6, 3.2),
      fade(3.2, 7.2),
      fade(7.2, 10.4),
      fade(10.4, DUR),
    ],
  }
}

const HEADS = [
  'One master key visual.',
  'Built in four layers.',
  'Each layer, on its own.',
  'Every size reuses the same art.',
  'One master. Eight specs. Measured QA.',
]

function Frame({ t, cover }) {
  const k = timeline(t)
  const heads = cover ? [0, 0, 0, 0, 1] : k.heads
  const gapPx = 12 + k.gap * 92
  return (
    <div style={{ position: 'relative', width: W, height: H, background: PAPER, overflow: 'hidden', fontFamily: SANS, color: INK }}>
      <style>{SCENE_MOTION}</style>
      {[[32, 32, '1.5px 0 0 1.5px'], [null, 32, '1.5px 1.5px 0 0'], [32, null, '0 0 1.5px 1.5px'], [null, null, '0 1.5px 1.5px 0']].map(([l, tp, bw], i) => (
        <div key={i} style={{ position: 'absolute', width: 26, height: 26, borderStyle: 'solid', borderColor: SPEC, borderWidth: bw, left: l ?? undefined, right: l == null ? 32 : undefined, top: tp ?? undefined, bottom: tp == null ? 32 : undefined }} />
      ))}

      <div style={{ position: 'absolute', left: 84, right: 84, top: 84, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo h={46} color={INK} markFg="#F6F0E1" markBg="#23483A" />
        <span style={{ fontSize: 24, fontWeight: 600, color: SPEC, fontStretch: '87.5%' }}>Creative production case study</span>
      </div>

      <div style={{ position: 'absolute', left: 84, right: 84, top: 196, height: 200 }}>
        {HEADS.map((h, i) => (
          <div key={h} style={{ position: 'absolute', inset: 0, fontFamily: SERIF, fontSize: 80, lineHeight: 1.04, letterSpacing: '-0.015em', opacity: heads[i], transform: `translateY(${(1 - heads[i]) * 14}px)`, textWrap: 'balance' }}>{h}</div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 330, height: 800, perspective: 2200 }}>
        <div style={{ position: 'absolute', left: '50%', top: '52%', width: 600, height: 600, transformStyle: 'preserve-3d', transform: `translate(-50%, -50%) rotateX(54deg) rotateZ(${cover ? -26 : k.rotZ}deg)` }}>
          {LAYERS.map((l, i) => (
            <div key={l.id} style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateZ(${(i - 1.5) * (cover ? 100 : gapPx)}px)`, opacity: cover ? 1 : k.opacity[l.id] }}>
              <svg viewBox="0 0 600 600" width="600" height="600" style={{ display: 'block', overflow: 'visible', filter: l.id === 'base' ? 'drop-shadow(0 26px 26px rgba(12,26,19,.38))' : 'drop-shadow(0 8px 7px rgba(12,26,19,.4))' }} aria-hidden="true">
                <LayerArt id={l.id} a clip={`social-pie-${i}`} />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 84, right: 84, top: 1176, height: 60, display: 'flex', alignItems: 'center', gap: 14 }}>
        {(cover ? [] : LAYERS).map((l) => {
          const on = k.solo === l.id
          return (
            <span key={l.id} style={{ fontSize: 22, fontWeight: 600, padding: '8px 14px', borderRadius: 4, border: `1.5px solid ${on ? INK : 'rgba(23,34,28,.25)'}`, background: on ? INK : 'transparent', color: on ? PAPER : MUTED }}>{l.label}</span>
          )
        })}
        {cover && <span style={{ fontSize: 26, color: MUTED }}>1 master, 8 platform specs, 1 HTML5 banner, a reusable vector kit</span>}
      </div>

      <div style={{ position: 'absolute', left: 84, right: 84, bottom: 74, fontSize: 19, color: MUTED }}>Birchway Market is a fictional brand. Self-directed portfolio project.</div>
    </div>
  )
}

export default function Social() {
  const [params] = useSearchParams()
  const cover = params.get('v') === 'cover'
  const [t, setT] = useState(cover ? 0 : Number(params.get('t') || 0))
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    window.__setT = (s) => {
      setT(s)
      document.getAnimations().forEach((a) => { a.pause(); a.currentTime = s * 1000 })
    }
    window.__DUR = DUR
    return () => { document.documentElement.style.overflow = ''; delete window.__setT }
  }, [])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: PAPER }}>
      <Frame t={t} cover={cover} />
    </div>
  )
}
