'use client';

import {
  useState,
  useEffect,
} from 'react';

import {
  fetchSaviours,
  getColonyLeaderboard,
} from '@/lib/storage';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function AreaLeaderboard() {
  const [
    leaderboard,
    setLeaderboard,
  ] = useState<
    {
      colony: string;
      count: number;
    }[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    let mounted = true;

    const updateLeaderboard =
      async (
        showLoader = false
      ) => {
        try {
          if (showLoader) {
            setLoading(true);
          }

          // fetch latest Google Sheet data
          await fetchSaviours();

          // generate fresh leaderboard
          const data =
            getColonyLeaderboard();

          // remove broken colonies
          const cleanData =
            data.filter(
              (item) =>
                item.colony &&
                item.count > 0
            );

          // highest first
          const sorted =
            cleanData.sort(
              (a, b) =>
                b.count -
                a.count
            );

          if (mounted) {
            setLeaderboard(
              sorted
            );
          }
        } catch (error) {
          console.error(
            'Leaderboard fetch failed:',
            error
          );
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    // instant load
    updateLeaderboard(true);

    // faster auto sync
    const interval =
      setInterval(() => {
        updateLeaderboard(
          false
        );
      }, 4000);

    // refresh when user returns tab
    const handleFocus =
      () => {
        updateLeaderboard(
          false
        );
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

  const maxCount = Math.max(
    ...leaderboard.map(
      (l) => l.count
    ),
    1
  );

  const getMedal = (
    rank: number
  ) => {
    if (rank === 0)
      return '🥇';

    if (rank === 1)
      return '🥈';

    if (rank === 2)
      return '🥉';

    return `${rank + 1}`;
  };

  return (
    <section
      id="leaderboard"
      className="py-16 px-4 bg-cream-dark"
    >
      <div ref={sectionRef} className={`max-w-4xl mx-auto motion-reveal ${isVisible ? 'is-visible' : ''}`}>

        <h2 className="text-4xl font-extrabold text-navy text-center mb-2">
          Delhi Colony Leaderboard 🏆
        </h2>

        <p className="text-navy/70 text-center mb-10">
          Which colony is saving
          the most birds?
        </p>

        <div className="bg-cream rounded-2xl p-6 shadow-lg">

          {loading ? (
            <div className="space-y-4">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="animate-pulse"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 w-28 bg-navy/10 rounded" />

                      <div className="h-4 w-16 bg-navy/10 rounded" />
                    </div>

                    <div className="h-3 bg-navy/10 rounded-full" />
                  </div>
                )
              )}
            </div>
          ) : leaderboard.length ===
            0 ? (
            <p className="text-center text-navy/50 py-8 text-sm">
              Be the first from
              your colony to
              join!
            </p>
          ) : (
            <div className="space-y-4">

              {leaderboard
                .slice(0, 10)
                .map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={`${item.colony}-${item.count}`}
                      className="flex items-center gap-4 transition-all duration-500"
                    >
                      <div className="w-10 h-10 flex items-center justify-center text-xl font-bold">
                        {getMedal(
                          index
                        )}
                      </div>

                      <div className="flex-1">

                        <div className="flex items-center justify-between mb-1">

                          <span className="font-semibold text-navy">
                            {
                              item.colony
                            }
                          </span>

                          <span className="text-navy/60 text-sm">
                            {
                              item.count
                            }{' '}
                            {item.count ===
                            1
                              ? 'saviour'
                              : 'saviours'}
                          </span>
                        </div>

                        <div className="h-3 bg-cream-dark rounded-full overflow-hidden">

                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              index ===
                              0
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                                : index ===
                                  1
                                ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                                : index ===
                                  2
                                ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                                : 'bg-navy-light'
                            }`}
                            style={{
                              width: `${
                                (item.count /
                                  maxCount) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
