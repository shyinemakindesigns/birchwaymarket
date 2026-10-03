export const SITE_TITLE = 'Birchway Market: Home for the Holidays, a production case study'
export const SITE_SUFFIX = 'Birchway Market production case study'

export const PAGES = [
  { path: '/', label: 'Home', title: 'Home', description: 'A self-directed creative production case study: one master holiday creative adapted to eight IAB, social and DOOH specs, with QA, asset management, workload tracking and an HTML5 banner build. Birchway Market is a fictional brand.' },
  { path: '/brief', label: 'The brief', title: 'The brief', description: 'The intake ticket for the Birchway Market holiday campaign: deliverables across display, social and DOOH, mandatories, and a six-week deadline window.' },
  { path: '/gallery', label: 'Adaptation gallery', title: 'Creative adaptation gallery', description: 'One master creative next to eight adapted sizes at true pixel dimensions, with safe-zone overlays and a playable HTML5 banner.' },
  { path: '/qa', label: 'Creative QA', title: 'Creative QA checklist', description: 'A working creative QA checklist that measures each rendered file for spec, brand and accessibility compliance, plus one real v1 to v2 revision.' },
  { path: '/assets', label: 'Asset management', title: 'Asset management system', description: 'Campaign folder structure, a six-segment file naming convention and a live filename checker.' },
  { path: '/board', label: 'Workload board', title: 'Workload board', description: 'A Kanban workload board tracking eight concurrent creative requests from to do through delivered.' },
  { path: '/process', label: 'Process flow', title: 'Process flow', description: 'How one creative request moves from brief to platform delivery in seven steps.' },
  { path: '/brand-direction', label: 'Brand direction B', title: 'Brand direction B', description: 'A second Birchway identity designed in Claude Design, reviewed like an incoming brand file: Story safe zones, minimum type sizes and contrast corrected, with the guideline sheet rebuilt.' },
  { path: '/brand-graphics', label: 'Brand graphics', title: 'Brand graphics: illustration kit', description: 'The Birchway illustration as a reusable vector kit: a layered 3D view of the master art, six elements in three colourways, four compositions and three seamless patterns, all downloadable as SVG.' },
  { path: '/reflection', label: 'How this was built', title: 'Reflection: how this was built', description: 'What this case study was built to prove, which parts were mine, how Claude Design and Claude Code were used, and measured contrast for the whole site.' },
  { path: '/design-system', label: 'Design system', title: 'Design system', appendix: true, description: 'The Birchway design system: brand logo, colour and type rules, interface tokens in light and dark themes, live components, accessibility rules and downloadable tokens.' },
]

export const pageTitle = (page) => (!page ? `Page not found | ${SITE_SUFFIX}` : page.path === '/' ? SITE_TITLE : `${page.title} | ${SITE_SUFFIX}`)
