"use client";

import { useState } from "react";
import Link from "next/link";
import { SIZE_GUIDES, CATEGORIES_MAP, type SizeGuide } from "@/lib/size-guide";
import { RAKUTEN_ROOM_URL } from "@/lib/rakuten";

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY  = "#0E1B2E";
const MUTED = "#5A6E85";

const NAV_LINKS = [
  { label: "タグ図鑑",       href: "/brands" },
  { label: "お手入れ",       href: "/care" },
  { label: "シミ取り",       href: "/care/stain" },
  { label: "古着屋を探す",   href: "/shops" },
  { label: "コラボ",         href: "/collabs" },
  { label: "トレンド",       href: "/trend" },
  { label: "サイズガイド",   href: "/size" },
  { label: "用語集",         href: "/glossary" },
  { label: "コンディション", href: "/condition" },
];

const ALL_CATS = ["すべて", "tops", "bottoms", "outerwear"] as const;
type CatFilter = typeof ALL_CATS[number];

function SizeTable({ guide }: { guide: SizeGuide }) {
  const hasChest    = guide.rows.some((r) => r.chest);
  const hasWaist    = guide.rows.some((r) => r.waist);
  const hasHip      = guide.rows.some((r) => r.hip);
  const hasLength   = guide.rows.some((r) => r.length);
  const hasInseam   = guide.rows.some((r) => r.inseam);
  const hasShoulder = guide.rows.some((r) => r.shoulder);

  const th = {
    padding: "8px 12px", fontSize: 8, letterSpacing: "0.12em",
    textTransform: "uppercase" as const, color: MUTED,
    background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(184,151,74,.15)",
    textAlign: "left" as const,
  };
  const td = (highlight = false) => ({
    padding: "8px 12px", fontSize: 12,
    color: highlight ? GOLD : "rgba(245,240,232,.7)",
    borderBottom: "1px solid rgba(255,255,255,.04)",
    fontWeight: highlight ? 600 : 400,
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={th}>サイズ</th>
            {hasChest    && <th style={th}>胸囲(cm)</th>}
            {hasWaist    && <th style={th}>ウエスト(cm)</th>}
            {hasHip      && <th style={th}>ヒップ(cm)</th>}
            {hasInseam   && <th style={th}>股下(cm)</th>}
            {hasShoulder && <th style={th}>肩幅(cm)</th>}
            {hasLength   && <th style={th}>着丈(cm)</th>}
            <th style={th}>日本サイズ目安</th>
          </tr>
        </thead>
        <tbody>
          {guide.rows.map((row) => (
            <tr key={row.label} style={{ transition: "background .1s" }}>
              <td style={td(true)}>{row.label}</td>
              {hasChest    && <td style={td()}>{row.chest ?? "—"}</td>}
              {hasWaist    && <td style={td()}>{row.waist ?? "—"}</td>}
              {hasHip      && <td style={td()}>{row.hip ?? "—"}</td>}
              {hasInseam   && <td style={td()}>{row.inseam ?? "—"}</td>}
              {hasShoulder && <td style={td()}>{row.shoulder ?? "—"}</td>}
              {hasLength   && <td style={td()}>{row.length ?? "—"}</td>}
              <td style={{ ...td(), color: MUTED, fontSize: 11 }}>
                {row.jpEquiv ?? "—"}
                {row.note && (
                  <span style={{ display: "block", fontSize: 9, color: "rgba(90,110,133,.7)", marginTop: 2 }}>
                    {row.note}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizePage() {
  const [catFilter, setCatFilter] = useState<CatFilter>("すべて");
  const [activeSlug, setActiveSlug] = useState(SIZE_GUIDES[0].slug);

  const filteredGuides = catFilter === "すべて"
    ? SIZE_GUIDES
    : SIZE_GUIDES.filter((g) => g.category === catFilter);

  const activeGuide = SIZE_GUIDES.find((g) => g.slug === activeSlug) ?? filteredGuides[0];

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
              color: href === "/size" ? GOLD : MUTED, textDecoration: "none",
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
            Vintage Size Guide
          </p>
          <h1 style={{
            fontSize: "clamp(32px,6vw,52px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            ヴィンテージ<em style={{ color: GOLD, fontStyle: "italic" }}>サイズガイド</em>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 560 }}>
            ヴィンテージ・古着のサイズは現代の規格と異なることがほとんど。
            ブランド・年代別の実寸を参考に選んでください。
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {ALL_CATS.map((c) => (
            <button key={c} onClick={() => { setCatFilter(c); setActiveSlug(filteredGuides[0]?.slug ?? ""); }} style={filterBtn(catFilter === c)}>
              {c === "すべて" ? "すべて" : CATEGORIES_MAP[c as SizeGuide["category"]]}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 2, alignItems: "start" }}>
          {/* Sidebar: brand list */}
          <div style={{ border: "1px solid rgba(184,151,74,.12)" }}>
            <p style={{ padding: "10px 14px", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, borderBottom: "1px solid rgba(184,151,74,.1)" }}>
              ブランド
            </p>
            {filteredGuides.map((g) => (
              <button
                key={g.slug}
                onClick={() => setActiveSlug(g.slug)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "11px 14px", border: "none", cursor: "pointer",
                  background: activeSlug === g.slug ? "rgba(184,151,74,.1)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,.04)",
                  borderLeft: activeSlug === g.slug ? `3px solid ${GOLD}` : "3px solid transparent",
                  transition: "all .12s",
                }}
              >
                <p style={{ fontSize: 11, color: activeSlug === g.slug ? GOLD : CREAM, lineHeight: 1.4 }}>{g.brand}</p>
                <p style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{CATEGORIES_MAP[g.category]}</p>
              </button>
            ))}
          </div>

          {/* Main: size table */}
          {activeGuide && (
            <div style={{ border: "1px solid rgba(184,151,74,.12)", background: "rgba(255,255,255,.01)" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(184,151,74,.1)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 4, textTransform: "uppercase" }}>
                  {CATEGORIES_MAP[activeGuide.category]}
                </p>
                <h2 style={{ fontSize: 20, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 4 }}>
                  {activeGuide.brand}
                </h2>
                <p style={{ fontSize: 11, color: MUTED }}>{activeGuide.era}</p>
              </div>

              {/* Era note */}
              <div style={{ padding: "12px 24px", background: "rgba(184,151,74,.04)", borderBottom: "1px solid rgba(184,151,74,.08)" }}>
                <p style={{ fontSize: 12, color: "rgba(245,240,232,.6)", lineHeight: 1.7 }}>
                  ⚠ {activeGuide.eraNote}
                </p>
              </div>

              {/* Table */}
              <div style={{ borderBottom: "1px solid rgba(184,151,74,.08)" }}>
                <SizeTable guide={activeGuide} />
              </div>

              {/* Tips */}
              <div style={{ padding: "16px 24px" }}>
                <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 10 }}>
                  購入時のコツ
                </p>
                {activeGuide.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ color: GOLD, fontSize: 10, flexShrink: 0, marginTop: 2 }}>▸</span>
                    <span style={{ fontSize: 12, color: "rgba(245,240,232,.6)", lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* General tips */}
        <div style={{ marginTop: 40, border: "1px solid rgba(184,151,74,.25)", background: "rgba(184,151,74,.04)", padding: "20px 24px" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 10, textTransform: "uppercase" }}>共通の注意点</p>
          {[
            "フリマでは「実寸」表記を必ず確認。タグサイズより実寸を優先してください。",
            "ヴィンテージ品は洗濯・経年変化によってすでに縮んでいる場合があります。",
            "US・UK・EUサイズはブランドによって基準が異なります。実寸㎝が最も信頼できます。",
            "女性がメンズヴィンテージを着る場合、胸囲・肩幅ではなく着丈・袖丈を重点チェック。",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < 3 ? 8 : 0 }}>
              <span style={{ color: GOLD, fontSize: 10, flexShrink: 0, marginTop: 3 }}>▸</span>
              <span style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.65 }}>{tip}</span>
            </div>
          ))}
        </div>
      </main>

      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px", textAlign: "center",
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 掲載情報は参考です。実際のサイズは商品により異なります。
        </p>
        <a href={RAKUTEN_ROOM_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(245,240,232,.25)", letterSpacing: "0.1em", textDecoration: "none" }}>
          楽天ROOM →
        </a>
      </footer>
    </div>
  );
}
