'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const steps = [
  {
    number: '01',
    outcome: 'You placed a bowl',
    title: 'Fill a bowl with water',
    description:
      'Any bowl, plate, or container works. Fill it with fresh water — that\'s all you need.',
  },
  {
    number: '02',
    outcome: 'You became a Saviour',
    title: 'Place it outside',
    description:
      'Put it on your balcony, terrace, windowsill, or near a tree. Somewhere birds can safely access.',
  },
  {
    number: '03',
    outcome: 'You got your certificate',
    title: 'Register & share',
    description:
      'Register on the site, get your certificate, and inspire others to join the movement.',
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

        {/* Step cards with arrows */}
        <div
          ref={sectionRef}
          className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 lg:gap-6 items-stretch ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          {steps.map((step, index) => (
            <>
              <div
                key={step.number}
                className="bg-bg-card rounded-2xl border border-[var(--border)] p-8 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Large serif number */}
                <span className="font-display text-5xl font-bold text-accent/30 mb-1 block">
                  {step.number}
                </span>

                {/* Outcome subtext */}
                <span className="text-xs font-medium text-accent italic mb-4 block">
                  {step.outcome}
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

              {/* Arrow between cards (not after the last one) */}
              {index < steps.length - 1 && (
                <div key={`arrow-${index}`} className="hidden md:flex items-center justify-center text-text-muted/30 text-2xl">
                  →
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
