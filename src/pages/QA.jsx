import { useEffect, useId, useMemo, useRef, useState } from 'react'
import PageIntro from '../components/PageIntro.jsx'
import SpecFrame from '../creative/SpecFrame.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import FileName, { MeasuredWeight } from '../components/FileName.jsx'
import { SPECS, ADAPTATIONS } from '../data/specs.js'
import { measureCreative } from '../lib/measure.js'
import { buildChecks } from '../lib/qaChecks.js'
import { evaluate } from '../lib/contrast.js'
import { C } from '../data/brand.js'
import { LAYOUTS, DRAFT_300x250 } from '../creative/layouts.js'

const OPTIONS = [
  { key: 'r300x250@draft', id: 'r300x250', draft: true, label: '300 × 250, v1 first draft' },
  ...ADAPTATIONS.map((id) => ({ key: id, id, draft: false, label: `${SPECS[id].w} × ${SPECS[id].h} ${SPECS[id].name.toLowerCase()}` })),
  { key: 'master', id: 'master', draft: false, label: '1800 × 1200 master' },
]

const DRAFT_ALT = 'First draft of the 300 by 250 banner, version 1, with three numbered QA flags: 1, the logo sits 4 pixels from the top left corner; 2, the headline is set larger than the approved size and crowds the layout; 3, the Shop the holiday table button has cream text on a pear gold fill.'
// The before/after shows the actual exported files (rendered from the live
// layouts via the dev-only /__export route), the way a real proof would.
const V1 = '/exports/BirchwayMarket_Holiday2026_Display_300x250_v1.jpg'
const V2 = '/exports/BirchwayMarket_Holiday2026_Display_300x250_v2.jpg'
const DRAFT_PREVIEW_ALT = 'First draft of the 300 by 250 banner, version 1: logo pushed into the top left corner, an oversized headline "Home for the Holidays", and a "Shop the holiday table" button with cream text on a pear gold fill.'
const FINAL_ALT = 'Corrected 300 by 250 banner, version 2, with three numbered fix markers: 1, the logo moved to 14 pixels from the edges; 2, the headline reset to the approved 25 pixel size; 3, the button changed to a cranberry fill with cream text.'

function useMeasure(ref, spec, key) {
  const [m, setM] = useState(null)
  useEffect(() => {
    let alive = true
    setM(null)
    const run = () => {
      if (!alive) return
      const res = measureCreative(ref.current, spec)
      if (res) setM(res)
      else setTimeout(run, 60)
    }
    // timers rather than rAF, so measuring also completes in throttled tabs
    document.fonts.ready.then(() => setTimeout(run, 80))
    return () => { alive = false }
  }, [key])
  return m
}

function Marker({ n, x, y, kind }) {
  return (
    <span className={`marker marker-${kind}`} style={{ left: x, top: y }}>
      {n}
    </span>
  )
}

