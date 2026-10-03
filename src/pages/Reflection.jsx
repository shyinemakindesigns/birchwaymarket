import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { SITE_PAIRS, THEMES, need } from '../data/sitePalette.js'
import { contrastRatio } from '../lib/contrast.js'

const NEXT_TIME = [
  'Get the media owner’s DOOH spec sheet before building, not after. Screen resolution, dwell time and file limits vary by network, and my 10 MB target is an assumption.',
  'Export and weigh every size. On this site only the HTML5 package and the 300 × 250 v1 and v2 JPGs are real, measured files; the other static weights are illustrative.',
  'Build the animated banner in Adobe Animate, or whatever tool the client’s ad server expects, and test the clickTag in that ad server’s preview before trafficking.',
  'Bring legal into round 1 with real copy. The placeholders here only show where that review sits, not what it would find.',
  'Track requests in JIRA rather than this demo board, with the QA checklist attached to each ticket, so every sign-off is recorded against a specific file version.',
]

// In workflow order. Design tools first, then the AI tools and what each one did.
const TOOLS = [
  {
    k: 'Canva',
    d: 'Research and template ideation. Reviewing seasonal grocery and holiday templates for how other campaigns stack headline, offer and CTA, and checking its platform size presets against the IAB and Meta specs before I wrote the spec sheet.',
  },
  {
    k: 'Claude Design',
    d: 'Concept generation from my direction. It produced early routes for the brand and master key visual; I chose the holiday table idea, the spruce and cranberry palette, and the rule that keeps Pear Gold out of text and CTA fills. Brand direction B, the Gloock wordmark and arch system, also came from Claude Design, and I reviewed and corrected it like any incoming brand file.',
  },
  {
    k: 'Adobe Illustrator',
    d: 'Vector work. Refining the logo marks and illustration shapes as clean, scalable vectors before they went into the build.',
  },
  {
    k: 'Figma',
    d: 'Layout and motion design. Arranging the adaptations at true size and prototyping the banner animation (logo reveal, headline fade-in, CTA pulse) with timing that stays inside three loops.',
  },
  {
    k: 'Claude Code',
    d: 'Production and build. It turned my spec sheet, checklist criteria and folder and naming system into code: the eight adapted layouts, the HTML5 banner package, the QA measurement logic and this React site. None of it was hand-built frame by frame.',
  },
]

// The decisions and work that were mine. Each links to where it shows.
const MINE = [
  { k: 'Creative direction', to: '/gallery', d: 'What the campaign says, how each size crops the artwork, and what changes per platform: no button on DOOH, a one-line headline on the leaderboard. Every AI output was accepted or sent back against this.' },
  { k: 'Spec research', to: '/brief', d: 'Real IAB display units, the 150 KB display weight limit, the 30 second and 3 loop animation caps, Meta’s 250 px Story safe zones, and a 5% title-safe margin for screens.' },
  { k: 'QA criteria', to: '/qa', d: 'Which checks exist, their thresholds (clearspace at half the mark height, 4.5:1 for CTA text), which ones block sign-off, and the requirement to show measured values instead of ticks.' },
  { k: 'Asset management', to: '/assets', d: 'The folder structure, the six-segment naming convention and the versioning rules that keep a superseded file from being trafficked.' },
  { k: 'Workflow and prioritisation', to: '/board', d: 'The board stages, the review work-in-progress limit, the priority order and the seven-step process from brief to delivery.' },
  { k: 'Design tool work', to: null, d: 'Research and size presets in Canva, vector refinement in Illustrator, and layout and motion prototyping in Figma. Details in the tools list.' },
  { k: 'Review and sign-off', to: '/brand-direction', d: 'Reviewing each output against the brief before it shipped and sending it back when it missed, including the brand direction B file, a menu bug and a round of creative revisions.' },
]

