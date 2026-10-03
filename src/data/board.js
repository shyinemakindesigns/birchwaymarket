export const COLUMNS = [
  { id: 'todo', label: 'To do' },
  { id: 'review', label: 'In review', wip: 3 },
  { id: 'revisions', label: 'Revisions' },
  { id: 'approved', label: 'Approved' },
  { id: 'delivered', label: 'Delivered' },
]

export const PLATFORMS = ['Display', 'Social', 'DOOH', 'Animated']

// Priority is shown as text and a shape, never colour alone.
export const PRIORITIES = {
  high: { label: 'High', rank: 0 },
  medium: { label: 'Medium', rank: 1 },
  low: { label: 'Low', rank: 2 },
}

export const TICKETS = [
  { id: 'BWM-208', title: 'DOOH 1920 × 1080 static: swap CTA for a non-clickable sign-off', platform: 'DOOH', due: '2026-11-06', priority: 'high', status: 'todo', note: 'Waiting on media owner spec sheet' },
  { id: 'BWM-207', title: 'Story 1080 × 1920: re-flow headline inside 250 px safe zones', platform: 'Social', due: '2026-11-05', priority: 'medium', status: 'todo' },
  { id: 'BWM-206', title: 'Half page 300 × 600: round 2 layout', platform: 'Display', due: '2026-11-03', priority: 'medium', status: 'review' },
  { id: 'BWM-205', title: 'Feed square 1080 × 1080: brand review', platform: 'Social', due: '2026-11-04', priority: 'low', status: 'review' },
  { id: 'BWM-201', title: 'Medium rectangle 300 × 250: fix CTA contrast, logo clearspace, headline size', platform: 'Display', due: '2026-11-02', priority: 'high', status: 'revisions', note: '3 QA flags, see Creative QA' },
  { id: 'BWM-204', title: 'Animated 300 × 250 HTML5: cap at 3 loops, add static backup', platform: 'Animated', due: '2026-10-31', priority: 'high', status: 'approved' },
  { id: 'BWM-202', title: 'Leaderboard 728 × 90: single-line headline', platform: 'Display', due: '2026-10-30', priority: 'medium', status: 'approved' },
  { id: 'BWM-203', title: 'Link post 1200 × 628: export and traffic', platform: 'Social', due: '2026-10-28', priority: 'low', status: 'delivered' },
]
