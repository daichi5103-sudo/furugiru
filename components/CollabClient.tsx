"use client";
import { useState } from "react";

interface Collab {
  id: number;
  brands: string;
  name: string;
  year: number;
  cat: string;
  orig: number;
  market: number;
  rarity: "common" | "uncommon" | "rare" | "very_rare";
  icon: string;
  isNew: boolean;
  desc: string;
  points: string[];
}

const RARITY_LABEL = { common: "普通", uncommon: "やや希少", rare: "希少", very_rare: "超希少" };
const RARITY_COLOR = { common: "#6B7280", uncommon: "#2563EB", rare: "#7C3AED", very_rare: "#DC2626" };

const COLLABS: Collab[] = [
  { id:1, brands:"Nike × Supreme", name:"Air Force 1 Low Supreme", year:2012, cat:"スニーカー", orig:15000, market:85000, rarity:"rare", icon:"AF1", isNew:false, desc:"SupremeのBox LogoとNike AF1の伝説的コラボ。赤・黒・白の3カラーが存在。", points:["Side Swooshがレザー製","Box Logo刺繍が高密度","靴底にSupremeロゴ"] },
  { id:2, brands:"Nike × Off-White", name:"Air Max 97 Off-White", year:2017, cat:"スニーカー", orig:25000, market:120000, rarity:"very_rare", icon:"AM97", isNew:false, desc:"Virgil Ablohによる革命的デザイン。外部エアユニット露出が特徴。", points:["外部エアユニット露出","タグ&ジップタイ付属","半透明ソールに刻印"] },
  { id:3, brands:"Supreme × TNF", name:"Mountain Parka", year:2019, cat:"ジャケット", orig:65000, market:180000, rarity:"very_rare", icon:"TNF", isNew:false, desc:"毎シーズン話題を呼ぶ定番コラボ。初期ものは特に希少。", points:["TNF×Supreme Woven","フロントにSupreme刺繍","Gore-Tex素材（一部）"] },
  { id:4, brands:"Supreme × LV", name:"Box Logo Tee", year:2017, cat:"Tシャツ", orig:50000, market:300000, rarity:"very_rare", icon:"LV", isNew:false, desc:"2017年パリコレで電撃発表。LVモノグラム×Box Logoの歴史的コラボ。", points:["LVショップのみ販売","レシート&証明書必須","偽物が非常に多い"] },
  { id:5, brands:"Carhartt WIP × APC", name:"Detroit Jacket", year:2018, cat:"ジャケット", orig:38000, market:62000, rarity:"uncommon", icon:"CxA", isNew:false, desc:"A.P.CとのコラボDetroit Jacket。機能性×ミニマルデザインの融合。", points:["APCシグネチャーライニング","ダブルタグ仕様","フランスでも限定販売"] },
  { id:6, brands:"New Balance × ALD", name:"550", year:2024, cat:"スニーカー", orig:18700, market:55000, rarity:"rare", icon:"550", isNew:true, desc:"NYのセレクトショップALDとNBの人気コラボ。レトロなカラーパレットが◎", points:["ALDシグネチャーカラー","プレミアムレザー","ALD×NBダブルロゴ"] },
  { id:7, brands:"Adidas × Wales Bonner", name:"Samba", year:2024, cat:"スニーカー", orig:22000, market:48000, rarity:"rare", icon:"WB", isNew:true, desc:"Wales BonnerとAdidasのSamba。ハンドクラフトレザーとアフリカンモチーフ。", points:["ハンドクラフトレザー","Wales Bonnerテープ","アフリカンモチーフ"] },
  { id:8, brands:"Stone Island × Supreme", name:"Jacket", year:2020, cat:"ジャケット", orig:120000, market:280000, rarity:"very_rare", icon:"SI", isNew:false, desc:"ストリートの王とイタリア職人ブランドの夢のコラボ。", points:["左右異なるワッペン","Stone Island特殊染色","共同製造証明書付き"] },
  { id:9, brands:"Nike × Travis Scott", name:"Air Jordan 1", year:2019, cat:"スニーカー", orig:16500, market:150000, rarity:"very_rare", icon:"AJ1", isNew:false, desc:"逆向きSwooshとポケット付きが特徴的なAJ1コラボ。", points:["Swooshが逆向き","ポケット付き特殊仕様","隠しトラビスロゴ"] },
];

const CATS = ["すべて", "スニーカー", "ジャケット", "Tシャツ"];

function buildUrl(market: string, kw: string) {
  const e = encodeURIComponent(kw);
  if (market === "mercari") return `https://jp.mercari.com/search?keyword=${e}&status=on_sale`;
  if (market === "yahoo") return `https://auctions.yahoo.co.jp/search/search?p=${e}`;
  return `https://twitter.com/search?q=${e}&src=typed_query&f=live`;
}

