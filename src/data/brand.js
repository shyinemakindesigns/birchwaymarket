// Birchway Market is a fictional brand created for this exercise.
// These are the approved creative tokens the QA checklist validates against.
export const BRAND = {
  name: 'Birchway Market',
  campaign: 'Home for the Holidays',
  colors: {
    spruce: { hex: '#23483A', name: 'Birchway Spruce', role: 'Primary background' },
    cream: { hex: '#F6F0E1', name: 'Hearth Cream', role: 'Headline and CTA text' },
    cranberry: { hex: '#9B2335', name: 'Cranberry', role: 'CTA fill' },
    wheat: { hex: '#E9D9A6', name: 'Wheat', role: 'Supporting copy' },
    pear: { hex: '#D8B24A', name: 'Pear Gold', role: 'Illustration only, never text or fills behind text' },
    clementine: { hex: '#E07B2A', name: 'Clementine', role: 'Illustration only' },
  },
  type: {
    display: { family: 'Young Serif', role: 'Headlines' },
    text: { family: 'Archivo', role: 'Supporting copy, CTA, legal' },
  },
  copy: {
    headline: 'Home for the Holidays',
    sub: 'Everything for the table, gathered in one trip.',
    cta: 'Shop the holiday table',
    doohSignoff: 'In every aisle until December 24',
    legal: 'Offer details: legal placeholder. Illustrative only.',
  },
  logoRule: 'Clearspace on every side equals half the height of the leaf mark. Minimum mark height in digital: 20 px.',
}

export const C = Object.fromEntries(Object.entries(BRAND.colors).map(([k, v]) => [k, v.hex]))
