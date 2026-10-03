import { useId, useState } from 'react'
import PageIntro from '../components/PageIntro.jsx'
import { ROOT, SEGMENTS, NAME_RULES } from '../data/tree.js'
import FileName from '../components/FileName.jsx'
import { SPECS, ANIMATED } from '../data/specs.js'

function FolderIcon() {
  return <svg className="ic" width="18" height="15" viewBox="0 0 18 15" aria-hidden="true"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h4l2 2h7A1.5 1.5 0 0 1 17 4.5v8A1.5 1.5 0 0 1 15.5 14h-13A1.5 1.5 0 0 1 1 12.5z" fill="currentColor" /></svg>
}
function FileIcon() {
  return <svg className="ic" width="13" height="15" viewBox="0 0 13 15" aria-hidden="true"><path d="M1.5 1h6.5l3.5 3.5v9.5h-10z" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M8 1v3.5h3.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
}

function Folder({ node, depth = 0 }) {
  const hasKids = (node.children && node.children.length) || (node.files && node.files.length)
  return (
    <li className="tr-node">
      <details open={depth < 2 || node.name === '300x250'}>
        <summary>
          <span className="tr-folder"><svg className="tr-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M3.5 1.5 7 5 3.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><FolderIcon />{node.name}/</span>
          {node.note && <span className="tr-note">{node.note}</span>}
        </summary>
        {hasKids ? (
          <ul className="tr-children">
            {node.children?.map((c) => <Folder key={c.name} node={c} depth={depth + 1} />)}
            {node.files?.map((f) => (
              <li key={f} className="tr-file">
                {f.endsWith('/') ? <FolderIcon /> : <FileIcon />}
                <span className="tr-fname"><FileName name={f} /></span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="tr-empty">Empty until the first round is superseded.</p>
        )}
      </details>
    </li>
  )
}

const CHANNELS = ['Master', 'Display', 'Social', 'DOOH', 'Animated']
// Sizes that actually exist in this campaign, per channel.
const SIZES = [...Object.values(SPECS), ANIMATED].reduce((acc, s) => {
  ;(acc[s.channel] ||= []).push(`${s.w}x${s.h}`)
  return acc
}, {})
const EXTS = ['jpg', 'png', 'gif', 'zip', 'psd', 'pdf']

function validate(raw) {
  const name = raw.trim()
  const issues = []
  if (!name) return { ok: false, results: [], issues: ['Type a filename to check it.'] }
  if (/\s/.test(name)) issues.push('Contains spaces. Use underscores between segments.')
  if (name.split(/[_.\s-]/).some((seg) => /^(final|latest|copy|new|use ?this)\d*$/i.test(seg))) issues.push('Contains a status word (final, latest, copy, new). Approval belongs on the ticket, not in the filename.')
  const dot = name.lastIndexOf('.')
  const base = dot > -1 ? name.slice(0, dot) : name
  const ext = dot > -1 ? name.slice(dot + 1) : ''
  const parts = base.split('_')
  const checks = [
    { seg: SEGMENTS[0], val: parts[0], ok: parts[0] === 'BirchwayMarket', why: 'Must be exactly BirchwayMarket.' },
    { seg: SEGMENTS[1], val: parts[1], ok: parts[1] === 'Holiday2026', why: 'Must be exactly Holiday2026.' },
    { seg: SEGMENTS[2], val: parts[2], ok: CHANNELS.includes(parts[2]), why: `One of ${CHANNELS.join(', ')}.` },
    (() => {
      const v = parts[3] || ''
      const shaped = /^\d{2,4}x\d{2,4}$/.test(v)
      const allowed = SIZES[parts[2]]
      const known = shaped && (!allowed || allowed.includes(v))
      return {
        seg: SEGMENTS[3], val: parts[3], ok: known,
        why: !shaped ? 'Width x height in px, like 300x250.' : `Not a ${parts[2]} size in this campaign. Use ${(allowed || []).join(', ')}.`,
      }
    })(),
    { seg: SEGMENTS[4], val: parts[4], ok: /^v[1-9]\d?$/.test(parts[4] || ''), why: 'Lowercase v and a number, like v2.' },
    { seg: SEGMENTS[5], val: ext, ok: EXTS.includes(ext), why: `One of ${EXTS.join(', ')}, lowercase.` },
  ]
  if (parts.length > 5) {
    const extra = parts.slice(5).join('_')
    const isBackup = extra === 'Backup' && parts[2] === 'Animated'
    if (!isBackup) issues.push(`Unexpected extra segment “${extra}”. Only animated static backups may add _Backup.`)
  }
  const ok = checks.every((c) => c.ok) && issues.length === 0
  return { ok, results: checks, issues }
}

export default function Assets() {
  const [value, setValue] = useState('BirchwayMarket_Holiday2026_Display_300x250_FINAL.jpg')
  const id = useId()
  const res = validate(value)
  const failing = res.results.filter((r) => !r.ok).length + res.issues.length

  return (
    <div className="page page-wide">
      <PageIntro title="Asset management system">
        <p>Nine deliverables, two revision rounds and a static backup for every animated file quickly turns into dozens of files. The structure below means anyone on the team can find the current version of any size in two clicks, and can tell from the filename alone what it is.</p>
      </PageIntro>

      <section className="nm" aria-labelledby="nm-h">
        <h2 id="nm-h">Naming convention</h2>
        <p className="section-lede">Six segments, always in the same order, joined by underscores.</p>
        <ol className="nm-diagram" aria-label="Filename segments, in order">
          {SEGMENTS.map((s, i) => (
            <li key={s.name} className="nm-seg">
              <span className="nm-part">
                <span className="nm-sep" aria-hidden="true">{i === 0 ? '' : i === SEGMENTS.length - 1 ? '.' : '_'}</span>
                <code>{s.part}</code>
              </span>
              <span className="nm-tick" aria-hidden="true" />
              <span className="nm-name">{s.name}</span>
              <span className="nm-rule">{s.rule}</span>
            </li>
          ))}
        </ol>
        <p className="nm-full"><span>Reads as</span> <code><FileName name="BirchwayMarket_Holiday2026_Display_300x250_v2.jpg" /></code></p>

        <div className="nm-cols">
          <ul className="rules">
            {NAME_RULES.map((r) => <li key={r}>{r}</li>)}
          </ul>

          <div className="checker">
            <label htmlFor={id} className="checker-label">Check a filename</label>
            <p className="checker-hint" id={`${id}-hint`}>Try fixing the example, or paste one of your own.</p>
            <input
              id={id}
              type="text"
              value={value}
              spellCheck={false}
              autoComplete="off"
              aria-describedby={`${id}-hint ${id}-result`}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id={`${id}-result`} className={`checker-result ${res.ok ? 'is-ok' : 'is-bad'}`} aria-live="polite">
              <p className="checker-verdict">
                {res.ok ? 'Valid. This filename follows the convention.' : `${failing} problem${failing === 1 ? '' : 's'} found.`}
              </p>
              {res.results.length > 0 && (
                <ul className="checker-list">
                  {res.results.map((r) => (
                    <li key={r.seg.name} className={r.ok ? 'ok' : 'bad'}>
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        {r.ok
                          ? <path d="M2.5 7.5l3 3L11.5 4" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          : <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />}
                      </svg>
                      <span><strong>{r.seg.name}:</strong> {r.val ? <code>{r.val}</code> : 'missing'}{r.ok ? ', correct' : `. ${r.why}`}</span>
                    </li>
                  ))}
                </ul>
              )}
              {res.issues.map((i) => <p key={i} className="checker-issue">{i}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="tree-sec" aria-labelledby="tree-h">
        <h2 id="tree-h">Folder structure</h2>
        <p className="section-lede">Numbered folders keep the order fixed in every file browser. Folders open and close; use Enter or Space on a folder name.</p>
        <ul className="tree">
          <Folder node={ROOT} />
        </ul>
      </section>
    </div>
  )
}
