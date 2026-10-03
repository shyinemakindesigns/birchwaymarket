// Real platform specs. Display sizes are IAB standard units; file-weight
// limits for display follow the IAB / Google Ads 150 KB HTML5 & static
// guidance. Social sizes follow Meta / LinkedIn recommended image specs.
// DOOH limits vary by media owner, so the target below is an internal one
// and is labelled as such.
//
// "weight" is the exported file weight. These creatives are rendered as
// live code layouts on this site rather than exported files, so weights are
// illustrative, except the HTML5 package and the 300x250 exports (public/exports),
// which are measured.

const N = (channel, size, v, ext = 'jpg') => `BirchwayMarket_Holiday2026_${channel}_${size}_${v}.${ext}`

export const SPECS = {
  master: {
    id: 'master', w: 1800, h: 1200, name: 'Master key visual', channel: 'Master', folder: '01_Master',
    platform: 'Source artwork for every adaptation',
    file: N('Master', '1800x1200', 'v3', 'psd'),
    limit: 'No delivery limit (working file)', weight: '84 MB working file', weightKb: null, limitKb: null,
    safe: { top: 120, right: 120, bottom: 72, left: 120, note: 'Internal live area for the master, 120 px sides.' },
    alt: 'Master key visual for Birchway Market Home for the Holidays: the Birchway Market logo top left, the headline "Home for the Holidays" in cream serif type on deep spruce green, the line "Everything for the table, gathered in one trip", a cranberry "Shop the holiday table" button, and an illustrated overhead holiday table with a lattice cranberry pie, pears, clementines and rosemary on the right.',
  },
  r300x250: {
    id: 'r300x250', w: 300, h: 250, name: 'Medium rectangle', channel: 'Display', folder: '02_Display',
    platform: 'Google Display Network and programmatic (IAB standard)',
    file: N('Display', '300x250', 'v2'),
    limit: '150 KB max', weight: '19.8 KB', weightKb: 19.8, limitKb: 150, weightMeasured: true,
    safe: { top: 10, right: 10, bottom: 10, left: 10, note: '10 px inset on all sides, internal display standard.' },
    alt: 'Birchway Market 300 by 250 medium rectangle banner: logo top left, headline "Home for the Holidays", a cranberry "Shop the holiday table" button, and a cropped view of the illustrated holiday pie on the right.',
  },
  r728x90: {
    id: 'r728x90', w: 728, h: 90, name: 'Leaderboard', channel: 'Display', folder: '02_Display',
    platform: 'Google Display Network and programmatic (IAB standard)',
    file: N('Display', '728x90', 'v2'),
    limit: '150 KB max', weight: '38 KB', weightKb: 38, limitKb: 150,
    safe: { top: 8, right: 10, bottom: 8, left: 10, note: '8 px vertical, 10 px horizontal inset.' },
    alt: 'Birchway Market 728 by 90 leaderboard banner: logo on the left, the headline "Home for the Holidays" in one line, a slice of the illustrated pie and clementines in the middle, and a cranberry "Shop the holiday table" button on the right.',
  },
  r160x600: {
    id: 'r160x600', w: 160, h: 600, name: 'Wide skyscraper', channel: 'Display', folder: '02_Display',
    platform: 'Google Display Network and programmatic (IAB standard)',
    file: N('Display', '160x600', 'v2'),
    limit: '150 KB max', weight: '46 KB', weightKb: 46, limitKb: 150,
    safe: { top: 10, right: 10, bottom: 10, left: 10, note: '10 px inset on all sides.' },
    alt: 'Birchway Market 160 by 600 wide skyscraper banner: logo at the top, the headline "Home for the Holidays" stacked over four lines, a short supporting line, a cranberry button, and the illustrated pie and pears filling the bottom half.',
  },
  r300x600: {
    id: 'r300x600', w: 300, h: 600, name: 'Half page', channel: 'Display', folder: '02_Display',
    platform: 'Google Display Network and programmatic (IAB standard)',
    file: N('Display', '300x600', 'v2'),
    limit: '150 KB max', weight: '58 KB', weightKb: 58, limitKb: 150,
    safe: { top: 12, right: 12, bottom: 12, left: 12, note: '12 px inset on all sides.' },
    alt: 'Birchway Market 300 by 600 half page banner: logo, the headline "Home for the Holidays", the line "Everything for the table, gathered in one trip", a cranberry button, and the illustrated holiday table across the lower half.',
  },
  s1080x1080: {
    id: 's1080x1080', w: 1080, h: 1080, name: 'Feed square', channel: 'Social', folder: '03_Social',
    platform: 'Instagram and Facebook feed (1:1)',
    file: N('Social', '1080x1080', 'v2'),
    limit: '30 MB platform max, 1 MB internal target', weight: '612 KB', weightKb: 612, limitKb: 1024,
    safe: { top: 60, right: 60, bottom: 60, left: 60, note: '60 px inset keeps copy clear of feed UI crops.' },
    alt: 'Birchway Market 1080 by 1080 square social post: logo and the headline "Home for the Holidays" in the top left, supporting line and cranberry button beneath, and the illustrated pie, pears and clementines filling the lower right.',
  },
  s1080x1920: {
    id: 's1080x1920', w: 1080, h: 1920, name: 'Story and Reel', channel: 'Social', folder: '03_Social',
    platform: 'Instagram and Facebook Stories and Reels (9:16)',
    file: N('Social', '1080x1920', 'v2'),
    limit: '30 MB platform max, 1 MB internal target', weight: '884 KB', weightKb: 884, limitKb: 1024,
    safe: { top: 250, right: 64, bottom: 250, left: 64, note: 'Top and bottom 250 px kept free of text and logo for profile and reply UI (Meta guidance, about 14%).' },
    alt: 'Birchway Market 1080 by 1920 vertical story: logo below the top safe zone, the headline "Home for the Holidays" in large serif type, supporting line, cranberry button, and the full illustrated holiday table in the lower half, ending above the bottom safe zone.',
  },
  s1200x628: {
    id: 's1200x628', w: 1200, h: 628, name: 'Link post', channel: 'Social', folder: '03_Social',
    platform: 'Facebook and LinkedIn link ads (1.91:1)',
    file: N('Social', '1200x628', 'v2'),
    limit: '30 MB platform max, 1 MB internal target', weight: '447 KB', weightKb: 447, limitKb: 1024,
    safe: { top: 40, right: 48, bottom: 40, left: 48, note: '48 px horizontal and 40 px vertical inset.' },
    alt: 'Birchway Market 1200 by 628 landscape link ad: logo, headline "Home for the Holidays", supporting line and cranberry button on the left half; the illustrated pie and fruit on the right half.',
  },
  d1920x1080: {
    id: 'd1920x1080', w: 1920, h: 1080, name: 'DOOH static', channel: 'DOOH', folder: '04_DOOH',
    platform: 'Digital out-of-home landscape screen, 10 s static slot',
    file: N('DOOH', '1920x1080', 'v1'),
    limit: 'Per media owner, 10 MB internal target', weight: '1.9 MB', weightKb: 1946, limitKb: 10240,
    safe: { top: 54, right: 96, bottom: 54, left: 96, note: '5% title-safe margin (96 × 54 px) for bezels and screen overscan.' },
    alt: 'Birchway Market 1920 by 1080 digital out-of-home screen: logo, large headline "Home for the Holidays" and only the sign-off "In every aisle until December 24" on the left, with no button because the screen is not clickable; the illustrated holiday table on the right.',
  },
}

export const ADAPTATIONS = ['r300x250', 'r728x90', 'r160x600', 'r300x600', 's1080x1080', 's1080x1920', 's1200x628', 'd1920x1080']

export const ANIMATED = {
  id: 'a300x250', w: 300, h: 250, name: 'Animated medium rectangle', channel: 'Animated', folder: '05_Animated',
  platform: 'Google Display Network HTML5 (Adobe Animate build, represented here as hand-off HTML/CSS/JS)',
  file: 'BirchwayMarket_Holiday2026_Animated_300x250_v1.zip',
  src: '/html5/BirchwayMarket_Holiday2026_Animated_300x250_v1/index.html',
  limit: '150 KB max initial load, 30 s max animation, 3 loops max',
}
