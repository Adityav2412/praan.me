'use client';

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

const LOGO_WIDTH = 1536;
const LOGO_HEIGHT = 395;

export function PraanLogo({
  className = '',
  priority = false,
  variant = 'default',
  sizes,
}: {
  className?: string;
  priority?: boolean;
  /** Lightens logo on dark navy backgrounds without modifying the source asset */
  variant?: 'default' | 'on-dark';
  sizes?: string;
}) {
  return (
    <Image
      src="/praan-logo-original.png"
      alt="PRAAN"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      sizes={sizes}
      className={`object-contain ${variant === 'on-dark' ? 'brightness-0 invert' : ''} ${className}`}
    />
  );
}

export function HeartDivider({
  className = '',
  variant = 'light',
}: {
  className?: string;
  variant?: Variant;
}) {
  const color = variant === 'light' ? 'text-navy/35' : 'text-cream/35';

  return (
    <p
      className={`text-sm tracking-[0.35em] ${color} ${className}`}
      aria-hidden="true"
    >
      ── ♥ ──
    </p>
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
    sm: 'text-lg sm:text-xl font-extrabold',
    md: 'text-xl sm:text-2xl font-extrabold',
    lg: 'text-2xl sm:text-3xl font-extrabold',
    hero: 'text-[1.125rem] sm:text-[1.375rem] md:text-[1.8125rem] lg:text-[2rem] xl:text-[2.125rem] font-bold tracking-tight',
  };

  return (
    <span
      className={`leading-tight ${sizes[size]} ${v.title} ${className}`}
    >
      {currentInitiative.name}
    </span>
  );
}

export function FooterInitiativeBlock({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <BrandInitiativeLabel variant="dark" className="mb-1.5" />
      <BrandInitiativeName variant="dark" size="md" />
    </div>
  );
}

export function HeroInitiativeBlock({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-0.5 sm:gap-1 max-w-md mx-auto w-full ${className}`}
    >
      <span className="text-navy/45 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold">
        Introducing
      </span>
      <BrandInitiativeName size="hero" />
    </div>
  );
}

export function BrandTagline({
  variant = 'light',
  className = '',
}: {
  variant?: Variant;
  className?: string;
}) {
  const color =
    variant === 'light' ? 'text-navy/75' : 'text-cream/85';

  return (
    <p
      className={`tracking-[0.24em] sm:tracking-[0.3em] md:tracking-[0.32em] uppercase text-xs sm:text-sm md:text-[0.9375rem] font-semibold ${color} ${className}`}
    >
      {BRAND_COPY.tagline}
    </p>
  );
}

export function BrandStatement({
  variant = 'light',
  className = '',
}: {
  variant?: Variant;
  className?: string;
}) {
  const color =
    variant === 'light' ? 'text-navy/65' : 'text-cream/65';

  return (
    <p
      className={`text-sm sm:text-base leading-relaxed font-normal italic max-w-md mx-auto ${color} ${className}`}
    >
      {BRAND_COPY.brandStatement}
    </p>
  );
}
