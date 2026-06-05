# Joooga アプリデプロイメントガイド

## Phase 1 MVP デプロイメント手順

### 前提条件
- Node.js 18以上がインストールされていること
- npm または yarn がインストールされていること
- Git がインストールされていること

### 1. 本番環境でのセットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd joooga-app

# 依存関係をインストール
npm install

# 環境設定ファイルをコピー
cp .env.example .env.local
```

### 2. 環境変数の設定

`.env.local` ファイルを編集し、本番環境用の設定を行います：

```bash
# Phase 1では以下の設定のみ
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_DEBUG=false

# Phase 2以降で必要な設定（現在は不要）
# NEXT_PUBLIC_JMA_API_KEY=your_jma_api_key
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### 3. ビルドとテスト

```bash
# テストを実行
npm test

# プロダクションビルドを作成
npm run build

# ビルドが成功したことを確認
npm start
```

### 4. Vercelへのデプロイ（推薦）

#### 4.1 Vercel CLIを使用
```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel --prod
```

#### 4.2 GitHubとの連携
1. GitHubリポジトリを作成
2. Vercel（https://vercel.com）にログイン
3. リポジトリをインポート
4. ビルド設定は自動検出されます

### 5. Netlifyへのデプロイ

```bash
# ビルドコマンド: npm run build
# 公開ディレクトリ: .next
# Node.js バージョン: 18以上
```

### 6. 自前サーバーへのデプロイ

#### 6.1 PM2を使用した本番運用
```bash
# PM2をインストール
npm install -g pm2

# アプリケーションを起動
pm2 start npm --name "joooga-app" -- start

# PM2設定を保存
pm2 save
pm2 startup
```

#### 6.2 Dockerを使用
```dockerfile
# Dockerfile（作成が必要）
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 7. PWA動作確認

デプロイ後、以下を確認してください：

1. **Service Worker登録**
   - ブラウザのDevTools → Application → Service Workers
   - 正常に登録されていることを確認

2. **マニフェストファイル**
   - `https://yourdomain.com/manifest.json` にアクセス
   - JSON形式で返されることを確認

3. **オフライン機能**
   - ネットワークを切断
   - キャッシュされたページが表示されることを確認

4. **インストール可能性**
   - Chrome/Edge: アドレスバーの「インストール」ボタン
   - Safari: 「ホーム画面に追加」

### 8. パフォーマンス最適化

#### 8.1 Lighthouse監査
```bash
# LighthouseでPWAスコアを確認
lighthouse https://yourdomain.com --view
```

目標スコア：
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- PWA: 100

#### 8.2 Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 9. 監視とメンテナンス

#### 9.1 エラー監視
Phase 2でSentry等のエラー監視ツールを導入予定

#### 9.2 分析
Phase 2でGoogle Analytics 4を導入予定

#### 9.3 定期メンテナンス
- 依存関係の更新: 月1回
- セキュリティパッチ: 随時適用
- PWAキャッシュのクリア: 必要に応じて

### 10. トラブルシューティング

#### よくある問題

**Service Workerが更新されない**
```bash
# キャッシュをクリア
# Chrome DevTools → Application → Storage → Clear Storage
```

**ビルドエラーが発生**
```bash
# node_modulesを削除してクリーンインストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

**PWAがインストールできない**
- HTTPS必須（localhost除く）
- マニフェストファイルの設定確認
- Service Workerの登録確認

### Phase 2 デプロイメント準備

Phase 2での追加要件：
- 外部API連携のための環境変数設定
- データベース接続設定
- Redis等のキャッシュサーバー設定
- CDN設定（画像配信最適化）
- 負荷分散設定

---

## チェックリスト

デプロイ前の最終確認：

- [ ] すべてのテストが通過
- [ ] プロダクションビルドが成功
- [ ] PWA機能が正常動作
- [ ] レスポンシブデザインの確認
- [ ] パフォーマンステスト実行
- [ ] セキュリティチェック
- [ ] エラーハンドリングの確認
- [ ] 利用規約・プライバシーポリシーの準備
- [ ] ドキュメント整備

## サポート

技術的な問題や質問については、プロジェクトのIssueトラッカーをご利用ください。

---

作成日: 2026-06-05
更新日: Phase 1 完了時