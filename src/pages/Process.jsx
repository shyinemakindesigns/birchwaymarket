import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import { STEPS } from '../data/process.js'

export default function Process() {
  return (
    <div className="page page-wide">
      <PageIntro title="Process flow">
        <p>How one request moves from brief to platform. Every adaptation on this site went through these seven steps, and the medium rectangle went round steps 4 and 5 twice.</p>
      </PageIntro>

      <ol className="flow">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flow-step">
            <span className="flow-n" aria-hidden="true">{i + 1}</span>
            <h2 className="flow-title"><span className="sr-only">Step {i + 1}: </span>{s.title}</h2>
            <p className="flow-owner"><span className="flow-k">Owner</span> {s.owner}</p>
            <p className="flow-out"><span className="flow-k">Output</span> {s.out}</p>
          </li>
        ))}
      </ol>
      <p className="flow-loop">
        <svg width="28" height="16" viewBox="0 0 28 16" aria-hidden="true"><path d="M26 4H6a4 4 0 0 0 0 8h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M8 8l3 4-3 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -4)" /></svg>
        If a stakeholder round brings changes, the file goes back to step 3 as the next version and runs through internal QA again before anyone else sees it.
      </p>

      <section className="trace" aria-labelledby="trace-h">
        <h2 id="trace-h">Where the evidence lives</h2>
        <ul className="trace-list">
          <li><Link to="/brief">The brief</Link> is step 1, the intake ticket.</li>
          <li><Link to="/gallery">The adaptation gallery</Link> is the output of step 3.</li>
          <li><Link to="/qa">Creative QA</Link> is step 4, including the v1 to v2 loop through step 5.</li>
          <li><Link to="/board">The workload board</Link> tracks every request across steps 3 to 7 at once.</li>
          <li><Link to="/assets">Asset management</Link> is where each step’s files land, ending in 06_Delivered.</li>
        </ul>
      </section>
    </div>
  )
}
