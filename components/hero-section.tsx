'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
  onNavigate?: (section: string) => void;
  topColony?: { colony: string; count: number } | null;
}

export default function HeroSection({
  onBecomeSaviour,
  onNavigate,
  topColony,
}: HeroSectionProps) {
  const { ref: heroRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="relative bg-bg-base pt-16 overflow-hidden">
      <div
        ref={heroRef}
        className={`relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-12 lg:pt-28 lg:pb-16 flex flex-col items-center text-center ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        {/* Announcement pill */}
        <a
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('how-it-works');
          }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-bg-card px-6 py-3 text-[15px] font-medium text-text-muted hover:text-text-primary transition-colors mb-6 shadow-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-dot" />
          <span>A Praan Initiative · Water for Wings · Summer 2026</span>
          <span className="text-text-muted/50">→</span>
        </a>

        {/* Winner ticker — competitive, urgent */}
        {topColony && (
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/50 px-4 py-2 mb-8 animate-pulse-subtle">
            <span className="text-base">👑</span>
            <span className="text-xs font-semibold text-amber-900">
              {topColony.colony} is leading · {topColony.count} {topColony.count === 1 ? 'saviour' : 'saviours'}
            </span>
            <span className="text-xs text-amber-700/70 hidden sm:inline">
              · Is your colony next?
            </span>
          </div>
        )}

        {/* Headline */}
        <h1 className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.1] text-text-primary mb-6 max-w-3xl">
          Delhi&apos;s birds are dying of thirst.{' '}
          <span className="font-display italic">You can fix that.</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg leading-relaxed text-text-muted max-w-xl mb-10">
          Every summer, thousands of birds die from dehydration in Delhi&apos;s 45°C+ heat.
          One bowl of water outside your door can save dozens of lives.
        </p>

        {/* CTAs — dark pill style */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onBecomeSaviour}
            className="motion-cta bg-[#1A1A18] text-white font-semibold text-base px-7 py-3.5 rounded-full hover:bg-[#2a2a28] transition-colors shadow-sm"
          >
            Place a bowl today
          </button>
          <button
            onClick={() => onNavigate?.('how-it-works')}
            className="motion-cta bg-[#1A1A18] text-white font-medium text-base px-7 py-3.5 rounded-full hover:bg-[#2a2a28] transition-colors shadow-sm"
          >
            See how it works →
          </button>
        </div>
      </div>

      {/* Hero illustration — full width, blend with beige bg */}
      <div className="relative w-full mt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-illustration.svg"
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'multiply' }}
        />
      </div>
    </section>
  );
}
