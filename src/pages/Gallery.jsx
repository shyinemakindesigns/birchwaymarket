import { useState } from 'react'
import PageIntro from '../components/PageIntro.jsx'
import SpecFrame from '../creative/SpecFrame.jsx'
import AnimatedBanner from '../components/AnimatedBanner.jsx'
import { SPECS } from '../data/specs.js'
import FileName from '../components/FileName.jsx'

const GROUPS = [
  { id: 'display', title: 'Display banners', note: 'IAB standard units, shown at actual size wherever the screen allows.', ids: ['r300x250', 'r728x90', 'r160x600', 'r300x600'], maxH: 600 },
  { id: 'social', title: 'Social', note: 'Feed, Stories and link formats, scaled to fit.', ids: ['s1080x1080', 's1080x1920', 's1200x628'], maxH: 520 },
  { id: 'dooh', title: 'Digital out-of-home', note: 'A screen can’t be clicked, so the CTA button is replaced with a sign-off line.', ids: ['d1920x1080'], maxH: 560 },
]

function SpecCaption({ s }) {
  return (
    <figcaption className="cap">
      <span className="cap-name">{s.name}</span>
      <span className="cap-spec">{s.w} × {s.h} px</span>
      <span className="cap-platform">{s.platform}</span>
      <span className="cap-file"><FileName name={s.file} /></span>
      <span className="cap-limit">Weight limit: {s.limit}</span>
    </figcaption>
  )
}

export default function Gallery() {
  const [safe, setSafe] = useState(false)
  return (
    <div className="page page-wide">
      <PageIntro title="Creative adaptation gallery">
        <p>The approved master, then every size built from it. Each adaptation keeps the headline word for word, keeps the logo and its clearspace, and changes only the layout and the crop of the artwork to suit the frame.</p>
      </PageIntro>

      <div className="toolbar">
        <label className="check"><input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} /><span>Show safe zones</span></label>
        <p className="toolbar-note" id="safe-note">
          {safe ? 'Dashed pink lines mark the live area. Hatched bands on the Story are reserved for platform UI.' : 'Turn on to see each spec’s live area.'}
        </p>
      </div>

      <section className="g-section" aria-labelledby="g-master">
        <h2 id="g-master">Master</h2>
        <figure className="g-master">
          <SpecFrame id="master" showSafe={safe} maxH={640} />
          <SpecCaption s={SPECS.master} />
        </figure>
      </section>

      {GROUPS.map((g) => (
        <section key={g.id} className="g-section" aria-labelledby={`g-${g.id}`}>
          <div className="g-head">
            <h2 id={`g-${g.id}`}>{g.title}</h2>
            <p>{g.note}</p>
          </div>
          <div className={`g-grid g-grid-${g.id}`}>
            {g.ids.map((id) => (
              <figure key={id} className={`g-item g-${id}`}>
                <SpecFrame id={id} showSafe={safe} maxH={g.maxH} />
                <SpecCaption s={SPECS[id]} />
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="g-section" aria-labelledby="g-anim">
        <div className="g-head">
          <h2 id="g-anim">Animated HTML5</h2>
          <p>The medium rectangle as an animated build. In production this comes out of Adobe Animate; here it’s the equivalent hand-off package (one HTML file with inline CSS, SVG and JS), running live below.</p>
        </div>
        <AnimatedBanner />
      </section>
    </div>
  )
}
