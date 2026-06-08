export const NAV_ITEMS = [
  { label: 'About', section: 'about' },
  { label: 'How it works', section: 'how-it-works' },
  { label: 'Saviours', section: 'saviours' },
] as const;

/** Fixed navbar height (px) — keep in sync with navbar.tsx desktop h-16 */
export const NAVBAR_HEIGHT_PX = 64;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/officalwaterforwings',
  x: 'https://x.com/waterforwings',
} as const;
