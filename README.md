# Birchway Market: Home for the Holidays, a production case study

A self-directed portfolio case study for a creative production specialist role. One master holiday creative for **Birchway Market** (a fictional grocery brand) adapted to eight IAB, social and DOOH specs, with a working QA checklist, an asset management system, a workload board, a process flow and an honest reflection.

React 19 + React Router 7 + Vite 8, same stack as the Beacon Path build. No UI library.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: master creative with dimension lines, summary, chapter index |
| `/brief` | The brief, framed as an intake ticket (BWM-200) |
| `/gallery` | Master + 8 adaptations at true pixel size, safe-zone toggle, embedded HTML5 banner |
| `/qa` | Live QA checklist that measures the rendered creative; v1 to v2 before/after |
| `/assets` | Naming convention diagram, live filename checker, folder tree |
| `/board` | Kanban workload board (filter, move, WIP limit) |
| `/process` | Seven-step process flow |
| `/brand-direction` | Brand direction B: the Claude Design identity (Gloock wordmark, arch), reviewed and corrected, with the guideline sheet rebuilt |
| `/reflection` | How this was built, AI disclosure, live contrast table |

## How the creatives work

Every creative is a real layout rendered at its true pixel size (`src/creative/Creative.jsx` + `layouts.js`) and scaled down to fit the page. That is what lets the QA page read dimensions, element positions, colours and fonts back out of the DOM (`src/lib/measure.js`, `src/lib/qaChecks.js`) instead of hard-coding pass/fail.

The animated banner is a standalone HTML5 package at `public/html5/BirchwayMarket_Holiday2026_Animated_300x250_v1/index.html` (ad.size meta, clickTag, 3-loop cap, reduced-motion end frame, postMessage pause/replay). The gallery embeds it in an iframe and measures its weight in the browser.

### Swapping in real brand assets

- Logo: `src/creative/Logo.jsx` (and the inline copy in the HTML5 banner)
- Illustration: `src/creative/TableArt.jsx`
- Colours, type, copy: `src/data/brand.js`
- Specs, filenames, alt text: `src/data/specs.js`

## Brand direction B

`src/brandb/` holds the second identity from the Claude Design file (Gloock + Hanken Grotesk, Spruce / Birch / Cranberry / Gilt / Bark, wordmark with gilt birch-bark rules, arch frame). It renders the four formats from that file in corrected form and the Story exactly as received, measured live against the 250 px Story safe zones. It is isolated from direction A: nothing in it feeds the QA checklist. Its fonts are self-hosted and only download on that page.

## Accessibility

- `npm run audit:contrast` computes WCAG 2.1 contrast for every site pairing in both themes, plus the creatives, and exits non-zero on any failure. All pairs pass AA (lowest: 5.63:1).
- axe-core (WCAG 2.0/2.1 A and AA + best practice) reports no violations. The intentionally failing v1 banner is shown as its exported JPG; it can still be loaded live in the QA checklist, where its failures are the point.
- Burger menu is a modal dialog: focus moves in, Tab is trapped, Escape closes and returns focus. Route changes move focus to the page `h1`. Skip link on every page.
- Status is always icon + text, never colour alone. `prefers-reduced-motion` is respected, including inside the HTML5 banner.
- No horizontal scroll at 360, 390, 768, 1024 or 1280 px.

## Themes

Light and dark themes come from semantic tokens in `src/styles/tokens.css`. The site follows the OS setting; the menu's Appearance switch (System, Light, Dark) overrides it and is remembered per browser. A small inline script in `index.html` applies the saved choice before first paint. The creatives, menu sheet and footer keep the brand colours in both themes because they are artwork. Every pairing in both themes is in `src/data/sitePalette.js` and checked by `npm run audit:contrast`.

## Develop / build / deploy

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` runs three steps:

1. `vite build`: the client bundle (assets go to `dist/static/`, not `dist/assets/`, so they never collide with the `/assets` page).
2. `vite build --ssr src/entry-server.jsx`: a server bundle used only at build time.
3. `node scripts/prerender.mjs`: renders every route to static HTML (`index.html`, `brief.html`, `gallery.html` and so on), each with its own `<title>`, description and Open Graph tags. The client hydrates that markup (`src/main.jsx`), so first paint needs no JavaScript.

Netlify: publish `dist/` (drag it in, or build command `npm run build`, publish directory `dist`). Netlify serves `/brief` from `brief.html`. `dist/_redirects` sends unknown URLs to `dist/shell.html`, which renders the 404 client-side.

Before deploying: add a real `public/og-image.png` (referenced in `index.html`), and optionally fill in `src/data/credit.js` to show your name and links in the footer.

## Fonts

Young Serif and Archivo (variable, weight + width) are self-hosted from `public/fonts/` (Latin subset, SIL OFL; licences included) and preloaded. Metric-matched fallbacks (`src/styles/fonts.css`) keep layout stable while they load.

## Exports

`public/exports/` holds the real 300 × 250 v1 and v2 JPGs used in the QA before/after (measured weights). They are rendered from the live layouts: in dev, `/__export?id=r300x250&draft=1` shows a single creative at native size for capture. That route does not exist in production builds.

## Measured results (production build)

- Lighthouse desktop: 100 / 100 / 100 / 100 on all 8 pages.
- Lighthouse mobile, real throttling in Chrome (`--throttling-method=devtools`): Performance 99–100, Accessibility, Best Practices and SEO 100. Lighthouse's default simulated mobile run scores Performance 97–99 on the same build.
- Cumulative layout shift: 0 on every page.

Birchway Market is fictional. No real retailer's branding, logos or trademarks appear in this project.
