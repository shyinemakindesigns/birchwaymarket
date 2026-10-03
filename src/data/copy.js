// Copywriting, social and search content for the fictional Birchway Market
// holiday campaign. Character counts on the page are computed from these
// strings, so a change here re-checks itself. birchway.example is a reserved
// example domain, used because the brand does not exist.

export const VOICE = [
  { k: 'Warm, not sugary', do: 'Talk about the table, the people and the food.', dont: 'Exclamation marks, “magical”, “festive cheer”.' },
  { k: 'Useful first', do: 'Lead with what helps: what to buy, how much, when stores close.', dont: 'Claims that need a footnote, or offers legal has not approved.' },
  { k: 'Plain and specific', do: 'Name the pear, the pie, the date.', dont: '“Elevate your holiday”, “unforgettable moments”, generic superlatives.' },
]

// Limits: platform maximums where one exists, published recommendations
// where the text truncates rather than fails. "kind" says which.
export const PLATFORM_COPY = [
  { platform: 'Google responsive search ad', field: 'Headline 1', text: 'Holiday Groceries in One Trip', limit: 30, kind: 'max' },
  { platform: 'Google responsive search ad', field: 'Headline 2', text: 'Everything for the Table', limit: 30, kind: 'max' },
  { platform: 'Google responsive search ad', field: 'Headline 3', text: 'Holiday Hours and Checklist', limit: 30, kind: 'max' },
  { platform: 'Google responsive search ad', field: 'Description', text: 'Seasonal produce, baking basics and the centrepiece pie. Find your nearest Birchway.', limit: 90, kind: 'max' },
  { platform: 'Meta feed ad', field: 'Primary text', text: 'The pie, the pears, the cranberries and the cream. Everything for the holiday table, gathered in one trip.', limit: 125, kind: 'truncates' },
  { platform: 'Meta feed ad', field: 'Headline', text: 'Shop the holiday table', limit: 27, kind: 'truncates' },
  { platform: 'Meta feed ad', field: 'Description', text: 'In every aisle until Dec 24', limit: 27, kind: 'truncates' },
  { platform: 'Pinterest pin', field: 'Title', text: 'Holiday dinner checklist for 8: everything for the table in one trip', limit: 100, kind: 'max' },
  { platform: 'Email', field: 'Subject line', text: 'Your holiday table, sorted in one trip', limit: 50, kind: 'truncates' },
  { platform: 'Email', field: 'Preheader', text: 'Pears, clementines and a lattice pie, plus a printable list.', limit: 90, kind: 'truncates' },
  { platform: 'Search result', field: 'SEO title', text: 'Holiday Dinner Checklist and Groceries | Birchway Market', limit: 60, kind: 'truncates' },
  { platform: 'Search result', field: 'Meta description', text: 'Plan the whole holiday table in one trip: a printable checklist with quantities for 4 to 12 guests, holiday store hours and seasonal recipes.', limit: 155, kind: 'truncates' },
]

export const POSTS = [
  {
    k: 'Instagram feed carousel',
    asset: 'Feed square 1080 × 1080, then the four kit compositions as slides 2 to 5',
    to: '/gallery',
    caption: 'The whole holiday table, one trip. Swipe for what goes on it: a cranberry lattice pie, pears for the cheese board, clementines for the kids’ table and rosemary for everything else.\n\nSave this for your list, then tell us what your table can’t do without.',
    tags: ['#BirchwayTable', '#HolidayHosting', '#ChristmasDinner', '#HolidayBaking'],
    alt: 'Overhead holiday table on deep green: a cranberry lattice pie on a cream plate, surrounded by pears, clementines, cranberries and rosemary.',
    cta: 'Save, then comment',
  },
  {
    k: 'Reel and TikTok, 15 seconds',
    asset: 'Story 1080 × 1920 as the end frame; recipe footage shot to the kit’s layout',
    to: '/brand-graphics',
    caption: 'Lattice pie, no stress. Five strips one way, five the other, over and under. Everything for it is in one aisle at Birchway.',
    tags: ['#BirchwayTable', '#CranberryPie', '#HolidayRecipes', '#PieTok'],
    alt: 'Hands weave pastry strips into a lattice over cranberry filling, then the finished pie on a holiday table.',
    cta: 'Watch, save, shop',
    script: ['0 to 2 s: hook on screen, “Lattice pie, no stress.”', '2 to 11 s: weave in four cuts, captions burned in for sound-off viewing.', '11 to 15 s: end frame with logo and “In every aisle until December 24”.'],
  },
  {
    k: 'Pinterest pin',
    asset: 'Spot illustration with the checklist, 1000 × 1500',
    to: '/brand-graphics',
    caption: 'Holiday dinner checklist for 8 guests: quantities for the main, sides, dessert and drinks, plus store hours for the last week before December 24. Printable, one page, everything from one trip to Birchway Market.',
    tags: ['holiday dinner checklist', 'christmas dinner for 8', 'holiday hosting tips'],
    alt: 'A one-page holiday dinner checklist beside an illustrated pear, clementine and cranberries.',
    cta: 'Save the checklist',
    keywordsNote: 'Pinterest search reads keywords in the title and description, so this post uses phrases rather than hashtags.',
  },
  {
    k: 'Facebook post, holiday hours',
    asset: 'Link post 1200 × 628',
    to: '/gallery',
    caption: 'Last-minute list? Most Birchway stores are open until 6 pm on December 24. Check your store’s holiday hours before you head out.',
    tags: ['#BirchwayTable'],
    alt: 'Holiday table illustration with the headline Home for the Holidays and the Birchway Market logo.',
    cta: 'Check store hours',
    hoursNote: 'Store hours are a placeholder until operations confirms them.',
  },
]

