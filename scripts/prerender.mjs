// Build step 3 of 3 (see package.json "build"):
// renders every route to static HTML with its own <title>, description and
// Open Graph tags, so first paint needs no JavaScript and link previews are
// correct per page. The client then hydrates (src/main.jsx).
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const { PAGES, pageTitle } = await import(pathToFileURL(resolve(root, 'src/data/pages.js')).href)

const shellTemplate = readFileSync(resolve(dist, 'index.html'), 'utf8')

// The stylesheet stays external: measured with Lighthouse, inlining 33 KB of
// CSS into every page made first paint slower (bigger HTML, more round trips)
// than one cached 9 KB request.
const template = shellTemplate
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Untouched shell for unknown URLs (Netlify SPA fallback renders the 404 client-side).
writeFileSync(resolve(dist, 'shell.html'), shellTemplate)

for (const page of PAGES) {
  const title = pageTitle(page)
  const html = render(page.path)
  const out = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace('<div id="root"></div>', `<div id="root" data-route="${page.path}">${html}</div>`)
  // flat files (/brief -> brief.html): served at the clean URL by Netlify and by `vite preview`
  const file = page.path === '/' ? resolve(dist, 'index.html') : resolve(dist, `${page.path.slice(1)}.html`)
  writeFileSync(file, out)
  console.log(`prerendered ${page.path.padEnd(12)} ${(out.length / 1024).toFixed(1)} KB`)
}

writeFileSync(resolve(dist, '_redirects'), '/*    /shell.html   200\n')
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
