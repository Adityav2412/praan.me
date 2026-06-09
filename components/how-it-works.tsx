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
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 px-6 bg-[#F5EDE0] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-16 ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            How it works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Three steps. Two minutes. Countless lives saved.
          </h2>
        </div>

        {/* Step cards with bird illustrations and curved arrows */}
        <div className="relative">
          {/* SVG curved dashed arrows connecting cards — desktop only */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 300"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Arrow 01 → 02 */}
            <path
              d="M 280 150 C 350 80, 450 80, 520 150"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity="0.3"
              fill="none"
            />
            {/* Arrow 02 → 03 */}
            <path
              d="M 580 150 C 650 220, 750 220, 820 150"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity="0.3"
              fill="none"
            />
          </svg>

          {/* Bird logos between cards — desktop only */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bird-logo.png"
            alt=""
            className="hidden md:block absolute top-[20%] left-[30%] w-10 h-10 opacity-30 pointer-events-none select-none animate-float-bird"
            style={{ animationDelay: '0.3s' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bird-logo.png"
            alt=""
            className="hidden md:block absolute top-[25%] right-[28%] w-8 h-8 opacity-25 pointer-events-none select-none animate-float-bird"
            style={{ animationDelay: '1s', transform: 'scaleX(-1)' }}
          />

          {/* Cards grid with stagger */}
          <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}>
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl border border-[var(--border)] p-8 hover:shadow-lg transition-shadow"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
