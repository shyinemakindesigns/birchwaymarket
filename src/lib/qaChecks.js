import { evaluate } from './contrast.js'
import { BRAND, C } from '../data/brand.js'
import { LAYOUTS, DRAFT_300x250 } from '../creative/layouts.js'

const r1 = (n) => Math.round(n * 10) / 10
const fmt = (n) => `${Math.round(n)} px`

// status: 'pass' | 'fail' | 'na' | 'placeholder'
export function buildChecks({ spec, draft, m }) {
  const L = draft ? DRAFT_300x250 : LAYOUTS[spec.id]
  const groups = []
  if (!m) return skeleton(spec, L)

  const els = ['logo', 'text', 'cta', 'legal'].filter((k) => m.boxes[k])
  const safe = spec.safe

  // ---------- Spec compliance ----------
  const dimsOk = m.canvas.w === spec.w && m.canvas.h === spec.h
  let worst = null
  els.forEach((k) => {
    const b = m.boxes[k]
    const gaps = [
      ['left', b.x - safe.left], ['top', b.y - safe.top],
      ['right', spec.w - (b.x + b.w) - safe.right], ['bottom', spec.h - (b.y + b.h) - safe.bottom],
    ]
    gaps.forEach(([side, g]) => {
      if (!worst || g < worst.g) worst = { k, side, g, edge: side === 'left' ? b.x : side === 'top' ? b.y : side === 'right' ? spec.w - (b.x + b.w) : spec.h - (b.y + b.h) }
    })
  })
  const NAMES = { logo: 'Logo', text: 'Headline block', cta: 'CTA', legal: 'Legal line' }
  const safeOk = worst.g >= -0.5
  const weightOk = spec.limitKb == null ? null : spec.weightKb <= spec.limitKb

  groups.push({
    id: 'spec', title: 'Spec compliance',
    items: [
      {
        id: 'dims', label: 'Canvas dimensions match the spec',
        detail: `Measured ${m.canvas.w} × ${m.canvas.h} px against a ${spec.w} × ${spec.h} px spec.`,
        status: dimsOk ? 'pass' : 'fail',
      },
      {
        id: 'weight', label: 'File weight within limit',
        detail: spec.limitKb == null
          ? `Working file (${spec.weight}). No delivery limit applies.`
          : `${spec.weight} against ${spec.limit}. ${spec.weightMeasured ? 'Measured from the exported JPG.' : 'Illustrative export weight.'}`,
        status: weightOk == null ? 'na' : weightOk ? 'pass' : 'fail',
      },
      {
        id: 'safe', label: 'Logo, copy and CTA inside the safe zone',
        detail: safeOk
          ? `Closest element: ${NAMES[worst.k].toLowerCase()}, ${fmt(worst.edge)} from the ${worst.side} edge. Live area starts at ${fmt(safe[worst.side])}. ${safe.note}`
          : `${NAMES[worst.k]} sits ${fmt(worst.edge)} from the ${worst.side} edge; the live area starts at ${fmt(safe[worst.side])}.`,
        status: safeOk ? 'pass' : 'fail',
      },
      {
        id: 'bleed', label: 'Bleed',
        detail: 'Screen delivery, so bleed is 0 px. Bleed only applies if this artwork is reused for print.',
        status: 'na',
      },
    ],
  })

  // ---------- Brand compliance ----------
  const lg = m.boxes.logo
  const unit = L.logo.h / 2
  const edgeGap = Math.min(lg.x, lg.y, spec.w - (lg.x + lg.w), spec.h - (lg.y + lg.h))
  const gapTo = (b) => {
    const dx = Math.max(b.x - (lg.x + lg.w), lg.x - (b.x + b.w), 0)
    const dy = Math.max(b.y - (lg.y + lg.h), lg.y - (b.y + b.h), 0)
    return Math.max(dx, dy)
  }
  const neighbourGap = Math.min(...['text', 'cta', 'legal'].filter((k) => m.boxes[k]).map((k) => gapTo(m.boxes[k])))
  const clear = Math.min(edgeGap, neighbourGap)
  const clearOk = clear >= unit - 0.5

  const hl = m.styles.hl
  const cta = m.styles.cta
  const approved = new Set(Object.values(C))
  const colourIssues = []
  if (hl.color !== C.cream) colourIssues.push(`headline is ${hl.color}`)
  if (m.styles.sub && m.styles.sub.color !== C.wheat) colourIssues.push(`supporting copy is ${m.styles.sub.color}`)
  if (cta && cta.bg !== C.cranberry) colourIssues.push(`CTA fill is ${cta.bg}${approved.has(cta.bg) ? ` (${nameOf(cta.bg)}, restricted to illustration)` : ''}`)
  if (m.rootBg !== C.spruce) colourIssues.push(`background is ${m.rootBg}`)

  const fontsOk = hl.font.includes('Young Serif') && ['sub', 'cta', 'legal'].every((k) => !m.styles[k] || m.styles[k].font.includes('Archivo'))
  const expectedHl = LAYOUTS[spec.id].hl
  const hlOk = Math.abs(hl.size - expectedHl) < 0.5

  groups.push({
    id: 'brand', title: 'Brand guideline compliance',
    items: [
      {
        id: 'clearspace', label: 'Logo clearspace',
        detail: clearOk
          ? `Tightest clearspace measured at ${r1(clear)} px; the rule is half the mark height, ${r1(unit)} px.`
          : `Logo has ${r1(clear)} px of clearspace; the rule is half the mark height, ${r1(unit)} px.`,
        status: clearOk ? 'pass' : 'fail',
      },
      {
        id: 'logosize', label: 'Logo at or above minimum size',
        detail: `Mark is ${L.logo.h} px tall; digital minimum is 20 px.`,
        status: L.logo.h >= 20 ? 'pass' : 'fail',
      },
      {
        id: 'colour', label: 'Colour accuracy against approved tokens',
        detail: colourIssues.length
          ? `Off-token: ${colourIssues.join('; ')}.`
          : `Background ${m.rootBg}, headline ${hl.color}${m.styles.sub ? `, copy ${m.styles.sub.color}` : ''}${cta ? `, CTA ${cta.bg}` : ''}. All match approved tokens.`,
        status: colourIssues.length ? 'fail' : 'pass',
      },
      {
        id: 'type', label: 'Approved typography only',
        detail: fontsOk ? 'Headline set in Young Serif; supporting copy, CTA and legal in Archivo.' : 'A non-approved typeface was detected.',
        status: fontsOk ? 'pass' : 'fail',
      },
      {
        id: 'scale', label: 'Headline size matches the cross-size type scale',
        detail: hlOk
          ? `Headline set at ${r1(hl.size)} px, matching the approved ${expectedHl} px for this spec.`
          : `Headline set at ${r1(hl.size)} px; the approved size for ${spec.w} × ${spec.h} is ${expectedHl} px.`,
        status: hlOk ? 'pass' : 'fail',
      },
    ],
  })

  // ---------- Accessibility ----------
  const pairs = [
    { key: 'hl', label: 'headline', fg: hl.color, bg: m.rootBg, large: true },
    m.styles.sub && { key: 'sub', label: L.signoff ? 'sign-off line' : 'supporting copy', fg: m.styles.sub.color, bg: m.rootBg, large: m.styles.sub.size >= 24 },
    cta && { key: 'cta', label: 'CTA label', fg: cta.color, bg: cta.bg, large: cta.size >= 24 },
    { key: 'legal', label: 'legal line', fg: m.styles.legal.color, bg: m.rootBg, large: false },
  ].filter(Boolean)

  const contrastItems = pairs.map((p) => {
    const e = evaluate(p.fg, p.bg, { largeText: p.large })
    return {
      id: `contrast-${p.key}`,
      label: `Contrast: ${p.label}`,
      detail: `${p.fg} on ${p.bg}: ${e.label}. Needs ${e.threshold}:1 (${p.large ? 'large text' : 'normal text'}).`,
      status: e.pass ? 'pass' : 'fail',
      ratio: e.label,
      swatch: [p.fg, p.bg],
    }
  })

  const alt = spec.alt || ''
  const altMentionsCopy = alt.includes(BRAND.copy.headline)
  const altMentionsCta = !L.cta && !L.ctaAbs ? true : alt.toLowerCase().includes('button')
  groups.push({
    id: 'a11y', title: 'Accessibility',
    items: [
      ...contrastItems,
      {
        id: 'alt', label: 'Alt text present and describes the message',
        detail: alt
          ? `${alt.length} characters. ${altMentionsCopy ? 'Includes the headline' : 'Missing the headline'}${altMentionsCta ? (L.cta || L.ctaAbs ? ' and the CTA.' : '; no CTA on this size.') : ', missing the CTA.'}`
          : 'No alt text.',
        status: alt && altMentionsCopy && altMentionsCta ? 'pass' : 'fail',
      },
      {
        id: 'colouronly', label: 'No meaning carried by colour alone',
        detail: 'The offer and CTA are both stated in words. Needs a reviewer to confirm by eye.',
        status: 'manual',
      },
    ],
  })

  // ---------- Legal (illustrative) ----------
  groups.push({
    id: 'legal', title: 'Legal and compliance', illustrative: true,
    items: [
      { id: 'disclaimer', label: 'Pricing disclaimer slot present', detail: m.boxes.legal ? 'Placeholder line rendered. Real copy comes from legal.' : 'Missing.', status: 'placeholder' },
      { id: 'lockup', label: 'Legal lockup slot reserved', detail: 'Space reserved for a legal lockup. Generic placeholder only.', status: 'placeholder' },
      { id: 'dates', label: 'Offer dates match the media plan', detail: 'Placeholder check. No offer dates appear until legal supplies them.', status: 'placeholder' },
    ],
  })

  return groups
}

