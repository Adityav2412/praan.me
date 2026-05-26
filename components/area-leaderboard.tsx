'use client';
import { useState, useEffect } from 'react';
import { fetchSaviours, getColonyLeaderboard } from '@/lib/storage';

const placeholderColonies = [
  { colony: 'Rohini', count: 0 },
  { colony: 'Dwarka', count: 0 },
  { colony: 'Vasant Kunj', count: 0 },
  { colony: 'Saket', count: 0 },
  { colony: 'Greater Kailash', count: 0 },
];

export default function AreaLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<{ colony: string; count: number }[]>([]);

  useEffect(() => {
    const updateLeaderboard = async () => {
      await fetchSaviours();
      const data = getColonyLeaderboard();
      setLeaderboard(data.length > 0 ? data : placeholderColonies);
    };
    updateLeaderboard();
    const interval = setInterval(updateLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const maxCount = Math.max(...leaderboard.map(l => l.count), 1);

  const getMedal = (rank: number) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `${rank + 1}`;
  };

  return (
    <section id="leaderboard" className="py-16 px-4 bg-cream-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-navy text-center mb-2">
          Delhi Colony Leaderboard 🏆
        </h2>
        <p className="text-navy/70 text-center mb-10">
          Which colony is saving the most birds?
        </p>
        <div className="bg-cream rounded-2xl p-6 shadow-lg">
          <div className="space-y-4">
            {leaderboard.slice(0, 10).map((item, index) => (
              <div
                key={item.colony}
                className="flex items-center gap-4 transition-all duration-500"
              >
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold">
                  {getMedal(index)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-navy">{item.colony}</span>
                    <span className="text-navy/60 text-sm">
                      {item.count} {item.count === 1 ? 'saviour' : 'saviours'}
                    </span>
                  </div>
                  <div className="h-3 bg-cream-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                          : index === 1
                          ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                          : index === 2
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                          : 'bg-navy-light'
                      }`}
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {leaderboard === placeholderColonies && (
            <p className="text-center text-navy/50 mt-6 text-sm">
              Be the first from your colony to join!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
