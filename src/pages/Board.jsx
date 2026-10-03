import { useEffect, useState } from 'react'
import PageIntro from '../components/PageIntro.jsx'
import PriorityIcon from '../components/PriorityIcon.jsx'
import { COLUMNS, PLATFORMS, PRIORITIES, TICKETS } from '../data/board.js'

// Board snapshot date, so "due in" values stay stable for every visitor.
const AS_OF = new Date('2026-10-29T12:00:00')
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function dueInfo(iso, status) {
  const d = new Date(`${iso}T12:00:00`)
  const days = Math.round((d - AS_OF) / 86400000)
  const label = `${MONTHS[d.getMonth()]} ${d.getDate()}`
  if (status === 'delivered') return { label, rel: 'Delivered', urgent: false }
  if (days < 0) return { label, rel: `${-days} day${days === -1 ? '' : 's'} overdue`, urgent: true }
  if (days === 0) return { label, rel: 'Due today', urgent: true }
  if (days === 1) return { label, rel: 'Due tomorrow', urgent: true }
  return { label, rel: `In ${days} days`, urgent: false }
}

const PLATFORM_ICON = {
  Display: <rect x="1.5" y="2.5" width="11" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  Social: <><rect x="3.5" y="1" width="7" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M6 11h2" stroke="currentColor" strokeWidth="1.5" /></>,
  DOOH: <><rect x="1" y="1.5" width="12" height="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M7 9v4M4.5 13h5" stroke="currentColor" strokeWidth="1.5" /></>,
  Animated: <><circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 4.5v5l4-2.5z" fill="currentColor" /></>,
}

const sortTickets = (a, b) => PRIORITIES[a.priority].rank - PRIORITIES[b.priority].rank || a.due.localeCompare(b.due)

export default function Board() {
  const [tickets, setTickets] = useState(TICKETS)
  const [filter, setFilter] = useState('All')
  const [announce, setAnnounce] = useState('')
  const [refocus, setRefocus] = useState(null)

  // A moved card re-mounts in its new column, which would drop keyboard
  // focus to <body>. Put focus back on the same card's control.
  useEffect(() => {
    if (!refocus) return
    document.getElementById(`mv-${refocus}`)?.focus()
    setRefocus(null)
  }, [refocus])

  const move = (id, status) => {
    setTickets((ts) => ts.map((t) => (t.id === id ? { ...t, status } : t)))
    setAnnounce(`${id} moved to ${COLUMNS.find((c) => c.id === status).label}.`)
    setRefocus(id)
  }

  const visible = tickets.filter((t) => filter === 'All' || t.platform === filter)

  return (
    <div className="page page-wide">
      <PageIntro title="Workload board">
        <p>Eight requests from the campaign in flight at once. The board is how they get triaged: high-priority work and the nearest due dates rise to the top of each column, and review has a work-in-progress limit so stakeholders aren’t buried in proofs. Styled after the issue trackers production teams use every day; it’s a self-built demo, not a real tool.</p>
      </PageIntro>

      <div className="board-bar">
        <div className="segmented" role="group" aria-label="Filter by platform">
          {['All', ...PLATFORMS].map((p) => (
            <button key={p} type="button" className="chip" aria-pressed={filter === p} onClick={() => setFilter(p)}>
              {filter === p && <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              {p}
            </button>
          ))}
        </div>
        <p className="board-meta">
          Board as of <time dateTime="2026-10-29">Oct 29, 2026</time>. Cards sort by priority, then due date.
          <button type="button" className="link-btn" onClick={() => { setTickets(TICKETS); setAnnounce('Board reset.') }}>Reset board</button>
        </p>
      </div>
      <p className="sr-only" role="status">{announce}</p>

      <div className="board">
        {COLUMNS.map((col) => {
          const items = visible.filter((t) => t.status === col.id).sort(sortTickets)
          const total = tickets.filter((t) => t.status === col.id).length
          const over = col.wip && total > col.wip
          return (
            <section key={col.id} className={`col col-${col.id}`} aria-labelledby={`col-${col.id}`}>
              <header className="col-head">
                <h2 id={`col-${col.id}`}>{col.label}</h2>
                <span className="col-count">
                  {col.wip ? `${total} of ${col.wip} limit` : `${items.length}${filter !== 'All' ? ` of ${total}` : ''}`}
                </span>
              </header>
              {over && <p className="wip-warn">Over the review limit. Clear a card before adding more.</p>}
              <ul className="cards">
                {items.length === 0 && <li className="card-empty">Nothing here{filter !== 'All' ? ` for ${filter}` : ''}.</li>}
                {items.map((t) => {
                  const due = dueInfo(t.due, t.status)
                  const pr = PRIORITIES[t.priority]
                  const sel = `mv-${t.id}`
                  return (
                    <li key={t.id} className="card">
                      <div className="card-top">
                        <span className="card-id">{t.id}</span>
                        <span className={`prio prio-${t.priority}`}><PriorityIcon level={t.priority} />{pr.label}<span className="sr-only"> priority</span></span>
                      </div>
                      <h3 className="card-title">{t.title}</h3>
                      {t.note && <p className="card-note">{t.note}</p>}
                      <div className="card-meta">
                        <span className="tag">
                          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">{PLATFORM_ICON[t.platform]}</svg>
                          {t.platform}
                        </span>
                        <span className={`due${due.urgent ? ' due-urgent' : ''}`}>
                          {due.urgent && <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l5 9.5H1z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6 4.5v2.5M6 8.6v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                          <time dateTime={t.due}>{due.label}</time>
                          <span className="due-rel">{due.rel}</span>
                        </span>
                      </div>
                      <div className="card-move">
                        <label htmlFor={sel}>Move<span className="sr-only"> {t.id}</span> to</label>
                        <select id={sel} value={t.status} onChange={(e) => move(t.id, e.target.value)}>
                          {COLUMNS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      <aside className="aside-note">
        <h2>How I’d prioritise this board on Oct 29</h2>
        <p>BWM-201 comes first: it’s high priority, in revisions, due in four days, and its fixes are already defined by QA. BWM-204 is approved, so it’s ready to traffic as soon as the static backup is attached. BWM-208 is blocked on the media owner’s spec sheet, so the right move is to chase that today rather than start building and risk redoing the work.</p>
      </aside>
    </div>
  )
}
