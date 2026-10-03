export const TICKET = {
  id: 'BWM-200',
  title: 'Holiday 2026 “Home for the Holidays”: multi-platform adaptation package',
  type: 'Creative production request',
  priority: 'High',
  requester: 'Brand Marketing, Birchway Market (fictional)',
  accountLead: 'Account and brand lead',
  assignee: 'Creative production specialist (me)',
  opened: 'Oct 5, 2026',
  status: 'Delivered',
}

export const BRIEF_SECTIONS = [
  {
    k: 'What the campaign needs',
    v: 'Birchway Market’s holiday platform is built around one idea: the whole table, sorted in one trip. Brand has signed off a single master key visual. Production needs to adapt it, without redesigning it, to every paid placement in the plan, keeping the headline, logo and offer treatment consistent across all sizes.',
  },
  {
    k: 'Audience',
    v: 'Household grocery planners, 28 to 55, hosting at least one holiday meal. They see the campaign in a feed or beside an article, usually on a phone, for under two seconds.',
  },
  {
    k: 'Single-minded message',
    v: 'Everything for the holiday table, in one trip to Birchway.',
  },
  {
    k: 'Mandatories',
    v: 'Logo with full clearspace on every size. Approved headline, unedited. Brand palette and type only. Legal lockup and pricing disclaimer slots on every size (copy to come from legal, placeholders for now). No prices in creative until legal supplies them.',
  },
]

export const DELIVERABLES = [
  { spec: '300 × 250', name: 'Medium rectangle', platform: 'Display (GDN and programmatic)', qty: 1 },
  { spec: '728 × 90', name: 'Leaderboard', platform: 'Display (GDN and programmatic)', qty: 1 },
  { spec: '160 × 600', name: 'Wide skyscraper', platform: 'Display (GDN and programmatic)', qty: 1 },
  { spec: '300 × 600', name: 'Half page', platform: 'Display (GDN and programmatic)', qty: 1 },
  { spec: '1080 × 1080', name: 'Feed square', platform: 'Instagram and Facebook feed', qty: 1 },
  { spec: '1080 × 1920', name: 'Story and Reel', platform: 'Instagram and Facebook Stories', qty: 1 },
  { spec: '1200 × 628', name: 'Link post', platform: 'Facebook and LinkedIn link ads', qty: 1 },
  { spec: '1920 × 1080', name: 'DOOH static', platform: 'Digital out-of-home, landscape', qty: 1 },
  { spec: '300 × 250', name: 'Animated HTML5', platform: 'Display (GDN HTML5)', qty: 1 },
]

// The deadline window, in order.
export const MILESTONES = [
  { date: 'Oct 5', label: 'Brief received and vetted' },
  { date: 'Oct 16', label: 'Spec sheet and folder structure locked' },
  { date: 'Oct 23', label: 'Round 1 adaptations to brand' },
  { date: 'Oct 30', label: 'Round 2 revisions closed' },
  { date: 'Nov 6', label: 'Final approval' },
  { date: 'Nov 9', label: 'Delivery to platforms' },
  { date: 'Nov 16', label: 'In market until Dec 24' },
]

export const ATTACHMENTS = [
  'BirchwayMarket_Holiday2026_Master_1800x1200_v3.psd',
  'BirchwayMarket_BrandGuidelines_v4.pdf',
  'BirchwayMarket_Holiday2026_LegalCopyDeck_PLACEHOLDER.docx',
  'BirchwayMarket_Holiday2026_MediaPlan_v2.xlsx',
]
