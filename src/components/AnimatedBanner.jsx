import { useEffect, useRef, useState } from 'react'
import { ANIMATED } from '../data/specs.js'
import FileName from './FileName.jsx'

// Embeds the real HTML5 package in an iframe and drives it over
// postMessage. Pause / play / replay sit outside the ad so they are always
// reachable by keyboard (WCAG 2.2.2), and the ad itself stops after 3 loops.
export default function AnimatedBanner() {
  const frame = useRef(null)
  const [state, setState] = useState({ state: 'loading', loop: 0, max: 3 })
  const [bytes, setBytes] = useState(null)

  useEffect(() => {
    const onMsg = (e) => {
      if (e.source !== frame.current?.contentWindow) return
      if (e.data?.source === 'bw-ad') setState(e.data)
    }
    window.addEventListener('message', onMsg)
    fetch(ANIMATED.src)
      .then((r) => r.blob())
      .then((b) => setBytes(b.size))
      .catch(() => setBytes(null))
    return () => window.removeEventListener('message', onMsg)
  }, [])

  const send = (cmd) => frame.current?.contentWindow?.postMessage({ target: 'bw-ad', cmd }, window.location.origin)
  const paused = state.state === 'paused'
  const done = state.state === 'ended' || state.state === 'reduced'

  const statusText = {
    loading: 'Loading banner',
    playing: `Playing, loop ${state.loop} of ${state.max}`,
    paused: `Paused on loop ${state.loop} of ${state.max}`,
    ended: `Stopped on the end frame after ${state.max} loops`,
    reduced: 'Reduced motion is on, so the end frame is shown without animation',
  }[state.state]

  return (
    <div className="anim">
      <div className="anim-stage">
        <div className="spec-dim spec-dim-x" style={{ width: 300 }} aria-hidden="true"><span>300 px</span></div>
        <div className="spec-row">
          <iframe
            ref={frame}
            src={ANIMATED.src}
            width="300"
            height="250"
            title="Animated Birchway Market 300 by 250 banner. The logo reveals, the headline Home for the Holidays fades in, the pie artwork slides in, and the Shop the holiday table button pulses. Plays three times, then stops."
            className="anim-frame"
            loading="lazy"
            scrolling="no"
          />
          <div className="spec-dim spec-dim-y" style={{ height: 250 }} aria-hidden="true"><span>250 px</span></div>
        </div>
        <p className="spec-scale">Shown at actual size</p>
      </div>

      <div className="anim-panel">
        <div className="anim-controls" role="group" aria-label="Banner playback">
          <button type="button" className="btn btn-quiet" onClick={() => send(paused ? 'play' : 'pause')} disabled={done || state.state === 'loading'}>
            {paused ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7-4.5z" fill="currentColor" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" /></svg>
            )}
            {paused ? 'Play' : 'Pause'}
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => send('replay')} disabled={state.state === 'loading' || state.state === 'reduced'}>
            <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7a4.5 4.5 0 1 0 1.4-3.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M2 1.5v3h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Replay
          </button>
        </div>
        <p className="anim-status" role="status">{statusText}</p>

        <dl className="spec-dl">
          <div><dt>File</dt><dd className="file"><FileName name={ANIMATED.file} /></dd></div>
          <div><dt>Platform</dt><dd>{ANIMATED.platform}</dd></div>
          <div><dt>Limits</dt><dd>{ANIMATED.limit}</dd></div>
          <div>
            <dt>Package weight</dt>
            <dd>
              {bytes == null ? 'Measuring…' : `${(bytes / 1024).toFixed(1)} KB, measured in your browser just now`}
              <span className="dd-note"> Inline CSS, SVG and JS in one file. The Google Fonts request is not counted; check that against the receiving platform’s rules.</span>
            </dd>
          </div>
          <div><dt>Timeline</dt><dd>5 s per loop: logo reveal, headline fade-in, artwork in, CTA pulse. Loop 3 holds on the end frame (15 s total).</dd></div>
        </dl>
      </div>
    </div>
  )
}