export default function CollabClient() {
  const [cat, setCat] = useState("すべて");
  const [selected, setSelected] = useState<Collab | null>(null);

  const list = cat === "すべて" ? COLLABS : COLLABS.filter((c) => c.cat === cat);

  return (
    <>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-[9px] tracking-widest uppercase px-4 py-2 border font-sans transition-all ${
              cat === c
                ? "border-[#B8974A] text-[#B8974A] bg-[rgba(184,151,74,.06)]"
                : "border-[rgba(255,255,255,.07)] text-[#5A6E85] hover:border-[rgba(184,151,74,.3)] hover:text-[#F5F0E8]"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="text-[9px] tracking-widest uppercase text-[#5A6E85] font-sans self-center ml-2">
          {list.length} items
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {list.map((c) => {
          const rc = RARITY_COLOR[c.rarity];
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className="border border-[rgba(184,151,74,.12)] bg-[rgba(255,255,255,.02)] cursor-pointer hover:border-[rgba(184,151,74,.4)] hover:-translate-y-px transition-all relative overflow-hidden"
            >
              {c.isNew && (
                <div className="absolute top-2 left-2 text-[7px] tracking-widest uppercase px-1.5 py-0.5 bg-[rgba(184,151,74,.9)] text-[#0E1B2E] font-bold font-sans z-10">
                  NEW
                </div>
              )}
              <div className="h-20 flex items-center justify-center border-b border-[rgba(184,151,74,.08)] bg-[rgba(20,30,50,.5)] relative">
                <span className="text-xl font-serif font-light text-[rgba(184,151,74,.5)]">{c.icon}</span>
                <div
                  className="absolute top-2 right-2 text-[7px] tracking-widest uppercase px-1.5 py-0.5 border font-sans"
                  style={{ color: rc, borderColor: rc }}
                >
                  {RARITY_LABEL[c.rarity]}
                </div>
              </div>
              <div className="p-3">
                <p className="text-[8px] tracking-widest uppercase text-[#B8974A] mb-1 font-sans">{c.brands}</p>
                <p className="text-xs text-[#F5F0E8] mb-2 leading-snug font-sans">{c.name}</p>
                <div className="flex items-baseline justify-between border-t border-[rgba(184,151,74,.08)] pt-2">
                  <span className="text-[9px] text-[rgba(245,240,232,.2)] font-sans">定価¥{c.orig.toLocaleString()}</span>
                  <span className="text-sm text-[#B8974A] font-serif">¥{c.market.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-5"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="bg-[#162540] border border-[rgba(184,151,74,.3)] max-w-lg w-full max-h-[88vh] overflow-y-auto">
            <div className="px-5 py-4 border-b border-[rgba(184,151,74,.12)] flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-[#B8974A] mb-1 font-sans">{selected.brands}</p>
                <h2 className="text-xl font-serif font-light text-[#F5F0E8]">{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#5A6E85] hover:text-[#F5F0E8] text-2xl leading-none font-sans mt-1">×</button>
            </div>
            <div className="p-5">
              <div className="h-28 flex items-center justify-center bg-[rgba(20,30,50,.8)] border border-[rgba(184,151,74,.1)] mb-4">
                <span className="text-4xl font-serif text-[rgba(184,151,74,.4)]">{selected.icon}</span>
              </div>
              <p className="text-sm text-[rgba(245,240,232,.6)] leading-relaxed mb-4 font-sans">{selected.desc}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  ["年代", `${selected.year}年`],
                  ["カテゴリ", selected.cat],
                  ["発売時定価", `¥${selected.orig.toLocaleString()}`],
                  ["現在の相場", `¥${selected.market.toLocaleString()}`],
                  ["希少度", RARITY_LABEL[selected.rarity]],
                  ["注目ポイント", selected.points[0]],
                ].map(([l, v]) => (
                  <div key={l} className="bg-[rgba(255,255,255,.03)] border border-[rgba(184,151,74,.1)] p-2">
                    <p className="text-[8px] tracking-widest uppercase text-[#5A6E85] mb-1 font-sans">{l}</p>
                    <p className="text-xs text-[#F5F0E8] font-sans">{v}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "メルカリで探す ↗", key: "mercari", primary: true },
                  { label: "ヤフオクで探す ↗", key: "yahoo", primary: false },
                  { label: "Xで探す ↗", key: "x", primary: false },
                ].map(({ label, key, primary }) => (
                  <a
                    key={key}
                    href={buildUrl(key, `${selected.brands} ${selected.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 text-center py-2.5 text-[9px] tracking-widest uppercase font-sans transition-all ${
                      primary
                        ? "bg-[#B8974A] text-[#0E1B2E] hover:bg-[#E8D9A8]"
                        : "border border-[rgba(184,151,74,.25)] text-[#B8974A] hover:bg-[rgba(184,151,74,.07)]"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
