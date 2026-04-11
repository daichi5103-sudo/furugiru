"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TRENDING } from "@/lib/markets";

interface SearchBarProps {
  defaultValue?: string;
  autoFocus?: boolean;
  size?: "lg" | "md";
}

export default function SearchBar({
  defaultValue = "",
  autoFocus = false,
  size = "lg",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const suggestions = TRENDING.filter((s) =>
    query ? s.toLowerCase().includes(query.toLowerCase()) : true
  ).slice(0, 6);

  const go = (val?: string) => {
    const q = (val ?? query).trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const isLg = size === "lg";

  return (
    <div className="relative w-full">
      <div
        className={`flex border-2 border-ink-DEFAULT bg-cream-50 overflow-visible rounded-none
          ${isLg ? "shadow-[5px_5px_0_#1C1509]" : "shadow-[3px_3px_0_#1C1509]"}
          focus-within:shadow-[5px_5px_0_#B84A1E] focus-within:border-rust
          transition-all duration-200`}
      >
        {/* Search icon */}
        <div className={`flex items-center pl-4 text-ink-muted`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <input
          ref={ref}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder={isLg ? "ブランド名・商品名を入力…" : "再検索…"}
          className={`flex-1 bg-transparent outline-none text-ink-DEFAULT placeholder-ink-faint font-body
            ${isLg ? "px-4 py-4 text-lg" : "px-3 py-3 text-base"}`}
        />

        <button
          onClick={() => go()}
          className={`bg-ink-DEFAULT text-cream-100 font-display font-bold tracking-wider
            hover:bg-rust transition-colors uppercase
            ${isLg ? "px-8 py-4 text-sm" : "px-5 py-3 text-xs"}`}
        >
          {isLg ? "検索" : "GO"}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 border-2 border-t-0 border-ink-DEFAULT bg-cream-50 shadow-[5px_5px_0_#1C1509]">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={() => { setQuery(s); go(s); }}
              className="w-full flex items-center gap-3 px-5 py-2.5 text-left font-body text-sm text-ink-DEFAULT hover:bg-rust-pale transition-colors border-b border-ink-DEFAULT/10 last:border-0"
            >
              <span className="text-ink-faint text-xs font-mono">↗</span>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
