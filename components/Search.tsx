'use client';

import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { CityData } from '@/lib/types';
import { motion } from 'framer-motion';

type Props = {
  onSelectCity: (data: CityData) => void;
};

export default function SearchTwo({ onSelectCity }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<google.maps.places.SearchBox | null>(
    null
  ) as React.MutableRefObject<google.maps.places.SearchBox | null>;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API as string,
    libraries: ['places'],
  });

  const handleOnPlacesChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        const countryComponent = place.address_components?.find((component) =>
          component.types.includes('country')
        );
        const country = countryComponent?.long_name || 'Unknown';
        setQuery(`${place.name}, ${country}`);

        onSelectCity({
          name: place.name!,
          country: country!,
          lat: lat!,
          lng: lng!,
        });
      }
    }
  };

  return (
    <motion.div
      className="relative w-full mt-5"
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}>
      {isLoaded && (
        <>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search color="#fff" className="w-6 h-6" />
          </div>

          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handleOnPlacesChanged}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city"
              className="w-full pl-12 py-2 bg-dark-secondary border border-neutral-700 focus:border-neutral-500 rounded-lg shadow-sm focus:outline-none text-white placeholder-[#fff] text-[14px]"
            />
          </StandaloneSearchBox>
        </>
      )}
    </motion.div>
  );
}
