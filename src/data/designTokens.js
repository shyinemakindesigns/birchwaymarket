// Non-colour design tokens, mirroring src/styles/tokens.css and the values
// the stylesheets actually use. Read by the Design system page and written
// out as /birchway-tokens.json at build time (scripts/prerender.mjs).
// Colour tokens live in src/data/sitePalette.js (UI) and src/data/brand.js (creative).

export const TYPE_SCALE = [
  { token: '--t-hero', size: 'clamp(40px, 1.5rem + 4.4vw, 76px)', sample: 'Home for the Holidays', use: 'Home page title', serif: true, px: 64 },
  { token: '--t-3xl', size: 'clamp(36px, 1.6rem + 2.6vw, 56px)', sample: 'Creative QA checklist', use: 'Page titles (h1)', serif: true, px: 48 },
  { token: '--t-2xl', size: '33px', sample: 'Holiday 2026 adaptation package', use: 'Ticket title, chapter numerals', serif: true, px: 33 },
  { token: '--t-xl', size: '26px', sample: 'Naming convention', use: 'Section headings (h2)', serif: true, px: 26 },
  { token: '--t-lg', size: '21px', sample: 'Every file gets the same checklist.', use: 'Ledes, card headings', serif: false, px: 21 },
  { token: '--t-md', size: '17px', sample: 'Six segments, always in the same order, joined by underscores.', use: 'Body text, line-height 1.55', serif: false, px: 17 },
  { token: '--t-sm', size: '15px', sample: 'Measured 300 × 250 px against a 300 × 250 px spec.', use: 'Secondary text, tables, controls', serif: false, px: 15 },
  { token: '--t-xs', size: '13px', sample: 'BWM-208  Due Nov 6', use: 'Captions, badges, meta', serif: false, px: 13 },
]

export const LAYOUT = [
  { token: '--gutter', value: 'clamp(16px, 4vw, 48px)', use: 'Page side margin; 16 px on phones, 48 px on desktop' },
  { token: '--measure', value: '68ch', use: 'Maximum line length for reading text' },
  { token: '--wide', value: '1240px', use: 'Maximum width for galleries, boards and tables' },
  { token: '--header-h', value: '64px', use: 'Sticky header height; anchors and sticky toolbars offset by it' },
]

export const RHYTHM = [
  { value: '4–8 px', use: 'Inside a control: icon to label, badge padding' },
  { value: '12–24 px', use: 'Inside a component: card padding, list rows, field groups' },
  { value: '28–48 px', use: 'Between components in a section' },
  { value: '72 px', use: 'Between sections on a page' },
  { value: '88–96 px', use: 'Before the pager and footer' },
]

export const RADII = [
  { token: '--r-sm', value: '4px', use: 'Every control: buttons, filters, inputs, badges' },
  { token: '--r-md', value: '8px', use: 'Cards, panels, tables' },
]

export const ELEVATION = [
  { name: 'Hairline', value: '1px solid var(--rule)', use: 'Every UI surface: cards, tables, panels. No shadow.' },
  { name: 'Artwork lift', value: '0 10px 30px -18px rgba(ink, .55)', use: 'Creatives only, so the work sits above the proof paper.' },
]

export const MOTION = [
  { name: 'Sheet', value: '260 ms, cubic-bezier(.2, .7, .2, 1)', use: 'Menu panel slide-in. Reduced motion: 150 ms fade.' },
  { name: 'Stagger', value: '300 ms + 28 ms per item', use: 'Menu links settling in. Reduced motion: none.' },
  { name: 'Settle', value: '180–350 ms, cubic-bezier(.16, 1, .3, 1)', use: 'Folder chevrons, sign-off meter.' },
  { name: 'Logo reveal', value: '1.3 s, staged', use: 'Header leaf mark on page load: roundel, outline draw, fill, veins, wordmark unmask. Sways on hover.' },
  { name: 'Draw', value: '1.1 s, cubic-bezier(.16, 1, .3, 1)', use: 'Home dimension lines drawing out, after the logo reveal.' },
]

export const BREAKPOINTS = [
  { name: 'Phone', range: 'up to 559 px', notes: 'Single column, stacked tables, compact board' },
  { name: 'Large phone', range: '560 to 759 px', notes: 'Two-up galleries begin, filters wrap' },
  { name: 'Tablet', range: '760 to 999 px', notes: 'Two-column footer and forms, side-by-side before and after' },
  { name: 'Laptop', range: '1000 to 1239 px', notes: 'QA and reflection side columns, three-column board' },
  { name: 'Desktop', range: '1240 px and up', notes: 'Five-column board, seven-step horizontal process flow' },
]

export const Z = [
  { token: '--z-sticky', value: 20, use: 'Gallery toolbar' },
  { token: '--z-header', value: 50, use: 'Sticky header' },
  { token: '--z-overlay', value: 80, use: 'Menu scrim' },
  { token: '--z-modal', value: 90, use: 'Menu sheet' },
  { token: '--z-skip', value: 100, use: 'Skip link' },
]

export const PRINCIPLES = [
  { k: 'Measure, don’t eyeball', d: 'Every ratio, size and weight on the site is computed from the thing itself. If a value can be checked, the page checks it.' },
  { k: 'The work sits on the proof', d: 'The interface is cool proof paper and spec ink. Colour and depth belong to the creatives, so they read as the subject.' },
  { k: 'Say it in words, then in colour', d: 'Status is always an icon and a word. Colour reinforces meaning; it never carries it alone.' },
]
