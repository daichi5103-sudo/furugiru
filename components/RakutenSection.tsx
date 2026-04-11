"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RakutenItem } from "@/lib/rakuten";

function Skeleton() {
  return (
    <div className="border-2 border-ink-DEFAULT/20 p-4 bg-cream-50">
      <div className="skeleton w-full h-28 mb-3" />
      <div className="skeleton h-3.5 w-full mb-2 rounded-sm" />
      <div className="skeleton h-3.5 w-2/3 mb-4 rounded-sm" />
      <div className="skeleton h-5 w-1/3 rounded-sm" />
    </div>
  );
}

export default function RakutenSection({ keyword }: { keyword: string }) {
  const [items, setItems] = useState<RakutenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/rakuten?keyword=${encodeURIComponent(keyword)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setItems(d.items ?? []);
      })
      .catch(() => setError("取得できませんでした"))
      .finally(() => setLoading(false));
  }, [keyword]);

  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="font-display text-2xl font-bold text-ink-DEFAULT">楽天市場 — 新品価格</h2>
        <span className="font-mono text-[10px] tracking-widest text-ink-faint uppercase border border-ink-faint/40 px-2 py-0.5">
          定価参考
        </span>
      </div>

      {error && (
        <p className="font-body text-sm text-ink-muted py-6 text-center border border-dashed border-ink-DEFAULT/20">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
          : items.map((item, i) => (
              <a
                key={i}
                href={item.itemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-ink-DEFAULT/20 hover:border-ink-DEFAULT bg-cream-50 p-4
                  hover:shadow-[4px_4px_0_#1C1509] transition-all duration-200 flex flex-col"
              >
                {item.mediumImageUrls?.[0]?.imageUrl ? (
                  <div className="relative w-full h-28 mb-3 bg-cream-200 overflow-hidden">
                    <Image
                      src={item.mediumImageUrls[0].imageUrl}
                      alt={item.itemName}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-28 mb-3 bg-cream-200 flex items-center justify-center">
                    <span className="font-display text-2xl text-ink-faint">楽</span>
                  </div>
                )}

                <p className="font-body text-sm text-ink-light line-clamp-2 mb-1 flex-1 leading-snug">
                  {item.itemName}
                </p>
                <p className="font-mono text-[10px] text-ink-faint mb-3 truncate">{item.shopName}</p>

                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xl font-bold text-rust">
                    ¥{item.itemPrice.toLocaleString()}
                  </span>
                  {item.reviewCount > 0 && (
                    <span className="font-mono text-[10px] text-ink-faint">
                      ★{item.reviewAverage.toFixed(1)} ({item.reviewCount})
                    </span>
                  )}
                </div>
              </a>
            ))}
      </div>

      <div className="mt-4 text-right">
        <a
          href={`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-ink-muted hover:text-rust underline underline-offset-4 tracking-wide"
        >
          楽天市場でもっと見る →
        </a>
      </div>
    </section>
  );
}
