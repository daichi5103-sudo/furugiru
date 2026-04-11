"use client";
import { useState } from "react";
import Link from "next/link";
import { BRANDS, Brand } from "@/lib/brands";

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const MUTED = "#5A6E85";

const CATEGORIES = [
  { id: "all", label: "すべて" },
  { id: "fashion", label: "ファッション・古着" },
  { id: "cosmetics", label: "コスメ・美容" },
  { id: "accessories", label: "アクセサリー" },
];

export default function BrandsClient() {
  const [active, setActive] = useState("all");

  const filtered: Brand[] =
    active === "all" ? BRANDS : BRANDS.filter((b) => b.category === active);

  return (
    <>
      {/* Category filter tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                padding: "8px 16px",
                border: isActive ? `1px solid ${GOLD}` : "1px solid rgba(184,151,74,.25)",
                background: isActive ? "rgba(184,151,74,.15)" : "rgba(255,255,255,.03)",
                color: isActive ? CREAM : MUTED,
                fontSize: 12, cursor: "pointer", letterSpacing: "0.04em",
                fontFamily: "'Helvetica Neue', sans-serif",
              }}
            >
              {cat.label}
              <span style={{ marginLeft: 8, fontSize: 10, color: isActive ? "rgba(245,240,232,.6)" : "rgba(90,110,133,.7)" }}>
                {cat.id === "all" ? BRANDS.length : BRANDS.filter((b) => b.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Brand grid */}
      {filtered.length === 0 ? (
        <div style={{
          border: "1px dashed rgba(184,151,74,.2)", padding: "64px 24px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>Coming Soon</p>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,.5)" }}>このカテゴリは準備中です</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {filtered.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              style={{
                border: "1px solid rgba(184,151,74,.2)",
                background: "rgba(255,255,255,.03)",
                padding: 24, textDecoration: "none", display: "block",
                transition: "border-color .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(184,151,74,.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(184,151,74,.2)")}
            >
              <div style={{ width: "100%", height: 2, background: brand.color, marginBottom: 20 }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 4 }}>
                    {brand.name}
                  </h2>
                  <p style={{ fontSize: 10, letterSpacing: "0.1em", color: MUTED }}>
                    {brand.country} / {brand.founded}創業
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "3px 8px", border: "1px solid rgba(184,151,74,.25)", color: MUTED,
                  }}>
                    {brand.tagEras.length}時代
                  </span>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "3px 8px",
                    background: "rgba(184,151,74,.1)",
                    color: GOLD,
                  }}>
                    {CATEGORIES.find((c) => c.id === brand.category)?.label}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.7, marginBottom: 20, overflow: "hidden", maxHeight: "3.4em" }}>
                {brand.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {brand.tagEras.map((era) => (
                  <span
                    key={era.era}
                    style={{
                      fontSize: 9, letterSpacing: "0.08em", padding: "3px 8px",
                      border: "1px solid rgba(184,151,74,.2)", color: MUTED,
                    }}
                  >
                    {era.era}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(184,151,74,.1)", paddingTop: 16 }}>
                <span style={{ fontSize: 12, color: MUTED }}>タグ図鑑・偽物判別を見る</span>
                <span style={{ fontSize: 12, color: GOLD, fontFamily: "Georgia, serif" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Coming soon */}
      <div style={{
        marginTop: 24, border: "1px dashed rgba(184,151,74,.2)", padding: 24, textAlign: "center",
      }}>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>Coming Soon</p>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.5)" }}>
          コスメ：CHANEL・MAC・NARS / アクセサリー：Tiffany・Cartier 等を順次追加予定
        </p>
      </div>
    </>
  );
}
