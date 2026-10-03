import { useEffect, useState } from 'react'
import useTheme from './useTheme.js'
import { LABEL, nextTheme } from '../lib/theme.js'
import { I } from './icons.jsx'

const ICON = { system: I.system, light: I.sun, dark: I.moon }

// Square appearance button in the header with a real tooltip (hover and
// focus) that names the next mode and the shortcut. Shortcut: Alt+Shift+L
// (⌥⇧L on Mac); a modifier combo so it never fires while typing or
// clashes with screen-reader single-key commands (WCAG 2.1.4).
export default function ThemeButton() {
  const [theme, setTheme] = useTheme()
  const [mac, setMac] = useState(false)
  const [announce, setAnnounce] = useState('')
  const next = nextTheme(theme)

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
  }, [])

  const cycle = (from) => {
    const to = nextTheme(from)
    setTheme(to)
    setAnnounce(`Appearance: ${LABEL[to]}${to === 'system' ? ', following your device' : ''}.`)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && e.code === 'KeyL') {
        e.preventDefault()
        cycle(document.documentElement.dataset.theme || 'system')
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const Icon = ICON[theme]
  const keys = mac ? ['⌥', '⇧', 'L'] : ['Alt', 'Shift', 'L']

  return (
    <span className="tb-wrap">
      <button
        type="button"
        className="tb"
        aria-label={`Appearance: ${LABEL[theme]}. Switch to ${LABEL[next]}`}
        aria-describedby="tb-tip"
        onClick={() => cycle(theme)}
      >
        <Icon size={19} />
      </button>
      <span id="tb-tip" role="tooltip" className="tb-tip">
        Switch to {LABEL[next]}
        <span className="tb-keys">{keys.map((k) => <kbd key={k}>{k}</kbd>)}</span>
      </span>
      <span className="sr-only" role="status">{announce}</span>
    </span>
  )
}
