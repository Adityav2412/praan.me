'use client';

import { useState, useEffect, useRef } from 'react';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
  saviourCount: number | null;
}

interface WeatherData {
  temperature: number;
  loading: boolean;
  error: boolean;
}

function Bird({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4.5 9.5C6.5 7 9 6 12 6c4 0 7.5 2 9.5 4.5.5.6.3 1.5-.5 1.8l-6 2.2c-.3.1-.7.1-1 0l-6-2.2c-.8-.3-1-1.2-.5-1.8z" />

      <path d="M12 6c-1.5-2-3-3-5-3 1 1.5 1.5 3 1 4.5" />

      <circle
        cx="15"
        cy="9"
        r="0.5"
      />
    </svg>
  );
}

function FlyingBird({
  delay,
  top,
  duration,
}: {
  delay: number;
  top: string;
  duration: number;
}) {
  return (
    <div
      className="absolute text-navy/40 animate-fly-bird"
      style={{
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Bird className="w-6 h-6 md:w-8 md:h-8" />
    </div>
  );
}

function useCountUp(
  target: number,
  duration: number = 2000
) {
  const [count, setCount] =
    useState(0);

  const [
    hasStarted,
    setHasStarted,
  ] = useState(false);

  const ref =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            !hasStarted
          ) {
            setHasStarted(true);
          }
        },
        {
          threshold: 0.5,
        }
      );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () =>
      observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime =
      Date.now();

    const endTime =
      startTime + duration;

    const animate = () => {
      const now =
        Date.now();

      const progress =
        Math.min(
          (now - startTime) /
            duration,
          1
        );

      const easeOut =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      setCount(
        Math.floor(
          easeOut * target
        )
      );

      if (now < endTime) {
        requestAnimationFrame(
          animate
        );
      }
    };

    requestAnimationFrame(
      animate
    );
  }, [
    hasStarted,
    target,
    duration,
  ]);

  return { count, ref };
}

export default function HeroSection({
  onBecomeSaviour,
  saviourCount,
}: HeroSectionProps) {
  const [weather, setWeather] =
    useState<WeatherData>({
      temperature: 0,
      loading: true,
      error: false,
    });

  const safeCount =
    saviourCount ?? 0;

  const {
    count,
    ref: counterRef,
  } = useCountUp(safeCount);

  useEffect(() => {
    const fetchWeather =
      async () => {
        try {
          const controller =
            new AbortController();

          const timeout =
            setTimeout(() => {
              controller.abort();
            }, 5000);

          const res =
            await fetch(
              'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true',
              {
                signal:
                  controller.signal,
              }
            );

          clearTimeout(
            timeout
          );

          const data =
            await res.json();

          setWeather({
            temperature:
              Math.round(
                data
                  .current_weather
                  .temperature
              ),

            loading: false,
            error: false,
          });

          return;
        } catch {}

        setWeather({
          temperature: 0,
          loading: false,
          error: true,
        });
      };

    fetchWeather();

    const interval =
      setInterval(
        fetchWeather,
        10 * 60 * 1000
      );

    return () =>
      clearInterval(interval);
  }, []);

  const getWeatherMessage = (
    temp: number
  ) => {
    if (temp > 40) {
      return 'Birds are suffering. They need you NOW.';
    }

    if (temp >= 35) {
      return "It's dangerously hot for birds.";
    }

    return 'Birds still need fresh water daily.';
  };

  const progress =
    saviourCount === null
      ? 0
      : Math.min(
          (saviourCount /
            200) *
            100,
          100
        );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]" />

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-yellow-200/60 via-orange-200/30 to-transparent rounded-full blur-3xl" />

        <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />
      </div>

      {/* Birds */}
      <FlyingBird
        delay={0}
        top="15%"
        duration={18}
      />

      <FlyingBird
        delay={1}
        top="25%"
        duration={22}
      />

      <FlyingBird
        delay={2}
        top="20%"
        duration={20}
      />

      <FlyingBird
        delay={3}
        top="30%"
        duration={25}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-20 pb-16 max-w-5xl mx-auto">

        {/* Weather */}
        <div className="inline-flex items-center gap-3 bg-cream/90 backdrop-blur-sm px-6 md:px-8 py-4 rounded-full shadow-xl mb-6 border border-white/40">

          <span className="text-3xl">
            🌡️
          </span>

          <span className="font-bold text-navy text-lg md:text-xl">
            {weather.loading
              ? 'Fetching Delhi temp...'
              : weather.error
              ? 'Delhi Weather'
              : `Delhi Right Now: ${weather.temperature}°C`}
          </span>
        </div>

        {/* Weather Message */}
        <p className="text-navy/80 font-medium text-lg mb-8 max-w-md mx-auto">
          {weather.loading ||
          weather.error
            ? 'Birds need fresh water every day.'
            : getWeatherMessage(
                weather.temperature
              )}
        </p>

        {/* Main Mission Box */}
        <div className="max-w-4xl mx-auto mb-10 bg-cream/80 backdrop-blur-md border border-white/40 rounded-3xl px-6 py-5 shadow-xl">

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">

            <div className="text-5xl">
              🪹
            </div>

            <div>
              <p className="text-xl md:text-2xl font-bold text-navy leading-relaxed">
                Keep a water bowl for birds this summer.
              </p>

              <p className="text-navy/80 font-medium text-base md:text-lg mt-1">
                💙 Place it outside & become a saviour.
              </p>
            </div>

          </div>
        </div>

        {/* Action Clarity Section */}
        <div className="max-w-3xl mx-auto mb-10">

          <div className="bg-white/55 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-4 shadow-lg">

            <p className="text-navy font-semibold text-sm md:text-base leading-relaxed text-center">

              Place a real water bowl outside for birds,
              then claim your Saviour badge 💙

            </p>

          </div>

        </div>

        {/* Counter */}
        <div
          ref={counterRef}
          className="mb-4"
        >
          <span className="text-7xl md:text-9xl font-extrabold text-navy animate-count-up">

            {saviourCount ===
            null
              ? '—'
              : count}
          </span>
        </div>

        <p className="text-2xl font-bold text-navy/80 tracking-widest mb-6">
          SAVIOURS
        </p>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">

          <div className="flex justify-between text-sm font-medium text-navy/70 mb-2">
            <span>
              {saviourCount ===
              null
                ? 'Loading...'
                : `${saviourCount} Saviours`}
            </span>

            <span>200+</span>
          </div>

          <div className="h-4 bg-cream-dark rounded-full overflow-hidden shadow-inner">

            <div
              className="h-full bg-gradient-to-r from-navy to-navy-light rounded-full transition-all duration-1000"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={
            onBecomeSaviour
          }
          className="inline-flex items-center gap-2 bg-navy text-cream px-8 md:px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-navy-dark transition-all hover:scale-105 animate-pulse-glow"
        >
          🐦 Become a Saviour
        </button>

        {/* Tiny Footer Note */}
        <p className="text-navy/70 text-sm mt-5 font-medium">
          ↪ Place a bowl, help birds & join the movement.
        </p>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
