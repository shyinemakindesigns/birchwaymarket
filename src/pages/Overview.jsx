import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import { PAGES } from '../data/pages.js'
import { SUMMARY, AT_A_GLANCE, PATHS, SKILLS, TOOLS, FAQ } from '../data/overview.js'

const label = (to) => PAGES.find((p) => p.path === to)?.label ?? to

export default function Overview() {
  return (
    <div className="page page-wide ov">
      <PageIntro title="Project overview">
        <p>What this case study is, what it shows I can do, and the quickest route through it for your role.</p>
      </PageIntro>

      <section className="ov-summary" aria-labelledby="ov-what-h">
        <h2 id="ov-what-h">The project</h2>
        {SUMMARY.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        <dl className="ov-glance">
          {AT_A_GLANCE.map((g) => <div key={g.k}><dt>{g.k}</dt><dd>{g.n}</dd></div>)}
        </dl>
      </section>

      <section className="strat-sec" aria-labelledby="ov-paths-h">
        <h2 id="ov-paths-h">Read by role</h2>
        <p className="section-lede">Pick the path that matches what you are hiring for. Each stop says what to look at.</p>
        <ul className="path-grid">
          {PATHS.map((p) => (
            <li key={p.k} className="path-card">
              <h3>{p.k} <span>{p.time}</span></h3>
              <ol>
                {p.steps.map((s) => (
                  <li key={s.to}>
                    <Link to={s.to}>{label(s.to)}</Link>
                    <p>{s.look}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </section>

      <section className="strat-sec" aria-labelledby="ov-skills-h">
        <h2 id="ov-skills-h">What I can do</h2>
        <p className="section-lede">Each skill links to the chapter where it shows.</p>
        <dl className="skill-list">
          {SKILLS.map((s) => (
            <div key={s.k}>
              <dt><Link to={s.to}>{s.k}</Link></dt>
              <dd>{s.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="strat-sec" aria-labelledby="ov-tools-h">
        <h2 id="ov-tools-h">Tools</h2>
        <dl className="tool-list">
          {TOOLS.map((t) => <div key={t.k}><dt>{t.k}</dt><dd>{t.d}</dd></div>)}
        </dl>
        <p className="ds-note">How the work split between me and the AI tools is set out in <Link to="/reflection">How this was built</Link>.</p>
      </section>

      <section className="strat-sec" aria-labelledby="ov-faq-h">
        <h2 id="ov-faq-h">Questions</h2>
        <dl className="faq">
          {FAQ.map((f) => <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>)}
        </dl>
      </section>
    </div>
  )
}
