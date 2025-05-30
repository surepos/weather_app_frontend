import { ForecastType } from '@/lib/types';
import { motion } from 'framer-motion';
import { ThermometerSun, Wind } from 'lucide-react';
import React from 'react';

type Props = {
  todayWeather: ForecastType | null | undefined;
};

function PlusWeatherInfo({ todayWeather }: Props) {
  const wind = todayWeather?.wind ?? 4.5;
  const humidity = todayWeather?.humidity ?? 54;
  const weatherInfo = [
    {
      label: 'Wind',
      value: `${wind} MPH`,
      icon: <Wind color="#99a1af" size={22} />,
    },
    {
      label: 'Humidity',
      value: `${humidity} %`,
      icon: <ThermometerSun color="#99a1af" size={22} />,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 gap-8 mt-1 text-white"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}>
      {weatherInfo.map((info, index) => (
        <div
          key={index}
          className="bg-dark-secondary border border-neutral-700 rounded-lg p-4 flex flex-col items-start justify-start">
          <div className="flex items-center justify-center gap-2 mb-5">
            {info.icon}
            <p className="text-md md:text-lg text-gray-400 uppercase">
              {info.label}
            </p>
          </div>

          <p className="text-2xl md:text-3xl font-semibold">{info.value}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default PlusWeatherInfo;
