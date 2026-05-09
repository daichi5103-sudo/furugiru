# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 実装ルール

### 必須：実装前に必ずPlanモードで設計すること

コードを書く前に、必ず `/plan` コマンド（Planモード）で設計・方針を固めてから実装に入ること。確認事項：変更ファイル一覧、実装方針、影響範囲、ビルドエラーが起きないかの事前確認。

## コマンド

```bash
npm run dev      # 開発サーバー（localhost:3000）
npm run build    # 本番ビルド（全ページ静的生成を確認）
npm run lint     # ESLint
node scripts/scrape-events.mjs             # イベントnextDate更新
node scripts/scrape-events.mjs --discover  # fmfm.jpから新着イベント取得・追記
node scripts/fetch-collab-rss.mjs          # コラボRSSフィード更新（lib/collab-rss.json）
```

環境変数（`.env.local`）:
- `RAKUTEN_APP_ID` — 楽天商品検索API（未設定でもモックデータで動作）
- `NEXT_PUBLIC_ADSENSE_ID` — Google AdSense
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — カレンダー抽選イベント（未設定でモックデータにフォールバック）

## アーキテクチャ

**Next.js 14 App Router + TypeScript。ほぼ全ページ SSG（`generateStaticParams`）。**

### ページ構成

| ルート | 概要 |
|--------|------|
| `/` | トップ（検索バー）|
| `/search` | 楽天API経由でフリマ検索結果表示 |
| `/brands` | ブランド一覧（`lib/brands.ts` の `BRANDS[]` をSSG）|
| `/brands/[slug]` | ブランド詳細・タグ図鑑（`tagEras[]` ループ）|
| `/brands/[slug]/tag-checker` | タグ年代 or 偽物チェッカー（Client Component）|
| `/collabs` | コラボアーカイブ（`CollabClient.tsx` の `COLLABS[]`）|
| `/trend` | トレンド情報（静的データ）|
| `/calendar` | 抽選・発売カレンダー（Supabase or モック）|
| `/care` / `/care/stain` | お手入れガイド |
| `/shops` | 古着屋マップ |
| `/quiz` | クイズ |

### データフロー

- **静的コンテンツ**: `lib/brands.ts`・`lib/brandItems.ts`・`lib/collabs`（CollabClient内）・`lib/events.ts` にハードコード → ビルド時に全ページ生成
- **動的コンテンツ**: 楽天API（`/api/rakuten`）・コラボ画像（`/api/collab-images`）は Route Handler でサーバーサイドフェッチ、`revalidate: 86400` でキャッシュ
- **クライアント状態**: ウィッシュリストは `localStorage`（`lib/wishlist.ts`）、チェッカー回答は `useState`
- **カレンダー**: Supabase未設定時は `lib/supabase.ts` 内のモックに自動フォールバック

### タグチェッカーの仕組み（`lib/tagChecker.ts`）

- `TAG_CHECKER_SLUGS`（8ブランド）→ `mode: "era"`：年代推定
- `FAKE_CHECKER_SLUGS`（supreme / stone-island）→ `mode: "fake"`：偽物リスク判定
- `buildEraQuestions`: 各eraから feature×2 + fakeWarning×1 を抽出
- `calcEraScores`: feature=+2/-1、fake_warning=-2/+1 でera別スコア計算
- SVGイラスト: `components/TagSvgs.tsx` の `TAG_SVG_MAP[slug][eraIndex]` — **`tagEras[]` の配列順と `TAG_SVG_MAP` の配列順を必ず一致させること**

### コラボ更新の仕組み

- `lib/collab-rss.json` — `scripts/fetch-collab-rss.mjs` で定期更新（Hypebeast/Highsnobiety/SneakerNews RSS）
- `/collabs` ページの「新着ニュース」セクションは `collab-rss.json` を読み込んで表示
- `COLLABS[]` の `isNew` は `year` フィールドから自動計算（180日以内）。ハードコードしない

### イベントスクリプト

`scripts/scrape-events.mjs` は `lib/events.ts` を直接書き換えるNode.jsスクリプト。`SCHEDULE_RULES` に定期開催イベントのID→曜日ルールが定義されており、`--discover` フラグで fmfm.jp をスクレイプして新着を追記する。

### スタイリング

インラインスタイルのみ（Tailwindはほぼ未使用）。共通カラー変数は各ファイルに定義：
```ts
const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY  = "#0E1B2E";
const MUTED = "#5A6E85";
```

### コラボデータ追加時の注意

コラボ情報は記憶に頼らず **WebSearch**（hypebeast.com / highsnobiety.com）で調査してから追加すること。
