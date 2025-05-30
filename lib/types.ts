export type ForecastType = {
    day: string;
    temperature: number; 
    low: number;
    high: number; 
    feelslike: number; 
    description: string; 
    time: string;
    wind:number;
    humidity:number; 
    image:string;
    date: string;
  };
  
  

  export type WeatherData = {
    time: string;
    day: string;
    temperature: number;
    description: string;
    high: number;
    low: number;
    humidity: number;
    wind: number;
    feelslike: number;
    image:string;
    date: string;
  };
  

  export type ForecastGroup = {
    city: CityData;
    hourly: WeatherData[];
    daily: WeatherData[];
  };
  

  export type CityData = {
    _id?: string;
    name: string;
    country: string;
    lat: number;
    lng: number;
    temperature?: number;
  };