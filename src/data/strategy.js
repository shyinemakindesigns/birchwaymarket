// Marketing strategy for the fictional Birchway Market holiday campaign.
// Nothing here is measured market data. Audience segments and insights are
// hypotheses with the method that would test them; competitors are
// archetypes, not named companies; forecast rates are planning assumptions.

export const OBJECTIVE = {
  business: 'Grow holiday basket size: more shoppers buying the whole meal at Birchway instead of splitting it across stores.',
  marketing: 'Make Birchway the first store people think of for the full holiday table, then turn that into store visits and online orders between Nov 16 and Dec 24.',
  market: 'English-speaking Canada (assumed for this exercise). Household grocery planners, 28 to 55, hosting at least one holiday meal, as set in the brief.',
}

export const SEGMENTS = [
  {
    k: 'The host',
    who: 'Cooks the main holiday meal for 8 or more. Plans two to three weeks out and shops in one or two big trips.',
    need: 'Confidence that one store has everything, so nothing is forgotten.',
    lever: 'Checklists, quantities by guest count, the whole-table visual.',
  },
  {
    k: 'The contributor',
    who: 'Brings one dish to someone else’s table. Decides late, often the same week.',
    need: 'A dish that looks made with care, without a long recipe.',
    lever: 'The lattice pie as a hero, short recipe Reels, store pickup.',
  },
  {
    k: 'The value planner',
    who: 'Compares flyers and prices across stores before the big shop.',
    need: 'Proof that one trip does not cost more than three.',
    lever: 'Flyer and price messaging once legal supplies offers; bundle pages.',
  },
]

export const RESEARCH = [
  {
    h: 'Holiday table planning starts three to four weeks before December 25.',
    test: 'Google Trends for “holiday dinner ideas” and “christmas dinner checklist”, Canada, last five years; Pinterest Trends for the same terms.',
    use: 'Sets the flighting: planning content and search from mid November, conversion pressure in the last two weeks.',
  },
  {
    h: 'Shoppers search for quantities and checklists, not just recipes.',
    test: 'Google Keyword Planner and search console data for question queries (“how much … for 8 people”).',
    use: 'Makes a printable checklist the landing page’s main asset and the answer content for search and AI assistants.',
  },
  {
    h: 'Short recipe video drives more saves than static product shots for seasonal food.',
    test: 'TikTok Creative Center and Meta Ad Library to review what category advertisers run; then an A/B test of Reel versus static on Birchway’s own account.',
    use: 'Decides the split between the static adaptations and short video in social.',
  },
  {
    h: 'Store hours over the holidays are a top navigational question.',
    test: 'Search console query report and store-locator analytics from previous Decembers.',
    use: 'Holiday hours go in structured data and on the landing page, answer-first.',
  },
]

export const COMPETITORS = [
  { k: 'Discount grocer', msg: 'Lowest price on holiday staples', strength: 'Price perception', gap: 'Little inspiration or planning help; the table is not the story.' },
  { k: 'Premium specialty grocer', msg: 'Indulgent, curated holiday food', strength: 'Quality and gifting', gap: 'Feels like an extra trip, not the main shop.' },
  { k: 'Warehouse club', msg: 'Bulk for big gatherings', strength: 'Value at volume', gap: 'Membership barrier and big packs that do not suit small households.' },
  { k: 'Delivery app and meal kits', msg: 'Skip the store', strength: 'Convenience', gap: 'Delivery slots sell out in late December; less sense of choosing your own produce.' },
]

export const POSITIONING = {
  statement: 'For household planners hosting the holidays, Birchway Market is the grocer that gathers the whole holiday table in one trip, because seasonal produce, baking basics and the centrepiece are planned together, in every aisle.',
  pillars: [
    { k: 'The whole table, one trip', d: 'The single-minded message from the brief. Every asset shows a complete table, never one product.' },
    { k: 'Seasonal at its best', d: 'Pears, clementines and cranberries as the visual cast. Freshness is shown, not claimed.' },
    { k: 'Planned for you', d: 'Checklists, quantities and holiday hours do the work a host would otherwise do alone.' },
  ],
  proof: 'Proof points (offers, prices, ranges) come from brand and legal; none are invented here.',
}

