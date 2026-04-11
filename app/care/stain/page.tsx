import Link from "next/link";
import { STAIN_DATA } from "@/lib/stain";
import StainClient from "@/components/StainClient";
import AdSense from "@/components/AdSense";

export const metadata = {
  title: "古着のシミ落とし完全ガイド | FURUGIRU",
  description:
    "血液・油・インク・黄ばみ・カビのシミ落とし方を素材別に解説。100均のお手軽品から専用品まで、コスパ別おすすめ商品つき。",
  keywords: [
    "古着 シミ取り", "シミ落とし 方法", "血液 シミ 落とし方",
    "黄ばみ 落とし方", "カビ 衣類", "オキシクリーン 使い方",
  ],
};

export default function StainPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0E1B2E" }}>
      <header style={{
        borderBottom: "1px solid rgba(184,151,74,.2)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0E1B2E",
      }}>
        <Link href="/" style={{ fontSize: 17, letterSpacing: "0.2em", color: "#F5F0E8", textDecoration: "none" }}>
          FURU<span style={{ color: "#B8974A" }}>GIRU</span>
        </Link>
        <nav style={{ display: "flex", gap: 24 }}>
          <Link href="/care" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", textDecoration: "none" }}>
            洗い方ガイド
          </Link>
          <Link href="/brands" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", textDecoration: "none" }}>
            タグ図鑑
          </Link>
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8974A", marginBottom: 8 }}>
            Stain Removal Guide
          </p>
          <h1 style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.02em", color: "#F5F0E8", lineHeight: 1, marginBottom: 10, fontFamily: "Georgia, serif" }}>
            シミの<em style={{ color: "#B8974A", fontStyle: "italic" }}>落とし方</em>ガイド
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.55)", lineHeight: 1.7, maxWidth: 560, fontFamily: "'Helvetica Neue', sans-serif" }}>
            血液・油・インク・黄ばみ・カビ。シミの種類によって対処法は全く違います。
            100均のお手軽品から専用クリーナーまで、コスパ別に商品も紹介します。
          </p>
        </div>

        <AdSense slot="3344556677" format="horizontal" className="w-full mb-8" />

        {/* 鉄則 */}
        <div style={{
          border: "1px solid rgba(220,38,38,.3)", background: "rgba(220,38,38,.05)",
          padding: "16px 20px", marginBottom: 32,
        }}>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#DC2626", marginBottom: 10, fontFamily: "'Helvetica Neue', sans-serif" }}>
            シミ取りの鉄則 — まずこれだけ覚えてください
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "シミに気づいたらすぐ対処（時間が経つほど落ちにくくなる）",
              "こすらない（シミが広がる・生地が傷む）",
              "シミの裏側にタオルを当ててから作業する",
              "必ず目立たない部分でテストしてから使う",
              "乾燥機はシミが定着する前に絶対使わない",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{
                  width: 20, height: 20, border: "1px solid rgba(220,38,38,.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 10, color: "#DC2626", fontFamily: "Georgia, serif",
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.5, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </div>

        <StainClient stains={STAIN_DATA} />

        <div style={{ marginTop: 40 }}>
          <AdSense slot="4455667788" format="rectangle" className="w-full" />
        </div>
      </main>

      <footer style={{ borderTop: "1px solid rgba(184,151,74,.1)", padding: "24px", textAlign: "center", marginTop: 40 }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。使用前に必ず目立たない部分でテストしてください。
        </p>
      </footer>
    </div>
  );
}
