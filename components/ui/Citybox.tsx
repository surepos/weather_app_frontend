import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import sample from '@/public/images/11d.png';
import { CityData, WeatherData } from '@/lib/types';

interface Props {
  city: CityData;
  onDelete: (id: string) => void;
  onSelect: (data: CityData) => void;
  hourly: WeatherData;
}

function Citybox({ city, onDelete, onSelect, hourly }: Props) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await fetch(
        `https://weather-app-backend-ddvj.onrender.com/${city._id}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        throw new Error('Failed to delete city');
      }

      if (city._id) {
        onDelete(city._id);
      } else {
        console.warn("City ID is undefined, can't delete.");
      }
    } catch (error) {
      console.error('Error deleting city:', error);
      alert('Failed to delete city. Please try again.');
    }
  };

  return (
    <div
      className="text-white h-40 w-34 md:h-60 md:w-48 bg-dark-secondary py-0 md:py-4 md:px-8 px-6 rounded-lg border border-neutral-700 flex flex-col items-center justify-center gap-4 md:gap-6 relative cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-101"
      onClick={() =>
        onSelect({
          name: city.name!,
          country: city.country!,
          lat: city.lat!,
          lng: city.lng!,
        })
      }>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <p className="text-xl md:text-3xl font-semibold">{city.name}</p>
          <p className="text-[10px] md:text-sm font-extralight">
            {city.country}
          </p>
        </div>
        <div className="text-2xl md:text-5xl font-semibold">
          {hourly?.temperature}°
        </div>
        <div className="absolute bg-blue-primary p-2 rounded-full -top-6">
          <Image src={sample} alt="sample" className="md:w-8 md:h-8 h-6 w-6" />
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="absolute bottom-2 right-2 p-2 rounded-full transition bg-neutral-700 z-10">
        <Trash2
          size={16}
          style={{ cursor: 'pointer' }}
          className="hover:text-red-400"
        />
      </button>
    </div>
  );
}

export default Citybox;
