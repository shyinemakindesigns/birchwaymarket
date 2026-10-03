// npm run audit:contrast
// Computes WCAG 2.1 contrast for every site pairing in both themes, plus the
// creative pairings, and exits non-zero if any fails.
import { contrastRatio } from '../src/lib/contrast.js'
import { SITE_PAIRS, THEMES, need } from '../src/data/sitePalette.js'
import { C } from '../src/data/brand.js'

let fails = 0
const line = (ok, r, n, label, fg, bg) => console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (needs ${n})  ${label}  ${fg} on ${bg}`)
for (const [theme, t] of Object.entries(THEMES)) {
  console.log(`\n${theme} theme`)
  for (const [label, fgK, bgK, kind] of SITE_PAIRS) {
    const r = contrastRatio(t[fgK], t[bgK]); const ok = r >= need(kind); if (!ok) fails++
    line(ok, r, need(kind), label, t[fgK], t[bgK])
  }
}
console.log('\ncreatives (same in both themes)')
for (const [label, fg, bg, kind] of [
  ['Headline (large)', C.cream, C.spruce, 'large'],
  ['Supporting copy', C.wheat, C.spruce, 'text'],
  ['CTA label', C.cream, C.cranberry, 'text'],
  ['Legal line', C.cream, C.spruce, 'text'],
]) { const n = kind === 'large' ? 3 : 4.5; const r = contrastRatio(fg, bg); const ok = r >= n; if (!ok) fails++; line(ok, r, n, label, fg, bg) }
console.log('\nbrand direction B (artwork, fixed colours)')
for (const [label, fg, bg, n] of [
  ['Birch text on Spruce', '#F3ECDF', '#1E3A32', 4.5],
  ['Gilt eyebrow on Spruce', '#C9A25E', '#1E3A32', 4.5],
  ['Birch Mist copy on Spruce', '#E6DDCC', '#1E3A32', 4.5],
  ['Birch CTA label on Cranberry', '#F3ECDF', '#9B2F2A', 4.5],
  ['Bark text on Birch', '#2A211C', '#F3ECDF', 4.5],
  ['Board labels on Birch', '#5A4E45', '#F3ECDF', 4.5],
  ['Cranberry labels on Birch', '#9B2F2A', '#F3ECDF', 4.5],
  ['Spruce monogram on Gilt', '#1E3A32', '#C9A25E', 3],
]) { const r = contrastRatio(fg, bg); const ok = r >= n; if (!ok) fails++; line(ok, r, n, label, fg, bg) }
console.log(fails ? `\n${fails} failing pair(s)` : '\nAll pairs pass WCAG 2.1 AA in both themes')
process.exit(fails ? 1 : 0)
