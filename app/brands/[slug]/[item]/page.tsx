import Link from "next/link";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { BRAND_ITEMS, getItem, getItemsByBrand } from "@/lib/brandItems";
import { generatePriceHistory, getBuyIndex } from "@/lib/priceHistory";
import PriceChart from "@/components/PriceChart";

const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY = "#0E1B2E";
const MUTED = "#5A6E85";

type Params = { slug: string; item: string };

export function generateStaticParams() {
  return BRAND_ITEMS.map((b) => ({ slug: b.brandSlug, item: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const item = getItem(params.slug, params.item);
  if (!item) return {};
  return {
    title: `${item.nameJp} 相場・買い時・偽物チェック | FURUGIRU`,
    description: `${item.nameJp}の現在の相場は約¥${item.currentMarket.toLocaleString()}。コンディション別価格・年代別プレミアム・偽物チェックポイントをまとめました。`,
  };
}

const CONDITION_LABEL: Record<string, string> = {
  S: "S（未使用〜極美品）",
  A: "A（美品）",
  B: "B（使用感あり）",
  C: "C（難あり）",
};

const SEARCH_LINKS = [
  { label: "メルカリで探す", base: "https://jp.mercari.com/search?keyword=", color: "#E84033" },
  { label: "ヤフオクで探す", base: "https://auctions.yahoo.co.jp/search/search?p=", color: "#E8A000" },
  { label: "ラクマで探す", base: "https://fril.jp/search?query=", color: "#3A8A5A" },
];

export default function ItemPage({ params }: { params: Params }) {
  const item = getItem(params.slug, params.item);
  if (!item) notFound();

  const history = generatePriceHistory(item.releaseYear, item.origPrice, item.currentMarket, item.rarity);
  const buyIndex = getBuyIndex(history);
  const encoded = encodeURIComponent(item.searchKeyword);

  const siblingItems = getItemsByBrand(params.slug).filter((i) => i.slug !== params.item);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <header style={{
        borderBottom: `1px solid rgba(184,151,74,.2)`, padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: NAVY, position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <Link href={`/brands/${params.slug}`} style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
          ← {item.brandName} に戻る
        </Link>
      </header>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        {/* パンくず */}
        <p style={{ fontSize: 9, color: MUTED, letterSpacing: "0.1em", marginBottom: 16 }}>
          <Link href="/brands" style={{ color: MUTED, textDecoration: "none" }}>ブランド図鑑</Link>
          {" / "}
          <Link href={`/brands/${params.slug}`} style={{ color: MUTED, textDecoration: "none" }}>{item.brandName}</Link>
          {" / "}
          {item.nameJp}
        </p>

        {/* タイトル */}
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>
          Price Guide / {item.category}
        </p>
        <h1 style={{ fontSize: 34, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 8 }}>
          {item.nameJp}
          <em style={{ color: GOLD, fontStyle: "italic" }}> 相場</em>
        </h1>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.55)", lineHeight: 1.8, marginBottom: 36, maxWidth: 560 }}>
          {item.description}
        </p>

        {/* 現在相場サマリー */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
          marginBottom: 36,
        }}>
          {[
            { label: "現在の相場（A品）", value: `¥${item.currentMarket.toLocaleString()}` },
            { label: "定価目安", value: `¥${item.origPrice.toLocaleString()}` },
            { label: "プレミアム倍率", value: `${(item.currentMarket / item.origPrice).toFixed(1)}x` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,.025)", border: `1px solid rgba(184,151,74,.1)`,
              padding: "16px 20px",
            }}>
              <p style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 24, color: GOLD, fontFamily: "Georgia, serif" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* 価格推移グラフ */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
            Price History
          </p>
          <div style={{ background: "rgba(255,255,255,.02)", border: `1px solid rgba(184,151,74,.1)`, padding: "24px" }}>
            <PriceChart data={history} buyIndex={buyIndex} />
          </div>
        </div>

        {/* コンディション別相場表 */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
            Condition Price Guide
          </p>
          <div style={{ border: `1px solid rgba(184,151,74,.1)` }}>
            {(Object.entries(item.conditionPrices) as [string, number][]).map(([cond, price], idx) => (
              <div key={cond} style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "14px 20px",
                borderTop: idx === 0 ? "none" : `1px solid rgba(184,151,74,.06)`,
                background: cond === "A" ? "rgba(184,151,74,.06)" : "transparent",
              }}>
                <div>
                  <p style={{ fontSize: 12, color: CREAM }}>{CONDITION_LABEL[cond]}</p>
                  {cond === "A" && (
                    <p style={{ fontSize: 9, color: GOLD, marginTop: 2 }}>← 相場の基準値</p>
                  )}
                </div>
                <p style={{ fontSize: 18, color: cond === "A" ? GOLD : CREAM, fontFamily: "Georgia, serif" }}>
                  ¥{price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 年代別プレミアム */}
        {item.vintageBoost && item.vintageBoost.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
              Vintage Premium by Era
            </p>
            <div style={{ border: `1px solid rgba(184,151,74,.1)` }}>
              {item.vintageBoost.map((v, idx) => (
                <div key={v.era} style={{
                  display: "grid", gridTemplateColumns: "1fr auto",
                  alignItems: "center", padding: "12px 20px",
                  borderTop: idx === 0 ? "none" : `1px solid rgba(184,151,74,.06)`,
                }}>
                  <p style={{ fontSize: 12, color: CREAM }}>{v.era}</p>
                  <p style={{
                    fontSize: 14, fontFamily: "Georgia, serif",
                    color: v.multiplier >= 5 ? "#DC2626" : v.multiplier >= 2 ? GOLD : MUTED,
                  }}>
                    {v.multiplier >= 2 ? `×${v.multiplier} 〜` : "基準"}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 9, color: MUTED, marginTop: 8 }}>
              ※ 倍率は A 品のコンディション相場に対する目安です
            </p>
          </div>
        )}

        {/* 偽物チェックポイント */}
        {item.fakeTips && item.fakeTips.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
              Authenticity Checkpoints
            </p>
            <div style={{ border: `1px solid rgba(184,151,74,.1)`, padding: "20px 24px" }}>
              {item.fakeTips.map((tip, idx) => (
                <div key={idx} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  paddingBottom: idx < item.fakeTips!.length - 1 ? 12 : 0,
                  marginBottom: idx < item.fakeTips!.length - 1 ? 12 : 0,
                  borderBottom: idx < item.fakeTips!.length - 1 ? `1px solid rgba(184,151,74,.06)` : "none",
                }}>
                  <span style={{ fontSize: 10, color: GOLD, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <p style={{ fontSize: 12, color: "rgba(245,240,232,.75)", lineHeight: 1.6 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 今すぐ探す */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
            今すぐ相場を確認する
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SEARCH_LINKS.map(({ label, base, color }) => (
              <a key={label} href={`${base}${encoded}`} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 20px",
                border: `1px solid rgba(255,255,255,.08)`,
                color: CREAM, textDecoration: "none", fontSize: 13,
                background: "rgba(255,255,255,.02)",
              }}>
                <span>{label}</span>
                <span style={{ fontSize: 10, color, letterSpacing: "0.1em" }}>検索する ↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* 同ブランドの他アイテム */}
        {siblingItems.length > 0 && (
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
              {item.brandName} の他のアイテム
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {siblingItems.map((sib) => (
                <Link key={sib.slug} href={`/brands/${sib.brandSlug}/${sib.slug}`} style={{
                  fontSize: 11, padding: "8px 14px",
                  border: `1px solid rgba(184,151,74,.25)`, color: MUTED,
                  textDecoration: "none",
                }}>
                  {sib.nameJp}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
