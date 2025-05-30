/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CitiesDisplay from '@/components/CitiesDisplay';
import DailyForeCast from '@/components/DailyForeCast';
import HourlyForecast from '@/components/HourlyForecast';
import PlusWeatherInfo from '@/components/PlusWeatherInfo';
import Search from '@/components/Search';
import SearchedCityData from '@/components/SearchedCityData';
import { CityData, ForecastGroup, WeatherData } from '@/lib/types';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import loader from '@/public/json/loading.json';
import Player from '@/components/ui/LotttiePlayer';
import Profile from '@/components/Profile';

const defaultCity: CityData = {
  name: 'London',
  country: 'United Kingdom',
  lat: 51.5074,
  lng: -0.1278,
};

export default function Home() {
  const [hourlyForecast, setHourlyForecast] = useState<WeatherData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<WeatherData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [citiesForecast, setCitiesForecast] = useState<ForecastGroup[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityData>(defaultCity);
  const [loading, setLoading] = useState<boolean>(true);

  const transformWeatherData = (
    list: any[]
  ): { hourly: WeatherData[]; daily: WeatherData[] } => {
    const hourly = list.slice(0, 6).map((item: any) => ({
      time: dayjs(item.dt_txt).format('HH:mm'),
      day: dayjs(item.dt_txt).format('ddd'),
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      high: Math.round(item.main.temp_max),
      low: Math.round(item.main.temp_min),
      humidity: item.main.humidity,
      wind: item.wind.speed,
      feelslike: item.main.feels_like,
      image: item.weather[0].icon,
      date: item.dt_txt,
    }));

    const dailyMap = new Map<string, WeatherData>();
    list.forEach((item: any) => {
      const day = dayjs(item.dt_txt).format('YYYY-MM-DD');
      if (!dailyMap.has(day)) {
        dailyMap.set(day, {
          time: dayjs(item.dt_txt).format('HH:mm'),
          day: dayjs(item.dt_txt).format('ddd'),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          humidity: item.main.humidity,
          wind: item.wind.speed,
          feelslike: item.main.feels_like,
          image: item.weather[0].icon,
          date: item.dt_txt,
        });
      }
    });

    const daily = Array.from(dailyMap.values()).slice(0, 6);
    return { hourly, daily };
  };

  const fetchForecast = async (
    city: CityData
  ): Promise<ForecastGroup | undefined> => {
    if (!city) return;
    try {
      const res = await fetch(`/api/forecast?lat=${city.lat}&lon=${city.lng}`);
      const data = await res.json();
      const { hourly, daily } = transformWeatherData(data.list);
      return { city, hourly, daily };
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await fetch('https://weather-app-backend-ddvj.onrender.com/');
      const data: CityData[] = await res.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const loadAllCitiesForecast = async (cities: CityData[]) => {
    const results: ForecastGroup[] = [];
    await Promise.all(
      cities.map(async (city) => {
        const forecast = await fetchForecast(city);
        if (forecast) results.push(forecast);
      })
    );
    setCitiesForecast(results);
  };

  const loadSelectedCityForecast = async (city: CityData) => {
    const existing = citiesForecast.find(
      (group) =>
        group.city.name === city.name &&
        group.city.lat === city.lat &&
        group.city.lng === city.lng
    );

    if (existing) {
      setHourlyForecast(existing.hourly);
      setDailyForecast(existing.daily);
      return existing;
    }

    const forecast = await fetchForecast(city);
    if (forecast) {
      setHourlyForecast(forecast.hourly);
      setDailyForecast(forecast.daily);
      return forecast;
    }
    return null;
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (cities.length > 0) loadAllCitiesForecast(cities);
  }, [cities]);

  useEffect(() => {
    loadSelectedCityForecast(selectedCity);
  }, [selectedCity]);

  setTimeout(() => setLoading(false), 2000);

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto py-10 flex flex-col items-center justify-center">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Player autoplay loop src={loader}></Player>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-8 w-full">
            <div className="col-span-2 flex flex-col gap-4">
              <Search onSelectCity={setSelectedCity} />
              <SearchedCityData
                city={selectedCity}
                todayWeather={hourlyForecast[0]}
                data={{ hourly: hourlyForecast, daily: dailyForecast }} 
              />
              <PlusWeatherInfo todayWeather={hourlyForecast[0]} />
            </div>
            <div className="col-span-3 gap-8 flex flex-col">
              <HourlyForecast
                data={[
                  { ...hourlyForecast[0], time: 'Now' },
                  ...hourlyForecast.slice(1),
                ]}
              />
              <DailyForeCast
                data={[
                  { ...dailyForecast[0], day: 'Today' },
                  ...dailyForecast.slice(1),
                ]}
              />
            </div>
          </div>
          <CitiesDisplay
            onSelectCity={setSelectedCity}
            weatherData={citiesForecast}
            setWeatherData={setCitiesForecast}
            loadSelectedCityForecast={loadSelectedCityForecast}
          />
          <Profile/>
        </>
        
      )}
    </main>
  );
}
