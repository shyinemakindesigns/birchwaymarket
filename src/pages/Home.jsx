import { Link } from 'react-router-dom'
import SpecFrame from '../creative/SpecFrame.jsx'
import { PAGES } from '../data/pages.js'
import FileName from '../components/FileName.jsx'

const BLURBS = {
  '/brief': 'The intake ticket: what was asked for, on which platforms, by when.',
  '/gallery': 'The master next to all eight adapted sizes, plus a playable HTML5 banner.',
  '/qa': 'A working QA checklist that measures each file, and one real before and after.',
  '/assets': 'Folder structure, naming convention and a live filename checker.',
  '/board': 'Eight concurrent requests tracked across five stages.',
  '/process': 'How one request moves from brief to delivery in seven steps.',
  '/reflection': 'What was mine, what the AI tools did, and what I would change.',
}

const META = [
  { k: 'Role', v: 'Creative production specialist' },
  { k: 'Scope', v: 'Adaptation, HTML5 build, QA, asset management, workflow' },
  { k: 'Deliverables', v: '1 master, 8 static sizes, 1 animated banner' },
  { k: 'Status', v: 'Self-directed exercise, fictional brand' },
]

export default function Home() {
  return (
    <div className="page page-wide home">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-head">
          <h1 id="page-title" tabIndex={-1} className="hero-title">
            Birchway Market: Home for the Holidays
          </h1>
          <p className="hero-kicker">A production case study</p>
        </div>
        <div className="hero-copy">
          <p className="hero-summary">
            One approved holiday creative, adapted to eight display, social and out-of-home specs, quality-checked, filed and delivered on a six-week schedule.
          </p>
          <Link to="/process" className="btn btn-primary">View the production process</Link>
        </div>
        <figure className="hero-figure">
          <SpecFrame id="master" maxH={760} draw />
          <figcaption className="cap">
            <span className="cap-name">Master key visual</span>
            <span className="cap-file"><FileName name="BirchwayMarket_Holiday2026_Master_1800x1200_v3.psd" /></span>
          </figcaption>
        </figure>
      </section>

      <section className="home-meta" aria-label="Project facts">
        <dl className="meta-grid">
          {META.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="toc" aria-labelledby="toc-h">
        <h2 id="toc-h">In this case study</h2>
        <ol className="toc-list">
          {PAGES.slice(1).map((p) => (
            <li key={p.path}>
              <Link to={p.path} className="toc-link">
                <span className="toc-name">{p.label}</span>
                <span className="toc-blurb">{BLURBS[p.path]}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
