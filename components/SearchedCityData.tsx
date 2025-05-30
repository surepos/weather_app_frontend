/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { MapPin } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import sample from '@/public/images/11d.png';
import { CityData, ForecastType } from '@/lib/types';
import { weatherImages } from '@/lib/weatherImages';
import download from '@/public/images/download.png';
import { motion } from 'framer-motion';

type Props = {
  city: CityData;
  todayWeather: ForecastType;
  data: {
    hourly: ForecastType[];
    daily: ForecastType[];
  };
};

function SearchedCityData({ city, todayWeather, data }: Props) {
  const downloadWeatherInfo = () => {
    const weatherInfo = {
      city,
      todayWeather,
      forecast: {
        hourly: data.hourly,
        daily: data.daily,
      },
    };

    const blob = new Blob([JSON.stringify(weatherInfo, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${city.name}_weather.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!todayWeather) {
    return null;
  }

  let dayOfWeek: string;

  switch (todayWeather.day.toLowerCase()) {
    case 'mon':
      dayOfWeek = 'Monday';
      break;
    case 'tue':
      dayOfWeek = 'Tuesday';
      break;
    case 'wed':
      dayOfWeek = 'Wednesday';
      break;
    case 'thu':
      dayOfWeek = 'Thursday';
      break;
    case 'fri':
      dayOfWeek = 'Friday';
      break;
    case 'sat':
      dayOfWeek = 'Saturday';
      break;
    case 'sun':
      dayOfWeek = 'Sunday';
      break;
    default:
      dayOfWeek = 'Invalid day';
  }
  return (
    <motion.div
      className="pt-12 pb-5 px-8 border rounded-lg flex 
        justify-between bg-dark-secondary border-neutral-700 text-white"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}>
      <div className="">
        <p className="px-2 py-1 font-bold flex gap-1 items-center bg-blue-primary w-fit rounded-lg text-lg">
          <span>
            <MapPin size={20} />
          </span>
          <span>{city?.name}</span>
        </p>
        <p className="flex flex-col justify-start items-start mt-8">
          <span className="font-medium text-3xl md:text-4xl">{dayOfWeek}</span>
          <span className="text-[10px] md:text-lg pt-2">
            {new Date(todayWeather.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </p>

        <p className="pt-10 pb-2 text-7xl md:text-8xl font-bold self-center">
          {todayWeather.temperature}°
        </p>
        <div>
          <p className="flex items-center gap-2 text-[12px] md:text-[14px]">
            <span>Low: {todayWeather.low}°</span>
            <span>High: {todayWeather.high}°</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-baseline items-center gap-4">
        <div
          className="hover:scale-105 cursor-pointer w-10 md:w-12 "
          onClick={downloadWeatherInfo}>
          <Image src={download} alt="download" />
        </div>

        <div>
          <Image
            src={weatherImages[todayWeather.image] ?? sample}
            alt={
              todayWeather.image
                ? `Weather icon: ${todayWeather.image}`
                : 'Weather icon'
            }
            className="md:w-36 md:h-36 w-30"
          />
        </div>
        <div>
          <p className="text-end text-[14px] md:text-lg capitalize">
            {todayWeather.description}
          </p>
          <p className="text-end text-[14px] md:text-lg">
            Feels Like {todayWeather.feelslike.toFixed(1)}°
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchedCityData;
