import {
  fetchSaviours,
  formatTimeAgo,
  type Saviour,
} from '@/lib/storage';

export function isValidSaviour(saviour: Saviour): boolean {
  return Boolean(
    saviour.name &&
      saviour.colony &&
      saviour.timestamp &&
      saviour.saviourNumber
  );
}

/** Newest saviour numbers first */
export function sortSavioursNewestFirst(saviours: Saviour[]): Saviour[] {
  return [...saviours]
    .filter(isValidSaviour)
    .sort((a, b) => b.saviourNumber - a.saviourNumber);
}

export function formatSaviourDate(timestamp: string): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export async function fetchLatestSaviours(
  limit = 9
): Promise<Saviour[]> {
  const data = await fetchSaviours();
  return sortSavioursNewestFirst(data).slice(0, limit);
}

export async function fetchAllSavioursSorted(): Promise<Saviour[]> {
  const data = await fetchSaviours();
  return sortSavioursNewestFirst(data);
}

export function getUniqueStationTypes(saviours: Saviour[]): string[] {
  const types = new Set<string>();
  for (const saviour of saviours) {
    if (saviour.stationType?.trim()) {
      types.add(saviour.stationType.trim());
    }
  }
  return [...types].sort((a, b) => a.localeCompare(b));
}

export function filterSaviours(
  saviours: Saviour[],
  {
    query = '',
    stationType = 'all',
  }: {
    query?: string;
    stationType?: string;
  }
): Saviour[] {
  const normalizedQuery = query.trim().toLowerCase();

  return saviours.filter((saviour) => {
    if (
      stationType !== 'all' &&
      saviour.stationType !== stationType
    ) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const name = saviour.name.toLowerCase();
    const area = (saviour.colony ?? '').toLowerCase();

    return (
      name.includes(normalizedQuery) ||
      area.includes(normalizedQuery)
    );
  });
}

export { formatTimeAgo };
export type { Saviour } from '@/lib/storage';
