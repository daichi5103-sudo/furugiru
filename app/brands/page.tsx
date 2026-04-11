import Link from "next/link";
import AdSense from "@/components/AdSense";
import BrandsClient from "@/components/BrandsClient";

export const metadata = {
  title: "ブランド別タグ図鑑 | FURUGIRU",
  description: "Levi's・Champion・Nike・Carhartt・Stone Island等のタグ変遷と偽物判別ガイド。ファッション・コスメカテゴリ対応。",
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-ink-DEFAULT px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-black text-ink-DEFAULT tracking-tighter hover:text-rust transition-colors">
            FURUGIRU
          </Link>
          <nav className="flex gap-6">
            <Link href="/brands" className="font-body text-sm text-ink-DEFAULT border-b-2 border-rust pb-0.5">タグ図鑑</Link>
            <Link href="/" className="font-body text-sm text-ink-muted hover:text-ink-DEFAULT transition-colors">フリマ比較</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-10">
          <div className="divider mb-6 max-w-xs">VINTAGE TAG ENCYCLOPEDIA</div>
          <h1 className="font-display text-5xl lg:text-6xl font-black text-ink-DEFAULT leading-tight tracking-tight mb-4">
            ブランド別
            <br />
            <span className="text-rust italic">タグ図鑑</span>
          </h1>
          <p className="font-body text-base text-ink-muted max-w-xl leading-relaxed">
            年代別タグの見分け方・偽物との違いを詳しく解説。
            ファッション・古着から今後はコスメ・アクセサリーも追加予定。
          </p>
        </div>

        <div className="mb-10">
          <AdSense slot="6666666666" format="horizontal" className="w-full" />
        </div>

        <BrandsClient />

        <div className="mt-10">
          <AdSense slot="7777777777" format="rectangle" className="w-full" />
        </div>
      </main>

      <footer className="border-t-2 border-ink-DEFAULT/10 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-[10px] text-ink-faint">
            © 2026 FURUGIRU — 掲載情報は参考であり、購入の最終判断はご自身でお願いします。
          </p>
        </div>
      </footer>
    </div>
  );
}
