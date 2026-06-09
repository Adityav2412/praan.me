'use client';

import Image from 'next/image';
import { useScrollAnimation, useAnimatedCounter } from '@/hooks/use-scroll-animation';

export default function StorySection() {
  const { ref: problemRef, hasMounted: problemMounted, isVisible: problemVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: solutionRef, hasMounted: solutionMounted, isVisible: solutionVisible } = useScrollAnimation({ threshold: 0.15 });
  const animatedBirds = useAnimatedCounter(475, 1500, problemVisible, problemMounted);

  return (
    <>
      {/* Story Block 1 — The Problem (dark terracotta) */}
      <section id="about" className="py-24 lg:py-32 px-6 bg-[#3D1F0D] relative overflow-hidden">
        {/* Background watermark — hero-bowl-sketch.png */}
        <div
          className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-[500px] h-[500px] pointer-events-none select-none opacity-[0.06]"
          style={{ transform: 'translateY(-50%) rotate(-10deg)' }}
        >
          <Image
            src="/hero-bowl-sketch.png"
            alt=""
            fill
            sizes="500px"
            className="object-contain invert"
          />
        </div>

        <div
          ref={problemRef}
          className={`relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${problemMounted ? `motion-reveal ${problemVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Text */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80 mb-4">
              The Problem
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              Every summer, Delhi becomes a death trap for birds.
            </h2>
            <p className="text-base leading-relaxed text-white/70 mb-4">
              When temperatures cross 45°C, water sources dry up across the city.
              Birds — pigeons, sparrows, mynas, parakeets — fly for hours without finding
              a single drop. Many collapse from dehydration and heat stroke.
            </p>
            <p className="text-base leading-relaxed text-white/70">
              Thousands die every summer. Not from disease or predators, but from
              something as simple as the lack of water. It&apos;s a crisis that hides in plain sight.
            </p>
          </div>

          {/* Right — Animated counter */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            <span className="font-display text-[100px] sm:text-[120px] font-bold text-white/90 leading-none tabular-nums">
              {problemMounted ? animatedBirds : 475}
            </span>
            <p className="text-lg text-white/50 mt-2 font-medium">
              birds helped last summer.
            </p>
          </div>
        </div>
      </section>

      {/* Story Block 2 — The Solution (beige, floating widget cards) */}
      <section className="py-24 lg:py-32 px-6 bg-[#FAF8F4] relative overflow-hidden">
        {/* Scattered bird icons */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute top-16 left-[12%] w-8 h-8 opacity-50 pointer-events-none select-none animate-float-bird"
          style={{ animationDelay: '0s' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute top-[40%] right-[10%] w-6 h-6 opacity-40 pointer-events-none select-none animate-float-bird"
          style={{ animationDelay: '1.2s', transform: 'scaleX(-1)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bird-icon.png"
          alt=""
          className="absolute bottom-20 left-[25%] w-7 h-7 opacity-35 pointer-events-none select-none animate-float-bird"
          style={{ animationDelay: '0.6s' }}
        />

        {/* Floating stat widget cards */}
        <div className="absolute top-20 right-[8%] hidden lg:block pointer-events-none select-none">
          <div
            className="bg-white rounded-xl px-4 py-3 shadow-md border border-[var(--border)]"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <p className="text-xs text-text-muted font-medium">Delhi Temp</p>
            <p className="text-lg font-bold text-text-primary">40°C</p>
          </div>
        </div>

        <div className="absolute top-[45%] left-[5%] hidden lg:block pointer-events-none select-none">
          <div
            className="bg-white rounded-xl px-4 py-3 shadow-md border border-[var(--border)]"
            style={{ transform: 'rotate(3deg)' }}
          >
            <p className="text-xs text-text-muted font-medium">Saviours active</p>
            <p className="text-lg font-bold text-accent">19</p>
          </div>
        </div>

        <div className="absolute bottom-24 right-[15%] hidden lg:block pointer-events-none select-none">
          <div
            className="bg-white rounded-xl px-4 py-3 shadow-md border border-[var(--border)]"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <p className="text-xs text-text-muted font-medium">Lives saved</p>
            <p className="text-lg font-bold text-text-primary">475</p>
          </div>
        </div>

        <div
          ref={solutionRef}
          className={`relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${solutionMounted ? `motion-reveal ${solutionVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Visual (map dot grid) */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-[300px] h-[240px] rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center relative overflow-hidden shadow-sm">
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
