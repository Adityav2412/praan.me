'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const steps = [
  {
    number: '01',
    title: 'Fill a bowl with water',
    description:
      'Any bowl, plate, or container works. Fill it with fresh water — that\'s all you need.',
  },
  {
    number: '02',
    title: 'Place it outside',
    description:
      'Put it on your balcony, terrace, windowsill, or near a tree. Somewhere birds can safely access.',
  },
  {
    number: '03',
    title: 'Refill daily',
    description:
      'Check and refill each morning. Clean the bowl every few days to keep the water fresh.',
  },
];

export default function HowItWorks() {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="how-it-works" className="py-20 lg:py-28 px-6 bg-bg-base">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            How it works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Three steps. Two minutes. Countless lives saved.
          </h2>
        </div>

        {/* Step cards */}
        <div
          ref={sectionRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-bg-card rounded-2xl border border-[var(--border)] p-8 hover:shadow-md transition-shadow"
            >
              {/* Large serif number */}
              <span className="font-display text-5xl font-bold text-accent/30 mb-4 block">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
