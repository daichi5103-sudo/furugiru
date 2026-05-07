# CLAUDE.md — furugiru 開発ルール

## 実装ルール

### 必須：実装前に必ずPlanモードで設計すること

コードを書く前に、必ず `/plan` コマンド（Planモード）で設計・方針を固めてから実装に入ること。

**対象となる作業（例）：**
- 新しいページ・コンポーネントの追加
- API routeの作成・変更
- データ構造の変更（型定義・データファイルの追記）
- 既存コンポーネントへの機能追加

**Planモードで確認すること：**
1. 変更するファイルの一覧
2. 実装方針・設計の概要
3. 影響範囲（他のファイルへの波及）
4. ビルドエラーが起きないかの事前確認

> 設計なしに直接コードを書き始めないこと。

---

## プロジェクト概要

**FURUGIRU（古着）** は Next.js 14 製の古着フリマ比較・情報サイト。日本の3大フリマ（メルカリ・ラクマ・ヤフオク）を横断検索し、ブランド鑑定・ケアガイド・コラボアイテム管理などを提供する。

- **言語**: TypeScript / React 18
- **フレームワーク**: Next.js 14.2 (App Router)
- **スタイリング**: Tailwind CSS（カスタムカラー + カスタムフォント）
- **バックエンド**: Supabase（リリースカレンダー）、Rakuten API、Google Places API
- **デプロイ**: Vercel 想定

---

## ディレクトリ構成

```
furugiru/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # ルートレイアウト（メタデータ・フォント・AdSense）
│   ├── page.tsx            # トップページ
│   ├── globals.css         # グローバルCSS（grain texture, skeleton animation）
│   ├── sitemap.ts          # SEO サイトマップ
│   ├── api/
│   │   ├── collab-images/  # コラボ画像一括取得（Rakuten API, 24h cache）
│   │   ├── rakuten/        # 楽天市場商品検索
│   │   └── shops/         # 古着屋検索（Google Places API, 1h cache）
│   ├── brands/
│   │   ├── page.tsx        # ブランド一覧
│   │   └── [slug]/page.tsx # ブランド詳細（動的ルート）
│   ├── care/
│   │   ├── page.tsx        # ケアガイド一覧
│   │   └── stain/page.tsx  # シミ抜きガイド
│   ├── calendar/page.tsx   # リリースカレンダー（Supabase）
│   ├── collabs/page.tsx    # コラボアーカイブ
│   ├── demo/page.tsx       # 機能デモページ
│   ├── quiz/page.tsx       # 鑑定クイズ
│   ├── search/page.tsx     # 横断検索結果
│   ├── shops/page.tsx      # 古着屋ファインダー
│   ├── trend/page.tsx      # トレンドトラッカー
│   └── wishlist/page.tsx   # ウィッシュリスト
├── components/             # Client Components
│   ├── AdSense.tsx         # Google AdSense（条件付きレンダリング）
│   ├── BrandsClient.tsx    # ブランド一覧（カテゴリフィルタ付き）
│   ├── CareClient.tsx      # ケアガイドUI
│   ├── CollabClient.tsx    # コラボアーカイブ（フィルタ・モーダル・ウィッシュリスト）
│   ├── MarketCard.tsx      # フリマカード（Mercari/Rakuma/Yahoo）
│   ├── PriceChart.tsx      # 価格推移チャート
│   ├── RakutenSection.tsx  # 楽天商品セクション
│   ├── SearchBar.tsx       # 検索バー（sticky, サイズ可変）
│   ├── ShopFinder.tsx      # 古着屋検索UI
│   ├── StainClient.tsx     # シミ抜きガイドUI
│   └── WishlistButton.tsx  # ♡ ウィッシュリストボタン
└── lib/                    # データ・ユーティリティ
    ├── brands.ts           # ブランド百科事典（タグエラ・鑑定情報）
    ├── care.ts             # ケア手順データ
    ├── collab-rss.json     # RSSワークフローが自動更新するコラボ情報
    ├── markets.ts          # フリマサービス定義 + トレンドキーワード
    ├── priceHistory.ts     # 価格履歴生成・買い時指数
    ├── prices.ts           # ブランド定価データ（40+ アイテム）
    ├── quizData.ts         # 鑑定クイズ問題（10問）
    ├── rakuten.ts          # 楽天API クライアント
    ├── shops.ts            # 静的古着屋データ（日本全国 ~30店舗）
    ├── stain.ts            # シミ抜きガイドデータ
    ├── supabase.ts         # Supabase クライアント + LotteryEvent型
    └── wishlist.ts         # localStorage ウィッシュリスト管理
```

