import { C } from '../data/brand.js'

// Birchway Market lockup: a birch leaf in a cream roundel + two-line wordmark.
// `h` is the height of the leaf mark in px; the wordmark scales from it.
// The mark height is also the clearspace unit checked in QA.
export function LeafMark({ size = 40, fg = C.spruce, bg = C.cream }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="32" fill={bg} />
      <path d="M32 11c10.5 8 14.5 17.5 12.4 26.6C42.7 45 37.6 49.6 32 51c-5.6-1.4-10.7-6-12.4-13.4C17.5 28.5 21.5 19 32 11z" fill={fg} />
      <path d="M32 17v38" stroke={bg} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M25.5 29.5h4.5M34 35.5h5.5M25 42h5" stroke={bg} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ qa = false, h = 40, color = C.cream, markFg = C.spruce, markBg = C.cream, stacked = true, style }) {
  return (
    <div className="bw-logo" data-qa={qa ? 'logo' : undefined} style={{ display: 'flex', alignItems: 'center', gap: h * 0.28, color, ...style }}>
      <LeafMark size={h} fg={markFg} bg={markBg} />
      <span style={{ fontFamily: "'Young Serif', 'Young Serif Fallback', Georgia, serif", lineHeight: 0.98, fontSize: stacked ? h * 0.42 : h * 0.5, whiteSpace: 'nowrap', letterSpacing: '0.005em' }}>
        Birchway{stacked ? <br /> : ' '}Market
      </span>
    </div>
  )
}
