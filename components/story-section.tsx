'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function StorySection() {
  const { ref: problemRef, hasMounted: problemMounted, isVisible: problemVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: solutionRef, hasMounted: solutionMounted, isVisible: solutionVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <>
      {/* Story Block 1 — The Problem */}
      <section id="about" className="py-20 lg:py-28 px-6 bg-bg-base relative overflow-hidden">
        {/* Background watermark — hero-bowl-sketch.png */}
        <div
          className="absolute top-1/2 right-[-60px] -translate-y-1/2 w-[400px] h-[400px] pointer-events-none select-none opacity-[0.07]"
          style={{ transform: 'translateY(-50%) rotate(-15deg)' }}
        >
          <Image
            src="/hero-bowl-sketch.png"
            alt=""
            fill
            sizes="400px"
            className="object-contain"
          />
        </div>

        <div
          ref={problemRef}
          className={`relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${problemMounted ? `motion-reveal ${problemVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Text */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The Problem
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
              Every summer, Delhi becomes a death trap for birds.
            </h2>
            <p className="text-base leading-relaxed text-text-muted mb-4">
              When temperatures cross 45°C, water sources dry up across the city. 
              Birds — pigeons, sparrows, mynas, parakeets — fly for hours without finding 
              a single drop. Many collapse from dehydration and heat stroke.
            </p>
            <p className="text-base leading-relaxed text-text-muted">
              Thousands die every summer. Not from disease or predators, but from 
              something as simple as the lack of water. It&apos;s a crisis that hides in plain sight.
            </p>
          </div>

          {/* Right — Bowl sketch image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[300px] h-[240px] rounded-2xl overflow-hidden border border-[var(--border)]">
              <Image
                src="/hero-bowl-sketch.png"
                alt="Water bowl for birds"
                width={300}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Block 2 — The Solution */}
      <section className="py-20 lg:py-28 px-6 bg-[#FAF8F4] relative overflow-hidden">
        {/* Scattered bird silhouettes in background */}
        <svg className="absolute top-12 left-[10%] w-16 h-16 opacity-[0.06] pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 11.5C23 11.5 20.5 5 14 5C13.5 5 13 5.05 12.5 5.15C12 3.85 10.7 3 9.5 3C7.5 3 6 4.5 6 6.5C6 6.67 6.01 6.84 6.04 7C3.8 7.6 2 9.4 2 12C2 14.5 3.5 16 5.5 16H11L15 12L12 11L23 11.5Z"/>
        </svg>
        <svg className="absolute top-[30%] right-[8%] w-12 h-12 opacity-[0.06] pointer-events-none" style={{ transform: 'rotate(15deg)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 11.5C23 11.5 20.5 5 14 5C13.5 5 13 5.05 12.5 5.15C12 3.85 10.7 3 9.5 3C7.5 3 6 4.5 6 6.5C6 6.67 6.01 6.84 6.04 7C3.8 7.6 2 9.4 2 12C2 14.5 3.5 16 5.5 16H11L15 12L12 11L23 11.5Z"/>
        </svg>
        <svg className="absolute bottom-[20%] left-[20%] w-10 h-10 opacity-[0.06] pointer-events-none" style={{ transform: 'rotate(-10deg) scaleX(-1)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 11.5C23 11.5 20.5 5 14 5C13.5 5 13 5.05 12.5 5.15C12 3.85 10.7 3 9.5 3C7.5 3 6 4.5 6 6.5C6 6.67 6.01 6.84 6.04 7C3.8 7.6 2 9.4 2 12C2 14.5 3.5 16 5.5 16H11L15 12L12 11L23 11.5Z"/>
        </svg>
        <svg className="absolute bottom-16 right-[15%] w-8 h-8 opacity-[0.06] pointer-events-none" style={{ transform: 'rotate(25deg)' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 11.5C23 11.5 20.5 5 14 5C13.5 5 13 5.05 12.5 5.15C12 3.85 10.7 3 9.5 3C7.5 3 6 4.5 6 6.5C6 6.67 6.01 6.84 6.04 7C3.8 7.6 2 9.4 2 12C2 14.5 3.5 16 5.5 16H11L15 12L12 11L23 11.5Z"/>
        </svg>

        <div
          ref={solutionRef}
          className={`relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${solutionMounted ? `motion-reveal ${solutionVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Visual (map dot grid) */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-[300px] h-[240px] rounded-2xl bg-bg-card border border-[var(--border)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full aspect-square rounded-full ${
                      [3, 7, 12, 15, 19, 22, 25, 28, 31, 35, 38, 41, 44].includes(i)
                        ? 'bg-accent/70'
                        : 'bg-text-muted/10'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[10px] text-text-muted/60 font-medium">Bowl stations across Delhi</p>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              The Solution
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
              A network of water bowls, placed by people who care.
            </h2>
            <p className="text-base leading-relaxed text-text-muted mb-4">
              Water For Wings is building a community-driven network of water stations 
              across Delhi. Each participant — a &quot;Saviour&quot; — places a bowl of fresh 
              water outside their home, office, or balcony.
            </p>
            <p className="text-base leading-relaxed text-text-muted">
              It takes 2 minutes. It costs nothing. And it can keep dozens of birds 
              alive through the hottest months of the year.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
