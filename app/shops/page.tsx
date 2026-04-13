import Link from "next/link";
import ShopFinder from "@/components/ShopFinder";
import AdSense from "@/components/AdSense";

export const metadata = {
  title: "近くの古着屋を探す | FURUGIRU",
  description:
    "下北沢・渋谷・梅田・天神など全国の古着屋をエリア別に検索。Google口コミ・評価・営業状況付き。",
};

export default function ShopsPage() {
  return (
    <div style={{ background: "#0E1B2E", minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* Header */}
      <header style={{
        borderBottom: "1px solid rgba(184,151,74,.2)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0E1B2E", position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: "#F5F0E8", textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: "#B8974A" }}>GIRU</span>
        </Link>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {[
            { label: "タグ図鑑",     href: "/brands" },
            { label: "お手入れ",     href: "/care" },
            { label: "シミ取り",     href: "/care/stain" },
            { label: "古着屋を探す", href: "/shops" },
            { label: "コラボ",       href: "/collabs" },
            { label: "トレンド",     href: "/trend" },
            { label: "カレンダー",   href: "/calendar" },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#5A6E85", textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8974A", marginBottom: 8 }}>
            Shop Finder — Powered by Google Places
          </p>
          <h1 style={{
            fontSize: 42, fontWeight: 300, letterSpacing: "-0.02em",
            color: "#F5F0E8", lineHeight: 1, marginBottom: 10, fontFamily: "Georgia, serif",
          }}>
            近くの<em style={{ color: "#B8974A", fontStyle: "italic" }}>古着屋</em>を探す
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.55)", lineHeight: 1.7, maxWidth: 560 }}>
            エリア名を入力すると、Google口コミ・評価・営業状況をまとめて表示します。
            下北沢・渋谷・梅田・天神など全国対応。
          </p>
        </div>

        <AdSense slot="shop-top" format="horizontal" className="w-full mb-8" />

        {/* Shop Finder Component */}
        <ShopFinder />

        <div style={{ marginTop: 40 }}>
          <AdSense slot="shop-bottom" format="rectangle" className="w-full" />
        </div>
      </main>

      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "24px",
        textAlign: "center", marginTop: 40,
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 店舗情報はGoogle Placesより取得。最新情報は各店舗にご確認ください。
        </p>
      </footer>
    </div>
  );
}
