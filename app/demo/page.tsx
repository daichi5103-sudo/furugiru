import Link from "next/link";

export const metadata = {
  title: "FURUGIRU — デモ・機能紹介",
  description: "古着フリマ一括比較サイト FURUGIRU の全機能をデモで体験。メルカリ・ラクマ・ヤフオク比較、タグ図鑑、お手入れガイド、シミ取り、近くの古着屋検索。",
};

/* ─── mock data ──────────────────────────────── */
const DEMO_RESULTS = [
  { site: "メルカリ", color: "#E84033", bg: "#fff5f5", items: [
    { name: "Levi's 501 80s USA製 W32L30 ビッグE", price: 8800, cond: "良い" },
    { name: "Levi's 501 90sデッドストック W30", price: 12000, cond: "新品同様" },
    { name: "Levi's 501 USA製 赤耳セルビッジ", price: 22000, cond: "良い" },
  ]},
  { site: "ラクマ", color: "#009AB5", bg: "#f0fafc", items: [
    { name: "Levi's 501 80s 実寸W31 アメリカ製", price: 7500, cond: "目立った傷や汚れなし" },
    { name: "Levi's 501 ストレート W32 古着", price: 5200, cond: "やや傷や汚れあり" },
    { name: "Levi's 501 90s W30L30 シングルステッチ", price: 9800, cond: "良い" },
  ]},
  { site: "ヤフオク", color: "#CC0033", bg: "#fff0f3", items: [
    { name: "Levi's 501 BIG E 60年代 ビンテージ", price: 38000, cond: "現在8入札" },
    { name: "Levi's 501 赤耳 W33 USA製 80s", price: 15800, cond: "即決あり" },
    { name: "Levi's 501 0105 W34 90s アメリカ製", price: 6800, cond: "即決19,800円" },
  ]},
];

const DEMO_BRANDS = [
  { name: "Levi's", tag: "Big E → Small e 年代識別", color: "#1B4FBF", eras: ["1950年代〜: XX・Big E", "1971年〜: Small e", "1983年〜: 赤字タブ消える"] },
  { name: "Champion", tag: "トリコ・バー・Cタグ", color: "#CC0000", eras: ["1970s〜: トリコタグ（金・青・赤）", "1980s〜: バータグ（縦3本線）", "1990s〜: Cタグ（Cロゴ）"] },
  { name: "Supreme", tag: "Box Logo 偽物判別", color: "#FF0000", eras: ["フォント・ステッチ密度", "タグの白さ・肌触り", "縫製クオリティ"] },
  { name: "Ralph Lauren", tag: "ポニー刺繍・タグ年代", color: "#1A3A6B", eras: ["USA製タグ（1980s〜）", "サイジングタグの変化", "ポニー刺繍の密度・向き"] },
];

const DEMO_CARE = [
  { icon: "30", label: "30℃以下 手洗い推奨", color: "#3A8A5A" },
  { icon: "×", label: "漂白剤使用禁止", color: "#DC2626" },
  { icon: "□", label: "低温タンブル乾燥", color: "#D97706" },
  { icon: "♨", label: "低温アイロン可", color: "#2563EB" },
];

const DEMO_SHOPS = [
  { name: "Chicago 下北沢店", area: "東京・下北沢", rating: 4.6, tags: ["アメカジ", "USA古着", "ヴィンテージ"] },
  { name: "BIG TIME 梅田", area: "大阪・梅田", rating: 4.5, tags: ["目利き系", "高品質", "希少品"] },
  { name: "DEPT 天神", area: "福岡・天神", rating: 4.5, tags: ["九州最大級", "アメカジ"] },
];

const DEMO_STAINS = [
  { name: "醤油・食べ物", urgency: "今すぐ", rate: 85, color: "#B8974A" },
  { name: "ワイン・果汁", urgency: "今すぐ", rate: 70, color: "#7C3AED" },
  { name: "汗・黄ばみ", urgency: "なるべく早く", rate: 75, color: "#D97706" },
  { name: "カビ", urgency: "なるべく早く", rate: 60, color: "#3A8A5A" },
];

