// Direction B campaign set: the four formats from the Claude Design file,
// corrected. Positions are in each format's own pixel space.
// frame = gilt hairline inset, arch = outer gilt outline {x, y, w, h} with the
// filled arch `gap` inside it, logo.size = "Birchway" font size.
export const FORMATS = {
  master: {
    w: 1200, h: 628, name: 'Master', platform: 'Landscape social and display (1.91:1)',
    safe: { top: 40, right: 48, bottom: 40, left: 48 },
    layout: {
      frame: 16,
      arch: { x: 654, y: 58, w: 488, h: 570, stroke: 1.5, gap: 14 },
      logo: { x: 64, y: 64, size: 42 },
      text: { x: 64, y: 168, w: 520, gap: 18 },
      eyebrow: 13, hl: 72, lines: ['Home for', 'the Holidays'], sub: 18, cta: { fs: 16, py: 16, px: 28 },
      legal: { x: 64, y: 568, fs: 12 },
    },
    alt: 'Direction B master, 1200 by 628: Birchway wordmark with gilt birch-bark rules, Holiday 2026 eyebrow, the headline "Home for the Holidays", the line "Everything for the table, from our kitchens to yours", a Cranberry "Shop the Season" button, and an illustrated holiday table inside a gilt-outlined arch on the right.',
  },
  story: {
    w: 1080, h: 1920, name: 'Story', platform: 'Instagram and Facebook Stories (9:16)',
    safe: { top: 250, right: 64, bottom: 250, left: 64 },
    layout: {
      frame: 28,
      logo: { y: 266, size: 76, center: true },
      arch: { x: 180, y: 426, w: 720, h: 680, stroke: 2, gap: 22 },
      rule: { y: 1106, x1: 150, x2: 930 },
      text: { y: 1150, w: 900, gap: 26, center: true },
      eyebrow: 24, hl: 124, lines: ['Home for', 'the Holidays'], sub: null, cta: { fs: 34, py: 30, px: 56 },
      legal: { inline: true, fs: 20 },
    },
    alt: 'Direction B story, 1080 by 1920: centred wordmark below the top safe zone, an arched illustration of the holiday table, a gilt rule, the Holiday 2026 eyebrow, the headline "Home for the Holidays" and a Cranberry "Shop the Season" button, all above the bottom safe zone.',
  },
  square: {
    w: 1080, h: 1080, name: 'Square feed', platform: 'Instagram and Facebook feed (1:1)',
    safe: { top: 60, right: 60, bottom: 60, left: 60 },
    layout: {
      frame: 24,
      arch: { x: 548, y: 228, w: 476, h: 852, stroke: 2, gap: 20 },
      logo: { x: 84, y: 84, size: 58 },
      text: { x: 84, y: 300, w: 440, gap: 24 },
      eyebrow: 18, hl: 100, lines: ['Home', 'for the', 'Holidays'], sub: 24, cta: null,
      ctaAbs: { x: 84, y: 876, fs: 24, py: 22, px: 38 },
      legal: { x: 84, y: 984, fs: 16 },
    },
    alt: 'Direction B square post, 1080 by 1080: wordmark, eyebrow, the headline "Home for the Holidays" over three lines, supporting line and Cranberry button on the left, with a tall arch holding the holiday table illustration on the right.',
  },
  leaderboard: {
    w: 728, h: 90, name: 'Leaderboard', platform: 'Display, IAB 728 × 90',
    safe: { top: 8, right: 10, bottom: 8, left: 10 },
    layout: {
      frame: 5,
      arch: { x: 18, y: 14, w: 68, h: 76, stroke: 1, gap: 5 },
      logo: { x: 108, y: 32, size: 26, compact: true },
      divider: { x: 250, y: 25, h: 40 },
      text: { x: 272, y: 22, w: 300, gap: 6 },
      eyebrow: null, hl: 24, lines: null, sub: null, cta: null,
      ctaAbs: { x: 560, y: 27, fs: 12.5, py: 10, px: 15 },
      legal: { x: 272, y: 60, fs: 8 },
    },
    alt: 'Direction B leaderboard, 728 by 90: a small arch with the illustration, the compact Birchway wordmark, a gilt divider, the headline "Home for the Holidays" on one line and a Cranberry "Shop the Season" button.',
  },
}

// The Story exactly as positioned in the Claude Design file, for the
// before/after: logo inside the top 250 px band, copy running into the bottom one.
export const STORY_AS_RECEIVED = {
  frame: 28,
  logo: { y: 180, size: 76, center: true },
  arch: { x: 104, y: 356, w: 872, h: 872, stroke: 2, gap: 22 },
  rule: { y: 1228, x1: 104, x2: 976 },
  text: { y: 1290, w: 900, gap: 26, center: true },
  eyebrow: 24, hl: 124, lines: ['Home for', 'the Holidays'], sub: null, cta: { fs: 34, py: 30, px: 56 },
  legal: { inline: true, fs: 20 },
}
