import React, { useState } from 'react';
import Plus from '@/public/images/plus.png';
import Image from 'next/image';
import SearchTwo from '../Search';
import { CityData } from '@/lib/types';

interface AddCityProps {
  onAddCity: (city: CityData) => void;
  onSelect: (city: CityData) => void;
}
function AddCity({ onAddCity, onSelect }: AddCityProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityData>({
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
  });

  const handleSubmit = async () => {

    try {
      const res = await fetch(
        'https://weather-app-backend-ddvj.onrender.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: selectedCity.name,
            country: selectedCity.country,
            lat: selectedCity.lat,
            lng: selectedCity.lng,
          }),
        }
      );

      if (!res.ok) throw new Error('Failed to add city');
      const newCity: CityData = await res.json();
      onAddCity(newCity);
      onSelect({
        name: newCity.name!,
        country: newCity.country!,
        lat: newCity.lat!,
        lng: newCity.lng!,
      });
      setShowSearchBar(false);
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  const handleClick = () => {
    setShowSearchBar(true);
  };

  const handleCloseSearch = () => {
    setShowSearchBar(false);
  };

  return (
    <div>
      <div
        className="text-white h-40 w-34 md:h-60 md:w-48 py-0 md:py-4 md:px-7 px-6 rounded-lg border border-dashed border-neutral-700 flex flex-col items-center justify-center gap-6 relative cursor-pointer"
        onClick={handleClick}>
        <div className="text-center pt-4">
          <p className="text-md md:text-2xl font-semibold">
            World <br />
            ForeCast
          </p>
        </div>
        <div className="text-[10px] md:text-lg font-light text-center text-gray-400">
          Add the city you need
        </div>
        <div className="absolute bg-blue-primary p-2 rounded-full -top-6">
          <Image src={Plus} alt="Plus" className="md:w-8 md:h-8 h-6 w-6" />
        </div>
      </div>

      {showSearchBar && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-md z-10"
            onClick={handleCloseSearch}
          />

          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="relative bg-dark-secondary p-6 rounded-lg md:min-w-xl w-96 text-white border border-neutral-700">
              <SearchTwo onSelectCity={setSelectedCity} />
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer">
                  Add
                </button>

                <button
                  onClick={handleCloseSearch}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddCity;
