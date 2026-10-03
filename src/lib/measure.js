// Reads a rendered <Creative> back out of the DOM, in the creative's own
// pixel space, so QA checks run against what was actually drawn.
function rgbToHex(rgb) {
  const m = rgb.match(/\d+(\.\d+)?/g)
  if (!m) return null
  const [r, g, b, a] = m.map(Number)
  if (a === 0) return null
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function measureCreative(container, spec) {
  const root = container?.querySelector('[data-qa-root]')
  if (!root) return null
  const rr = root.getBoundingClientRect()
  if (!rr.width) return null
  const scale = rr.width / spec.w
  const boxes = {}
  const styles = {}
  root.querySelectorAll('[data-qa]').forEach((el) => {
    const key = el.dataset.qa
    const r = el.getBoundingClientRect()
    boxes[key] = {
      x: (r.left - rr.left) / scale,
      y: (r.top - rr.top) / scale,
      w: r.width / scale,
      h: r.height / scale,
    }
    const cs = getComputedStyle(el)
    styles[key] = {
      color: rgbToHex(cs.color),
      bg: rgbToHex(cs.backgroundColor),
      font: cs.fontFamily,
      size: parseFloat(cs.fontSize),
    }
  })
  return {
    canvas: { w: Math.round(root.offsetWidth), h: Math.round(root.offsetHeight) },
    rootBg: rgbToHex(getComputedStyle(root).backgroundColor),
    boxes,
    styles,
  }
}
