import PageIntro from '../components/PageIntro.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { SITE_PAIRS, THEMES, need } from '../data/sitePalette.js'
import { contrastRatio } from '../lib/contrast.js'

const NEXT_TIME = [
  'Get the media owner’s DOOH spec sheet before building, not after. Screen resolution, dwell time and file limits vary by network, and my 10 MB target is an assumption.',
  'Export and weigh every size. On this site only the HTML5 package and the 300 × 250 v1 and v2 JPGs are real, measured files; the other static weights are illustrative.',
  'Build the animated banner in Adobe Animate, or whatever tool the client’s ad server expects, and test the clickTag in that ad server’s preview before trafficking.',
  'Bring legal into round 1 with real copy. The placeholders here only show where that review sits, not what it would find.',
  'Run the QA checklist inside the DAM or tracker, so every sign-off is recorded against a specific file version rather than in a spreadsheet beside it.',
]

const TOOLS = [
  {
    k: 'Claude Design',
    d: 'Concept generation. Early directions for the Birchway brand and the master key visual, which I chose between and refined. The holiday table idea, the spruce and cranberry palette, and the rule that Pear Gold stays out of text and CTA fills were creative-direction calls I made from those options. Brand direction B, the Gloock wordmark and arch system, is a Claude Design file made from my direction; I reviewed and corrected it like any incoming brand file.',
  },
  {
    k: 'Claude Code',
    d: 'Asset production and the build. It produced the eight adapted layouts as code, the HTML5 banner package, the QA measurement logic and this React site, working from my spec sheet, my checklist criteria and my folder and naming system. None of this was hand-built frame by frame.',
  },
]

const MINE = [
  { k: 'Creative direction', d: 'What the campaign says, how each size crops the artwork, and what changes per platform (no button on DOOH, one-line headline on the leaderboard).' },
  { k: 'Spec research', d: 'Real IAB display units, the 150 KB display weight limit, the 30 second and 3 loop animation caps, Meta’s 250 px Story safe zones, and a 5% title-safe margin for screens.' },
  { k: 'QA criteria', d: 'Which checks exist, their thresholds (clearspace at half the mark height, 4.5:1 for CTA text) and which ones block sign-off.' },
  { k: 'File and workflow system', d: 'The folder structure, the six-segment naming convention and versioning rules, the board stages and the review work-in-progress limit.' },
]

export default function Reflection() {
  return (
    <div className="page">
      <PageIntro title="How this was built">
        <p>What this project was built to prove, who did which part, and what I’d do differently with a real client.</p>
      </PageIntro>

      <div className="refl">
        <div className="refl-main">
          <h2>What this was built to prove</h2>
          <p>I built Birchway because the job I’m applying for is mostly invisible when it’s done well. Taking an approved creative and making it run correctly everywhere, on time, with nothing off-brand or off-spec, doesn’t show up in a portfolio of finished ads. So I made the production the deliverable: the spec sheet, the checklist, the file system and the board, with the creative as the thing they act on.</p>
          <p>To be plain about the split: Claude Design and Claude Code were used for concept generation, asset production and the build itself. That covers the brand mark, the master key visual, all eight adaptations, the HTML5 banner and this site. The animated banner is a hand-off HTML package standing in for an Adobe Animate export; it isn’t an Animate file. What was mine is the part a production role is actually judged on, listed below.</p>
          <p>The decision I’d defend is making the QA checklist measure rather than assert. It would have been easy to fill a checklist with green ticks. Instead it reads the rendered creative back from the page: canvas size, how far the logo sits from each edge, the colours actually drawn, and contrast computed with the WCAG formula. The seeded first draft fails on its own evidence, with the logo 4 px from the edge and the CTA at 1.78:1, and the same code passes v2. If I’d eyeballed that CTA I might have let it through: cream type on Pear Gold looks warm and readable until you measure it. That deliberate v1 button is also the only thing an automated axe-core audit flags anywhere on this site, which is the point of showing it.</p>

          <h2>What was mine</h2>
          <dl className="mine">
            {MINE.map((m) => (
              <div key={m.k}>
                <dt>{m.k}</dt>
                <dd>{m.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="refl-side">
          <section className="side-card">
            <h2>With a real client I would</h2>
            <ul className="next-list">
              {NEXT_TIME.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>
          <section className="side-card">
            <h2>AI tools actually used</h2>
            <dl className="tools">
              {TOOLS.map((t) => (
                <div key={t.k}>
                  <dt>{t.k}</dt>
                  <dd>{t.d}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>

      <section className="audit" aria-labelledby="audit-h">
        <h2 id="audit-h">Contrast on this site, measured</h2>
        <p className="section-lede">Every text and background pairing the site uses, in both the light and dark themes, computed when this page loads. The same list runs as a build script (<code>npm run audit:contrast</code>) that fails if any pair drops below AA.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Site contrast measurements">
          <table className="tbl" role="table">
            <thead role="rowgroup">
              <tr role="row"><th role="columnheader" scope="col">Pairing</th><th role="columnheader" scope="col">Light</th><th role="columnheader" scope="col">Dark</th><th role="columnheader" scope="col">Needs</th><th role="columnheader" scope="col">Result</th></tr>
            </thead>
            <tbody role="rowgroup">
              {SITE_PAIRS.map(([label, fgK, bgK, kind]) => {
                const n = need(kind)
                const cell = (t) => {
                  const fg = THEMES[t][fgK]
                  const bg = THEMES[t][bgK]
                  return { fg, bg, r: contrastRatio(fg, bg) }
                }
                const l = cell('light')
                const d = cell('dark')
                const ok = l.r >= n && d.r >= n
                return (
                  <tr role="row" key={label}>
                    <td role="cell" data-label="Pairing">{label}</td>
                    <td role="cell" data-label="Light" className="num"><span className="sw" style={{ background: l.bg }} aria-hidden="true"><i style={{ background: l.fg }} /></span>{l.r.toFixed(2)}:1</td>
                    <td role="cell" data-label="Dark" className="num"><span className="sw" style={{ background: d.bg }} aria-hidden="true"><i style={{ background: d.fg }} /></span>{d.r.toFixed(2)}:1</td>
                    <td role="cell" data-label="Needs" className="num">{n}:1{kind === 'ui' ? ' (UI)' : ''}</td>
                    <td role="cell" data-label="Result"><StatusBadge status={ok ? 'pass' : 'fail'} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <p className="refl-disclaimer">
        Birchway Market is a fictional brand, and every figure here is illustrative unless it says it was measured. No client names, retailer branding, logos or trademarks appear in this project.
      </p>
    </div>
  )
}
