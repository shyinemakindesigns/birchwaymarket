// Site tokens for both themes (mirrors src/styles/tokens.css) and every text
// or UI pairing the site uses, by token name. The Reflection page and
// `npm run audit:contrast` compute every pair in both themes from this list.
const BRAND = { spruce: '#23483A', spruceDeep: '#1B382D', cranberry: '#9B2335', cream: '#F6F0E1', wheat: '#E9D9A6', sageDark: '#B5C6B9' }

export const THEMES = {
  light: {
    ...BRAND,
    paper: '#EDEFE8', surface: '#FFFFFF', surface2: '#FAFBF8', wash: '#E2E6DD',
    ink: '#17221C', muted: '#4A554E',
    accent: '#23483A', accentFill: '#23483A', accentFillHover: '#1B382D', onAccent: '#F6F0E1',
    spec: '#0B6585', danger: '#9B2335',
    passBg: '#E1ECE5', passFg: '#1E5236', failBg: '#F7E3E6', failFg: '#8C1D2E', failTint: '#FCF4F5', holdBg: '#F3EBD3', holdFg: '#5E4708',
  },
  dark: {
    ...BRAND,
    paper: '#111915', surface: '#18221D', surface2: '#151F1A', wash: '#1F2B25',
    ink: '#E8ECE6', muted: '#A6B3AA',
    accent: '#8CCBA9', accentFill: '#8CCBA9', accentFillHover: '#A8DCC0', onAccent: '#0F1D17',
    spec: '#74C2DD', danger: '#F2919F',
    passBg: '#173527', passFg: '#9EDDB7', failBg: '#3A1A20', failFg: '#FFB4BF', failTint: '#24161A', holdBg: '#352C12', holdFg: '#EED38A',
  },
}

// [label, foreground token, background token, kind] - kind: 'text' (4.5), 'ui' (3, WCAG 1.4.11)
export const SITE_PAIRS = [
  ['Body text on paper', 'ink', 'paper', 'text'],
  ['Body text on card', 'ink', 'surface', 'text'],
  ['Secondary text on paper', 'muted', 'paper', 'text'],
  ['Secondary text on card', 'muted', 'surface', 'text'],
  ['Secondary text on wash', 'muted', 'wash', 'text'],
  ['Links and accents on paper', 'accent', 'paper', 'text'],
  ['Links and accents on card', 'accent', 'surface', 'text'],
  ['Spec labels on paper', 'spec', 'paper', 'text'],
  ['Spec labels on card', 'spec', 'surface', 'text'],
  ['Primary button label', 'onAccent', 'accentFill', 'text'],
  ['Primary button, hover', 'onAccent', 'accentFillHover', 'text'],
  ['Urgent and flag text on card', 'danger', 'surface', 'text'],
  ['Pass badge', 'passFg', 'passBg', 'text'],
  ['Fail badge', 'failFg', 'failBg', 'text'],
  ['Failed check row text', 'muted', 'failTint', 'text'],
  ['Placeholder badge', 'holdFg', 'holdBg', 'text'],
  ['Footer headings', 'wheat', 'spruceDeep', 'text'],
  ['Footer links and statement', 'cream', 'spruceDeep', 'text'],
  ['Footer secondary text', 'sageDark', 'spruceDeep', 'text'],
  ['Focus ring on paper', 'spec', 'paper', 'ui'],
  ['Focus ring on card', 'spec', 'surface', 'ui'],
  ['Focus ring in menu and footer', 'wheat', 'spruceDeep', 'ui'],
  ['Form control border on card', 'muted', 'surface', 'ui'],
]

export const need = (kind) => (kind === 'text' ? 4.5 : 3)
