// src/lib/pointsData.ts
import { FishingPoint } from './types';
import pointsJson from '../../data/fishing-points.json';

export const getFishingPoints = (): FishingPoint[] => {
  return pointsJson.points as FishingPoint[];
};

export const getPointById = (id: string): FishingPoint | undefined => {
  return getFishingPoints().find(point => point.id === id);
};

export const getPointsByArea = (area: string): FishingPoint[] => {
  // For Phase 1, only return Jogashima points
  if (area === 'jogashima') {
    return getFishingPoints();
  }
  return [];
};
