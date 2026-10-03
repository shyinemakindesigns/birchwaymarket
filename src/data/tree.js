// Folder structure for the campaign. `files` show the naming convention in use.
export const ROOT = {
  name: 'Birchway_HolidayCampaign_2026',
  note: 'Campaign root. One root per campaign per year.',
  children: [
    {
      name: '00_Admin', note: 'Brief, spec sheet, QA logs, approvals',
      files: ['BirchwayMarket_Holiday2026_Brief_BWM-200.pdf', 'BirchwayMarket_Holiday2026_SpecSheet_v2.xlsx', 'BirchwayMarket_Holiday2026_QALog_v2.xlsx'],
    },
    {
      name: '01_Master', note: 'Approved master and brand source files, read-only after sign-off',
      files: ['BirchwayMarket_Holiday2026_Master_1800x1200_v3.psd', 'BirchwayMarket_Logo_Primary_RGB.svg'],
    },
    {
      name: '02_Display', note: 'One subfolder per IAB size',
      children: [
        { name: '300x250', files: ['BirchwayMarket_Holiday2026_Display_300x250_v1.jpg', 'BirchwayMarket_Holiday2026_Display_300x250_v2.jpg'] },
        { name: '728x90', files: ['BirchwayMarket_Holiday2026_Display_728x90_v2.jpg'] },
        { name: '160x600', files: ['BirchwayMarket_Holiday2026_Display_160x600_v2.jpg'] },
        { name: '300x600', files: ['BirchwayMarket_Holiday2026_Display_300x600_v2.jpg'] },
      ],
    },
    {
      name: '03_Social', note: 'Feed, Stories and link formats',
      children: [
        { name: '1080x1080', files: ['BirchwayMarket_Holiday2026_Social_1080x1080_v2.jpg'] },
        { name: '1080x1920', files: ['BirchwayMarket_Holiday2026_Social_1080x1920_v2.jpg'] },
        { name: '1200x628', files: ['BirchwayMarket_Holiday2026_Social_1200x628_v2.jpg'] },
      ],
    },
    {
      name: '04_DOOH', note: 'Screen statics, per media owner',
      children: [{ name: '1920x1080', files: ['BirchwayMarket_Holiday2026_DOOH_1920x1080_v1.jpg'] }],
    },
    {
      name: '05_Animated', note: 'HTML5 packages with static backups',
      children: [
        {
          name: '300x250',
          files: ['BirchwayMarket_Holiday2026_Animated_300x250_v1.zip', 'BirchwayMarket_Holiday2026_Animated_300x250_v1_Backup.jpg'],
        },
      ],
    },
    { name: '06_Delivered', note: 'Exact files sent, grouped by platform and send date', files: ['2026-11-09_Meta/', '2026-11-09_GDN/', '2026-11-09_DOOH/'] },
    { name: '99_Archive', note: 'Superseded versions. Moved, never deleted.', files: [] },
  ],
}

export const SEGMENTS = [
  { part: 'BirchwayMarket', name: 'Brand', rule: 'PascalCase, no spaces' },
  { part: 'Holiday2026', name: 'Campaign and year', rule: 'Campaign name + 4-digit year' },
  { part: 'Display', name: 'Channel', rule: 'Master, Display, Social, DOOH or Animated' },
  { part: '300x250', name: 'Spec', rule: 'Width x height in px, lowercase x' },
  { part: 'v2', name: 'Version', rule: 'v1, v2, v3… up by one on every round' },
  { part: 'jpg', name: 'Format', rule: 'jpg, png, gif, zip, psd or pdf' },
]

export const NAME_RULES = [
  'Underscores between segments, never spaces or hyphens, so filenames survive every upload tool and URL.',
  'Never write “final”, “FINAL2” or “use this one”. Approval lives on the ticket; the filename only says what the file is.',
  'Versions go up by one per stakeholder round. Superseded versions move to 99_Archive so nobody can traffic the wrong one.',
  'The spec segment always matches the pixel size exactly, so a mismatch is visible before the file is opened.',
]

export const NAME_PATTERN = /^BirchwayMarket_Holiday2026_(Master|Display|Social|DOOH|Animated)_(\d{2,4})x(\d{2,4})_v([1-9]\d?)\.(jpg|png|gif|zip|psd|pdf)$/
