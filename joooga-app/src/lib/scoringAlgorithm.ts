// src/lib/scoringAlgorithm.ts
import { WeatherData, FishingPoint, PointScore, FishingCondition } from './types';
import { evaluateWind } from '../utils/windDirection';

export const calculateWeatherScore = (weather: WeatherData, point: FishingPoint): number => {
  let score = 0;

  // Wind speed scoring
  if (weather.windSpeed <= 3) score += 20;
  else if (weather.windSpeed <= 5) score += 10;
  else score -= 10;

  // Wind direction scoring (point-based evaluation)
  score += evaluateWind(weather.windDirection, point.facing);

  // Temperature scoring (適温範囲 15-22℃)
  if (weather.temperature >= 15 && weather.temperature <= 22) score += 10;
  else score -= 5;

  return Math.max(0, score);
};

export const calculateSeaScore = (weather: WeatherData): number => {
  let score = 0;

  // Wave height scoring
  if (weather.waveHeight <= 1) score += 20;
  else if (weather.waveHeight <= 1.5) score += 10;
  else score -= 10;

  // Sea temperature scoring (季節適温 16-20℃)
  if (weather.seaTemperature >= 16 && weather.seaTemperature <= 20) score += 15;
  else score += 5;

  // Tide scoring
  switch (weather.tide) {
    case 'spring':
    case 'middle':
      score += 10;
      break;
    case 'neap':
      score += 5;
      break;
    default:
      score += 0;
  }

  return Math.max(0, score);
};

export const calculateFishScore = (condition: FishingCondition): number => {
  // Mock fish score based on species for Phase 1
  const baseScore = 25;

  switch (condition.species) {
    case 'grey':
      return baseScore * 1.0; // Base species
    case 'blacksea':
      return baseScore * 0.9; // High value
    case 'jackfish':
      return baseScore * 0.8; // School fish
    case 'migrating':
      return baseScore * 0.6; // Numbers
    default:
      return baseScore * 0.7;
  }
};

export const calculatePointScore = (
  point: FishingPoint,
  weather: WeatherData,
  condition: FishingCondition
): PointScore => {
  const weatherScore = calculateWeatherScore(weather, point);
  const seaScore = calculateSeaScore(weather);
  const fishScore = calculateFishScore(condition);

  const totalScore = weatherScore * 0.3 + seaScore * 0.3 + fishScore * 0.4;

  const windEval = evaluateWind(weather.windDirection, point.facing) > 0 ? '好条件' : '不利';
  const recommendation = totalScore > 50 ? '推奨' : totalScore > 30 ? '普通' : '不向き';

  return {
    pointId: point.id,
    totalScore: Math.round(totalScore),
    weatherScore: Math.round(weatherScore),
    seaScore: Math.round(seaScore),
    fishScore: Math.round(fishScore),
    details: {
      windEvaluation: windEval,
      recommendation
    }
  };
};

export const rankPoints = (scores: PointScore[]): PointScore[] => {
  return scores.sort((a, b) => b.totalScore - a.totalScore);
};