// Same groups and rows as the measured result, shown while the creative is
// still being read back, so the checklist never jumps when results land.
function skeleton(spec, L) {
  const row = (id, label) => ({ id, label, detail: 'Measuring the rendered creative…', status: 'pending' })
  return [
    { id: 'spec', title: 'Spec compliance', items: [row('dims', 'Canvas dimensions match the spec'), row('weight', 'File weight within limit'), row('safe', 'Logo, copy and CTA inside the safe zone'), row('bleed', 'Bleed')] },
    { id: 'brand', title: 'Brand guideline compliance', items: [row('clearspace', 'Logo clearspace'), row('logosize', 'Logo at or above minimum size'), row('colour', 'Colour accuracy against approved tokens'), row('type', 'Approved typography only'), row('scale', 'Headline size matches the cross-size type scale')] },
    { id: 'a11y', title: 'Accessibility', items: [
      row('contrast-hl', 'Contrast: headline'),
      ...(L.sub || L.signoff ? [row('contrast-sub', `Contrast: ${L.signoff ? 'sign-off line' : 'supporting copy'}`)] : []),
      ...(L.cta || L.ctaAbs ? [row('contrast-cta', 'Contrast: CTA label')] : []),
      row('contrast-legal', 'Contrast: legal line'), row('alt', 'Alt text present and describes the message'), row('colouronly', 'No meaning carried by colour alone'),
    ] },
    { id: 'legal', title: 'Legal and compliance', illustrative: true, items: [row('disclaimer', 'Pricing disclaimer slot present'), row('lockup', 'Legal lockup slot reserved'), row('dates', 'Offer dates match the media plan')] },
  ]
}

function nameOf(hex) {
  const e = Object.values(BRAND.colors).find((c) => c.hex === hex)
  return e ? e.name : hex
}
