import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "FURUGIRU — 古着フリマ一括比較",
  description:
    "メルカリ・ラクマ・ヤフオクの古着を一括比較。楽天市場の新品価格で相場チェック。",
  keywords: ["古着", "フリマ", "メルカリ", "ラクマ", "ヤフオク", "ヴィンテージ", "古着相場"],
  openGraph: {
    title: "FURUGIRU — 古着フリマ一括比較",
    description: "古着の相場をメルカリ・ラクマ・ヤフオクで一括比較",
    type: "website",
  },
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
const hasAdsense = adsenseId && adsenseId !== "ca-pub-xxxxxxxxxxxxxxxx";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {hasAdsense && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
