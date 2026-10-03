import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Creative from '../creative/Creative.jsx'
import { SPECS } from '../data/specs.js'
import { UsageTile } from '../brandb/Boards.jsx'

// Development-only: renders one creative at native size, nothing else, so
// it can be captured as the exported file (see README, "Exports").
export default function ExportFrame() {
  const [params] = useSearchParams()
  const id = params.get('id') || 'r300x250'
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [])
  const tile = params.get('tile')
  if (tile) return <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#fff' }}><UsageTile kind={tile} /></div>
  if (!SPECS[id]) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#fff' }}>
      <Creative id={id} draft={params.get('draft') === '1'} />
    </div>
  )
}
