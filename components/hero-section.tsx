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
  saviourCount,
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
      <div className="relative z-10 flex flex-col items-center text-center w-full px-4 sm:px-6 lg:px-2 pt-6 pb-4 md:pb-6 lg:pt-[2.5rem] lg:pb-3 lg:mt-6 lg:-translate-y-5 xl:-translate-y-7 2xl:-translate-y-8">
        <PraanLogo
          className="h-auto w-[min(50vw,14rem)] sm:w-[min(48vw,18rem)] md:w-[min(46vw,24rem)] lg:w-[52vw] xl:w-[52vw] 2xl:w-[52vw] lg:max-w-none shrink-0 mb-1 lg:mb-1"
          sizes="(min-width: 1536px) 52vw, (min-width: 1280px) 52vw, (min-width: 1024px) 52vw, 50vw"
          priority
        />

        {/* PRAAN voice → initiative → 3-step flow → social proof → CTAs */}
        <div className="flex flex-col items-center w-full max-w-[36rem] mx-auto lg:mt-0">
          <BrandTagline className="mb-0" />

          <BrandStatement className="mb-1 md:mb-1 lg:mb-1 max-w-lg text-sm md:text-[0.9375rem]" />

          <HeartDivider className="mb-1 md:mb-1.5 lg:mb-1.5" />

          <HeroInitiativeBlock className="mb-0.5 md:mb-1 lg:mb-1" />
          
          {/* Supporting line */}
          <p className="text-navy/60 text-sm sm:text-base md:text-lg font-medium italic mb-2 md:mb-2.5">
            A simple bowl of water can save a life.
          </p>

          {/* 3-Step Flow */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 mb-2.5 md:mb-3 lg:mb-3 text-center">
            <span className="text-navy font-semibold text-[0.9375rem] sm:text-base md:text-lg px-2 py-0.5">
              Place Water
            </span>
            <span className="text-navy/40 text-base sm:text-lg">→</span>
            <span className="text-navy font-semibold text-[0.9375rem] sm:text-base md:text-lg px-2 py-0.5">
              Register Contribution
            </span>
            <span className="text-navy/40 text-base sm:text-lg">→</span>
            <span className="text-navy font-semibold text-[0.9375rem] sm:text-base md:text-lg px-2 py-0.5">
              Join The Saviour Wall
            </span>
          </div>

          {/* Weather Display - subtle context */}
          <div className="inline-flex items-center gap-2 bg-cream/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/40 mb-2.5 md:mb-3">
            <span className="text-base sm:text-lg leading-none">🌡️</span>
            <span className="font-medium text-navy/80 text-sm sm:text-[0.9375rem]">
              {weather.loading
                ? 'Fetching Delhi temp...'
                : weather.error
                ? 'Delhi Weather'
                : `Delhi: ${weather.temperature}°C`}
              {!weather.loading && !weather.error && (
                <span className="text-navy/60 ml-1.5">
                  — {weather.temperature > 40 ? 'Birds need you NOW' : weather.temperature >= 35 ? 'Dangerously hot' : 'Fresh water needed'}
                </span>
              )}
            </span>
          </div>

          {/* Social Proof - Saviour Counter */}
          {saviourCount !== null && (
            <div className="mb-3 md:mb-3.5 text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-none">
                {saviourCount}
              </div>
              <div className="text-navy/70 font-semibold text-sm sm:text-base uppercase tracking-wide">
                Saviours Joined
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full max-w-xl mx-auto">
            <button
              type="button"
              onClick={onBecomeSaviour}
              className="w-full sm:flex-1 bg-navy text-cream font-bold text-base sm:text-lg md:text-xl px-6 py-3 sm:py-3.5 rounded-2xl shadow-lg hover:bg-navy-dark hover:shadow-xl transition-all cursor-pointer"
            >
              Join The Saviour Wall
            </button>
            <a
              href="/saviours"
              className="w-full sm:flex-1 bg-cream/85 backdrop-blur-md border-2 border-navy/30 text-navy font-bold text-base sm:text-lg md:text-xl px-6 py-3 sm:py-3.5 rounded-2xl shadow-md hover:bg-cream/95 hover:shadow-lg hover:border-navy/50 transition-all text-center cursor-pointer"
            >
              View Saviours
            </a>
          </div>
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
