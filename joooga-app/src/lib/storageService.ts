// src/lib/storageService.ts
import { ResearchResult } from './types';

const STORAGE_KEY = 'joooga_research_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

export const saveResearchResult = (result: ResearchResult): void => {
  try {
    const storageData = {
      result,
      cachedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.warn('Failed to save research result to cache:', error);
  }
};

export const getCachedResearchResult = (): ResearchResult | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const now = Date.now();

    // Check if cache is still valid
    if (now - data.cachedAt > CACHE_DURATION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data.result;
  } catch (error) {
    console.warn('Failed to read cached research result:', error);
    return null;
  }
};

export const clearCache = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const getCacheAge = (): string | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const ageMinutes = Math.floor((Date.now() - data.cachedAt) / (1000 * 60));

    if (ageMinutes < 60) {
      return `${ageMinutes}分前`;
    } else {
      const ageHours = Math.floor(ageMinutes / 60);
      return `${ageHours}時間前`;
    }
  } catch (error) {
    return null;
  }
};
