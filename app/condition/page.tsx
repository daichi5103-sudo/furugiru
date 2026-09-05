import Link from "next/link";
import type { Metadata } from "next";
import { RAKUTEN_ROOM_URL } from "@/lib/rakuten";

export const metadata: Metadata = {
  title: "古着コンディション基準 | FURUGIRU",
  description: "フリマアプリの古着S/A/B/C/Dランク評価の統一基準を解説。メルカリ・ヤフオク・ラクマで使われる状態表記の目安。",
};

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

const CONDITIONS = [
  {
    grade: "S",
    label: "未使用・デッドストック",
    color: "#22C55E",
    summary: "一切使用していない新品同様の状態。タグ付きが理想。",
    details: [
      "着用痕・洗濯痕が一切ない",
      "タグ（下げ札・ネームタグ）が付属している",
      "折り目・プレスが残っている",
      "においや変色がない",
    ],
    note: "「デッドストック（DS）」「未使用品」「新品同様」と表記されることが多い。タグなしでもS評価の場合あり。",
    marketImpact: "同条件のA評価より30〜100%高い相場になることが多い",
  },
  {
    grade: "A",
    label: "ほぼ未使用〜極美品",
    color: "#3B82F6",
    summary: "数回着用程度。注意して見ないとわからないレベルの使用感。",
    details: [
      "目立つ汚れ・ダメージがない",
      "わずかな着用感（軽微なシワなど）はある",
      "素材の風合いが保たれている",
      "においがない",
    ],
    note: "フリマで最も流通量が多いグレード。「美品」「ほぼ未使用」と表記されることが多い。",
    marketImpact: "標準的な相場の基準となるグレード",
  },
  {
    grade: "B",
    label: "良品・やや使用感あり",
    color: GOLD,
    summary: "使用感はあるが目立つダメージはない。普通に着用できる状態。",
    details: [
      "首元・袖口などに軽微な汚れやスレがある",
      "全体的に着用感・洗い感がある",
      "生地の毛羽立ち（ピリング）が少しある",
      "写真で確認できる程度の変色・色落ちがある",
    ],
    note: "ヴィンテージ品は「経年変化込み」でB評価になることが多い。状態説明の写真をよく確認すること。",
    marketImpact: "A評価より20〜40%程度低い相場になることが多い",
  },
  {
    grade: "C",
    label: "使用感あり・訳あり",
    color: "#F59E0B",
    summary: "使用感が明確にある。ダメージや汚れが写真で確認できる状態。",
    details: [
      "目立つ汚れ・シミがある（1〜2箇所）",
      "ほつれ・小さな穴がある",
      "色落ちやフェードが明確にある",
      "ニオイが残っている場合あり",
    ],
    note: "着用には問題ないが「訳あり」表記がつくことが多い。リメイク・クロップドなど加工用途での購入に向く。",
    marketImpact: "A評価より40〜60%低い相場が目安",
  },
  {
    grade: "D",
    label: "ジャンク・素材取り用",
    color: "#EF4444",
    summary: "そのままの着用が困難なレベルのダメージや汚れがある状態。",
    details: [
      "大きな穴・破れがある",
      "取れないシミ・広範囲の汚れ",
      "素材の著しい劣化（ゴム部分の硬化など）",
      "強いニオイがある",
    ],
    note: "「ジャンク品」「素材取り」として出品されることが多い。ヴィンテージ加工の素材や部品取りとしての需要がある。",
    marketImpact: "通常相場の10〜20%以下で取引されることが多い",
  },
];

const CHECK_POINTS = [
  {
    area: "首元・衿",
    checks: ["黄ばみ・汚れ輪ジミ", "スレ・薄れ", "伸び・ヨレ"],
  },
  {
    area: "袖口・脇",
    checks: ["汗ジミ・変色", "スレ・毛羽立ち", "縫製のほつれ"],
  },
  {
    area: "前面・背面",
    checks: ["プリント・刺繍の剥がれ", "ボタン・ジッパーの動作", "ポケットの汚れ"],
  },
  {
    area: "生地全体",
    checks: ["毛玉（ピリング）", "色落ち・退色", "虫食い・穴"],
  },
  {
    area: "裾・股下",
    checks: ["スレ・擦り切れ", "裾上げの跡", "ダメージ・フリンジ"],
  },
];

