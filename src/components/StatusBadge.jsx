// Status is always icon + word, never colour alone.
const MAP = {
  pass: { text: 'Pass', icon: <path d="M2.5 7.5l3 3L11.5 4" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
  fail: { text: 'Fail', icon: <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /> },
  na: { text: 'N/A', icon: <path d="M3 7h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /> },
  placeholder: { text: 'Placeholder', icon: <rect x="2.5" y="2.5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.2 1.8" /> },
  pending: { text: 'Measuring', icon: <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2.2" /> },
  manual: { text: 'Needs review', icon: <><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="7" cy="7" r="1.6" fill="currentColor" /></> },
}

export default function StatusBadge({ status }) {
  const s = MAP[status]
  return (
    <span className={`badge badge-${status}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">{s.icon}</svg>
      {s.text}
    </span>
  )
}