---

## デザインシステム

### カラーパレット（tailwind.config.ts で定義）

| トークン | カラーコード | 用途 |
|---------|------------|------|
| `cream` | #F5F0E8 | メインテキスト・背景 |
| `ink` | #1A1A1A | 濃いテキスト |
| `rust` | #B84A1E | 警告・エラー |
| `olive` | #4A5C2A | 成功・ポジティブ |
| navy | #0E1B2E | ページ背景（インライン指定） |
| gold | #B8974A | アクセント・ハイライト（インライン指定） |

### フォント

- **Playfair Display** — ヘッダー・見出し（`font-display`）
- **DM Sans** — 本文（`font-body`）

### アニメーション

- `animate-fade` — フェードイン
- `animate-shimmer` — スケルトンローダー（`globals.css` で定義）
- `.grain` — 背景にノイズテクスチャをオーバーレイ

---

## コンポーネント設計規則

### Server / Client の区別

- `app/` 配下のページは基本 **Server Component**（`async` + `await` でデータ取得）
- インタラクティブなUIは `components/` に **Client Component**（`"use client"`）として分離
- データ取得は Server Component 側で行い、Client Component に props として渡す

### 命名規則

- Client Component ファイル名は `XxxClient.tsx` のサフィックスを使う（例: `BrandsClient.tsx`）
- ページファイルは常に `page.tsx`
- API Route は `route.ts`

### データフロー

```
lib/xxx.ts (静的データ / 型定義)
  ↓
app/xxx/page.tsx (Server Component: データ取得・受け渡し)
  ↓
components/XxxClient.tsx (Client Component: インタラクション)
```

---

## データ層

### 静的データ（`lib/`）

新しいデータを追加する際は対応する `lib/*.ts` を更新する。型定義も同ファイルに置く。

| ファイル | 主要な型 | 説明 |
|--------|--------|------|
| `brands.ts` | `Brand`, `TagEra` | ブランド情報（slug, eras, fakeTips など） |
| `shops.ts` | `Shop`, `AreaData` | 全国古着屋データ |
| `care.ts` | `Material` | 素材別ケア手順 |
| `stain.ts` | `StainType` | シミ別除去手順 |
| `prices.ts` | `PriceRecord` | ブランド定価データ |
| `markets.ts` | `Market` | フリマサービス定義 |
| `quizData.ts` | `Question` | クイズ問題 |

### 動的データ（API Routes）

| エンドポイント | 外部サービス | 環境変数 |
|-------------|------------|--------|
| `/api/rakuten` | 楽天市場 API | `RAKUTEN_APP_ID` |
| `/api/collab-images` | 楽天市場 API | `RAKUTEN_APP_ID` |
| `/api/shops` | Google Places API | `GOOGLE_PLACES_API_KEY` |

すべてのAPI Routeはサービス未設定時にモックデータへフォールバックする設計になっている。

### Supabase

