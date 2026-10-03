// One layout per spec, authored in that spec's own pixel space.
// logo.h is the leaf-mark height = the clearspace unit.
// text: positioned flex block (column unless dir: 'row').
// type: hl / sub / cta sizes. cta: null = no button (DOOH is not clickable).
export const LAYOUTS = {
  master: {
    logo: { x: 120, y: 120, h: 96 },
    art: { x: 860, y: 40, s: 1120 },
    text: { x: 120, y: 330, w: 700, gap: 46 },
    hl: 124, sub: 38, cta: { fs: 32, py: 26, px: 46 },
    legal: { x: 120, y: 1096, fs: 20 },
  },
  r300x250: {
    logo: { x: 14, y: 14, h: 24 },
    art: { x: 148, y: 52, s: 236 },
    text: { x: 14, y: 64, w: 148, gap: 12 },
    hl: 25, sub: null, cta: { fs: 11.5, py: 7, px: 11 },
    legal: { x: 14, y: 218, fs: 8, w: 132 },
  },
  r728x90: {
    logo: { x: 20, y: 25, h: 40 },
    art: { x: 428, y: -36, s: 162 },
    text: { x: 174, y: 17, w: 270, gap: 4 },
    hl: 24, sub: null, cta: null,
    ctaAbs: { x: 558, y: 27, fs: 12.5, py: 9, px: 14 },
    legal: { x: 175, y: 60, fs: 8 },
  },
  r160x600: {
    logo: { x: 12, y: 14, h: 24 },
    art: { x: -52, y: 292, s: 270 },
    text: { x: 12, y: 74, w: 136, gap: 12 },
    hl: 30, sub: 13, cta: { fs: 11, py: 8, px: 9 },
    legal: { x: 12, y: 566, fs: 8, w: 136 },
  },
  r300x600: {
    logo: { x: 20, y: 20, h: 32 },
    art: { x: 2, y: 288, s: 290 },
    text: { x: 20, y: 86, w: 250, gap: 14 },
    hl: 42, sub: 15, cta: { fs: 14, py: 10, px: 16 },
    legal: { x: 20, y: 574, fs: 9 },
  },
  s1080x1080: {
    logo: { x: 72, y: 72, h: 60 },
    art: { x: 440, y: 400, s: 800 },
    text: { x: 72, y: 196, w: 520, gap: 30 },
    hl: 88, sub: 28, cta: { fs: 26, py: 20, px: 34 },
    legal: { x: 72, y: 990, fs: 17 },
  },
  s1080x1920: {
    logo: { x: 80, y: 290, h: 72 },
    art: { x: 90, y: 1010, s: 900 },
    text: { x: 80, y: 430, w: 900, gap: 36 },
    hl: 124, sub: 40, cta: { fs: 36, py: 26, px: 44 },
    legal: { inline: true, fs: 20 },
  },
  s1200x628: {
    logo: { x: 56, y: 52, h: 48 },
    art: { x: 610, y: -36, s: 700 },
    text: { x: 56, y: 150, w: 520, gap: 22 },
    hl: 68, sub: 23, cta: { fs: 21, py: 15, px: 26 },
    legal: { x: 56, y: 566, fs: 14 },
  },
  d1920x1080: {
    logo: { x: 132, y: 112, h: 84 },
    art: { x: 980, y: 0, s: 1080 },
    text: { x: 132, y: 320, w: 820, gap: 40 },
    hl: 150, sub: null, cta: null, signoff: 54,
    legal: { x: 132, y: 990, fs: 22 },
  },
}

// First draft of the 300x250, kept for the QA before/after.
// Three seeded issues: logo 4 px from the edge, oversized headline that
// breaks the cross-size type scale, and cream CTA text on Pear Gold.
export const DRAFT_300x250 = {
  ...LAYOUTS.r300x250,
  logo: { x: 4, y: 4, h: 24 },
  text: { x: 14, y: 48, w: 160, gap: 8 },
  hl: 33,
  cta: { fs: 11.5, py: 7, px: 11, draftFill: true },
}
