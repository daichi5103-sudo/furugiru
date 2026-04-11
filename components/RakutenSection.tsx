"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RakutenItem } from "@/lib/rakuten";

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const MUTED = "#5A6E85";

function Skeleton() {
  return (
    <div style={{
      border: "1px solid rgba(184,151,74,.2)",
      background: "rgba(255,255,255,.03)",
      padding: 16,
    }}>
      <div style={{ width: "100%", height: 112, background: "rgba(255,255,255,.05)", marginBottom: 12, animation: "pulse 2s infinite" }} />
      <div style={{ height: 12, width: "100%", background: "rgba(255,255,255,.05)", marginBottom: 8, borderRadius: 2 }} />
      <div style={{ height: 12, width: "60%", background: "rgba(255,255,255,.05)", marginBottom: 16, borderRadius: 2 }} />
      <div style={{ height: 20, width: "40%", background: "rgba(255,255,255,.05)", borderRadius: 2 }} />
    </div>
  );
}

export default function RakutenSection({ keyword }: { keyword: string }) {
  const [items, setItems] = useState<RakutenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/rakuten?keyword=${encodeURIComponent(keyword)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setItems(d.items ?? []);
      })
      .catch(() => setError("取得できませんでした"))
      .finally(() => setLoading(false));
  }, [keyword]);

  return (
    <section>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif" }}>
          楽天市場 — 新品価格
        </h2>
        <span style={{
          fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          padding: "2px 8px", border: "1px solid rgba(184,151,74,.25)", color: MUTED,
        }}>
          定価参考
        </span>
      </div>

      {error && (
        <p style={{ fontSize: 13, color: MUTED, padding: "24px 0", textAlign: "center", border: "1px dashed rgba(184,151,74,.2)" }}>
          {error}
        </p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
          : items.map((item, i) => (
              <a
                key={i}
                href={item.itemUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: "1px solid rgba(184,151,74,.2)",
                  background: "rgba(255,255,255,.03)",
                  padding: 16, textDecoration: "none",
                  display: "flex", flexDirection: "column",
                  fontFamily: "'Helvetica Neue', sans-serif",
                }}
              >
                {item.mediumImageUrls?.[0]?.imageUrl ? (
                  <div style={{ position: "relative", width: "100%", height: 112, marginBottom: 12, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
                    <Image
                      src={item.mediumImageUrls[0].imageUrl}
                      alt={item.itemName}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <div style={{ width: "100%", height: 112, marginBottom: 12, background: "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "rgba(184,151,74,.3)" }}>楽</span>
                  </div>
                )}

                <p style={{ fontSize: 12, color: "rgba(245,240,232,.7)", lineHeight: 1.5, marginBottom: 6, flex: 1,
                  overflow: "hidden", maxHeight: "3em" }}>
                  {item.itemName}
                </p>
                <p style={{ fontSize: 10, color: MUTED, marginBottom: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.shopName}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: GOLD }}>
                    ¥{item.itemPrice.toLocaleString()}
                  </span>
                  {item.reviewCount > 0 && (
                    <span style={{ fontSize: 10, color: MUTED }}>
                      ★{item.reviewAverage.toFixed(1)} ({item.reviewCount})
                    </span>
                  )}
                </div>
              </a>
            ))}
      </div>

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <a
          href={`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 11, color: MUTED, textDecoration: "underline", letterSpacing: "0.06em" }}
        >
          楽天市場でもっと見る →
        </a>
      </div>
    </section>
  );
}
