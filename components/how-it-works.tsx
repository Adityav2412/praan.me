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
    <section id="how-it-works" className="py-24 lg:py-32 px-6 bg-[#F5EDE0] relative overflow-hidden">
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
          {/* Hand-drawn style wavy dashed SVG path — desktop */}
          <svg
            className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-24 pointer-events-none z-0"
            viewBox="0 0 1200 100"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 50 C 150 20, 250 80, 400 50 C 550 20, 650 80, 800 50 C 950 20, 1050 80, 1150 50"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeDasharray="10 8"
              opacity="0.35"
              strokeLinecap="round"
            />
          </svg>

          {/* Bird icon sitting on path between steps */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bird-icon.png"
            alt=""
            className="hidden md:block absolute top-[38%] left-[30%] w-8 h-8 opacity-40 pointer-events-none select-none animate-float-bird z-10"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bird-icon.png"
            alt=""
            className="hidden md:block absolute top-[42%] left-[64%] w-7 h-7 opacity-35 pointer-events-none select-none animate-float-bird z-10"
            style={{ animationDelay: '1s', transform: 'scaleX(-1)' }}
          />

          {/* Steps — horizontal timeline */}
          <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}>
            {steps.map((step) => (
              <div key={step.number} className="relative text-center md:text-left">
                {/* Large background number */}
                <span className="font-display text-[80px] font-bold text-text-primary/[0.07] leading-none absolute top-[-20px] left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Content overlaid */}
                <div className="relative pt-10">
                  {/* Small dot indicator */}
                  <div className="w-3 h-3 rounded-full bg-accent mx-auto md:mx-0 mb-4" />

                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted max-w-[280px] mx-auto md:mx-0">
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
