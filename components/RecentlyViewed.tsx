"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "furugiru_recent";
const MAX_ITEMS = 6;

export interface RecentBrand {
  slug: string;
  name: string;
  nameJp: string;
  color: string;
  viewedAt: number; // Date.now()
}

// ── 読み書きユーティリティ ─────────────────────────────────────────────

export function recordView(brand: Omit<RecentBrand, "viewedAt">) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: RecentBrand[] = raw ? JSON.parse(raw) : [];
    // 同じslugを除去してから先頭に追加
    const filtered = list.filter((b) => b.slug !== brand.slug);
    const updated = [{ ...brand, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

function getRecent(): RecentBrand[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ── コンポーネント ────────────────────────────────────────────────────

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY  = "#0E1B2E";
const MUTED = "#5A6E85";

interface Props {
  /** "record" モード: マウント時に現在のブランドを記録する */
  mode: "record" | "display";
  currentBrand?: Omit<RecentBrand, "viewedAt">;
}

export default function RecentlyViewed({ mode, currentBrand }: Props) {
  const [recents, setRecents] = useState<RecentBrand[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mode === "record" && currentBrand) {
      recordView(currentBrand);
    }
    // displayモードまたはrecord後に一覧を取得
    setRecents(getRecent());
  }, [mode, currentBrand?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // SSR時はレンダリングしない（localStorage非対応）
  if (!mounted) return null;

  if (mode === "display") {
    // 表示モード：一覧を表示
    const displayList = recents;
    if (displayList.length === 0) return null;

    return (
      <section style={{ marginTop: 48 }}>
        <p style={{
          fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          color: MUTED, marginBottom: 16,
        }}>
          Recently Viewed
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {displayList.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 14px",
                background: "rgba(255,255,255,.02)",
                border: "1px solid rgba(184,151,74,.1)",
                borderLeft: `3px solid ${b.color}`,
                textDecoration: "none",
                transition: "background .12s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(184,151,74,.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.02)")}
            >
              <div>
                <p style={{ fontSize: 12, color: CREAM, lineHeight: 1 }}>{b.name}</p>
                <p style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{b.nameJp}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // recordモード：UIなし（記録のみ）
  return null;
}
