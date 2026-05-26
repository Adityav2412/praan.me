export interface Saviour {
  id: string;
  name: string;
  colony: string;
  source: string;
  stationType: string;
  timestamp: number;
  saviourNumber: number;
}

const STORAGE_KEY = 'waterforwings_saviours';

export function getSaviours(): Saviour[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addSaviour(saviour: Omit<Saviour, 'id' | 'timestamp' | 'saviourNumber'>): Saviour {
  const saviours = getSaviours();
  const newSaviour: Saviour = {
    ...saviour,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    saviourNumber: saviours.length + 1,
  };
  saviours.push(newSaviour);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saviours));
  return newSaviour;
}

export function getSaviourCount(): number {
  return getSaviours().length;
}

export function getColonyLeaderboard(): { colony: string; count: number }[] {
  const saviours = getSaviours();
  const colonyCounts: Record<string, number> = {};
  
  saviours.forEach(s => {
    colonyCounts[s.colony] = (colonyCounts[s.colony] || 0) + 1;
  });
  
  return Object.entries(colonyCounts)
    .map(([colony, count]) => ({ colony, count }))
    .sort((a, b) => b.count - a.count);
}

export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