`lib/supabase.ts` の `fetchLotteryEvents()` がリリースカレンダーデータを取得。
環境変数 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` 未設定時はモックデータを返す。

---

## 環境変数

```env
RAKUTEN_APP_ID=               # 楽天APIアプリID
GOOGLE_PLACES_API_KEY=        # Google Places APIキー
NEXT_PUBLIC_SUPABASE_URL=     # SupabaseプロジェクトURL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase公開キー
NEXT_PUBLIC_ADSENSE_ID=       # Google AdSense ID（未設定時はプレースホルダー表示）
```

---

## ページ一覧

| ルート | ページ | 主要機能 |
|--------|--------|--------|
| `/` | トップ | 検索・機能一覧・ブランドteaser・トレンドteaser |
| `/search` | 横断検索 | Mercari/Rakuma/Yahoo検索リンク + 楽天新品価格 |
| `/brands` | ブランド一覧 | カテゴリフィルタ、ブランドカード一覧 |
| `/brands/[slug]` | ブランド詳細 | タグエラー年表、鑑定tips、偽物チェックポイント |
| `/care` | ケアガイド | 素材別手入れ手順 |
| `/care/stain` | シミ抜き | シミ種別×製品推薦 |
| `/collabs` | コラボアーカイブ | 50+コラボ、フィルタ、ウィッシュリスト、モーダル詳細 |
| `/quiz` | 鑑定クイズ | 10問、スコア、SNSシェア |
| `/trend` | トレンド | Xリンク、ホットキーワード |
| `/calendar` | リリースカレンダー | 抽選・先着・発売日イベント（Supabase） |
| `/shops` | 古着屋ファインダー | Google Places統合、エリア別検索 |
| `/wishlist` | ウィッシュリスト | 保存アイテム一覧、損益計算 |
| `/demo` | デモ | 機能紹介ランディングページ |

---

## GitHub Actions

`.github/workflows/collab-rss.yml`

- 毎日 00:00 JST に自動実行
- SneakerNews / Highsnobiety / Hypebeast の RSS を取得
- コラボキーワードでフィルタし上位20件を `lib/collab-rss.json` に保存
- 差分があれば自動コミット

---

## よくある実装パターン

### 新しいブランドの追加

1. `lib/brands.ts` に `Brand` オブジェクトを追記（`slug` を設定）
2. `app/sitemap.ts` は `brands` 配列から自動生成されるため変更不要
3. `app/brands/[slug]/page.tsx` は動的ルートのため変更不要

### 新しいコラボアイテムの追加

`components/CollabClient.tsx` 内の `COLLABS` 配列にオブジェクトを追記する。

### 新しい古着屋の追加

`lib/shops.ts` の該当エリアの `shops` 配列に `Shop` オブジェクトを追記する。

### 新しいシミ・素材タイプの追加

- シミ: `lib/stain.ts` の `STAIN_TYPES` 配列に追記 → `StainClient.tsx` が自動的に表示
- 素材: `lib/care.ts` に追記 → `CareClient.tsx` が自動的に表示

### ウィッシュリスト機能

`lib/wishlist.ts` 提供の関数を使う（localStorage、`wishlist-updated` カスタムイベント経由で他コンポーネントと同期）。

---

## 画像設定（next.config.mjs）

外部ドメインの画像を使う場合は `next.config.mjs` の `remotePatterns` に追加が必要：

- `thumbnail.image.rakuten.co.jp`
- `sneakerbardetroit.com`
- `www.highsnobiety.com`
- `cdn.sanity.io`

---

## ビルド・開発コマンド

```bash
npm run dev     # 開発サーバー起動 (localhost:3000)
npm run build   # プロダクションビルド
npm run start   # プロダクションサーバー起動
npm run lint    # ESLint
```

---

## 注意事項

- **コメントは書かない**。変数名・関数名で意図を表現する。
- **型定義は `lib/` の対応ファイルに置く**。ページやコンポーネントに型をインラインで書かない。
- **モックフォールバックを壊さない**。API キーが未設定でもサイトが動作するよう、API Route のモックデータは常に維持すること。
- **日本語UIを維持**。ラベル・エラーメッセージ・プレースホルダーはすべて日本語。
- **Supabase の `LotteryEvent` 型変更時**は `lib/supabase.ts` のモックデータも合わせて更新する。
