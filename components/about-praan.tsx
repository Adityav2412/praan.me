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
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-8">
          A platform for community-driven environmental action.
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-text-muted">
          <p>
            Praan is a platform built to turn small acts of care into collective impact.
          </p>
          <p>
            We believe meaningful change begins at the local level — through simple actions that anyone can take.
          </p>
          <p>
            Water For Wings is the first initiative under Praan, helping Delhi&apos;s birds survive extreme summer heat through a growing network of community water bowls.
          </p>
          <p className="text-text-primary font-medium">
            One initiative at a time.<br />
            One act of care at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
