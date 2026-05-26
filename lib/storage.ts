const STORAGE_KEY = 'water-for-wings-saviours';

export interface Saviour {
  id: string;
  timestamp: string;
  name: string;
  stationType: string;
  colony: string;
  source: string;
  saviourNumber: number;
}

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbw-e7Emeb0SbS58XDJYLa60g6DS6YXsMGJ69VgH00HupqsJRFKryKZxoH2o1QBc3aI/exec';

// FETCH LIVE DATA FROM GOOGLE SHEET
export async function fetchSaviours(): Promise<Saviour[]> {
  try {
    const response = await fetch(
      SHEET_URL,
      {
        cache: 'no-store',
      }
    );

    const data =
      await response.json();

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error(
      'Error fetching saviours:',
      error
    );

    return [];
  }
}

// OLD LOCAL STORAGE GETTER
export function getSaviours(): Saviour[] {
  if (
    typeof window ===
    'undefined'
  ) {
    return [];
  }

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );

  return saved
    ? JSON.parse(saved)
    : [];
}

// ADD SAVIOUR LOCALLY
export function addSaviour(
  saviour: Omit<
    Saviour,
    | 'id'
    | 'timestamp'
    | 'saviourNumber'
  >
): Saviour {
  const existing =
    getSaviours();

  const newSaviour: Saviour =
    {
      ...saviour,
      id: Date.now().toString(),
      timestamp:
        new Date().toISOString(),
      saviourNumber:
        existing.length + 1,
    };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      ...existing,
      newSaviour,
    ])
  );

  return newSaviour;
}

// TOTAL COUNT
export function getSaviourCount(): number {
  return getSaviours().length;
}

// LEADERBOARD
export function getColonyLeaderboard() {
  const saviours =
    getSaviours();

  const colonyMap:
    Record<string, number> =
    {};

  saviours.forEach(
    (saviour) => {
      const colony =
        saviour.colony.trim();

      if (!colony) return;

      colonyMap[colony] =
        (colonyMap[colony] ||
          0) + 1;
    }
  );

  return Object.entries(
    colonyMap
  )
    .map(([colony, count]) => ({
      colony,
      count,
    }))
    .sort(
      (a, b) =>
        b.count - a.count
    );
}

// TIME AGO FORMAT
export function formatTimeAgo(
  timestamp: string
): string {
  const now = new Date();

  const date =
    new Date(timestamp);

  const seconds = Math.floor(
    (now.getTime() -
      date.getTime()) /
      1000
  );

  const intervals = [
    {
      label: 'year',
      seconds: 31536000,
    },
    {
      label: 'month',
      seconds: 2592000,
    },
    {
      label: 'day',
      seconds: 86400,
    },
    {
      label: 'hour',
      seconds: 3600,
    },
    {
      label: 'min',
      seconds: 60,
    },
  ];

  for (const interval of intervals) {
    const count = Math.floor(
      seconds /
        interval.seconds
    );

    if (count >= 1) {
      return `${count} ${interval.label}${
        count > 1 ? 's' : ''
      } ago`;
    }
  }

  return 'Just now';
}

// CLEAR OLD LOCAL CACHE
export function clearLocalSaviours() {
  if (
    typeof window ===
    'undefined'
  )
    return;

  localStorage.removeItem(
    STORAGE_KEY
  );
}
