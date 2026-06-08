'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation, useAnimatedCounter } from '@/hooks/use-scroll-animation';

interface LiveStatsBarProps {
  saviourCount: number | null;
}

interface WeatherData {
  temperature: number;
  loading: boolean;
  error: boolean;
}

export default function LiveStatsBar({ saviourCount }: LiveStatsBarProps) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    loading: true,
    error: false,
  });

  const { ref: statsRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const animatedCount = useAnimatedCounter(saviourCount, 1200, isVisible, hasMounted);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
        }, 5000);

        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true',
          { signal: controller.signal }
        );

        clearTimeout(timeout);
        const data = await res.json();

        setWeather({
          temperature: Math.round(data.current_weather.temperature),
          loading: false,
          error: false,
        });
      } catch {
        setWeather({
          temperature: 0,
          loading: false,
          error: true,
        });
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
      <div
        ref={statsRef}
        className={`max-w-4xl mx-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm ${
          hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
          {/* Live Saviours */}
          <div className="flex flex-col items-center justify-center py-6 px-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Live Saviours
              </span>
            </div>
            <span className="font-display text-3xl text-[var(--text-primary)]">
              {hasMounted ? animatedCount : (saviourCount ?? 0)}
            </span>
          </div>

          {/* Live Delhi Temp */}
          <div className="flex flex-col items-center justify-center py-6 px-4">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Live Delhi Temp
            </span>
            <span className="font-display text-3xl text-[var(--text-primary)]">
              {weather.loading
                ? '...'
                : weather.error
                ? '--'
                : `${weather.temperature}\u00b0C`}
            </span>
          </div>

          {/* Bowls Placed */}
          <div className="flex flex-col items-center justify-center py-6 px-4">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Bowls placed
            </span>
            <span className="font-display text-3xl text-[var(--text-primary)]">
              {hasMounted ? animatedCount : (saviourCount ?? 0)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
