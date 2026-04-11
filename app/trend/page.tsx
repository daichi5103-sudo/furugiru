import Link from "next/link";
import AdSense from "@/components/AdSense";

export const metadata = {
  title: "古着トレンド | FURUGIRU",
  description: "今、古着界隈で流行っているもの。X（Twitter）トレンドとフリマ売れ筋。",
};

const TRENDS_GENERAL = [
  { kw: "Levi's 501 80s USA製", meta: "メルカリ1,200件超", badge: "hot" },
  { kw: "Champion リバースウィーブ 90s", meta: "ヤフオク入札急増", badge: "hot" },
  { kw: "ナイキ センタースウッシュ", meta: "X投稿数増加中", badge: "up" },
  { kw: "カーハート デトロイト USA", meta: "2024–25冬トレンド", badge: "hot" },
  { kw: "POLO Ralph Lauren 90s", meta: "ラクマ売れ筋1位", badge: "new" },
  { kw: "New Balance 990v3", meta: "2024新作×ヴィンテージ", badge: "new" },
  { kw: "Adidas Samba", meta: "世界的トレンド継続", badge: "hot" },
  { kw: "Stone Island 90s", meta: "プレミア相場上昇中", badge: "up" },
];

const TRENDS_MARKET = [
  { kw: "Supreme Box Logo Hoodie", meta: "平均¥65,000〜", badge: "hot" },
  { kw: "Nike Air Max 95 OG", meta: "平均¥35,000〜", badge: "up" },
  { kw: "Levi's Big E 501", meta: "平均¥28,000〜", badge: "hot" },
  { kw: "Champion トリコタグ", meta: "平均¥22,000〜", badge: "up" },
  { kw: "Carhartt USA製 80s", meta: "平均¥18,000〜", badge: "new" },
  { kw: "Off-White × Nike", meta: "平均¥80,000〜", badge: "hot" },
  { kw: "Jordan 1 Retro High", meta: "平均¥40,000〜", badge: "up" },
  { kw: "NB 1300 Made in USA", meta: "平均¥30,000〜", badge: "new" },
];

const X_LINKS = [
  { label: "#古着 #ヴィンテージ — 最新投稿", url: "https://twitter.com/search?q=%23古着%20OR%20%23ヴィンテージ&src=typed_query&f=live" },
  { label: "#古着コーデ — コーディネート投稿", url: "https://twitter.com/search?q=%23古着コーデ&src=typed_query&f=live" },
  { label: "#フリマ 古着 購入報告", url: "https://twitter.com/search?q=%23フリマ%20古着%20購入&src=typed_query&f=live" },
  { label: "vintage fashion japan — 英語圏の投稿も", url: "https://twitter.com/search?q=vintage+fashion+japan&src=typed_query&f=live" },
  { label: "#古着屋 入荷情報", url: "https://twitter.com/search?q=%23古着屋%20入荷&src=typed_query&f=live" },
];

const badgeStyle: Record<string, string> = {
  hot: "border-[rgba(184,74,30,.35)] text-[#D4622A]",
  new: "border-[rgba(184,151,74,.35)] text-[#B8974A]",
  up:  "border-[rgba(58,138,90,.35)] text-[#4CA85A]",
};

