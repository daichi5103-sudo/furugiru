"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { EVENTS, EVENT_AREAS, EVENT_CATEGORIES, type EventArea, type EventCategory } from "@/lib/events";

const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY = "#0E1B2E";
const MUTED = "#5A6E85";

const CATEGORY_COLOR: Record<EventCategory, string> = {
  "蚤の市": "#3A8A5A",
  "古着市": GOLD,
  "骨董市": "#7B5EA7",
  "ヴィンテージフェア": "#2A7AB5",
  "フリマ": "#C0784A",
};

function formatNextDate(dateStr?: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function isUpcoming(dateStr?: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) >= new Date();
}

export default function EventsPage() {
  const [areaFilter, setAreaFilter] = useState<EventArea | "すべて">("すべて");
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "すべて">("すべて");
  const [admissionFilter, setAdmissionFilter] = useState<"すべて" | "無料">("すべて");

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      if (areaFilter !== "すべて" && e.area !== areaFilter) return false;
      if (categoryFilter !== "すべて" && e.category !== categoryFilter) return false;
      if (admissionFilter === "無料" && e.admission !== "無料") return false;
      return true;
    }).sort((a, b) => {
      if (!a.nextDate && !b.nextDate) return 0;
      if (!a.nextDate) return 1;
      if (!b.nextDate) return -1;
      return new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime();
    });
  }, [areaFilter, categoryFilter, admissionFilter]);

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
        <Link href="/" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
          ← トップへ
        </Link>
      </header>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        {/* ヘッダー */}
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
          Vintage Events
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 8 }}>
          古着<em style={{ color: GOLD, fontStyle: "italic" }}>イベント</em>カレンダー
        </h1>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.5)", lineHeight: 1.8, marginBottom: 40, maxWidth: 560 }}>
          全国の骨董市・蚤の市・古着フェアをまとめました。お近くのイベントを探してみてください。
        </p>

        {/* フィルター */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
          {/* エリアフィルター */}
          <div>
            <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>エリア</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(["すべて", ...EVENT_AREAS] as const).map((area) => (
                <button key={area} onClick={() => setAreaFilter(area as EventArea | "すべて")} style={filterBtn(areaFilter === area)}>
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* カテゴリフィルター */}
          <div>
            <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>カテゴリ</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(["すべて", ...EVENT_CATEGORIES] as const).map((cat) => (
                <button key={cat} onClick={() => setCategoryFilter(cat as EventCategory | "すべて")} style={filterBtn(categoryFilter === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 入場料フィルター */}
          <div>
            <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>入場料</p>
            <div style={{ display: "flex", gap: 6 }}>
              {(["すべて", "無料"] as const).map((a) => (
                <button key={a} onClick={() => setAdmissionFilter(a)} style={filterBtn(admissionFilter === a)}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 件数 */}
        <p style={{ fontSize: 10, letterSpacing: "0.1em", color: MUTED, marginBottom: 20 }}>
          {filtered.length}件のイベント
        </p>

        {/* イベントリスト */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {filtered.map((event) => (
            <div key={event.id} style={{
              background: "rgba(255,255,255,.025)",
              border: `1px solid rgba(184,151,74,.1)`,
              padding: "20px 24px",
              display: "grid",
              gridTemplateColumns: "64px 1fr auto",
              gap: "0 20px",
              alignItems: "start",
            }}>
              {/* 次回日付 */}
              <div style={{ textAlign: "center" }}>
                {event.nextDate && isUpcoming(event.nextDate) ? (
                  <>
                    <p style={{ fontSize: 20, color: GOLD, fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 2 }}>
                      {formatNextDate(event.nextDate)}
                    </p>
                    <p style={{ fontSize: 8, letterSpacing: "0.1em", color: MUTED }}>
                      {new Date(event.nextDate).getFullYear()}
                    </p>
                  </>
                ) : (
                  <p style={{ fontSize: 11, color: MUTED }}>日程<br />調整中</p>
                )}
              </div>

              {/* メイン情報 */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: 8, letterSpacing: "0.12em", padding: "2px 7px",
                    border: `1px solid ${CATEGORY_COLOR[event.category]}`,
                    color: CATEGORY_COLOR[event.category],
                  }}>
                    {event.category}
                  </span>
                  <span style={{ fontSize: 9, letterSpacing: "0.12em", color: MUTED }}>
                    {event.area} / {event.venue}
                  </span>
                </div>

                <p style={{ fontSize: 16, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 6 }}>
                  {event.name}
                </p>

                <p style={{ fontSize: 11, color: "rgba(245,240,232,.5)", lineHeight: 1.6, marginBottom: 8 }}>
                  {event.description}
                </p>

                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, color: MUTED }}>
                    📅 {event.schedule}
                  </span>
                  <span style={{
                    fontSize: 9, color: event.admission === "無料" ? "#3A8A5A" : GOLD,
                  }}>
                    🎫 {event.admission}
                  </span>
                </div>

                {/* タグ */}
                <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                  {event.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 8, padding: "1px 6px", letterSpacing: "0.08em",
                      background: "rgba(184,151,74,.08)", color: "rgba(184,151,74,.6)",
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* リンク */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {event.url ? (
                  <a href={event.url} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: GOLD, textDecoration: "none",
                    border: `1px solid rgba(184,151,74,.3)`, padding: "6px 10px",
                    display: "inline-block",
                  }}>
                    公式 ↗
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: MUTED }}>
            <p style={{ fontSize: 14 }}>該当するイベントが見つかりませんでした</p>
          </div>
        )}

        {/* 免責 */}
        <p style={{ fontSize: 9, color: "rgba(90,110,133,.5)", marginTop: 48, lineHeight: 1.7, textAlign: "center" }}>
          ※ イベント情報は変更になる場合があります。参加前に必ず公式情報をご確認ください。
        </p>
      </section>
    </div>
  );
}

const filterBtn = (active: boolean): React.CSSProperties => ({
  fontSize: 9,
  letterSpacing: "0.1em",
  padding: "5px 10px",
  background: active ? GOLD : "transparent",
  color: active ? NAVY : MUTED,
  border: `1px solid ${active ? GOLD : "rgba(90,110,133,.3)"}`,
  cursor: "pointer",
  transition: "all .15s",
});
