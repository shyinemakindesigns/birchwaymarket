import { useEffect, useRef, useState } from 'react'
import PageIntro from '../components/PageIntro.jsx'
import FileName from '../components/FileName.jsx'
import { I } from '../components/icons.jsx'
import { Pear, Clementine, Berries, Rosemary, BirchLeaf, Pie, ELEMENTS } from '../creative/artKit.jsx'
import { COMPOSITIONS, PATTERNS } from '../creative/kitScenes.jsx'
import { svgMarkup, downloadText, lineCss } from '../lib/svgExport.js'
import { KIT_MOTION } from '../creative/kitMotion.js'

const TONES = [
  { id: 'full', label: 'Full colour', file: 'Colour', note: 'As drawn, for Spruce backgrounds.' },
  { id: 'line', label: 'Line', file: 'Line', note: 'Spruce outline for light backgrounds, print and one-colour use.', css: lineCss('#23483A') },
  { id: 'reverse', label: 'Reverse line', file: 'Reverse', note: 'Hearth Cream outline for Spruce backgrounds. Transparent file.', css: lineCss('#F6F0E1') },
  { id: 'animated', label: 'Animated', file: 'Animated', note: 'Full colour with a loop for social stickers, email and web. The SVG carries its own animation and stops for reduced motion.' },
]

// The table art as four stacked layers, back to front.
const LAYERS = [
  { id: 'base', label: 'Background', d: 'Spruce field with the creative’s inner rule' },
  { id: 'pie', label: 'Pie', d: 'The hero object, always the largest' },
  { id: 'produce', label: 'Produce', d: 'Pears, clementines and cranberries' },
  { id: 'garnish', label: 'Garnish', d: 'Rosemary and birch leaves, outside the plate' },
]

const fileName = (part, ext = 'svg') => `BirchwayMarket_Holiday2026_Kit_${part}_v1.${ext}`
const pascal = (s) => s.replace(/(^|[\s-])(\w)/g, (_, __, c) => c.toUpperCase()).replace(/[^A-Za-z0-9]/g, '')

function LayerArt({ id }) {
  if (id === 'base') {
    return (
      <>
        <rect width="600" height="600" rx="10" fill="#23483A" />
        <rect x="18" y="18" width="564" height="564" rx="4" fill="none" stroke="#E9D9A6" strokeWidth="1.5" opacity=".55" />
      </>
    )
  }
  if (id === 'pie') return <Pie cx={300} cy={300} clip="dio-pie" />
  if (id === 'produce') {
    return (
      <>
        <Pear x={92} y={300} r={-18} s={0.95} />
        <Pear x={500} y={420} r={22} s={0.85} />
        <Clementine x={470} y={150} r={40} />
        <Clementine x={540} y={232} r={30} />
        <Clementine x={140} y={505} r={34} />
        <Berries x={200} y={60} />
        <Berries x={360} y={520} />
      </>
    )
  }
  return (
    <>
      <Rosemary x={40} y={120} r={-24} len={170} />
      <Rosemary x={430} y={520} r={-38} len={150} />
      <BirchLeaf x={520} y={110} r={30} s={1.3} />
      <BirchLeaf x={70} y={470} r={-20} s={1.1} />
      <BirchLeaf x={560} y={330} r={70} s={0.9} />
    </>
  )
}

