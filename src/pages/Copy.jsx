import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { I } from '../components/icons.jsx'
import { VOICE, PLATFORM_COPY, POSTS, HASHTAGS, KEYWORDS, SEARCH_PLAYBOOK, SITE_SEO, UTM_PLACEMENTS } from '../data/copy.js'

const count = (s) => [...s].length

function CopyText({ text, label }) {
  const [done, setDone] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone('Copied to clipboard.')
    } catch {
      setDone('Copy failed. Select the text and copy it manually.')
    }
    setTimeout(() => setDone(''), 2400)
  }
  return (
    <span className="copy-inline">
      <button type="button" className="btn btn-quiet" onClick={copy}><I.copy />{label}</button>
      <span className="ds-copy-status" role="status">{done}</span>
    </span>
  )
}

function Utm() {
  const [i, setI] = useState(0)
  const p = UTM_PLACEMENTS[i]
  const url = `https://birchway.example/holiday?utm_source=${p.source}&utm_medium=${p.medium}&utm_campaign=holiday2026&utm_content=${p.file}`
  return (
    <div className="utm">
      <label className="fc-field">
        <span>Placement</span>
        <select value={i} onChange={(e) => setI(Number(e.target.value))}>
          {UTM_PLACEMENTS.map((x, j) => <option key={x.k} value={j}>{x.k}</option>)}
        </select>
      </label>
      <p className="utm-url"><code>{url.split(/(?<=[?&])/).map((part, j) => <span key={j}>{j > 0 && <wbr />}{part}</span>)}</code></p>
      <CopyText text={url} label="Copy tracking URL" />
    </div>
  )
}

const SECTIONS = [
  ['cp-voice', 'Voice'],
  ['cp-platform', 'Platform copy'],
  ['cp-posts', 'Social posts'],
  ['cp-tags', 'Hashtags'],
  ['cp-search', 'SEO, AEO and GEO'],
  ['cp-measure', 'Tracking'],
]

