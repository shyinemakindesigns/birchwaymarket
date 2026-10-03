// Priority is carried by shape and word, never colour alone:
// high = upward triangle, medium = square, low = open circle.
export default function PriorityIcon({ level }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      {level === 'high' && <path d="M6 1.5 11 10.5H1z" fill="currentColor" />}
      {level === 'medium' && <rect x="1.75" y="1.75" width="8.5" height="8.5" rx="1" fill="currentColor" />}
      {level === 'low' && <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="2" />}
    </svg>
  )
}
