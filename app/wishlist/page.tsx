"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { COLLABS } from "@/components/CollabClient";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";

const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY = "#0E1B2E";
const MUTED = "#5A6E85";

export default function WishlistPage() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    setIds(getWishlist());
    const sync = () => setIds(getWishlist());
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, []);

  const items = COLLABS.filter((c) => ids.includes(c.id));
  const totalMarket = items.reduce((a, c) => a + c.market, 0);
  const totalOrig = items.reduce((a, c) => a + c.orig, 0);
  const gain = totalMarket - totalOrig;

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>
      <header style={{
        borderBottom: `1px solid rgba(184,151,74,.2)`, padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: NAVY, position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <Link href="/collabs" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
          ← コラボ一覧へ
        </Link>
      </header>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
          My Collection
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 24 }}>
          欲しい<em style={{ color: GOLD, fontStyle: "italic" }}>リスト</em>
        </h1>

        {items.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", border: `1px dashed rgba(184,151,74,.2)` }}>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 16 }}>
              まだアイテムが追加されていません
            </p>
            <Link href="/collabs" style={{
              display: "inline-block", fontSize: 10, letterSpacing: "0.15em",
              textTransform: "uppercase", color: GOLD, textDecoration: "none",
              border: `1px solid rgba(184,151,74,.35)`, padding: "10px 22px",
            }}>
              コラボ一覧を見る →
            </Link>
          </div>
        ) : (
          <>
            {/* サマリー */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 10, marginBottom: 28,
            }}>
              {[
                ["登録数",       `${items.length}点`,                      CREAM],
                ["定価合計",     `¥${totalOrig.toLocaleString()}`,          MUTED],
                ["相場合計",     `¥${totalMarket.toLocaleString()}`,        GOLD],
                ["総差額",       `${gain >= 0 ? "+" : ""}¥${gain.toLocaleString()}`, gain >= 0 ? "#3A8A5A" : "#DC2626"],
              ].map(([label, value, color]) => (
                <div key={label} style={{ background: "rgba(255,255,255,.03)", border: `1px solid rgba(184,151,74,.12)`, padding: "14px" }}>
                  <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>{label}</p>
                  <p style={{ fontSize: 16, color, fontFamily: "Georgia, serif" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* リスト */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {items.map((c) => (
                <div key={c.id} style={{
                  border: `1px solid rgba(184,151,74,.12)`,
                  background: "rgba(255,255,255,.02)", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ height: 140, position: "relative", background: "rgba(20,30,50,.5)" }}>
                    {c.imageUrl && (
                      <Image src={c.imageUrl} alt={c.name} fill style={{ objectFit: "cover" }} unoptimized />
                    )}
                  </div>
                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>{c.brands}</p>
                    <p style={{ fontSize: 12, color: CREAM, marginBottom: 8, lineHeight: 1.4 }}>{c.name}</p>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderTop: `1px solid rgba(184,151,74,.08)`, paddingTop: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 9, color: "rgba(245,240,232,.2)" }}>定価¥{c.orig.toLocaleString()}</span>
                      <span style={{ fontSize: 14, color: GOLD, fontFamily: "Georgia, serif" }}>¥{c.market.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(c.id)}
                      style={{
                        width: "100%", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                        padding: "7px 0", background: "transparent", color: MUTED,
                        border: `1px solid rgba(255,255,255,.07)`, cursor: "pointer",
                      }}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
