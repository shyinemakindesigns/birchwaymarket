// Theme store shared by the header appearance button, the keyboard
// shortcut and the menu's Appearance switch. "system" follows the OS live
// (pure CSS media query); "light" / "dark" are saved per browser.
const KEY = 'bw-theme'
const EVENT = 'bw-theme-change'
export const ORDER = ['system', 'light', 'dark']
export const LABEL = { system: 'System', light: 'Light', dark: 'Dark' }

export function readTheme() {
  try {
    const t = localStorage.getItem(KEY)
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

export function setTheme(value) {
  const root = document.documentElement
  if (value === 'system') delete root.dataset.theme
  else root.dataset.theme = value
  try {
    if (value === 'system') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, value)
  } catch { /* storage blocked: the choice still applies for this page */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
}

export const nextTheme = (t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]

export function subscribeTheme(fn) {
  const h = (e) => fn(e.detail)
  window.addEventListener(EVENT, h)
  return () => window.removeEventListener(EVENT, h)
}
