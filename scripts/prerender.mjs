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
const { FAQ } = await import(pathToFileURL(resolve(root, 'src/data/overview.js')).href)
const { CREDIT } = await import(pathToFileURL(resolve(root, 'src/data/credit.js')).href)

// Netlify sets URL to the site's primary address during builds; link
// previews need absolute image URLs, so use it when it is there.
const SITE_URL = (process.env.URL || '').replace(/\/$/, '')

const shellTemplate = readFileSync(resolve(dist, 'index.html'), 'utf8')

// The stylesheet stays external: measured with Lighthouse, inlining 33 KB of
// CSS into every page made first paint slower (bigger HTML, more round trips)
// than one cached 9 KB request.
const template = shellTemplate
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Shell for unknown URLs: served with a real 404 status (see _redirects) and
// kept out of the index, so missing pages are not reported as soft 404s.
writeFileSync(resolve(dist, 'shell.html'), shellTemplate.replace('<meta name="robots" content="index, follow, max-image-preview:large" />', '<meta name="robots" content="noindex" />'))

const abs = (path) => `${SITE_URL}${path}`
const BUILT = new Date().toISOString().slice(0, 10)
const KEYWORDS = 'creative production, production designer portfolio, ad adaptation, IAB display banners, HTML5 banner, creative QA, digital asset management, copywriting, marketing strategy, SEO, AEO, GEO, design system'
const author = CREDIT.name ? { '@type': 'Person', name: CREDIT.name, ...(CREDIT.portfolioUrl ? { url: CREDIT.portfolioUrl } : {}), ...(CREDIT.linkedinUrl ? { sameAs: [CREDIT.linkedinUrl] } : {}) } : null

// Structured data for one page: the site, the case study it belongs to,
// the page itself with its breadcrumb, and FAQPage on the overview.
function jsonLd(page, title) {
  const site = { '@type': 'WebSite', '@id': `${abs('/')}#site`, name: 'Birchway Market creative production case study', url: abs('/'), inLanguage: 'en-CA', description: PAGES[0].description }
  const work = {
    '@type': 'CreativeWork', '@id': `${abs('/')}#case-study`, name: 'Birchway Market: Home for the Holidays, a creative production case study',
    description: PAGES[0].description, url: abs('/'), image: abs('/og-image.png'), inLanguage: 'en-CA', genre: 'Portfolio case study',
    keywords: KEYWORDS, isPartOf: { '@id': `${abs('/')}#site` }, ...(author ? { author, creator: author } : {}),
    about: ['Creative production', 'Multi-platform ad adaptation', 'Creative quality assurance', 'Digital asset management', 'Copywriting', 'Marketing strategy', 'Search engine optimisation'],
    hasPart: PAGES.slice(1).map((p) => ({ '@type': 'WebPage', name: p.title, url: abs(p.path) })),
  }
  const webpage = {
    '@type': page.path === '/overview' ? ['WebPage', 'FAQPage'] : 'WebPage', '@id': `${abs(page.path)}#page`, url: abs(page.path), name: title, description: page.description,
    inLanguage: 'en-CA', isPartOf: { '@id': `${abs('/')}#site` }, about: { '@id': `${abs('/')}#case-study` }, primaryImageOfPage: abs('/og-image.png'), dateModified: BUILT,
    ...(page.path === '/overview' ? { mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : {}),
  }
  const crumbs = { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') }, ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.label, item: abs(page.path) }])] }
  const graph = { '@context': 'https://schema.org', '@graph': [site, work, webpage, crumbs] }
  return JSON.stringify(graph).replace(/</g, '\\u003c')
}

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
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace('</head>', `${SITE_URL ? `  <link rel="canonical" href="${abs(page.path)}" />\n  ` : ''}  <script type="application/ld+json">${jsonLd(page, title)}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-route="${page.path}">${html}</div>`)
  // flat files (/brief -> brief.html): served at the clean URL by Netlify and by `vite preview`
  const file = page.path === '/' ? resolve(dist, 'index.html') : resolve(dist, `${page.path.slice(1)}.html`)
  writeFileSync(file, out)
  console.log(`prerendered ${page.path.padEnd(12)} ${(out.length / 1024).toFixed(1)} KB`)
}

writeFileSync(resolve(dist, '_redirects'), '/*    /shell.html   404\n')

// Crawl files. Absolute URLs need the deployed address (Netlify sets URL).
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${abs('/sitemap.xml')}\n` : ''}`)
if (SITE_URL) {
  const urls = PAGES.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${BUILT}</lastmod></url>`).join('\n')
  writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  console.log('wrote sitemap.xml')
} else {
  console.log('URL not set: skipped sitemap.xml (Netlify sets it on deploy)')
}
// llms.txt: a plain summary for AI assistants (proposed convention, llmstxt.org).
const llms = `# Birchway Market: creative production case study

> ${PAGES[0].description}

Birchway Market is a fictional brand created for a self-directed portfolio project. No real retailer's branding is used. Measured values on the site are limited to what each page checks itself (dimensions, contrast, file weights, character counts); market research, competitor analysis and the traffic forecast are labelled as plans, archetypes and placeholder assumptions.

## Chapters

${PAGES.slice(1).map((p) => `- [${p.title}](${abs(p.path)}): ${p.description}`).join('\n')}

## Questions

${FAQ.map((f) => `- ${f.q} ${f.a}`).join('\n')}
`
writeFileSync(resolve(dist, 'llms.txt'), llms)
console.log('wrote robots.txt, llms.txt')

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
