// WCAG 2.1 relative luminance + contrast ratio. Used at runtime by the QA
// checklist so every ratio on the page is computed, never typed in by hand.
function channel(v) {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

export function luminance(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrastRatio(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

// largeText: >= 24px regular or >= 18.66px bold (WCAG "large scale").
export function evaluate(fg, bg, { largeText = false } = {}) {
  const ratio = contrastRatio(fg, bg)
  const threshold = largeText ? 3 : 4.5
  return {
    ratio,
    label: `${ratio.toFixed(2)}:1`,
    threshold,
    pass: ratio >= threshold,
  }
}
