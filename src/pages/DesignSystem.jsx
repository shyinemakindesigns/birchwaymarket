import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import PriorityIcon from '../components/PriorityIcon.jsx'
import FileName from '../components/FileName.jsx'
import SpecFrame from '../creative/SpecFrame.jsx'
import Logo, { LeafMark } from '../creative/Logo.jsx'
import { BRAND, C } from '../data/brand.js'
import { SPECS, ADAPTATIONS } from '../data/specs.js'
import { LAYOUTS } from '../creative/layouts.js'
import { THEMES, SITE_PAIRS, need } from '../data/sitePalette.js'
import { TYPE_SCALE, LAYOUT, RHYTHM, RADII, ELEVATION, MOTION, BREAKPOINTS, Z, PRINCIPLES } from '../data/designTokens.js'
import { contrastRatio } from '../lib/contrast.js'
import { I } from '../components/icons.jsx'

const SECTIONS = [
  { id: 'ds-principles', label: 'Principles' },
  { id: 'ds-logo', label: 'Logo' },
  { id: 'ds-brand-colour', label: 'Brand colour' },
  { id: 'ds-brand-type', label: 'Brand type' },
  { id: 'ds-ui-colour', label: 'Interface colour' },
  { id: 'ds-ui-type', label: 'Interface type' },
  { id: 'ds-layout', label: 'Layout and spacing' },
  { id: 'ds-shape', label: 'Shape, depth, motion' },
  { id: 'ds-components', label: 'Components' },
  { id: 'ds-a11y', label: 'Accessibility' },
  { id: 'ds-tokens', label: 'Tokens' },
]

// Creative colour roles: which text colour each swatch carries, measured.
const BRAND_SWATCHES = [
  { k: 'spruce', text: C.cream, textName: 'Hearth Cream headline' },
  { k: 'cream', text: C.spruce, textName: 'on Spruce, reversed' },
  { k: 'cranberry', text: C.cream, textName: 'Hearth Cream CTA label' },
  { k: 'wheat', text: C.spruce, textName: 'on Spruce, as copy' },
  { k: 'pear', text: C.cream, textName: 'never carries text' },
  { k: 'clementine', text: C.cream, textName: 'never carries text' },
]

const UI_SWATCHES = ['paper', 'surface', 'wash', 'ink', 'muted', 'accent', 'spec', 'danger']

function Block({ id, title, lede, children, sub = false }) {
  const H = sub ? 'h3' : 'h2'
  return (
    <section id={id} className={`ds-block${sub ? ' ds-block-sub' : ''}`} aria-labelledby={`${id}-h`}>
      <H id={`${id}-h`}>{title}</H>
      {lede && <p className="ds-lede">{lede}</p>}
      {children}
    </section>
  )
}

function Demo({ title, children, use, states }) {
  return (
    <article className="ds-demo">
      <h3>{title}</h3>
      <div className="ds-stage">{children}</div>
      <dl className="ds-notes">
        {use && <div><dt>Use</dt><dd>{use}</dd></div>}
        {states && <div><dt>States</dt><dd>{states}</dd></div>}
      </dl>
    </article>
  )
}

function CopyButton({ text, label }) {
  const [state, setState] = useState('idle')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('done')
    } catch {
      setState('error')
    }
    setTimeout(() => setState('idle'), 2400)
  }
  return (
    <>
      <button type="button" className="btn btn-quiet" onClick={copy}>
        <I.copy />
        {label}
      </button>
      <span className="ds-copy-status" role="status">{state === 'done' ? 'Copied to clipboard.' : state === 'error' ? 'Copy failed. Select the text and copy it manually.' : ''}</span>
    </>
  )
}

const cssVars = (t) => Object.entries(t)
  .map(([k, v]) => `  --${k.replace(/[A-Z0-9]/g, (m) => `-${m.toLowerCase()}`)}: ${v};`)
  .join('\n')