export default function Copy() {
  const passed = PLATFORM_COPY.filter((r) => count(r.text) <= r.limit).length
  return (
    <div className="page page-wide copyp">
      <PageIntro title="Copy and search">
        <p>The words for the campaign: a voice, platform copy checked against each placement’s character limit, ready-to-post social content with hashtags, and the search plan for SEO, answer engines and AI assistants. Character counts are computed from the copy itself as the page loads.</p>
      </PageIntro>

      <nav className="jump" aria-label="On this page">
        <ol>{SECTIONS.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ol>
      </nav>

      <section id="cp-voice" className="strat-sec" aria-labelledby="cp-voice-h">
        <h2 id="cp-voice-h">Voice</h2>
        <p className="section-lede">Three rules that every line below was written to, built from the brief’s single-minded message: everything for the holiday table, in one trip to Birchway.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Voice rules">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Rule</th><th role="columnheader" scope="col">Do</th><th role="columnheader" scope="col">Avoid</th></tr></thead>
            <tbody role="rowgroup">
              {VOICE.map((v) => <tr role="row" key={v.k}><td role="cell" data-label="Rule"><strong>{v.k}</strong></td><td role="cell" data-label="Do">{v.do}</td><td role="cell" data-label="Avoid">{v.dont}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section id="cp-platform" className="strat-sec" aria-labelledby="cp-platform-h">
        <h2 id="cp-platform-h">Platform copy</h2>
        <p className="section-lede">{passed} of {PLATFORM_COPY.length} lines fit their limit. “Max” is a hard platform limit; “truncates” is the published length after which the text is cut off in the feed or results page.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Platform copy with character counts">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Placement</th><th role="columnheader" scope="col">Copy</th><th role="columnheader" scope="col">Characters</th><th role="columnheader" scope="col">Result</th></tr></thead>
            <tbody role="rowgroup">
              {PLATFORM_COPY.map((r) => {
                const n = count(r.text)
                return (
                  <tr role="row" key={`${r.platform}-${r.field}`}>
                    <td role="cell" data-label="Placement"><span><strong>{r.platform}</strong><br /><span className="muted">{r.field}</span></span></td>
                    <td role="cell" data-label="Copy">{r.text}</td>
                    <td role="cell" data-label="Characters" className="num">{n} / {r.limit} {r.kind === 'max' ? 'max' : 'before truncation'}</td>
                    <td role="cell" data-label="Result"><StatusBadge status={n <= r.limit ? 'pass' : 'fail'} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="ds-note">Limits as published by each platform at the time of writing. Platforms change them, so they are re-checked against the live spec before trafficking.</p>
      </section>

      <section id="cp-posts" className="strat-sec" aria-labelledby="cp-posts-h">
        <h2 id="cp-posts-h">Social posts</h2>
        <p className="section-lede">Four posts ready to schedule, each with its asset, caption, tags, alt text and the action it asks for. Posting times follow the account’s own audience-activity insights rather than a generic “best time”.</p>
        <ul className="post-grid">
          {POSTS.map((p) => {
            const full = `${p.caption}\n\n${p.tags.join(p.tags[0].startsWith('#') ? ' ' : ', ')}`
            return (
              <li key={p.k} className="post-card">
                <h3>{p.k}</h3>
                <p className="post-asset"><span className="muted">Asset:</span> <Link to={p.to}>{p.asset}</Link></p>
                <div className="post-body">
                  {p.caption.split('\n\n').map((para) => <p key={para}>{para}</p>)}
                  <p className="post-tags">{p.tags.join(p.tags[0].startsWith('#') ? ' ' : ', ')}</p>
                </div>
                {p.script && (
                  <ol className="post-script">{p.script.map((s) => <li key={s}>{s}</li>)}</ol>
                )}
                <dl className="post-meta">
                  <div><dt>Asks for</dt><dd>{p.cta}</dd></div>
                  <div><dt>Alt text</dt><dd>{p.alt}</dd></div>
                  <div><dt>Length</dt><dd>{count(p.caption)} characters</dd></div>
                </dl>
                {p.keywordsNote && <p className="ds-note">{p.keywordsNote}</p>}
                {p.hoursNote && <p className="ds-note">{p.hoursNote}</p>}
                <CopyText text={full} label="Copy caption" />
              </li>
            )
          })}
        </ul>
      </section>

      <section id="cp-tags" className="strat-sec" aria-labelledby="cp-tags-h">
        <h2 id="cp-tags-h">Hashtags</h2>
        <p className="section-lede">Three to five relevant tags per post, mixing one branded tag with topic and niche tags. Each tag is there for a reason it can be measured against.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Hashtag strategy">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Tag</th><th role="columnheader" scope="col">Tier</th><th role="columnheader" scope="col">What it gains</th><th role="columnheader" scope="col">Used on</th></tr></thead>
            <tbody role="rowgroup">
              {HASHTAGS.map((h) => <tr role="row" key={h.tag}><td role="cell" data-label="Tag"><strong>{h.tag}</strong></td><td role="cell" data-label="Tier">{h.tier}</td><td role="cell" data-label="What it gains">{h.benefit}</td><td role="cell" data-label="Used on">{h.use}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section id="cp-search" className="strat-sec" aria-labelledby="cp-search-h">
        <h2 id="cp-search-h">SEO, AEO and GEO</h2>
        <p className="section-lede">Organic search for the campaign landing pages, planned for three kinds of engine: classic search results, answer boxes and voice assistants, and AI assistants that cite sources. Search volumes are left out because they were not measured; they would come from Keyword Planner.</p>
        <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Keyword clusters">
          <table className="tbl" role="table">
            <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Cluster</th><th role="columnheader" scope="col">Intent</th><th role="columnheader" scope="col">Example queries</th><th role="columnheader" scope="col">Page that answers it</th></tr></thead>
            <tbody role="rowgroup">
              {KEYWORDS.map((k) => <tr role="row" key={k.cluster}><td role="cell" data-label="Cluster"><strong>{k.cluster}</strong></td><td role="cell" data-label="Intent">{k.intent}</td><td role="cell" data-label="Example queries">{k.terms.join('; ')}</td><td role="cell" data-label="Page that answers it">{k.page}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="play-grid">
          {SEARCH_PLAYBOOK.map((s) => (
            <article key={s.k} className="play-card">
              <h3>{s.k} <span>{s.full}</span></h3>
              <p className="play-goal">{s.goal}</p>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </article>
          ))}
        </div>
        <h3 className="ds-sub">Applied to this site</h3>
        <ul className="site-seo">
          {SITE_SEO.map((s) => <li key={s}><I.check />{s}</li>)}
        </ul>
      </section>

      <section id="cp-measure" className="strat-sec" aria-labelledby="cp-measure-h">
        <h2 id="cp-measure-h">Tracking</h2>
        <p className="section-lede">Every link carries UTM parameters, and utm_content is the creative’s filename from the <Link to="/assets">naming convention</Link>. Analytics then reports performance by exact file and version, so the v2 that won a test is the v2 that gets more budget.</p>
        <Utm />
      </section>
    </div>
  )
}
