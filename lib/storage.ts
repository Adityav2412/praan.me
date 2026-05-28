export interface Saviour {
id: string;
timestamp: string;
name: string;
stationType: string;
colony?: string;
area?: string;
source: string;
saviourNumber: number;
}

const SHEET_URL =
'https://script.google.com/macros/s/AKfycbw-e7Emeb0SbS58XDJYLa60g6DS6YXsMGJ69VgH00HupqsJRFKryKZxoH2o1QBc3aI/exec';

let savioursCache: Saviour[] = [];

let lastFetchTime = 0;

export async function fetchSaviours(): Promise<Saviour[]> {
try {
const now = Date.now();

```
if (
  savioursCache.length > 0 &&
  now - lastFetchTime < 3000
) {
  return savioursCache;
}

const response = await fetch(
  SHEET_URL,
  {
    cache: 'no-store',
  }
);

const data = await response.json();

if (Array.isArray(data)) {
  const cleanData = data
    .filter(
      (saviour) =>
        saviour?.name &&
        (
          saviour?.colony ||
          saviour?.area
        ) &&
        saviour?.timestamp
    )
    .map(
      (saviour, index) => ({
        ...saviour,

        colony:
          saviour.colony ||
          saviour.area ||
          'Other',

        saviourNumber:
          saviour.saviourNumber ||
          index + 1,
      })
    );

  savioursCache = cleanData;

  lastFetchTime = now;

  return cleanData;
}

return savioursCache;
```

} catch (error) {
console.error(
'Error fetching saviours:',
error
);

```
return savioursCache;
```

}
}

export function getSaviours(): Saviour[] {
return savioursCache;
}

export function getSaviourCount(): number {
return savioursCache.length;
}

export function getColonyLeaderboard() {
const colonyMap: Record<
string,
number

> = {};

savioursCache.forEach(
(saviour) => {
const colony = (
saviour.colony ||
saviour.area ||
'Other'
).trim();

```
  if (
    !colony ||
    colony === 'Not specified'
  ) {
    return;
  }

  colonyMap[colony] =
    (colonyMap[colony] || 0) + 1;
}
```

);

return Object.entries(
colonyMap
)
.map(
([colony, count]) => ({
colony,
count,
})
)
.sort(
(a, b) =>
b.count - a.count
);
}

export function formatTimeAgo(
timestamp: string
): string {
const now = new Date();

const date = new Date(
timestamp
);

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
seconds / interval.seconds
);

```
if (count >= 1) {
  return `${count} ${interval.label}${
    count > 1
      ? 's'
      : ''
  } ago`;
}
```

}

return 'Just now';
}

export async function refreshSaviours() {
lastFetchTime = 0;

return await fetchSaviours();
}
