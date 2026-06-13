'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function AboutPraan() {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-16 lg:py-32 px-6 bg-bg-base">
      <div
        ref={sectionRef}
        className={`max-w-3xl mx-auto ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
          About Praan
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-4">
          Turning small acts of care into collective impact.
        </h2>
        <p className="text-base leading-relaxed text-text-muted">
          Praan is a platform for community-driven environmental action. Water For Wings is our first initiative — helping Delhi&apos;s birds survive extreme summer heat through a growing network of water bowls placed by people who care.
        </p>
      </div>
    </section>
  );
}
