import { useLayoutEffect, useRef, useState } from 'react'

// Scales a fixed-size artboard down to the available width (never up).
// role="img" + alt on the wrapper; the artboard itself is aria-hidden.
export default function FitBox({ w, h, alt, children, className = '' }) {
  const ref = useRef(null)
  const [avail, setAvail] = useState(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    setAvail(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([e]) => setAvail(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const cssW = `min(${w}px, 100%)`
  const scale = avail == null ? null : Math.min(1, avail / w)
  return (
    <div ref={ref} className={`fitbox ${className}`}>
      <div
        role="img"
        aria-label={alt}
        style={{ width: scale == null ? cssW : w * scale, height: scale == null ? `calc(${cssW} * ${(h / w).toFixed(5)})` : h * scale, overflow: 'hidden', containerType: 'inline-size' }}
      >
        <div aria-hidden="true" style={{ width: w, height: h, transformOrigin: '0 0', transform: `scale(${scale == null ? `tan(atan2(100cqw, ${w}px))` : scale})` }}>{children}</div>
      </div>
    </div>
  )
}
