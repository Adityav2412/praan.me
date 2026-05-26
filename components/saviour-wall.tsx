'use client';

import { useState, useEffect } from 'react';

import {
  fetchSaviours,
  formatTimeAgo,
  type Saviour,
} from '@/lib/storage';

export default function SaviourWall() {
  const [saviours, setSaviours] =
    useState<Saviour[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const updateSaviours =
      async (
        showLoader = false
      ) => {
        try {
          if (showLoader) {
            setLoading(true);
          }

          const data =
            await fetchSaviours();

          // remove broken entries
          const cleanData =
            data.filter(
              (saviour) =>
                saviour.name &&
                saviour.colony &&
                saviour.timestamp &&
                saviour.saviourNumber
            );

          // newest first
          const latest =
            [...cleanData]
              .sort(
                (
                  a,
                  b
                ) =>
                  b.saviourNumber -
                  a.saviourNumber
              )
              .slice(0, 10);

          if (mounted) {
            setSaviours(latest);
          }
        } catch (error) {
          console.error(
            'Failed to fetch saviours:',
            error
          );
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    // instant initial load
    updateSaviours(true);

    // faster sync refresh
    const interval =
      setInterval(() => {
        updateSaviours(false);
      }, 4000);

    // auto refresh when tab focused
    const handleFocus =
      () => {
        updateSaviours(false);
      };

    window.addEventListener(
      'focus',
      handleFocus
    );

    return () => {
      mounted = false;

      clearInterval(
        interval
      );

      window.removeEventListener(
        'focus',
        handleFocus
      );
    };
  }, []);

  return (
    <section
      id="saviours"
      className="py-16 px-4 bg-cream"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-extrabold text-navy text-center mb-4">
          Our Saviours 💙
        </h2>

        <p className="text-navy/70 text-center mb-10 max-w-2xl mx-auto">
          Heroes who have joined
          the mission to save
          Delhi&apos;s birds
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {[1, 2, 3].map(
              (item) => (
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
              )
            )}
          </div>
        ) : saviours.length ===
          0 ? (
          <div className="text-center py-16 bg-cream-dark rounded-2xl">

            <span className="text-6xl mb-4 block">
              🐦
            </span>

            <p className="text-xl text-navy font-medium">
              Be the first
              Saviour in Delhi!
            </p>

            <p className="text-navy/60 mt-2">
              Join the mission
              and see your name
              here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {saviours.map(
              (
                saviour,
                index
              ) => (
                <div
                  key={`${saviour.id}-${saviour.saviourNumber}`}
                  className={`bg-cream-dark border-2 border-transparent hover:border-navy/20 rounded-xl p-5 transition-all hover:shadow-lg ${
                    index === 0
                      ? 'animate-slide-up'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">

                    <div>
                      <h3 className="font-bold text-navy text-lg">
                        {
                          saviour.name
                        }
                      </h3>

                      <p className="text-navy/60 text-sm">
                        {
                          saviour.colony
                        }
                      </p>
                    </div>

                    <span className="bg-navy text-cream text-xs font-bold px-3 py-1 rounded-full">
                      #
                      {
                        saviour.saviourNumber
                      }
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-navy/70">
                      🫙{' '}
                      {
                        saviour.stationType
                      }
                    </span>

                    <span className="text-navy/50">
                      {formatTimeAgo(
                        saviour.timestamp
                      )}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
