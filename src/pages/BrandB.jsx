import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import SpecFrame from '../creative/SpecFrame.jsx'
import FitBox from '../components/FitBox.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import CreativeB from '../brandb/CreativeB.jsx'
import { FORMATS, STORY_AS_RECEIVED } from '../brandb/layoutsB.js'
import { BrandBoard, ClearspaceBoard, UsageTile } from '../brandb/Boards.jsx'
import { BRAND_B, CB } from '../brandb/brandB.js'
import { marketSize } from '../brandb/LogoB.jsx'
import { contrastRatio } from '../lib/contrast.js'
import { I } from '../components/icons.jsx'

const STORY_SAFE = FORMATS.story.safe

// Reads where the logo starts and the copy ends in a rendered Story, in the
// Story's own pixel space, so the safe-zone fix is shown measured, not quoted.
function useStoryBounds() {
  const ref = useRef(null)
  const [b, setB] = useState(null)
  useEffect(() => {
    let alive = true
    const run = () => {
      const root = ref.current?.querySelector('[data-b-root]')
      if (!root) return
      const rr = root.getBoundingClientRect()
      if (!rr.width) { setTimeout(run, 60); return }
      const k = rr.width / FORMATS.story.w
      const logo = root.querySelector('[data-b="logo"] .bw-wordmark').getBoundingClientRect()
      const text = root.querySelector('[data-b="text"]').getBoundingClientRect()
      if (alive) setB({ top: Math.round((logo.top - rr.top) / k), bottom: Math.round((text.bottom - rr.top) / k) })
    }
    document.fonts.ready.then(() => setTimeout(run, 80))
    return () => { alive = false }
  }, [])
  return [ref, b]
}

function SafeVerdict({ b }) {
  if (!b) return <span>Measuring…</span>
  const topOk = b.top >= STORY_SAFE.top
  const botOk = b.bottom <= FORMATS.story.h - STORY_SAFE.bottom
  return (
    <span className="bb-verdict">
      <StatusBadge status={topOk && botOk ? 'pass' : 'fail'} />
      Wordmark starts at {b.top} px, copy ends at {b.bottom} px. The safe band is {STORY_SAFE.top} to {FORMATS.story.h - STORY_SAFE.bottom} px.
    </span>
  )
}

const COLOURS = [
  { k: 'spruce', text: 'birch', textLabel: 'Birch text' },
  { k: 'birch', text: 'bark', textLabel: 'Bark text' },
  { k: 'cranberry', text: 'birch', textLabel: 'Birch CTA label' },
  { k: 'gilt', text: 'spruce', textLabel: 'Spruce monogram' },
  { k: 'bark', text: 'birch', textLabel: 'Birch text' },
]

const SCALE = [
  { f: 'Story 1080 × 1920', lines: '2 lines', px: FORMATS.story.layout.hl },
  { f: 'Square 1080 × 1080', lines: '3 lines', px: FORMATS.square.layout.hl },
  { f: 'Master 1200 × 628', lines: '2 lines', px: FORMATS.master.layout.hl },
  { f: 'Leaderboard 728 × 90', lines: '1 line', px: FORMATS.leaderboard.layout.hl },
]

