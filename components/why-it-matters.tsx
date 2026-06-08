'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const steps = [
  {
    number: '01',
    title: 'Fill a bowl',
    description:
      'Take any shallow bowl or container and fill it with fresh, clean water. Change the water daily to keep it safe for birds.',
  },
  {
    number: '02',
    title: 'Place it outside',
    description:
      'Put the bowl in a shaded spot on your balcony, terrace, or near a tree. Birds will find it quickly.',
  },
  {
    number: '03',
    title: 'Save a life',
    description:
      'A single bowl of water can hydrate dozens of birds each day. Your small act becomes their lifeline in the scorching heat.',
  },
];

export default function HowItWorks() {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-surface)]">
      <div ref={sectionRef} className={`max-w-5xl mx-auto ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)] text-center mb-12">
          How it works
        </h2>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}>
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8"
            >
              <span className="font-display text-4xl text-[var(--accent)] block mb-3">
                {step.number}
              </span>
              <h3 className="font-body font-semibold text-lg text-[var(--text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