// The role's responsibilities and key qualifications, mapped to this project.
const ROLE = [
  { r: 'Creative reviews', to: '/brand-direction', where: 'Brand direction B', mine: 'Set the rules incoming files are judged against (safe zones, minimum type size, contrast, colour roles) and decided which corrections to accept.' },
  { r: 'Design builds', to: '/gallery', where: 'Adaptation gallery', mine: 'Defined what changes per size and platform, from crop and headline breaks to dropping the CTA on DOOH, and directed the v1 to v2 revision.' },
  { r: 'Digital asset management', to: '/assets', where: 'Asset management', mine: 'Designed the folder structure, naming convention and versioning rules.' },
  { r: 'Workload management', to: '/board', where: 'Workload board', mine: 'Set the stages, priorities, due dates and the review limit, and made the prioritisation call for the week.' },
  { r: 'Quality control and timely delivery', to: '/qa', where: 'Creative QA', mine: 'Wrote the checklist criteria and pass thresholds, and framed the brief around a deadline window with revision rounds.' },
  { r: 'Collaboration and execution', to: '/process', where: 'Process flow', mine: 'Mapped who owns each step from account brief to platform delivery, and where stakeholder feedback lands.' },
  { r: 'Adobe Creative Suite and Figma', to: null, where: 'Tools list', mine: 'Illustrator for vector refinement, Figma for layout and motion prototyping.' },
  { r: 'HTML, CSS, JavaScript and Adobe Animate', to: '/gallery', where: 'Animated HTML5 banner', mine: 'Specified the animation beats and the IAB weight and loop limits. The hand-off package itself was coded with Claude Code.' },
  { r: 'Accessibility and image optimisation', to: '/qa', where: 'Creative QA and the contrast table', mine: 'Set WCAG 2.1 AA with measured contrast as the bar, and the 150 KB display weight limit.' },
  { r: 'Project management tools (JIRA)', to: '/board', where: 'Workload board', mine: 'Modelled the board on issue-tracker workflow: stages, priorities, due dates and a work-in-progress limit.' },
]

export default function Reflection() {
  return (
    <div className="page">
      <PageIntro title="How this was built">
        <p>What this project was built to prove, which decisions were mine and where AI sped up production, how that maps to the role, and what I’d do differently with a real client.</p>
      </PageIntro>

      <div className="refl">
        <div className="refl-main">
          <h2>What this was built to prove</h2>
          <p>I built Birchway because the job I’m applying for is mostly invisible when it’s done well. Taking an approved creative and making it run correctly everywhere, on time, with nothing off-brand or off-spec, doesn’t show up in a portfolio of finished ads. So I made the production the deliverable: the spec sheet, the checklist, the file system and the board, with the creative as the thing they act on.</p>
          <p>The split, plainly. The decisions a production role is judged on were mine: what each format needs, which specs apply, what the QA checklist tests, and how files are named, filed and tracked. I researched in Canva, refined vectors in Illustrator and prototyped layout and motion in Figma. Claude Design generated concept routes from my direction, and Claude Code did the production build from my specs: it rendered the creatives as code, packaged the HTML5 banner and built this site. None of it was hand-built frame by frame, and the animated banner is a hand-off HTML package standing in for an Adobe Animate export, not an Animate file.</p>
          <p>The decision I’d defend is asking for a QA checklist that measures rather than asserts. It would have been easy to fill a checklist with green ticks. Instead it reads the rendered creative back from the page: canvas size, how far the logo sits from each edge, the colours actually drawn, and contrast computed with the WCAG formula. The seeded first draft fails on its own evidence, with the logo 4 px from the edge and the CTA at 1.78:1, and the same checks pass v2. Eyeballed, that CTA might have gone through: cream type on Pear Gold looks warm and readable until you measure it.</p>

          <h2>My work</h2>
          <dl className="mine">
            {MINE.map((m) => (
              <div key={m.k}>
                <dt>{m.to ? <Link to={m.to}>{m.k}</Link> : m.k}</dt>
                <dd>{m.d}</dd>
              </div>
            ))}
          </dl>

          <h2>Where AI did the work</h2>
          <p>Claude Design produced concept routes and the brand direction B file. Claude Code produced the code: the adapted layouts, the HTML5 banner package, the QA measurement logic, the corrections to direction B and this site. Both worked from my direction, specs and criteria, and nothing went live without my review.</p>
        </div>

        <aside className="refl-side">
          <section className="side-card">
            <h2>With a real client I would</h2>
            <ul className="next-list">
              {NEXT_TIME.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>
          <section className="side-card">
            <h2>Tools actually used</h2>
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

      <section className="role-map" aria-labelledby="role-h">
        <h2 id="role-h">The role, mapped to this project</h2>
        <p className="section-lede">Each responsibility and key qualification in a Creative Production Specialist posting, where it shows in this case study, and my part in it.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Role responsibilities mapped to this project">
          <table className="tbl" role="table">
            <thead role="rowgroup">
              <tr role="row"><th role="columnheader" scope="col">Responsibility</th><th role="columnheader" scope="col">Where it shows</th><th role="columnheader" scope="col">My part</th></tr>
            </thead>
            <tbody role="rowgroup">
              {ROLE.map((x) => (
                <tr role="row" key={x.r}>
                  <td role="cell" data-label="Responsibility"><strong>{x.r}</strong></td>
                  <td role="cell" data-label="Where it shows">{x.to ? <Link to={x.to}>{x.where}</Link> : x.where}</td>
                  <td role="cell" data-label="My part">{x.mine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
