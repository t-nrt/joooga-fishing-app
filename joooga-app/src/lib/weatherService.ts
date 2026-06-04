// src/lib/weatherService.ts
import { WeatherData } from './types';

// Mock weather data for development - replace with 海天気.jp API in production
export const getMockWeatherData = (): WeatherData => {
  return {
    temperature: 18,
    windDirection: 0, // North wind
    windSpeed: 3.2,
    waveHeight: 0.8,
    seaTemperature: 17.5,
    tide: 'middle',
    timestamp: new Date().toISOString()
  };
};

export const fetchCurrentWeather = async (): Promise<WeatherData> => {
  // For Phase 1, return mock data
  // TODO: Implement 海天気.jp API integration in Phase 2
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getMockWeatherData());
    }, 500);
  });
};

export const formatWindDirection = (degrees: number): string => {
  const directions = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const getWindCondition = (speed: number): string => {
  if (speed <= 3) return '好条件';
  if (speed <= 5) return '普通';
  if (speed <= 8) return 'やや強い';
  return '強風';
};
