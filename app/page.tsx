import { MapPin, Cloud, Fish } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Joooga</h1>
          <p className="text-xl text-gray-600 mb-2">
            フカセ釣りポイント推薦アプリ
          </p>
          <p className="text-gray-500">
            城ヶ島を拠点としたフカセ釣りの最適なポイントをご提案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              ポイント推薦
            </h2>
            <p className="text-gray-600">
              城ヶ島エリアの最適なフカセ釣りポイントをAIが推薦
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Cloud className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              気象連携
            </h2>
            <p className="text-gray-600">
              リアルタイム気象データで最適な釣り時間をナビゲート
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Fish className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              オフライン対応
            </h2>
            <p className="text-gray-600">
              オフラインでもポイント情報を参照可能なPWA対応
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Phase 1: MVP開発中
          </h2>
          <p className="text-gray-600 mb-6">
            Joooga は城ヶ島を中心としたフカセ釣りアプリの MVP 版です。<br />
            本アプリはリアルタイムな気象データとの連携により、最適な釣り時間とポイントをご提案します。
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            ポイント推薦を見る
          </button>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2026 Joooga - フカセ釣りポイント推薦アプリ</p>
        </div>
      </div>
    </main>
  );
}
