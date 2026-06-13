'use client';

import { useState, useEffect, useRef } from 'react';
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
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // Live counter: each saviour = 20 birds helped
  const birdsHelped = saviourCount !== null ? saviourCount * 20 : null;
  const { displayValue: animatedBirds, settled: counterSettled } = useLiveCounterEffect(birdsHelped, isVisible, hasMounted);

  return (
    <section className="py-16 lg:py-32 px-6 bg-[#3D1F0D] relative overflow-hidden">
      {/* Floating gold dots — visual interest */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
          <circle cx="50" cy="40" r="3" fill="#C9A84C" className="animate-pulse-dot" />
          <circle cx="340" cy="60" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
          <circle cx="120" cy="220" r="3" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '1.0s' }} />
          <circle cx="300" cy="240" r="4" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
          <circle cx="200" cy="30" r="3" fill="#C9A84C" className="animate-pulse-dot" style={{ animationDelay: '0.8s' }} />
          {/* Bird silhouettes */}
          <g className="animate-float-bird" style={{ animationDelay: '0s' }}>
            <path d="M70 100 C75 92, 83 92, 88 100 M88 100 C93 92, 101 92, 106 100" stroke="#C9A84C" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
          </g>
          <g className="animate-float-bird" style={{ animationDelay: '1.2s' }}>
            <path d="M280 180 C285 172, 293 172, 298 180 M298 180 C303 172, 311 172, 316 180" stroke="#C9A84C" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
          </g>
          <g className="animate-float-bird" style={{ animationDelay: '0.6s' }}>
            <path d="M160 260 C165 252, 173 252, 178 260 M178 260 C183 252, 191 252, 196 260" stroke="#C9A84C" strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div
        ref={sectionRef}
        className={`relative z-10 max-w-4xl mx-auto text-center ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        {/* Label */}
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C] mb-6">
          Why It Matters
        </span>

        {/* Counter */}
        <div className={`font-display text-[80px] sm:text-[120px] lg:text-[160px] font-bold text-white/90 leading-none tabular-nums transition-transform duration-300 ${counterSettled ? 'animate-settle-pulse' : ''}`}>
          {birdsHelped === null ? (
            <span className="inline-block w-40 h-20 sm:w-48 sm:h-28 bg-white/10 rounded-xl animate-pulse" />
          ) : (
            <><span className="text-[0.4em] align-baseline opacity-60" style={{ backgroundColor: 'transparent' }}>≈</span>{animatedBirds ?? birdsHelped}</>
          )}
        </div>
        <p className="text-base sm:text-lg text-white/50 mt-2 mb-8 font-medium">
          birds helped so far this summer.
        </p>

        {/* Thin rule */}
        <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Combined story — urgency + solution */}
        <div className="max-w-2xl mx-auto space-y-4 text-base leading-relaxed text-white/70 text-left sm:text-center">
          <p>
            Every summer, Delhi&apos;s temperatures cross 45°C. Water sources vanish. Thousands of birds die — not from disease, but from the simple lack of water. It&apos;s a crisis that hides in plain sight.
          </p>
          <p>
            Water For Wings is building a network of community water bowls across Delhi. One bowl. One person. Dozens of lives saved.
          </p>
        </div>
      </div>
    </section>
  );
}
