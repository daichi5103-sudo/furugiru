import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import MarketCard from "@/components/MarketCard";
import RakutenSection from "@/components/RakutenSection";
import AdSense from "@/components/AdSense";
import { MARKETS } from "@/lib/markets";

interface Props {
  searchParams: { q?: string };
}

export function generateMetadata({ searchParams }: Props) {
  const q = searchParams.q || "";
  return {
    title: q ? `「${q}」の古着検索 | FURUGIRU` : "検索 | FURUGIRU",
    description: `「${q}」の古着をメルカリ・ラクマ・ヤフオクで一括比較。楽天市場の新品価格も確認。`,
  };
}

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

export default function SearchPage({ searchParams }: Props) {
  const keyword = (searchParams.q || "").trim();

  if (!keyword) {
    return (
      <div style={{ background: NAVY, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Helvetica Neue', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 16 }}>キーワードが入力されていません</p>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none" }}>
            トップへ戻る →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* ── Sticky header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        borderBottom: "1px solid rgba(184,151,74,.2)",
        padding: "12px 24px", background: NAVY,
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif", flexShrink: 0 }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <div style={{ flex: 1, maxWidth: 560 }}>
          <SearchBar defaultValue={keyword} size="md" />
        </div>
        <nav style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
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

      {/* ── Top ad ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 0" }}>
        <AdSense slot="3333333333" format="horizontal" className="w-full" />
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", display: "flex", flexDirection: "column", gap: 40 }}>

        {/* ── Search title ── */}
        <div style={{ borderBottom: "1px solid rgba(184,151,74,.2)", paddingBottom: 20 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>
            検索結果
          </p>
          <h1 style={{
            fontSize: "clamp(28px,6vw,48px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.1, fontFamily: "Georgia, serif",
          }}>
            &ldquo;{keyword}&rdquo;
          </h1>
        </div>

        {/* ── Flea market cards ── */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif" }}>
              フリマで探す
            </h2>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED }}>
              3サイト一括
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {MARKETS.map((market, i) => (
              <MarketCard key={market.id} market={market} keyword={keyword} index={i} />
            ))}
          </div>
        </section>

        {/* ── Mid ad ── */}
        <AdSense slot="4444444444" format="horizontal" className="w-full" />

        {/* ── Rakuten new prices ── */}
        <RakutenSection keyword={keyword} />

        {/* ── Tips ── */}
        <section style={{ border: "1px solid rgba(184,151,74,.2)", padding: 24, background: "rgba(255,255,255,.03)" }}>
          <h2 style={{ fontSize: 18, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 16 }}>
            古着を買うときのチェックポイント
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "楽天の新品価格と比べて、フリマ価格が適正かを確認しましょう",
              "商品の状態ランク（S〜C）を必ずチェック。写真の枚数も重要です",
              "ヴィンテージ品はタグや縫製で年代を確認するとより正確に判断できます",
              "複数のフリマを比較して最安値を見つけましょう",
              "出品者の評価・評判を必ず確認してから購入を検討しましょう",
            ].map((tip, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.7 }}>
                <span style={{ color: GOLD, fontFamily: "Georgia, serif", fontWeight: 700, flexShrink: 0 }}>—</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Bottom ad ── */}
        <AdSense slot="5555555555" format="rectangle" className="w-full" />
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        marginTop: 16,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
            FURU<span style={{ color: GOLD }}>GIRU</span>
          </Link>
          <div style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.04em", textAlign: "center" }}>
            <p>© 2026 FURUGIRU — 古着フリマ一括比較サイト</p>
            <p>本サイトはメルカリ・ラクマ・ヤフオクの公式サービスではありません。</p>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,.2)", textDecoration: "none" }}>利用規約</a>
            <a href="#" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,.2)", textDecoration: "none" }}>プライバシー</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
