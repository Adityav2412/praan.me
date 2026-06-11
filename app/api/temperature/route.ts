import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current=temperature_2m',
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      throw new Error(`Open-Meteo API returned ${res.status}`);
    }

    const data = await res.json();

    // Try new API format first, fall back to legacy
    const temp = data?.current?.temperature_2m ?? data?.current_weather?.temperature;

    if (temp === undefined || temp === null) {
      return NextResponse.json({ temperature: null, error: 'No temperature data' }, { status: 502 });
    }

    return NextResponse.json({ temperature: Math.round(temp) });
  } catch (error) {
    console.error('Temperature fetch failed:', error);
    return NextResponse.json({ temperature: null, error: 'Fetch failed' }, { status: 502 });
  }
}