// Platform roles. "creative" points at the adaptation that runs there.
export const CHANNELS = [
  { k: 'Pinterest', role: 'Planning, early intent', kpi: 'Saves, outbound clicks', creative: 'Spot illustration and checklist pins', phase: 'Plan' },
  { k: 'Google Search', role: 'Capture intent', kpi: 'Click-through rate, cost per click, store-finder visits', creative: 'Responsive search ads', phase: 'Plan to convert' },
  { k: 'Instagram and Facebook feed', role: 'Reach and consideration', kpi: 'Reach, frequency, link clicks', creative: '1080 × 1080 and 1200 × 628', phase: 'Build' },
  { k: 'Stories and Reels', role: 'Attention, recipe video', kpi: 'Three-second views, completion rate, saves', creative: '1080 × 1920', phase: 'Build' },
  { k: 'TikTok', role: 'Recipe discovery', kpi: 'Watch time, saves, shares', creative: 'Short recipe video, organic first', phase: 'Build' },
  { k: 'Programmatic display', role: 'Frequency and retargeting', kpi: 'Viewable impressions, click-through rate', creative: 'Four IAB sizes and the HTML5 banner', phase: 'Build to convert' },
  { k: 'Digital out-of-home', role: 'Near-store reminder', kpi: 'Impressions; store visits via brand lift study', creative: '1920 × 1080', phase: 'Convert' },
  { k: 'Email and app', role: 'Loyal shoppers, last-minute list', kpi: 'Open rate, click rate, orders', creative: 'Frieze header and spot modules', phase: 'Convert' },
]

export const FLIGHT = [
  { k: 'Plan', when: 'Nov 16 to 29', d: 'Search and Pinterest lead with checklists and recipes. Social builds reach with the master.' },
  { k: 'Build', when: 'Nov 30 to Dec 13', d: 'Peak social and display weight. Reels carry the pie recipe; display adds frequency.' },
  { k: 'Convert', when: 'Dec 14 to 24', d: 'Retargeting, holiday hours, DOOH near stores and email to the loyal base.' },
]

// Forecast inputs. Rates are placeholder planning assumptions chosen to
// show the method, not industry benchmarks or results.
export const FORECAST = {
  budget: 100000,
  arrival: 0.85,
  channels: [
    { k: 'Meta feed', share: 0.24, model: 'cpm', cpm: 9, ctr: 0.009, cvr: 0.03 },
    { k: 'Stories and Reels', share: 0.16, model: 'cpm', cpm: 7, ctr: 0.005, cvr: 0.025 },
    { k: 'Pinterest', share: 0.1, model: 'cpm', cpm: 6, ctr: 0.004, cvr: 0.035 },
    { k: 'Programmatic display', share: 0.2, model: 'cpm', cpm: 4, ctr: 0.0015, cvr: 0.02 },
    { k: 'Google Search', share: 0.2, model: 'cpc', cpc: 1.1, cvr: 0.06 },
    { k: 'Digital out-of-home', share: 0.1, model: 'cpm', cpm: 12, ctr: 0, cvr: 0 },
  ],
  scenarios: [
    { k: 'Conservative', m: 0.75 },
    { k: 'Planned', m: 1 },
    { k: 'Stretch', m: 1.25 },
  ],
}

export const TESTS = [
  { k: 'Headline', a: 'Home for the Holidays', b: 'The whole table, one trip', metric: 'Click-through rate on Meta feed', why: 'Is the campaign line or the benefit the stronger stopper?' },
  { k: 'Format', a: 'Static 1080 × 1920', b: 'Six-second recipe Reel', metric: 'Cost per landing-page view', why: 'Tests the video hypothesis before shifting budget.' },
  { k: 'CTA', a: 'Shop the holiday table', b: 'Get the checklist', metric: 'Landing-page conversion rate', why: 'Utility versus shopping intent for the planning phase.' },
]
