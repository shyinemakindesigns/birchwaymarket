import PageIntro from '../components/PageIntro.jsx'
import FileName from '../components/FileName.jsx'
import PriorityIcon from '../components/PriorityIcon.jsx'
import { TICKET, BRIEF_SECTIONS, DELIVERABLES, MILESTONES, ATTACHMENTS } from '../data/brief.js'

export default function Brief() {
  return (
    <div className="page page-wide page-brief">
      <PageIntro title="The brief">
        <p>Every job here starts as a ticket. This is the intake request for the campaign, written the way it would arrive from the account team: what’s needed, where it runs, and the window to deliver it.</p>
      </PageIntro>

      <article className="ticket" aria-labelledby="ticket-title">
        <div className="ticket-bar">
          <span className="ticket-id">{TICKET.id}</span>
          <span className="ticket-type">{TICKET.type}</span>
          <span className="status-pill status-delivered">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {TICKET.status}
          </span>
        </div>

        <div className="ticket-body">
          <div className="ticket-main">
            <h2 id="ticket-title" className="ticket-title">{TICKET.title}</h2>
            {BRIEF_SECTIONS.map((s) => (
              <section key={s.k} className="ticket-sec">
                <h3>{s.k}</h3>
                <p>{s.v}</p>
              </section>
            ))}

            <section className="ticket-sec">
              <h3>Deliverables</h3>
              <div className="table-wrap stack" tabIndex={0} role="region" aria-label="Deliverables table">
                <table className="tbl" role="table">
                  <thead role="rowgroup">
                    <tr role="row"><th role="columnheader" scope="col">Spec (px)</th><th role="columnheader" scope="col">Format</th><th role="columnheader" scope="col">Platform</th></tr>
                  </thead>
                  <tbody role="rowgroup">
                    {DELIVERABLES.map((d) => (
                      <tr role="row" key={`${d.spec}-${d.name}`}>
                        <td role="cell" data-label="Spec (px)" className="num">{d.spec}</td>
                        <td role="cell" data-label="Format">{d.name}</td>
                        <td role="cell" data-label="Platform">{d.platform}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="ticket-side" aria-label="Ticket details">
            <dl className="ticket-dl">
              <div><dt>Priority</dt><dd><span className="prio prio-high"><PriorityIcon level="high" />{TICKET.priority}</span></dd></div>
              <div><dt>Requester</dt><dd>{TICKET.requester}</dd></div>
              <div><dt>Brief owner</dt><dd>{TICKET.accountLead}</dd></div>
              <div><dt>Assignee</dt><dd>{TICKET.assignee}</dd></div>
              <div><dt>Opened</dt><dd>{TICKET.opened}</dd></div>
              <div><dt>In market</dt><dd>Nov 16 to Dec 24, 2026</dd></div>
            </dl>
            <div className="ticket-attach">
              <h3>Attachments</h3>
              <ul>
                {ATTACHMENTS.map((a) => (
                  <li key={a}>
                    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true"><path d="M2 1h7l3 3v11H2z" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M9 1v3h3" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                    <span><FileName name={a} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="ticket-window" aria-labelledby="window-h">
          <h3 id="window-h">Deadline window</h3>
          <p className="window-lede">Six weeks from intake to in-market, with two revision rounds.</p>
          <ol className="timeline">
            {MILESTONES.map((m) => (
              <li key={m.date}>
                <span className="tl-date">{m.date}</span>
                <span className="tl-label">{m.label}</span>
              </li>
            ))}
          </ol>
        </section>
      </article>

      <aside className="aside-note">
        <h2>How I vetted it before saying yes</h2>
        <p>Before accepting the ticket I checked three things: whether every size could carry the headline unedited (the 728 × 90 needed it on one line), whether DOOH needed a different end line because a screen can’t be clicked, and whether legal copy would arrive before round 2. The third answer was no, so placeholder slots went into every layout from v1 instead of being squeezed in at the end.</p>
      </aside>
    </div>
  )
}