// CSS 3D diorama. Pointer tilt only for a fine pointer with motion allowed;
// everything is written to CSS variables, so React never re-renders on move.
function Diorama() {
  const ref = useRef(null)
  const [split, setSplit] = useState(false)
  const [solo, setSolo] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const ok = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let raf = 0
    const move = (e) => {
      if (!ok.matches) return
      const r = el.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * 2 - 1
      const py = ((e.clientY - r.top) / r.height) * 2 - 1
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', px.toFixed(3))
        el.style.setProperty('--py', py.toFixed(3))
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="dio-wrap">
      <div
        ref={ref}
        className={`dio${split ? ' is-split' : ''}${solo ? ' has-solo' : ''}`}
        role="img"
        aria-label={`The holiday table illustration as four stacked layers: background, pie, produce and garnish${split ? ', pulled apart' : ''}.`}
      >
        <div className="dio-float">
          <div className="dio-stage">
            {LAYERS.map((l, i) => (
              <div key={l.id} className={`dio-layer dio-${l.id}${solo === l.id ? ' is-solo' : ''}`} style={{ '--i': i }}>
                <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true" focusable="false"><LayerArt id={l.id} /></svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dio-controls">
        <button type="button" className="btn btn-quiet dio-split" aria-pressed={split} onClick={() => setSplit((v) => !v)}>
          {split ? <I.minus /> : <I.loop />}
          {split ? 'Stack the layers' : 'Pull the layers apart'}
        </button>
        <p className="dio-hint">Layers, front to back. Select one to isolate it.</p>
        <ol className="dio-legend" reversed>
          {[...LAYERS].reverse().map((l) => (
            <li key={l.id}>
              <button type="button" aria-pressed={solo === l.id} onClick={() => setSolo((s) => (s === l.id ? null : l.id))}>
                <span className="dio-legend-k">{solo === l.id && <I.eye />}{l.label}</span>
                <span className="dio-legend-d">{l.d}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function useCopyStatus() {
  const [msg, setMsg] = useState('')
  const timer = useRef(0)
  const say = (m) => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 2600)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  return [msg, say]
}

function Actions({ getSvg, title, file, css, say, what }) {
  const markup = () => svgMarkup(getSvg(), { title, css })
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markup())
      say(`${what} SVG copied to clipboard.`)
    } catch {
      say('Copy failed. Use Download SVG instead.')
    }
  }
  const download = () => {
    downloadText(file, markup())
    say(`${what} downloaded as ${file}.`)
  }
  return (
    <div className="kit-actions">
      <button type="button" className="btn btn-quiet" onClick={download}><I.download />Download SVG<span className="sr-only">, {what}</span></button>
      <button type="button" className="btn btn-quiet" onClick={copy}><I.copy />Copy SVG<span className="sr-only">, {what}</span></button>
    </div>
  )
}

export default function BrandGraphics() {
  const [tone, setTone] = useState('full')
  const [paused, setPaused] = useState(false)
  const [msg, say] = useCopyStatus()
  const refs = useRef({})
  const t = TONES.find((x) => x.id === tone)

  return (
    <div className="page page-wide kit">
      <PageIntro title="Brand graphics">
        <p>The illustration behind every Birchway creative, broken into a reusable vector kit: six elements in three colourways, four ready compositions and three repeat patterns. Every file below is the same vector the creatives are built from, so a new size or channel starts from approved art instead of a redraw.</p>
      </PageIntro>

      <section className="kit-section" aria-labelledby="kit-layers-h">
        <h2 id="kit-layers-h">Built in layers</h2>
        <p className="section-lede">The master is four layers, not one flat image. Each adapted size re-crops and re-spaces the same layers, which is why the leaderboard and the Story frame match without anyone redrawing a pear.</p>
        <Diorama />
      </section>

      <section className="kit-section" aria-labelledby="kit-el-h">
        <div className="kit-head">
          <div>
            <h2 id="kit-el-h">Element library</h2>
            <p className="section-lede">Six vectors, each drawn around its own centre so it can be placed, rotated and scaled without cleanup. {t.note}</p>
          </div>
          <div className="segmented kit-tones" role="group" aria-label="Colourway">
            {TONES.map((x) => (
              <button key={x.id} type="button" className="chip" aria-pressed={tone === x.id} onClick={() => setTone(x.id)}>
                {tone === x.id && <I.check size={13} />}{x.label}
              </button>
            ))}
          </div>
        </div>
        {tone === 'animated' && (
          <p className="kit-motion-bar">
            <button type="button" className="btn btn-quiet" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
              {paused ? <I.play /> : <I.pause />}{paused ? 'Play animations' : 'Pause animations'}
            </button>
          </p>
        )}
        <ul className={`kit-grid kit-tone-${tone}${paused ? ' is-paused' : ''}`}>
          {ELEMENTS.map((el) => {
            const file = fileName(`${pascal(el.name)}${t.file}`)
            return (
              <li key={el.id} className="kit-card">
                <div className="kit-tile">
                  <svg ref={(n) => { refs.current[el.id] = n }} className="kit-art" viewBox={el.viewBox} aria-hidden="true" focusable="false">
                    {tone === 'animated' ? (
                      <>
                        <style>{KIT_MOTION[el.id]}</style>
                        <g className={`kit-anim-${el.id}`}>{el.draw(el.id)}</g>
                      </>
                    ) : el.draw(el.id)}
                  </svg>
                </div>
                <h3>{el.name}</h3>
                <p className="kit-use">{el.use}</p>
                <p className="kit-file"><FileName name={file} /></p>
                <Actions getSvg={() => refs.current[el.id]} title={`Birchway Market ${el.name}, ${t.label.toLowerCase()}`} file={file} css={t.css} say={say} what={`${el.name}, ${t.label.toLowerCase()}`} />
              </li>
            )
          })}
        </ul>
      </section>

      <section className="kit-section" aria-labelledby="kit-comp-h">
        <h2 id="kit-comp-h">Compositions</h2>
        <p className="section-lede">Four arrangements of the same elements for the jobs that come up most: a frieze for wide formats, the hero pie for squares and Stories, a corner treatment for text-led layouts, and a spot for small modules.</p>
        <ul className="comp-grid">
          {COMPOSITIONS.map((c) => {
            const file = fileName(`${pascal(c.name)}_${c.size}`)
            return (
              <li key={c.id} className={`comp-card${c.wide ? ' comp-wide' : ''}`}>
                <figure>
                  <svg ref={(n) => { refs.current[`c-${c.id}`] = n }} viewBox={c.viewBox} className="comp-art" role="img" aria-label={`${c.name} composition`}>
                    {c.draw(c.id)}
                  </svg>
                  <figcaption>
                    <h3>{c.name} <span className="comp-size">{c.size.replace('x', ' × ')}</span></h3>
                    <p className="kit-use">{c.use}</p>
                  </figcaption>
                </figure>
                <Actions getSvg={() => refs.current[`c-${c.id}`]} title={`Birchway Market ${c.name}`} file={file} say={say} what={c.name} />
              </li>
            )
          })}
        </ul>
      </section>

      <section className="kit-section" aria-labelledby="kit-pat-h">
        <h2 id="kit-pat-h">Patterns</h2>
        <p className="section-lede">Seamless tiles for backgrounds, packaging and print. The download is one tile; set it to repeat in any tool.</p>
        <ul className="pat-list">
          {PATTERNS.map((p) => {
            const file = fileName(`${pascal(p.name)}Tile_${p.w}x${p.h}`)
            return (
              <li key={p.id} className="pat-row">
                <div className="pat-meta">
                  <h3>{p.name}</h3>
                  <p className="kit-use">{p.use}</p>
                  <p className="kit-file">Tile {p.w} × {p.h} px</p>
                  <Actions getSvg={() => refs.current[`p-${p.id}`]} title={`Birchway Market ${p.name} pattern tile`} file={file} say={say} what={`${p.name} tile`} />
                </div>
                <svg className="pat-swatch" width="100%" height="100%" role="img" aria-label={`${p.name} pattern, repeating`}>
                  <defs>
                    <pattern id={`pat-${p.id}`} width={p.w} height={p.h} patternUnits="userSpaceOnUse">{p.draw()}</pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#pat-${p.id})`} />
                </svg>
                <svg ref={(n) => { refs.current[`p-${p.id}`] = n }} viewBox={`0 0 ${p.w} ${p.h}`} className="pat-tile-src" aria-hidden="true" focusable="false">{p.draw()}</svg>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="kit-section" aria-labelledby="kit-rules-h">
        <h2 id="kit-rules-h">Rules for the kit</h2>
        <dl className="kit-rules">
          <div><dt>Pear Gold carries no text</dt><dd>Pears and birch leaves are illustration only. Copy never sits on them, matching the brand colour rule the QA checklist enforces.</dd></div>
          <div><dt>Safe zones win</dt><dd>Elements may bleed off the canvas edge but never into a platform safe zone or the logo’s clearspace.</dd></div>
          <div><dt>One hero per frame</dt><dd>The pie is the largest object whenever it appears. Produce and garnish support it and never cross the plate.</dd></div>
          <div><dt>No new colours</dt><dd>Recolour only to the three colourways here. Tints, gradients and effects are off-brand.</dd></div>
          <div><dt>Same naming convention</dt><dd>Kit files use the project’s six-segment names, with Kit in the channel segment and the element and colourway in the spec segment.</dd></div>
        </dl>
      </section>

      <p className="sr-only" role="status">{msg}</p>
      {msg && <p className="kit-toast" aria-hidden="true"><I.check />{msg}</p>}
    </div>
  )
}