/* ─── section header ───────────────────────────── */
function SectionLabel({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-8">
      <div className="divider mb-3">{en}</div>
      <h2 className="font-display text-3xl lg:text-4xl font-black text-ink-DEFAULT">{ja}</h2>
    </div>
  );
}

/* ─── feature badge ───────────────────────────── */
function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block font-mono text-[9px] tracking-widest uppercase border border-ink-DEFAULT/30 px-2 py-0.5 text-ink-faint">
      {text}
    </span>
  );
}

/* ─── page ───────────────────────────────────── */
export default function DemoPage() {
  return (
    <div className="min-h-screen">

      {/* ═══ HEADER ═══════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b-2 border-ink-DEFAULT bg-[#F5EFE0]/95 backdrop-blur-sm px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-black text-ink-DEFAULT tracking-tighter">FURUGIRU</span>
            <Badge text="Demo" />
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="font-mono text-[10px] tracking-widest uppercase text-ink-muted hover:text-ink-DEFAULT transition-colors">
              ← 本サイトへ
            </Link>
          </nav>
        </div>
      </header>

      {/* ═══ HERO ══════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <div className="divider mb-8 max-w-sm">FURUGIRU — ALL FEATURES DEMO</div>
        <h1 className="font-display text-6xl lg:text-8xl font-black text-ink-DEFAULT leading-[0.88] tracking-tight mb-6">
          古着を、もっと<br />
          <em className="text-rust">賢く買う。</em>
        </h1>
        <p className="font-body text-lg text-ink-muted leading-relaxed max-w-xl mb-10">
          FURUGIRU は古着フリマの相場比較から、タグ年代判別・お手入れガイド・シミ取り・近くの古着屋検索まで
          ヴィンテージ古着をもっと楽しむための総合ツールです。
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "フリマ比較", href: "/search?q=Levi's 501" },
            { label: "タグ図鑑", href: "/brands" },
            { label: "お手入れ", href: "/care" },
            { label: "シミ取り", href: "/care/stain" },
            { label: "古着屋検索", href: "/care" },
            { label: "トレンド", href: "/trend" },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              className="font-body text-sm border-2 border-ink-DEFAULT px-4 py-2 hover:bg-ink-DEFAULT hover:text-cream-50 transition-all">
              {label} →
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURE 01 — FLEA MARKET SEARCH ══════ */}
      <section className="border-t-2 border-ink-DEFAULT/10 py-16 bg-cream-50/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <SectionLabel en="FEATURE 01 — FLEA MARKET SEARCH" ja="3サイト一括比較" />
            <Link href="/search?q=Levi's 501"
              className="shrink-0 font-mono text-xs text-rust underline underline-offset-4 tracking-wide self-start mt-2">
              実際に試す →
            </Link>
          </div>

          {/* Mock search bar */}
          <div className="flex border-2 border-ink-DEFAULT bg-cream-50 shadow-[5px_5px_0_#1C1509] mb-8 max-w-2xl">
            <div className="flex items-center pl-4 text-ink-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <div className="flex-1 px-4 py-4 font-body text-ink-DEFAULT text-lg">Levi&apos;s 501</div>
            <div className="bg-ink-DEFAULT text-cream-100 font-display font-bold px-8 py-4 text-sm uppercase tracking-wider">
              検索
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_RESULTS.map((market) => (
              <div key={market.site} className="border-2 border-ink-DEFAULT bg-cream-50 shadow-[4px_4px_0_#1C1509]">
                <div className="px-4 py-3 border-b-2 border-ink-DEFAULT flex items-center gap-2" style={{ backgroundColor: market.bg }}>
                  <div className="w-8 h-8 flex items-center justify-center border-2 border-ink-DEFAULT font-display font-black text-sm"
                    style={{ color: market.color }}>
                    {market.site[0]}
                  </div>
                  <span className="font-display font-bold text-ink-DEFAULT">{market.site}</span>
                </div>
                <div className="divide-y divide-ink-DEFAULT/10">
                  {market.items.map((item, i) => (
                    <div key={i} className="px-4 py-3">
                      <p className="font-body text-xs text-ink-DEFAULT line-clamp-2 mb-1 leading-snug">{item.name}</p>
                      <div className="flex items-baseline justify-between">
                        <span className="font-display text-lg font-bold" style={{ color: market.color }}>
                          ¥{item.price.toLocaleString()}
                        </span>
                        <span className="font-mono text-[9px] text-ink-faint">{item.cond}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-ink-DEFAULT/10">
                  <span className="font-mono text-[10px] text-ink-faint tracking-widest">デモデータ — 実際に検索で最新結果を確認</span>
                </div>
              </div>
            ))}
          </div>

          {/* Rakuten price band */}
          <div className="mt-4 border-2 border-ink-DEFAULT bg-cream-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint mb-1">楽天市場 — 新品定価</p>
              <p className="font-display text-2xl font-black text-ink-DEFAULT">¥12,100 〜 ¥19,800</p>
            </div>
            <div className="sm:ml-auto border border-ink-DEFAULT/20 px-4 py-3 bg-cream-100/60">
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint mb-1">フリマとの差額</p>
              <p className="font-display text-xl font-bold text-rust">最大 ¥13,000 お得</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE 02 — BRAND TAG GUIDE ══════════ */}
      <section className="border-t-2 border-ink-DEFAULT/10 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between mb-2 flex-wrap gap-4">
            <SectionLabel en="FEATURE 02 — TAG ENCYCLOPEDIA" ja="ブランド別タグ図鑑" />
            <Link href="/brands" className="shrink-0 font-mono text-xs text-rust underline underline-offset-4 tracking-wide self-start mt-2">
              全ブランドを見る →
            </Link>
          </div>
          <p className="font-body text-sm text-ink-muted mb-8 -mt-4">
            年代別タグの特徴・本物の証明ポイント・偽物チェックリスト付き
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DEMO_BRANDS.map((brand) => (
              <div key={brand.name} className="border-2 border-ink-DEFAULT bg-cream-50 shadow-[4px_4px_0_#1C1509] overflow-hidden">
                <div className="h-1.5 w-full" style={{ backgroundColor: brand.color }} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-black text-ink-DEFAULT leading-none mb-1">{brand.name}</h3>
                      <p className="font-mono text-[10px] text-ink-faint tracking-widest">{brand.tag}</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase border px-2 py-0.5"
                      style={{ color: brand.color, borderColor: brand.color }}>
                      年代識別
                    </span>
                  </div>
                  <div className="space-y-1.5 border-t border-ink-DEFAULT/10 pt-3">
                    {brand.eras.map((era, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="font-display font-black text-ink-DEFAULT/20 text-sm leading-none mt-0.5 w-5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-body text-sm text-ink-muted leading-snug">{era}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fake check box */}
          <div className="mt-5 border-2 border-rust bg-rust-pale p-5">
            <p className="font-mono text-[10px] tracking-widest uppercase text-rust mb-3">⚠ 偽物チェックリスト（Levi&apos;s 例）</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "赤タブ両面に「LEVI'S」大文字かを確認",
                "ステッチが均一すぎる場合は復刻・偽物の可能性",
                "隠しリベット（コインポケット内側）の有無",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-rust font-bold shrink-0 mt-0.5">!</span>
                  <span className="font-body text-sm text-rust/80 leading-snug">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE 03 — CARE GUIDE ════════════════ */}
      <section className="border-t-2 border-ink-DEFAULT/10 py-16 bg-[#0E1B2E]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-[rgba(184,151,74,0.3)]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#B8974A]">FEATURE 03 — CARE GUIDE</span>
                <div className="h-px flex-1 bg-[rgba(184,151,74,0.3)]" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-black text-[#F5F0E8]">古着お手入れガイド</h2>
            </div>
            <Link href="/care" className="shrink-0 font-mono text-xs text-[#B8974A] underline underline-offset-4 tracking-wide self-start mt-2">
              ガイドを見る →
            </Link>
          </div>

          {/* Material selector mock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "コットン", active: true, color: "#B8974A" },
              { label: "デニム", active: false, color: "#2563EB" },
              { label: "ウール", active: false, color: "#7C3AED" },
              { label: "ナイロン", active: false, color: "#3A8A5A" },
            ].map((mat) => (
              <div key={mat.label}
                className="border p-4 text-center cursor-pointer transition-all"
                style={{
                  border: `1px solid ${mat.active ? mat.color : "rgba(184,151,74,0.2)"}`,
                  background: mat.active ? `rgba(184,151,74,0.08)` : "rgba(255,255,255,0.02)",
                }}>
                <div className="font-mono text-[10px] tracking-widest uppercase mb-1"
                  style={{ color: mat.active ? mat.color : "#5A6E85" }}>
                  {mat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Care symbols */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {DEMO_CARE.map((c) => (
              <div key={c.icon} className="border border-[rgba(184,151,74,0.15)] bg-white/[0.02] p-4 text-center">
                <div className="w-12 h-12 border-2 flex items-center justify-center mx-auto mb-3 font-display text-xl font-black"
                  style={{ borderColor: c.color, color: c.color }}>
                  {c.icon}
                </div>
                <p className="font-sans text-[11px] text-[rgba(245,240,232,0.65)] leading-snug">{c.label}</p>
              </div>
            ))}
          </div>

          {/* Steps preview */}
          <div className="border border-[rgba(184,151,74,0.2)] bg-[rgba(184,151,74,0.04)] p-5">
            <p className="font-mono text-[9px] tracking-widest uppercase text-[#B8974A] mb-4">洗濯手順（コットン例）</p>
            <div className="flex flex-col gap-2">
              {[
                { step: "01", text: "30℃以下のぬるま湯を使用" },
                { step: "02", text: "おしゃれ着用中性洗剤で優しく手洗い" },
                { step: "03", text: "形を整えて陰干し（直射日光は色褪せの原因）" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <span className="font-display text-2xl font-black text-[rgba(184,151,74,0.3)] w-8 shrink-0">{s.step}</span>
                  <span className="font-sans text-sm text-[rgba(245,240,232,0.75)]">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE 04 — STAIN GUIDE ════════════════ */}
      <section className="border-t border-[rgba(184,151,74,0.15)] py-16 bg-[#0E1B2E]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-[rgba(184,151,74,0.3)]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#B8974A]">FEATURE 04 — STAIN REMOVAL</span>
                <div className="h-px flex-1 bg-[rgba(184,151,74,0.3)]" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-black text-[#F5F0E8]">シミ取りガイド</h2>
            </div>
            <Link href="/care/stain" className="shrink-0 font-mono text-xs text-[#B8974A] underline underline-offset-4 tracking-wide self-start mt-2">
              ガイドを見る →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {DEMO_STAINS.map((stain) => (
              <div key={stain.name} className="border border-[rgba(184,151,74,0.2)] bg-white/[0.02] p-4">
                <div className="w-10 h-10 border flex items-center justify-center mx-auto mb-3 font-display text-lg font-black"
                  style={{ borderColor: stain.color, color: stain.color }}>
                  {stain.name[0]}
                </div>
                <p className="font-sans text-[11px] text-[rgba(245,240,232,0.75)] text-center mb-2">{stain.name}</p>
                <p className="font-mono text-[9px] text-center mb-3" style={{ color: stain.urgency === "今すぐ" ? "#DC2626" : "#D97706" }}>
                  {stain.urgency}
                </p>
                {/* Progress bar */}
                <div>
                  <div className="h-1 bg-white/10 rounded-none mb-1">
                    <div className="h-full rounded-none transition-all" style={{ width: `${stain.rate}%`, background: stain.color }} />
                  </div>
                  <p className="font-mono text-[9px] text-[rgba(245,240,232,0.3)] text-right">除去率 {stain.rate}%</p>
                </div>
              </div>
            ))}
          </div>

          {/* Products preview */}
          <div className="border border-[rgba(184,151,74,0.15)] bg-white/[0.02] p-5">
            <p className="font-mono text-[9px] tracking-widest uppercase text-[#B8974A] mb-4">おすすめ商品（醤油・食べ物シミ例）</p>
            <div className="flex flex-col gap-3">
              {[
                { name: "固形石鹸（ウタマロ）", price: "¥200〜300", level: "お手軽品", where: "スーパー" },
                { name: "ワイドハイターEXパワー", price: "¥400〜800", level: "中級品", where: "ドラッグストア" },
                { name: "プロ用シミ抜き剤", price: "¥2,000〜", level: "専用品", where: "専門店・Amazon" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between gap-4 border-l-2 pl-3"
                  style={{ borderColor: i === 0 ? "#3A8A5A" : i === 1 ? "#D97706" : "#B8974A" }}>
                  <div>
                    <span className="font-sans text-sm text-[rgba(245,240,232,0.8)]">{p.name}</span>
                    <span className="font-mono text-[9px] text-[#5A6E85] ml-2">購入先：{p.where}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-sm text-[#B8974A]">{p.price}</span>
                    <span className="block font-mono text-[8px] text-[#5A6E85]">{p.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE 05 — SHOP FINDER ════════════════ */}
      <section className="border-t border-[rgba(184,151,74,0.15)] py-16 bg-[#0E1B2E]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-[rgba(184,151,74,0.3)]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#B8974A]">FEATURE 05 — SHOP FINDER</span>
                <div className="h-px flex-1 bg-[rgba(184,151,74,0.3)]" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-black text-[#F5F0E8]">近くの古着屋を探す</h2>
            </div>
            <Link href="/care" className="shrink-0 font-mono text-xs text-[#B8974A] underline underline-offset-4 tracking-wide self-start mt-2">
              実際に検索 →
            </Link>
          </div>

          {/* Search bar mock */}
          <div className="flex gap-2 mb-8 max-w-2xl">
            <div className="flex-1 border border-[rgba(184,151,74,0.3)] bg-white/[0.04] flex items-center px-4 gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A6E85" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span className="font-sans text-sm text-[rgba(245,240,232,0.4)]">エリア・地名を入力（例：下北沢、梅田…）</span>
            </div>
            <div className="px-6 py-3 bg-[#B8974A] text-[#0E1B2E] font-sans font-bold text-[10px] tracking-widest uppercase">
              検索
            </div>
          </div>

          {/* Area quick buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["下北沢", "渋谷", "高円寺", "梅田", "天神（福岡）", "大須（名古屋）"].map((area) => (
              <div key={area}
                className="font-sans text-[10px] tracking-widest text-[rgba(245,240,232,0.5)] border border-white/[0.08] px-3 py-1">
                {area}
              </div>
            ))}
          </div>

          {/* Shop cards */}
          <div className="flex flex-col gap-3">
            {DEMO_SHOPS.map((shop) => (
              <div key={shop.name} className="border border-[rgba(184,151,74,0.15)] bg-white/[0.02] p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-serif text-base font-light text-[#F5F0E8]">{shop.name}</h4>
                    <span className="font-mono text-[9px] tracking-widest text-[#5A6E85]">{shop.area}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {shop.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[8px] border border-[rgba(184,151,74,0.2)] text-[#B8974A] px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-amber-400 text-sm">{"★".repeat(Math.round(shop.rating))}{"☆".repeat(5 - Math.round(shop.rating))}</div>
                  <span className="font-display text-xl text-[#B8974A]">{shop.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
            <p className="font-mono text-[10px] text-[#5A6E85] text-center pt-2">
              ※ デモデータ。実際の検索ではGoogle Places APIで現在地周辺の店舗を取得
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE 06 — TREND ══════════════════════ */}
      <section className="border-t-2 border-ink-DEFAULT/10 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <SectionLabel en="FEATURE 06 — TREND TRACKER" ja="古着界隈トレンド" />
            <Link href="/trend" className="shrink-0 font-mono text-xs text-rust underline underline-offset-4 tracking-wide self-start mt-2">
              最新トレンドを見る →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { rank: 1, kw: "Levi's 501 80s USA製", badge: "HOT", meta: "メルカリ1,200件超" },
              { rank: 2, kw: "Champion リバースウィーブ 90s", badge: "HOT", meta: "ヤフオク入札急増" },
              { rank: 3, kw: "カーハート デトロイト USA", badge: "HOT", meta: "2024–25冬トレンド" },
              { rank: 4, kw: "Adidas Samba", badge: "↑UP", meta: "世界的トレンド継続" },
              { rank: 5, kw: "POLO Ralph Lauren 90s", badge: "NEW", meta: "ラクマ売れ筋1位" },
              { rank: 6, kw: "New Balance 990v3", badge: "NEW", meta: "2024新作×ヴィンテージ" },
            ].map((item) => (
              <Link key={item.rank} href={`/search?q=${encodeURIComponent(item.kw)}`}
                className="flex items-center gap-3 px-4 py-3 border border-ink-DEFAULT/10 bg-cream-50 hover:border-ink-DEFAULT hover:shadow-[2px_2px_0_#1C1509] transition-all">
                <span className={`font-display text-2xl font-black w-8 shrink-0 ${item.rank <= 3 ? "text-rust" : "text-ink-DEFAULT/20"}`}>
                  {item.rank}
                </span>
                <div className="flex-1">
                  <p className="font-body text-sm text-ink-DEFAULT">{item.kw}</p>
                  <p className="font-mono text-[10px] text-ink-faint">{item.meta}</p>
                </div>
                <span className={`font-mono text-[8px] tracking-widest uppercase px-1.5 py-0.5 border shrink-0
                  ${item.badge === "HOT" ? "text-rust border-rust/40" :
                    item.badge === "NEW" ? "text-[#B8974A] border-[#B8974A]/40" :
                    "text-[#3A8A5A] border-[#3A8A5A]/40"}`}>
                  {item.badge}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════ */}
      <section className="border-t-2 border-ink-DEFAULT py-20 bg-ink-DEFAULT">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-[10px] tracking-widest uppercase text-cream-200/50 mb-4">FURUGIRU — VINTAGE FLEA MARKET TOOL</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black text-cream-50 leading-tight mb-6">
            今すぐ<br /><em className="text-[#B84A1E]">古着を探す。</em>
          </h2>
          <p className="font-body text-base text-cream-200/70 mb-10 max-w-md mx-auto leading-relaxed">
            メルカリ・ラクマ・ヤフオクを横断検索して、相場より安い一点を見つけよう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/"
              className="font-display font-bold text-base tracking-wider uppercase px-10 py-4 bg-[#B84A1E] text-cream-50
                hover:bg-rust transition-colors shadow-[4px_4px_0_rgba(255,255,255,0.1)]">
              サイトへ →
            </Link>
            <Link href="/brands"
              className="font-display font-bold text-base tracking-wider uppercase px-10 py-4 border-2 border-cream-50/30 text-cream-50
                hover:border-cream-50 hover:bg-cream-50/5 transition-all">
              タグ図鑑
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ════════════════════════════════════ */}
      <footer className="border-t-2 border-ink-DEFAULT/10 py-8 bg-ink-DEFAULT">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg font-black text-cream-50 tracking-tighter">FURUGIRU</span>
          <p className="font-mono text-[10px] text-cream-50/30">
            © 2026 FURUGIRU — 本サイトはメルカリ・ラクマ・ヤフオクの公式サービスではありません。
          </p>
        </div>
      </footer>
    </div>
  );
}
