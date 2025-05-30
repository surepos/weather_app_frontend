import React from 'react';
import sample from '@/public/images/11d.png';
import { ForecastType } from '@/lib/types';
import Image from 'next/image';
import { weatherImages } from '@/lib/weatherImages';

type ForecastBoxProps = {
  weather: ForecastType;
  mode: 'hourly' | 'daily';
};

function ForecastBox({ weather, mode }: ForecastBoxProps) {
  const displayTime = mode === 'daily' ? weather.day : weather.time;
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg px-2 md:px-4 md:py-3 py-1 md:gap-2 gap-1 w-full ${
        displayTime === 'Now' ? 'bg-blue-primary' : ''
      } ${displayTime === 'Today' ? 'bg-blue-primary' : ''}`}>
      <p className="text-white text-[11px] md:text-xl">{displayTime}</p>
      <p className="text-white text-[12px] md:text-3xl">
        {weather.temperature}°
      </p>
      <Image
        src={weatherImages[weather.image] ?? sample}
        alt={weather.image ? `Weather icon: ${weather.image}` : 'Weather icon'}
        className="w-6 md:w-14"
      />
    </div>
  );
}

export default ForecastBox;
