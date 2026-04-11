"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TRENDING } from "@/lib/markets";

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY  = "#0E1B2E";
const MUTED = "#5A6E85";

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
  const padY = isLg ? 14 : 10;
  const padX = isLg ? 16 : 12;
  const fontSize = isLg ? 15 : 13;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{
        display: "flex",
        border: `1px solid rgba(184,151,74,.35)`,
        background: "rgba(255,255,255,.05)",
        overflow: "visible",
      }}>
        {/* Search icon */}
        <div style={{ display: "flex", alignItems: "center", paddingLeft: 14 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2">
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
          style={{
            flex: 1, background: "transparent", outline: "none",
            color: CREAM, fontSize, padding: `${padY}px ${padX}px`,
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        />

        <button
          onClick={() => go()}
          style={{
            background: GOLD, color: NAVY,
            fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            fontSize: isLg ? 11 : 10,
            padding: `${padY}px ${isLg ? 24 : 16}px`,
            border: "none", cursor: "pointer", whiteSpace: "nowrap" as const,
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          {isLg ? "検索" : "GO"}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
          border: "1px solid rgba(184,151,74,.35)", borderTop: "none",
          background: "#0E1B2E",
        }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={() => { setQuery(s); go(s); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "10px 16px", textAlign: "left",
                background: "transparent", border: "none",
                borderBottom: i < suggestions.length - 1 ? "1px solid rgba(184,151,74,.1)" : "none",
                fontSize: 13, color: CREAM, cursor: "pointer",
                fontFamily: "'Helvetica Neue', sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(184,151,74,.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 10, color: MUTED }}>↗</span>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
