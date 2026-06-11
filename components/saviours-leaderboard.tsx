'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

import SaviourCard from '@/components/saviour-card';
import {
  fetchAllSavioursSorted,
  filterSaviours,
  getUniqueStationTypes,
  type Saviour,
} from '@/lib/saviours';

const PAGE_SIZE = 24;

export default function SavioursLeaderboard() {
  const [saviours, setSaviours] = useState<Saviour[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [stationType, setStationType] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchAllSavioursSorted();
        if (mounted) {
          setSaviours(data);
        }
      } catch (error) {
        console.error('Failed to fetch saviours:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const stationTypes = useMemo(
    () => getUniqueStationTypes(saviours),
    [saviours]
  );

  const filtered = useMemo(
    () =>
      filterSaviours(saviours, {
        query,
        stationType,
      }),
    [saviours, query, stationType]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query, stationType]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const rangeStart =
    filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40 pointer-events-none"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or area…"
            className="w-full pl-12 pr-4 py-3 bg-cream-dark border-2 border-transparent rounded-xl text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-navy-light transition-all"
            aria-label="Search saviours by name or area"
          />
        </div>

        <select
          value={stationType}
          onChange={(e) => setStationType(e.target.value)}
          className="w-full sm:w-auto sm:min-w-[200px] px-4 py-3 bg-cream-dark border-2 border-transparent rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-navy-light transition-all appearance-none cursor-pointer"
          aria-label="Filter by contribution type"
        >
          <option value="all">All contribution types</option>
          {stationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-cream-dark rounded-xl p-5 animate-pulse h-[120px]"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-cream-dark rounded-2xl">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="text-xl text-navy font-medium">No saviours found</p>
          <p className="text-navy/60 mt-2">
            {saviours.length === 0
              ? 'Founding Summer 2026 — Be among the first to join.'
              : 'Try a different search or filter.'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-navy/60 mb-4">
            Showing {rangeStart}–{rangeEnd} of {filtered.length} saviour
            {filtered.length === 1 ? '' : 's'}
            {filtered.length !== saviours.length &&
              ` (filtered from ${saviours.length})`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.map((saviour) => (
              <SaviourCard
                key={`${saviour.id}-${saviour.saviourNumber}`}
                saviour={saviour}
                dateStyle="calendar"
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
              aria-label="Saviours pagination"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-navy bg-cream-dark hover:bg-navy/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden />
                Previous
              </button>

              <span className="text-sm font-medium text-navy/70">
                Page {safePage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage >= totalPages}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-navy bg-cream-dark hover:bg-navy/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" aria-hidden />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
