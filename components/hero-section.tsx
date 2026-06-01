'use client';

import { useState, useEffect } from 'react';

import {
  PraanLogo,
  BrandTagline,
  BrandStatement,
  HeartDivider,
  HeroInitiativeBlock,
} from '@/components/brand-labels';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
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
      <circle cx="15" cy="9" r="0.5" />
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
      className="absolute text-navy/25 animate-fly-bird pointer-events-none"
      style={{
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Bird className="w-5 h-5 md:w-6 md:h-6" />
    </div>
  );
}

export default function HeroSection({
  onBecomeSaviour,
}: HeroSectionProps) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    loading: true,
    error: false,
  });

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

        return;
      } catch {}

      setWeather({
        temperature: 0,
        loading: false,
        error: true,
      });
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherMessage = (temp: number) => {
    if (temp > 40) return 'Birds are suffering. They need you NOW.';
    if (temp >= 35) return "It's dangerously hot for birds.";
    return 'Birds still need fresh water daily.';
  };

  return (
    <section className="relative min-h-0 flex flex-col overflow-hidden">
      {/* Premium background — swap hero-background__image for a photo later */}
      <div className="absolute inset-0 hero-background">
        <div className="hero-background__image" aria-hidden="true" />
        <div className="hero-background__sky" aria-hidden="true" />
        <div className="hero-background__horizon" aria-hidden="true" />
        <div className="hero-background__overlay" aria-hidden="true" />
      </div>

      <FlyingBird delay={0} top="18%" duration={22} />
      <FlyingBird delay={2} top="28%" duration={26} />
      <FlyingBird delay={4} top="22%" duration={24} />

      {/* Hero — content-height on desktop; no flex centering (avoids empty space below CTA) */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-4 sm:px-6 lg:px-2 pt-14 pb-8 md:pb-10 lg:pt-[4.75rem] lg:pb-5 lg:mt-14 lg:-translate-y-10 xl:-translate-y-12 2xl:-translate-y-14">
        <PraanLogo
          className="h-auto w-[min(94vw,26rem)] sm:w-[min(92vw,34rem)] md:w-[min(90vw,46rem)] lg:w-[99vw] xl:w-[99.5vw] 2xl:w-[99vw] lg:max-w-none shrink-0 mb-2 lg:mb-2.5"
          sizes="(min-width: 1536px) 99vw, (min-width: 1280px) 99.5vw, (min-width: 1024px) 99vw, 94vw"
          priority
        />

        {/* PRAAN voice → initiative → weather & CTA */}
        <div className="flex flex-col items-center w-full max-w-[36rem] mx-auto lg:mt-1">
          <BrandTagline className="mb-1.5 md:mb-2" />

          <BrandStatement className="mb-2 md:mb-2.5 lg:mb-2.5 max-w-lg text-sm md:text-[0.9375rem]" />

          <HeartDivider className="mb-2.5 md:mb-3 lg:mb-3" />

          <HeroInitiativeBlock className="mb-3.5 md:mb-4 lg:mb-4" />

          <div className="inline-flex items-center gap-3 sm:gap-3.5 bg-cream/90 backdrop-blur-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md mb-2 md:mb-2.5 border border-white/40">
            <span className="text-xl sm:text-2xl leading-none">🌡️</span>
            <span className="font-semibold text-navy text-[0.9375rem] sm:text-lg">
              {weather.loading
                ? 'Fetching Delhi temp...'
                : weather.error
                ? 'Delhi Weather'
                : `Delhi Right Now: ${weather.temperature}°C`}
            </span>
          </div>

          <p className="text-navy/70 font-medium text-sm sm:text-[0.9375rem] md:text-base mb-2.5 md:mb-3 max-w-md mx-auto leading-snug">
            {weather.loading || weather.error
              ? 'Birds still need fresh water daily.'
              : getWeatherMessage(weather.temperature)}
          </p>

          <button
            type="button"
            onClick={onBecomeSaviour}
            className="w-full max-w-xl mx-auto bg-cream/85 backdrop-blur-md border border-white/50 rounded-3xl px-6 py-4 sm:py-4.5 lg:py-3.5 shadow-lg hover:bg-cream/95 hover:shadow-xl transition-all text-left sm:text-center cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 text-center">
              <div className="text-[2rem] sm:text-[2.25rem] md:text-4xl leading-none group-hover:scale-105 transition-transform">
                🪹
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-xl md:text-[1.35rem] lg:text-[1.4rem] font-bold text-navy leading-snug sm:leading-relaxed">
                  Keep a water bowl for birds this summer.
                </p>
                <p className="text-navy/75 font-medium text-sm sm:text-[0.9375rem] md:text-lg mt-1.5 sm:mt-2">
                  💙 Place it outside & become a saviour.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 md:bottom-5 lg:bottom-3 left-1/2 -translate-x-1/2 z-10 text-navy/40 text-xl animate-scroll-hint pointer-events-none"
        aria-hidden="true"
      >
        ⌄
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 lg:h-14 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
    </section>
  );
}
