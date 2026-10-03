// Motion for the animated colourway. Each rule set is scoped to one
// element's wrapper class and travels inside that element's <svg>, so the
// downloaded file animates on its own. Elements are drawn around (0, 0), so
// rotation pivots sit in user space; reduced motion stops everything.
const base = (id, body) => `
.kit-anim-${id}, .kit-anim-${id} * { transform-box: view-box; }
${body}
@media (prefers-reduced-motion: reduce) { .kit-anim-${id}, .kit-anim-${id} * { animation: none !important; } }`

export const KIT_MOTION = {
  pie: base('pie', `
.kit-anim-pie { animation: kitPieSpin 24s linear infinite; transform-origin: 0 0; }
@keyframes kitPieSpin { to { transform: rotate(360deg); } }`),
  pear: base('pear', `
.kit-anim-pear { animation: kitPearSway 3.2s ease-in-out infinite alternate; transform-origin: 0 -80px; }
@keyframes kitPearSway { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }`),
  clementine: base('clementine', `
.kit-anim-clementine { animation: kitClemBob 2.6s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes kitClemBob { from { transform: translateY(-5px) rotate(-6deg); } to { transform: translateY(5px) rotate(6deg); } }`),
  cranberries: base('cranberries', `
.kit-anim-cranberries g g { transform-box: fill-box; transform-origin: center; animation: kitBerryPop 2.8s cubic-bezier(.16, 1, .3, 1) infinite; }
${[1, 2, 3, 4, 5, 6, 7].map((n) => `.kit-anim-cranberries g g:nth-child(${n}) { animation-delay: ${(n - 1) * 0.16}s; }`).join('\n')}
@keyframes kitBerryPop { 0%, 60%, 100% { transform: scale(1); } 30% { transform: scale(1.18); } }`),
  rosemary: base('rosemary', `
.kit-anim-rosemary { animation: kitRoseSway 3.6s ease-in-out infinite alternate; transform-origin: 0 0; }
@keyframes kitRoseSway { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }`),
  'birch-leaf': base('birch-leaf', `
.kit-anim-birch-leaf { animation: kitLeafFlutter 4s ease-in-out infinite; transform-origin: 0 -30px; }
@keyframes kitLeafFlutter { 0%, 100% { transform: rotate(-10deg) translateX(-2px); } 25% { transform: rotate(6deg) translateX(2px) scaleX(.86); } 50% { transform: rotate(12deg) translateX(3px); } 75% { transform: rotate(-4deg) translateX(-1px) scaleX(.9); } }`),
}

// Scene motion: shared by compositions and the diorama. Classes come from the
// kit's optional motion wrapper (artKit.jsx), so every placed element moves
// around its own origin whatever its position, rotation or scale.
export const SCENE_MOTION = `
.ka, .ka * { transform-box: view-box; }
.ka-pear { animation: kaSway 3.4s ease-in-out infinite alternate; transform-origin: 0 -80px; }
.ka-clementine { animation: kaBob 2.8s ease-in-out infinite alternate; transform-origin: 0 0; }
.ka-berries > g { transform-box: fill-box; transform-origin: center; animation: kaPop 3s cubic-bezier(.16, 1, .3, 1) infinite; }
.ka-rosemary { animation: kaRose 3.8s ease-in-out infinite alternate; transform-origin: 0 0; }
.ka-leaf { animation: kaLeaf 4.2s ease-in-out infinite; transform-origin: 0 -30px; }
.ka-pie { animation: kaSpin 40s linear infinite; }
@keyframes kaSway { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
@keyframes kaBob { from { transform: translateY(-4px) rotate(-5deg); } to { transform: translateY(4px) rotate(5deg); } }
@keyframes kaPop { 0%, 60%, 100% { transform: scale(1); } 30% { transform: scale(1.16); } }
@keyframes kaRose { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
@keyframes kaLeaf { 0%, 100% { transform: rotate(-9deg); } 25% { transform: rotate(5deg) scaleX(.86); } 50% { transform: rotate(11deg); } 75% { transform: rotate(-3deg) scaleX(.9); } }
@keyframes kaSpin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ka, .ka * { animation: none !important; } }`
