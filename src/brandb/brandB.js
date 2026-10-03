// Brand direction B: the Birchway identity explored in Claude Design
// (Gloock wordmark, gilt birch-bark rules, arch frame), as corrected in the
// "Brand direction B" chapter. Direction A (src/data/brand.js) is the one the
// rest of the case study adapts; nothing here feeds the QA checklist.
export const BRAND_B = {
  name: 'Birchway Market',
  campaign: 'Home for the Holidays',
  colors: {
    spruce: { hex: '#1E3A32', name: 'Spruce', role: 'Core. Grounds every creative', share: 55 },
    birch: { hex: '#F3ECDF', name: 'Birch', role: 'Core. Headlines, wordmark, paper', share: 25 },
    cranberry: { hex: '#9B2F2A', name: 'Cranberry', role: 'Core. CTA fills only', share: 10 },
    gilt: { hex: '#C9A25E', name: 'Gilt', role: 'Accent. Rules and eyebrows, on Spruce only', share: 6 },
    bark: { hex: '#2A211C', name: 'Bark', role: 'Accent. Text on Birch', share: 4 },
    mist: { hex: '#E6DDCC', name: 'Birch Mist', role: 'Supporting copy on Spruce' },
    archFill: { hex: '#2B4A41', name: 'Arch shade', role: 'Behind photography and illustration in the arch' },
  },
  type: {
    display: { family: 'Gloock', role: 'Headlines and wordmark' },
    text: { family: 'Hanken Grotesk', role: 'Eyebrows, supporting copy, CTA, legal' },
  },
  copy: {
    headline: 'Home for the Holidays',
    eyebrow: 'Holiday 2026',
    sub: 'Everything for the table, from our kitchens to yours.',
    cta: 'Shop the Season',
    doohSignoff: 'In every aisle until December 24',
    legal: 'Offer details: legal placeholder. Illustrative only.',
  },
  // Clearspace unit x = cap height of the "B" in the wordmark (Gloock caps
  // measure ~0.7 em). The MARKET line never drops below 8 px; where it
  // would, the compact lockup (wordmark without the MARKET line) is used.
  capHeight: 0.7,
  marketMinPx: 8,
  logoRule: 'Clearspace on every side equals x, the cap height of the "B". Keep type, edges, frames and imagery outside it.',
}

export const CB = Object.fromEntries(Object.entries(BRAND_B.colors).map(([k, v]) => [k, v.hex]))
