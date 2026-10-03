// Project overview content. FAQ entries are also written into the page's
// FAQPage structured data at build time (scripts/prerender.mjs), so the
// visible answers and the machine-readable ones never drift apart.

export const SUMMARY = [
  'Birchway Market: Home for the Holidays is a self-directed creative production case study built around a fictional grocery brand. It takes one approved holiday key visual and carries it through the whole production job: intake brief, marketing strategy, adaptation to eight display, social and digital out-of-home specs, an animated HTML5 banner, copy for every placement, a measured QA checklist, asset management, a workload board and delivery.',
  'Every claim on the site can be checked on the site. The creatives render at true pixel size, so the QA page measures them directly; contrast is computed, not stated; character counts are counted; and anything that was not measured, such as market data or forecast rates, is labelled as an assumption.',
]

export const AT_A_GLANCE = [
  { n: '8', k: 'Platform specs adapted from one master' },
  { n: '1', k: 'Animated HTML5 banner, IAB weight and loop limits' },
  { n: '12', k: 'Lines of platform copy checked against character limits' },
  { n: '4', k: 'Ready-to-post social posts with tags and alt text' },
  { n: '13', k: 'Vector kit pieces: elements, compositions, patterns' },
  { n: 'AA', k: 'WCAG 2.1 contrast, measured in light and dark themes' },
]

// Reading paths. Each step is a chapter path plus what to look for.
export const PATHS = [
  {
    k: 'Recruiter',
    time: '3 minutes',
    steps: [
      { to: '/reflection', look: 'The role mapped to this project, row by row, and the honest split between my work and AI tools.' },
      { to: '/gallery', look: 'The finished work: one master, eight sizes, one animated banner.' },
      { to: '/qa', look: 'How quality is checked: measured values, not ticks.' },
    ],
  },
  {
    k: 'Creative or design lead',
    time: '8 minutes',
    steps: [
      { to: '/gallery', look: 'Crop and hierarchy decisions per format, with safe zones on.' },
      { to: '/brand-graphics', look: 'The illustration as a layered, reusable vector kit.' },
      { to: '/brand-direction', look: 'An incoming brand file reviewed and corrected against specs.' },
      { to: '/design-system', look: 'Brand and interface rules, tokens and components.' },
    ],
  },
  {
    k: 'Project manager or producer',
    time: '6 minutes',
    steps: [
      { to: '/brief', look: 'The intake ticket, deliverables and deadline window.' },
      { to: '/board', look: 'Eight requests across five stages, with a review WIP limit.' },
      { to: '/process', look: 'Who owns each step from brief to platform delivery.' },
      { to: '/assets', look: 'Folder structure, naming convention and versioning rules.' },
    ],
  },
  {
    k: 'Marketing lead',
    time: '6 minutes',
    steps: [
      { to: '/strategy', look: 'Audience, research plan, competitor gaps, platform roles and the traffic forecast.' },
      { to: '/copy', look: 'Platform copy, social posts, hashtags, and the SEO, AEO and GEO plan.' },
    ],
  },
]

export const SKILLS = [
  { k: 'Creative production', d: 'Adapting an approved master to IAB display, Meta social and DOOH specs without redesigning it; safe zones, file weights and export naming.', to: '/gallery' },
  { k: 'Quality control', d: 'A checklist that measures size, clearspace, colour and contrast on the rendered file, with a v1 to v2 revision tracked through it.', to: '/qa' },
  { k: 'Digital asset management', d: 'Folder structure, a six-segment naming convention, versioning and archive rules, and a live filename checker.', to: '/assets' },
  { k: 'Workload and process', d: 'Intake, prioritisation, stages, WIP limits and stakeholder rounds against a fixed deadline.', to: '/board' },
  { k: 'Copywriting', d: 'A voice, headlines and body copy for search, social, email and display, each fitted to its character limit.', to: '/copy' },
  { k: 'Marketing strategy', d: 'Audience segments, research hypotheses, competitor gaps, positioning, platform roles, a traffic forecast and A/B tests.', to: '/strategy' },
  { k: 'Social and search', d: 'Ready-to-post captions, hashtag strategy, keyword clusters, and SEO, AEO and GEO applied to a real site.', to: '/copy' },
  { k: 'Design and illustration', d: 'Vector illustration built as a reusable kit, brand rules and a full design system with light and dark themes.', to: '/brand-graphics' },
  { k: 'HTML5 and front end', d: 'An IAB-compliant HTML5 banner package and this prerendered React site, accessible to WCAG 2.1 AA.', to: '/gallery' },
]

export const TOOLS = [
  { k: 'Adobe Illustrator', d: 'Vector logo and illustration refinement' },
  { k: 'Figma', d: 'Layout at true size and banner motion prototyping' },
  { k: 'Canva', d: 'Template research and platform size presets' },
  { k: 'Claude Design', d: 'Concept routes and brand direction B' },
  { k: 'Claude Code', d: 'Production build of the creatives, banner package and site' },
  { k: 'Google Trends, Keyword Planner, Meta Ad Library', d: 'The research methods in the strategy (planned, not run)' },
  { k: 'HTML, CSS, JavaScript, React', d: 'Banner package and this site' },
  { k: 'axe, Lighthouse', d: 'Accessibility and performance audits of this site' },
]

export const FAQ = [
  { q: 'What is the Birchway Market case study?', a: 'A self-directed creative production portfolio project. One holiday key visual for a fictional grocery brand is adapted to eight platform specs and an animated HTML5 banner, then checked, filed, tracked and delivered, with the strategy and copy that support it.' },
  { q: 'Is Birchway Market a real company?', a: 'No. Birchway Market is a fictional brand created for this exercise. No real retailer’s name, branding, logos or trademarks are used anywhere in the project.' },
  { q: 'Which platform specs are covered?', a: 'IAB display units 300 × 250, 728 × 90, 160 × 600 and 300 × 600; Instagram and Facebook feed 1080 × 1080, Stories 1080 × 1920 and link posts 1200 × 628; a 1920 × 1080 digital out-of-home screen; and an animated 300 × 250 HTML5 banner.' },
  { q: 'What tools were used?', a: 'Adobe Illustrator for vectors, Figma for layout and motion, Canva for template and size research, Claude Design for concept routes, and Claude Code for the production build. The reflection chapter sets out which decisions were mine and where AI did the work.' },
  { q: 'Are the performance numbers real?', a: 'No. The traffic forecast shows the method with placeholder planning rates, and is labelled that way. Measured values on the site are limited to things the page can check itself, such as contrast, dimensions, file weights and character counts.' },
]
