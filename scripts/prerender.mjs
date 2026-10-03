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
const { THEMES } = await import(pathToFileURL(resolve(root, 'src/data/sitePalette.js')).href)
const { BRAND } = await import(pathToFileURL(resolve(root, 'src/data/brand.js')).href)
const T = await import(pathToFileURL(resolve(root, 'src/data/designTokens.js')).href)

// Netlify sets URL to the site's primary address during builds; link
// previews need absolute image URLs, so use it when it is there.
const SITE_URL = (process.env.URL || '').replace(/\/$/, '')

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
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${SITE_URL}/og-image.png$2`)
    .replace('<meta name="twitter:card"', `${SITE_URL ? `<meta property="og:url" content="${SITE_URL}${page.path === '/' ? '/' : page.path}" />\n    ` : ''}<meta name="twitter:card"`)
    .replace('<div id="root"></div>', `<div id="root" data-route="${page.path}">${html}</div>`)
  // flat files (/brief -> brief.html): served at the clean URL by Netlify and by `vite preview`
  const file = page.path === '/' ? resolve(dist, 'index.html') : resolve(dist, `${page.path.slice(1)}.html`)
  writeFileSync(file, out)
  console.log(`prerendered ${page.path.padEnd(12)} ${(out.length / 1024).toFixed(1)} KB`)
}

writeFileSync(resolve(dist, '_redirects'), '/*    /shell.html   200\n')

// Design tokens as a DTCG-style JSON file (linked from the Design system page).
const colorSet = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, { $type: 'color', $value: v }]))
const tokens = {
  $description: 'Birchway Market design tokens. Fictional brand, self-directed case study.',
  color: {
    brand: Object.fromEntries(Object.entries(BRAND.colors).map(([k, v]) => [k, { $type: 'color', $value: v.hex, $description: `${v.name}. ${v.role}` }])),
    light: colorSet(THEMES.light),
    dark: colorSet(THEMES.dark),
  },
  typography: {
    family: { display: { $type: 'fontFamily', $value: 'Young Serif' }, text: { $type: 'fontFamily', $value: 'Archivo' } },
    size: Object.fromEntries(T.TYPE_SCALE.map((t) => [t.token.replace('--', ''), { $type: 'dimension', $value: t.size, $description: t.use }])),
  },
  radius: Object.fromEntries(T.RADII.map((r) => [r.token.replace('--', ''), { $type: 'dimension', $value: r.value, $description: r.use }])),
  layout: Object.fromEntries(T.LAYOUT.map((l) => [l.token.replace('--', ''), { $type: 'dimension', $value: l.value, $description: l.use }])),
  motion: Object.fromEntries(T.MOTION.map((m) => [m.name.toLowerCase(), { $type: 'transition', $value: m.value, $description: m.use }])),
  breakpoint: Object.fromEntries(T.BREAKPOINTS.map((b) => [b.name.toLowerCase().replace(/ /g, '-'), { $value: b.range, $description: b.notes }])),
  zIndex: Object.fromEntries(T.Z.map((z) => [z.token.replace('--z-', ''), { $type: 'number', $value: z.value, $description: z.use }])),
}
writeFileSync(resolve(dist, 'birchway-tokens.json'), JSON.stringify(tokens, null, 2))
console.log('wrote birchway-tokens.json')
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
