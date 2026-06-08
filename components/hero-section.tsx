'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
  onNavigate?: (section: string) => void;
}

export default function HeroSection({
  onBecomeSaviour,
  onNavigate,
}: HeroSectionProps) {
  const { ref: heroRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="relative min-h-[100svh] bg-bg-base pt-16 overflow-hidden">
      <div
        ref={heroRef}
        className={`relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100svh-4rem)] ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        {/* Left content */}
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
            Delhi · Summer 2025
          </span>

          {/* Headline */}
          <h1 className="font-display text-[2.75rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold leading-[1.1] text-text-primary mb-6">
            Delhi&apos;s birds are dying of thirst.{' '}
            <span className="font-display italic">You can fix that.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg leading-relaxed text-text-muted max-w-lg mb-10">
            Every summer, thousands of birds die from dehydration in Delhi&apos;s 45°C+ heat. 
            One bowl of water outside your door can save dozens of lives.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onBecomeSaviour}
              className="motion-cta bg-accent text-white font-semibold text-base px-7 py-3.5 rounded-lg hover:bg-accent-hover transition-colors shadow-sm"
            >
              Place a bowl today
            </button>
            <button
              onClick={() => onNavigate?.('how-it-works')}
              className="text-text-muted hover:text-text-primary font-medium text-base transition-colors group"
            >
              See how it works{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Right side — sketch image */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-[480px] w-full" aria-hidden="true">
          <Image
            src="/hero-bowl-sketch.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 45vw, 80vw"
            className="object-contain object-center opacity-80"
            priority
          />
        </div>
      </div>
    </section>
  );
}
