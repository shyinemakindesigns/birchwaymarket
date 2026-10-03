import { I } from './icons.jsx'

// Status is always icon + word, never colour alone.
const MAP = {
  pass: { text: 'Pass', Icon: I.check },
  fail: { text: 'Fail', Icon: I.x },
  na: { text: 'N/A', Icon: I.minus },
  placeholder: { text: 'Placeholder', Icon: I.placeholder },
  pending: { text: 'Measuring', Icon: I.pending },
  manual: { text: 'Needs review', Icon: I.eye },
}

export default function StatusBadge({ status }) {
  const { text, Icon } = MAP[status]
  return (
    <span className={`badge badge-${status}`}>
      <Icon size={13} />
      {text}
    </span>
  )
}
