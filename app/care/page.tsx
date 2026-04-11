import Link from "next/link";
import { CARE_DATA } from "@/lib/care";
import CareClient from "@/components/CareClient";
import AdSense from "@/components/AdSense";

export const metadata = {
  title: "古着の洗い方・ケアガイド | FURUGIRU",
  description:
    "デニム・スウェット・ニット・レザーの素材別洗い方を初心者向けに解説。ヴィンテージ古着を長持ちさせる正しいケア方法。",
  keywords: [
    "古着 洗い方", "デニム 洗い方", "スウェット 洗い方",
    "ニット 洗い方", "レザー ケア", "ヴィンテージ 洗濯",
  ],
};

export default function CarePage() {
  return (
    <div className="min-h-screen" style={{ background: "#0E1B2E" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(184,151,74,.2)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0E1B2E",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 17,
            letterSpacing: "0.2em",
            color: "#F5F0E8",
            textDecoration: "none",
          }}
        >
          FURU<span style={{ color: "#B8974A" }}>GIRU</span>
        </Link>
        <nav style={{ display: "flex", gap: 24 }}>
          <Link href="/brands" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", textDecoration: "none" }}>
            タグ図鑑
          </Link>
          <Link href="/care/stain" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", textDecoration: "none" }}>
            シミ落とし
          </Link>
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8974A", marginBottom: 8 }}>
            Care Guide
          </p>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#F5F0E8",
              lineHeight: 1,
              marginBottom: 10,
              fontFamily: "Georgia, serif",
            }}
          >
            古着の<em style={{ color: "#B8974A", fontStyle: "italic" }}>洗い方</em>ガイド
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(245,240,232,.55)",
              lineHeight: 1.7,
              maxWidth: 560,
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            素材を間違えたケアは、大切な古着を一瞬でダメにします。
            デニム・スウェット・ニット・レザーそれぞれの正しい洗い方を、
            初心者でもわかるようにステップごとに解説します。
          </p>
        </div>

        {/* Ad */}
        <AdSense slot="1111222233" format="horizontal" className="w-full mb-8" />

        {/* Quick tips */}
        <div
          style={{
            border: "1px solid rgba(184,151,74,.2)",
            background: "rgba(184,151,74,.04)",
            padding: "16px 20px",
            marginBottom: 32,
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B8974A", marginBottom: 10 }}>
            まずここだけ覚えてください
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {[
              { icon: "🌡️", text: "洗濯は必ず「冷水〜30℃以下」" },
              { icon: "🌀", text: "乾燥機は全素材でNG" },
              { icon: "👕", text: "洗う前に洗濯表示タグを必ず確認" },
              { icon: "☀️", text: "乾燥は直射日光を避けて陰干し" },
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{tip.icon}</span>
                <span style={{ fontSize: 12, color: "rgba(245,240,232,.7)", lineHeight: 1.5 }}>{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main care client */}
        <CareClient materials={CARE_DATA} />

        {/* Bottom ad */}
        <div style={{ marginTop: 40 }}>
          <AdSense slot="2222333344" format="rectangle" className="w-full" />
        </div>
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(184,151,74,.1)",
          padding: "24px",
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。洗濯前に必ず表示タグを確認してください。
        </p>
      </footer>
    </div>
  );
}
