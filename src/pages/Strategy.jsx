import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import { I } from '../components/icons.jsx'
import { OBJECTIVE, SEGMENTS, RESEARCH, COMPETITORS, POSITIONING, CHANNELS, FLIGHT, FORECAST, TESTS } from '../data/strategy.js'

const nf = new Intl.NumberFormat('en-CA')
const cf = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })
const pf = (v) => `${(v * 100).toFixed(v < 0.01 ? 2 : 1)}%`

function forecast(budget, m) {
  const rows = FORECAST.channels.map((c) => {
    const spend = budget * c.share
    const impressions = c.model === 'cpm' ? (spend / c.cpm) * 1000 : null
    const clicks = c.model === 'cpm' ? impressions * c.ctr * m : spend / c.cpc
    const sessions = clicks * FORECAST.arrival
    const conversions = sessions * c.cvr * m
    return { ...c, spend, impressions, clicks, sessions, conversions }
  })
  const sum = (k) => rows.reduce((t, r) => t + (r[k] || 0), 0)
  return { rows, total: { spend: sum('spend'), impressions: sum('impressions'), clicks: sum('clicks'), sessions: sum('sessions'), conversions: sum('conversions') } }
}

function Forecast() {
  const [budget, setBudget] = useState(FORECAST.budget)
  const [scenario, setScenario] = useState('Planned')
  const m = FORECAST.scenarios.find((s) => s.k === scenario).m
  const { rows, total } = forecast(budget, m)
  const n = (v) => (v == null ? 'n/a' : nf.format(Math.round(v)))
  return (
    <div className="fc">
      <div className="fc-controls">
        <label className="fc-field">
          <span>Media budget (CAD)</span>
          <input type="number" inputMode="numeric" min="10000" max="2000000" step="5000" value={budget} onChange={(e) => setBudget(Math.min(2000000, Math.max(0, Number(e.target.value) || 0)))} />
        </label>
        <div className="fc-field">
          <span id="fc-sc">Scenario</span>
          <div className="segmented" role="group" aria-labelledby="fc-sc">
            {FORECAST.scenarios.map((s) => (
              <button key={s.k} type="button" className="chip" aria-pressed={scenario === s.k} onClick={() => setScenario(s.k)}>
                {scenario === s.k && <I.check size={13} />}{s.k}
              </button>
            ))}
          </div>
        </div>
      </div>

      <dl className="fc-totals" aria-live="polite">
        <div><dt>Paid impressions</dt><dd>{n(total.impressions)}</dd></div>
        <div><dt>Clicks</dt><dd>{n(total.clicks)}</dd></div>
        <div><dt>Landing-page sessions</dt><dd>{n(total.sessions)}</dd></div>
        <div><dt>Conversions</dt><dd>{n(total.conversions)}</dd></div>
      </dl>

      <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Forecast by channel">
        <table className="tbl" role="table">
          <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col">Channel</th>
              <th role="columnheader" scope="col">Spend</th>
              <th role="columnheader" scope="col">Rate assumptions</th>
              <th role="columnheader" scope="col">Impressions</th>
              <th role="columnheader" scope="col">Clicks</th>
              <th role="columnheader" scope="col">Conversions</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {rows.map((r) => (
              <tr role="row" key={r.k}>
                <td role="cell" data-label="Channel"><strong>{r.k}</strong></td>
                <td role="cell" data-label="Spend" className="num">{cf.format(r.spend)}</td>
                <td role="cell" data-label="Rate assumptions" className="fc-rates">
                  {r.model === 'cpm' ? `CPM ${cf.format(r.cpm)}` : `CPC $${r.cpc.toFixed(2)}`}
                  {r.model === 'cpm' && r.ctr > 0 && `, CTR ${pf(r.ctr * m)}`}
                  {r.cvr > 0 ? `, CVR ${pf(r.cvr * m)}` : ', reach only'}
                </td>
                <td role="cell" data-label="Impressions" className="num">{n(r.impressions)}</td>
                <td role="cell" data-label="Clicks" className="num">{r.clicks ? n(r.clicks) : 'n/a'}</td>
                <td role="cell" data-label="Conversions" className="num">{r.conversions ? n(r.conversions) : 'Brand lift'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="fc-method">
        <strong>Method.</strong> Impressions = spend ÷ CPM × 1,000. Clicks = impressions × CTR (search: spend ÷ CPC). Sessions = clicks × {Math.round(FORECAST.arrival * 100)}% arrival rate. Conversions = sessions × CVR, where a conversion is a store-finder visit, flyer view or online order start. Conservative and Stretch scale CTR and CVR by 0.75 and 1.25.
      </p>
      <p className="fc-warn"><I.warning /> Illustrative forecast. The rates are placeholder planning assumptions to show the method, not benchmarks or results. A real plan replaces them with the account’s own historical rates.</p>
    </div>
  )
}

const SECTIONS = [
  ['st-objective', 'Objective'],
  ['st-audience', 'Audience'],
  ['st-research', 'Market research'],
  ['st-competitors', 'Competitor analysis'],
  ['st-positioning', 'Positioning'],
  ['st-channels', 'Platform plan'],
  ['st-forecast', 'Performance forecast'],
  ['st-tests', 'Test plan'],
]

export default function Strategy() {
  return (
    <div className="page page-wide strat">
      <PageIntro title="Marketing strategy">
        <p>The thinking the brief sits on: who the campaign is for, what research would prove it, where competitors leave room, which platforms do which job, and how traffic and conversions would be forecast and tested. Audience insights are framed as hypotheses with the method that would test them, because no real market data was gathered for a fictional brand.</p>
      </PageIntro>

      <nav className="jump" aria-label="On this page">
        <ol>{SECTIONS.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ol>
      </nav>

      <section id="st-objective" className="strat-sec" aria-labelledby="st-objective-h">
        <h2 id="st-objective-h">Objective</h2>
        <dl className="kv-rows">
          <div><dt>Business goal</dt><dd>{OBJECTIVE.business}</dd></div>
          <div><dt>Marketing goal</dt><dd>{OBJECTIVE.marketing}</dd></div>
          <div><dt>Market and audience</dt><dd>{OBJECTIVE.market}</dd></div>
        </dl>
      </section>

      <section id="st-audience" className="strat-sec" aria-labelledby="st-audience-h">
        <h2 id="st-audience-h">Audience</h2>
        <p className="section-lede">Three planning segments inside the brief’s audience. They are working hypotheses to validate with loyalty data or a short survey, not research findings.</p>
        <ul className="seg-grid">
          {SEGMENTS.map((s) => (
            <li key={s.k} className="seg-card">
              <h3>{s.k}</h3>
              <p>{s.who}</p>
              <dl>
                <div><dt>Needs</dt><dd>{s.need}</dd></div>
                <div><dt>What moves them</dt><dd>{s.lever}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section id="st-research" className="strat-sec" aria-labelledby="st-research-h">
        <h2 id="st-research-h">Market research</h2>
        <p className="section-lede">Each hypothesis, the free or platform tool that would test it, and the decision it feeds.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Research hypotheses">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Hypothesis</th><th role="columnheader" scope="col">How to test it</th><th role="columnheader" scope="col">Decision it informs</th></tr></thead>
            <tbody role="rowgroup">
              {RESEARCH.map((r) => (
                <tr role="row" key={r.h}><td role="cell" data-label="Hypothesis"><strong>{r.h}</strong></td><td role="cell" data-label="How to test it">{r.test}</td><td role="cell" data-label="Decision it informs">{r.use}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="st-competitors" className="strat-sec" aria-labelledby="st-competitors-h">
        <h2 id="st-competitors-h">Competitor analysis</h2>
        <p className="section-lede">Four competitor types a mid-market grocer meets at the holidays. They are archetypes rather than named companies; a live audit would review each named competitor’s holiday ads in Meta Ad Library and their weekly flyers.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Competitor archetypes">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Competitor type</th><th role="columnheader" scope="col">Likely holiday message</th><th role="columnheader" scope="col">Strength</th><th role="columnheader" scope="col">Gap Birchway can own</th></tr></thead>
            <tbody role="rowgroup">
              {COMPETITORS.map((c) => (
                <tr role="row" key={c.k}><td role="cell" data-label="Competitor type"><strong>{c.k}</strong></td><td role="cell" data-label="Likely holiday message">{c.msg}</td><td role="cell" data-label="Strength">{c.strength}</td><td role="cell" data-label="Gap Birchway can own">{c.gap}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <figure className="pmap">
          <div className="pmap-plot" role="img" aria-label="Positioning map. Horizontal axis: one-trip completeness, low to high. Vertical axis: planning help, low to high. Discount grocer: low planning help, medium completeness. Warehouse club: low help, medium completeness. Premium specialty: medium help, low completeness. Delivery apps: medium help, medium completeness. Birchway target: high on both.">
            <span className="pmap-ax pmap-x">One-trip completeness</span>
            <span className="pmap-ax pmap-y">Planning help</span>
            <span className="pmap-dot" style={{ left: '46%', top: '78%' }}>Discount</span>
            <span className="pmap-dot" style={{ left: '60%', top: '66%' }}>Warehouse club</span>
            <span className="pmap-dot" style={{ left: '20%', top: '42%' }}>Premium specialty</span>
            <span className="pmap-dot" style={{ left: '52%', top: '40%' }}>Delivery apps</span>
            <span className="pmap-dot pmap-us" style={{ left: '80%', top: '16%' }}>Birchway target</span>
          </div>
          <figcaption>Positioning map. Placement is a judgement from each archetype’s typical messaging, not measured perception.</figcaption>
        </figure>
      </section>

      <section id="st-positioning" className="strat-sec" aria-labelledby="st-positioning-h">
        <h2 id="st-positioning-h">Positioning</h2>
        <blockquote className="pos-statement"><p>{POSITIONING.statement}</p></blockquote>
        <ul className="pillars">
          {POSITIONING.pillars.map((p) => <li key={p.k}><h3>{p.k}</h3><p>{p.d}</p></li>)}
        </ul>
        <p className="ds-note">{POSITIONING.proof} The copy written against this positioning is in <Link to="/copy">Copy and search</Link>.</p>
      </section>

      <section id="st-channels" className="strat-sec" aria-labelledby="st-channels-h">
        <h2 id="st-channels-h">Platform plan</h2>
        <p className="section-lede">Each platform gets one job and the KPI that judges it, so performance is read against the right goal: Pinterest is not failed for low sales, and DOOH is not judged on clicks it cannot get.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Platform roles">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Platform</th><th role="columnheader" scope="col">Job</th><th role="columnheader" scope="col">Judged on</th><th role="columnheader" scope="col">Creative</th><th role="columnheader" scope="col">Phase</th></tr></thead>
            <tbody role="rowgroup">
              {CHANNELS.map((c) => (
                <tr role="row" key={c.k}><td role="cell" data-label="Platform"><strong>{c.k}</strong></td><td role="cell" data-label="Job">{c.role}</td><td role="cell" data-label="Judged on">{c.kpi}</td><td role="cell" data-label="Creative">{c.creative}</td><td role="cell" data-label="Phase">{c.phase}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="flight">
          {FLIGHT.map((f) => (
            <li key={f.k}><h3>{f.k} <span>{f.when}</span></h3><p>{f.d}</p></li>
          ))}
        </ol>
      </section>

      <section id="st-forecast" className="strat-sec" aria-labelledby="st-forecast-h">
        <h2 id="st-forecast-h">Performance forecast</h2>
        <p className="section-lede">How much traffic the plan should drive, worked through from budget to conversions. Change the budget or scenario and every figure recalculates.</p>
        <Forecast />
      </section>

      <section id="st-tests" className="strat-sec" aria-labelledby="st-tests-h">
        <h2 id="st-tests-h">Test plan</h2>
        <p className="section-lede">Three A/B tests in the first two weeks, one variable each, so budget can move to what works before the conversion phase.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="A/B tests">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Test</th><th role="columnheader" scope="col">A</th><th role="columnheader" scope="col">B</th><th role="columnheader" scope="col">Success metric</th><th role="columnheader" scope="col">Question</th></tr></thead>
            <tbody role="rowgroup">
              {TESTS.map((t) => (
                <tr role="row" key={t.k}><td role="cell" data-label="Test"><strong>{t.k}</strong></td><td role="cell" data-label="A">{t.a}</td><td role="cell" data-label="B">{t.b}</td><td role="cell" data-label="Success metric">{t.metric}</td><td role="cell" data-label="Question">{t.why}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
