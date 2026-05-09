"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import WishlistButton from "./WishlistButton";
import PriceChart from "./PriceChart";
import { generatePriceHistory, getBuyIndex } from "@/lib/priceHistory";

export interface Collab {
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
  desc: string;
  points: string[];
  searchKeyword: string;
  imageUrl: string; // 実物画像URL
}

const RARITY_LABEL = { common: "普通", uncommon: "やや希少", rare: "希少", very_rare: "超希少" };
const RARITY_COLOR = { common: "#6B7280", uncommon: "#2563EB", rare: "#7C3AED", very_rare: "#DC2626" };

// カテゴリ別デフォルト画像（imageUrl も楽天APIも無い場合の最終フォールバック）
const DEFAULT_IMG: Record<string, string> = {
  "スニーカー": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  "ジャケット": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  "デニム":     "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
  "パーカー":   "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
  "Tシャツ":    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  "ブーツ":     "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
  "シューズ":   "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
  "パンツ":     "https://images.unsplash.com/photo-1473966968600-fa801b2da1ed?w=600&q=80",
};
const FALLBACK_IMG = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80";
const pickImg = (direct: string, rakuten: string | null | undefined, cat: string) =>
  direct || rakuten || DEFAULT_IMG[cat] || FALLBACK_IMG;

