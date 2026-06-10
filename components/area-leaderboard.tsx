'use client';

import { useState, useEffect } from 'react';
import { fetchSaviours, getColonyLeaderboard } from '@/lib/storage';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

type FilterType = 'top5' | 'top10' | 'all';

export default function AreaLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<{ colony: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('top10');
  const [fadeIn, setFadeIn] = useState(true);
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    let mounted = true;

    const updateLeaderboard = async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);
        await fetchSaviours();
        const data = getColonyLeaderboard();
        const cleanData = data.filter((item) => item.colony && item.count > 0);
        const sorted = cleanData.sort((a, b) => b.count - a.count);
        if (mounted) setLeaderboard(sorted);
      } catch (error) {
        console.error('Leaderboard fetch failed:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    updateLeaderboard(true);
    const interval = setInterval(() => updateLeaderboard(false), 4000);
    const handleFocus = () => updateLeaderboard(false);
    window.addEventListener('focus', handleFocus);

    return () => {
      mounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filter) return;
    setFadeIn(false);
    setTimeout(() => {
      setFilter(newFilter);
      setFadeIn(true);
    }, 150);
  };

  const getFilteredData = () => {
    if (filter === 'top5') return leaderboard.slice(0, 5);
    if (filter === 'top10') return leaderboard.slice(0, 10);
    return leaderboard;
  };

  const filteredData = getFilteredData();
  const maxCount = Math.max(...leaderboard.map((l) => l.count), 1);

  const getMedal = (rank: number) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `${rank + 1}`;
  };

  return (
    <section id="leaderboard" className="py-20 lg:py-28 px-6 bg-bg-base">
      <div
        ref={sectionRef}
        className={`max-w-4xl mx-auto ${hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''}`}
      >
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Leaderboard
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Delhi Colony Leaderboard
          </h2>
          <p className="text-base text-text-muted">
            Which colony is saving the most birds?
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {(['top5', 'top10', 'all'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-[#1A1A18] text-white'
                  : 'bg-transparent text-[#1A1A18] border border-[#1A1A18]/20 hover:border-[#1A1A18]/50'
              }`}
            >
              {f === 'top5' ? 'Top 5' : f === 'top10' ? 'Top 10' : 'All'}
            </button>
          ))}
        </div>

        <div className="bg-bg-card rounded-2xl border border-[var(--border)] p-6 sm:p-8 shadow-sm">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-28 bg-bg-surface rounded" />
                    <div className="h-4 w-16 bg-bg-surface rounded" />
                  </div>
                  <div className="h-3 bg-bg-surface rounded-full" />
                </div>
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <p className="text-center text-text-muted py-8 text-sm">
              Be the first from your colony to join!
            </p>
          ) : (
            <div
              className="space-y-3 transition-opacity duration-300"
              style={{ opacity: fadeIn ? 1 : 0 }}
            >
              {filteredData.map((item, index) => (
                <div
                  key={`${item.colony}-${item.count}`}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 cursor-default border-l-[3px] border-l-transparent hover:bg-[#F2EEE6] hover:border-l-[#5C7A5A] ${
                    index < 3 ? 'hover:shadow-[0_0_12px_rgba(201,168,76,0.3)]' : ''
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center text-xl font-bold shrink-0">
                    {getMedal(index)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-text-primary text-sm">
                        {item.colony}
                      </span>
                      <span className="text-text-muted text-xs">
                        {item.count} {item.count === 1 ? 'saviour' : 'saviours'}
                      </span>
                    </div>

                    <div className="h-2.5 bg-bg-surface rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          index === 0
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                            : index === 1
                            ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                            : index === 2
                            ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                            : 'bg-accent/60'
                        }`}
                        style={{
                          width: isVisible ? `${(item.count / maxCount) * 100}%` : '0%',
                          transition: `width 800ms ease-out ${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
