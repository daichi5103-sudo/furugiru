"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  searchKeyword: string; // 楽天画像検索用キーワード
}

const RARITY_LABEL = { common: "普通", uncommon: "やや希少", rare: "希少", very_rare: "超希少" };
const RARITY_COLOR = { common: "#6B7280", uncommon: "#2563EB", rare: "#7C3AED", very_rare: "#DC2626" };

const COLLABS: Collab[] = [
  { id:1, brands:"Nike × Supreme", name:"Air Force 1 Low Supreme", year:2012, cat:"スニーカー", orig:15000, market:85000, rarity:"rare", icon:"AF1", isNew:false, desc:"SupremeのBox LogoとNike AF1の伝説的コラボ。赤・黒・白の3カラーが存在。", points:["Side Swooshがレザー製","Box Logo刺繍が高密度","靴底にSupremeロゴ"], searchKeyword:"Nike Air Force 1 Supreme" },
  { id:2, brands:"Nike × Off-White", name:"Air Max 97 Off-White", year:2017, cat:"スニーカー", orig:25000, market:120000, rarity:"very_rare", icon:"AM97", isNew:false, desc:"Virgil Ablohによる革命的デザイン。外部エアユニット露出が特徴。", points:["外部エアユニット露出","タグ&ジップタイ付属","半透明ソールに刻印"], searchKeyword:"Nike Air Max 97 Off-White" },
  { id:3, brands:"Supreme × TNF", name:"Mountain Parka", year:2019, cat:"ジャケット", orig:65000, market:180000, rarity:"very_rare", icon:"TNF", isNew:false, desc:"毎シーズン話題を呼ぶ定番コラボ。初期ものは特に希少。", points:["TNF×Supreme Woven","フロントにSupreme刺繍","Gore-Tex素材（一部）"], searchKeyword:"Supreme North Face Mountain Parka" },
  { id:4, brands:"Supreme × LV", name:"Box Logo Tee", year:2017, cat:"Tシャツ", orig:50000, market:300000, rarity:"very_rare", icon:"LV", isNew:false, desc:"2017年パリコレで電撃発表。LVモノグラム×Box Logoの歴史的コラボ。", points:["LVショップのみ販売","レシート&証明書必須","偽物が非常に多い"], searchKeyword:"Supreme Louis Vuitton Box Logo Tee" },
  { id:5, brands:"Carhartt WIP × APC", name:"Detroit Jacket", year:2018, cat:"ジャケット", orig:38000, market:62000, rarity:"uncommon", icon:"CxA", isNew:false, desc:"A.P.CとのコラボDetroit Jacket。機能性×ミニマルデザインの融合。", points:["APCシグネチャーライニング","ダブルタグ仕様","フランスでも限定販売"], searchKeyword:"Carhartt WIP APC Detroit Jacket" },
  { id:6, brands:"New Balance × ALD", name:"550", year:2024, cat:"スニーカー", orig:18700, market:55000, rarity:"rare", icon:"550", isNew:true, desc:"NYのセレクトショップALDとNBの人気コラボ。レトロなカラーパレットが◎", points:["ALDシグネチャーカラー","プレミアムレザー","ALD×NBダブルロゴ"], searchKeyword:"New Balance 550 Aime Leon Dore" },
  { id:7, brands:"Adidas × Wales Bonner", name:"Samba", year:2024, cat:"スニーカー", orig:22000, market:48000, rarity:"rare", icon:"WB", isNew:true, desc:"Wales BonnerとAdidasのSamba。ハンドクラフトレザーとアフリカンモチーフ。", points:["ハンドクラフトレザー","Wales Bonnerテープ","アフリカンモチーフ"], searchKeyword:"Adidas Samba Wales Bonner" },
  { id:8, brands:"Stone Island × Supreme", name:"Jacket", year:2020, cat:"ジャケット", orig:120000, market:280000, rarity:"very_rare", icon:"SI", isNew:false, desc:"ストリートの王とイタリア職人ブランドの夢のコラボ。", points:["左右異なるワッペン","Stone Island特殊染色","共同製造証明書付き"], searchKeyword:"Stone Island Supreme Jacket" },
  { id:9, brands:"Nike × Travis Scott", name:"Air Jordan 1", year:2019, cat:"スニーカー", orig:16500, market:150000, rarity:"very_rare", icon:"AJ1", isNew:false, desc:"逆向きSwooshとポケット付きが特徴的なAJ1コラボ。", points:["Swooshが逆向き","ポケット付き特殊仕様","隠しトラビスロゴ"], searchKeyword:"Nike Air Jordan 1 Travis Scott" },
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
  const [images, setImages] = useState<Record<string, string | null>>({});

  // 全コラボの画像を一括取得
  useEffect(() => {
    const keywords = COLLABS.map((c) => c.searchKeyword).join(",");
    fetch(`/api/collab-images?keywords=${encodeURIComponent(keywords)}`)
      .then((r) => r.json())
      .then((data) => setImages(data))
      .catch(() => {});
  }, []);

  const list = cat === "すべて" ? COLLABS : COLLABS.filter((c) => c.cat === cat);

  return (
    <>
      {/* Filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24, alignItems: "center" }}>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "8px 16px", border: "1px solid", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif",
              background: cat === c ? "rgba(184,151,74,.06)" : "transparent",
              color: cat === c ? "#B8974A" : "#5A6E85",
              borderColor: cat === c ? "#B8974A" : "rgba(255,255,255,.07)",
            }}
          >
            {c}
          </button>
        ))}
        <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", marginLeft: 8 }}>
          {list.length} items
        </span>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {list.map((c) => {
          const rc = RARITY_COLOR[c.rarity];
          const imgSrc = images[c.searchKeyword];
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                border: "1px solid rgba(184,151,74,.12)",
                background: "rgba(255,255,255,.02)",
                cursor: "pointer", overflow: "hidden", position: "relative",
              }}
            >
              {c.isNew && (
                <div style={{
                  position: "absolute", top: 8, left: 8, zIndex: 10,
                  fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "2px 6px", background: "rgba(184,151,74,.9)",
                  color: "#0E1B2E", fontWeight: 700,
                }}>
                  NEW
                </div>
              )}

              {/* 画像エリア */}
              <div style={{
                height: 140, position: "relative",
                borderBottom: "1px solid rgba(184,151,74,.08)",
                background: "rgba(20,30,50,.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={c.name}
                    fill
                    style={{ objectFit: "contain", padding: 8 }}
                    unoptimized
                  />
                ) : (
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "rgba(184,151,74,.3)" }}>
                    {c.icon}
                  </span>
                )}
                {/* 希少度バッジ */}
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "2px 6px", border: "1px solid",
                  color: rc, borderColor: rc,
                  background: "rgba(14,27,46,.8)",
                }}>
                  {RARITY_LABEL[c.rarity]}
                </div>
              </div>

              <div style={{ padding: 12 }}>
                <p style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8974A", marginBottom: 4 }}>
                  {c.brands}
                </p>
                <p style={{ fontSize: 12, color: "#F5F0E8", marginBottom: 8, lineHeight: 1.4 }}>{c.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderTop: "1px solid rgba(184,151,74,.08)", paddingTop: 8 }}>
                  <span style={{ fontSize: 9, color: "rgba(245,240,232,.2)" }}>定価¥{c.orig.toLocaleString()}</span>
                  <span style={{ fontSize: 14, color: "#B8974A", fontFamily: "Georgia, serif" }}>¥{c.market.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div style={{
            background: "#162540", border: "1px solid rgba(184,151,74,.3)",
            maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto",
          }}>
            {/* Modal header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(184,151,74,.12)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8974A", marginBottom: 4 }}>{selected.brands}</p>
                <h2 style={{ fontSize: 20, fontWeight: 300, color: "#F5F0E8", fontFamily: "Georgia, serif" }}>{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: "#5A6E85", fontSize: 24, background: "none", border: "none", cursor: "pointer", lineHeight: 1, marginTop: 4 }}>×</button>
            </div>

            <div style={{ padding: 20 }}>
              {/* 画像 */}
              <div style={{
                height: 200, position: "relative",
                background: "rgba(20,30,50,.8)", border: "1px solid rgba(184,151,74,.1)",
                marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                {images[selected.searchKeyword] ? (
                  <Image
                    src={images[selected.searchKeyword]!}
                    alt={selected.name}
                    fill
                    style={{ objectFit: "contain", padding: 12 }}
                    unoptimized
                  />
                ) : (
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 48, color: "rgba(184,151,74,.3)" }}>{selected.icon}</span>
                )}
              </div>

              <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.7, marginBottom: 16 }}>{selected.desc}</p>

              {/* スペック */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[
                  ["年代", `${selected.year}年`],
                  ["カテゴリ", selected.cat],
                  ["発売時定価", `¥${selected.orig.toLocaleString()}`],
                  ["現在の相場", `¥${selected.market.toLocaleString()}`],
                  ["希少度", RARITY_LABEL[selected.rarity]],
                  ["注目ポイント", selected.points[0]],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(184,151,74,.1)", padding: 8 }}>
                    <p style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", marginBottom: 4 }}>{l}</p>
                    <p style={{ fontSize: 12, color: "#F5F0E8" }}>{v}</p>
                  </div>
                ))}
              </div>

              {/* フリマリンク */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
                    style={{
                      flex: 1, textAlign: "center", padding: "10px 0",
                      fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                      textDecoration: "none", minWidth: 100,
                      background: primary ? "#B8974A" : "transparent",
                      color: primary ? "#0E1B2E" : "#B8974A",
                      border: primary ? "none" : "1px solid rgba(184,151,74,.25)",
                    }}
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