export default function ConditionPage() {
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
              color: href === "/condition" ? GOLD : MUTED, textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Condition Guide
          </p>
          <h1 style={{
            fontSize: "clamp(32px,6vw,52px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            古着<em style={{ color: GOLD, fontStyle: "italic" }}>コンディション</em>基準
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 560 }}>
            メルカリ・ヤフオク・ラクマなどフリマアプリの状態表記は出品者によってバラつきがあります。
            購入前に写真と説明文でしっかり確認しましょう。
          </p>
        </div>

        {/* Grade table */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
            グレード一覧
          </p>

          {/* Summary bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
            gap: 2, marginBottom: 32,
          }}>
            {CONDITIONS.map((c) => (
              <div key={c.grade} style={{
                padding: "12px 8px", textAlign: "center",
                background: `${c.color}15`,
                border: `1px solid ${c.color}40`,
              }}>
                <p style={{ fontSize: 24, fontFamily: "Georgia, serif", fontWeight: 300, color: c.color, marginBottom: 2 }}>{c.grade}</p>
                <p style={{ fontSize: 8, color: c.color, letterSpacing: "0.1em" }}>{c.label.split("・")[0]}</p>
              </div>
            ))}
          </div>

          {/* Detail cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {CONDITIONS.map((c) => (
              <div key={c.grade} style={{
                border: `1px solid ${c.color}30`,
                borderLeft: `4px solid ${c.color}`,
                background: "rgba(255,255,255,.015)",
              }}>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 28, fontFamily: "Georgia, serif", fontWeight: 300, color: c.color }}>{c.grade}</span>
                    <span style={{ fontSize: 15, color: CREAM, fontFamily: "Georgia, serif" }}>{c.label}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(245,240,232,.8)", marginBottom: 14, lineHeight: 1.6 }}>{c.summary}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                    <div>
                      <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>判断基準</p>
                      {c.details.map((d, i) => (
                        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                          <span style={{ color: c.color, fontSize: 10, flexShrink: 0, marginTop: 2 }}>▸</span>
                          <span style={{ fontSize: 11, color: "rgba(245,240,232,.65)", lineHeight: 1.5 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>相場への影響</p>
                      <p style={{ fontSize: 11, color: "rgba(245,240,232,.65)", lineHeight: 1.6, marginBottom: 10 }}>{c.marketImpact}</p>
                      <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>補足</p>
                      <p style={{ fontSize: 11, color: "rgba(245,240,232,.5)", lineHeight: 1.6 }}>{c.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Check points */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
            購入前チェックリスト
          </p>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,.5)", marginBottom: 20, lineHeight: 1.7 }}>
            写真や説明文で以下の箇所を必ず確認してから購入しましょう。不明な点は購入前にコメントで質問するのが安全です。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {CHECK_POINTS.map((cp) => (
              <div key={cp.area} style={{
                padding: "16px 18px",
                background: "rgba(255,255,255,.015)",
                border: "1px solid rgba(184,151,74,.08)",
              }}>
                <p style={{ fontSize: 10, letterSpacing: "0.12em", color: GOLD, marginBottom: 10, textTransform: "uppercase" }}>{cp.area}</p>
                {cp.checks.map((check, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                    <span style={{ color: MUTED, fontSize: 10, flexShrink: 0 }}>□</span>
                    <span style={{ fontSize: 12, color: "rgba(245,240,232,.6)" }}>{check}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{
          border: "1px solid rgba(184,151,74,.25)",
          background: "rgba(184,151,74,.04)",
          padding: "20px 24px",
        }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 8, textTransform: "uppercase" }}>Tips</p>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.75 }}>
            メルカリでは「売り切れ」フィルターで同じアイテムの過去の成約価格が確認できます。コンディションごとの相場感を掴むのに活用してください。
            ヤフオクでは落札価格の履歴が公開されているため、より詳細な相場データが取得できます。
          </p>
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
