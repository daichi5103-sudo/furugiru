import Link from "next/link";
import AdSense from "@/components/AdSense";
import CollabClient from "@/components/CollabClient";

export const metadata = {
  title: "コラボアーカイブ | FURUGIRU",
  description: "Nike×Supreme・Supreme×LV・Off-White×Nikeなど有名古着ブランドのコラボ一覧。フリマ相場付き。",
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
  { label: "カレンダー",   href: "/calendar" },
];

export default function CollabPage() {
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
            Collaboration Archive
          </p>
          <h1 style={{
            fontSize: "clamp(36px,7vw,60px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            有名ブランドの<em style={{ color: GOLD, fontStyle: "italic" }}>コラボ名鑑</em>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 520 }}>
            定番の名作コラボから最新情報まで。フリマ相場付き。クリックしてフリマで探す。
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <AdSense slot="collab-top" format="horizontal" className="w-full" />
        </div>

        <CollabClient />

        <div style={{ marginTop: 40 }}>
          <AdSense slot="collab-bottom" format="rectangle" className="w-full" />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        textAlign: "center", marginTop: 20,
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。実際の取引価格は市場により異なります。
        </p>
      </footer>
    </div>
  );
}
