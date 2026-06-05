// __tests__/scoringAlgorithm.test.ts
import { calculateWeatherScore, calculateSeaScore, calculateFishScore, calculatePointScore, rankPoints } from '../src/lib/scoringAlgorithm';
import { WeatherData, FishingPoint, FishingCondition } from '../src/lib/types';

describe('Scoring Algorithm', () => {
  const mockPoint: FishingPoint = {
    id: 'test-point',
    name: 'Test Point',
    lat: 35.134,
    lng: 139.617,
    facing: 'SW',
    features: ['test'],
    depth: { min: 8, max: 15 },
    warnings: [],
    access: 'test'
  };

  const mockWeather: WeatherData = {
    temperature: 18,
    windDirection: 45, // NE wind (45 degrees)
    windSpeed: 3,
    waveHeight: 0.8,
    seaTemperature: 17,
    tide: 'middle',
    timestamp: new Date().toISOString()
  };

  describe('calculateWeatherScore', () => {
    it('should return positive score for good conditions', () => {
      const score = calculateWeatherScore(mockWeather, mockPoint);
      expect(score).toBeGreaterThan(0);
    });

    it('should penalize high wind speeds', () => {
      const highWindWeather = { ...mockWeather, windSpeed: 8 };
      const score = calculateWeatherScore(highWindWeather, mockPoint);
      expect(score).toBeLessThan(calculateWeatherScore(mockWeather, mockPoint));
    });

    it('should reward optimal temperature range', () => {
      const optimalTempWeather = { ...mockWeather, temperature: 18 };
      const coldWeather = { ...mockWeather, temperature: 10 };

      expect(calculateWeatherScore(optimalTempWeather, mockPoint))
        .toBeGreaterThan(calculateWeatherScore(coldWeather, mockPoint));
    });

    it('should evaluate wind direction relative to point facing', () => {
      const offshoreWind = { ...mockWeather, windDirection: 225 }; // SW wind for SW facing point
      const onshoreWind = { ...mockWeather, windDirection: 45 }; // NE wind for SW facing point

      expect(calculateWeatherScore(offshoreWind, mockPoint))
        .toBeGreaterThan(calculateWeatherScore(onshoreWind, mockPoint));
    });

    it('should handle edge case wind speeds', () => {
      const calmWind = { ...mockWeather, windSpeed: 1 };
      const moderateWind = { ...mockWeather, windSpeed: 4 };
      const strongWind = { ...mockWeather, windSpeed: 10 };

      const calmScore = calculateWeatherScore(calmWind, mockPoint);
      const moderateScore = calculateWeatherScore(moderateWind, mockPoint);
      const strongScore = calculateWeatherScore(strongWind, mockPoint);

      expect(calmScore).toBeGreaterThan(moderateScore);
      expect(moderateScore).toBeGreaterThan(strongScore);
    });
  });

  describe('calculateSeaScore', () => {
    it('should return positive score for calm seas', () => {
      const score = calculateSeaScore(mockWeather);
      expect(score).toBeGreaterThan(0);
    });

    it('should penalize high waves', () => {
      const roughSea = { ...mockWeather, waveHeight: 2.5 };
      const score = calculateSeaScore(roughSea);
      expect(score).toBeLessThan(calculateSeaScore(mockWeather));
    });

    it('should reward optimal sea temperature', () => {
      const optimalTemp = { ...mockWeather, seaTemperature: 18 };
      const coldTemp = { ...mockWeather, seaTemperature: 12 };

      expect(calculateSeaScore(optimalTemp))
        .toBeGreaterThan(calculateSeaScore(coldTemp));
    });

    it('should score different tide conditions', () => {
      const springTide = { ...mockWeather, tide: 'spring' as const };
      const neapTide = { ...mockWeather, tide: 'neap' as const };

      expect(calculateSeaScore(springTide))
        .toBeGreaterThan(calculateSeaScore(neapTide));
    });

    it('should handle wave height thresholds', () => {
      const calmSea = { ...mockWeather, waveHeight: 0.5 };
      const moderateSea = { ...mockWeather, waveHeight: 1.2 };
      const roughSea = { ...mockWeather, waveHeight: 2.0 };

      const calmScore = calculateSeaScore(calmSea);
      const moderateScore = calculateSeaScore(moderateSea);
      const roughScore = calculateSeaScore(roughSea);

      expect(calmScore).toBeGreaterThan(moderateScore);
      expect(moderateScore).toBeGreaterThan(roughScore);
    });
  });

  describe('calculateFishScore', () => {
    it('should return different scores for different fish species', () => {
      const greyCondition: FishingCondition = { species: 'grey', speciesName: 'グレ専用' };
      const blackseaCondition: FishingCondition = { species: 'blacksea', speciesName: 'チヌ狙い' };

      const greyScore = calculateFishScore(greyCondition);
      const blackseaScore = calculateFishScore(blackseaCondition);

      expect(greyScore).toBeGreaterThan(0);
      expect(blackseaScore).toBeGreaterThan(0);
      expect(greyScore).not.toBe(blackseaScore);
    });

    it('should score all species types correctly', () => {
      const species: Array<{ species: any; name: string }> = [
        { species: 'grey', name: 'グレ専用' },
        { species: 'blacksea', name: 'チヌ狙い' },
        { species: 'jackfish', name: 'アジ狙い' },
        { species: 'migrating', name: '回遊魚' },
        { species: 'other', name: 'その他' }
      ];

      species.forEach(({ species, name }) => {
        const condition: FishingCondition = { species, speciesName: name };
        const score = calculateFishScore(condition);
        expect(score).toBeGreaterThan(0);
      });
    });
  });

  describe('calculatePointScore', () => {
    it('should calculate total score from all components', () => {
      const condition: FishingCondition = { species: 'grey', speciesName: 'グレ専用' };
      const result = calculatePointScore(mockPoint, mockWeather, condition);

      expect(result).toHaveProperty('pointId', mockPoint.id);
      expect(result).toHaveProperty('totalScore');
      expect(result).toHaveProperty('weatherScore');
      expect(result).toHaveProperty('seaScore');
      expect(result).toHaveProperty('fishScore');
      expect(result).toHaveProperty('details');

      expect(result.totalScore).toBeGreaterThan(0);
    });

    it('should provide recommendation based on total score', () => {
      const condition: FishingCondition = { species: 'grey', speciesName: 'グレ専用' };
      const result = calculatePointScore(mockPoint, mockWeather, condition);

      expect(['推奨', '普通', '不向き']).toContain(result.details.recommendation);
    });
  });

  describe('rankPoints', () => {
    it('should sort points by total score descending', () => {
      const scores = [
        { pointId: 'point1', totalScore: 30, weatherScore: 10, seaScore: 10, fishScore: 10, details: { windEvaluation: '普通', recommendation: '普通' } },
        { pointId: 'point2', totalScore: 60, weatherScore: 20, seaScore: 20, fishScore: 20, details: { windEvaluation: '好条件', recommendation: '推奨' } },
        { pointId: 'point3', totalScore: 45, weatherScore: 15, seaScore: 15, fishScore: 15, details: { windEvaluation: '普通', recommendation: '普通' } }
      ];

      const ranked = rankPoints(scores);

      expect(ranked[0].totalScore).toBeGreaterThan(ranked[1].totalScore);
      expect(ranked[1].totalScore).toBeGreaterThan(ranked[2].totalScore);
      expect(ranked[0].pointId).toBe('point2');
    });
  });
});