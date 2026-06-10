'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const steps = [
  {
    number: '01',
    title: 'Fill a bowl with water',
    description: 'Any bowl, plate, or container works. Fill it with fresh water — that\'s all you need.',
  },
  {
    number: '02',
    title: 'Place it outside',
    description: 'Put it on your balcony, terrace, windowsill, or near a tree. Somewhere birds can safely access.',
  },
  {
    number: '03',
    title: 'Register & share',
    description: 'Register on the site, get your certificate, and inspire others to join the movement.',
  },
];

export default function HowItWorks() {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 px-6 bg-[#FAF8F4] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-20 ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            How it works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Three steps. Two minutes. Countless lives saved.
          </h2>
        </div>

        {/* Full-width horizontal timeline */}
        <div className="relative">
          {/* Solid thin connecting line with arrow — desktop */}
          <div className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 items-center z-0 px-8">
            <div className="flex-1 h-px bg-[#1A1A18] opacity-[0.15]" />
            <span className="text-[#1A1A18] opacity-[0.15] text-lg ml-1">→</span>
          </div>

          {/* Step cards */}
          <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}>
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl p-8 pb-14 overflow-hidden bg-white"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                {/* Step number — absolute bottom right, does NOT overlap text */}
                <span
                  className="absolute bottom-[-8px] right-3 font-display text-[80px] font-bold leading-none select-none pointer-events-none"
                  style={{ color: '#1A1A18', opacity: 0.06 }}
                >
                  {step.number}
                </span>

                {/* Content — pb-6 ensures text stays above number */}
                <div className="relative pb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted max-w-[280px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
