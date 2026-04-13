import Link from "next/link";
import AdSense from "@/components/AdSense";

export const metadata = {
  title: "古着トレンド | FURUGIRU",
  description: "今、古着界隈で流行っているもの。X（Twitter）トレンドとフリマ売れ筋。",
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
  { label: "カレンダー",   href: "/calendar" },
];

const TRENDS_GENERAL = [
  { kw: "Levi's 501 80s USA製",        meta: "メルカリ1,200件超",   badge: "hot" },
  { kw: "Champion リバースウィーブ 90s", meta: "ヤフオク入札急増",   badge: "hot" },
  { kw: "ナイキ センタースウッシュ",     meta: "X投稿数増加中",       badge: "up"  },
  { kw: "カーハート デトロイト USA",     meta: "2024–25冬トレンド",  badge: "hot" },
  { kw: "POLO Ralph Lauren 90s",        meta: "ラクマ売れ筋1位",     badge: "new" },
  { kw: "New Balance 990v3",            meta: "2024新作×ヴィンテージ", badge: "new" },
  { kw: "Adidas Samba",                 meta: "世界的トレンド継続",   badge: "hot" },
  { kw: "Stone Island 90s",            meta: "プレミア相場上昇中",   badge: "up"  },
];

const TRENDS_MARKET = [
  { kw: "Supreme Box Logo Hoodie",  meta: "平均¥65,000〜", badge: "hot" },
  { kw: "Nike Air Max 95 OG",       meta: "平均¥35,000〜", badge: "up"  },
  { kw: "Levi's Big E 501",         meta: "平均¥28,000〜", badge: "hot" },
  { kw: "Champion トリコタグ",       meta: "平均¥22,000〜", badge: "up"  },
  { kw: "Carhartt USA製 80s",       meta: "平均¥18,000〜", badge: "new" },
  { kw: "Off-White × Nike",         meta: "平均¥80,000〜", badge: "hot" },
  { kw: "Jordan 1 Retro High",      meta: "平均¥40,000〜", badge: "up"  },
  { kw: "NB 1300 Made in USA",      meta: "平均¥30,000〜", badge: "new" },
];

const X_LINKS = [
  { label: "#古着 #ヴィンテージ — 最新投稿",    url: "https://twitter.com/search?q=%23古着%20OR%20%23ヴィンテージ&src=typed_query&f=live" },
  { label: "#古着コーデ — コーディネート投稿",  url: "https://twitter.com/search?q=%23古着コーデ&src=typed_query&f=live" },
  { label: "#フリマ 古着 購入報告",             url: "https://twitter.com/search?q=%23フリマ%20古着%20購入&src=typed_query&f=live" },
  { label: "vintage fashion japan — 英語圏の投稿も", url: "https://twitter.com/search?q=vintage+fashion+japan&src=typed_query&f=live" },
  { label: "#古着屋 入荷情報",                  url: "https://twitter.com/search?q=%23古着屋%20入荷&src=typed_query&f=live" },
];

function badgeColor(badge: string) {
  if (badge === "hot") return { color: "#B84A1E", borderColor: "rgba(184,74,30,.4)" };
  if (badge === "new") return { color: GOLD,      borderColor: "rgba(184,151,74,.4)" };
  return                       { color: "#4CA85A", borderColor: "rgba(58,138,90,.4)"  };
}

export default function TrendPage() {
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
            <Link key={href} href={href} style={{
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              color: MUTED, textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 40 }}>

        {/* ── Hero ── */}
        <div>
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Trend — X &amp; Flea Market
          </p>
          <h1 style={{
            fontSize: "clamp(36px,7vw,60px)", fontWeight: 300, letterSpacing: "-0.02em",
            color: CREAM, lineHeight: 1.05, marginBottom: 12, fontFamily: "Georgia, serif",
          }}>
            今、<em style={{ color: GOLD, fontStyle: "italic" }}>古着界隈</em>で<br />流行っているもの
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, maxWidth: 520 }}>
            X（Twitter）の古着タグと各フリマの売れ筋からトレンドをまとめています。
          </p>
        </div>

        {/* ── Top Ad ── */}
        <AdSense slot="trend-top" format="horizontal" className="w-full" />

        {/* ── X links ── */}
        <section>
          <div style={{ border: "1px solid rgba(184,151,74,.2)", background: "rgba(184,151,74,.04)", padding: "14px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 36, height: 36, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: CREAM, fontFamily: "Georgia, serif", fontSize: 16, flexShrink: 0 }}>
              𝕏
            </div>
            <div>
              <p style={{ fontSize: 13, color: CREAM, marginBottom: 4 }}>X（Twitter）で古着トレンドをリアルタイムチェック</p>
              <p style={{ fontSize: 10, color: MUTED }}>各リンクから最新の投稿を確認できます</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {X_LINKS.map((x) => (
              <a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", border: "1px solid rgba(255,255,255,.06)",
                textDecoration: "none", fontSize: 13, color: "rgba(245,240,232,.65)",
              }}>
                <span>{x.label}</span>
                <span style={{ color: MUTED, fontSize: 11 }}>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Trend grids ── */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            { title: "古着界隈トレンド", sub: "2024–25", data: TRENDS_GENERAL },
            { title: "フリマ売れ筋",     sub: "集計参考値", data: TRENDS_MARKET },
          ].map(({ title, sub, data }) => (
            <div key={title} style={{ border: "1px solid rgba(184,151,74,.15)", background: "rgba(255,255,255,.02)" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(184,151,74,.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: CREAM }}>{title}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.1em", color: MUTED }}>{sub}</span>
              </div>
              {data.map((d, i) => {
                const bc = badgeColor(d.badge);
                return (
                  <a key={d.kw} href={`/search?q=${encodeURIComponent(d.kw)}`} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", textDecoration: "none",
                    borderBottom: i < data.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                  }}>
                    <span style={{
                      fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, width: 24, flexShrink: 0,
                      color: i < 3 ? GOLD : "rgba(184,151,74,.25)",
                    }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "rgba(245,240,232,.8)", marginBottom: 2 }}>{d.kw}</div>
                      <div style={{ fontSize: 10, color: MUTED }}>{d.meta}</div>
                    </div>
                    <span style={{
                      fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "2px 6px", border: "1px solid",
                      color: bc.color, borderColor: bc.borderColor,
                    }}>
                      {d.badge === "hot" ? "HOT" : d.badge === "new" ? "NEW" : "↑UP"}
                    </span>
                  </a>
                );
              })}
            </div>
          ))}
        </section>

        {/* ── Bottom Ad ── */}
        <AdSense slot="trend-bottom" format="rectangle" className="w-full" />
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid rgba(184,151,74,.1)", padding: "28px 24px",
        textAlign: "center", marginTop: 20,
      }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU — トレンド情報は参考値です。
        </p>
      </footer>
    </div>
  );
}
