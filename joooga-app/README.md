# Joooga - フカセ釣りポイント推薦アプリ

城ヶ島を拠点としたフカセ釣りのポイント推薦PWAアプリです。

## 機能 (Phase 1 完了)

- ✅ 城ヶ島エリアのポイント推薦 (3ポイント)
- ✅ 気象データ連携 (模擬データ)
- ✅ ポイント基点風向き評価
- ✅ スマホ最適化UI
- ✅ オフライン対応 (基本機能)
- ✅ PWA対応
- ✅ 包括的テストスイート
- ✅ プロジェクトドキュメント

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: TailwindCSS
- **PWA**: Service Worker
- **テスト**: Jest + @testing-library/react
- **アイコン**: Lucide React
- **日時処理**: date-fns

## セットアップ

### 必要な環境
- Node.js 18以上
- npm または yarn

### インストール
```bash
# リポジトリをクローン
git clone <repository-url>
cd joooga-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバー: http://localhost:3000

## テスト

```bash
# テストを実行
npm test

# ウォッチモードでテスト
npm run test:watch
```

### テスト構成
- **スコアリングアルゴリズム**: 気象条件、海況、魚種評価の単体テスト
- **気象サービス**: 風向きフォーマット、風況評価、模擬データ検証
- **風向き計算**: 角度計算、風向き評価ロジックの検証

## ビルドとデプロイ

```bash
# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start
```

## PWA機能

- **オフライン対応**: 基本機能はネットワーク接続なしでも動作
- **ホーム画面追加**: アプリライクな体験
- **レスポンシブデザイン**: スマートフォン最適化
- **高速読み込み**: Service Workerによるキャッシュ

## アーキテクチャ概要

### ディレクトリ構造
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # レイアウトコンポーネント
│   ├── manifest.ts         # PWAマニフェスト
│   ├── page.tsx            # メインページ
│   └── api/                # APIルート
├── components/             # Reactコンポーネント
│   ├── FishingPointCard.tsx    # ポイントカード
│   ├── WeatherDisplay.tsx      # 気象表示
│   └── ...
├── lib/                    # 共通ライブラリ
│   ├── scoringAlgorithm.ts     # スコア計算
│   ├── weatherService.ts       # 気象データ
│   ├── pointsData.ts          # ポイントデータ
│   └── types.ts               # 型定義
└── utils/                  # ユーティリティ
    └── windDirection.ts        # 風向き計算
```

### スコアリングアルゴリズム
- **気象スコア (30%)**: 風速・風向き・気温を評価
- **海況スコア (30%)**: 波高・海水温・潮汐を評価
- **魚種スコア (40%)**: 対象魚種による基本スコア

## Phase 2 計画

### 外部API連携
- **海天気.jp**: 実際の気象データ取得
- **潮汐API**: リアルタイム潮汐情報

### 機能拡張
- 他エリア対応 (三浦半島、相模湾、千葉)
- 地図表示機能
- 釣果データ連携
- プッシュ通知

### UI/UX改善
- ダークモード対応
- アニメーション追加
- 詳細設定画面

## Phase 3 計画

### AI機能
- 機械学習による予測モデル
- 釣果パターン分析
- 個人最適化推薦

### コミュニティ機能
- ユーザー投稿機能
- 釣果共有
- レビューシステム

### データ分析
- 釣行記録連携
- 統計ダッシュボード
- 履歴分析

## 貢献方法

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for new functionality
4. Ensure all tests pass (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Submit pull request

### 開発ガイドライン
- TypeScriptの型安全性を保つ
- テストカバレッジを維持
- コードフォーマット (ESLint) に従う
- 日本語コメント推奨

## トラブルシューティング

### よくある問題
- **PWAが更新されない**: ブラウザのキャッシュをクリア
- **オフラインで動作しない**: Service Workerの登録を確認
- **テストが失敗**: Node.jsバージョンを確認 (18以上)

### デバッグ方法
```bash
# 詳細なビルドログ
npm run build -- --debug

# テストの詳細表示
npm test -- --verbose
```

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 作成者

- **開発**: Mirai Works
- **企画・設計**: 城ヶ島フカセ釣りコミュニティ
