import { useEffect, useState } from 'react'
import { readTheme, setTheme, subscribeTheme } from '../lib/theme.js'

// Starts as "system" for the prerendered HTML, then syncs to the saved
// choice after hydration (the inline script in index.html has already
// applied it to the page, so there is no flash).
export default function useTheme() {
  const [theme, set] = useState('system')
  useEffect(() => {
    set(readTheme())
    return subscribeTheme(set)
  }, [])
  return [theme, setTheme]
}
