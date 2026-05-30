import Image from 'next/image';

import { BRAND, BRAND_COPY, currentInitiative } from '@/lib/brand';

type Variant = 'light' | 'dark';

const variantStyles: Record<
  Variant,
  { label: string; title: string; muted: string }
> = {
  light: {
    label: 'text-navy/45',
    title: 'text-navy',
    muted: 'text-navy/50',
  },
  dark: {
    label: 'text-cream/50',
    title: 'text-cream',
    muted: 'text-cream/55',
  },
};

const wordmarkFont =
  '"Avenir Next", "Helvetica Neue", Inter, var(--font-poppins), sans-serif';

export function PraanWordmark({
  variant = 'light',
  size = 'md',
  className = '',
}: {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg' | 'nav';
  className?: string;
}) {
  const sizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-lg sm:text-xl',
    nav: 'text-base sm:text-lg md:text-xl',
  };
  const color = variant === 'light' ? 'text-navy' : 'text-cream';

  return (
    <span
      className={`font-light uppercase tracking-[0.1em] leading-none ${sizes[size]} ${color} ${className}`}
      style={{ fontFamily: wordmarkFont }}
    >
      {BRAND.platformWordmark}
    </span>
  );
}

function BrandInitiativeLabel({
  variant = 'light',
  className = '',
}: {
  variant?: Variant;
  className?: string;
}) {
  const v = variantStyles[variant];
  return (
    <span
      className={`text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-medium leading-none ${v.label} ${className}`}
    >
      {BRAND.initiativeLabel}
    </span>
  );
}

function BrandInitiativeName({
  variant = 'light',
  size = 'md',
  className = '',
}: {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}) {
  const v = variantStyles[variant];
  const sizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    hero: 'text-3xl sm:text-4xl md:text-5xl',
  };

  return (
    <span
      className={`font-extrabold leading-tight ${sizes[size]} ${v.title} ${className}`}
    >
      {currentInitiative.name}
    </span>
  );
}

function BrandInitiativeAttribution({
  variant = 'light',
  className = '',
}: {
  variant?: Variant;
  className?: string;
}) {
  const v = variantStyles[variant];
  return (
    <span className={`text-sm font-normal ${v.muted} ${className}`}>
      {BRAND.initiativeAttribution}
    </span>
  );
}

/** Hero: PRAAN → Current Initiative → bird logo → Water For Wings → A Praan Initiative */
export function HeroInitiativePresentation({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center ${className}`}
    >
      <PraanWordmark size="lg" className="mb-2" />
      <BrandInitiativeLabel className="mb-5" />
      <Image
        src={currentInitiative.logoSrc}
        alt="Water For Wings Logo"
        width={80}
        height={80}
        priority
        className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex-shrink-0"
      />
      <BrandInitiativeName size="hero" className="mb-2" />
      <BrandInitiativeAttribution />
    </div>
  );
}

/** Footer: PRAAN → platform line → Current Initiative → initiative name */
export function FooterBrandHierarchy({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <PraanWordmark variant="dark" size="lg" className="mb-3" />
      <p className="text-cream/60 text-sm max-w-md leading-relaxed mb-5">
        {BRAND_COPY.footerPlatformLine}
      </p>
      <BrandInitiativeLabel variant="dark" className="mb-1.5" />
      <BrandInitiativeName variant="dark" size="md" />
    </div>
  );
}
