'use client';

import { useState, useEffect, useRef } from 'react';

interface HeroSectionProps {
  onBecomeSaviour: () => void;
  saviourCount: number;
}

interface WeatherData {
  temperature: number;
  loading: boolean;
  error: boolean;
}

function Bird({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.5 9.5C6.5 7 9 6 12 6c4 0 7.5 2 9.5 4.5.5.6.3 1.5-.5 1.8l-6 2.2c-.3.1-.7.1-1 0l-6-2.2c-.8-.3-1-1.2-.5-1.8z" />
      <path d="M12 6c-1.5-2-3-3-5-3 1 1.5 1.5 3 1 4.5" />
      <circle cx="15" cy="9" r="0.5" />
    </svg>
  );
}

function FlyingBird({ delay, top, duration }: { delay: number; top: string; duration: number }) {
  return (
    <div
      className="absolute text-navy/40 animate-fly-bird"
      style={{ top, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      <Bird className="w-6 h-6 md:w-8 md:h-8" />
    </div>
  );
}

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = Date.now();
    const endTime = startTime + duration;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));
      if (now < endTime) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

export default function HeroSection({ onBecomeSaviour, saviourCount }: HeroSectionProps) {
  const [weather, setWeather] = useState<WeatherData>({ temperature: 0, loading: true, error: false });
  const { count, ref: counterRef } = useCountUp(saviourCount);

  useEffect(() => {
    const fetchWeather = async () => {
      // Try Open-Meteo first
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5 sec timeout
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true',
          { signal: controller.signal }
        );
        clearTimeout(timeout);
        const data = await res.json();
        setWeather({ temperature: Math.round(data.current_weather.temperature), loading: false, error: false });
        return;
      } catch {}

      // Fallback: wttr.in API
      try {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 5000);
        const res2 = await fetch('https://wttr.in/Delhi?format=j1', { signal: controller2.signal });
        clearTimeout(timeout2);
        const data2 = await res2.json();
        const temp = parseInt(data2.current_condition[0].temp_C);
        setWeather({ temperature: temp, loading: false, error: false });
        return;
      } catch {}

      // Both failed
      setWeather({ temperature: 0, loading: false, error: true });
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherMessage = (temp: number) => {
    if (temp > 40) return "Birds are suffering. They need you NOW.";
    if (temp >= 35) return "It's dangerously hot for birds.";
    return "Birds still need fresh water daily.";
  };

  const progress = Math.min((saviourCount / 200) * 100, 100);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ghibli-style Sky Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#FFE4B5]" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-yellow-200/60 via-orange-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-40 h-20 bg-white/60 rounded-full blur-2xl" />
        <div className="absolute top-32 left-32 w-32 h-16 bg-white/50 rounded-full blur-xl" />
        <div className="absolute top-16 right-20 w-48 h-24 bg-white/55 rounded-full blur-2xl" />
        <div className="absolute top-40 right-40 w-36 h-18 bg-white/45 rounded-full blur-xl" />
        <div className="absolute top-28 left-1/2 w-44 h-22 bg-white/50 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />
      </div>

      {/* Flying Birds */}
      <FlyingBird delay={0} top="15%" duration={18} />
      <FlyingBird delay={3} top="25%" duration={22} />
      <FlyingBird delay={6} top="20%" duration={20} />
      <FlyingBird delay={9} top="30%" duration={25} />
      <FlyingBird delay={12} top="18%" duration={19} />
      <FlyingBird delay={15} top="35%" duration={23} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-20 pb-16">

        {/* Temperature Badge — moved higher with pt-20 */}
        <div className="inline-flex items-center gap-2 bg-cream/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-2">
          <span className="text-2xl">🌡️</span>
          <span className="font-bold text-navy">
            {weather.loading
              ? 'Fetching Delhi temp...'
              : weather.error
              ? 'Delhi Weather'
              : `Delhi Right Now: ${weather.temperature}°C`}
          </span>
        </div>

        {/* Weather Message */}
        <p className="text-navy/80 font-medium text-lg mb-6 max-w-md mx-auto">
          {weather.loading || weather.error
            ? "Birds need fresh water every day."
            : getWeatherMessage(weather.temperature)}
        </p>

        {/* Giant Counter */}
        <div ref={counterRef} className="mb-4">
          <span className="text-8xl md:text-9xl font-extrabold text-navy animate-count-up">
            {count}
          </span>
        </div>
        <p className="text-2xl font-bold text-navy/80 tracking-widest mb-6">
          SAVIOURS
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm font-medium text-navy/70 mb-2">
            <span>{saviourCount} Saviours</span>
            <span>200+</span>
          </div>
          <div className="h-4 bg-cream-dark rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-navy to-navy-light rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onBecomeSaviour}
          className="inline-flex items-center gap-2 bg-navy text-cream px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-navy-dark transition-all hover:scale-105 animate-pulse-glow"
        >
          🐦 Become a Saviour
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
