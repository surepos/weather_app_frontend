'use client';
import Citybox from './ui/Citybox';
import AddCity from './ui/AddCity';
import { CityData, ForecastGroup } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onSelectCity: (data: CityData) => void;
  weatherData: ForecastGroup[];
  setWeatherData: React.Dispatch<React.SetStateAction<ForecastGroup[]>>;
  loadSelectedCityForecast: (city: CityData) => void;
};

function CitiesDisplay({
  onSelectCity,
  weatherData,
  setWeatherData,
  loadSelectedCityForecast,
}: Props) {
  const handleAddCity = async (newCity: CityData) => {
    const forecast = await loadSelectedCityForecast(newCity);
    if (forecast != null) {
      setWeatherData((prev) => [...prev, forecast]);
    }
  };

  const handleDeleteCity = (id: string) => {
    setWeatherData((prev) =>
      prev.filter((forecast) => forecast.city._id !== id)
    );
  };

  return (
    <div className="mt-10 overflow-x-auto hide-scrollbar pt-6 pb-2 self-start">
      <div className="flex gap-8 w-max">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}>
          <AddCity onAddCity={handleAddCity} onSelect={onSelectCity} />
        </motion.div>

        <AnimatePresence>
          {weatherData.map(({ city, hourly }) => (
            <motion.div
              key={city._id}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              <Citybox
                city={city}
                onDelete={handleDeleteCity}
                onSelect={onSelectCity}
                hourly={hourly?.[0]}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CitiesDisplay;
