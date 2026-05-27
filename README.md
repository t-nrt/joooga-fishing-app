# Joooga - フカセ釣りポイント推薦アプリ

城ヶ島を拠点としたフカセ釣りのポイント推薦PWAアプリ

## プロジェクト概要

**アプリ名:** Joooga（城ヶ島の方言から命名）
**対象:** フカセ釣り愛好者
**主要機能:** リアルタイム気象・海況・釣果データに基づくポイント推薦

## 開発状況

📅 **開始日:** 2026年5月26日  
🎯 **現在フェーズ:** Phase 1（MVP開発準備完了）  
📋 **実装進捗:** 0/13タスク完了  

## フォルダ構造

```
Joooga/
├── README.md                        # このファイル
├── package.json                     # Node.js dependencies
├── tsconfig.json                    # TypeScript設定
├── next.config.js                   # Next.js設定
├── tailwind.config.js               # Tailwind CSS設定
├── postcss.config.js                # PostCSS設定
├── .eslintrc.json                   # ESLint設定
├── .gitignore                       # Git ignore設定
│
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # RootLayout
│   ├── page.tsx                     # ホームページ
│   ├── globals.css                  # グローバルスタイル
│   ├── api/                         # API routes（今後）
│   └── components/                  # React components（今後）
│
├── public/                          # 静的アセット
│   └── manifest.json                # PWA マニフェスト
│
├── specs/                           # 設計仕様書
│   └── 2026-05-26-joooga-fishing-app-design.md
├── plans/                           # 実装計画
│   └── 2026-05-26-joooga-phase1.md
├── docs/                            # その他ドキュメント
└── design/                          # デザイン資料（今後）
```

## Phase 1 進捗

- ✅ **Task 1/13 完了：** プロジェクト設定・Next.js初期化
  - package.json（依存関係定義）
  - TypeScript設定
  - Next.js + Tailwind CSS設定
  - PWAマニフェスト設定
  - 基本ディレクトリ構造

- ⏳ Task 2/13：ポイント推薦エンジンの実装
- ⏳ Task 3/13 以降：気象連携、UI実装など

## セットアップ手順

Node.js 18.17.0 以上がインストール済みの環境で：

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build
npm start
```

開発サーバーは `http://localhost:3000` で起動します。

## 技術スタック

- **フロントエンド:** Next.js 14 + TypeScript
- **スタイリング:** TailwindCSS
- **PWA:** Service Worker対応
- **テスト:** Jest + Testing Library

---

**🎣 次回の実装開始をお待ちしております！**