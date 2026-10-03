import { Fragment, useEffect, useState } from 'react'

// Filenames break after underscores, never mid-segment.
export default function FileName({ name }) {
  const parts = name.split('_')
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <>_<wbr /></>}
        </Fragment>
      ))}
    </>
  )
}

// Weighs a published file in the browser (the bytes actually served).
export function MeasuredWeight({ src }) {
  const [bytes, setBytes] = useState(null)
  useEffect(() => {
    let alive = true
    fetch(src).then((r) => r.blob()).then((b) => alive && setBytes(b.size)).catch(() => {})
    return () => { alive = false }
  }, [src])
  return <>{bytes == null ? 'Measuring…' : `${(bytes / 1024).toFixed(1)} KB, measured`}</>
}
