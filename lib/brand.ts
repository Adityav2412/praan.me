/**
 * Praan platform + initiative hierarchy.
 * Add future initiatives to `initiatives` when launching; set `currentInitiativeId`.
 */
export const BRAND = {
  platform: 'Praan',
  platformWordmark: 'PRAAN',
  initiativeLabel: 'Current Initiative',
  initiativeAttribution: 'A Praan Initiative',
  currentInitiativeId: 'water-for-wings',
  initiatives: {
    'water-for-wings': {
      name: 'Water For Wings',
      logoSrc:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png',
      tagline: "Saving Delhi's birds, one water station at a time.",
    },
  },
} as const;

export const currentInitiative =
  BRAND.initiatives[BRAND.currentInitiativeId];

export const BRAND_COPY = {
  brandStatement:
    'Praan exists to turn kindness into action.',
  footerPlatformLine:
    'A platform for meaningful community initiatives.',
  homeClarity:
    "Praan is a home for meaningful community initiatives. Water For Wings is our first — and the one you can join today.",
  founderIntro: 'founder of Praan',
} as const;
