import { useId } from 'react'
import useTheme from './useTheme.js'
import { ORDER, LABEL } from '../lib/theme.js'

// Appearance control in the menu. "System" follows the OS setting.
export default function ThemeSwitch() {
  const [theme, setTheme] = useTheme()
  const name = useId()
  return (
    <fieldset className="theme-switch">
      <legend>Appearance</legend>
      <div className="theme-options">
        {ORDER.map((v) => (
          <label key={v} className="theme-opt">
            <input type="radio" name={name} value={v} checked={theme === v} onChange={() => setTheme(v)} />
            <span>{LABEL[v]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
