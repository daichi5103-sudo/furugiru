"use client";

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const MUTED = "#5A6E85";

interface MarketCardProps {
  name: string;
  shortName: string;
  tagline: string;
  accentColor: string;
  bgColor: string;
  searchUrl: string;
  keyword: string;
}

export default function MarketCard({ name, shortName, tagline, accentColor, bgColor, searchUrl, keyword }: MarketCardProps) {
  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", flexDirection: "column", gap: 16, padding: 24,
        border: "1px solid rgba(184,151,74,.2)", background: "rgba(255,255,255,.03)",
        textDecoration: "none", transition: "border-color .2s",
        fontFamily: "'Helvetica Neue', sans-serif",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(184,151,74,.5)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(184,151,74,.2)")}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(184,151,74,.25)", fontSize: 16, fontWeight: 700,
          background: bgColor, color: accentColor,
          fontFamily: "Georgia, serif",
        }}>
          {shortName}
        </div>
        <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED }}>
          外部リンク ↗
        </span>
      </div>

      {/* Market name */}
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 4 }}>
          {name}
        </h3>
        <p style={{ fontSize: 12, color: MUTED }}>{tagline}</p>
      </div>

      {/* Query preview */}
      <div style={{ borderTop: "1px solid rgba(184,151,74,.1)", paddingTop: 16, marginTop: "auto" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.08em", color: MUTED, marginBottom: 6 }}>検索ワード</p>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          &ldquo;{keyword}&rdquo;
        </p>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: "center", padding: "10px 0",
        border: `1px solid rgba(184,151,74,.25)`,
        fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        fontWeight: 700, color: GOLD,
      }}>
        {name}で探す
      </div>
    </a>
  );
}
