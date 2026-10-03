import { Pear, Clementine, Berries, Rosemary, BirchLeaf, Pie } from './artKit.jsx'

// Compositions and repeat patterns built only from the illustration kit.
// Each draws in its own viewBox, background included, so the downloaded SVG
// matches what the page shows.
const SPRUCE = '#23483A'
const CREAM = '#F6F0E1'
const WHEAT = '#E9D9A6'
const SPEC = '#0B6585'

export const COMPOSITIONS = [
  {
    id: 'border',
    name: 'Produce frieze',
    size: '1200x240',
    use: 'Leaderboards, email headers and shelf strips. Runs edge to edge and never sits behind copy.',
    wide: true,
    viewBox: '0 0 1200 240',
    draw: () => (
      <>
        <rect width="1200" height="240" fill={SPRUCE} />
        <Rosemary x={24} y={150} r={-14} len={170} />
        <Pear x={262} y={142} r={-12} s={0.9} />
        <Clementine x={372} y={108} r={38} />
        <Clementine x={438} y={170} r={26} />
        <Berries x={510} y={92} />
        <BirchLeaf x={640} y={118} r={25} s={1.4} />
        <Pear x={758} y={140} r={14} s={0.85} />
        <Clementine x={866} y={122} r={34} />
        <Berries x={934} y={150} />
        <Rosemary x={1020} y={176} r={-24} len={150} />
        <BirchLeaf x={1170} y={70} r={-30} s={1} />
      </>
    ),
  },
  {
    id: 'hero',
    name: 'Hero pie',
    size: '600x600',
    use: 'Square and Story masters. The pie carries the frame; garnish stays outside the plate.',
    viewBox: '0 0 600 600',
    draw: (uid) => (
      <>
        <rect width="600" height="600" fill={SPRUCE} />
        <Rosemary x={30} y={110} r={-24} len={160} />
        <Rosemary x={440} y={540} r={-34} len={140} />
        <BirchLeaf x={530} y={90} r={30} s={1.3} />
        <BirchLeaf x={70} y={500} r={-20} s={1.1} />
        <Pie cx={300} cy={300} clip={`scene-hero-${uid}`} />
      </>
    ),
  },
  {
    id: 'corner',
    name: 'Corner garnish',
    size: '600x600',
    use: 'Text-led sizes. The art holds one corner and leaves the copy area clear.',
    viewBox: '0 0 600 600',
    draw: () => (
      <>
        <rect width="600" height="600" fill={CREAM} />
        <Rosemary x={300} y={30} r={18} len={190} />
        <Clementine x={530} y={96} r={46} />
        <Clementine x={448} y={52} r={28} />
        <Berries x={392} y={126} />
        <Pear x={540} y={244} r={24} s={0.8} />
        <Rosemary x={470} y={300} r={-62} len={110} />
        <rect x="48" y="300" width="330" height="252" fill="none" stroke={SPEC} strokeWidth="2" strokeDasharray="8 6" />
        <text x="64" y="330" fill={SPEC} fontFamily="Archivo, system-ui, sans-serif" fontSize="18" fontWeight="600">Copy area</text>
      </>
    ),
  },
  {
    id: 'spot',
    name: 'Spot illustration',
    size: '400x400',
    use: 'Social stickers, email modules and recipe cards. One idea, read at a glance.',
    viewBox: '0 0 400 400',
    draw: () => (
      <>
        <rect width="400" height="400" fill={CREAM} />
        <circle cx="200" cy="200" r="160" fill={WHEAT} />
        <Rosemary x={86} y={312} r={-28} len={150} />
        <Pear x={168} y={214} r={-14} s={1.15} />
        <Clementine x={262} y={254} r={44} />
        <Berries x={238} y={136} />
      </>
    ),
  },
]

// Repeat tiles. Content stays inside the tile so it repeats without seams.
const BARK = [[12, 14, 34], [70, 10, 18], [104, 22, 40], [28, 46, 22], [78, 54, 46], [138, 44, 14], [8, 78, 16], [48, 80, 30], [118, 76, 32]]

export const PATTERNS = [
  {
    id: 'bark',
    name: 'Birch bark',
    w: 160,
    h: 96,
    use: 'Quiet backgrounds behind long copy: receipts, recipe cards, in-store shelf talkers.',
    draw: () => (
      <>
        <rect width="160" height="96" fill={CREAM} />
        {BARK.map(([x, y, w]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height="3.5" rx="1.75" fill={SPRUCE} opacity=".78" />)}
        <path d="M60 30c6 2 10 2 16 0M130 64c5 2 9 2 14 0" stroke={SPRUCE} strokeWidth="1.5" fill="none" opacity=".45" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'scatter',
    name: 'Produce scatter',
    w: 240,
    h: 240,
    use: 'Packaging, tissue paper and social backgrounds where no text sits on top.',
    draw: () => (
      <>
        <rect width="240" height="240" fill={SPRUCE} />
        <BirchLeaf x={172} y={50} r={30} s={1} />
        <Clementine x={176} y={168} r={22} />
        <g transform="translate(26 148) scale(.55)"><Berries x={0} y={0} /></g>
        <g transform="translate(40 40) scale(.5)"><Rosemary x={0} y={0} r={20} len={110} /></g>
        <BirchLeaf x={92} y={204} r={-24} s={0.8} />
        <g transform="translate(110 110) scale(.42)"><Pear x={0} y={0} r={18} /></g>
      </>
    ),
  },
  {
    id: 'lattice',
    name: 'Pie lattice',
    w: 120,
    h: 120,
    use: 'Accent bands, bag liners and the animated banner’s end frame. Never behind text.',
    draw: () => (
      <>
        <rect width="120" height="120" fill="#8E1F30" />
        <rect x="0" y="15" width="120" height="30" rx="6" fill="#C98A3D" />
        <rect x="0" y="75" width="120" height="30" rx="6" fill="#C98A3D" />
        <rect x="15" y="0" width="30" height="120" rx="6" fill="#DDA552" />
        <rect x="75" y="0" width="30" height="120" rx="6" fill="#DDA552" />
        <rect x="15" y="75" width="30" height="30" fill="#C98A3D" />
        <rect x="75" y="15" width="30" height="30" fill="#C98A3D" />
      </>
    ),
  },
]