export const HASHTAGS = [
  { tag: '#BirchwayTable', tier: 'Branded', benefit: 'Collects customer posts in one feed for reposting with permission, and gives a clean count of campaign mentions.', use: 'Every post' },
  { tag: '#HolidayHosting', tier: 'Community', benefit: 'Reaches people actively planning a gathering, the host segment.', use: 'Planning content' },
  { tag: '#ChristmasDinner', tier: 'Broad topic', benefit: 'High volume discovery; crowded, so it supports reach rather than driving it.', use: 'Hero posts' },
  { tag: '#HolidayBaking', tier: 'Topic', benefit: 'Matches the pie content and the contributor segment.', use: 'Recipe content' },
  { tag: '#CranberryPie', tier: 'Niche', benefit: 'Lower volume, higher intent: people looking for this exact dish.', use: 'Recipe Reel' },
  { tag: '#PieTok', tier: 'Platform community', benefit: 'An established TikTok baking community; native placement for the recipe video.', use: 'TikTok only' },
]

export const KEYWORDS = [
  { cluster: 'Planning', intent: 'Informational', terms: ['holiday dinner checklist', 'how much food for christmas dinner for 8', 'christmas dinner ideas'], page: 'Checklist landing page' },
  { cluster: 'Recipes', intent: 'Informational', terms: ['cranberry lattice pie', 'pear and cranberry pie recipe', 'easy holiday dessert'], page: 'Recipe pages with Recipe schema' },
  { cluster: 'Store', intent: 'Navigational and local', terms: ['grocery store open christmas eve near me', 'birchway market holiday hours'], page: 'Store pages with holiday hours' },
  { cluster: 'Shopping', intent: 'Commercial', terms: ['holiday groceries online', 'christmas grocery pickup'], page: 'Online order and pickup page' },
]

export const SEARCH_PLAYBOOK = [
  {
    k: 'SEO',
    full: 'Search engine optimisation',
    goal: 'Rank the landing, recipe and store pages for the four keyword clusters.',
    items: [
      'One page per intent, each with a unique title under 60 characters and a description under 155.',
      'Short descriptive URLs: /holiday, /holiday/checklist, /recipes/cranberry-lattice-pie.',
      'Structured data: Organization, GroceryStore with special opening hours, Recipe, BreadcrumbList.',
      'Server-rendered HTML, fast pages and image alt text, so crawlers read the content without JavaScript.',
      'Internal links from every campaign page to the checklist and store finder.',
    ],
  },
  {
    k: 'AEO',
    full: 'Answer engine optimisation',
    goal: 'Be the answer pulled into featured snippets and voice assistants.',
    items: [
      'Question headings in the words people search: “How much turkey for 8 people?”',
      'Answer first, in 40 to 60 words, then the detail.',
      'Lists and tables for quantities, which answer boxes lift cleanly.',
      'FAQPage markup for machine readability. Google has shown FAQ rich results mainly for government and health sites since 2023, so it is there for clarity, not for a rich result.',
    ],
  },
  {
    k: 'GEO',
    full: 'Generative engine optimisation',
    goal: 'Be cited correctly when AI assistants answer holiday grocery questions.',
    items: [
      'One consistent entity: the same name, description and store facts on the site, profiles and listings.',
      'Original, citeable material, such as the quantities checklist, rather than generic recipes.',
      'Visible “last updated” dates on hours and offers, so answers are fresh.',
      'An llms.txt summary at the site root. It is a proposed convention that not every engine reads, so it adds to good HTML rather than replacing it.',
    ],
  },
]

// Applied to this case study site itself, and checkable in its source.
export const SITE_SEO = [
  'Every page is prerendered to static HTML with its own title, description, canonical URL and Open Graph tags.',
  'JSON-LD on every page: WebSite, the case study as a CreativeWork, and a BreadcrumbList; FAQPage on the overview.',
  'sitemap.xml, robots.txt and llms.txt are generated at build time from the same page list as the navigation.',
  'Semantic headings, alt text on every creative and no content that needs JavaScript to appear.',
  'Lighthouse SEO and accessibility scored 100 on the production build.',
]

export const UTM_PLACEMENTS = [
  { k: 'Meta feed square', source: 'meta', medium: 'paid_social', file: 'BirchwayMarket_Holiday2026_Social_1080x1080_v2' },
  { k: 'Instagram Story', source: 'instagram', medium: 'paid_social', file: 'BirchwayMarket_Holiday2026_Social_1080x1920_v2' },
  { k: 'Display medium rectangle', source: 'programmatic', medium: 'display', file: 'BirchwayMarket_Holiday2026_Display_300x250_v2' },
  { k: 'Animated banner', source: 'gdn', medium: 'display', file: 'BirchwayMarket_Holiday2026_Animated_300x250_v1' },
  { k: 'Pinterest checklist pin', source: 'pinterest', medium: 'paid_social', file: 'BirchwayMarket_Holiday2026_Social_1000x1500_v1' },
]
