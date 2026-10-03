import { useEffect, useId, useState } from 'react'

const OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

function read() {
  try {
    const t = localStorage.getItem('bw-theme')
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

// Appearance control in the menu. "System" follows the OS setting.
export default function ThemeSwitch() {
  const [theme, setTheme] = useState('system')
  const name = useId()

  useEffect(() => setTheme(read()), [])

  const choose = (value) => {
    setTheme(value)
    const root = document.documentElement
    try {
      if (value === 'system') { delete root.dataset.theme; localStorage.removeItem('bw-theme') }
      else { root.dataset.theme = value; localStorage.setItem('bw-theme', value) }
    } catch {
      if (value === 'system') delete root.dataset.theme
      else root.dataset.theme = value
    }
  }

  return (
    <fieldset className="theme-switch">
      <legend>Appearance</legend>
      <div className="theme-options">
        {OPTIONS.map((o) => (
          <label key={o.value} className="theme-opt">
            <input type="radio" name={name} value={o.value} checked={theme === o.value} onChange={() => choose(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
