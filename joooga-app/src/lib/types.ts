// src/lib/types.ts
export interface FishingPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  facing: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  features: string[];
  depth: {
    min: number;
    max: number;
  };
  warnings: string[];
  access: string;
}

export interface WeatherData {
  temperature: number;
  windDirection: number; // 0-360 degrees
  windSpeed: number; // m/s
  waveHeight: number; // m
  seaTemperature: number; // celsius
  tide: 'spring' | 'neap' | 'middle' | 'long';
  timestamp: string;
}

export interface FishingCondition {
  species: 'grey' | 'blacksea' | 'jackfish' | 'migrating';
  speciesName: string;
}

export interface PointScore {
  pointId: string;
  totalScore: number;
  weatherScore: number;
  seaScore: number;
  fishScore: number;
  details: {
    windEvaluation: string;
    recommendation: string;
  };
}

export interface ResearchRequest {
  area: 'jogashima' | 'miura' | 'sagami' | 'chiba';
  targetFish: FishingCondition;
}

export interface ResearchResult {
  request: ResearchRequest;
  weather: WeatherData;
  recommendations: PointScore[];
  timestamp: string;
}
