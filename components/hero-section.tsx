'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useScrollAnimation, useAnimatedCounter } from '@/hooks/use-scroll-animation';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
  saviourCount: number | null;
}

interface WeatherData {
  temperature: number;
  loading: boolean;
  error: boolean;
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

  const { ref: heroRef, hasMounted: heroMounted, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: counterRef, hasMounted: counterMounted, isVisible: counterVisible } = useScrollAnimation({ threshold: 0.5 });
  const animatedCount = useAnimatedCounter(saviourCount, 1200, counterVisible, counterMounted);

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
    if (temp > 40) return 'Dangerously hot today';
    if (temp >= 35) return 'Dangerously hot';
    return 'Fresh water needed';
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream pt-14 lg:pt-20">
      <div
        ref={heroRef}
        className={`relative z-10 grid min-h-[calc(100svh-3.5rem)] grid-cols-1 gap-8 px-6 pb-12 pt-7 sm:px-8 md:pt-9 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14 lg:px-24 lg:pb-8 lg:pt-8 xl:px-30 2xl:px-36 ${heroMounted ? `motion-reveal ${heroVisible ? 'is-visible' : ''}` : ''}`}
      >
        <div className="flex max-w-xl flex-col items-start text-left lg:pt-6">
          <div className="motion-weather mb-8 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/[0.07] px-3.5 py-2 text-[13px] font-medium text-navy/80 shadow-sm sm:mb-9 sm:px-4 lg:mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
            <span>
              {weather.loading
                ? 'Fetching Delhi temp...'
                : weather.error
                ? 'Delhi Weather'
                : `Delhi - ${weather.temperature}\u00b0C`}
              {!weather.loading && !weather.error && (
                <span className="ml-1.5 text-navy/60">
                  - {getWeatherMessage(weather.temperature)}
                </span>
              )}
            </span>
          </div>

          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-navy/45">
              PRAAN
            </span>
            <span className="hidden h-px w-8 bg-navy/25 sm:block" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-navy/65">
              Current initiative - Water For Wings
            </span>
          </div>

          <h1 className="max-w-[12ch] text-[2.65rem] font-extrabold leading-[1.04] tracking-normal text-navy sm:text-[3.45rem] lg:text-[3.7rem] xl:text-[4.15rem]">
            A simple bowl of water can save a bird&apos;s life.
          </h1>

          <p className="mt-6 max-w-[34rem] text-base leading-7 text-navy/65 sm:text-lg sm:leading-8 lg:mt-5">
            Delhi&apos;s summer heat kills birds. One bowl outside your door
            changes that.
          </p>

          <div
            ref={counterRef}
            className={`mt-8 transition-opacity duration-300 lg:mt-7 ${saviourCount === null ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="text-[2.65rem] font-extrabold leading-none text-navy sm:text-5xl lg:text-[3.05rem]">
              {counterMounted ? animatedCount : (saviourCount ?? 0)}
            </div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/55">
              Saviours have acted
            </div>
          </div>

          <button
            type="button"
            onClick={onBecomeSaviour}
            className="motion-cta mt-7 h-[52px] w-full rounded-md bg-navy px-8 text-base font-semibold text-cream shadow-lg shadow-navy/15 transition-all hover:bg-navy-dark sm:w-auto sm:min-w-60 lg:mt-6"
          >
            Place Your Water Bowl
          </button>
        </div>

        <div
          className="relative h-[160px] min-h-[160px] w-full overflow-hidden sm:h-[210px] lg:h-full lg:min-h-[560px]"
          aria-hidden="true"
        >
          <div className="absolute bottom-0 right-[-1.5rem] h-full w-[82%] opacity-[0.72] mix-blend-multiply sm:right-0 sm:w-[74%] lg:bottom-12 lg:right-[-5rem] lg:h-[58%] lg:w-[88%] xl:right-[-7rem] xl:h-[62%]">
            <Image
              src="/hero-bowl-sketch.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 48vw, 76vw"
              className="object-contain object-[right_bottom]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
