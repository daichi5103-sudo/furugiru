"use client";
import { useState, useRef, useEffect } from "react";
import { PlaceResult } from "@/app/api/shops/route";

const SUGGEST_MAP: Record<string, string[]> = {
  "下": ["下北沢", "下高井戸"],
  "渋": ["渋谷"],
  "高": ["高円寺", "高田馬場", "高槻"],
  "原": ["原宿"],
  "梅": ["梅田"],
  "堀": ["堀江（大阪）"],
  "中": ["中崎町", "中目黒", "中野"],
  "天": ["天神（福岡）", "天王寺"],
  "大": ["大須（名古屋）", "大阪", "大宮"],
  "横": ["横浜"],
  "京": ["京都", "京橋"],
  "仙": ["仙台"],
  "す": ["すすきの"],
  "広": ["広島"],
  "新": ["新宿", "新大阪"],
  "名": ["名古屋"],
  "福": ["福岡", "福島"],
  "神": ["神戸"],
  "心": ["心斎橋"],
  "吉": ["吉祥寺"],
  "三": ["三宮（神戸）"],
};

const QUICK_AREAS = [
  "下北沢", "渋谷", "高円寺", "吉祥寺",
  "梅田", "堀江（大阪）", "天神（福岡）",
  "大須（名古屋）", "京都", "横浜",
  "すすきの", "仙台", "広島", "神戸",
];

function classifyReviews(reviews: PlaceResult["reviews"]) {
  const good = reviews.filter(r => r.rating >= 4 && r.text.length > 10);
  const bad  = reviews.filter(r => r.rating <= 2 && r.text.length > 10);
  return { good, bad };
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-amber-400 tracking-wider text-sm">
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  );
}

