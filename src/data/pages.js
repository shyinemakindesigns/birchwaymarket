export const SITE_TITLE = 'Birchway Market: creative production case study'
export const SITE_SUFFIX = 'Birchway Market case study'

export const PAGES = [
  { path: '/', label: 'Home', title: 'Home', description: 'Creative production case study: one holiday master adapted to 8 IAB, social and DOOH specs, with an HTML5 banner, QA, copy, strategy and SEO. Fictional brand.' },
  { path: '/overview', label: 'Project overview', title: 'Project overview', description: 'Start here: what the Birchway Market case study covers, the skills and tools it shows, and a reading path for recruiters, creative leads and producers.' },
  { path: '/brief', label: 'The brief', title: 'The brief', description: 'The intake ticket for the Birchway Market holiday campaign: deliverables across display, social and DOOH, mandatories, and a six-week deadline window.' },
  { path: '/strategy', label: 'Marketing strategy', title: 'Marketing strategy', description: 'Holiday campaign strategy for a fictional grocer: audience segments, research plan, competitor analysis, platform roles, a traffic forecast and A/B tests.' },
  { path: '/gallery', label: 'Adaptation gallery', title: 'Creative adaptation gallery', description: 'One master creative next to eight adapted sizes at true pixel dimensions, with safe-zone overlays and a playable HTML5 banner.' },
  { path: '/copy', label: 'Copy and search', title: 'Copywriting, SEO, AEO and GEO', description: 'Campaign copywriting checked against platform character limits, ready-to-post social captions and hashtags, and an SEO, AEO and GEO plan with UTM tracking.' },
  { path: '/qa', label: 'Creative QA', title: 'Creative QA checklist', description: 'A working creative QA checklist that measures each rendered file for spec, brand and accessibility compliance, plus one real v1 to v2 revision.' },
  { path: '/assets', label: 'Asset management', title: 'Asset management system', description: 'Digital asset management for a multi-platform campaign: folder structure, a six-segment file naming convention, versioning rules and a live filename checker.' },
  { path: '/board', label: 'Workload board', title: 'Workload board', description: 'A Kanban workload board tracking eight concurrent creative requests through five stages, with priorities, due dates and a work-in-progress limit on review.' },
  { path: '/process', label: 'Process flow', title: 'Process flow', description: 'How one creative production request moves from intake brief to platform delivery in seven steps, with owners, stakeholder rounds and QA at each hand-off.' },
  { path: '/brand-direction', label: 'Brand direction B', title: 'Brand direction B', description: 'A second Birchway identity from Claude Design, reviewed like an incoming brand file: Story safe zones, minimum type sizes and contrast corrected.' },
  { path: '/brand-graphics', label: 'Brand graphics', title: 'Brand graphics and vector kit', description: 'The Birchway illustration as a reusable vector kit: a layered 3D view of the master art, elements in three colourways, compositions and patterns as SVG.' },
  { path: '/reflection', label: 'How this was built', title: 'How this was built', description: 'What this case study was built to prove, which parts were mine, how Claude Design and Claude Code were used, and measured contrast for the whole site.' },
  { path: '/design-system', label: 'Design system', title: 'Design system', appendix: true, description: 'The Birchway design system: logo, colour and type rules, interface tokens in light and dark themes, live components, accessibility rules and tokens.' },
]

export const pageTitle = (page) => (!page ? `Page not found | ${SITE_SUFFIX}` : page.path === '/' ? SITE_TITLE : `${page.title} | ${SITE_SUFFIX}`)
