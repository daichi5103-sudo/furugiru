import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import AdSense from "@/components/AdSense";
import { TRENDING } from "@/lib/markets";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="border-b-2 border-ink-DEFAULT px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-black text-ink-DEFAULT tracking-tighter">
              FURUGIRU
            </span>
            <span className="font-mono text-[10px] text-ink-faint tracking-widest uppercase hidden sm:block">
              古着フリマ一括比較
            </span>
          </div>
          <nav className="flex gap-6">
            <Link href="/brands" className="font-body text-sm text-ink-muted hover:text-ink-DEFAULT transition-colors">タグ図鑑</Link>
            <a href="#" className="font-body text-sm text-ink-muted hover:text-ink-DEFAULT transition-colors">使い方</a>
          </nav>
        </div>
      </header>

      {/* ── Top Ad Banner ── */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-5">
        <AdSense slot="1111111111" format="horizontal" className="w-full" />
      </div>

      {/* ── Hero ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6">
        <div className="pt-16 pb-12 lg:pt-24 lg:pb-16">
          {/* Eyebrow */}
          <div className="divider mb-8 max-w-xs">VINTAGE FLEA MARKET SEARCH</div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="font-display text-6xl lg:text-8xl font-black text-ink-DEFAULT leading-[0.9] mb-6 tracking-tight">
                古着の
                <br />
                <em className="italic text-rust not-italic">相場</em>を
                <br />
                一発で。
              </h1>
              <p className="font-body text-base text-ink-muted leading-relaxed max-w-sm mb-8">
                メルカリ・ラクマ・ヤフオクの検索結果を一括表示。
                楽天市場の新品価格で相場感もすぐ確認できます。
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <SearchBar autoFocus />
              <div>
                <p className="font-mono text-[10px] text-ink-faint tracking-widest uppercase mb-2">
                  人気の検索ワード
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((word) => (
                    <a
                      key={word}
                      href={`/search?q=${encodeURIComponent(word)}`}
                      className="font-body text-xs text-ink-muted border border-ink-DEFAULT/30 px-3 py-1.5
                        hover:border-ink-DEFAULT hover:text-ink-DEFAULT hover:shadow-[2px_2px_0_#1C1509]
                        transition-all"
                    >
                      {word}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── How it works ── */}
        <section className="py-12 border-t-2 border-ink-DEFAULT/10">
          <div className="divider mb-10">HOW IT WORKS</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "キーワードを入力", body: "ブランド名や商品名を検索バーに入力" },
              { num: "02", title: "3つのフリマを比較", body: "メルカリ・ラクマ・ヤフオクの一覧をチェック" },
              { num: "03", title: "定価と相場を把握", body: "楽天の新品価格を参考に適正価格を判断" },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-4">
                <span className="font-display text-5xl font-black text-ink-DEFAULT/10 leading-none shrink-0">
                  {num}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-lg font-bold text-ink-DEFAULT mb-1">{title}</h3>
                  <p className="font-body text-sm text-ink-muted leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tag Guide Teaser ── */}
        <section className="py-12 border-t-2 border-ink-DEFAULT/10">
          <div className="divider mb-8">TAG ENCYCLOPEDIA</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-4xl font-black text-ink-DEFAULT leading-tight mb-4">
                タグで読む、
                <br />
                <span className="text-rust italic">古着の年代。</span>
              </h2>
              <p className="font-body text-base text-ink-muted leading-relaxed mb-6">
                Levi&apos;sのBig E、ChampionのトリコタグからSupremeの偽物見分け方まで。
                ブランド別タグ図鑑で、古着を安心して買おう。
              </p>
              <Link
                href="/brands"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-ink-DEFAULT bg-ink-DEFAULT text-cream-100
                  font-display font-bold text-sm tracking-wider uppercase
                  hover:bg-rust hover:border-rust transition-colors shadow-[3px_3px_0_#B84A1E]"
              >
                タグ図鑑を見る →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Levi's", slug: "levis", tag: "Big E / Small e", color: "#1B4FBF" },
                { name: "Champion", slug: "champion", tag: "トリコタグ / バータグ", color: "#CC0000" },
                { name: "Ralph Lauren", slug: "ralph-lauren", tag: "ポニータグ", color: "#1A3A6B" },
                { name: "Supreme", slug: "supreme", tag: "Box Logo", color: "#FF0000" },
              ].map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="border-2 border-ink-DEFAULT bg-cream-50 p-4
                    hover:shadow-[4px_4px_0_#1C1509] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-full h-1 mb-3" style={{ backgroundColor: b.color }} />
                  <p className="font-display text-base font-bold text-ink-DEFAULT mb-1">{b.name}</p>
                  <p className="font-mono text-[10px] text-ink-faint">{b.tag}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom Ad ── */}
        <div className="py-8 border-t border-ink-DEFAULT/10">
          <AdSense slot="2222222222" format="rectangle" className="w-full" />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-ink-DEFAULT/10 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg font-black text-ink-DEFAULT tracking-tighter">FURUGIRU</span>
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
