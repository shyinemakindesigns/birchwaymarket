import { Pear, Clementine, Berries, Rosemary, BirchLeaf, Pie } from './artKit.jsx'

// Illustrated overhead holiday table: lattice cranberry pie on a plate,
// pears, clementines, cranberries, rosemary and birch leaves, composed from
// the illustration kit. Pure SVG so it re-crops cleanly into every adapted
// size. Decorative layer only; each creative's alt text carries the meaning.
export default function TableArt({ idSuffix = 'a' }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true" focusable="false" style={{ display: 'block', overflow: 'visible' }}>
      <Rosemary x={40} y={120} r={-24} len={170} />
      <Rosemary x={430} y={520} r={-38} len={150} />
      <BirchLeaf x={520} y={110} r={30} s={1.3} />
      <BirchLeaf x={70} y={470} r={-20} s={1.1} />
      <BirchLeaf x={560} y={330} r={70} s={0.9} />

      <Pie cx={300} cy={300} clip={`pie-fill-${idSuffix}`} />

      <Pear x={92} y={300} r={-18} s={0.95} />
      <Pear x={500} y={420} r={22} s={0.85} />
      <Clementine x={470} y={150} r={40} />
      <Clementine x={540} y={232} r={30} />
      <Clementine x={140} y={505} r={34} />
      <Berries x={200} y={60} />
      <Berries x={360} y={520} />
    </svg>
  )
}
