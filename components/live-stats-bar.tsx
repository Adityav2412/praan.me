'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation, useAnimatedCounter } from '@/hooks/use-scroll-animation';

interface LiveStatsBarProps {
  saviourCount: number | null;
}

export default function LiveStatsBar({ saviourCount }: LiveStatsBarProps) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [tempLoading, setTempLoading] = useState(true);

  const { ref: statsRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const animatedSaviours = useAnimatedCounter(saviourCount, 1200, isVisible, hasMounted);
  const birdsHelped = saviourCount !== null ? saviourCount * 25 : null;
  const animatedBirds = useAnimatedCounter(birdsHelped, 1200, isVisible, hasMounted);

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
    const interval = setInterval(fetchTemp, 5 * 60 * 1000); // every 5 minutes
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
          <div className="flex flex-col items-center sm:items-center px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Live Saviours
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
              {saviourCount === null ? (
                <span className="inline-block w-16 h-9 bg-bg-surface rounded animate-pulse" />
              ) : (
                hasMounted ? animatedSaviours : saviourCount
              )}
            </span>
          </div>

          {/* Live Delhi Temp */}
          <div className="flex flex-col items-center sm:items-center px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse-dot" />
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Live Delhi Temp
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
              {tempLoading ? (
                <span className="inline-block w-16 h-9 bg-bg-surface rounded animate-pulse" />
              ) : temperature !== null ? (
                <>{temperature}°C</>
              ) : (
                '—'
              )}
            </span>
          </div>

          {/* Birds Helped */}
          <div className="flex flex-col items-center sm:items-center px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Birds Helped
              </span>
            </div>
            <span className="text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
              {birdsHelped === null ? (
                <span className="inline-block w-16 h-9 bg-bg-surface rounded animate-pulse" />
              ) : (
                hasMounted ? animatedBirds : birdsHelped
              )}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
