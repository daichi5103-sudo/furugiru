"use client";
import { Market } from "@/lib/markets";

interface MarketCardProps {
  market: Market;
  keyword: string;
  index: number;
}

export default function MarketCard({ market, keyword, index }: MarketCardProps) {
  const delays = ["animate-fade-up", "animate-fade-up-delay-1", "animate-fade-up-delay-2"];

  return (
    <a
      href={market.searchUrl(keyword)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col gap-4 p-6 border-2 border-ink-DEFAULT bg-cream-50
        shadow-[4px_4px_0_#1C1509]
        hover:shadow-[7px_7px_0_#1C1509] hover:-translate-x-0.5 hover:-translate-y-0.5
        transition-all duration-200 ${delays[index] ?? ""}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 flex items-center justify-center border-2 border-ink-DEFAULT text-xl font-display font-black"
          style={{ background: market.bgColor, color: market.accentColor }}
        >
          {market.shortName}
        </div>
        <span className="font-mono text-[10px] tracking-widest text-ink-faint uppercase">
          外部リンク ↗
        </span>
      </div>

      {/* Market name */}
      <div>
        <h3 className="font-display text-2xl font-bold text-ink-DEFAULT leading-none mb-1">
          {market.name}
        </h3>
        <p className="font-body text-sm text-ink-muted">{market.tagline}</p>
      </div>

      {/* Query preview */}
      <div className="mt-auto border-t border-ink-DEFAULT/10 pt-4">
        <p className="font-mono text-xs text-ink-muted mb-2">検索ワード</p>
        <p className="font-body text-sm font-medium text-ink-DEFAULT truncate">
          &ldquo;{keyword}&rdquo;
        </p>
      </div>

      {/* CTA */}
      <div
        className="text-center py-2.5 text-sm font-display font-bold tracking-wider uppercase border-2 border-ink-DEFAULT
          group-hover:text-cream-50 transition-colors"
        style={{
          backgroundColor: "transparent",
          color: market.accentColor,
        }}
      >
        <span
          className="block group-hover:opacity-0 transition-opacity"
          style={{ color: market.accentColor }}
        >
          {market.name}で探す
        </span>
        <span className="block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          開く ↗
        </span>
      </div>
    </a>
  );
}
