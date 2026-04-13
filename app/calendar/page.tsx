import Link from "next/link";
import { fetchLotteryEvents, isSupabaseConfigured, LotteryEvent } from "@/lib/supabase";

export const metadata = {
  title: "抽選・発売カレンダー | FURUGIRU",
  description: "Nike・Supreme・Adidas等の人気スニーカー・コラボアイテムの抽選・発売日カレンダー。",
};

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

const TYPE_LABEL  = { lottery: "抽選", fcfs: "先着", release: "一般発売" };
const TYPE_COLOR  = { lottery: "#7C3AED", fcfs: "#DC2626", release: GOLD };
const STATUS_LABEL = { upcoming: "近日開始", open: "受付中", closed: "終了" };
const STATUS_COLOR = { upcoming: MUTED, open: "#3A8A5A", closed: "rgba(90,110,133,.4)" };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}（${"日月火水木金土".charAt(d.getDay())}）`;
}

export default async function CalendarPage() {
  const events = await fetchLotteryEvents();

  const grouped: Record<string, LotteryEvent[]> = {};
  events.forEach((ev) => {
    const key = ev.date.slice(0, 7); // "2026-04"
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  });

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>

      {/* ── Header ── */}
      <header style={{
        borderBottom: "1px solid rgba(184,151,74,.2)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: NAVY, position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Lottery &amp; Release Calendar
          </p>
          <h1 style={{
            fontSize: "clamp(36px,7vw,60px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            抽選・発売<em style={{ color: GOLD, fontStyle: "italic" }}>カレンダー</em>
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 520 }}>
            人気スニーカー・コラボアイテムの抽選・先着・一般発売日をまとめています。
          </p>
        </div>

        {/* ── Supabase未設定バナー ── */}
        {!isSupabaseConfigured && (
          <div style={{ border: "1px solid rgba(184,151,74,.3)", background: "rgba(184,151,74,.06)", padding: "12px 20px", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: GOLD, fontSize: 16 }}>ℹ</span>
            <p style={{ fontSize: 12, color: "rgba(245,240,232,.6)" }}>
              デモデータを表示中 — Supabaseを設定すると実際の抽選情報を管理・表示できます
            </p>
          </div>
        )}

        {/* ── 凡例 ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          {Object.entries(TYPE_LABEL).map(([key, label]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "2px 8px", border: "1px solid",
                color: TYPE_COLOR[key as keyof typeof TYPE_COLOR],
                borderColor: TYPE_COLOR[key as keyof typeof TYPE_COLOR],
              }}>{label}</span>
            </div>
          ))}
          {Object.entries(STATUS_LABEL).map(([key, label]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: STATUS_COLOR[key as keyof typeof STATUS_COLOR] }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLOR[key as keyof typeof STATUS_COLOR], display: "inline-block" }} />
              {label}
            </div>
          ))}
        </div>

        {/* ── イベント一覧 ── */}
        {Object.entries(grouped).map(([month, evs]) => (
          <section key={month} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
              <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>
                {new Date(month + "-01").toLocaleDateString("ja-JP", { year: "numeric", month: "long" })}
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(184,151,74,.2)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {evs.map((ev) => (
                <a key={ev.id} href={ev.url} target="_blank" rel="noopener noreferrer" style={{
                  border: `1px solid ${ev.status === "open" ? "rgba(58,138,90,.4)" : "rgba(184,151,74,.2)"}`,
                  background: ev.status === "open" ? "rgba(58,138,90,.05)" : "rgba(255,255,255,.02)",
                  padding: "16px 20px", textDecoration: "none",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: 16, alignItems: "center",
                }}>
                  {/* 日付 */}
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 300, color: ev.status === "open" ? "#3A8A5A" : GOLD, lineHeight: 1 }}>
                      {formatDate(ev.date)}
                    </p>
                    {ev.end_date && (
                      <p style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>〜 {formatDate(ev.end_date)}</p>
                    )}
                  </div>

                  {/* 内容 */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "1px 6px", border: "1px solid",
                        color: TYPE_COLOR[ev.type],
                        borderColor: TYPE_COLOR[ev.type],
                      }}>
                        {TYPE_LABEL[ev.type]}
                      </span>
                      <span style={{ fontSize: 10, color: MUTED }}>{ev.brands}</span>
                    </div>
                    <p style={{ fontSize: 15, color: CREAM, fontFamily: "Georgia, serif", fontWeight: 300, marginBottom: 4 }}>
                      {ev.title}
                    </p>
                    {ev.note && (
                      <p style={{ fontSize: 11, color: MUTED }}>{ev.note}</p>
                    )}
                  </div>

                  {/* 価格・ステータス */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {ev.price > 0 && (
                      <p style={{ fontFamily: "Georgia, serif", fontSize: 18, color: GOLD, marginBottom: 4 }}>
                        ¥{ev.price.toLocaleString()}
                      </p>
                    )}
                    <span style={{
                      fontSize: 9, letterSpacing: "0.1em",
                      color: STATUS_COLOR[ev.status],
                    }}>
                      ● {STATUS_LABEL[ev.status]}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        textAlign: "center", marginTop: 20,
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — 抽選情報は参考です。必ず公式サイトをご確認ください。
        </p>
      </footer>
    </div>
  );
}
