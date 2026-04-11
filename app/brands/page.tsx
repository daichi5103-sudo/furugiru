import Link from "next/link";
import AdSense from "@/components/AdSense";
import BrandsClient from "@/components/BrandsClient";

export const metadata = {
  title: "ブランド別タグ図鑑 | FURUGIRU",
  description: "Levi's・Champion・Nike・Carhartt・Stone Island等のタグ変遷と偽物判別ガイド。ファッション・コスメカテゴリ対応。",
};

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY  = "#0E1B2E";
const MUTED = "#5A6E85";

const NAV_LINKS = [
  { label: "タグ図鑑",     href: "/brands" },
  { label: "お手入れ",     href: "/care" },
  { label: "シミ取り",     href: "/care/stain" },
  { label: "古着屋を探す", href: "/shops" },
  { label: "コラボ",       href: "/collabs" },
  { label: "トレンド",     href: "/trend" },
];

export default function BrandsPage() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* ── Header ── */}
      <header style={{
        borderBottom: "1px solid rgba(184,151,74,.2)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: NAVY, position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              color: MUTED, textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Vintage Tag Encyclopedia
          </p>
          <h1 style={{
            fontSize: "clamp(36px,7vw,60px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            ブランド別<br /><em style={{ color: GOLD, fontStyle: "italic" }}>タグ図鑑</em>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 520 }}>
            年代別タグの見分け方・偽物との違いを詳しく解説。
            ファッション・古着から今後はコスメ・アクセサリーも追加予定。
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <AdSense slot="6666666666" format="horizontal" className="w-full" />
        </div>

        <BrandsClient />

        <div style={{ marginTop: 40 }}>
          <AdSense slot="7777777777" format="rectangle" className="w-full" />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        textAlign: "center", marginTop: 20,
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考であり、購入の最終判断はご自身でお願いします。
        </p>
      </footer>
    </div>
  );
}
