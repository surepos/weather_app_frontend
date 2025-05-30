import React from 'react';
import ForecastBox from './ui/ForecastBox';
import { ForecastType } from '@/lib/types';
import Image from 'next/image';
import DayIcon from '@/public/images/calendar-days.png';
import { motion } from 'framer-motion';
type DailyForecastProps = {
  data: ForecastType[];
};
function DailyForeCast({ data }: DailyForecastProps) {
  return (
    <motion.div
      className="bg-dark-secondary border border-neutral-700 rounded-lg p-6 w-full"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}>
      <div className="text-gray-400 uppercase items-center flex gap-2">
        <span>
          <Image src={DayIcon} alt="Day" className="md:w-6 w-4" />
        </span>
        <p className="text-md md:text-xl">5-Day Forecast</p>
      </div>
      <div className="bg-gray-400 h-0.5 mt-4 rounded-full" />
      <div className="mt-4 flex w-full gap-1 md:gap-4">
        {data.map((weather: ForecastType, index: number) => (
          <div key={index} className="flex-1">
            <ForecastBox weather={weather} mode="daily" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default DailyForeCast;
