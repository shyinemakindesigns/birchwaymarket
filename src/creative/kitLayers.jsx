import { Pear, Clementine, Berries, Rosemary, BirchLeaf, Pie } from './artKit.jsx'

// The table art as four stacked layers, back to front.
export const LAYERS = [
  { id: 'base', label: 'Background', d: 'Spruce field with the creative’s inner rule' },
  { id: 'pie', label: 'Pie', d: 'The hero object, always the largest' },
  { id: 'produce', label: 'Produce', d: 'Pears, clementines and cranberries' },
  { id: 'garnish', label: 'Garnish', d: 'Rosemary and birch leaves, outside the plate' },
]


// One layer of the table art, in the 600 x 600 master space. `a` turns on
// element motion; `clip` keeps the pie's clip id unique per instance.
export function LayerArt({ id, a, clip = 'dio-pie' }) {
  if (id === 'base') {
    return (
      <>
        <rect width="600" height="600" rx="10" fill="#23483A" />
        <rect x="18" y="18" width="564" height="564" rx="4" fill="none" stroke="#E9D9A6" strokeWidth="1.5" opacity=".55" />
      </>
    )
  }
  if (id === 'pie') return <Pie cx={300} cy={300} clip={clip} />
  if (id === 'produce') {
    return (
      <>
        <Pear x={92} y={300} r={-18} s={0.95} anim={a} d={0.2} />
        <Pear x={500} y={420} r={22} s={0.85} anim={a} d={1.1} />
        <Clementine x={470} y={150} r={40} anim={a} d={0.5} />
        <Clementine x={540} y={232} r={30} anim={a} d={1.4} />
        <Clementine x={140} y={505} r={34} anim={a} d={0.9} />
        <Berries x={200} y={60} anim={a} d={0.3} />
        <Berries x={360} y={520} anim={a} d={1.2} />
      </>
    )
  }
  return (
    <>
      <Rosemary x={40} y={120} r={-24} len={170} anim={a} d={0.4} />
      <Rosemary x={430} y={520} r={-38} len={150} anim={a} d={1.6} />
      <BirchLeaf x={520} y={110} r={30} s={1.3} anim={a} d={0.1} />
      <BirchLeaf x={70} y={470} r={-20} s={1.1} anim={a} d={1.3} />
      <BirchLeaf x={560} y={330} r={70} s={0.9} anim={a} d={2.1} />
    </>
  )
}

// CSS 3D diorama. Pointer tilt only for a fine pointer with motion allowed;
// everything is written to CSS variables, so React never re-renders on move.
