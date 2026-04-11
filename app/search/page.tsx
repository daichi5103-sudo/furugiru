import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import MarketCard from "@/components/MarketCard";
import RakutenSection from "@/components/RakutenSection";
import AdSense from "@/components/AdSense";
import { MARKETS } from "@/lib/markets";

interface Props {
  searchParams: { q?: string };
}

export function generateMetadata({ searchParams }: Props) {
  const q = searchParams.q || "";
  return {
    title: q ? `「${q}」の古着検索 | FURUGIRU` : "検索 | FURUGIRU",
    description: `「${q}」の古着をメルカリ・ラクマ・ヤフオクで一括比較。楽天市場の新品価格も確認。`,
  };
}

export default function SearchPage({ searchParams }: Props) {
  const keyword = (searchParams.q || "").trim();

  if (!keyword) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-ink-muted mb-4">キーワードが入力されていません</p>
          <Link href="/" className="font-mono text-xs text-rust underline underline-offset-4 tracking-wide">
            トップへ戻る →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 border-b-2 border-ink-DEFAULT bg-cream-100/95 backdrop-blur-sm px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <Link
            href="/"
            className="font-display text-xl font-black text-ink-DEFAULT tracking-tighter shrink-0 hover:text-rust transition-colors"
          >
            FURUGIRU
          </Link>
          <div className="flex-1 max-w-xl">
            <SearchBar defaultValue={keyword} size="md" />
          </div>
        </div>
      </header>

      {/* ── Top ad ── */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-5">
        <AdSense slot="3333333333" format="horizontal" className="w-full" />
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 flex flex-col gap-10">

        {/* ── Search title ── */}
        <div className="border-b-2 border-ink-DEFAULT pb-5">
          <p className="font-mono text-[10px] text-ink-faint tracking-widest uppercase mb-1">
            検索結果
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-black text-ink-DEFAULT leading-tight tracking-tight">
            &ldquo;{keyword}&rdquo;
          </h1>
        </div>

        {/* ── Flea market cards ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-display text-2xl font-bold text-ink-DEFAULT">
              フリマで探す
            </h2>
            <span className="font-mono text-[10px] text-ink-faint tracking-widest uppercase">
              3サイト一括
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MARKETS.map((market, i) => (
              <MarketCard key={market.id} market={market} keyword={keyword} index={i} />
            ))}
          </div>
        </section>

        {/* ── Mid ad ── */}
        <AdSense slot="4444444444" format="horizontal" className="w-full" />

        {/* ── Rakuten new prices ── */}
        <RakutenSection keyword={keyword} />

        {/* ── Tips ── */}
        <section className="border-2 border-ink-DEFAULT/20 p-6 bg-cream-50">
          <h2 className="font-display text-lg font-bold text-ink-DEFAULT mb-4">
            古着を買うときのチェックポイント
          </h2>
          <ul className="space-y-2">
            {[
              "楽天の新品価格と比べて、フリマ価格が適正かを確認しましょう",
              "商品の状態ランク（S〜C）を必ずチェック。写真の枚数も重要です",
              "ヴィンテージ品はタグや縫製で年代を確認するとより正確に判断できます",
              "複数のフリマを比較して最安値を見つけましょう",
              "出品者の評価・評判を必ず確認してから購入を検討しましょう",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-sm text-ink-muted">
                <span className="text-rust font-display font-bold mt-0.5 shrink-0">—</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Bottom ad ── */}
        <AdSense slot="5555555555" format="rectangle" className="w-full" />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-ink-DEFAULT/10 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="font-display text-lg font-black text-ink-DEFAULT tracking-tighter hover:text-rust transition-colors">
            FURUGIRU
          </Link>
          <div className="font-mono text-[10px] text-ink-faint text-center">
            <p>© 2026 FURUGIRU — 古着フリマ一括比較サイト</p>
            <p>本サイトはメルカリ・ラクマ・ヤフオクの公式サービスではありません。</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="font-mono text-[10px] text-ink-faint hover:text-ink-DEFAULT tracking-widest uppercase">利用規約</a>
            <a href="#" className="font-mono text-[10px] text-ink-faint hover:text-ink-DEFAULT tracking-widest uppercase">プライバシー</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
