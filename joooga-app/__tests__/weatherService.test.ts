// __tests__/weatherService.test.ts
import { formatWindDirection, getWindCondition, getMockWeatherData, fetchCurrentWeather } from '../src/lib/weatherService';

describe('Weather Service', () => {
  describe('formatWindDirection', () => {
    it('should format cardinal directions correctly', () => {
      expect(formatWindDirection(0)).toBe('北');
      expect(formatWindDirection(90)).toBe('東');
      expect(formatWindDirection(180)).toBe('南');
      expect(formatWindDirection(270)).toBe('西');
      expect(formatWindDirection(360)).toBe('北');
    });

    it('should format intermediate directions correctly', () => {
      expect(formatWindDirection(45)).toBe('北東');
      expect(formatWindDirection(135)).toBe('南東');
      expect(formatWindDirection(225)).toBe('南西');
      expect(formatWindDirection(315)).toBe('北西');
    });

    it('should handle edge cases and rounding', () => {
      expect(formatWindDirection(22)).toBe('北');
      expect(formatWindDirection(23)).toBe('北東');
      expect(formatWindDirection(67)).toBe('北東');
      expect(formatWindDirection(68)).toBe('東');
    });

    it('should handle negative angles correctly', () => {
      expect(formatWindDirection(-45)).toBe('北西');
      expect(formatWindDirection(-90)).toBe('西');
    });
  });

  describe('getWindCondition', () => {
    it('should categorize wind conditions correctly', () => {
      expect(getWindCondition(1)).toBe('好条件');
      expect(getWindCondition(3)).toBe('好条件');
      expect(getWindCondition(4)).toBe('普通');
      expect(getWindCondition(5)).toBe('普通');
      expect(getWindCondition(6)).toBe('やや強い');
      expect(getWindCondition(8)).toBe('やや強い');
      expect(getWindCondition(9)).toBe('強風');
      expect(getWindCondition(15)).toBe('強風');
    });

    it('should handle boundary values', () => {
      expect(getWindCondition(3.0)).toBe('好条件');
      expect(getWindCondition(3.1)).toBe('普通');
      expect(getWindCondition(5.0)).toBe('普通');
      expect(getWindCondition(5.1)).toBe('やや強い');
      expect(getWindCondition(8.0)).toBe('やや強い');
      expect(getWindCondition(8.1)).toBe('強風');
    });
  });

  describe('getMockWeatherData', () => {
    it('should return valid weather data structure', () => {
      const data = getMockWeatherData();

      expect(data).toHaveProperty('temperature');
      expect(data).toHaveProperty('windDirection');
      expect(data).toHaveProperty('windSpeed');
      expect(data).toHaveProperty('waveHeight');
      expect(data).toHaveProperty('seaTemperature');
      expect(data).toHaveProperty('tide');
      expect(data).toHaveProperty('timestamp');

      expect(typeof data.temperature).toBe('number');
      expect(typeof data.windDirection).toBe('number');
      expect(typeof data.windSpeed).toBe('number');
      expect(typeof data.waveHeight).toBe('number');
      expect(typeof data.seaTemperature).toBe('number');
      expect(typeof data.tide).toBe('string');
      expect(typeof data.timestamp).toBe('string');
    });

    it('should return consistent data structure', () => {
      const data1 = getMockWeatherData();
      const data2 = getMockWeatherData();

      expect(Object.keys(data1)).toEqual(Object.keys(data2));
      expect(typeof data1.temperature).toBe(typeof data2.temperature);
    });

    it('should return reasonable weather values', () => {
      const data = getMockWeatherData();

      expect(data.temperature).toBeGreaterThan(0);
      expect(data.temperature).toBeLessThan(50);
      expect(data.windDirection).toBeGreaterThanOrEqual(0);
      expect(data.windDirection).toBeLessThan(360);
      expect(data.windSpeed).toBeGreaterThanOrEqual(0);
      expect(data.waveHeight).toBeGreaterThanOrEqual(0);
      expect(data.seaTemperature).toBeGreaterThan(0);
      expect(['spring', 'middle', 'neap']).toContain(data.tide);
    });

    it('should return valid ISO timestamp', () => {
      const data = getMockWeatherData();
      const timestamp = new Date(data.timestamp);

      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });
  });

  describe('fetchCurrentWeather', () => {
    it('should return weather data with simulated delay', async () => {
      const startTime = Date.now();
      const data = await fetchCurrentWeather();
      const endTime = Date.now();

      expect(data).toHaveProperty('temperature');
      expect(data).toHaveProperty('windDirection');
      expect(data).toHaveProperty('windSpeed');
      expect(data).toHaveProperty('waveHeight');
      expect(data).toHaveProperty('seaTemperature');
      expect(data).toHaveProperty('tide');
      expect(data).toHaveProperty('timestamp');

      // Should have some delay (mock network call)
      expect(endTime - startTime).toBeGreaterThanOrEqual(400);
    });

    it('should return valid weather data structure', async () => {
      const data = await fetchCurrentWeather();

      expect(typeof data.temperature).toBe('number');
      expect(typeof data.windDirection).toBe('number');
      expect(typeof data.windSpeed).toBe('number');
      expect(typeof data.waveHeight).toBe('number');
      expect(typeof data.seaTemperature).toBe('number');
      expect(typeof data.tide).toBe('string');
      expect(typeof data.timestamp).toBe('string');
    });
  });
});