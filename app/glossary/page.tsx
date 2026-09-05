"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GLOSSARY_TERMS, CATEGORY_LABEL, type GlossaryTerm } from "@/lib/glossary";
import { RAKUTEN_ROOM_URL } from "@/lib/rakuten";

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
  { label: "サイズガイド", href: "/size" },
  { label: "用語集",       href: "/glossary" },
  { label: "コンディション", href: "/condition" },
];

const CAT_COLOR: Record<GlossaryTerm["category"], string> = {
  tag:       GOLD,
  fabric:    "#22C55E",
  market:    "#3B82F6",
  brand:     "#A855F7",
  condition: "#EF4444",
};

const CATS = ["すべて", ...Object.keys(CATEGORY_LABEL)] as Array<"すべて" | GlossaryTerm["category"]>;

export default function GlossaryPage() {
  const [activeCat, setActiveCat] = useState<"すべて" | GlossaryTerm["category"]>("すべて");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return GLOSSARY_TERMS.filter((t) => {
      const catOk = activeCat === "すべて" || t.category === activeCat;
      const qOk = !q || t.term.toLowerCase().includes(q) || t.reading.includes(q) || t.description.includes(q);
      return catOk && qOk;
    });
  }, [activeCat, query]);

  const filterBtn = (active: boolean) => ({
    fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" as const,
    padding: "7px 12px", border: "1px solid", cursor: "pointer",
    background:  active ? "rgba(184,151,74,.1)" : "transparent",
    color:       active ? GOLD                  : MUTED,
    borderColor: active ? GOLD                  : "rgba(255,255,255,.07)",
    transition: "all .15s",
  });

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
        <nav style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              color: href === "/glossary" ? GOLD : MUTED, textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Vintage Glossary
          </p>
          <h1 style={{
            fontSize: "clamp(32px,6vw,52px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            ヴィンテージ<em style={{ color: GOLD, fontStyle: "italic" }}>用語集</em>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 520 }}>
            古着・ヴィンテージ市場で使われる専門用語を解説。タグの見分け方からフリマ用語まで。
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: 28 }}>
          <input
            type="text"
            placeholder="用語・読み・説明で検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "9px 14px", marginBottom: 12,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(184,151,74,.2)", color: CREAM,
              fontSize: 12, outline: "none", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CATS.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)} style={filterBtn(activeCat === c)}>
                {c === "すべて" ? "すべて" : CATEGORY_LABEL[c as GlossaryTerm["category"]]}
              </button>
            ))}
            <span style={{ fontSize: 10, color: MUTED, alignSelf: "center", marginLeft: 4 }}>
              {filtered.length}件
            </span>
          </div>
        </div>

        {/* Term list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {filtered.map((term) => {
            const cc = CAT_COLOR[term.category];
            return (
              <div key={term.term} style={{
                padding: "20px 24px",
                background: "rgba(255,255,255,.015)",
                border: "1px solid rgba(184,151,74,.08)",
                borderLeft: `3px solid ${cc}`,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ fontSize: 18, color: CREAM, fontFamily: "Georgia, serif", fontWeight: 300 }}>
                    {term.term}
                  </span>
                  <span style={{ fontSize: 11, color: MUTED }}>
                    {term.reading}
                  </span>
                  <span style={{
                    fontSize: 7, letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "2px 7px", border: `1px solid ${cc}55`, color: cc,
                  }}>
                    {CATEGORY_LABEL[term.category]}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.75 }}>
                  {term.description}
                </p>
                {term.related && term.related.length > 0 && (
                  <p style={{ fontSize: 10, color: MUTED, marginTop: 8 }}>
                    関連: {term.related.join("  ·  ")}
                  </p>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: "48px 0", textAlign: "center", color: MUTED, fontSize: 13 }}>
              該当する用語が見つかりませんでした
            </div>
          )}
        </div>
      </main>

      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px", textAlign: "center",
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。
        </p>
        <a href={RAKUTEN_ROOM_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(245,240,232,.25)", letterSpacing: "0.1em", textDecoration: "none" }}>
          楽天ROOM →
        </a>
      </footer>
    </div>
  );
}
