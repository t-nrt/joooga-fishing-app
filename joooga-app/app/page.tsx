'use client';

import { useState } from 'react';
import { ResearchRequest, ResearchResult, FishingCondition } from '@/lib/types';
import { getPointById } from '@/lib/pointsData';
import { saveResearchResult, getCachedResearchResult, isOnline, getCacheAge } from '@/lib/storageService';
import AreaSelector from '@/components/AreaSelector';
import TargetFishSelector from '@/components/TargetFishSelector';
import ResearchButton from '@/components/ResearchButton';
import PointRecommendation from '@/components/PointRecommendation';

export default function Home() {
  const [area, setArea] = useState<string>('jogashima');
  const [targetFish, setTargetFish] = useState<FishingCondition>({
    species: 'grey',
    speciesName: 'グレ専用'
  });
  const [result, setResult] = useState<ResearchResult | null>(getCachedResearchResult());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const request: ResearchRequest = { area, targetFish };

      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('リサーチに失敗しました');
      }

      const researchResult: ResearchResult = await response.json();
      setResult(researchResult);

      // Save to cache for offline use
      saveResearchResult(researchResult);

    } catch (err) {
      console.error('Research failed:', err);
      setError('リサーチに失敗しました。ネットワーク接続を確認してください。');

      // Try to use cached data if available
      const cached = getCachedResearchResult();
      if (cached) {
        setResult(cached);
        setError('オフラインモード: キャッシュされたデータを表示しています');
      }
    } finally {
      setLoading(false);
    }
  };

  const cacheAge = getCacheAge();
  const offline = !isOnline();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Joooga</h1>
        <p className="text-sm text-gray-600">フカセ釣りポイント推薦</p>
        {offline && (
          <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
            📶 オフラインモード
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <AreaSelector
          value={area}
          onChange={setArea}
          disabled={loading}
        />

        <TargetFishSelector
          value={targetFish}
          onChange={setTargetFish}
          disabled={loading}
        />

        <ResearchButton
          onResearch={handleResearch}
          loading={loading}
          disabled={offline && !getCachedResearchResult()}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">おすすめポイント</h2>
            {cacheAge && (
              <span className="text-xs text-gray-500">
                ⏰ {cacheAge}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {result.recommendations.map((score, index) => {
              const point = getPointById(score.pointId);
              if (!point) return null;

              return (
                <PointRecommendation
                  key={score.pointId}
                  score={score}
                  point={point}
                  weather={result.weather}
                  rank={index + 1}
                />
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-6 p-3 bg-gray-50 rounded-md text-xs text-gray-600">
            <div>エリア: {result.request.area === 'jogashima' ? '城ヶ島' : result.request.area}</div>
            <div>対象魚: {result.request.targetFish.speciesName}</div>
            <div>取得時刻: {new Date(result.timestamp).toLocaleString('ja-JP')}</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!result && !loading && (
        <div className="mt-8 p-4 bg-blue-50 rounded-md text-sm text-blue-700">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>エリアと対象魚種を選択</li>
            <li>リサーチ実行ボタンをタップ</li>
            <li>おすすめポイント3つが表示されます</li>
          </ol>
        </div>
      )}
    </div>
  );
}