function ShopCard({ shop }: { shop: PlaceResult }) {
  const [tab, setTab] = useState<"good" | "bad">("good");
  const { good, bad } = classifyReviews(shop.reviews);
  const displayReviews = tab === "good" ? good : bad;

  return (
    <div className="border border-[rgba(184,151,74,0.15)] bg-white/[0.02] hover:border-[rgba(184,151,74,0.35)] transition-colors">
      <div className="p-4 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-base font-serif font-light text-[#F5F0E8]">{shop.name}</h4>
            {shop.recommended && (
              <span className="text-[9px] tracking-widest text-[#B8974A] border border-[rgba(184,151,74,0.5)] bg-[rgba(184,151,74,0.08)] px-1.5 py-0.5 uppercase font-sans font-bold">★ おすすめ</span>
            )}
            {shop.openNow === true && (
              <span className="text-[9px] tracking-widest text-emerald-400 border border-emerald-600/40 px-1.5 py-0.5 uppercase font-sans">営業中</span>
            )}
            {shop.openNow === false && (
              <span className="text-[9px] tracking-widest text-rose-400 border border-rose-600/40 px-1.5 py-0.5 uppercase font-sans">閉店中</span>
            )}
          </div>
          <p className="text-[10px] tracking-widest text-[#5A6E85] font-sans mb-3 leading-relaxed">{shop.address}</p>
          <div className="flex gap-2 flex-wrap">
            <a href={shop.googleMapUrl} target="_blank" rel="noopener noreferrer"
              className="text-[9px] tracking-widest uppercase text-[#B8974A] border border-[rgba(184,151,74,0.25)] px-3 py-1.5 hover:bg-[rgba(184,151,74,0.08)] transition-colors font-sans flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Google Map ↗
            </a>
            <a href={`https://jp.mercari.com/search?keyword=${encodeURIComponent(shop.name)}`} target="_blank" rel="noopener noreferrer"
              className="text-[9px] tracking-widest uppercase text-[#B8974A] border border-[rgba(184,151,74,0.25)] px-3 py-1.5 hover:bg-[rgba(184,151,74,0.08)] transition-colors font-sans">
              メルカリで検索 ↗
            </a>
          </div>
        </div>
        {shop.rating !== null && (
          <div className="text-right flex-shrink-0">
            <Stars rating={shop.rating} />
            <span className="block text-2xl font-light text-[#B8974A] leading-tight font-serif">{shop.rating.toFixed(1)}</span>
            {shop.reviewCount !== null && (
              <span className="text-[9px] text-[#5A6E85] tracking-widest uppercase font-sans">{shop.reviewCount.toLocaleString()} reviews</span>
            )}
          </div>
        )}
      </div>

      {shop.reviews.length > 0 && (
        <div className="border-t border-[rgba(184,151,74,0.1)]">
          <div className="flex">
            {(["good", "bad"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5 font-sans
                  ${tab === t
                    ? t === "good" ? "text-emerald-400 border-b-2 border-emerald-500" : "text-rose-400 border-b-2 border-rose-500"
                    : "text-[#5A6E85] hover:text-[#F5F0E8]"}`}>
                {t === "good"
                  ? <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>良いレビュー{good.length > 0 && ` (${good.length})`}</>
                  : <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>気になる点{bad.length > 0 && ` (${bad.length})`}</>}
              </button>
            ))}
          </div>
          <div className="p-3 flex flex-col gap-2">
            {displayReviews.length === 0 ? (
              <p className="text-[11px] text-[#5A6E85] font-sans py-2 text-center">
                {tab === "good" ? "高評価レビューがありません" : "低評価レビューがありません"}
              </p>
            ) : displayReviews.slice(0, 3).map((r, i) => (
              <div key={i} className={`flex gap-3 p-3 ${tab === "good" ? "bg-emerald-900/20 border-l-2 border-emerald-600/50" : "bg-rose-900/20 border-l-2 border-rose-700/50"}`}>
                <span className={`flex-shrink-0 text-xs mt-0.5 font-bold ${tab === "good" ? "text-emerald-400" : "text-rose-400"}`}>
                  {tab === "good" ? "✓" : "✕"}
                </span>
                <div>
                  <p className="text-[rgba(245,240,232,0.72)] leading-relaxed font-sans text-sm">{r.text}</p>
                  <p className="text-[#5A6E85] text-[10px] tracking-widest uppercase mt-1 font-sans">{r.authorName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopFinder() {
  const [query, setQuery]       = useState("");
  const [suggests, setSuggests] = useState<string[]>([]);
  const [showSug, setShowSug]   = useState(false);
  const [shops, setShops]       = useState<PlaceResult[]>([]);
  const [loading, setLoading]   = useState(false);
  const [searched, setSearched] = useState(false);
  const [currentArea, setCurrentArea] = useState("");
  const [isMock, setIsMock]     = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query) { setSuggests([]); return; }
    const key = query[0];
    const base  = (SUGGEST_MAP[key] || []).filter(s => s.startsWith(query) && s !== query);
    const extra = Object.values(SUGGEST_MAP).flat().filter(s => s.includes(query) && !base.includes(s) && s !== query);
    setSuggests(Array.from(new Set([...base, ...extra])).slice(0, 6));
  }, [query]);

  const doSearch = async (term: string) => {
    const q = term.trim();
    if (!q) return;
    setQuery(q);
    setShowSug(false);
    setLoading(true);
    setSearched(true);
    setCurrentArea(q);
    try {
      const res  = await fetch(`/api/shops?area=${encodeURIComponent(q)}`);
      const data = await res.json();
      // おすすめ優先・評価順でソート
      const sorted = (data.shops || []).sort((a: PlaceResult, b: PlaceResult) => {
        if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
      setShops(sorted);
      setIsMock(data.isMock || false);
    } catch {
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8974A] mb-3 font-sans">近くの古着屋を探す</p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6E85]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input ref={inputRef} value={query}
              onChange={e => { setQuery(e.target.value); setShowSug(true); }}
              onFocus={() => setShowSug(true)}
              onBlur={() => setTimeout(() => setShowSug(false), 200)}
              onKeyDown={e => e.key === "Enter" && doSearch(query)}
              placeholder="エリア・地名を入力（例：渋谷、梅田、天神…）"
              className="w-full bg-white/[0.04] border border-[rgba(184,151,74,0.3)] text-[#F5F0E8] pl-9 pr-4 py-3 text-sm font-sans outline-none focus:border-[rgba(184,151,74,0.6)] placeholder:text-[rgba(245,240,232,0.25)] transition-colors"
            />
            {showSug && suggests.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 bg-[#162540] border border-[rgba(184,151,74,0.25)] border-t-0">
                {suggests.map(s => (
                  <button key={s} onMouseDown={() => doSearch(s)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-sans text-[rgba(245,240,232,0.7)] hover:bg-[rgba(184,151,74,0.08)] hover:text-[#F5F0E8] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8974A] flex-shrink-0"/>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => doSearch(query)}
            className="px-6 bg-[#B8974A] text-[#0E1B2E] text-[10px] tracking-[0.15em] uppercase font-bold font-sans hover:bg-[#E8D9A8] transition-colors whitespace-nowrap">
            検索
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {QUICK_AREAS.map(area => (
            <button key={area} onClick={() => doSearch(area)}
              className="text-[10px] tracking-[0.08em] text-[rgba(245,240,232,0.4)] border border-white/[0.07] px-3 py-1 hover:border-[rgba(184,151,74,0.35)] hover:text-[rgba(245,240,232,0.8)] transition-all font-sans">
              {area}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex gap-1.5 justify-center py-16">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-[rgba(184,151,74,0.5)] animate-bounce" style={{ animationDelay: `${i*0.15}s` }}/>
          ))}
        </div>
      )}

      {!loading && searched && isMock && (
        <div className="flex gap-3 items-start border border-[rgba(184,151,74,0.2)] bg-[rgba(184,151,74,0.05)] p-3 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8974A" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[11px] text-[rgba(245,240,232,0.5)] font-sans leading-relaxed">
            <span className="text-[rgba(245,240,232,0.8)] font-semibold">デモデータを表示中</span>
            &nbsp;— .env.local に <code className="bg-white/10 px-1 text-[10px]">GOOGLE_PLACES_API_KEY</code> を設定すると実際の店舗情報が表示されます。
          </p>
        </div>
      )}

      {!loading && searched && (
        shops.length === 0 ? (
          <div className="border border-dashed border-[rgba(184,151,74,0.15)] p-10 text-center">
            <p className="text-[10px] tracking-widest text-[#5A6E85] uppercase font-sans mb-2">見つかりませんでした</p>
            <p className="text-sm text-[rgba(245,240,232,0.35)] font-sans mb-5">別のエリア名で試すか、Googleマップで直接検索してみてください。</p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(currentArea + " 古着屋")}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#B8974A] border border-[rgba(184,151,74,0.3)] px-4 py-2 hover:bg-[rgba(184,151,74,0.06)] transition-colors font-sans">
              Google Map で検索 ↗
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif font-light text-[#F5F0E8]">
                "<em className="text-[#B8974A] italic">{currentArea}</em>" の古着屋
              </h3>
              <span className="text-[10px] tracking-widest text-[#5A6E85] uppercase font-sans">{shops.length} shops</span>
            </div>
            {shops.map((shop, i) => <ShopCard key={shop.placeId || i} shop={shop} />)}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(currentArea + " 古着屋")}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 border border-dashed border-[rgba(184,151,74,0.15)] text-[10px] tracking-widest uppercase text-[#5A6E85] hover:text-[#B8974A] hover:border-[rgba(184,151,74,0.3)] transition-colors font-sans">
              <span>Google Map でさらに検索する</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        )
      )}

      {!loading && !searched && (
        <div className="border border-dashed border-[rgba(184,151,74,0.12)] p-14 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#5A6E85] uppercase font-sans mb-2">Shop Finder — Powered by Google Places</p>
          <p className="text-sm text-[rgba(245,240,232,0.3)] font-sans">エリア名や地名を入力して古着屋を検索してください</p>
        </div>
      )}
    </div>
  );
}