export const COLLABS: Collab[] = [
  // ── Nike ──
  { id:1,  brands:"Nike × Supreme",          brandTags:["Nike","Supreme"],               name:"Air Force 1 Low Supreme",          year:2012, cat:"スニーカー", orig:15000,  market:85000,  rarity:"rare",      icon:"AF1",  desc:"SupremeのBox LogoとNike AF1の伝説的コラボ。赤・黒・白の3カラーが存在。",                              points:["Side Swooshがレザー製","Box Logo刺繍が高密度","靴底にSupremeロゴ"],                   searchKeyword:"ナイキ エアフォース1 スニーカー メンズ",        imageUrl:"https://images.stockx.com/360/Nike-Air-Force-1-Low-Supreme-Box-Logo-Black/Images/Nike-Air-Force-1-Low-Supreme-Box-Logo-Black/Lv2/img01.jpg" },
  { id:2,  brands:"Nike × Off-White",         brandTags:["Nike","Off-White"],             name:"Air Max 97 Off-White",              year:2017, cat:"スニーカー", orig:25000,  market:120000, rarity:"very_rare", icon:"AM97", desc:"Virgil Ablohによる革命的デザイン。外部エアユニット露出が特徴。",                                     points:["外部エアユニット露出","タグ&ジップタイ付属","半透明ソールに刻印"],                   searchKeyword:"ナイキ エアマックス97 スニーカー",              imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2018/10/Off-White-Nike-Air-Max-97-Black-Cone-Release-Date.jpg" },
  { id:9,  brands:"Nike × Travis Scott",      brandTags:["Nike","Travis Scott"],          name:"Air Jordan 1 High",                year:2019, cat:"スニーカー", orig:16500,  market:150000, rarity:"very_rare", icon:"AJ1",  desc:"逆向きSwooshとポケット付きが特徴的なAJ1コラボ。",                                                      points:["Swooshが逆向き","ポケット付き特殊仕様","隠しトラビスロゴ"],                         searchKeyword:"ナイキ エアジョーダン1 ハイカット スニーカー",   imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2019/04/Travis-Scott-Air-Jordan-1-High-OG-CD4487-100-Release-Date-Price.jpg" },
  { id:10, brands:"Nike × Sacai",             brandTags:["Nike","Sacai"],                 name:"LDWaffle / Waffle Daybreak",       year:2019, cat:"スニーカー", orig:22000,  market:65000,  rarity:"rare",      icon:"WD",   desc:"二重ソールと二重アッパーが特徴のSacaiとのコラボ。ダブルスウッシュが話題。",                points:["ダブルスウッシュ","二重ソール構造","Sacaiロゴ刻印"],                                 searchKeyword:"ナイキ サカイ ワッフル スニーカー コラボ",       imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2019/07/sacai-Nike-LDWaffle-BV0073-301-BV0073-100-BV0073-001-Release-Date-Price.jpg" },
  { id:11, brands:"Nike × Fragment Design",   brandTags:["Nike","Fragment Design"],       name:"Air Jordan 1 High Fragment",       year:2014, cat:"スニーカー", orig:16000,  market:200000, rarity:"very_rare", icon:"FRG",  desc:"藤原ヒロシ率いるFragment Designとの伝説的コラボAJ1。雷マークが刻印。",                       points:["Fragment雷マーク刻印","ネイビー×ホワイト配色","Hiroshi Fujiwara監修"],              searchKeyword:"ナイキ エアジョーダン1 フラグメント スニーカー",  imageUrl:"https://images.stockx.com/360/Air-Jordan-1-Retro-Fragment/Images/Air-Jordan-1-Retro-Fragment/Lv2/img01.jpg" },
  { id:16, brands:"Nike × CLOT",              brandTags:["Nike","CLOT"],                  name:"Air Max 1 Kiss of Death",          year:2006, cat:"スニーカー", orig:13000,  market:300000, rarity:"very_rare", icon:"KOD",  desc:"Edison Chenによる鍼灸インスパイアデザイン。透明アウトソールに経絡図が描かれた伝説的1足。",     points:["透明アウトソールに経絡ポイント刻印","シルク素材のアッパー","CLOTの龍マーク刻印"],     searchKeyword:"ナイキ エアマックス1 クロット スニーカー",       imageUrl:"https://static.sneakerjagers.com/products/660x660/187336.jpg" },
  { id:17, brands:"Nike × atmos",             brandTags:["Nike","atmos"],                 name:"Air Max 1 Elephant",               year:2006, cat:"スニーカー", orig:10000,  market:400000, rarity:"very_rare", icon:"ATM",  desc:"東京・原宿のatmosとのコラボ。AJ3のエレファントプリントをAM1に落とし込んだ歴史的1足。",        points:["エレファントプリントの微細なシボ感","翡翠グリーンのエアユニット","atmos刻印インソール"], searchKeyword:"ナイキ エアマックス1 エレファント スニーカー",  imageUrl:"https://static.sneakerjagers.com/products/660x660/150899.jpg" },
  { id:18, brands:"Nike × Patta",             brandTags:["Nike","Patta"],                 name:"Air Max 1 The Wave",               year:2021, cat:"スニーカー", orig:17000,  market:150000, rarity:"very_rare", icon:"PTA",  desc:"アムステルダム発Pattaとのコラボ。ウェーブ型マッドガードが革新的。ブレスレット同梱版は超希少。", points:["ウェーブ型マッドガードの成形精度","Patta「P」ロゴインソール刻印","ブレスレット付属（2021年版）"], searchKeyword:"ナイキ エアマックス1 パタ スニーカー",       imageUrl:"https://static.sneakerjagers.com/products/660x660/237019.jpg" },
  { id:19, brands:"Nike × Undercover",        brandTags:["Nike","Undercover"],            name:"React Element 87",                 year:2017, cat:"スニーカー", orig:20000,  market:100000, rarity:"rare",      icon:"UC",   desc:"Jun TakahashiとNikeのコラボ。半透明アッパーとReactフォームの組み合わせ。",                      points:["半透明アッパーの質感","UnderoverとNikeの共同タグ","React素材の中敷き透明感"],         searchKeyword:"ナイキ アンダーカバー スニーカー",              imageUrl:"https://images.stockx.com/360/Nike-React-Element-87-Undercover-Lakeside/Images/Nike-React-Element-87-Undercover-Lakeside/Lv2/img01.jpg" },
  { id:20, brands:"Nike × ACRONYM",           brandTags:["Nike","ACRONYM"],               name:"Air Presto Mid",                   year:2016, cat:"スニーカー", orig:17000,  market:150000, rarity:"very_rare", icon:"ACR",  desc:"Errolson HughによるPresto改。サイドジッパーとストラップを追加した機能至上主義デザイン。",      points:["サイドジッパーの開閉精度","Tシャツサイズ（XS〜XL）での販売","トゥボックスのリインフォース"], searchKeyword:"ナイキ アクロニウム プレスト スニーカー",    imageUrl:"https://images.stockx.com/360/Nike-Air-Presto-Mid-Acronym-Racer-Pink/Images/Nike-Air-Presto-Mid-Acronym-Racer-Pink/Lv2/img01.jpg" },
  { id:21, brands:"Nike × Tom Sachs",         brandTags:["Nike","Tom Sachs"],             name:"Mars Yard 2.0",                    year:2017, cat:"スニーカー", orig:20000,  market:500000, rarity:"very_rare", icon:"MY2",  desc:"アーティストTom SachsとNikeCraftのコラボ。NASA素材を使った現代スニーカー史上最も希少な1足の一つ。", points:["NikeCraft表記タグ（Nike本体でない）","Vectranクリーム/赤の素材構成","Tom Sachs手書き風グラフィック"], searchKeyword:"ナイキ トムサックス マーズヤード スニーカー", imageUrl:"https://static.sneakerjagers.com/products/660x660/228066.jpg" },
  { id:22, brands:"Nike × Fear of God",       brandTags:["Nike","Fear of God"],           name:"Air Fear of God 1",                year:2019, cat:"スニーカー", orig:35000,  market:180000, rarity:"very_rare", icon:"FOG",  desc:"Jerry LorenzによるNikeとの唯一のコラボ（後にAdidasへ移籍）。ダブルZoomユニットで無重力感を演出。", points:["ダブルスタックZoomヒールの厚み","Fear of God × Nikeタグ主体","ベージュ/ブラックの2色展開"], searchKeyword:"ナイキ フィアオブゴッド スニーカー",          imageUrl:"https://images.stockx.com/360/Nike-Air-Fear-Of-God-1-Light-Bone/Images/Nike-Air-Fear-Of-God-1-Light-Bone/Lv2/img01.jpg" },
  { id:23, brands:"Dior × Nike",              brandTags:["Nike","Dior"],                  name:"Air Jordan 1 High Dior",           year:2020, cat:"スニーカー", orig:220000, market:2000000,rarity:"very_rare", icon:"DRJ",  desc:"Kim Jones指揮のDiorとNikeの歴史的コラボ。8,500足限定。プレミアムレザーとDior Obliqueスウッシュ。",  points:["Dior Obliqueジャカードスウッシュの精度","インソールのシリアルナンバー確認","Dior×Jordan Brand共同箱と証明書"], searchKeyword:"ナイキ エアジョーダン1 ディオール スニーカー", imageUrl:"https://images.stockx.com/360/Air-Jordan-1-Retro-High-Dior/Images/Air-Jordan-1-Retro-High-Dior/Lv2/img01.jpg" },
  // ── Supreme ──
  { id:3,  brands:"Supreme × The North Face", brandTags:["Supreme","The North Face"],    name:"Mountain Parka",                   year:2019, cat:"ジャケット", orig:65000,  market:180000, rarity:"very_rare", icon:"TNF",  desc:"毎シーズン話題を呼ぶ定番コラボ。初期ものは特に希少。",                                              points:["TNF×Supreme Wovenラベル","フロントにSupreme刺繍","Gore-Tex素材（一部）"],             searchKeyword:"ノースフェイス マウンテンパーカー メンズ アウター", imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632649159-supreme-tnf-ss19-00.jpg" },
  { id:4,  brands:"Supreme × Louis Vuitton",  brandTags:["Supreme","Louis Vuitton"],     name:"Box Logo Tee",                     year:2017, cat:"Tシャツ",   orig:50000,  market:300000, rarity:"very_rare", icon:"LV",   desc:"2017年パリコレで電撃発表。LVモノグラム×Box Logoの歴史的コラボ。",                               points:["LVショップのみ販売","レシート&証明書必須","偽物が非常に多い"],                        searchKeyword:"シュプリーム ボックスロゴ Tシャツ メンズ",      imageUrl:"https://www.highsnobiety.com/static-assets/dato/1636752073-supreme-louis-vuitton-every-piece-00.jpg" },
  { id:8,  brands:"Supreme × Stone Island",   brandTags:["Supreme","Stone Island"],      name:"Jacket",                           year:2020, cat:"ジャケット", orig:120000, market:280000, rarity:"very_rare", icon:"SI",   desc:"ストリートの王とイタリア職人ブランドの夢のコラボ。",                                              points:["左右異なるワッペン","Stone Island特殊染色","共同製造証明書付き"],                    searchKeyword:"ストーンアイランド ジャケット メンズ",           imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632503622-supreme-stone-island-fw20-feature.jpg" },
  { id:12, brands:"Supreme × Burberry",       brandTags:["Supreme","Burberry"],          name:"Box Logo Hooded Sweatshirt",       year:2022, cat:"パーカー",  orig:45000,  market:160000, rarity:"very_rare", icon:"BB",   desc:"2022年に実現した超意外なコラボ。バーバリーチェック×Box Logoが話題。",                          points:["バーバリーチェック使用","共同ロゴタグ","限定店舗のみ"],                               searchKeyword:"シュプリーム パーカー フーディー メンズ",        imageUrl:"https://www.highsnobiety.com/static-assets/dato/1646662564-supreme-burberry-collab-lookbook-release-date-droplist-price-website-buy-13.jpg" },
  { id:24, brands:"Supreme × Timberland",     brandTags:["Supreme","Timberland"],        name:"6-Inch Premium Boot",              year:2017, cat:"ブーツ",   orig:25000,  market:100000, rarity:"rare",      icon:"TMB",  desc:"ストリートとアウトドアの融合。Supreme × Timberlandの毎シーズン定番コラボ。星条旗柄や特殊素材が人気。", points:["Supreme×Timberlandシュータング内タグ","イエローステッチの均一さ","シーズン固有の素材・プリント"], searchKeyword:"ティンバーランド ブーツ メンズ シュプリーム",  imageUrl:"https://images.stockx.com/360/Timberland-6-Premium-Waterproof-Boot-Supreme-Multi-Color/Images/Timberland-6-Premium-Waterproof-Boot-Supreme-Multi-Color/Lv2/img01.jpg" },
  { id:25, brands:"Supreme × Vans",           brandTags:["Supreme","Vans"],              name:"Old Skool Pro",                    year:2015, cat:"スニーカー", orig:9000,   market:60000,  rarity:"rare",      icon:"VSP",  desc:"1996年から続く長寿コラボ。Supremeのグラフィックを毎シーズン落とし込んだVansの定番。",             points:["Vansソールパターンの精度","Supreme Box Logoプリントの位置とサイズ","初期ものは別途タグラベル縫い付け"], searchKeyword:"バンズ オールドスクール スニーカー シュプリーム", imageUrl:"https://images.stockx.com/360/Vans-Old-Skool-Supreme-Grid-White/Images/Vans-Old-Skool-Supreme-Grid-White/Lv2/img01.jpg" },
  { id:26, brands:"Supreme × CDG",            brandTags:["Supreme","Comme des Garçons"], name:"Nike AF1 × Supreme × CDG",        year:2017, cat:"スニーカー", orig:25000,  market:130000, rarity:"very_rare", icon:"CDG",  desc:"Supreme × CDG × Nikeの3者コラボ。アイボールプリントのAF1が話題。",                              points:["3ブランド融合ロゴの位置確認","CDG SHIRTのタグライン明記","アイボールプリントの精度"],   searchKeyword:"シュプリーム コムデギャルソン ナイキ スニーカー", imageUrl:"https://images.stockx.com/360/Nike-Air-Force-1-Low-Supreme-x-Comme-des-Garcons-2018/Images/Nike-Air-Force-1-Low-Supreme-x-Comme-des-Garcons-2018/Lv2/img01.jpg" },
  { id:27, brands:"Supreme × Dr. Martens",    brandTags:["Supreme","Dr. Martens"],       name:"1461 3-Eye Shoe",                  year:2021, cat:"シューズ",  orig:22000,  market:60000,  rarity:"uncommon",  icon:"DRM",  desc:"パンクとストリートの融合。Supreme × Dr. Martensの毎シーズン定番コラボ。",                         points:["Dr. Martensイエローステッチの均一さ","Supreme×Dr. Martens融合タグ","各シーズン固有カラー確認"], searchKeyword:"ドクターマーチン シューズ シュプリーム メンズ", imageUrl:"https://images.stockx.com/360/Dr-Martens-1461-3-Eye-Supreme-Black/Images/Dr-Martens-1461-3-Eye-Supreme-Black/Lv2/img01.jpg" },
  // ── Adidas ──
  { id:7,  brands:"Adidas × Wales Bonner",    brandTags:["Adidas","Wales Bonner"],       name:"Samba",                            year:2024, cat:"スニーカー", orig:22000,  market:48000,  rarity:"rare",      icon:"WB",    desc:"Wales BonnerとAdidasのSamba。ハンドクラフトレザーとアフリカンモチーフ。",                         points:["ハンドクラフトレザー","Wales Bonnerテープ","アフリカンモチーフ"],                      searchKeyword:"アディダス サンバ スニーカー メンズ",           imageUrl:"https://www.highsnobiety.com/static-assets/dato/1704967259-wales-bonner-adidas-samba-2024-001.jpg" },
  { id:13, brands:"Adidas × Yeezy",           brandTags:["Adidas","Yeezy"],              name:"Boost 350 V2",                     year:2016, cat:"スニーカー", orig:29700,  market:55000,  rarity:"uncommon",  icon:"YZY",  desc:"Kanye WestとAdidasのメガコラボ。ニット素材のアッパーとBoostソールが特徴。",                       points:["Primeknit素材","Boostフルソール","半透明ストライプ"],                                  searchKeyword:"アディダス イージーブースト スニーカー",         imageUrl:"https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Core-Black-Red-2017/Images/adidas-Yeezy-Boost-350-V2-Core-Black-Red-2017/Lv2/img01.jpg" },
  { id:14, brands:"Adidas × Pharrell",        brandTags:["Adidas","Pharrell Williams"],  name:"Human Race NMD",                   year:2016, cat:"スニーカー", orig:24000,  market:45000,  rarity:"rare",      icon:"HR",   desc:"ファレル・ウィリアムスとのコラボNMD。カラフルで独自のフェイスプレートが特徴。",                  points:["カスタムフェイスプレート","カラフル展開","Pharrell直筆デザイン"],                      searchKeyword:"アディダス NMD スニーカー メンズ",               imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2016/07/human-race-adidas-nmd-2.jpg" },
  { id:28, brands:"Adidas × Rick Owens",      brandTags:["Adidas","Rick Owens"],         name:"Tech Runner",                      year:2014, cat:"スニーカー", orig:35000,  market:120000, rarity:"rare",      icon:"RO",   desc:"Rick OwensとAdidasの2013〜2017年パートナーシップ。暗黒的美学でAdidasを再解釈したRunnerシリーズ。",  points:["ROロゴタグとAdidasスリーストライプスの共存","黒/グレー/白のRO特有カラーパレット","プラットフォームや特殊シルエット"], searchKeyword:"アディダス リックオウエンス スニーカー",       imageUrl:"https://images.stockx.com/360/adidas-Level-Runner-Low-2-Rick-Owens-Black-Milk/Images/adidas-Level-Runner-Low-2-Rick-Owens-Black-Milk/Lv2/img01.jpg" },
  { id:29, brands:"Adidas × Prada",           brandTags:["Adidas","Prada"],              name:"Superstar",                        year:2019, cat:"スニーカー", orig:50000,  market:180000, rarity:"very_rare", icon:"ADP",  desc:"PradaとAdidasのラグジュアリーコラボ。Saffiano素材とスーパースターの融合。",                         points:["PradaのSaffiano素材の質感","「A+P」融合ロゴ","PRIMAGREENリサイクル素材表記"],          searchKeyword:"アディダス プラダ スーパースター スニーカー",    imageUrl:"https://images.stockx.com/360/adidas-Superstar-Prada-White-Black/Images/adidas-Superstar-Prada-White-Black/Lv2/img01.jpg" },
  { id:30, brands:"Adidas × Bad Bunny",       brandTags:["Adidas","Bad Bunny"],          name:"Forum Buckle Low",                 year:2021, cat:"スニーカー", orig:14000,  market:180000, rarity:"very_rare", icon:"BB2",  desc:"プエルトリコのスター Bad BunnyとAdidasのコラボ。バックルタン付きForumが話題。初回は転売相場700ドル超。", points:["バックルタン（横バックルの独自デザイン）","白うさぎアイコン刺繍の精度","コーヒー/パステルなど固有カラーウェイ"], searchKeyword:"アディダス バッドバニー フォーラム スニーカー", imageUrl:"https://images.stockx.com/360/adidas-Forum-Buckle-Low-White/Images/adidas-Forum-Buckle-Low-White/Lv2/img01.jpg" },
  // ── New Balance ──
  { id:6,  brands:"New Balance × ALD",        brandTags:["New Balance","Aime Leon Dore"],name:"550",                             year:2024, cat:"スニーカー", orig:18700,  market:55000,  rarity:"rare",      icon:"550",   desc:"NYのセレクトショップALDとNBの人気コラボ。レトロなカラーパレットが◎",                          points:["ALDシグネチャーカラー","プレミアムレザー","ALD×NBダブルロゴ"],                       searchKeyword:"ニューバランス 550 スニーカー レザー",           imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2022/03/Aime-Leon-Dore-New-Balance-550-2022-Release-Date.jpeg" },
  { id:15, brands:"New Balance × Salehe Bembury", brandTags:["New Balance","Salehe Bembury"], name:"2002R",                    year:2022, cat:"スニーカー", orig:18150,  market:40000,  rarity:"rare",      icon:"2002", desc:"デザイナーSalehe BemburyとNBのコラボ2002R。自然からインスパイアされた配色が特徴。",            points:["Saleheシグネチャーカラー","特殊アウトソール","N刺繍"],                                searchKeyword:"ニューバランス 2002R スニーカー",                 imageUrl:"https://cdn.sanity.io/images/pu5wtzfc/production/ab44a9b0a407351551d19628e3fae456f0a93a4f-1200x750.jpg" },
  { id:31, brands:"New Balance × Joe Freshgoods", brandTags:["New Balance","Joe Freshgoods"], name:"992 No Emotions Are Emotions", year:2020, cat:"スニーカー", orig:19000, market:200000, rarity:"very_rare", icon:"992",  desc:"シカゴ発JFGとNBの歴史的コラボ。「感情なき感情」をテーマにしたNBA ASW限定。MADE IN USA。",      points:["MADE IN USA（メキシコ製との区別重要）","JFG刻印インソール","人間の心臓色カラーウェイ"], searchKeyword:"ニューバランス 992 スニーカー",                  imageUrl:"https://images.stockx.com/360/New-Balance-992-Dont-Be-Mad-No-Emotions-Are-Emotions/Images/New-Balance-992-Dont-Be-Mad-No-Emotions-Are-Emotions/Lv2/img01.jpg" },
  { id:32, brands:"New Balance × Bodega",     brandTags:["New Balance","Bodega"],        name:"990v3 Here To Stay",               year:2021, cat:"スニーカー", orig:24000,  market:100000, rarity:"rare",      icon:"BDG",  desc:"ボストンのBodegaとNBのコラボ990v3。15周年記念のMADE IN USA初コラボ。",                           points:["Bodega「Here to Stay」刻印インソール","990v3のMADE IN USA表記","チャンキーソールシルエット"], searchKeyword:"ニューバランス 990 スニーカー ボデガ",        imageUrl:"https://images.stockx.com/360/New-Balance-990v3-Bodega-Here-To-Stay/Images/New-Balance-990v3-Bodega-Here-To-Stay/Lv2/img01.jpg" },
  { id:33, brands:"New Balance × Concepts",   brandTags:["New Balance","Concepts"],      name:"999 Kennedy",                      year:2011, cat:"スニーカー", orig:14000,  market:250000, rarity:"very_rare", icon:"CNP",  desc:"ボストンのConceptsとNBのコラボ999。ノーティカルテーマとモールスコードタング。",                  points:["CNCPTS刻印インソール","ノーティカル柄ライナー","ボストン限定BOX包装"],                searchKeyword:"ニューバランス 999 スニーカー コンセプツ",       imageUrl:"https://images.stockx.com/360/New-Balance-999-Concepts-The-Kennedy/Images/New-Balance-999-Concepts-The-Kennedy/Lv2/img01.jpg" },
  // ── Carhartt WIP ──
  { id:5,  brands:"Carhartt WIP × A.P.C.",    brandTags:["Carhartt WIP","A.P.C."],       name:"Detroit Jacket",                   year:2018, cat:"ジャケット", orig:38000,  market:62000,  rarity:"uncommon",  icon:"CxA",  desc:"A.P.CとのコラボDetroit Jacket。機能性×ミニマルデザインの融合。",                                points:["APCシグネチャーライニング","ダブルタグ仕様","フランスでも限定販売"],                   searchKeyword:"カーハート ジャケット メンズ ワーク",            imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632580155-apc-carhartt-wip-ss20-00.jpg" },
  { id:34, brands:"Carhartt WIP × Brain Dead", brandTags:["Carhartt WIP","Brain Dead"],  name:"Carpenter Pants",                  year:2018, cat:"パンツ",   orig:18000,  market:50000,  rarity:"rare",      icon:"CBD",  desc:"Brain DeadとCarharttのコラボ。Ed Davis展覧会発。Brain Deadパッチが付いたカーペンターパンツ。",    points:["Brain Dead独自イラストパッチの精度","Carhartt WIPオリジナルパッチとの共存","カリフォルニア的デザイン感"], searchKeyword:"カーハート カーペンターパンツ メンズ",          imageUrl:"https://images.stockx.com/images/Carhartt-WIP-x-Brain-Dead-Beach-Carpenter-Pant-Off-White.jpg?fit=fill&bg=FFFFFF&w=576&h=384&q=60&dpr=1&trim=color&updated_at=1623267554" /* fallback */ },
  { id:35, brands:"Carhartt WIP × Slam Jam",  brandTags:["Carhartt WIP","Slam Jam"],     name:"Uniform Collection",               year:2017, cat:"ジャケット", orig:15000,  market:45000,  rarity:"uncommon",  icon:"CSJ",  desc:"Slam JamとCarharttのコラボ。1960年代ガソリンスタンドユニフォームをインスパイアした7点コレクション。", points:["Slam Jam×Carharttトーン on トーンパッチ","ポリコットン素材の質感","ユーティリティポケット配置"], searchKeyword:"カーハート ジャケット スラムジャム メンズ",     imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:36, brands:"Carhartt WIP × Human Made", brandTags:["Carhartt WIP","Human Made"],  name:"Detroit Jacket",                   year:2022, cat:"ジャケット", orig:35000,  market:75000,  rarity:"uncommon",  icon:"CHM",  desc:"NIGOのHuman MadeとCarhartt WIPのコラボ。ワークウェアとポップアートの融合。",                       points:["Human MadeダックアイコンとCarhartt WIPの共同タグ","ハートモチーフとロゴの共存","NIGOのヴィンテージワークウェア解釈"], searchKeyword:"カーハート ヒューマンメイド ジャケット",       imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  // ── Champion ──
  { id:37, brands:"Champion × Supreme",       brandTags:["Champion","Supreme"],          name:"Reverse Weave Hoodie",             year:2015, cat:"パーカー",  orig:12000,  market:65000,  rarity:"uncommon",  icon:"CHS",  desc:"ChampionとSupremeの定番コラボ。毎シーズン違うグラフィックで展開されるリバースウィーブパーカー。",  points:["Supreme×Champion融合タグ","ChampionリバースウィーブのDコードナンバー","Supreme WOODロゴの位置"], searchKeyword:"チャンピオン パーカー シュプリーム メンズ",    imageUrl:"https://images.stockx.com/images/Supreme-X-Champion-Hooded-Sweatshirt-Ash-Grey.jpeg?fit=fill&bg=FFFFFF&w=576&h=384&q=60&dpr=1&trim=color&updated_at=1744142786" },
  { id:38, brands:"Champion × Vetements",     brandTags:["Champion","Vetements"],        name:"Oversize Hoodie",                  year:2016, cat:"パーカー",  orig:50000,  market:100000, rarity:"rare",      icon:"CHV",  desc:"Demna GvasaliaのVetementsとChampionのコラボ。極端なオーバーサイズで話題を呼んだ。",               points:["Vetementsの極端なオーバーサイズプロポーション","Champion×Vetementsの共同タグ","ChampionのCロゴとVetementsロゴの共存"], searchKeyword:"チャンピオン パーカー ベトモン オーバーサイズ", imageUrl:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80" /* fallback */ },
  { id:39, brands:"Champion × Needles",       brandTags:["Champion","Needles"],          name:"Rebuild Hoodie",                   year:2018, cat:"パーカー",  orig:40000,  market:120000, rarity:"rare",      icon:"CHN",  desc:"NeedlesがChampionのリバースウィーブを解体・再構築。多色パッチワークが代名詞の日本独自の人気コラボ。", points:["各パーツが本物ChampionリバースウィーブのPW確認","Needles固有の非対称・多色パッチ配置","Needlesナンバーブランドタグ確認"], searchKeyword:"チャンピオン ニードルス パーカー リメイク",     imageUrl:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80" /* fallback */ },
  // ── Levi's ──
  { id:40, brands:"Levi's × Supreme",         brandTags:["Levi's","Supreme"],            name:"Trucker Jacket",                   year:2012, cat:"ジャケット", orig:25000,  market:80000,  rarity:"rare",      icon:"LxS",  desc:"2011年から続くカリフォルニア同士の定番コラボ。Supremeプリント×Levi'sトラッカージャケット。毎シーズン異なる柄で展開。", points:["Levi's×Supreme共同タグ","Red TabにSupremeロゴ刻印","各シーズン固有プリント（コピー品はぼやける）"], searchKeyword:"リーバイス シュプリーム トラッカージャケット",  imageUrl:"https://images.stockx.com/images/Supreme-Levis-Roses-Trucker-Jacket-Black.jpg?fit=fill&bg=FFFFFF&w=576&h=384&q=60&dpr=1&trim=color&updated_at=1744142786" },
  { id:41, brands:"Levi's × Supreme",         brandTags:["Levi's","Supreme"],            name:"505 Denim Jeans",                  year:2014, cat:"デニム",   orig:20000,  market:50000,  rarity:"uncommon",  icon:"L505", desc:"Levi's 505ベースにSupremeのグラフィックやプリントを加えた定番コラボデニム。",                          points:["Red TabにSupremeロゴ刻印","シーズン固有プリント","Levi's×Supreme両タグ確認"],        searchKeyword:"リーバイス 505 シュプリーム デニム",            imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  { id:42, brands:"Levi's × Vetements",       brandTags:["Levi's","Vetements"],          name:"Deconstructed Denim Jacket",       year:2017, cat:"ジャケット", orig:120000, market:200000, rarity:"very_rare", icon:"LxV",  desc:"Demna GvasaliaによるLevi'sのデコンストラクション。パリオートクチュールウィーク発表。解体・再構築の前衛的作品。", points:["Vetementsオーバーサイズシルエット（極端な大きさ）","Levi's×Vetementsの両ブランドタグ共存","わざと粗くみせた縫い目（本物の特徴）"], searchKeyword:"リーバイス ベトモン デニムジャケット",           imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:43, brands:"Levi's × Off-White",       brandTags:["Levi's","Off-White"],          name:"Sherpa Trucker Jacket",            year:2016, cat:"ジャケット", orig:100000, market:180000, rarity:"very_rare", icon:"LxO",  desc:"Virgil AblohによるLevi's Made & Craftedとのコラボ。カラーブロッキングと露出縫い目が特徴。11アイテム展開。", points:["Off-Whiteシグネチャーの露出縫い目","工業用ジッパーとOff-Whiteタグ構造","カラーブロッキングの境界線精度"], searchKeyword:"リーバイス オフホワイト ジャケット",             imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:44, brands:"Levi's × Junya Watanabe",  brandTags:["Levi's","Comme des Garçons"],  name:"Patchwork 501",                    year:2016, cat:"デニム",   orig:60000,  market:180000, rarity:"very_rare", icon:"LxJ",  desc:"20年以上続くJunya Watanabe MAN × Levi'sコラボ。非デニム素材や複数素材パッチワーク501が代名詞。",   points:["Junya Watanabe MANタグ（eYe CDG JUNYA表記）","素材の複雑な組み合わせと縫製精度","内側Levi'sヴィンテージクロージングタグとの共存"], searchKeyword:"リーバイス ジュンヤワタナベ デニム パッチワーク", imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  { id:45, brands:"Levi's × Denim Tears",     brandTags:["Levi's","Denim Tears"],        name:"Cotton Wreath Trucker Jacket",     year:2020, cat:"ジャケット", orig:40000,  market:130000, rarity:"very_rare", icon:"LxDT", desc:"Tremaine EmoryとLevi'sのコラボ。コットンリースプリントはアメリカの綿と奴隷制の歴史を「ロゴ」として再解釈したメッセージ性の高い作品。", points:["コットンリースプリントの各フラワーの細部","Denim Tears×Levi'sの共同タグ","アーティスティックなメッセージプリント（コピー品はテキスト不鮮明）"], searchKeyword:"リーバイス デニムティアーズ トラッカー",         imageUrl:"https://images.stockx.com/images/Denim-Tears-Leather-Cotton-Wreath-Type-3-Jacket-Black-Denim.jpg?fit=fill&bg=FFFFFF&w=576&h=384&q=60&dpr=1&trim=color&updated_at=1694548439" },
  { id:46, brands:"Levi's × Stüssy",          brandTags:["Levi's","Stüssy"],             name:"Type II Trucker Jacket",           year:2023, cat:"ジャケット", orig:28000,  market:65000,  rarity:"uncommon",  icon:"LxST", desc:"同じカリフォルニアルーツを持つ2ブランドのコラボ。Stüssy Double SとLevi'sのボタンシャンクグラフィックを合体させた共同ロゴが特徴。", points:["共同ブランドボタンシャンク（Levi's+Stüssy融合刻印）","Stüssy Double S刺繍の精度","コーデュロイカラーなどシーズン固有ディテール"], searchKeyword:"リーバイス ステューシー トラッカー ジャケット",  imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:47, brands:"Levi's × HUMAN MADE",      brandTags:["Levi's","Human Made"],         name:"506 Trucker Jacket",               year:2022, cat:"ジャケット", orig:60000,  market:120000, rarity:"rare",      icon:"LxHM", desc:"NIGOはLevi'sのレアヴィンテージコレクター。Human MadeのダックアイコンがLevi'sへのオマージュで右翼が赤い。日本製セルヴィッチデニム使用。", points:["Human MadeダックアイコンのRight Wingが赤","日本製セルヴィッチデニムの赤ミミ確認","Gears for Futuristic Teenagersタグ刺繍の精度"], searchKeyword:"リーバイス ヒューマンメイド トラッカージャケット", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:48, brands:"Levi's × Sacai",           brandTags:["Levi's","Sacai"],              name:"Hybrid Trucker Jacket",            year:2023, cat:"ジャケット", orig:90000,  market:190000, rarity:"very_rare", icon:"LxSC", desc:"阿部千登勢のSacaiがLevi'sを解体・再構築。Type I/II/IIIを1枚に融合させた彫刻的なジャケット。",         points:["複数シルエット融合の縫製品質（フロントとバックで異なる型）","Sacai固有のアンカーボタンとリブニット仕上げ","リバーシブル機能と露出セルヴィッチの精度"], searchKeyword:"リーバイス サカイ デニムジャケット コラボ",      imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:49, brands:"Levi's × BEAMS",           brandTags:["Levi's","BEAMS"],              name:"Super Wide 506XX Jacket",          year:2022, cat:"ジャケット", orig:33000,  market:45000,  rarity:"uncommon",  icon:"LxBM", desc:"日本のBEAMSとのSuper Wide Collection。1940〜50年代ヴィンテージデニムのシルエットを現代的な極ワイドで再現。日本製。", points:["BEAMS特注の共同ブランドタグ","506XXや501XXの古いシルエット確認","Made in Japanの品質タグ"], searchKeyword:"リーバイス ビームス デニムジャケット スーパーワイド", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:50, brands:"Levi's × RE/DONE",         brandTags:["Levi's","RE/DONE"],            name:"High Rise Ankle Crop",             year:2015, cat:"デニム",   orig:28000,  market:35000,  rarity:"common",    icon:"LxRD", desc:"ヴィンテージLevi'sをLAで手作業で解体・再縫製するRE/DONEとの公式パートナーシップ。各商品が1点物。26万本以上をアップサイクル。", points:["内側にRE/DONEタグと元のLevi'sタグが残存","LAメイドの表記確認","ヴィンテージ由来の自然な色落ちとダメージ"], searchKeyword:"リーバイス リダン デニムパンツ",                imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  { id:51, brands:"Levi's × Justin Timberlake", brandTags:["Levi's","Justin Timberlake"], name:"Fresh Leaves Trucker Jacket",    year:2018, cat:"ジャケット", orig:18000,  market:25000,  rarity:"common",    icon:"LxJT", desc:"ジャスティン・ティンバーレイクとのFresh Leavesコレクション。メンフィスと音楽への愛をデニムに落とし込んだコラボ。", points:["「Fresh Leaves」スリーブプリント","ブラックライティングのRed Tab（本コラボ専用）","ブラック文字の「Two Horse Pull」レザーパッチ"], searchKeyword:"リーバイス ジャスティンティンバーレイク ジャケット", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:52, brands:"Levi's × Air Jordan",      brandTags:["Levi's","Nike"],               name:"Air Jordan 1 Mid 23/501",          year:2008, cat:"スニーカー", orig:17000,  market:180000, rarity:"very_rare", icon:"LAJ",  desc:"Levi'sとAir Jordan 1のコラボ。2,323足限定でエレファントプリント+デニムアッパー。シリアルナンバー入り。",     points:["シリアルナンバー入り（2,323足中の番号刻印）","デニム素材アッパーの縫製と色落ち","Levi's Red Tabが靴のタングに縫い付け"], searchKeyword:"リーバイス エアジョーダン スニーカー デニム",   imageUrl:"https://images.stockx.com/360/Air-Jordan-1-Retro-Levis-23-501-Denim-Pack/Images/Air-Jordan-1-Retro-Levis-23-501-Denim-Pack/Lv2/img01.jpg" },
  { id:53, brands:"Levi's × Kiko Kostadinov", brandTags:["Levi's","Kiko Kostadinov"],    name:"Deconstructed Denim Capsule",      year:2024, cat:"ジャケット", orig:70000,  market:130000, rarity:"rare",      icon:"LxKK",  desc:"PFWランウェイ発表の7点キャプセル。Kiko Kostadinov特有のデコンストラクテッドシルエットとファーリーデニム素材。",       points:["Kiko Kostadinov特有のデコンストラクテッドシルエット","ファーリー（モコモコ）デニム素材の独特なテクスチャー","共同ブランドタグとPFWコレクション品番"], searchKeyword:"リーバイス コラボ デニムジャケット 2024",       imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:54, brands:"Levi's × JJJJound",        brandTags:["Levi's","JJJJound"],           name:"501'93 Jeans",                     year:2024, cat:"デニム",   orig:18000,  market:45000,  rarity:"uncommon",  icon:"LxJJ",  desc:"JJJJoundのミニマリスト美学でLevi's 501'93を再解釈。過剰なブランディングなし。10点コレクション。",             points:["JJJJoundのミニマリスト美学（過剰なブランディングなし）","501'93シルエットの精度（ゆるいバギーフィット）","共同ロゴの位置とタグ"], searchKeyword:"リーバイス ジジジジジジジジound デニム",      imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  { id:55, brands:"Levi's × ERL",             brandTags:["Levi's","ERL"],                name:"Patchwork Denim Jacket",           year:2023, cat:"ジャケット", orig:55000,  market:90000,  rarity:"rare",      icon:"LxERL", desc:"カリフォルニアブランドERLとLevi'sのコラボ。ベニスビーチ的なサンシャインカラーのパッチワークが特徴。",        points:["ERL固有のベニスビーチ的カラーパレット","パッチワークの素材精度","ERL×Levi'sの共同タグ"],  searchKeyword:"リーバイス ERL コラボ デニム",                  imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:56, brands:"Levi's × Grateful Dead",   brandTags:["Levi's","Grateful Dead"],      name:"Trucker Jacket",                   year:2021, cat:"ジャケット", orig:22000,  market:40000,  rarity:"uncommon",  icon:"LxGD", desc:"グレイトフル・デッドとLevi'sのコラボ。バンドグラフィックをデニムに落とし込んだロック×デニムの定番コラボ。",      points:["グレイトフル・デッド公式ライセンスグラフィック","Levi's×Grateful Deadの共同タグ","ヴィンテージバンドTロゴプリントの精度"], searchKeyword:"リーバイス グレイトフルデッド ジャケット",      imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  // ── Levi's 追加コラボ ──
  { id:57, brands:"Levi's × Engineered Garments", brandTags:["Levi's","Engineered Garments"], name:"Type II Trucker Jacket",          year:2019, cat:"ジャケット", orig:35000,  market:95000,  rarity:"rare",      icon:"LxEG", desc:"Daiki Suzuki率いるEngineered GarmentsとLevi'sのコラボ。米国軍のユーティリティ素材とヴィンテージLevi'sを融合したType II。マルチポケット仕様が特徴。",  points:["EGシグネチャーのシャモワ素材・ミリタリーポケット","Levi's×EGの共同ブランドタグ","ポケット配置がヴィンテージ軍服に準拠"], searchKeyword:"リーバイス エンジニアードガーメンツ ジャケット", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:58, brands:"Levi's × NEIGHBORHOOD",    brandTags:["Levi's","NEIGHBORHOOD"],       name:"Trucker Jacket × Rider's 101-B",   year:2014, cat:"ジャケット", orig:30000,  market:85000,  rarity:"rare",      icon:"LxNH", desc:"NEIGHBORHOODとLevi'sの不定期コラボ。NBHD流のダメージ加工・刺繍・別素材切り替えを施したトラッカージャケット。日本限定。",                               points:["NEIGHBORHOOD×Levi'sの共同タグ（日本語表記あり）","NEIGHBORHOODのダメージ・刺繍加工の精度","日本限定カラーウェイの確認"], searchKeyword:"リーバイス ネイバーフッド ジャケット コラボ",  imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:59, brands:"Levi's × Palace",          brandTags:["Levi's","Palace"],             name:"Palace × Levi's Denim Jacket",     year:2018, cat:"ジャケット", orig:25000,  market:70000,  rarity:"rare",      icon:"LxPL", desc:"ロンドン発スケートブランドPalaceとLevi'sのコラボ。Palaceトライフェルグが刺繍されたオリジナルトラッカーとデニムパンツのセット展開。",                    points:["Palaceトライフェルグ刺繍の精度","Palace×Levi'sの両タグ","バックポケットのPalaceブランドネーム刺繍"], searchKeyword:"リーバイス パレス ジャケット コラボ",           imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  // ── Barbour ──
  { id:60, brands:"Barbour × Supreme",        brandTags:["Barbour","Supreme"],           name:"Waxed Cotton Hunting Jacket",      year:2018, cat:"ジャケット", orig:75000,  market:250000, rarity:"very_rare", icon:"BxS",  desc:"ニューヨーク発SupremeとUKレジェンドBarbourの夢のコラボ。オイルドコットンにBox Logoとファーカラーを組み合わせた限定作品。毎回即完売。",                  points:["Box Logo刺繍（胸位置・サイズの正確さ）","Barbour×Supreme共同ネームタグ","コーデュロイ衿またはファー衿の素材確認"], searchKeyword:"バブアー シュプリーム ジャケット コラボ",       imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:61, brands:"Barbour × Engineered Garments", brandTags:["Barbour","Engineered Garments"], name:"Beaufort Jacket",            year:2021, cat:"ジャケット", orig:65000,  market:130000, rarity:"rare",      icon:"BxEG", desc:"Daiki SuzukiのEGとBarbourのコラボ。軍モノ・ワーク感覚でボーフォートを再解釈。多ポケット仕様とEGシグネチャーデザインがワックスコットンに融合。",           points:["EG×Barbourの両タグ（内側共同ネーム）","EGシグネチャーのミリタリーポケット配置","Barbourオリジナルのコーデュロイ衿とEG素材との共存"], searchKeyword:"バブアー エンジニアードガーメンツ ジャケット",  imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:62, brands:"Barbour × Norse Projects", brandTags:["Barbour","Norse Projects"],    name:"Bedale Wax Jacket",                year:2016, cat:"ジャケット", orig:55000,  market:95000,  rarity:"uncommon",  icon:"BxNP", desc:"コペンハーゲン発Norse ProjectsとBarbourのコラボ。北欧ミニマリズムをBarbourのビデイルに落とし込んだセージグリーンが代表カラー。",                          points:["Norse Projects×Barbourの共同タグ","ビデイルのシルエット確認（NP版は若干スリム）","セージ/ネイビーなどNP固有カラーウェイ"], searchKeyword:"バブアー ノースプロジェクツ ジャケット コラボ", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:63, brands:"Barbour × Paul Smith",     brandTags:["Barbour","Paul Smith"],        name:"Beaufort Jacket PS Edition",       year:2022, cat:"ジャケット", orig:70000,  market:90000,  rarity:"uncommon",  icon:"BxPS", desc:"毎年定番化している英国同士のコラボ。Paul Smithのカラーブロッキング裏地とBarbourのワックスコットンが融合。定番のマルチストライプ裏地が人気。",               points:["Paul Smithシグネチャーのマルチストライプ裏地","Barbour×Paul Smithの共同タグ","ハンドウォーマーポケット内側のストライプ確認"], searchKeyword:"バブアー ポールスミス ジャケット コラボ",       imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:64, brands:"Barbour × White Mountaineering", brandTags:["Barbour","White Mountaineering"], name:"Bedale Jacket",           year:2020, cat:"ジャケット", orig:75000,  market:120000, rarity:"rare",      icon:"BxWM", desc:"相楽茂久のWhite MountaineeringとBarbourのコラボ。テック素材パネル切り替えとBarbourワックスの融合。日本限定展開。",                                    points:["WM×Barbourの共同タグ（日本語表記入り）","テック素材とワックスコットンのパネル切り替え精度","White Mountaineering特有のパターン設計（スリムアーム）"], searchKeyword:"バブアー ホワイトマウンテニアリング ジャケット",  imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:65, brands:"Barbour × Beams",          brandTags:["Barbour","BEAMS"],             name:"SL Bedale / SL Beaufort",          year:2023, cat:"ジャケット", orig:55000,  market:70000,  rarity:"uncommon",  icon:"BxBM", desc:"日本のBEAMSとの長期コラボ。スリムライン（SL）仕様でビデイルをより都市的・細身にアレンジ。BEAMS別注カラーのオリーブやネイビーが定番人気。",                points:["SL（スリムライン）のシルエット確認（通常版より細身）","BEAMS×Barbourの両タグ","BEAMS限定カラーウェイの品番照合"], searchKeyword:"バブアー ビームス ジャケット コラボ SL",       imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:66, brands:"Barbour × Margaret Howell", brandTags:["Barbour","Margaret Howell"],  name:"Bedale Wax Jacket MHL",            year:2019, cat:"ジャケット", orig:68000,  market:88000,  rarity:"uncommon",  icon:"BxMH", desc:"英国デザイナーMargaret HowellとBarbourの上品なコラボ。MHLロゴとBarbourが共存した英国的ミニマリズムの傑作。素材・縫製ともに最高品質。",                   points:["MHL×Barbourの共同タグ","マーガレットハウエル特有のシンプルなカットライン","内側のコットンライニング素材の品質"],                                      searchKeyword:"バブアー マーガレットハウエル ジャケット コラボ", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:67, brands:"Barbour × Drake's",        brandTags:["Barbour","Drake's"],           name:"Beaufort Waxed Jacket",            year:2021, cat:"ジャケット", orig:72000,  market:100000, rarity:"rare",      icon:"BxDK", desc:"ロンドンのドレーパーズブランドDrake'sとBarbourのコラボ。Drake's得意のネクタイ素材を裏地に使用した英国紳士的な限定ジャケット。",                          points:["Drake's×Barbourの共同ブランドタグ","Drake's製ネクタイ素材の裏地（シルク混紡）","ボタンに刻印されたDrake'sとBarbourのロゴ"],                            searchKeyword:"バブアー ドレイクス ジャケット コラボ",          imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  // ── Levi's 追加（Web検索で発見）──
  { id:68, brands:"Levi's × Nike",            brandTags:["Levi's","Nike"],               name:"Apparel Collection",               year:2025, cat:"ジャケット", orig:25000,  market:55000,  rarity:"rare",      icon:"LxNK",  desc:"2025年に実現したLevi'sとNikeのアパレルコラボ。デニムとスポーツウェアの融合。2ブランドの象徴的なロゴが共存した歴史的コレクション。発売直後から転売市場でプレ値。",       points:["Levi'sレッドタブ＋NikeスウッシュのW刻印","デニム素材×ナイロン素材の切り替え精度","両ブランドの正規タグが内側に共存"],                                   searchKeyword:"リーバイス ナイキ コラボ ジャケット 2025",       imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  { id:69, brands:"Levi's × McLaren Racing",  brandTags:["Levi's","McLaren"],            name:"Racing Capsule Collection",        year:2024, cat:"ジャケット", orig:30000,  market:65000,  rarity:"rare",      icon:"LxMC", desc:"F1チームMcLarenとLevi'sのモータースポーツ×デニムの異色コラボ。発売後即完売。パパイヤオレンジ×デニムブルーの配色がレーシングスーツとデニムを融合。",                points:["McLarenパパイヤオレンジの配色精度","Levi's×McLaren共同ロゴタグ","レーシングスーツ由来のリフレクティブディテール"],                                         searchKeyword:"リーバイス マクラーレン レーシング コラボ",      imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:70, brands:"Levi's × Oasis",           brandTags:["Levi's","Oasis"],              name:"30th Anniversary Band Merch",      year:2024, cat:"Tシャツ",   orig:8000,   market:22000,  rarity:"uncommon",  icon:"LxOA", desc:"Oasis再結成30周年記念のバンドコラボ。Levi'sが公式バンドマーチを制作。Liam & NoelのOasisロゴをデニムに落とし込んだ。再結成ツアー告知と同時リリースで即完売。",      points:["Oasis公式ライセンスロゴプリントの精度","Levi's×Oasisの共同ネームタグ","30周年記念の背面グラフィック"],                                                     searchKeyword:"リーバイス オアシス バンドコラボ Tシャツ",       imageUrl:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" /* fallback */ },
  { id:71, brands:"Levi's × Gundam SEED",     brandTags:["Levi's","Gundam"],             name:"Mobile Suit Gundam SEED Collection", year:2024, cat:"Tシャツ", orig:9000,   market:20000,  rarity:"uncommon",  icon:"LxGN", desc:"機動戦士ガンダムSEEDとLevi'sの12点コレクション。ストライクガンダムのカラーリングをデニムに落とし込んだ異色コラボ。日本・アジア市場で特に話題。",                  points:["ガンダムSEED公式ライセンスグラフィック","Levi'sのストライプタグ×ガンダムロゴ共存","フラッグシップカラー（赤白青）の配色精度"],                             searchKeyword:"リーバイス ガンダムシード コラボ Tシャツ",       imageUrl:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" /* fallback */ },
  { id:72, brands:"Levi's × AWAKE NY",        brandTags:["Levi's","AWAKE NY"],           name:"Authorized Vintage Capsule",       year:2024, cat:"デニム",   orig:22000,  market:48000,  rarity:"uncommon",  icon:"LxAW", desc:"NYのAngelo Baque率いるAWAKE NYとLevi'sのコラボ。4点構成（バギージーン・Type I・ジョーツ・ロゴT）。2020年の前回コラボから4年ぶりの復活。",                       points:["AWAKE NY×Levi's共同タグ（ニューヨーク感のある書体）","バギージーンのゆったりシルエット確認","ジョーツ（デニムショーツ）のカットラインの精度"], searchKeyword:"リーバイス アウェイクNY デニム コラボ",           imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  { id:73, brands:"Levi's × Pigalle",         brandTags:["Levi's","Pigalle"],            name:"Denim Capsule Reboot",             year:2024, cat:"デニム",   orig:28000,  market:65000,  rarity:"rare",      icon:"LxPG", desc:"パリのカルト的ストリートブランドPigalleのリブートをLevi'sが支援した異色コラボ。Stéphane Ashpoolによる解体的デニム再解釈。限定店舗のみ販売。",                    points:["Pigalle×Levi'sの共同ブランドタグ（両言語表記）","Ashpool特有の解体・再縫製のラフな縫い目","パリ限定×日本取り扱い店舗の差異"],                          searchKeyword:"リーバイス ピガール コラボ デニム パリ",          imageUrl:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" /* fallback */ },
  // ── Carhartt WIP 追加（Web検索で発見）──
  { id:74, brands:"Carhartt WIP × sacai",     brandTags:["Carhartt WIP","sacai"],        name:"Workwear Capsule Vol.1〜4",        year:2023, cat:"ジャケット", orig:55000,  market:140000, rarity:"very_rare", icon:"CxSC", desc:"阿部千登勢のsacaiとCarhartt WIPの継続シリーズ。三重ステッチ・パイピング・ボンディング技法でワークウェアをハイファッションへ昇華。2023〜2026年に4弾まで展開。",  points:["sacai特有のボンディング技法による素材融合","三重ステッチとパイピングのCarhartt WIP素材","sacai×CWIPの共同タグ（各ドロップ固有品番）"],                   searchKeyword:"カーハート サカイ ジャケット コラボ ワークウェア", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:75, brands:"Carhartt WIP × Palace",    brandTags:["Carhartt WIP","Palace"],       name:"Workwear Collection",              year:2024, cat:"ジャケット", orig:30000,  market:85000,  rarity:"rare",      icon:"CxPL", desc:"ロンドン発スケートブランドPalaceとCarhartt WIPの初コラボ（2024年）と年末の2回目コラボ。ヘビーデューティワークウェアにPalaceのスケートグラフィックを融合。",             points:["Palace×Carhartt WIPの共同タグ","Palaceトライフェルグ刺繍の精度とCarharttDuck生地の質感","スケートグラフィックとワークウェア機能の共存"],            searchKeyword:"カーハート パレス コラボ ジャケット ワーク",     imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:76, brands:"Carhartt WIP × Nike",      brandTags:["Carhartt WIP","Nike"],         name:"Air Force 1 & Vandal High",        year:2025, cat:"スニーカー", orig:18000,  market:80000,  rarity:"rare",      icon:"CxNK",  desc:"Carhartt WIPとNikeの初のフットウェアコラボ。AF1とVandal Highの2型展開。カーハートのワークブーツ的なダック素材ディテールをスニーカーに落とし込んだ話題作。",           points:["Carhartt WIP×Nikeの共同タグ（舌タグ・インソール両方に）","ダック素材由来のテクスチャーアッパー","ワーク感のあるラグソール仕様の確認"],               searchKeyword:"カーハート ナイキ エアフォース1 バンダル スニーカー", imageUrl:"https://images.stockx.com/360/Nike-Air-Force-1-Low-Supreme-Box-Logo-Black/Images/Nike-Air-Force-1-Low-Supreme-Box-Logo-Black/Lv2/img01.jpg" /* fallback */ },
  { id:77, brands:"Carhartt WIP × Wacko Maria", brandTags:["Carhartt WIP","Wacko Maria"], name:"Leopard Print Workwear",          year:2023, cat:"ジャケット", orig:25000,  market:70000,  rarity:"uncommon",  icon:"CxWM", desc:"東京のWacko MariaがCarhartt WIPのクラシックワークピースをヒョウ柄・総柄でリデザイン。ワーカーとギャングの美学を融合した強烈なビジュアル。",                            points:["Wacko Maria×Carhartt WIPの共同タグ","ヒョウ柄プリントの発色とCarharttダック生地との質感差","Wacko Maria特有のグラフィックと配色確認"],          searchKeyword:"カーハート ワコマリア コラボ ジャケット レオパード", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:78, brands:"Carhartt WIP × Nicholas Daley", brandTags:["Carhartt WIP","Nicholas Daley"], name:"Reggae-Inspired FW25 Capsule", year:2025, cat:"ジャケット", orig:35000, market:75000,  rarity:"rare",      icon:"CxND",  desc:"ロンドンのNicholas DaleyとCarhartt WIPの13点コレクション。Daleyの両親が1970年代に運営したジャマイカン・スコティッシュのクラブナイトへのオマージュ。レゲエ×ワークウェア。",  points:["Nicholas Daley×Carhartt WIPの共同タグ","ジャマイカン・スコティッシュの伝統テキスタイルの精度","ワークウェアシルエットに融合したエスニックテキスタイル"], searchKeyword:"カーハート ニコラスデイリー コラボ ジャケット 2025", imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
  { id:79, brands:"Carhartt WIP × INVINCIBLE", brandTags:["Carhartt WIP","INVINCIBLE"], name:"Advanced Exploration × Shinsuke Nakada", year:2024, cat:"ジャケット", orig:30000, market:60000, rarity:"uncommon",  icon:"CxIV", desc:"台湾のINVINCIBLE、アーティストShinsuke Nakada、Carhartt WIPの3者コラボ19点コレクション。「Advanced Exploration」をテーマにしたアジア発の話題作。",           points:["INVINCIBLE×Shinsuke Nakada×Carhartt WIPのトリプルタグ","Nakada固有のグラフィックアート×ワークウェア素材","テーラードジャケット・フランネルシャツなど非ワーク的アイテムの精度"], searchKeyword:"カーハート インビンシブル コラボ ジャケット",    imageUrl:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" /* fallback */ },
];

/** year（整数）から180日以内かどうかを自動判定 */
function calcIsNew(year: number): boolean {
  const releaseApprox = new Date(year, 0, 1); // year年1月1日で近似
  const diffDays = (Date.now() - releaseApprox.getTime()) / 86_400_000;
  return diffDays <= 180;
}

const CATS   = ["すべて", "スニーカー", "ジャケット", "デニム", "パーカー", "Tシャツ", "ブーツ", "シューズ", "パンツ"];
const BRANDS = ["すべて", "Levi's", "Barbour", "Nike", "Supreme", "Adidas", "New Balance", "Carhartt WIP", "Champion", "sacai", "Engineered Garments", "Palace"];

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
  const [query,    setQuery]    = useState("");

  useEffect(() => {
    const keywords = COLLABS.map((c) => c.searchKeyword).join(",");
    fetch(`/api/collab-images?keywords=${encodeURIComponent(keywords)}`)
      .then((r) => r.json())
      .then((data) => setImages(data))
      .catch(() => {});
  }, []);

  const list = useMemo(() => COLLABS.filter((c) => {
    const catOk   = cat   === "すべて" || c.cat === cat;
    const brandOk = brand === "すべて" || c.brandTags.includes(brand);
    const q = query.toLowerCase();
    const qOk = !q || c.name.toLowerCase().includes(q) || c.brands.toLowerCase().includes(q);
    return catOk && brandOk && qOk;
  }), [cat, brand, query]);

  // ブランド別グルーピング（brand=すべて の場合のみ）
  const grouped = useMemo(() => {
    if (brand !== "すべて") return null;
    const map = new Map<string, Collab[]>();
    for (const c of list) {
      const key = c.brandTags[0] ?? c.brands;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return map;
  }, [list, brand]);

  const filterBtn = (active: boolean) => ({
    fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" as const,
    padding: "8px 14px", border: "1px solid", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    background:   active ? "rgba(184,151,74,.1)" : "transparent",
    color:        active ? "#B8974A"             : "#5A6E85",
    borderColor:  active ? "#B8974A"             : "rgba(255,255,255,.07)",
    transition: "all .15s",
  });

  const ListRow = ({ c }: { c: Collab }) => {
    const rc = RARITY_COLOR[c.rarity];
    const mult = (c.market / c.orig).toFixed(1);
    return (
      <div
        onClick={() => setSelected(c)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          borderTop: "1px solid rgba(184,151,74,.07)",
          cursor: "pointer",
          background: "transparent",
          transition: "background .12s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(184,151,74,.04)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {/* 左：名前・バッジ群 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
          {calcIsNew(c.year) && (
            <span style={{
              fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "1px 5px", background: "#B8974A", color: "#0E1B2E", fontWeight: 700, flexShrink: 0,
            }}>NEW</span>
          )}
          <span style={{ fontSize: 13, color: "#F5F0E8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {c.name}
          </span>
          <span style={{ fontSize: 9, color: "#5A6E85", flexShrink: 0 }}>{c.year}</span>
          <span style={{
            fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "1px 5px", border: "1px solid rgba(184,151,74,.25)", color: "#B8974A", flexShrink: 0,
          }}>{c.cat}</span>
          <span style={{
            fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "1px 5px", border: `1px solid ${rc}`, color: rc, flexShrink: 0,
          }}>{RARITY_LABEL[c.rarity]}</span>
        </div>

        {/* 右：価格・倍率・ウィッシュリスト */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 9, color: "rgba(245,240,232,.25)", marginBottom: 1 }}>
              ¥{c.orig.toLocaleString()} →
            </p>
            <p style={{ fontSize: 15, color: "#B8974A", fontFamily: "Georgia, serif", lineHeight: 1 }}>
              ¥{c.market.toLocaleString()}
            </p>
          </div>
          <span style={{ fontSize: 10, color: parseFloat(mult) >= 3 ? "#DC2626" : "#5A6E85", minWidth: 28, textAlign: "right" }}>
            {mult}x
          </span>
          <WishlistButton id={c.id} />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ── フィルター ── */}
      <div style={{ marginBottom: 20 }}>
        {/* テキスト検索 */}
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="ブランド名・アイテム名で検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "9px 14px", background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(184,151,74,.2)", color: "#F5F0E8",
              fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
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

      {/* ── リスト ── */}
      <div style={{ border: "1px solid rgba(184,151,74,.12)", background: "rgba(255,255,255,.015)" }}>
        {/* テーブルヘッダー */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          padding: "8px 16px", borderBottom: "1px solid rgba(184,151,74,.15)",
          background: "rgba(184,151,74,.04)",
        }}>
          <span style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6E85" }}>アイテム</span>
          <span style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6E85" }}>相場</span>
        </div>

        {grouped ? (
          // ブランド別グループ表示
          Array.from(grouped.entries()).map(([brandName, items]) => (
            <div key={brandName}>
              {/* ブランドヘッダー */}
              <div style={{
                padding: "10px 16px",
                borderTop: "1px solid rgba(184,151,74,.12)",
                background: "rgba(14,27,46,.6)",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8974A", fontWeight: 700 }}>
                  {brandName}
                </span>
                <span style={{ fontSize: 8, color: "#5A6E85" }}>{items.length} items</span>
              </div>
              {items.map((c) => <ListRow key={c.id} c={c} />)}
            </div>
          ))
        ) : (
          // ブランドフィルター中は単純なリスト
          list.map((c) => <ListRow key={c.id} c={c} />)
        )}

        {list.length === 0 && (
          <div style={{ padding: "40px 0", textAlign: "center", color: "#5A6E85", fontSize: 13 }}>
            該当するアイテムが見つかりませんでした
          </div>
        )}
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
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <WishlistButton id={selected.id} size="lg" />
                <button onClick={() => setSelected(null)} style={{ color: "#5A6E85", fontSize: 24, background: "none", border: "none", cursor: "pointer", lineHeight: 1, marginTop: 4 }}>×</button>
              </div>
            </div>

            <div style={{ padding: 20 }}>
              {/* 画像 */}
              <div style={{ height: 200, position: "relative", background: "rgba(20,30,50,.8)", border: "1px solid rgba(184,151,74,.1)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Image src={pickImg(selected.imageUrl, images[selected.searchKeyword], selected.cat)} alt={selected.name} fill style={{ objectFit: "cover" }} unoptimized />
              </div>

              <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.7, marginBottom: 16 }}>{selected.desc}</p>

              {/* 相場チャート */}
              {(() => {
                const history = generatePriceHistory(selected.year, selected.orig, selected.market, selected.rarity);
                const idx = getBuyIndex(history);
                return <PriceChart data={history} buyIndex={idx} />;
              })()}

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
