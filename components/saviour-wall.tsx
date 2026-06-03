'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import SaviourCard from '@/components/saviour-card';
import { fetchLatestSaviours, type Saviour } from '@/lib/saviours';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const HOME_PREVIEW_COUNT = 9;

export default function SaviourWall() {
  const [saviours, setSaviours] = useState<Saviour[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    let mounted = true;

    const updateSaviours = async (showLoader = false) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        const latest = await fetchLatestSaviours(HOME_PREVIEW_COUNT);

        if (mounted) {
          setSaviours(latest);
        }
      } catch (error) {
        console.error('Failed to fetch saviours:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    updateSaviours(true);

    const interval = setInterval(() => {
      updateSaviours(false);
    }, 4000);

    const handleFocus = () => {
      updateSaviours(false);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      mounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <section id="saviours" className="py-16 px-4 bg-cream">
      <div ref={sectionRef} className={`max-w-6xl mx-auto motion-reveal ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="text-4xl font-extrabold text-navy text-center mb-4">
          Our Saviours
        </h2>

        <p className="text-navy/70 text-center mb-10 max-w-2xl mx-auto">
          Heroes who have joined the mission to save Delhi&apos;s birds
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-cream-dark rounded-xl p-5 animate-pulse"
              >
                <div className="h-5 w-32 bg-navy/10 rounded mb-3" />
                <div className="h-4 w-20 bg-navy/10 rounded mb-6" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-navy/10 rounded" />
                  <div className="h-4 w-16 bg-navy/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : saviours.length === 0 ? (
          <div className="text-center py-16 bg-cream-dark rounded-2xl">
            <span className="text-6xl mb-4 block">🐦</span>
            <p className="text-xl text-navy font-medium">
              Be the first Saviour in Delhi!
            </p>
            <p className="text-navy/60 mt-2">
              Join the mission and see your name here
            </p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 motion-stagger ${isVisible ? 'is-visible' : ''}`}>
              {saviours.map((saviour, index) => (
                <SaviourCard
                  key={`${saviour.id}-${saviour.saviourNumber}`}
                  saviour={saviour}
                  animate={index === 0}
                />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link
                href="/saviours"
                className="bg-navy text-cream px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-navy-dark transition-all duration-300 motion-cta"
              >
                View Full Leaderboard
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
