'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface LiveStatsBarProps {
  saviourCount: number | null;
}

/** Simple count-up that re-runs when target changes */
function useCountUp(target: number | null, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    if (target === prevTarget.current) return;

    prevTarget.current = target;
    const startValue = count;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(startValue + (target - startValue) * easeOut);
      setCount(currentCount);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
}

export default function LiveStatsBar({ saviourCount }: LiveStatsBarProps) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [tempLoading, setTempLoading] = useState(true);

  const { ref: statsRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const animatedSaviours = useCountUp(saviourCount, 800);
  const animatedTemp = useCountUp(temperature, 800);

  // Fetch Delhi temperature via server-side API route (avoids CORS/connection issues)
  useEffect(() => {
    const fetchTemp = async () => {
      try {
        const res = await fetch('/api/temperature');
        const data = await res.json();

        if (data.temperature !== null && data.temperature !== undefined) {
          setTemperature(data.temperature);
        }
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
      <div className="max-w-3xl mx-auto bg-bg-card rounded-2xl border border-[var(--border)] shadow-sm px-6 py-6 sm:px-10 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 sm:divide-x sm:divide-[var(--border)]">

          {/* Live Saviours */}
          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-scale" />
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Live Saviours
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
              {saviourCount === null ? (
                <span className="inline-block w-16 h-9 bg-bg-surface rounded animate-pulse" />
              ) : (
                animatedSaviours
              )}
            </span>
          </div>

          {/* Live Delhi Temp */}
          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse-scale" />
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Live Delhi Temp
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
              {tempLoading ? (
                <span className="inline-block w-16 h-9 bg-bg-surface rounded animate-pulse" />
              ) : temperature !== null ? (
                <>{animatedTemp}°C</>
              ) : (
                'N/A'
              )}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
