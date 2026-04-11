# FURUGIRU — 古着フリマ一括比較サイト

メルカリ・ラクマ・ヤフオクの古着を一括比較。楽天市場の新品価格で相場チェックできるNext.jsアプリ。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **楽天商品検索API**
- **Google AdSense**

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` を編集して、APIキーを設定します：

```env
# 楽天API（必須・無料）
# https://webservice.rakuten.co.jp/ でアプリ登録後に取得
RAKUTEN_APP_ID=your_rakuten_app_id_here

# Google AdSense（任意）
# https://www.google.com/adsense/ で取得
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

### 3. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 にアクセス

### 4. 本番ビルド

```bash
npm run build
npm start
```

## 楽天APIの取得方法

1. https://webservice.rakuten.co.jp/ にアクセス
2. 「アプリIDの発行」をクリック
3. アプリ名・アプリURLを入力して登録
4. 発行された `applicationId` を `.env.local` に設定

> APIキー未設定でもモックデータで動作確認できます

## Google AdSenseの設定

1. https://www.google.com/adsense/ でアカウント作成
2. サイトを審査・承認後、パブリッシャーIDを取得
3. `.env.local` の `NEXT_PUBLIC_ADSENSE_ID` に設定
4. 各ページの `AdSense` コンポーネントの `slot` にユニットIDを設定

### 広告スロットの場所

| ページ | スロット変数 | 位置 |
|--------|-------------|------|
| トップ | `1111111111` | ヘッダー下 |
| トップ | `2222222222` | フッター上 |
| 検索結果 | `3333333333` | ヘッダー下 |
| 検索結果 | `4444444444` | フリマカード下 |
| 検索結果 | `5555555555` | 最下部 |

## ファイル構成

```
furugiru/
├── app/
│   ├── layout.tsx          # ルートレイアウト（フォント・AdSense）
│   ├── page.tsx            # トップページ
│   ├── globals.css         # グローバルスタイル
│   ├── search/
│   │   └── page.tsx        # 検索結果ページ
│   └── api/
│       └── rakuten/
│           └── route.ts    # 楽天API エンドポイント
├── components/
│   ├── SearchBar.tsx       # 検索バー（サジェスト付き）
│   ├── MarketCard.tsx      # フリマカード（メルカリ/ラクマ/ヤフオク）
│   ├── RakutenSection.tsx  # 楽天価格セクション
│   └── AdSense.tsx         # AdSenseコンポーネント
├── lib/
│   ├── rakuten.ts          # 楽天APIクライアント
│   └── markets.ts          # フリマURL生成
├── .env.local              # 環境変数（要設定）
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## 今後の拡張アイデア

- タグ年代・偽物判別ガイド（ブランド別）
- 価格推移グラフ
- お気に入り保存機能
- SNSシェア機能
- ブランド別ランディングページ
