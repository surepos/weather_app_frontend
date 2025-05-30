/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return new NextResponse("Missing latitude or longitude", { status: 400 });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`,
    );

    if (!response.ok) {
      const text = await response.text();
      return new NextResponse(`OpenWeatherMap error: ${text}`, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API route error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
