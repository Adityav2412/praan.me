export const NAV_ITEMS = [
  { label: 'About', section: 'about' },
  { label: 'Why It Matters', section: 'why-it-matters' },
  { label: 'Saviours', section: 'saviours' },
  { label: 'Area Leaderboard', section: 'leaderboard' },
  { label: 'Set Reminder', section: 'reminder' },
] as const;

/** Split for centered-logo desktop navbar — avoids overlap with wordmark */
export const NAV_ITEMS_LEFT = NAV_ITEMS.slice(0, 3);
export const NAV_ITEMS_RIGHT = NAV_ITEMS.slice(3);

/** Desktop navbar — Set Reminder stays in mobile menu + on-page section */
export const NAV_ITEMS_RIGHT_DESKTOP = NAV_ITEMS_RIGHT.filter(
  (item) => item.section !== 'reminder'
);

/** Fixed navbar height (px) — keep in sync with navbar.tsx desktop h-20 */
export const NAVBAR_HEIGHT_PX = 80;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/officalwaterforwings',
  x: 'https://x.com/waterforwings',
} as const;
