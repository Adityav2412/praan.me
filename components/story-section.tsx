'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface StorySectionProps {
  saviourCount: number | null;
}

/**
 * Live counter effect: starts from a random high number, rapidly counts DOWN
 * to the actual value with flickering, then settles with a pulse.
 */
function useLiveCounterEffect(target: number | null, isVisible: boolean, hasMounted: boolean) {
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasMounted || target === null || !isVisible) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startValue = target + Math.floor(Math.random() * (target * 1.5)) + 200;
    let current = startValue;
    setDisplayValue(current);
    setSettled(false);

    const totalSteps = 40;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      current = Math.round(startValue + (target - startValue) * easeOut);

      if (progress < 0.7) {
        current += Math.floor(Math.random() * 10) - 5;
      }

      setDisplayValue(current);

      if (step >= totalSteps) {
        clearInterval(interval);
        setDisplayValue(target);
        setSettled(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [target, isVisible, hasMounted]);

  return { displayValue, settled };
}

export default function StorySection({ saviourCount }: StorySectionProps) {
  const { ref: problemRef, hasMounted: problemMounted, isVisible: problemVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: solutionRef, hasMounted: solutionMounted, isVisible: solutionVisible } = useScrollAnimation({ threshold: 0.15 });

  // Live counter: each saviour = 20 birds helped
  const birdsHelped = saviourCount !== null ? saviourCount * 20 : null;
  const { displayValue: animatedBirds, settled: counterSettled } = useLiveCounterEffect(birdsHelped, problemVisible, problemMounted);

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
            <div className={`font-display text-[120px] sm:text-[160px] font-bold text-white/90 leading-none tabular-nums transition-transform duration-300 ${counterSettled ? 'animate-settle-pulse' : ''}`}>
              {birdsHelped === null ? (
                <span className="inline-block w-48 h-32 bg-white/10 rounded-xl animate-pulse" />
              ) : (
                <><span className="text-[0.4em] align-baseline opacity-60">≈</span>{animatedBirds ?? birdsHelped}</>
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
          SOLUTION SECTION — split layout: dark left, beige right
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          ref={solutionRef}
          className={`grid grid-cols-1 lg:grid-cols-2 min-h-[500px] ${solutionMounted ? `motion-reveal ${solutionVisible ? 'is-visible' : ''}` : ''}`}
        >
          {/* Left — Dark terracotta with text */}
          <div className="bg-[#3D1F0D] px-8 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80 mb-4">
              The Solution
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              A network of water bowls, placed by people who care.
            </h2>
            <p className="text-base leading-relaxed text-white/65 mb-4">
              Water For Wings is building a community-driven network of water stations
              across Delhi. Each participant — a &quot;Saviour&quot; — places a bowl of fresh
              water outside their home, office, or balcony.
            </p>
            <p className="text-base leading-relaxed text-white/65">
              It takes 2 minutes. It costs nothing. And it can keep dozens of birds
              alive through the hottest months of the year.
            </p>
          </div>

          {/* Right — Beige with sketch + floating stat pills */}
          <div className="bg-[#FAF8F4] px-8 sm:px-12 lg:px-16 py-16 lg:py-24 flex items-center justify-center relative overflow-hidden">
            {/* Bowl sketch */}
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
              <Image
                src="/hero-bowl-sketch.png"
                alt="Water bowl"
                fill
                sizes="320px"
                className="object-contain opacity-80"
              />
            </div>

            {/* Floating stat pills overlaid on sketch */}
            <div
              className="absolute top-[15%] right-[12%] bg-white rounded-full px-4 py-2 shadow-lg border border-[var(--border)] text-xs font-semibold text-text-primary"
              style={{ transform: 'rotate(-3deg)' }}
            >
              🌱 {saviourCount ?? '—'} Saviours
            </div>
            <div
              className="absolute bottom-[20%] left-[10%] bg-white rounded-full px-4 py-2 shadow-lg border border-[var(--border)] text-xs font-semibold text-red-500"
              style={{ transform: 'rotate(2deg)' }}
            >
              🌡️ 40°C Delhi
            </div>
            <div
              className="absolute bottom-[35%] right-[8%] bg-white rounded-full px-4 py-2 shadow-lg border border-[var(--border)] text-xs font-semibold text-accent"
              style={{ transform: 'rotate(-1deg)' }}
            >
              🐦 {birdsHelped ?? '—'} Birds
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
