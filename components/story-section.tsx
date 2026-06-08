'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function StorySection() {
  const { ref: problemRef, hasMounted: problemMounted, isVisible: problemVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: solutionRef, hasMounted: solutionMounted, isVisible: solutionVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <>
      {/* Story Block 1 — The Problem */}
      <section id="about" className="py-20 lg:py-28 px-6 bg-bg-base">
        <div
          ref={problemRef}
          className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${problemMounted ? `motion-reveal ${problemVisible ? 'is-visible' : ''}` : ''}`}
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

          {/* Right — Visual placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[300px] h-[240px] rounded-2xl bg-bg-surface border border-[var(--border)] flex items-center justify-center">
              <div className="text-center px-6">
                <svg className="w-12 h-12 mx-auto mb-3 text-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <p className="text-sm text-text-muted/60 font-medium">45°C+ summers</p>
                <p className="text-xs text-text-muted/40 mt-1">Water sources vanish</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Block 2 — The Solution */}
      <section className="py-20 lg:py-28 px-6 bg-bg-surface">
        <div
          ref={solutionRef}
          className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${solutionMounted ? `motion-reveal ${solutionVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Visual (map dot grid) */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-[300px] h-[240px] rounded-2xl bg-bg-card border border-[var(--border)] flex items-center justify-center relative overflow-hidden">
              {/* Dot grid representing Delhi map coverage */}
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
