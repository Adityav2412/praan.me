'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
}

export default function HeroSection({ onBecomeSaviour }: HeroSectionProps) {
  const { ref: heroRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[var(--bg-base)] pt-20 lg:pt-24 pb-12 lg:pb-20">
      <div
        ref={heroRef}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
          hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''
        }`}
      >
        {/* Left: Copy */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            Delhi &middot; Summer 2025
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight mb-5">
            Delhi&apos;s birds are dying of thirst. You can fix that.
          </h1>

          <p className="font-body text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-lg">
            One bowl of water outside your door can save dozens of birds this summer. Join the movement.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBecomeSaviour}
              className="bg-[var(--accent)] text-white font-body font-semibold text-base px-7 py-3.5 rounded-lg hover:opacity-90 transition-opacity motion-cta"
            >
              Place a bowl today
            </button>

            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="font-body text-base text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              See how it works &rarr;
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative h-[240px] sm:h-[320px] lg:h-[420px] w-full" aria-hidden="true">
          <Image
            src="/hero-bowl-sketch.png"
            alt="Illustration of a water bowl for birds"
            fill
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="object-contain object-center opacity-80 mix-blend-multiply"
            priority
          />
        </div>
      </div>
    </section>
  );
}
