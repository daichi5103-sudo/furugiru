import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrandBySlug } from "@/lib/brands";
import { getCheckerMode, TAG_CHECKER_SLUGS, FAKE_CHECKER_SLUGS } from "@/lib/tagChecker";
import TagCheckerClient from "@/components/TagCheckerClient";
import { RAKUTEN_ROOM_URL } from "@/lib/rakuten";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return [...TAG_CHECKER_SLUGS, ...FAKE_CHECKER_SLUGS].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};
  const mode = getCheckerMode(params.slug);
  const title = mode === "era"
    ? `${brand.name} タグ年代チェッカー | FURUGIRU`
    : `${brand.name} 偽物チェッカー | FURUGIRU`;
  return {
    title,
    description: mode === "era"
      ? `手元の${brand.nameJp}タグが何年代か、質問に答えるだけで簡単に判別できます。`
      : `手元の${brand.nameJp}アイテムの偽物リスクをチェックリストで判定します。`,
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
  { label: "コラボ",         href: "/collabs" },
  { label: "トレンド",       href: "/trend" },
  { label: "カレンダー",     href: "/calendar" },
  { label: "サイズガイド",   href: "/size" },
  { label: "用語集",         href: "/glossary" },
  { label: "コンディション", href: "/condition" },
];

export default function TagCheckerPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const mode = getCheckerMode(params.slug);
  if (!mode) notFound();

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* Header */}
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

      {/* Brand color strip */}
      <div style={{ height: 3, background: brand.color }} />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px" }}>
        <p style={{ fontSize: 10, color: MUTED }}>
          <Link href="/brands" style={{ color: MUTED, textDecoration: "none" }}>タグ図鑑</Link>
          {" / "}
          <Link href={`/brands/${brand.slug}`} style={{ color: MUTED, textDecoration: "none" }}>{brand.name}</Link>
          {" / "}
          <span style={{ color: "rgba(245,240,232,.4)" }}>
            {mode === "era" ? "年代チェッカー" : "偽物チェッカー"}
          </span>
        </p>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 0 80px" }}>
        <TagCheckerClient brand={brand} mode={mode} />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。購入の最終判断はご自身でお願いします。
        </p>
        <a href={RAKUTEN_ROOM_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(245,240,232,.25)", letterSpacing: "0.1em", textDecoration: "none" }}>
          楽天ROOM →
        </a>
      </footer>
    </div>
  );
}
