import { notFound } from "next/navigation";
import Link from "next/link";
import { BRANDS, getBrandBySlug, RARITY_LABEL, RARITY_COLOR } from "@/lib/brands";
import AdSense from "@/components/AdSense";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} タグ図鑑・偽物判別 | FURUGIRU`,
    description: `${brand.name}（${brand.nameJp}）の年代別タグの見分け方と偽物チェックポイントを詳しく解説。`,
  };
}

export default function BrandDetailPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-ink-DEFAULT px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-black text-ink-DEFAULT tracking-tighter hover:text-rust transition-colors">
            FURUGIRU
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/brands" className="font-body text-sm text-ink-muted hover:text-ink-DEFAULT transition-colors">
              ← タグ図鑑一覧
            </Link>
          </div>
        </div>
      </header>

      {/* Brand hero */}
      <div className="border-b-2 border-ink-DEFAULT/10">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: brand.color }}
        />
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] text-ink-faint tracking-widest uppercase mb-3">
                {brand.country} / {brand.founded}創業
              </p>
              <h1 className="font-display text-5xl lg:text-7xl font-black text-ink-DEFAULT tracking-tight leading-none mb-3">
                {brand.name}
              </h1>
              <p className="font-display text-xl text-ink-muted mb-4">{brand.nameJp}</p>
              <p className="font-body text-base text-ink-muted leading-relaxed max-w-xl">
                {brand.description}
              </p>
            </div>

            {/* Quick search links */}
            <div className="shrink-0 flex flex-col gap-2">
              <p className="font-mono text-[10px] text-ink-faint tracking-widest uppercase">
                フリマで探す
              </p>
              {[
                { name: "メルカリ", url: `https://jp.mercari.com/search?keyword=${encodeURIComponent(brand.name + " ヴィンテージ")}&status=on_sale`, color: "#E84033" },
                { name: "ラクマ", url: `https://fril.jp/search?query=${encodeURIComponent(brand.name + " 古着")}`, color: "#009AB5" },
                { name: "ヤフオク", url: `https://auctions.yahoo.co.jp/search/search?p=${encodeURIComponent(brand.name)}`, color: "#CC0033" },
              ].map((m) => (
                <a
                  key={m.name}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-4 py-2 border-2 border-ink-DEFAULT bg-cream-50
                    hover:shadow-[3px_3px_0_#1C1509] transition-all text-sm font-body"
                  style={{ color: m.color }}
                >
                  <span>{m.name}で検索</span>
                  <span className="font-mono text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {/* Ad */}
        <div className="mb-10">
          <AdSense slot="8888888888" format="horizontal" className="w-full" />
        </div>

        {/* Tag eras timeline */}
        <section className="mb-14">
          <div className="divider mb-8">TAG HISTORY &amp; ERA GUIDE</div>
          <h2 className="font-display text-3xl font-bold text-ink-DEFAULT mb-8">
            年代別タグの見分け方
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-ink-DEFAULT/10 hidden sm:block" />

            <div className="flex flex-col gap-8">
              {brand.tagEras.map((era, i) => (
                <div key={i} className="relative sm:pl-16">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-3 top-6 w-4 h-4 border-2 border-ink-DEFAULT bg-cream-100 hidden sm:block"
                    style={{ backgroundColor: i === 0 ? brand.color : undefined }}
                  />

                  <div className="border-2 border-ink-DEFAULT bg-cream-50 shadow-[4px_4px_0_#1C1509]">
                    {/* Era header */}
                    <div
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4 border-b-2 border-ink-DEFAULT/10"
                      style={{ borderLeftColor: brand.color, borderLeftWidth: 4 }}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-display text-xl font-bold text-ink-DEFAULT">
                            {era.era}
                          </span>
                          <span
                            className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border"
                            style={{
                              color: RARITY_COLOR[era.rarity],
                              borderColor: RARITY_COLOR[era.rarity],
                            }}
                          >
                            {RARITY_LABEL[era.rarity]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-ink-faint">{era.years}</span>
                          <span className="font-body text-sm font-medium text-ink-light">
                            {era.tagName}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[10px] text-ink-faint uppercase tracking-widest mb-0.5">相場</p>
                        <p className="font-display text-lg font-bold text-rust">{era.priceRange}</p>
                      </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-ink-faint mb-3 flex items-center gap-2">
                          <span className="text-olive-DEFAULT">●</span> タグの特徴
                        </h4>
                        <ul className="space-y-2">
                          {era.features.map((f, j) => (
                            <li key={j} className="flex items-start gap-2 font-body text-sm text-ink-light leading-snug">
                              <span className="text-olive-DEFAULT mt-0.5 shrink-0">—</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Authentic markers */}
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-ink-faint mb-3 flex items-center gap-2">
                          <span className="text-olive-DEFAULT">●</span> 本物の証明
                        </h4>
                        <ul className="space-y-2">
                          {era.authenticMarkers.map((m, j) => (
                            <li key={j} className="flex items-start gap-2 font-body text-sm text-ink-light leading-snug">
                              <span className="text-olive-DEFAULT mt-0.5 shrink-0">✓</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Fake warnings */}
                      <div className="bg-rust-pale border border-rust/20 p-4">
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-rust mb-3 flex items-center gap-2">
                          <span>⚠</span> 偽物の特徴
                        </h4>
                        <ul className="space-y-2">
                          {era.fakeWarnings.map((w, j) => (
                            <li key={j} className="flex items-start gap-2 font-body text-sm text-rust/80 leading-snug">
                              <span className="text-rust mt-0.5 shrink-0 font-bold">!</span>
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid ad */}
        <div className="mb-14">
          <AdSense slot="9999999999" format="horizontal" className="w-full" />
        </div>

        {/* General fake tips */}
        <section className="mb-14">
          <div className="divider mb-8">COUNTERFEIT DETECTION GUIDE</div>
          <h2 className="font-display text-3xl font-bold text-ink-DEFAULT mb-6">
            {brand.name} 偽物判別の総まとめ
          </h2>

          <div className="border-2 border-rust bg-rust-pale">
            <div className="px-6 py-4 border-b-2 border-rust/30">
              <p className="font-mono text-xs text-rust tracking-widest uppercase">
                ⚠ 購入前に必ずチェック
              </p>
            </div>
            <ul className="divide-y divide-rust/10">
              {brand.generalFakeTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-4 px-6 py-4">
                  <span className="font-display text-2xl font-black text-rust/30 leading-none shrink-0 w-8 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-base text-ink-light leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Search tips */}
        <section className="mb-14">
          <div className="divider mb-8">SEARCH TIPS</div>
          <h2 className="font-display text-3xl font-bold text-ink-DEFAULT mb-6">
            フリマ検索のコツ
          </h2>

          <div className="border-2 border-ink-DEFAULT bg-cream-50">
            <ul className="divide-y divide-ink-DEFAULT/10">
              {brand.searchTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-4 px-6 py-4">
                  <span className="font-mono text-[10px] text-ink-faint tracking-widest shrink-0 mt-1">
                    TIP{i + 1}
                  </span>
                  <p className="font-body text-base text-ink-light leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Other brands */}
        <section>
          <div className="divider mb-6">OTHER BRANDS</div>
          <div className="flex flex-wrap gap-3">
            {BRANDS.filter((b) => b.slug !== brand.slug).map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="flex items-center gap-2 px-4 py-2 border-2 border-ink-DEFAULT bg-cream-50
                  hover:shadow-[3px_3px_0_#1C1509] transition-all font-body text-sm text-ink-DEFAULT"
              >
                <span
                  className="w-2 h-2 inline-block"
                  style={{ backgroundColor: b.color }}
                />
                {b.name}
              </Link>
            ))}
            <Link
              href="/brands"
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-ink-DEFAULT/30
                font-body text-sm text-ink-muted hover:text-ink-DEFAULT transition-colors"
            >
              一覧へ →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-ink-DEFAULT/10 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-[10px] text-ink-faint">
            © 2026 FURUGIRU — 掲載情報は参考です。購入の最終判断はご自身でお願いします。
          </p>
        </div>
      </footer>
    </div>
  );
}
