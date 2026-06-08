'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import SaviourCard from '@/components/saviour-card';
import { fetchLatestSaviours, type Saviour } from '@/lib/saviours';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const HOME_PREVIEW_COUNT = 8;

interface SaviourWallProps {
  onBecomeSaviour: () => void;
}

export default function SaviourWall({ onBecomeSaviour }: SaviourWallProps) {
  const [saviours, setSaviours] = useState<Saviour[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

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
    <section id="saviours" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-base)]">
      <div ref={sectionRef} className={`max-w-5xl mx-auto ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)]">
            Meet Delhi&apos;s Saviours
          </h2>
          <Link
            href="/saviours"
            className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            View all &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)]" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-[var(--bg-surface)] rounded mb-2" />
                    <div className="h-3 w-16 bg-[var(--bg-surface)] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : saviours.length === 0 ? (
          <div className="text-center py-16 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl">
            <p className="text-xl text-[var(--text-primary)] font-medium">
              Be the first Saviour in Delhi!
            </p>
            <p className="text-[var(--text-muted)] mt-2">
              Join the mission and see your name here
            </p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${hasMounted ? `motion-stagger ${isVisible ? 'is-visible' : ''}` : ''}`}>
            {saviours.map((saviour, index) => (
              <SaviourCard
                key={`${saviour.id}-${saviour.saviourNumber}`}
                saviour={saviour}
                animate={index === 0}
              />
            ))}

            {/* CTA Card */}
            <button
              type="button"
              onClick={onBecomeSaviour}
              className="border-2 border-dashed border-[var(--border)] rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[var(--accent)] hover:bg-[var(--bg-card)] transition-all cursor-pointer min-h-[80px]"
            >
              <span className="text-2xl">+</span>
              <span className="font-body text-sm font-medium text-[var(--text-muted)]">
                Become a saviour
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
