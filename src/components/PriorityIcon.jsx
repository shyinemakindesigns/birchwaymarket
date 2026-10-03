import { I } from './icons.jsx'

// Priority is carried by shape and word, never colour alone:
// high = upward triangle, medium = square, low = open circle.
export default function PriorityIcon({ level }) {
  if (level === 'high') return <I.triangle />
  if (level === 'medium') return <I.square size={11} />
  return <I.circle />
}
