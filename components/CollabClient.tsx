"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Collab {
  id: number;
  brands: string;
  brandTags: string[];
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
  searchKeyword: string;
  imageUrl: string; // 実物画像URL
}

const RARITY_LABEL = { common: "普通", uncommon: "やや希少", rare: "希少", very_rare: "超希少" };
const RARITY_COLOR = { common: "#6B7280", uncommon: "#2563EB", rare: "#7C3AED", very_rare: "#DC2626" };

const COLLABS: Collab[] = [
  // ── Nike ──
  { id:1,  brands:"Nike × Supreme",         brandTags:["Nike","Supreme"],               name:"Air Force 1 Low Supreme",         year:2012, cat:"スニーカー", orig:15000,  market:85000,  rarity:"rare",      icon:"AF1",  isNew:false, desc:"SupremeのBox LogoとNike AF1の伝説的コラボ。赤・黒・白の3カラーが存在。",                          points:["Side Swooshがレザー製","Box Logo刺繍が高密度","靴底にSupremeロゴ"],            searchKeyword:"ナイキ エアフォース1 スニーカー メンズ",   imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2012/10/Nike-Air-Force-1-Low-Black-Camo-1.jpg" },
  { id:2,  brands:"Nike × Off-White",        brandTags:["Nike","Off-White"],             name:"Air Max 97 Off-White",             year:2017, cat:"スニーカー", orig:25000,  market:120000, rarity:"very_rare",  icon:"AM97", isNew:false, desc:"Virgil Ablohによる革命的デザイン。外部エアユニット露出が特徴。",                                 points:["外部エアユニット露出","タグ&ジップタイ付属","半透明ソールに刻印"],              searchKeyword:"ナイキ エアマックス97 スニーカー",         imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2018/10/Off-White-Nike-Air-Max-97-Black-Cone-Release-Date.jpg" },
  { id:9,  brands:"Nike × Travis Scott",     brandTags:["Nike","Travis Scott"],          name:"Air Jordan 1",                    year:2019, cat:"スニーカー", orig:16500,  market:150000, rarity:"very_rare",  icon:"AJ1",  isNew:false, desc:"逆向きSwooshとポケット付きが特徴的なAJ1コラボ。",                                                  points:["Swooshが逆向き","ポケット付き特殊仕様","隠しトラビスロゴ"],                      searchKeyword:"ナイキ エアジョーダン1 ハイカット スニーカー", imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2019/04/Travis-Scott-Air-Jordan-1-High-OG-CD4487-100-Release-Date-Price.jpg" },
  { id:10, brands:"Nike × Sacai",            brandTags:["Nike","Sacai"],                 name:"Waffle Daybreak",                 year:2019, cat:"スニーカー", orig:22000,  market:65000,  rarity:"rare",      icon:"WD",   isNew:false, desc:"二重ソールと二重アッパーが特徴のSacaiとのコラボ。ダブルスウッシュが話題。",            points:["ダブルスウッシュ","二重ソール構造","Sacaiロゴ刻印"],                             searchKeyword:"ナイキ サカイ ワッフル スニーカー コラボ",  imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2019/07/sacai-Nike-LDWaffle-BV0073-301-BV0073-100-BV0073-001-Release-Date-Price.jpg" },
  { id:11, brands:"Nike × Fragment Design",  brandTags:["Nike","Fragment Design"],       name:"Air Jordan 1 Fragment",           year:2014, cat:"スニーカー", orig:16000,  market:200000, rarity:"very_rare",  icon:"FRG",  isNew:false, desc:"藤原ヒロシ率いるFragment Designとの伝説的コラボAJ1。雷マークが刻印。",               points:["Fragment雷マーク刻印","ネイビー×ホワイト配色","Hiroshi Fujiwara監修"],          searchKeyword:"ナイキ エアジョーダン1 フラグメント スニーカー", imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2014/12/fragment-design-x-air-jordan-1-retro-high-og-11.jpg" },
  // ── Supreme ──
  { id:3,  brands:"Supreme × The North Face",brandTags:["Supreme","The North Face"],    name:"Mountain Parka",                  year:2019, cat:"ジャケット", orig:65000,  market:180000, rarity:"very_rare",  icon:"TNF",  isNew:false, desc:"毎シーズン話題を呼ぶ定番コラボ。初期ものは特に希少。",                                          points:["TNF×Supreme Woven","フロントにSupreme刺繍","Gore-Tex素材（一部）"],             searchKeyword:"ノースフェイス マウンテンパーカー メンズ アウター", imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632649159-supreme-tnf-ss19-00.jpg" },
  { id:4,  brands:"Supreme × Louis Vuitton", brandTags:["Supreme","Louis Vuitton"],     name:"Box Logo Tee",                    year:2017, cat:"Tシャツ",   orig:50000,  market:300000, rarity:"very_rare",  icon:"LV",   isNew:false, desc:"2017年パリコレで電撃発表。LVモノグラム×Box Logoの歴史的コラボ。",                       points:["LVショップのみ販売","レシート&証明書必須","偽物が非常に多い"],                   searchKeyword:"シュプリーム ボックスロゴ Tシャツ メンズ", imageUrl:"https://www.highsnobiety.com/static-assets/dato/1636752073-supreme-louis-vuitton-every-piece-00.jpg" },
  { id:8,  brands:"Supreme × Stone Island",  brandTags:["Supreme","Stone Island"],      name:"Jacket",                          year:2020, cat:"ジャケット", orig:120000, market:280000, rarity:"very_rare",  icon:"SI",   isNew:false, desc:"ストリートの王とイタリア職人ブランドの夢のコラボ。",                                          points:["左右異なるワッペン","Stone Island特殊染色","共同製造証明書付き"],                searchKeyword:"ストーンアイランド ジャケット メンズ",      imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632503622-supreme-stone-island-fw20-feature.jpg" },
  { id:12, brands:"Supreme × Burberry",      brandTags:["Supreme","Burberry"],          name:"Box Logo Hooded Sweatshirt",      year:2022, cat:"パーカー",  orig:45000,  market:160000, rarity:"very_rare",  icon:"BB",   isNew:false, desc:"2022年に実現した超意外なコラボ。バーバリーチェック×Box Logoが話題。",                  points:["バーバリーチェック使用","共同ロゴタグ","限定店舗のみ"],                          searchKeyword:"シュプリーム パーカー フーディー メンズ",   imageUrl:"https://www.highsnobiety.com/static-assets/dato/1646662564-supreme-burberry-collab-lookbook-release-date-droplist-price-website-buy-13.jpg" },
  // ── Adidas ──
  { id:7,  brands:"Adidas × Wales Bonner",   brandTags:["Adidas","Wales Bonner"],       name:"Samba",                           year:2024, cat:"スニーカー", orig:22000,  market:48000,  rarity:"rare",      icon:"WB",   isNew:true,  desc:"Wales BonnerとAdidasのSamba。ハンドクラフトレザーとアフリカンモチーフ。",             points:["ハンドクラフトレザー","Wales Bonnerテープ","アフリカンモチーフ"],               searchKeyword:"アディダス サンバ スニーカー メンズ",       imageUrl:"https://www.highsnobiety.com/static-assets/dato/1704967259-wales-bonner-adidas-samba-2024-001.jpg" },
  { id:13, brands:"Adidas × Yeezy",          brandTags:["Adidas","Yeezy"],              name:"Boost 350 V2",                    year:2016, cat:"スニーカー", orig:29700,  market:55000,  rarity:"uncommon",  icon:"YZY",  isNew:false, desc:"Kanye WestとAdidasのメガコラボ。ニット素材のアッパーとBoostソールが特徴。",           points:["Primeknit素材","Boostフルソール","半透明ストライプ"],                           searchKeyword:"アディダス イージーブースト スニーカー",    imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2016/09/adidas-Yeezy-Boost-350-V2-CP9654-Release-Date.jpg" },
  { id:14, brands:"Adidas × Pharrell",       brandTags:["Adidas","Pharrell Williams"],  name:"Human Race NMD",                  year:2016, cat:"スニーカー", orig:24000,  market:45000,  rarity:"rare",      icon:"HR",   isNew:false, desc:"ファレル・ウィリアムスとのコラボNMD。カラフルで独自のフェイスプレートが特徴。",       points:["カスタムフェイスプレート","カラフル展開","Pharrell直筆デザイン"],               searchKeyword:"アディダス NMD スニーカー メンズ",          imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2016/07/human-race-adidas-nmd-2.jpg" },
  // ── New Balance ──
  { id:6,  brands:"New Balance × ALD",       brandTags:["New Balance","Aime Leon Dore"],name:"550",                            year:2024, cat:"スニーカー", orig:18700,  market:55000,  rarity:"rare",      icon:"550",  isNew:true,  desc:"NYのセレクトショップALDとNBの人気コラボ。レトロなカラーパレットが◎",              points:["ALDシグネチャーカラー","プレミアムレザー","ALD×NBダブルロゴ"],                  searchKeyword:"ニューバランス 550 スニーカー レザー",      imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2022/03/Aime-Leon-Dore-New-Balance-550-2022-Release-Date.jpeg" },
  { id:15, brands:"New Balance × Salehe Bembury", brandTags:["New Balance","Salehe Bembury"], name:"2002R",                   year:2022, cat:"スニーカー", orig:18150,  market:40000,  rarity:"rare",      icon:"2002", isNew:false, desc:"デザイナーSalehe BemburyとNBのコラボ2002R。自然からインスパイアされた配色が特徴。", points:["Saleheシグネチャーカラー","特殊アウトソール","N刺繍"],                          searchKeyword:"ニューバランス 2002R スニーカー",            imageUrl:"https://cdn.sanity.io/images/pu5wtzfc/production/ab44a9b0a407351551d19628e3fae456f0a93a4f-1200x750.jpg" },
  // ── Carhartt WIP ──
  { id:5,  brands:"Carhartt WIP × A.P.C.",   brandTags:["Carhartt WIP","A.P.C."],       name:"Detroit Jacket",                  year:2018, cat:"ジャケット", orig:38000,  market:62000,  rarity:"uncommon",  icon:"CxA",  isNew:false, desc:"A.P.CとのコラボDetroit Jacket。機能性×ミニマルデザインの融合。",                        points:["APCシグネチャーライニング","ダブルタグ仕様","フランスでも限定販売"],             searchKeyword:"カーハート ジャケット メンズ ワーク",       imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632580155-apc-carhartt-wip-ss20-00.jpg" },
];

const CATS   = ["すべて", "スニーカー", "ジャケット", "Tシャツ", "パーカー"];
const BRANDS = ["すべて", "Nike", "Supreme", "Adidas", "New Balance", "Carhartt WIP"];

function buildUrl(market: string, kw: string) {
  const e = encodeURIComponent(kw);
  if (market === "mercari") return `https://jp.mercari.com/search?keyword=${e}&status=on_sale`;
  if (market === "yahoo")   return `https://auctions.yahoo.co.jp/search/search?p=${e}`;
  return `https://twitter.com/search?q=${e}&src=typed_query&f=live`;
}

export default function CollabClient() {
  const [cat,      setCat]      = useState("すべて");
  const [brand,    setBrand]    = useState("すべて");
  const [selected, setSelected] = useState<Collab | null>(null);
  const [images,   setImages]   = useState<Record<string, string | null>>({});

  useEffect(() => {
    const keywords = COLLABS.map((c) => c.searchKeyword).join(",");
    fetch(`/api/collab-images?keywords=${encodeURIComponent(keywords)}`)
      .then((r) => r.json())
      .then((data) => setImages(data))
      .catch(() => {});
  }, []);

  const list = COLLABS.filter((c) => {
    const catOk   = cat   === "すべて" || c.cat === cat;
    const brandOk = brand === "すべて" || c.brandTags.includes(brand);
    return catOk && brandOk;
  });

  const filterBtn = (active: boolean) => ({
    fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" as const,
    padding: "8px 14px", border: "1px solid", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    background:   active ? "rgba(184,151,74,.1)" : "transparent",
    color:        active ? "#B8974A"             : "#5A6E85",
    borderColor:  active ? "#B8974A"             : "rgba(255,255,255,.07)",
    transition: "all .15s",
  });

  return (
    <>
      {/* ── フィルター ── */}
      <div style={{ marginBottom: 24 }}>
        {/* カテゴリ */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8, alignItems: "center" }}>
          <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#5A6E85", textTransform: "uppercase", minWidth: 40 }}>CAT</span>
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={filterBtn(cat === c)}>{c}</button>
          ))}
        </div>
        {/* ブランド */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 8, letterSpacing: "0.14em", color: "#5A6E85", textTransform: "uppercase", minWidth: 40 }}>BRAND</span>
          {BRANDS.map((b) => (
            <button key={b} onClick={() => setBrand(b)} style={filterBtn(brand === b)}>{b}</button>
          ))}
          <span style={{ fontSize: 9, color: "#5A6E85", marginLeft: 4 }}>{list.length} items</span>
        </div>
      </div>

      {/* ── グリッド ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {list.map((c) => {
          const rc     = RARITY_COLOR[c.rarity];
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
                }}>NEW</div>
              )}

              {/* 画像エリア */}
              <div style={{
                height: 140, position: "relative",
                borderBottom: "1px solid rgba(184,151,74,.08)",
                background: "rgba(20,30,50,.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                {(c.imageUrl || imgSrc) ? (
                  <Image src={c.imageUrl || imgSrc!} alt={c.name} fill style={{ objectFit: "cover" }} unoptimized />
                ) : (
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "rgba(184,151,74,.3)" }}>{c.icon}</span>
                )}
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "2px 6px", border: "1px solid",
                  color: rc, borderColor: rc, background: "rgba(14,27,46,.8)",
                }}>{RARITY_LABEL[c.rarity]}</div>
              </div>

              <div style={{ padding: 12 }}>
                <p style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8974A", marginBottom: 4 }}>{c.brands}</p>
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

      {/* ── モーダル ── */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div style={{ background: "#162540", border: "1px solid rgba(184,151,74,.3)", maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto" }}>
            {/* ヘッダー */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(184,151,74,.12)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8974A", marginBottom: 4 }}>{selected.brands}</p>
                <h2 style={{ fontSize: 20, fontWeight: 300, color: "#F5F0E8", fontFamily: "Georgia, serif" }}>{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: "#5A6E85", fontSize: 24, background: "none", border: "none", cursor: "pointer", lineHeight: 1, marginTop: 4 }}>×</button>
            </div>

            <div style={{ padding: 20 }}>
              {/* 画像 */}
              <div style={{ height: 200, position: "relative", background: "rgba(20,30,50,.8)", border: "1px solid rgba(184,151,74,.1)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {(selected.imageUrl || images[selected.searchKeyword]) ? (
                  <Image src={selected.imageUrl || images[selected.searchKeyword]!} alt={selected.name} fill style={{ objectFit: "cover" }} unoptimized />
                ) : (
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 48, color: "rgba(184,151,74,.3)" }}>{selected.icon}</span>
                )}
              </div>

              <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.7, marginBottom: 16 }}>{selected.desc}</p>

              {/* スペック */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {([
                  ["年代",        `${selected.year}年`],
                  ["カテゴリ",    selected.cat],
                  ["発売時定価",  `¥${selected.orig.toLocaleString()}`],
                  ["現在の相場",  `¥${selected.market.toLocaleString()}`],
                  ["希少度",      RARITY_LABEL[selected.rarity]],
                  ["注目ポイント",selected.points[0]],
                ] as [string, string][]).map(([l, v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(184,151,74,.1)", padding: 8 }}>
                    <p style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6E85", marginBottom: 4 }}>{l}</p>
                    <p style={{ fontSize: 12, color: "#F5F0E8" }}>{v}</p>
                  </div>
                ))}
              </div>

              {/* ポイント一覧 */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6E85", marginBottom: 8 }}>CHECK POINTS</p>
                {selected.points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                    <span style={{ color: "#B8974A", fontSize: 10, marginTop: 2 }}>▸</span>
                    <span style={{ fontSize: 12, color: "rgba(245,240,232,.7)" }}>{pt}</span>
                  </div>
                ))}
              </div>

              {/* フリマリンク */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "メルカリで探す ↗", key: "mercari", primary: true },
                  { label: "ヤフオクで探す ↗", key: "yahoo",   primary: false },
                  { label: "Xで探す ↗",         key: "x",       primary: false },
                ].map(({ label, key, primary }) => (
                  <a
                    key={key}
                    href={buildUrl(key, `${selected.brands} ${selected.name}`)}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      flex: 1, textAlign: "center", padding: "10px 0",
                      fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                      textDecoration: "none", minWidth: 100,
                      background:  primary ? "#B8974A"                    : "transparent",
                      color:       primary ? "#0E1B2E"                    : "#B8974A",
                      border:      primary ? "none"                       : "1px solid rgba(184,151,74,.25)",
                    }}
                  >{label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