export default function QA() {
  const [key, setKey] = useState('r300x250')
  const opt = OPTIONS.find((o) => o.key === key)
  const spec = SPECS[opt.id]
  const previewRef = useRef(null)
  const m = useMeasure(previewRef, spec, key)
  const groups = useMemo(() => buildChecks({ spec, draft: opt.draft, m }), [m, spec, opt.draft])
  const [signed, setSigned] = useState({})
  const selectId = useId()

  const all = groups.flatMap((g) => g.items)
  const counts = all.reduce((a, i) => ({ ...a, [i.status]: (a[i.status] || 0) + 1 }), {})
  const signable = all.filter((i) => i.status !== 'fail' && i.status !== 'pending')
  const signedCount = signable.filter((i) => signed[`${key}:${i.id}`]).length
  const fileName = opt.draft ? spec.file.replace('_v2.', '_v1.') : spec.file

  // values for the before/after call-outs, computed from the same tokens
  const draftCta = evaluate(C.cream, C.pear)
  const finalCta = evaluate(C.cream, C.cranberry)
  const unit = LAYOUTS.r300x250.logo.h / 2

  return (
    <div className="page page-wide">
      <PageIntro title="Creative QA checklist">
        <p>Every file gets the same checklist before a stakeholder sees it. The checks below run against the rendered creative itself: dimensions, element positions and colours are read back from the page, and contrast ratios are computed with the WCAG 2.1 formula, not estimated by eye.</p>
      </PageIntro>

      <section className="qa" aria-labelledby="qa-run">
        <h2 id="qa-run" className="sr-only">Run the checklist</h2>
        <div className="qa-left">
          <div className="field">
            <label htmlFor={selectId}>Asset under review</label>
            <select id={selectId} value={key} onChange={(e) => setKey(e.target.value)}>
              {OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
          <div ref={previewRef} className="qa-preview">
            <SpecFrame key={key} id={opt.id} draft={opt.draft} maxH={420} alt={opt.draft ? DRAFT_PREVIEW_ALT : spec.alt} />
          </div>
          <p className="qa-file"><span>File</span> <FileName name={fileName} /></p>
        </div>

        <div className="qa-right">
          <div className="qa-summary" aria-live="polite">
            {m ? (
              <>
                <p className="qa-counts">
                  {['pass', 'fail', 'placeholder', 'manual', 'na'].map((k) => (
                    <span key={k} className="qa-count"><StatusBadge status={k} /> {counts[k] || 0}</span>
                  ))}
                </p>
                <p className="qa-signed">
                  {signedCount} of {signable.length} checks signed off.
                  {counts.fail ? ` ${counts.fail} failing check${counts.fail > 1 ? 's' : ''} must be fixed and re-versioned before sign-off.` : ''}
                </p>
                <div className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${signedCount / Math.max(1, signable.length)})` }} /></div>
              </>
            ) : (
              <p>Measuring the creative…</p>
            )}
          </div>

          {groups.map((g) => (
            <fieldset key={g.id} className={`qa-group${g.illustrative ? ' qa-illus' : ''}`}>
              <legend>
                {g.title}
                {g.illustrative && <span className="illus-tag"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="2.5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.2 1.8" /></svg>Illustrative placeholder category</span>}
              </legend>
              {g.illustrative && (
                <p className="qa-illus-note">Generic placeholders showing where legal and compliance review sits in the workflow. Not real legal guidance, and no real offer or pricing copy is used.</p>
              )}
              <ul className="qa-list">
                {g.items.map((it) => {
                  const k = `${key}:${it.id}`
                  const cb = `cb-${k.replace(/[^a-z0-9]/gi, '')}`
                  const blocked = it.status === 'fail' || it.status === 'pending'
                  return (
                    <li key={it.id} className={`qa-item qa-${it.status}`}>
                      <div className="qa-item-head">
                        <StatusBadge status={it.status} />
                        <span className="qa-label">{it.label}</span>
                        {it.ratio && (
                          <span className="ratio">
                            <span className="sw" style={{ background: it.swatch[1] }} aria-hidden="true"><i style={{ background: it.swatch[0] }} /></span>
                            {it.ratio}
                          </span>
                        )}
                      </div>
                      <p className="qa-detail" id={`${cb}-d`}>{it.detail}</p>
                      <label className="signoff">
                        <input
                          id={cb}
                          type="checkbox"
                          checked={!!signed[k]}
                          disabled={blocked}
                          aria-describedby={`${cb}-d`}
                          onChange={(e) => setSigned((s) => ({ ...s, [k]: e.target.checked }))}
                        />
                        <span>{it.status === 'pending' ? 'Signed off' : blocked ? 'Sign-off blocked until fixed' : 'Signed off'}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          ))}
          <button type="button" className="btn btn-quiet" onClick={() => setSigned({})}>Clear all sign-offs</button>
        </div>
      </section>

      <section className="ba" aria-labelledby="ba-h">
        <h2 id="ba-h">One real revision: v1 to v2</h2>
        <p className="section-lede">The first draft of the medium rectangle failed five checks, which traced back to three issues. Choose “300 × 250, v1 first draft” in the checklist above to see those fails measured live. Here is each issue, and the fix that went into v2.</p>

        <div className="ba-pair">
          <figure className="ba-fig">
            <p className="ba-tag ba-tag-before"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>Before: v1, 3 flags</p>
            <SpecFrame id="r300x250" maxH={250} alt={DRAFT_ALT}>
              <div style={{ position: 'relative', width: 300, height: 250 }}>
                <img src={V1} width="300" height="250" alt="" style={{ display: 'block' }} />
                <Marker n={1} x={32} y={25} kind="flag" />
                <Marker n={2} x={170} y={52} kind="flag" />
                <Marker n={3} x={196} y={162} kind="flag" />
              </div>
            </SpecFrame>
            <figcaption className="cap"><span className="cap-file"><FileName name="BirchwayMarket_Holiday2026_Display_300x250_v1.jpg" /></span><span className="cap-limit"><MeasuredWeight src={V1} /></span></figcaption>
          </figure>

          <div className="ba-arrow" aria-hidden="true">
            <svg width="48" height="24" viewBox="0 0 48 24"><path d="M2 12h40M34 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>

          <figure className="ba-fig">
            <p className="ba-tag ba-tag-after"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3L11.5 4" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>After: v2, all fixed</p>
            <SpecFrame id="r300x250" maxH={250} alt={FINAL_ALT}>
              <div style={{ position: 'relative', width: 300, height: 250 }}>
                <img src={V2} width="300" height="250" alt="" style={{ display: 'block' }} />
                <Marker n={1} x={2} y={42} kind="fix" />
                <Marker n={2} x={150} y={70} kind="fix" />
                <Marker n={3} x={160} y={160} kind="fix" />
              </div>
            </SpecFrame>
            <figcaption className="cap"><span className="cap-file"><FileName name="BirchwayMarket_Holiday2026_Display_300x250_v2.jpg" /></span><span className="cap-limit"><MeasuredWeight src={V2} /></span></figcaption>
          </figure>
        </div>

        <ol className="fixes">
          <li>
            <h3>Logo too close to the edge</h3>
            <dl>
              <div><dt>v1</dt><dd>Logo placed {DRAFT_300x250.logo.x} px from the top and left edges, inside the {SPECS.r300x250.safe.left} px safe zone and under the {unit} px clearspace rule.</dd></div>
              <div><dt>v2</dt><dd>Moved to {LAYOUTS.r300x250.logo.x} px on both axes: clear of the safe zone, with clearspace of at least half the mark height ({unit} px).</dd></div>
            </dl>
          </li>
          <li>
            <h3>Inconsistent headline size</h3>
            <dl>
              <div><dt>v1</dt><dd>Headline set at {DRAFT_300x250.hl} px. Every other size follows one type scale, and this broke it, pushing the headline into the artwork and the CTA down the frame.</dd></div>
              <div><dt>v2</dt><dd>Reset to the approved {LAYOUTS.r300x250.hl} px for this spec, so the headline wraps the same way it does on the 300 × 600 and 160 × 600.</dd></div>
            </dl>
          </li>
          <li>
            <h3>Low-contrast CTA</h3>
            <dl>
              <div><dt>v1</dt><dd>Cream {C.cream} on Pear Gold {C.pear}: <strong>{draftCta.label}</strong>, under the 4.5:1 minimum for 11.5 px text. Pear Gold is also restricted to illustration in the brand guide.</dd></div>
              <div><dt>v2</dt><dd>Cream on Cranberry {C.cranberry}: <strong>{finalCta.label}</strong>, a pass for normal text, and the approved CTA fill.</dd></div>
            </dl>
          </li>
        </ol>
      </section>
    </div>
  )
}
