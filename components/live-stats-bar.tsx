'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface LiveStatsBarProps {
  saviourCount: number | null;
}

/** Single digit flip cell */
function FlipDigit({ digit, delay }: { digit: string; delay: number }) {
  const [current, setCurrent] = useState(digit);
  const [prev, setPrev] = useState(digit);
  const [flipping, setFlipping] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initial flip-in animation
      setPrev('0');
      setCurrent(digit);
      const timer = setTimeout(() => setFlipping(true), delay);
      const endTimer = setTimeout(() => setFlipping(false), delay + 400);
      return () => { clearTimeout(timer); clearTimeout(endTimer); };
    }

    if (digit !== current) {
      setPrev(current);
      setCurrent(digit);
      setFlipping(true);
      const timer = setTimeout(() => setFlipping(false), 400);
      return () => clearTimeout(timer);
    }
  }, [digit, delay, current]);

  return (
    <span
      className="relative inline-block w-[1.1em] h-[1.4em] overflow-hidden rounded-sm bg-[#1A1A18]/[0.04]"
    >
      {/* Previous digit — slides out */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-[400ms] ease-out ${
          flipping ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ opacity: flipping ? 0 : 1 }}
      >
        {prev}
      </span>
      {/* Current digit — slides in */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-[400ms] ease-out ${
          flipping ? 'translate-y-0' : ''
        }`}
        style={{
          transform: flipping ? 'translateY(0)' : 'translateY(0)',
          opacity: 1,
        }}
      >
        {flipping ? (
          <span className="animate-flip-in">{current}</span>
        ) : (
          current
        )}
      </span>
    </span>
  );
}

/** Renders a number as flip-board digits */
function FlipNumber({ value, suffix }: { value: number | null; suffix?: string }) {
  if (value === null) {
    return <span className="inline-block w-20 h-10 bg-bg-surface rounded animate-pulse" />;
  }

  const digits = value.toString().split('');

  return (
    <span className="inline-flex items-center gap-[2px] text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
      {digits.map((d, i) => (
        <FlipDigit key={`${i}-${digits.length}`} digit={d} delay={i * 80} />
      ))}
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}

export default function LiveStatsBar({ saviourCount }: LiveStatsBarProps) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [tempLoading, setTempLoading] = useState(true);

  const { ref: statsRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const birdsHelped = saviourCount !== null ? saviourCount * 25 : null;

  // Fetch Delhi temperature from Open-Meteo
  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true',
          { signal: controller.signal }
        );
        clearTimeout(timeout);

        const data = await res.json();
        setTemperature(Math.round(data.current_weather.temperature));
        setTempLoading(false);
      } catch {
        setTempLoading(false);
      }
    };

    fetchTemp();
    const interval = setInterval(fetchTemp, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={statsRef}
      className={`py-6 px-6 ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
    >
      <div className="max-w-4xl mx-auto bg-bg-card rounded-2xl border border-[var(--border)] shadow-sm px-6 py-6 sm:px-10 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-[var(--border)]">

          {/* Live Saviours */}
          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-scale" />
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Live Saviours
              </span>
            </div>
            <FlipNumber value={saviourCount} />
          </div>

          {/* Live Delhi Temp */}
          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse-scale" />
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Live Delhi Temp
              </span>
            </div>
            {tempLoading ? (
              <span className="inline-block w-20 h-10 bg-bg-surface rounded animate-pulse" />
            ) : (
              <FlipNumber value={temperature} suffix="°C" />
            )}
          </div>

          {/* Birds Helped */}
          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Birds Helped
              </span>
            </div>
            <FlipNumber value={birdsHelped} />
          </div>

        </div>
      </div>
    </section>
  );
}
