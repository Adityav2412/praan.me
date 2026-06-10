'use client';

import Image from 'next/image';
import { useScrollAnimation, useAnimatedCounter } from '@/hooks/use-scroll-animation';

interface StorySectionProps {
  saviourCount: number | null;
}

export default function StorySection({ saviourCount }: StorySectionProps) {
  const { ref: problemRef, hasMounted: problemMounted, isVisible: problemVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: solutionRef, hasMounted: solutionMounted, isVisible: solutionVisible } = useScrollAnimation({ threshold: 0.15 });

  // Live counter: each saviour = 20 birds helped
  const birdsHelped = saviourCount !== null ? saviourCount * 20 : null;
  const animatedBirds = useAnimatedCounter(birdsHelped, 1500, problemVisible, problemMounted);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          PROBLEM SECTION — dark terracotta, massive counter, two-column text
          ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-32 px-6 bg-[#3D1F0D] relative overflow-hidden">
        {/* HUGE watermark — hero-bowl-sketch.png */}
        <div className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none opacity-[0.05]">
          <Image
            src="/hero-bowl-sketch.png"
            alt=""
            fill
            sizes="600px"
            className="object-contain invert"
            style={{ transform: 'rotate(-10deg)' }}
          />
        </div>

        <div
          ref={problemRef}
          className={`relative z-10 max-w-5xl mx-auto ${problemMounted ? `motion-reveal ${problemVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Massive centered counter */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/70 mb-4">
              This Summer
            </span>
            <div className="font-display text-[120px] sm:text-[160px] font-bold text-white/90 leading-none tabular-nums">
              {birdsHelped === null ? (
                <span className="inline-block w-48 h-32 bg-white/10 rounded-xl animate-pulse" />
              ) : (
                problemMounted ? animatedBirds : birdsHelped
              )}
            </div>
            <p className="text-lg text-white/50 mt-3 font-medium">
              birds helped so far this summer.
            </p>
          </div>

          {/* Thin horizontal rule */}
          <div className="w-full max-w-md mx-auto h-px bg-white/15 mb-12" />

          {/* Two-column problem text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80 mb-4">
                The Problem
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-5">
                Every summer, Delhi becomes a death trap for birds.
              </h2>
              <p className="text-base leading-relaxed text-white/65">
                When temperatures cross 45°C, water sources dry up across the city.
                Birds — pigeons, sparrows, mynas, parakeets — fly for hours without finding
                a single drop.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-base leading-relaxed text-white/65 mb-4">
                Many collapse from dehydration and heat stroke. Thousands die every summer.
                Not from disease or predators, but from something as simple as the lack of water.
              </p>
              <p className="text-base leading-relaxed text-white/65">
                It&apos;s a crisis that hides in plain sight — and one that anyone can help solve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SOLUTION SECTION — dark warm brown, constellation network
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 px-6 bg-[#1C0F00] relative overflow-hidden">
        <div
          ref={solutionRef}
          className={`relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${solutionMounted ? `motion-reveal ${solutionVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Text */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C] mb-4">
              The Solution
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F2EDE3] leading-tight mb-6">
              A network of water bowls, placed by people who care.
            </h2>
            <p className="text-base leading-relaxed text-[#F2EDE3]/65 mb-4">
              Water For Wings is building a community-driven network of water stations
              across Delhi. Each participant — a &quot;Saviour&quot; — places a bowl of fresh
              water outside their home, office, or balcony.
            </p>
            <p className="text-base leading-relaxed text-[#F2EDE3]/65">
              It takes 2 minutes. It costs nothing. And it can keep dozens of birds
              alive through the hottest months of the year.
            </p>
          </div>

          {/* Right — Animated constellation network */}
          <div className="relative h-[360px] sm:h-[400px] w-full">
            {/* SVG constellation — dots + dashed connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
              {/* Dashed connection lines */}
              <line x1="80" y1="60" x2="200" y2="120" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="200" y1="120" x2="320" y2="80" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="200" y1="120" x2="150" y2="220" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="150" y1="220" x2="280" y2="200" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="280" y1="200" x2="350" y2="280" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="150" y1="220" x2="60" y2="300" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="60" y1="300" x2="180" y2="340" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="180" y1="340" x2="320" y2="320" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="320" y1="320" x2="350" y2="280" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="80" y1="60" x2="60" y2="160" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="60" y1="160" x2="150" y2="220" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="320" y1="80" x2="280" y2="200" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

              {/* Glowing dots (nodes) */}
              <circle cx="80" cy="60" r="4" fill="#C9A84C" className="animate-pulse-dot" />
              <circle cx="200" cy="120" r="5" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
              <circle cx="320" cy="80" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.6s' }} />
              <circle cx="150" cy="220" r="5" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.9s' }} />
              <circle cx="280" cy="200" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '1.2s' }} />
              <circle cx="350" cy="280" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
              <circle cx="60" cy="300" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.7s' }} />
              <circle cx="180" cy="340" r="5" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '1.0s' }} />
              <circle cx="320" cy="320" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
              <circle cx="60" cy="160" r="3" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.8s' }} />
              <circle cx="240" cy="280" r="3" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '1.1s' }} />
              <circle cx="130" cy="120" r="3" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
              <circle cx="360" cy="160" r="3" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '1.4s' }} />

              {/* Bird silhouettes — simple path shapes */}
              <g className="animate-float-bird" style={{ animationDelay: '0s' }}>
                <path d="M105 90 C108 86, 112 86, 115 90 M115 90 C118 86, 122 86, 125 90" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
              </g>
              <g className="animate-float-bird" style={{ animationDelay: '1.2s' }}>
                <path d="M290 250 C293 246, 297 246, 300 250 M300 250 C303 246, 307 246, 310 250" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
              </g>
              <g className="animate-float-bird" style={{ animationDelay: '0.6s' }}>
                <path d="M200 300 C203 296, 207 296, 210 300 M210 300 C213 296, 217 296, 220 300" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round" />
              </g>
            </svg>

            {/* Floating stat pills */}
            <div
              className="absolute top-[10%] right-[8%] bg-white rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-[#1C0F00]"
              style={{ transform: 'rotate(-2deg)' }}
            >
              🌿 {saviourCount ?? 26} Saviours
            </div>
            <div
              className="absolute bottom-[18%] left-[5%] bg-white rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-[#1C0F00]"
              style={{ transform: 'rotate(2deg)' }}
            >
              🌡 40°C Delhi
            </div>
            <div
              className="absolute top-[50%] right-[15%] bg-white rounded-full px-4 py-2 shadow-lg text-xs font-semibold text-[#1C0F00]"
              style={{ transform: 'rotate(-1deg)' }}
            >
              🐦 {birdsHelped ?? 520} Birds
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
