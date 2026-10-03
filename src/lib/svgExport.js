const NS = 'http://www.w3.org/2000/svg'

// Serialises a rendered <svg> into a standalone file: explicit size from the
// viewBox, interface attributes stripped, optional embedded CSS and title.
export function svgMarkup(svg, { title, css } = {}) {
  const clone = svg.cloneNode(true)
  clone.setAttribute('xmlns', NS)
  const vb = (clone.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number)
  if (vb.length === 4) {
    clone.setAttribute('width', vb[2])
    clone.setAttribute('height', vb[3])
  }
  ;['aria-hidden', 'focusable', 'class', 'style', 'role', 'aria-label'].forEach((a) => clone.removeAttribute(a))
  if (css) {
    const st = document.createElementNS(NS, 'style')
    st.textContent = css
    clone.insertBefore(st, clone.firstChild)
  }
  if (title) {
    const t = document.createElementNS(NS, 'title')
    t.textContent = title
    clone.insertBefore(t, clone.firstChild)
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}\n`
}

export function downloadText(filename, text, type = 'image/svg+xml') {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Line colourways, shared by the page styles and the downloaded files.
export const lineCss = (stroke) =>
  `path,circle,ellipse,rect{fill:none;stroke:${stroke};stroke-width:1.5px;vector-effect:non-scaling-stroke;stroke-dasharray:none;opacity:1}.hl{display:none}`
