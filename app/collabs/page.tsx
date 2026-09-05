import { readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import AdSense from "@/components/AdSense";
import CollabClient from "@/components/CollabClient";
import { RAKUTEN_ROOM_URL } from "@/lib/rakuten";

type RssItem = { title: string; link: string; date: string; source: string };
type CollabRss = { updatedAt: string; items: RssItem[] };

function getCollabRss(): CollabRss {
  try {
    const filePath = join(process.cwd(), "lib/collab-rss.json");
    return JSON.parse(readFileSync(filePath, "utf-8")) as CollabRss;
  } catch {
    return { updatedAt: "", items: [] };
  }
}

function decodeEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function sourceLabel(source: string): string {
  if (source.toLowerCase().includes("sneakernews")) return "SneakerNews";
  if (source.toLowerCase().includes("hypebeast"))   return "Hypebeast";
  return "Highsnobiety";
}

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
  { label: "コラボ",         href: "/collabs" },
  { label: "トレンド",       href: "/trend" },
  { label: "カレンダー",     href: "/calendar" },
  { label: "サイズガイド",   href: "/size" },
  { label: "用語集",         href: "/glossary" },
  { label: "コンディション", href: "/condition" },
];

export default function CollabPage() {
  const rss = getCollabRss();

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

        {/* ── 新着ニュース ── */}
        {rss.items.length > 0 && (
          <section style={{ marginTop: 56 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
              Latest News
            </p>
            <h2 style={{
              fontSize: 20, fontWeight: 300, color: CREAM,
              fontFamily: "Georgia, serif", marginBottom: 4,
            }}>
              新着コラボニュース
            </h2>
            <p style={{ fontSize: 11, color: MUTED, marginBottom: 20 }}>
              更新: {rss.updatedAt ? new Date(rss.updatedAt).toLocaleString("ja-JP") : "—"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {rss.items.slice(0, 10).map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,.015)",
                    border: "1px solid rgba(184,151,74,.08)",
                    color: CREAM,
                    textDecoration: "none",
                    transition: "background .12s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 7, letterSpacing: "0.14em", textTransform: "uppercase",
                      padding: "1px 6px", border: "1px solid rgba(184,151,74,.3)", color: GOLD,
                    }}>
                      {sourceLabel(item.source)}
                    </span>
                    <span style={{ fontSize: 10, color: MUTED }}>
                      {new Date(item.date).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: CREAM, lineHeight: 1.55 }}>
                    {decodeEntities(item.title)}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

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
        <a href={RAKUTEN_ROOM_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(245,240,232,.25)", letterSpacing: "0.1em", textDecoration: "none" }}>
          楽天ROOM →
        </a>
      </footer>
    </div>
  );
}
