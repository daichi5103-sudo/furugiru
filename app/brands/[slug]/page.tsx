import { notFound } from "next/navigation";
import Link from "next/link";
import { BRANDS, getBrandBySlug, RARITY_LABEL, RARITY_COLOR } from "@/lib/brands";
import AdSense from "@/components/AdSense";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} タグ図鑑・偽物判別 | FURUGIRU`,
    description: `${brand.name}（${brand.nameJp}）の年代別タグの見分け方と偽物チェックポイントを詳しく解説。`,
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
  { label: "カレンダー",   href: "/calendar" },
];

export default function BrandDetailPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

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

      {/* ── Brand hero ── */}
      <div style={{ borderBottom: "1px solid rgba(184,151,74,.12)" }}>
        <div style={{ height: 3, width: "100%", background: brand.color }} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
                {brand.country} / {brand.founded}創業
              </p>
              <h1 style={{
                fontSize: "clamp(42px,8vw,72px)", fontWeight: 300, letterSpacing: "-0.02em",
                color: CREAM, lineHeight: 1, marginBottom: 10, fontFamily: "Georgia, serif",
              }}>
                {brand.name}
              </h1>
              <p style={{ fontSize: 18, color: MUTED, marginBottom: 16, fontFamily: "Georgia, serif" }}>{brand.nameJp}</p>
              <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 520 }}>
                {brand.description}
              </p>
            </div>

            {/* Quick search links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 4 }}>
                フリマで探す
              </p>
              {[
                { name: "メルカリ", url: `https://jp.mercari.com/search?keyword=${encodeURIComponent(brand.name + " ヴィンテージ")}&status=on_sale`, color: "#E84033" },
                { name: "ラクマ",   url: `https://fril.jp/search?query=${encodeURIComponent(brand.name + " 古着")}`,                                 color: "#009AB5" },
                { name: "ヤフオク", url: `https://auctions.yahoo.co.jp/search/search?p=${encodeURIComponent(brand.name)}`,                            color: "#CC0033" },
              ].map((m) => (
                <a
                  key={m.name}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                    padding: "10px 16px", border: "1px solid rgba(184,151,74,.25)",
                    background: "rgba(255,255,255,.03)", textDecoration: "none",
                    fontSize: 13, color: m.color,
                  }}
                >
                  <span>{m.name}で検索</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 12 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* Ad */}
        <div style={{ marginBottom: 40 }}>
          <AdSense slot="8888888888" format="horizontal" className="w-full" />
        </div>

        {/* Tag eras timeline */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Tag History &amp; Era Guide</p>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 32 }}>
            年代別タグの見分け方
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {brand.tagEras.map((era, i) => (
              <div key={i} style={{
                border: "1px solid rgba(184,151,74,.2)",
                background: "rgba(255,255,255,.03)",
              }}>
                {/* Era header */}
                <div style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
                  gap: 12, padding: "16px 20px",
                  borderBottom: "1px solid rgba(184,151,74,.12)",
                  borderLeft: `4px solid ${brand.color}`,
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                      <span style={{ fontSize: 18, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif" }}>
                        {era.era}
                      </span>
                      <span style={{
                        fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                        padding: "2px 8px", border: "1px solid",
                        color: RARITY_COLOR[era.rarity],
                        borderColor: RARITY_COLOR[era.rarity],
                      }}>
                        {RARITY_LABEL[era.rarity]}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11, color: MUTED, fontFamily: "Georgia, serif" }}>{era.years}</span>
                      <span style={{ fontSize: 13, color: "rgba(245,240,232,.7)" }}>{era.tagName}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 4 }}>相場</p>
                    <p style={{ fontSize: 16, fontFamily: "Georgia, serif", color: GOLD, fontWeight: 700 }}>{era.priceRange}</p>
                  </div>
                </div>

                <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                  {/* Features */}
                  <div>
                    <h4 style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
                      タグの特徴
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {era.features.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.5 }}>
                          <span style={{ color: GOLD, flexShrink: 0 }}>—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Authentic markers */}
                  <div>
                    <h4 style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>
                      本物の証明
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {era.authenticMarkers.map((m, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.5 }}>
                          <span style={{ color: GOLD, flexShrink: 0 }}>✓</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fake warnings */}
                  <div style={{ border: "1px solid rgba(220,38,38,.3)", background: "rgba(220,38,38,.05)", padding: 16 }}>
                    <h4 style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#DC2626", marginBottom: 12 }}>
                      ⚠ 偽物の特徴
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {era.fakeWarnings.map((w, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(220,38,38,.8)", lineHeight: 1.5 }}>
                          <span style={{ color: "#DC2626", fontWeight: 700, flexShrink: 0 }}>!</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mid ad */}
        <div style={{ marginBottom: 56 }}>
          <AdSense slot="9999999999" format="horizontal" className="w-full" />
        </div>

        {/* General fake tips */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Counterfeit Detection Guide</p>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 24 }}>
            {brand.name} 偽物判別の総まとめ
          </h2>

          <div style={{ border: "1px solid rgba(220,38,38,.3)", background: "rgba(220,38,38,.05)" }}>
            <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(220,38,38,.2)" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#DC2626" }}>
                ⚠ 購入前に必ずチェック
              </p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {brand.generalFakeTips.map((tip, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 20px",
                  borderBottom: i < brand.generalFakeTips.length - 1 ? "1px solid rgba(220,38,38,.1)" : "none",
                }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "rgba(220,38,38,.3)", lineHeight: 1, flexShrink: 0, width: 32, textAlign: "right" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontSize: 14, color: "rgba(245,240,232,.7)", lineHeight: 1.7 }}>{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Search tips */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Search Tips</p>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 24 }}>
            フリマ検索のコツ
          </h2>

          <div style={{ border: "1px solid rgba(184,151,74,.2)", background: "rgba(255,255,255,.03)" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {brand.searchTips.map((tip, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 20px",
                  borderBottom: i < brand.searchTips.length - 1 ? "1px solid rgba(184,151,74,.1)" : "none",
                }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.15em", color: MUTED, flexShrink: 0, marginTop: 4 }}>
                    TIP{i + 1}
                  </span>
                  <p style={{ fontSize: 14, color: "rgba(245,240,232,.7)", lineHeight: 1.7 }}>{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Other brands */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Other Brands</p>
            <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {BRANDS.filter((b) => b.slug !== brand.slug).map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                  border: "1px solid rgba(184,151,74,.25)", background: "rgba(255,255,255,.03)",
                  textDecoration: "none", fontSize: 13, color: CREAM,
                }}
              >
                <span style={{ width: 8, height: 8, display: "inline-block", background: b.color, flexShrink: 0 }} />
                {b.name}
              </Link>
            ))}
            <Link
              href="/brands"
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                border: "1px dashed rgba(184,151,74,.2)",
                textDecoration: "none", fontSize: 13, color: MUTED,
              }}
            >
              一覧へ →
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        textAlign: "center", marginTop: 32,
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。購入の最終判断はご自身でお願いします。
        </p>
      </footer>
    </div>
  );
}