export default function TrendPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[rgba(184,151,74,0.2)] px-6 py-4 sticky top-0 bg-[#0E1B2E] z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-light tracking-[.2em] text-[#F5F0E8] hover:text-[#B8974A] transition-colors">
            FURU<span className="text-[#B8974A]">GIRU</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-[10px] tracking-widest uppercase text-[#5A6E85] hover:text-[#F5F0E8] transition-colors font-sans">検索</Link>
            <Link href="/trend" className="text-[10px] tracking-widest uppercase text-[#B8974A] border-b border-[#B8974A] pb-0.5 font-sans">トレンド</Link>
            <Link href="/collabs" className="text-[10px] tracking-widest uppercase text-[#5A6E85] hover:text-[#F5F0E8] transition-colors font-sans">コラボ</Link>
            <Link href="/brands" className="text-[10px] tracking-widest uppercase text-[#5A6E85] hover:text-[#F5F0E8] transition-colors font-sans">タグ図鑑</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <p className="text-[9px] tracking-[.2em] uppercase text-[#B8974A] mb-2 font-sans">Trend — X & Flea Market</p>
          <h1 className="text-5xl font-serif font-light tracking-tight text-[#F5F0E8] mb-3">
            今、<em className="text-[#B8974A] italic">古着界隈</em>で<br />流行っているもの
          </h1>
          <p className="text-sm text-[#5A6E85] leading-relaxed font-sans">
            X（Twitter）の古着タグと各フリマの売れ筋からトレンドをまとめています。
          </p>
        </div>

        <div className="mb-8">
          <AdSense slot="trend-top" format="horizontal" className="w-full" />
        </div>

        {/* X links */}
        <div className="border border-[rgba(184,151,74,.2)] bg-[rgba(184,151,74,.04)] p-4 mb-6 flex items-center gap-4">
          <div className="w-9 h-9 bg-black flex items-center justify-center text-[#F5F0E8] font-serif text-base flex-shrink-0">𝕏</div>
          <div className="flex-1">
            <p className="text-sm text-[#F5F0E8] mb-1 font-sans">X（Twitter）で古着トレンドをリアルタイムチェック</p>
            <p className="text-[10px] text-[#5A6E85] font-sans">各リンクから最新の投稿を確認できます</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-10">
          {X_LINKS.map((x) => (
            <a
              key={x.url}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 border border-[rgba(255,255,255,.06)] text-sm font-sans text-[rgba(245,240,232,.65)] hover:border-[rgba(184,151,74,.3)] hover:bg-[rgba(184,151,74,.04)] transition-all"
            >
              <span>{x.label}</span>
              <span className="text-[#5A6E85] text-xs">↗</span>
            </a>
          ))}
        </div>

        {/* Trend grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {[
            { title: "古着界隈トレンド", sub: "2024–25", data: TRENDS_GENERAL },
            { title: "フリマ売れ筋", sub: "集計参考値", data: TRENDS_MARKET },
          ].map(({ title, sub, data }) => (
            <div key={title} className="border border-[rgba(184,151,74,.15)] bg-[rgba(255,255,255,.02)]">
              <div className="px-4 py-3 border-b border-[rgba(184,151,74,.1)] flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase text-[#F5F0E8] font-sans">{title}</span>
                <span className="text-[9px] tracking-widest uppercase text-[#5A6E85] font-sans">{sub}</span>
              </div>
              {data.map((d, i) => (
                <a
                  key={d.kw}
                  href={`/search?q=${encodeURIComponent(d.kw)}`}
                  className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,.04)] last:border-b-0 hover:bg-[rgba(184,151,74,.04)] transition-colors"
                >
                  <span className={`text-sm font-serif font-light w-5 flex-shrink-0 ${i < 3 ? "text-[#B8974A]" : "text-[#5A6E85]"}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm text-[rgba(245,240,232,.8)] font-sans">{d.kw}</div>
                    <div className="text-[10px] text-[#5A6E85] font-sans">{d.meta}</div>
                  </div>
                  <span className={`text-[8px] tracking-[.07em] uppercase px-1.5 py-0.5 border font-sans ${badgeStyle[d.badge]}`}>
                    {d.badge === "hot" ? "HOT" : d.badge === "new" ? "NEW" : "↑UP"}
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>

        <AdSense slot="trend-bottom" format="rectangle" className="w-full" />
      </main>

      <footer className="border-t border-[rgba(184,151,74,0.1)] py-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[9px] text-[#5A6E85] tracking-widest uppercase font-sans">
            © 2026 FURUGIRU — トレンド情報は参考値です。
          </p>
        </div>
      </footer>
    </div>
  );
}