export default function DesignSystem() {
  const [chip, setChip] = useState('All')
  const [toggled, setToggled] = useState(true)
  const [signed, setSigned] = useState(true)
  const [safe, setSafe] = useState(false)
  const platforms = ['All', 'Display', 'Social', 'DOOH']
  const lowest = SITE_PAIRS
    .filter(([, , , kind]) => kind === 'text')
    .reduce((m, [, f, b]) => Math.min(m, contrastRatio(THEMES.light[f], THEMES.light[b]), contrastRatio(THEMES.dark[f], THEMES.dark[b])), Infinity)
  const cssSnippet = `:root {\n${cssVars(THEMES.light)}\n}\n\n:root[data-theme='dark'] {\n${cssVars(THEMES.dark)}\n}`

  return (
    <div className="page page-wide ds">
      <PageIntro title="Design system">
        <p>The rules behind this case study: the Birchway brand as it appears in the creatives, and the interface system the case study itself is built from. Every component on this page is the real one, working, and every contrast value is computed as the page loads.</p>
      </PageIntro>

      <div className="ds-layout">
        <nav className="ds-nav" aria-label="Design system sections">
          <p className="ds-nav-title">On this page</p>
          <ol>
            {SECTIONS.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>)}
          </ol>
        </nav>

        <div className="ds-content">
          <Block id="ds-principles" title="Principles">
            <dl className="ds-principles">
              {PRINCIPLES.map((p) => <div key={p.k}><dt>{p.k}</dt><dd>{p.d}</dd></div>)}
            </dl>
          </Block>

          <section className="ds-part" aria-labelledby="ds-brand-h">
          <h2 id="ds-brand-h">Brand foundations</h2>
          <p className="ds-lede">How Birchway appears in the creatives. These are the rules the QA checklist enforces.</p>

          <Block sub id="ds-logo" title="Logo" lede="A birch leaf in a Hearth Cream roundel beside a two-line Young Serif wordmark. The leaf mark’s height is the unit for every logo rule.">
            <div className="ds-logo-grid">
              <figure className="ds-logo-tile ds-on-spruce">
                <Logo h={64} />
                <figcaption>Primary, on Spruce</figcaption>
              </figure>
              <figure className="ds-logo-tile ds-on-cream">
                <Logo h={64} color={C.spruce} markFg={C.cream} markBg={C.spruce} />
                <figcaption>Reversed, on Hearth Cream</figcaption>
              </figure>
              <figure className="ds-logo-tile ds-on-spruce ds-clear">
                <div className="ds-clear-box" style={{ padding: 32 }}><Logo h={64} /></div>
                <figcaption>Clearspace: half the mark height on every side</figcaption>
              </figure>
              <figure className="ds-logo-tile ds-on-paper">
                <span className="ds-mins"><LeafMark size={20} fg={C.cream} bg={C.spruce} /><Logo h={24} color={C.spruce} markFg={C.cream} markBg={C.spruce} /></span>
                <figcaption>Minimum: 20 px mark on screen; below that, the mark alone</figcaption>
              </figure>
            </div>
          </Block>

          <Block sub id="ds-brand-colour" title="Brand colour" lede="Six colours. Two are illustration-only and never sit behind text; the QA checklist fails any CTA that uses them.">
            <ul className="ds-swatches">
              {BRAND_SWATCHES.map((s) => {
                const c = BRAND.colors[s.k]
                const r = contrastRatio(s.text, c.hex)
                const textOk = !c.role.startsWith('Illustration')
                return (
                  <li key={s.k}>
                    <span className="ds-chip-lg" style={{ background: c.hex, color: textOk ? s.text : 'transparent' }} aria-hidden="true">{textOk ? 'Aa' : ''}</span>
                    <span className="ds-sw-name">{c.name}</span>
                    <span className="ds-sw-hex">{c.hex}</span>
                    <span className="ds-sw-role">{c.role}</span>
                    <span className="ds-sw-ratio">{textOk ? <>{r.toFixed(2)}:1, {s.textName}</> : <>Illustration only: {s.textName}</>}</span>
                  </li>
                )
              })}
            </ul>
          </Block>

          <Block sub id="ds-brand-type" title="Brand type" lede="Young Serif for headlines, Archivo for everything else. Headline sizes are fixed per format, and QA checks each file against this table.">
            <div className="ds-type-pair">
              <div><span className="ds-aa ds-serif">Aa</span><p><strong>Young Serif</strong><br />Headlines and wordmark</p></div>
              <div><span className="ds-aa ds-sans">Aa</span><p><strong>Archivo</strong><br />Copy, CTA, legal; variable weight and width</p></div>
            </div>
            <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Headline size by format">
              <table className="tbl" role="table">
                <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Format</th><th role="columnheader" scope="col">Spec</th><th role="columnheader" scope="col">Headline</th><th role="columnheader" scope="col">Supporting copy</th></tr></thead>
                <tbody role="rowgroup">
                  {['master', ...ADAPTATIONS].map((id) => (
                    <tr role="row" key={id}>
                      <td role="cell" data-label="Format">{SPECS[id].name}</td>
                      <td role="cell" data-label="Spec" className="num">{SPECS[id].w} × {SPECS[id].h}</td>
                      <td role="cell" data-label="Headline" className="num">{LAYOUTS[id].hl} px</td>
                      <td role="cell" data-label="Supporting copy" className="num">{LAYOUTS[id].sub ? `${LAYOUTS[id].sub} px` : LAYOUTS[id].signoff ? `${LAYOUTS[id].signoff} px sign-off` : 'None'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          </section>

          <section className="ds-part" aria-labelledby="ds-ui-h">
          <h2 id="ds-ui-h">Interface foundations</h2>
          <p className="ds-lede">The system this case study is built from: proof paper, spec ink and a small set of tokens.</p>

          <Block sub id="ds-ui-colour" title="Interface colour" lede="Semantic tokens with light and dark values. The site follows the visitor’s system setting, with a switch in the menu.">
            <ul className="ds-tokens">
              {UI_SWATCHES.map((k) => (
                <li key={k}>
                  <span className="ds-pair" aria-hidden="true">
                    <span style={{ background: THEMES.light[k] }} />
                    <span style={{ background: THEMES.dark[k] }} />
                  </span>
                  <code>--{k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}</code>
                  <span className="ds-tok-val">{THEMES.light[k]} / {THEMES.dark[k]}</span>
                </li>
              ))}
            </ul>
            <p className="ds-note">Lowest text contrast across both themes: <strong>{lowest.toFixed(2)}:1</strong>. The full pair list is on <Link to="/reflection">How this was built</Link>.</p>
          </Block>

          <Block sub id="ds-ui-type" title="Interface type" lede="A 1.25 ratio scale from a 17 px body. Page titles are fluid; everything else is fixed.">
            <ul className="ds-scale">
              {TYPE_SCALE.map((t) => (
                <li key={t.token}>
                  <span className={`ds-scale-sample ${t.serif ? 'ds-serif' : ''}`} style={{ fontSize: `min(${t.px}px, ${t.serif ? 9 : 7}vw)` }}>{t.sample}</span>
                  <span className="ds-scale-meta"><code>{t.token}</code> {t.size}. {t.use}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block sub id="ds-layout" title="Layout and spacing">
            <div className="ds-two">
              <dl className="ds-dl">
                {LAYOUT.map((l) => <div key={l.token}><dt><code>{l.token}</code></dt><dd><strong>{l.value}</strong>. {l.use}</dd></div>)}
              </dl>
              <dl className="ds-dl">
                {RHYTHM.map((r) => <div key={r.value}><dt>{r.value}</dt><dd>{r.use}</dd></div>)}
              </dl>
            </div>
            <h4 className="ds-sub">Breakpoints</h4>
            <ol className="ds-bps">
              {BREAKPOINTS.map((b) => <li key={b.name}><strong>{b.name}</strong><span>{b.range}</span><span className="ds-bp-notes">{b.notes}</span></li>)}
            </ol>
            <p className="ds-note">Layouts change where the content needs them to, so a few components use their own break points between these tiers. Every page is checked for horizontal overflow from 320 to 1920 px.</p>
          </Block>

          <Block sub id="ds-shape" title="Shape, depth and motion">
            <div className="ds-three">
              <div>
                <h4 className="ds-sub">Corner radius</h4>
                <ul className="ds-radii">
                  {RADII.map((r) => <li key={r.token}><span className="ds-radius" style={{ borderRadius: r.value }} aria-hidden="true" /><code>{r.token}</code> {r.value}<br /><span>{r.use}</span></li>)}
                </ul>
              </div>
              <div>
                <h4 className="ds-sub">Depth</h4>
                <dl className="ds-dl">
                  {ELEVATION.map((e) => <div key={e.name}><dt>{e.name}</dt><dd><code>{e.value}</code><br />{e.use}</dd></div>)}
                </dl>
              </div>
              <div>
                <h4 className="ds-sub">Motion</h4>
                <dl className="ds-dl">
                  {MOTION.map((m) => <div key={m.name}><dt>{m.name}</dt><dd><code>{m.value}</code><br />{m.use}</dd></div>)}
                </dl>
              </div>
            </div>
            <h4 className="ds-sub">Layering</h4>
            <p className="ds-inline-tokens">{Z.map((z) => <span key={z.token}><code>{z.token}</code> {z.value}, {z.use.toLowerCase()}</span>)}</p>
          </Block>

          </section>

          <Block id="ds-components" title="Components" lede="The working components from across the case study. Try them with a keyboard: every one is reachable with Tab and shows the focus ring.">
            <div className="ds-demos">
              <Demo title="Buttons" use="Primary for the one main action on a view. Quiet for secondary actions. Labels name the action and never wrap. Corners are 4 px, like every control." states="Hover darkens or fills; pressed nudges 1 px; disabled turns dashed and muted; focus shows the spec-ink ring.">
                <div className="ds-row">
                  <button type="button" className="btn btn-primary">View the production process</button>
                  <button type="button" className="btn btn-quiet">Clear all sign-offs</button>
                  <button type="button" className="btn btn-quiet" disabled>Replay</button>
                </div>
              </Demo>

              <Demo title="Segmented filter and checkbox" use="The segmented filter narrows a view to one option; a checkbox switches an overlay on or off." states="aria-pressed carries the filter state; the active option inverts and shows a check mark, so it never relies on colour alone. The checkbox is a native input.">
                <div><div className="segmented" role="group" aria-label="Example platform filter">
                  {platforms.map((p) => <button key={p} type="button" className="chip" aria-pressed={chip === p} onClick={() => setChip(p)}>{chip === p && <I.check size={13} />}{p}</button>)}
                </div></div>
                <div className="ds-row">
                  <label className="check"><input type="checkbox" checked={toggled} onChange={(e) => setToggled(e.target.checked)} /><span>Show safe zones</span></label>
                </div>
              </Demo>

              <Demo title="Status and priority" use="Status badges report a check result; priority uses shape and word together." states="Six statuses, three priorities. Each pairs an icon with a word.">
                <div className="ds-row">
                  {['pass', 'fail', 'placeholder', 'manual', 'pending', 'na'].map((s) => <StatusBadge key={s} status={s} />)}
                </div>
                <div className="ds-row">
                  {['high', 'medium', 'low'].map((p) => <span key={p} className={`prio prio-${p}`}><PriorityIcon level={p} />{p[0].toUpperCase() + p.slice(1)}</span>)}
                </div>
              </Demo>

              <Demo title="Form fields" use="Visible labels above every field; hints sit between label and input and are tied to it with aria-describedby." states="Focus shows the ring and a spec-ink border; disabled checkboxes say why in their label.">
                <div className="ds-form">
                  <div className="field">
                    <label htmlFor="ds-select">Asset under review</label>
                    <select id="ds-select" defaultValue="r300x250">
                      {ADAPTATIONS.slice(0, 4).map((id) => <option key={id} value={id}>{SPECS[id].w} × {SPECS[id].h} {SPECS[id].name.toLowerCase()}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="ds-input">Check a filename</label>
                    <input id="ds-input" type="text" defaultValue="BirchwayMarket_Holiday2026_Display_300x250_v2.jpg" spellCheck={false} />
                  </div>
                  <label className="signoff"><input type="checkbox" checked={signed} onChange={(e) => setSigned(e.target.checked)} /><span>Signed off</span></label>
                  <label className="signoff"><input type="checkbox" disabled /><span>Sign-off blocked until fixed</span></label>
                </div>
              </Demo>

              <Demo title="Workload card" use="One request per card: ID, priority, title, platform, due date and a move control." states="Urgent due dates add a warning icon and the danger colour; moving a card keeps keyboard focus on it.">
                <div className="ds-card-wrap">
                  <div className="card">
                    <div className="card-top"><span className="card-id">BWM-201</span><span className="prio prio-high"><PriorityIcon level="high" />High</span></div>
                    <h4 className="card-title">Medium rectangle 300 × 250: fix CTA contrast, logo clearspace, headline size</h4>
                    <div className="card-meta">
                      <span className="tag"><I.display />Display</span>
                      <span className="due due-urgent"><I.warning /><time dateTime="2026-11-02">Nov 2</time><span className="due-rel">Due tomorrow</span></span>
                    </div>
                  </div>
                </div>
              </Demo>

              <Demo title="Filename" use="Filenames break after underscores, never mid-segment, so long names stay readable on phones." states="Static text; no states.">
                <p className="ds-filename"><FileName name="BirchwayMarket_Holiday2026_Animated_300x250_v1_Backup.jpg" /></p>
              </Demo>

              <Demo title="Spec frame" use="Shows a creative at its true pixel size with spec-ink dimension lines, scaled to fit and never upscaled. Used for every creative on the site." states="Safe zone overlay on demand; the scale note updates as the frame resizes.">
                <div className="ds-row"><label className="check"><input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} /><span>Show safe zone</span></label></div>
                <div className="ds-spec"><SpecFrame id="r300x250" showSafe={safe} maxH={250} /></div>
              </Demo>
            </div>
          </Block>

          <Block id="ds-a11y" title="Accessibility" lede="WCAG 2.1 AA is the floor, checked by script rather than by eye.">
            <ul className="ds-checks">
              <li><StatusBadge status="pass" /><span><strong>Contrast.</strong> Every text pair is at least 4.5:1 in both themes (lowest {lowest.toFixed(2)}:1). <code>npm run audit:contrast</code> fails the build otherwise.</span></li>
              <li><StatusBadge status="pass" /><span><strong>Focus.</strong> A 3 px spec-ink ring with a 3 px offset on light surfaces, Wheat on dark ones. Never removed.</span></li>
              <li><StatusBadge status="pass" /><span><strong>Touch targets.</strong> Interactive controls are at least 44 px tall.</span></li>
              <li><StatusBadge status="pass" /><span><strong>Appearance.</strong> The header button and Alt+Shift+L (⌥⇧L on Mac) cycle System, Light and Dark; System follows the device live. The tooltip shows on hover and keyboard focus, and each change is announced.</span></li>
              <li><StatusBadge status="pass" /><span><strong>Meaning.</strong> Status, priority and urgency always pair an icon and a word with their colour.</span></li>
              <li><StatusBadge status="pass" /><span><strong>Motion.</strong> With reduced motion on, slides become fades and the banner shows its end frame.</span></li>
              <li><StatusBadge status="pass" /><span><strong>Structure.</strong> One h1 per page, a skip link, labelled landmarks, alt text on every creative, and focus moved to the new heading on navigation.</span></li>
            </ul>
          </Block>

          <Block id="ds-tokens" title="Tokens" lede="The interface colour tokens as CSS custom properties, and the whole system as a JSON file.">
            <div className="ds-row">
              <a className="btn btn-primary" href="/birchway-tokens.json" download>
                <I.download />
                Download tokens (JSON)
              </a>
              <CopyButton text={cssSnippet} label="Copy CSS variables" />
            </div>
            <pre className="ds-code" tabIndex={0} aria-label="CSS custom properties"><code>{cssSnippet}</code></pre>
          </Block>
        </div>
      </div>
    </div>
  )
}
