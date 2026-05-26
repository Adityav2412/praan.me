export interface Saviour {
  id: string;
  name: string;
  colony: string;
  source: string;
  stationType: string;
  timestamp: number;
  saviourNumber: number;
}

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw-e7Emeb0SbS58XDJYLa60g6DS6YXsMGJ69VgH00HupqsJRFKryKZxoH2o1QBc3aI/exec';
const STORAGE_KEY = 'waterforwings_saviours';

function getLocal(): Saviour[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLocal(saviours: Saviour[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saviours));
}

export async function fetchSaviours(): Promise<Saviour[]> {
  try {
    const res = await fetch(SHEET_URL);
    const data = await res.json();
    saveLocal(data);
    return data;
  } catch {
    return getLocal();
  }
}

export function getSaviours(): Saviour[] {
  return getLocal();
}

export function addSaviour(
  saviour: Omit<Saviour, 'id' | 'timestamp' | 'saviourNumber'>
): Saviour {
  const saviours = getLocal();
  const newSaviour: Saviour = {
    ...saviour,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    saviourNumber: saviours.length + 1,
  };
  saviours.push(newSaviour);
  saveLocal(saviours);
  return newSaviour;
}

export function getSaviourCount(): number {
  return getLocal().length;
}

export function getColonyLeaderboard(): { colony: string; count: number }[] {
  const saviours = getLocal();
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
