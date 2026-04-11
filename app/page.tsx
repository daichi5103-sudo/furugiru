"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TRENDING } from "@/lib/markets";

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

const FEATURES = [
  { label: "フリマ比較",   sub: "メルカリ・ラクマ・ヤフオク",    href: "/search?q=Levi's 501", color: "#E84033" },
  { label: "タグ図鑑",     sub: "年代識別・偽物チェック",         href: "/brands",              color: "#1B4FBF" },
  { label: "お手入れ",     sub: "素材別 洗い方ガイド",            href: "/care",                color: "#3A8A5A" },
  { label: "シミ取り",     sub: "種類別 緊急対処法",              href: "/care/stain",          color: "#DC2626" },
  { label: "古着屋を探す", sub: "全国エリア別・口コミ付き",       href: "/shops",               color: GOLD      },
  { label: "コラボ相場",   sub: "Nike×Supreme など定価比較",      href: "/collabs",             color: "#7C3AED" },
  { label: "トレンド",     sub: "X & フリマ売れ筋リアルタイム",   href: "/trend",               color: "#B84A1E" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const go = () => { if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`); };

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* ── Header ── */}
      <header style={{
        borderBottom: `1px solid rgba(184,151,74,.2)`,
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

      {/* ── Hero ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 48px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
          Vintage Flea Market Search
        </p>
        <h1 style={{
          fontSize: "clamp(42px, 8vw, 72px)", fontWeight: 300, letterSpacing: "-0.02em",
          color: CREAM, lineHeight: 1.05, marginBottom: 16, fontFamily: "Georgia, serif",
        }}>
          古着の<em style={{ color: GOLD, fontStyle: "italic" }}>相場</em>を<br />一発で。
        </h1>
        <p style={{ fontSize: 14, color: `rgba(245,240,232,.55)`, lineHeight: 1.8, maxWidth: 520, marginBottom: 36 }}>
          メルカリ・ラクマ・ヤフオクの検索結果を一括比較。楽天市場の新品価格で
          相場感もすぐ確認。タグ年代判別・シミ取り・お手入れガイドも完備。
        </p>

        {/* Search bar */}
        <div style={{ display: "flex", gap: 0, maxWidth: 560, marginBottom: 20 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && go()}
              placeholder="ブランド名・商品名を入力…"
              style={{
                width: "100%", padding: "14px 14px 14px 38px",
                background: "rgba(255,255,255,.05)", border: `1px solid rgba(184,151,74,.35)`,
                borderRight: "none", color: CREAM, fontSize: 14, outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button onClick={go} style={{
            padding: "14px 24px", background: GOLD, color: NAVY,
            fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700,
            border: "none", cursor: "pointer", whiteSpace: "nowrap",
          }}>
            検索
          </button>
        </div>

        {/* Trending words */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TRENDING.map((word) => (
            <a key={word} href={`/search?q=${encodeURIComponent(word)}`} style={{
              fontSize: 10, letterSpacing: "0.06em",
              color: `rgba(245,240,232,.45)`, border: `1px solid rgba(255,255,255,.08)`,
              padding: "5px 12px", textDecoration: "none",
            }}>
              {word}
            </a>
          ))}
        </div>
      </section>

      {/* ── All Features ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>All Features</p>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {FEATURES.map(({ label, sub, href, color }) => (
            <Link key={href} href={href} style={{
              border: `1px solid rgba(184,151,74,.15)`,
              background: "rgba(255,255,255,.02)",
              padding: "20px", textDecoration: "none", display: "block",
              transition: "border-color .2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `rgba(184,151,74,.5)`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = `rgba(184,151,74,.15)`)}>
              <div style={{ width: "100%", height: 2, background: color, marginBottom: 14 }} />
              <p style={{ fontSize: 16, color: CREAM, fontFamily: "Georgia, serif", fontWeight: 300, marginBottom: 4 }}>
                {label}
              </p>
              <p style={{ fontSize: 11, color: MUTED, letterSpacing: "0.04em" }}>{sub}</p>
              <p style={{ fontSize: 10, color: GOLD, marginTop: 12, letterSpacing: "0.06em" }}>→ 見る</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{
        borderTop: `1px solid rgba(184,151,74,.12)`,
        maxWidth: 900, margin: "0 auto", padding: "48px 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>How It Works</p>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {[
            { num: "01", title: "キーワードを入力", body: "ブランド名や商品名を検索バーに入力" },
            { num: "02", title: "3つのフリマを比較", body: "メルカリ・ラクマ・ヤフオクを一括表示" },
            { num: "03", title: "定価と相場を把握", body: "楽天の新品価格を参考に適正価格を判断" },
          ].map(({ num, title, body }) => (
            <div key={num} style={{ display: "flex", gap: 16 }}>
              <span style={{
                fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 700,
                color: `rgba(184,151,74,.15)`, lineHeight: 1, flexShrink: 0,
              }}>
                {num}
              </span>
              <div>
                <p style={{ fontSize: 14, color: CREAM, marginBottom: 6, fontFamily: "Georgia, serif" }}>{title}</p>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand Teaser ── */}
      <section style={{
        borderTop: `1px solid rgba(184,151,74,.12)`,
        maxWidth: 900, margin: "0 auto", padding: "48px 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Tag Encyclopedia</p>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 8 }}>
            タグで読む、<em style={{ color: GOLD, fontStyle: "italic" }}>古着の年代。</em>
          </h2>
          <p style={{ fontSize: 13, color: `rgba(245,240,232,.5)`, lineHeight: 1.7, maxWidth: 480 }}>
            Levi&apos;sのBig E、ChampionのトリコタグからSupremeの偽物見分け方まで。
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginBottom: 20 }}>
          {[
            { name: "Levi's",        slug: "levis",        tag: "Big E / Small e",   color: "#1B4FBF" },
            { name: "Champion",      slug: "champion",     tag: "トリコタグ / バータグ", color: "#CC0000" },
            { name: "Ralph Lauren",  slug: "ralph-lauren", tag: "ポニータグ",          color: "#1A3A6B" },
            { name: "Supreme",       slug: "supreme",      tag: "Box Logo",           color: "#FF0000" },
          ].map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} style={{
              border: `1px solid rgba(184,151,74,.15)`, padding: "14px",
              textDecoration: "none", display: "block", background: "rgba(255,255,255,.02)",
            }}>
              <div style={{ width: "100%", height: 2, background: b.color, marginBottom: 12 }} />
              <p style={{ fontSize: 14, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 4 }}>{b.name}</p>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: "0.04em" }}>{b.tag}</p>
            </Link>
          ))}
        </div>
        <Link href="/brands" style={{
          display: "inline-block", fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", color: GOLD, textDecoration: "none",
          border: `1px solid rgba(184,151,74,.35)`, padding: "9px 20px",
        }}>
          タグ図鑑をすべて見る →
        </Link>
      </section>

      {/* ── Trend Teaser ── */}
      <section style={{
        borderTop: `1px solid rgba(184,151,74,.12)`,
        maxWidth: 900, margin: "0 auto", padding: "48px 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Trend Now</p>
          <div style={{ flex: 1, height: 1, background: `rgba(184,151,74,.2)` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {[
            { rank: 1, kw: "Levi's 501 80s USA製",       badge: "HOT" },
            { rank: 2, kw: "Champion リバースウィーブ 90s", badge: "HOT" },
            { rank: 3, kw: "カーハート デトロイト USA",    badge: "HOT" },
            { rank: 4, kw: "Adidas Samba",                badge: "UP"  },
            { rank: 5, kw: "POLO Ralph Lauren 90s",       badge: "NEW" },
          ].map(({ rank, kw, badge }) => (
            <a key={rank} href={`/search?q=${encodeURIComponent(kw)}`} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 16px", border: `1px solid rgba(255,255,255,.05)`,
              textDecoration: "none", background: "rgba(255,255,255,.02)",
            }}>
              <span style={{
                fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, width: 28, flexShrink: 0,
                color: rank <= 3 ? GOLD : `rgba(184,151,74,.25)`,
              }}>{rank}</span>
              <span style={{ flex: 1, fontSize: 13, color: `rgba(245,240,232,.8)` }}>{kw}</span>
              <span style={{
                fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "2px 7px", border: `1px solid`,
                color:       badge === "HOT" ? "#B84A1E" : badge === "NEW" ? GOLD : "#3A8A5A",
                borderColor: badge === "HOT" ? "rgba(184,74,30,.4)" : badge === "NEW" ? "rgba(184,151,74,.4)" : "rgba(58,138,90,.4)",
              }}>{badge}</span>
            </a>
          ))}
        </div>
        <Link href="/trend" style={{
          display: "inline-block", fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", color: GOLD, textDecoration: "none",
          border: `1px solid rgba(184,151,74,.35)`, padding: "9px 20px",
        }}>
          トレンドをすべて見る →
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid rgba(184,151,74,.1)`, padding: "28px 24px",
        textAlign: "center", marginTop: 20,
      }}>
        <p style={{ fontSize: 10, color: `rgba(245,240,232,.2)`, letterSpacing: "0.05em", marginBottom: 8 }}>
          © 2026 FURUGIRU — 古着フリマ一括比較サイト
        </p>
        <p style={{ fontSize: 10, color: `rgba(245,240,232,.15)`, letterSpacing: "0.04em" }}>
          本サイトはメルカリ・ラクマ・ヤフオクの公式サービスではありません。
        </p>
      </footer>
    </div>
  );
}
