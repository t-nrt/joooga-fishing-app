// src/components/PointRecommendation.tsx
'use client';

import { PointScore, FishingPoint, WeatherData } from '../lib/types';
import { formatWindDirection } from '../lib/weatherService';

interface PointRecommendationProps {
  score: PointScore;
  point: FishingPoint;
  weather: WeatherData;
  rank: number;
}

export default function PointRecommendation({ score, point, weather, rank }: PointRecommendationProps) {
  const rankEmoji = ['🏆', '🥈', '🥉'][rank - 1] || '📍';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">{rankEmoji}</span>
          {rank}位: {point.name}
        </h3>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {score.totalScore}点
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="text-sm text-gray-600">
          📍 アクセス: {point.access}
        </div>
        <div className="text-sm text-gray-600">
          ⭐ 推薦: {score.details.recommendation}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-sm">
        <div className="flex items-center gap-1">
          🌊 <span>{weather.seaTemperature}℃</span>
        </div>
        <div className="flex items-center gap-1">
          💨 <span>{formatWindDirection(weather.windDirection)}{weather.windSpeed}m/s</span>
        </div>
        <div className="flex items-center gap-1">
          🌊 <span>波高{weather.waveHeight}m</span>
        </div>
        <div className="flex items-center gap-1">
          📊 <span>{score.details.windEvaluation}</span>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        🎯 タナ: 海面から{point.depth.min}-{point.depth.max}m
      </div>

      {point.warnings.length > 0 && (
        <div className="text-sm text-orange-600 mb-3">
          ⚠️ {point.warnings.join('・')}
        </div>
      )}

      <div className="text-xs text-gray-500">
        地形: {point.features.join('・')}
      </div>
    </div>
  );
}