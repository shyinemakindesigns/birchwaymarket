import { useLayoutEffect, useRef, useState } from 'react'
import Creative from './Creative.jsx'
import { SPECS } from '../data/specs.js'

// The site's signature device: spec-ink dimension lines drawn around a
// creative, labelled with its true pixel size and the display scale.
export default function SpecFrame({ id, draft = false, showSafe = false, maxH = 560, alt, children, w: wIn, h: hIn, draw = false }) {
  const spec = SPECS[id] || {}
  const w = wIn ?? spec.w
  const h = hIn ?? spec.h
  const ref = useRef(null)
  const [avail, setAvail] = useState(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // measure synchronously before first paint so the frame never renders at
    // zero size and then jumps (layout shift); the observer handles resizes
    setAvail(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([e]) => setAvail(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // leave room for the vertical dimension line on the right (34px)
  const usable = avail == null ? 0 : Math.max(0, avail - 34)
  const scale = avail == null ? 0 : Math.min(1, usable / w, maxH / h)
  const pct = Math.round(scale * 100)

  // Before JS measures (prerendered HTML, first paint), the same size rule is
  // expressed in CSS so the frame already occupies its final box: no layout
  // shift on hydration. The creative is scaled with a unitless ratio derived
  // from container units; JS then takes over with exact pixel values.
  const cssW = `min(${w}px, calc(100% - 34px), ${((maxH * w) / h).toFixed(2)}px)`
  const width = avail == null ? cssW : w * scale
  const height = avail == null ? `calc(${cssW} * ${(h / w).toFixed(5)})` : h * scale
  const innerScale = avail == null ? `tan(atan2(100cqw, ${w}px))` : scale

  return (
    <div ref={ref} className={`spec${draw ? ' spec-draw' : ''}`}>
      <div className="spec-dim spec-dim-x" style={{ width }} aria-hidden="true">
        <span>{w} px</span>
      </div>
      <div className="spec-row">
        <div role="img" aria-label={alt ?? spec.alt} className="spec-art" style={{ width, height }}>
          <div style={{ width: w, height: h, transform: `scale(${innerScale})`, transformOrigin: '0 0' }}>
            {children ?? <Creative id={id} draft={draft} showSafe={showSafe} />}
          </div>
        </div>
        <div className="spec-dim spec-dim-y" style={{ height }} aria-hidden="true">
          <span>{h} px</span>
        </div>
      </div>
      <p className="spec-scale">{avail == null ? 'Scaled to fit' : pct === 100 ? 'Shown at actual size' : `Shown at ${pct}% of actual size`}</p>
    </div>
  )
}