export default function BrandB() {
  const [safe, setSafe] = useState(false)
  const [rxRef, rx] = useStoryBounds()
  const [fxRef, fx] = useStoryBounds()
  const giltOnBirch = contrastRatio(CB.gilt, CB.birch).toFixed(2)
  const oldLabel = contrastRatio('#7A6E64', '#E4DFD6').toFixed(2)
  const newLabel = contrastRatio('#5A4E45', CB.birch).toFixed(2)

  return (
    <div className="page page-wide bb">
      <PageIntro title="Brand direction B">
        <p>Before the campaign locked, a second identity for Birchway was designed in Claude Design from my direction: a Gloock wordmark with gilt birch-bark rules, an arched frame for holiday photography, and a five-colour palette. I reviewed the file the way I would preflight any incoming brand file, against real platform specs and the same rules the QA checklist uses, and corrected what didn’t pass. Direction A, the leaf and pie system, is the one the rest of this case study adapts.</p>
      </PageIntro>

      <section className="g-section" aria-labelledby="bb-identity">
        <div className="g-head">
          <h2 id="bb-identity">The identity</h2>
          <p>Primary lockup, inverse lockup and monogram, with the seasonal palette. Each swatch now carries the measured contrast of the text colour set on it.</p>
        </div>
        <SpecFrame w={1600} h={1000} maxH={760} alt="Direction B brand board: the Birchway wordmark in Birch on Spruce with gilt birch-bark rules either side of MARKET, the same wordmark in Spruce on Birch, a B monogram on Cranberry and on Gilt, the palette Spruce, Birch, Cranberry, Gilt and Bark with contrast values, and the Gloock and Hanken Grotesk type pairing.">
          <BrandBoard />
        </SpecFrame>
      </section>

      <section className="g-section" aria-labelledby="bb-set">
        <div className="g-head">
          <h2 id="bb-set">The campaign set, corrected</h2>
          <p>The four formats from the file. The arches held empty photo slots, so they carry direction A’s table illustration until licensed photography is supplied.</p>
        </div>
        <div className="toolbar bb-toolbar">
          <label className="check"><input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} /><span>Show safe zones</span></label>
        </div>
        <div className="g-grid bb-set">
          {['master', 'story', 'square', 'leaderboard'].map((k) => {
            const f = FORMATS[k]
            return (
              <figure key={k} className={`g-item bb-${k}`}>
                <SpecFrame w={f.w} h={f.h} maxH={k === 'story' ? 620 : 520} alt={f.alt}>
                  <CreativeB layout={f.layout} w={f.w} h={f.h} safe={f.safe} showSafe={safe} id={`b-${k}`} />
                </SpecFrame>
                <figcaption className="cap">
                  <span className="cap-name">{f.name}</span>
                  <span className="cap-spec">{f.w} × {f.h} px</span>
                  <span className="cap-platform">{f.platform}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </section>

      <section className="g-section" aria-labelledby="bb-review">
        <div className="g-head">
          <h2 id="bb-review">What I changed in the Claude Design file</h2>
          <p>The concept was strong; the production details needed work. The biggest fix is the Story, measured live below with the safe zones drawn in.</p>
        </div>

        <div className="ba-pair bb-story-pair">
          <figure className="ba-fig bb-story-fig" ref={rxRef}>
            <p className="ba-tag ba-tag-before"><I.x />As received</p>
            <SpecFrame w={1080} h={1920} maxH={460} alt="The Story as positioned in the Claude Design file, with safe zones shown: the wordmark sits inside the hatched top band and the button and legal line run into the hatched bottom band.">
              <CreativeB layout={STORY_AS_RECEIVED} w={1080} h={1920} safe={STORY_SAFE} showSafe id="b-story-rx" />
            </SpecFrame>
            <figcaption className="cap"><SafeVerdict b={rx} /></figcaption>
          </figure>
          <div className="ba-arrow" aria-hidden="true">
            <I.arrowRight />
          </div>
          <figure className="ba-fig bb-story-fig" ref={fxRef}>
            <p className="ba-tag ba-tag-after"><I.check />Corrected</p>
            <SpecFrame w={1080} h={1920} maxH={460} alt="The corrected Story with safe zones shown: wordmark, arch, headline, button and legal line all sit between the hatched bands.">
              <CreativeB layout={FORMATS.story.layout} w={1080} h={1920} safe={STORY_SAFE} showSafe id="b-story-fx" />
            </SpecFrame>
            <figcaption className="cap"><SafeVerdict b={fx} /></figcaption>
          </figure>
        </div>

        <ol className="fixes bb-fixes">
          <li>
            <h3>Story safe zones</h3>
            <dl>
              <div><dt>File</dt><dd>Wordmark 180 px from the top, inside the 250 px band Stories reserve for the profile row; button and legal ran into the bottom band.</dd></div>
              <div><dt>Now</dt><dd>Wordmark at {FORMATS.story.layout.logo.y} px and the arch shortened to {FORMATS.story.layout.arch.h} px, so everything sits inside the band.</dd></div>
            </dl>
          </li>
          <li>
            <h3>MARKET line too small</h3>
            <dl>
              <div><dt>File</dt><dd>Set at 9 px on the master and 6.5 px on the leaderboard, below a legible minimum on screen.</dd></div>
              <div><dt>Now</dt><dd>Never below {BRAND_B.marketMinPx} px (master {marketSize(FORMATS.master.layout.logo.size)} px). Where it would be, the compact lockup drops the line, as on the leaderboard.</dd></div>
            </dl>
          </li>
          <li>
            <h3>Label contrast</h3>
            <dl>
              <div><dt>File</dt><dd>Grey labels #7A6E64 on #E4DFD6: {oldLabel}:1, under the 4.5:1 AA minimum.</dd></div>
              <div><dt>Now</dt><dd>#5A4E45 on Birch: {newLabel}:1. Gilt on Birch measures {giltOnBirch}:1, so the file’s rule is extended to all text and the logo.</dd></div>
            </dl>
          </li>
          <li>
            <h3>CTA arrow and copy style</h3>
            <dl>
              <div><dt>File</dt><dd>A typed “→” character in every button, an em dash in the title and all-caps labels throughout.</dd></div>
              <div><dt>Now</dt><dd>A drawn arrow icon that renders the same in every font and isn’t read aloud. Sentence-case labels, no dashes.</dd></div>
            </dl>
          </li>
        </ol>
      </section>

      <section className="g-section bb-guide" aria-labelledby="bb-guide">
        <div className="g-head">
          <h2 id="bb-guide">Guidelines, corrected</h2>
          <p>The file’s one-page guideline sheet, rebuilt as readable text with the corrections folded in.</p>
        </div>

        <div className="bb-guide-grid">
          <div className="bb-guide-block">
            <h3>Logo</h3>
            <FitBox w={640} h={300} alt="Clearspace diagram: the Birchway wordmark inside a dashed gilt box, with x marked on every side.">
              <ClearspaceBoard />
            </FitBox>
            <p>Clearspace equals x, the cap height of the B. Keep type, edges, frames and imagery outside it on every format.</p>
            <dl className="bb-dl">
              <div><dt>Wordmark minimum</dt><dd>100 px wide on screen, 25 mm in print</dd></div>
              <div><dt>MARKET line</dt><dd>{BRAND_B.marketMinPx} px minimum; below that, use the compact lockup</dd></div>
              <div><dt>Monogram</dt><dd>28 px minimum; use it for avatars and square icons</dd></div>
            </dl>
          </div>

          <div className="bb-guide-block">
            <h3>Colour</h3>
            <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Direction B colours">
              <table className="tbl" role="table">
                <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Colour</th><th role="columnheader" scope="col">Role</th><th role="columnheader" scope="col">Share</th><th role="columnheader" scope="col">Text on it</th></tr></thead>
                <tbody role="rowgroup">
                  {COLOURS.map((c) => {
                    const col = BRAND_B.colors[c.k]
                    const r = contrastRatio(CB[c.text], col.hex)
                    return (
                      <tr role="row" key={c.k}>
                        <td role="cell" data-label="Colour"><span className="sw" style={{ background: col.hex }} aria-hidden="true" />{col.name} {col.hex}</td>
                        <td role="cell" data-label="Role">{col.role}</td>
                        <td role="cell" data-label="Share" className="num">{col.share}%</td>
                        <td role="cell" data-label="Text on it" className="num">{c.textLabel}: {r.toFixed(2)}:1</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="bb-share" aria-hidden="true">
              {COLOURS.map((c) => <span key={c.k} style={{ flex: BRAND_B.colors[c.k].share, background: BRAND_B.colors[c.k].hex }} />)}
            </div>
            <p className="bb-note">Share per creative: 55 / 25 / 10 / 6 / 4. Gilt is for rules and eyebrows on Spruce only.</p>
          </div>

          <div className="bb-guide-block">
            <h3>Headline size by format</h3>
            <div className="table-wrap" tabIndex={0} role="region" aria-label="Headline sizes">
              <table className="tbl">
                <thead><tr><th scope="col">Format</th><th scope="col">Lines</th><th scope="col">Size</th></tr></thead>
                <tbody>
                  {SCALE.map((s) => <tr key={s.f}><td>{s.f}</td><td>{s.lines}</td><td className="num">{s.px} px</td></tr>)}
                </tbody>
              </table>
            </div>
            <p className="bb-note">The leaderboard headline drops from 26 to 24 px so the compact wordmark, divider and button keep their clearspace.</p>
          </div>

          <div className="bb-guide-block">
            <h3>Usage</h3>
            <ul className="bb-usage">
              {[
                { k: 'do', ok: true, t: 'Birch on Spruce, with full clearspace.' },
                { k: 'stretch', ok: false, t: 'Don’t stretch or distort the wordmark.' },
                { k: 'gilt', ok: false, t: 'Don’t recolour it or set it on Gilt.' },
                { k: 'rotate', ok: false, t: 'Don’t rotate it or add effects.' },
              ].map((u) => (
                <li key={u.k}>
                  {u.k === 'gilt'
                    ? (
                      // The deliberate low-contrast "don't" is shown as an exported image, like the v1 banner in Creative QA.
                      <FitBox w={320} h={170} alt={u.t}><img src="/exports/BirchwayMarket_DirectionB_Usage_DontGilt.png" width="320" height="170" alt="" style={{ display: 'block' }} /></FitBox>
                    )
                    : <FitBox w={320} h={170} alt={u.t}><UsageTile kind={u.k} /></FitBox>}
                  <p>
                    <span className={`badge ${u.ok ? 'badge-pass' : 'badge-fail'}`}>
                      {u.ok ? <I.check /> : <I.x />}
                      {u.ok ? 'Do' : 'Don’t'}
                    </span>
                    {u.t.replace(/^Don’t /, '').replace(/^./, (c) => c.toUpperCase())}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <aside className="aside-note">
        <h2>Why this chapter exists</h2>
        <p>A production specialist rarely gets a perfect file. Reviewing direction B against the same specs as direction A shows the part of the job that happens before adaptation starts: catching a logo in a Story safe zone or a 6.5 px line of type while it is still one fix in a master file, not nine fixes across a delivered set. See <Link to="/qa">Creative QA</Link> for the checklist those rules come from.</p>
      </aside>
    </div>
  )
}
