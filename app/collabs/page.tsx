import Link from "next/link";
import AdSense from "@/components/AdSense";
import CollabClient from "@/components/CollabClient";

export const metadata = {
  title: "コラボアーカイブ | FURUGIRU",
  description: "Nike×Supreme・Supreme×LV・Off-White×Nikeなど有名古着ブランドのコラボ一覧。フリマ相場付き。",
};

export default function CollabPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[rgba(184,151,74,0.2)] px-6 py-4 sticky top-0 bg-[#0E1B2E] z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-light tracking-[.2em] text-[#F5F0E8] hover:text-[#B8974A] transition-colors">
            FURU<span className="text-[#B8974A]">GIRU</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-[10px] tracking-widest uppercase text-[#5A6E85] hover:text-[#F5F0E8] transition-colors font-sans">検索</Link>
            <Link href="/collabs" className="text-[10px] tracking-widest uppercase text-[#B8974A] border-b border-[#B8974A] pb-0.5 font-sans">コラボ</Link>
            <Link href="/brands" className="text-[10px] tracking-widest uppercase text-[#5A6E85] hover:text-[#F5F0E8] transition-colors font-sans">タグ図鑑</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <p className="text-[9px] tracking-[.2em] uppercase text-[#B8974A] mb-2 font-sans">Collaboration Archive</p>
          <h1 className="text-5xl font-serif font-light tracking-tight text-[#F5F0E8] mb-3">
            有名ブランドの<em className="text-[#B8974A] italic">コラボ名鑑</em>
          </h1>
          <p className="text-sm text-[#5A6E85] leading-relaxed font-sans">
            定番の名作コラボから最新情報まで。フリマ相場付き。クリックしてフリマで探す。
          </p>
        </div>

        <div className="mb-8">
          <AdSense slot="collab-top" format="horizontal" className="w-full" />
        </div>

        <CollabClient />

        <div className="mt-10">
          <AdSense slot="collab-bottom" format="rectangle" className="w-full" />
        </div>
      </main>

      <footer className="border-t border-[rgba(184,151,74,0.1)] py-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[9px] text-[#5A6E85] tracking-widest uppercase font-sans">
            © 2026 FURUGIRU — 掲載情報は参考です。実際の取引価格は市場により異なります。
          </p>
        </div>
      </footer>
    </div>
  );
}
