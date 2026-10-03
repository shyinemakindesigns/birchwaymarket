// Birchway illustration kit: the vector elements behind every creative.
// TableArt composes them into the holiday table; the Brand graphics page
// shows each one on its own, in three colourways, as downloadable SVG.
// Elements draw around their own origin and take x/y/rotation/scale.
export const PIE_C = { crust: '#C98A3D', crustLight: '#DDA552', filling: '#8E1F30', plate: '#E7DCC2', plateRim: '#F6F0E1' }

export function Pear({ x, y, r = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0-62c13 0 17 19 19 35 21 17 27 52 11 75-14 19-46 19-60 0-16-23-10-58 11-75 2-16 6-35 19-35z" fill="#D8B24A" />
      <path d="M-6-40c-6 14-6 24-14 34" stroke="#F0D27A" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".7" />
      <path d="M0-62c0-10 2-17 6-22" stroke="#5B3A1E" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M5-78c12-10 26-8 32-2-10 8-22 9-32 2z" fill="#6E8F5E" />
    </g>
  )
}

export function Clementine({ x, y, r = 34 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#E07B2A" />
      <circle r={r} fill="none" stroke="#C4621B" strokeWidth="2" strokeDasharray="1 6" opacity=".6" />
      <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.22} fill="#F2A15A" opacity=".8" />
      <path d={`M${r * 0.1} ${-r * 0.95}c10-14 28-14 36-8-10 12-26 14-36 8z`} fill="#4E7A4F" />
    </g>
  )
}

export function Berries({ x, y }) {
  const pts = [[0, 0], [18, 6], [8, 20], [-14, 14], [26, 26], [-4, 36], [34, 4]]
  return (
    <g transform={`translate(${x} ${y})`}>
      {pts.map(([bx, by], i) => (
        <g key={i}>
          <circle cx={bx} cy={by} r="10" fill="#9B2335" />
          <circle cx={bx - 3} cy={by - 3} r="2.6" fill="#D96C7A" />
        </g>
      ))}
    </g>
  )
}

export function Rosemary({ x, y, r = 0, len = 150 }) {
  const leaves = []
  for (let i = 10; i < len; i += 13) {
    leaves.push(<ellipse key={`a${i}`} cx={i} cy={-7} rx="9" ry="3" transform={`rotate(-28 ${i} -7)`} fill="#6E8F5E" />)
    leaves.push(<ellipse key={`b${i}`} cx={i + 6} cy={7} rx="9" ry="3" transform={`rotate(28 ${i + 6} 7)`} fill="#5C7E4E" />)
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d={`M0 0 L${len} 0`} stroke="#4A5E3C" strokeWidth="3" strokeLinecap="round" />
      {leaves}
    </g>
  )
}

export function BirchLeaf({ x, y, r = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0-30c14 10 18 24 12 36-4 8-8 11-12 12-4-1-8-4-12-12-6-12-2-26 12-36z" fill="none" stroke="#D8B24A" strokeWidth="3" />
      <path d="M0-24V22" stroke="#D8B24A" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  )
}

export function Pie({ cx = 0, cy = 0, clip }) {
  const crimp = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2
    return <circle key={i} cx={cx + Math.cos(a) * 140} cy={cy + Math.sin(a) * 140} r="14" fill={PIE_C.crust} />
  })
  const strips = [-90, -45, 0, 45, 90]
  return (
    <g>
      <defs>
        <clipPath id={clip}><circle cx={cx} cy={cy} r="128" /></clipPath>
      </defs>
      <circle cx={cx} cy={cy} r="205" fill={PIE_C.plate} />
      <circle cx={cx} cy={cy} r="186" fill="none" stroke={PIE_C.plateRim} strokeWidth="5" />
      <circle cx={cx} cy={cy} r="150" fill={PIE_C.crust} />
      {crimp}
      <circle cx={cx} cy={cy} r="128" fill={PIE_C.filling} />
      <g clipPath={`url(#${clip})`}>
        {strips.map((o) => (
          <rect key={`v${o}`} x={cx + o - 13} y={cy - 140} width="26" height="280" rx="6" fill={PIE_C.crustLight} />
        ))}
        {strips.map((o) => (
          <rect key={`h${o}`} x={cx - 140} y={cy + o - 13} width="280" height="26" rx="6" fill={PIE_C.crust} opacity=".92" />
        ))}
      </g>
    </g>
  )
}

// Standalone framing for each element (viewBox around its own geometry).
export const ELEMENTS = [
  { id: 'pie', name: 'Lattice pie', use: 'The hero element. Always the largest object, centred in the arch or crop.', viewBox: '-212 -212 424 424', draw: (uid) => <Pie clip={`kit-pie-${uid}`} /> },
  { id: 'pear', name: 'Pear', use: 'Pairs flank the pie; tilt between -25° and 25°.', viewBox: '-46 -90 92 170', draw: () => <Pear x={0} y={0} /> },
  { id: 'clementine', name: 'Clementine', use: 'Groups of two or three, varied sizes, toward the edges.', viewBox: '-40 -50 86 92', draw: () => <Clementine x={0} y={0} r={34} /> },
  { id: 'cranberries', name: 'Cranberries', use: 'Clusters of seven fill gaps; never over copy.', viewBox: '-28 -14 76 64', draw: () => <Berries x={0} y={0} /> },
  { id: 'rosemary', name: 'Rosemary sprig', use: 'Diagonal accents that lead the eye toward the pie.', viewBox: '-8 -16 170 32', draw: () => <Rosemary x={0} y={0} len={150} /> },
  { id: 'birch-leaf', name: 'Birch leaf', use: 'Outline only; the brand’s quiet signature in empty space.', viewBox: '-17 -34 34 64', draw: () => <BirchLeaf x={0} y={0} /> },
]
