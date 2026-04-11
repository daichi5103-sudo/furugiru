"use client";
import { useState } from "react";
import Link from "next/link";
import { BRANDS, Brand } from "@/lib/brands";

const CATEGORIES = [
  { id: "all", label: "すべて" },
  { id: "fashion", label: "ファッション・古着" },
  { id: "cosmetics", label: "コスメ・美容" },
  { id: "accessories", label: "アクセサリー" },
];

export default function BrandsClient() {
  const [active, setActive] = useState("all");

  const filtered: Brand[] =
    active === "all" ? BRANDS : BRANDS.filter((b) => b.category === active);

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 border-2 font-body text-sm transition-all
                ${isActive
                  ? "border-ink-DEFAULT bg-ink-DEFAULT text-cream-100 shadow-[3px_3px_0_#B84A1E]"
                  : "border-ink-DEFAULT/30 text-ink-muted hover:border-ink-DEFAULT hover:text-ink-DEFAULT"
                }`}
            >
              {cat.label}
              <span className={`ml-2 font-mono text-xs ${isActive ? "text-cream-200" : "text-ink-faint"}`}>
                {cat.id === "all" ? BRANDS.length : BRANDS.filter((b) => b.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Brand grid */}
      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-ink-DEFAULT/20 py-16 text-center">
          <p className="font-mono text-xs text-ink-faint tracking-widest uppercase mb-2">Coming Soon</p>
          <p className="font-body text-sm text-ink-muted">このカテゴリは準備中です</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((brand, i) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group border-2 border-ink-DEFAULT bg-cream-50 p-6
                shadow-[4px_4px_0_#1C1509]
                hover:shadow-[7px_7px_0_#1C1509] hover:-translate-x-0.5 hover:-translate-y-0.5
                transition-all duration-200"
            >
              <div className="w-full h-1.5 mb-5" style={{ backgroundColor: brand.color }} />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-display text-2xl font-black text-ink-DEFAULT leading-none mb-1">
                    {brand.name}
                  </h2>
                  <p className="font-mono text-xs text-ink-faint tracking-widest">
                    {brand.country} / {brand.founded}創業
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-[10px] tracking-widest text-ink-faint border border-ink-DEFAULT/20 px-2 py-1 uppercase">
                    {brand.tagEras.length}時代
                  </span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 uppercase tracking-widest"
                    style={{
                      background: brand.category === "fashion" ? "#EAF0FF" : brand.category === "cosmetics" ? "#FFF0F5" : "#F0F7EA",
                      color: brand.category === "fashion" ? "#1A3A8F" : brand.category === "cosmetics" ? "#8F1A4A" : "#2A5C1A",
                    }}
                  >
                    {CATEGORIES.find((c) => c.id === brand.category)?.label}
                  </span>
                </div>
              </div>

              <p className="font-body text-sm text-ink-muted leading-relaxed mb-5 line-clamp-2">
                {brand.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {brand.tagEras.map((era) => (
                  <span
                    key={era.era}
                    className="font-mono text-[10px] px-2 py-0.5 border border-ink-DEFAULT/20 text-ink-muted"
                  >
                    {era.era}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-ink-DEFAULT/10 pt-4">
                <span className="font-body text-sm text-ink-muted">タグ図鑑・偽物判別を見る</span>
                <span className="font-mono text-xs text-rust group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Coming soon */}
      <div className="mt-6 border-2 border-dashed border-ink-DEFAULT/20 p-6 text-center">
        <p className="font-mono text-xs text-ink-faint tracking-widest uppercase mb-2">Coming Soon</p>
        <p className="font-body text-sm text-ink-muted">
          コスメ：CHANEL・MAC・NARS / アクセサリー：Tiffany・Cartier 等を順次追加予定
        </p>
      </div>
    </>
  );
}
