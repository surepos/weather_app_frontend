import React from 'react';
import ForecastBox from './ui/ForecastBox';
import { ForecastType } from '@/lib/types';
import Clock from '@/public/images/clock-4.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
type HourlyForecastProps = {
  data: ForecastType[];
};

function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <motion.div
      className="bg-dark-secondary border border-neutral-700 rounded-lg p-6 w-full mt-5"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}>
      <div className="text-gray-400 uppercase flex gap-2 items-center">
        <span>
          <Image src={Clock} alt="Clock" className="md:w-6 w-4" />
        </span>
        <p className="text-md md:text-xl">Hourly Forecast</p>
      </div>
      <div className="bg-gray-400 h-0.5 mt-4 rounded-full" />
      <div className="mt-4 flex w-full gap-1 md:gap-4">
        {data.map((weather: ForecastType, index: number) => (
          <div key={index} className="flex-1">
            <ForecastBox weather={weather} mode="hourly" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HourlyForecast;
