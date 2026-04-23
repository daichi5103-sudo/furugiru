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
  { id:1,  brands:"Nike × Supreme",          brandTags:["Nike","Supreme"],               name:"Air Force 1 Low Supreme",          year:2012, cat:"スニーカー", orig:15000,  market:85000,  rarity:"rare",      icon:"AF1",  isNew:false, desc:"SupremeのBox LogoとNike AF1の伝説的コラボ。赤・黒・白の3カラーが存在。",                              points:["Side Swooshがレザー製","Box Logo刺繍が高密度","靴底にSupremeロゴ"],                   searchKeyword:"ナイキ エアフォース1 スニーカー メンズ",        imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2012/10/Nike-Air-Force-1-Low-Black-Camo-1.jpg" },
  { id:2,  brands:"Nike × Off-White",         brandTags:["Nike","Off-White"],             name:"Air Max 97 Off-White",              year:2017, cat:"スニーカー", orig:25000,  market:120000, rarity:"very_rare", icon:"AM97", isNew:false, desc:"Virgil Ablohによる革命的デザイン。外部エアユニット露出が特徴。",                                     points:["外部エアユニット露出","タグ&ジップタイ付属","半透明ソールに刻印"],                   searchKeyword:"ナイキ エアマックス97 スニーカー",              imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2018/10/Off-White-Nike-Air-Max-97-Black-Cone-Release-Date.jpg" },
  { id:9,  brands:"Nike × Travis Scott",      brandTags:["Nike","Travis Scott"],          name:"Air Jordan 1 High",                year:2019, cat:"スニーカー", orig:16500,  market:150000, rarity:"very_rare", icon:"AJ1",  isNew:false, desc:"逆向きSwooshとポケット付きが特徴的なAJ1コラボ。",                                                      points:["Swooshが逆向き","ポケット付き特殊仕様","隠しトラビスロゴ"],                         searchKeyword:"ナイキ エアジョーダン1 ハイカット スニーカー",   imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2019/04/Travis-Scott-Air-Jordan-1-High-OG-CD4487-100-Release-Date-Price.jpg" },
  { id:10, brands:"Nike × Sacai",             brandTags:["Nike","Sacai"],                 name:"LDWaffle / Waffle Daybreak",       year:2019, cat:"スニーカー", orig:22000,  market:65000,  rarity:"rare",      icon:"WD",   isNew:false, desc:"二重ソールと二重アッパーが特徴のSacaiとのコラボ。ダブルスウッシュが話題。",                points:["ダブルスウッシュ","二重ソール構造","Sacaiロゴ刻印"],                                 searchKeyword:"ナイキ サカイ ワッフル スニーカー コラボ",       imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2019/07/sacai-Nike-LDWaffle-BV0073-301-BV0073-100-BV0073-001-Release-Date-Price.jpg" },
  { id:11, brands:"Nike × Fragment Design",   brandTags:["Nike","Fragment Design"],       name:"Air Jordan 1 High Fragment",       year:2014, cat:"スニーカー", orig:16000,  market:200000, rarity:"very_rare", icon:"FRG",  isNew:false, desc:"藤原ヒロシ率いるFragment Designとの伝説的コラボAJ1。雷マークが刻印。",                       points:["Fragment雷マーク刻印","ネイビー×ホワイト配色","Hiroshi Fujiwara監修"],              searchKeyword:"ナイキ エアジョーダン1 フラグメント スニーカー",  imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2014/12/fragment-design-x-air-jordan-1-retro-high-og-11.jpg" },
  { id:16, brands:"Nike × CLOT",              brandTags:["Nike","CLOT"],                  name:"Air Max 1 Kiss of Death",          year:2006, cat:"スニーカー", orig:13000,  market:300000, rarity:"very_rare", icon:"KOD",  isNew:false, desc:"Edison Chenによる鍼灸インスパイアデザイン。透明アウトソールに経絡図が描かれた伝説的1足。",     points:["透明アウトソールに経絡ポイント刻印","シルク素材のアッパー","CLOTの龍マーク刻印"],     searchKeyword:"ナイキ エアマックス1 クロット スニーカー",       imageUrl:"" },
  { id:17, brands:"Nike × atmos",             brandTags:["Nike","atmos"],                 name:"Air Max 1 Elephant",               year:2006, cat:"スニーカー", orig:10000,  market:400000, rarity:"very_rare", icon:"ATM",  isNew:false, desc:"東京・原宿のatmosとのコラボ。AJ3のエレファントプリントをAM1に落とし込んだ歴史的1足。",        points:["エレファントプリントの微細なシボ感","翡翠グリーンのエアユニット","atmos刻印インソール"], searchKeyword:"ナイキ エアマックス1 エレファント スニーカー",  imageUrl:"" },
  { id:18, brands:"Nike × Patta",             brandTags:["Nike","Patta"],                 name:"Air Max 1 The Wave",               year:2021, cat:"スニーカー", orig:17000,  market:150000, rarity:"very_rare", icon:"PTA",  isNew:false, desc:"アムステルダム発Pattaとのコラボ。ウェーブ型マッドガードが革新的。ブレスレット同梱版は超希少。", points:["ウェーブ型マッドガードの成形精度","Patta「P」ロゴインソール刻印","ブレスレット付属（2021年版）"], searchKeyword:"ナイキ エアマックス1 パタ スニーカー",       imageUrl:"" },
  { id:19, brands:"Nike × Undercover",        brandTags:["Nike","Undercover"],            name:"React Element 87",                 year:2017, cat:"スニーカー", orig:20000,  market:100000, rarity:"rare",      icon:"UC",   isNew:false, desc:"Jun TakahashiとNikeのコラボ。半透明アッパーとReactフォームの組み合わせ。",                      points:["半透明アッパーの質感","UnderoverとNikeの共同タグ","React素材の中敷き透明感"],         searchKeyword:"ナイキ アンダーカバー スニーカー",              imageUrl:"" },
  { id:20, brands:"Nike × ACRONYM",           brandTags:["Nike","ACRONYM"],               name:"Air Presto Mid",                   year:2016, cat:"スニーカー", orig:17000,  market:150000, rarity:"very_rare", icon:"ACR",  isNew:false, desc:"Errolson HughによるPresto改。サイドジッパーとストラップを追加した機能至上主義デザイン。",      points:["サイドジッパーの開閉精度","Tシャツサイズ（XS〜XL）での販売","トゥボックスのリインフォース"], searchKeyword:"ナイキ アクロニウム プレスト スニーカー",    imageUrl:"" },
  { id:21, brands:"Nike × Tom Sachs",         brandTags:["Nike","Tom Sachs"],             name:"Mars Yard 2.0",                    year:2017, cat:"スニーカー", orig:20000,  market:500000, rarity:"very_rare", icon:"MY2",  isNew:false, desc:"アーティストTom SachsとNikeCraftのコラボ。NASA素材を使った現代スニーカー史上最も希少な1足の一つ。", points:["NikeCraft表記タグ（Nike本体でない）","Vectranクリーム/赤の素材構成","Tom Sachs手書き風グラフィック"], searchKeyword:"ナイキ トムサックス マーズヤード スニーカー", imageUrl:"" },
  { id:22, brands:"Nike × Fear of God",       brandTags:["Nike","Fear of God"],           name:"Air Fear of God 1",                year:2019, cat:"スニーカー", orig:35000,  market:180000, rarity:"very_rare", icon:"FOG",  isNew:false, desc:"Jerry LorenzによるNikeとの唯一のコラボ（後にAdidasへ移籍）。ダブルZoomユニットで無重力感を演出。", points:["ダブルスタックZoomヒールの厚み","Fear of God × Nikeタグ主体","ベージュ/ブラックの2色展開"], searchKeyword:"ナイキ フィアオブゴッド スニーカー",          imageUrl:"" },
  { id:23, brands:"Dior × Nike",              brandTags:["Nike","Dior"],                  name:"Air Jordan 1 High Dior",           year:2020, cat:"スニーカー", orig:220000, market:2000000,rarity:"very_rare", icon:"DRJ",  isNew:false, desc:"Kim Jones指揮のDiorとNikeの歴史的コラボ。8,500足限定。プレミアムレザーとDior Obliqueスウッシュ。",  points:["Dior Obliqueジャカードスウッシュの精度","インソールのシリアルナンバー確認","Dior×Jordan Brand共同箱と証明書"], searchKeyword:"ナイキ エアジョーダン1 ディオール スニーカー", imageUrl:"" },
  // ── Supreme ──
  { id:3,  brands:"Supreme × The North Face", brandTags:["Supreme","The North Face"],    name:"Mountain Parka",                   year:2019, cat:"ジャケット", orig:65000,  market:180000, rarity:"very_rare", icon:"TNF",  isNew:false, desc:"毎シーズン話題を呼ぶ定番コラボ。初期ものは特に希少。",                                              points:["TNF×Supreme Wovenラベル","フロントにSupreme刺繍","Gore-Tex素材（一部）"],             searchKeyword:"ノースフェイス マウンテンパーカー メンズ アウター", imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632649159-supreme-tnf-ss19-00.jpg" },
  { id:4,  brands:"Supreme × Louis Vuitton",  brandTags:["Supreme","Louis Vuitton"],     name:"Box Logo Tee",                     year:2017, cat:"Tシャツ",   orig:50000,  market:300000, rarity:"very_rare", icon:"LV",   isNew:false, desc:"2017年パリコレで電撃発表。LVモノグラム×Box Logoの歴史的コラボ。",                               points:["LVショップのみ販売","レシート&証明書必須","偽物が非常に多い"],                        searchKeyword:"シュプリーム ボックスロゴ Tシャツ メンズ",      imageUrl:"https://www.highsnobiety.com/static-assets/dato/1636752073-supreme-louis-vuitton-every-piece-00.jpg" },
  { id:8,  brands:"Supreme × Stone Island",   brandTags:["Supreme","Stone Island"],      name:"Jacket",                           year:2020, cat:"ジャケット", orig:120000, market:280000, rarity:"very_rare", icon:"SI",   isNew:false, desc:"ストリートの王とイタリア職人ブランドの夢のコラボ。",                                              points:["左右異なるワッペン","Stone Island特殊染色","共同製造証明書付き"],                    searchKeyword:"ストーンアイランド ジャケット メンズ",           imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632503622-supreme-stone-island-fw20-feature.jpg" },
  { id:12, brands:"Supreme × Burberry",       brandTags:["Supreme","Burberry"],          name:"Box Logo Hooded Sweatshirt",       year:2022, cat:"パーカー",  orig:45000,  market:160000, rarity:"very_rare", icon:"BB",   isNew:false, desc:"2022年に実現した超意外なコラボ。バーバリーチェック×Box Logoが話題。",                          points:["バーバリーチェック使用","共同ロゴタグ","限定店舗のみ"],                               searchKeyword:"シュプリーム パーカー フーディー メンズ",        imageUrl:"https://www.highsnobiety.com/static-assets/dato/1646662564-supreme-burberry-collab-lookbook-release-date-droplist-price-website-buy-13.jpg" },
  { id:24, brands:"Supreme × Timberland",     brandTags:["Supreme","Timberland"],        name:"6-Inch Premium Boot",              year:2017, cat:"ブーツ",   orig:25000,  market:100000, rarity:"rare",      icon:"TMB",  isNew:false, desc:"ストリートとアウトドアの融合。Supreme × Timberlandの毎シーズン定番コラボ。星条旗柄や特殊素材が人気。", points:["Supreme×Timberlandシュータング内タグ","イエローステッチの均一さ","シーズン固有の素材・プリント"], searchKeyword:"ティンバーランド ブーツ メンズ シュプリーム",  imageUrl:"" },
  { id:25, brands:"Supreme × Vans",           brandTags:["Supreme","Vans"],              name:"Old Skool Pro",                    year:2015, cat:"スニーカー", orig:9000,   market:60000,  rarity:"rare",      icon:"VSP",  isNew:false, desc:"1996年から続く長寿コラボ。Supremeのグラフィックを毎シーズン落とし込んだVansの定番。",             points:["Vansソールパターンの精度","Supreme Box Logoプリントの位置とサイズ","初期ものは別途タグラベル縫い付け"], searchKeyword:"バンズ オールドスクール スニーカー シュプリーム", imageUrl:"" },
  { id:26, brands:"Supreme × CDG",            brandTags:["Supreme","Comme des Garçons"], name:"Nike AF1 × Supreme × CDG",        year:2017, cat:"スニーカー", orig:25000,  market:130000, rarity:"very_rare", icon:"CDG",  isNew:false, desc:"Supreme × CDG × Nikeの3者コラボ。アイボールプリントのAF1が話題。",                              points:["3ブランド融合ロゴの位置確認","CDG SHIRTのタグライン明記","アイボールプリントの精度"],   searchKeyword:"シュプリーム コムデギャルソン ナイキ スニーカー", imageUrl:"" },
  { id:27, brands:"Supreme × Dr. Martens",    brandTags:["Supreme","Dr. Martens"],       name:"1461 3-Eye Shoe",                  year:2021, cat:"シューズ",  orig:22000,  market:60000,  rarity:"uncommon",  icon:"DRM",  isNew:false, desc:"パンクとストリートの融合。Supreme × Dr. Martensの毎シーズン定番コラボ。",                         points:["Dr. Martensイエローステッチの均一さ","Supreme×Dr. Martens融合タグ","各シーズン固有カラー確認"], searchKeyword:"ドクターマーチン シューズ シュプリーム メンズ", imageUrl:"" },
  // ── Adidas ──
  { id:7,  brands:"Adidas × Wales Bonner",    brandTags:["Adidas","Wales Bonner"],       name:"Samba",                            year:2024, cat:"スニーカー", orig:22000,  market:48000,  rarity:"rare",      icon:"WB",   isNew:true,  desc:"Wales BonnerとAdidasのSamba。ハンドクラフトレザーとアフリカンモチーフ。",                         points:["ハンドクラフトレザー","Wales Bonnerテープ","アフリカンモチーフ"],                      searchKeyword:"アディダス サンバ スニーカー メンズ",           imageUrl:"https://www.highsnobiety.com/static-assets/dato/1704967259-wales-bonner-adidas-samba-2024-001.jpg" },
  { id:13, brands:"Adidas × Yeezy",           brandTags:["Adidas","Yeezy"],              name:"Boost 350 V2",                     year:2016, cat:"スニーカー", orig:29700,  market:55000,  rarity:"uncommon",  icon:"YZY",  isNew:false, desc:"Kanye WestとAdidasのメガコラボ。ニット素材のアッパーとBoostソールが特徴。",                       points:["Primeknit素材","Boostフルソール","半透明ストライプ"],                                  searchKeyword:"アディダス イージーブースト スニーカー",         imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2016/09/adidas-Yeezy-Boost-350-V2-CP9654-Release-Date.jpg" },
  { id:14, brands:"Adidas × Pharrell",        brandTags:["Adidas","Pharrell Williams"],  name:"Human Race NMD",                   year:2016, cat:"スニーカー", orig:24000,  market:45000,  rarity:"rare",      icon:"HR",   isNew:false, desc:"ファレル・ウィリアムスとのコラボNMD。カラフルで独自のフェイスプレートが特徴。",                  points:["カスタムフェイスプレート","カラフル展開","Pharrell直筆デザイン"],                      searchKeyword:"アディダス NMD スニーカー メンズ",               imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2016/07/human-race-adidas-nmd-2.jpg" },
  { id:28, brands:"Adidas × Rick Owens",      brandTags:["Adidas","Rick Owens"],         name:"Tech Runner",                      year:2014, cat:"スニーカー", orig:35000,  market:120000, rarity:"rare",      icon:"RO",   isNew:false, desc:"Rick OwensとAdidasの2013〜2017年パートナーシップ。暗黒的美学でAdidasを再解釈したRunnerシリーズ。",  points:["ROロゴタグとAdidasスリーストライプスの共存","黒/グレー/白のRO特有カラーパレット","プラットフォームや特殊シルエット"], searchKeyword:"アディダス リックオウエンス スニーカー",       imageUrl:"" },
  { id:29, brands:"Adidas × Prada",           brandTags:["Adidas","Prada"],              name:"Superstar",                        year:2019, cat:"スニーカー", orig:50000,  market:180000, rarity:"very_rare", icon:"ADP",  isNew:false, desc:"PradaとAdidasのラグジュアリーコラボ。Saffiano素材とスーパースターの融合。",                         points:["PradaのSaffiano素材の質感","「A+P」融合ロゴ","PRIMAGREENリサイクル素材表記"],          searchKeyword:"アディダス プラダ スーパースター スニーカー",    imageUrl:"" },
  { id:30, brands:"Adidas × Bad Bunny",       brandTags:["Adidas","Bad Bunny"],          name:"Forum Buckle Low",                 year:2021, cat:"スニーカー", orig:14000,  market:180000, rarity:"very_rare", icon:"BB2",  isNew:false, desc:"プエルトリコのスター Bad BunnyとAdidasのコラボ。バックルタン付きForumが話題。初回は転売相場700ドル超。", points:["バックルタン（横バックルの独自デザイン）","白うさぎアイコン刺繍の精度","コーヒー/パステルなど固有カラーウェイ"], searchKeyword:"アディダス バッドバニー フォーラム スニーカー", imageUrl:"" },
  // ── New Balance ──
  { id:6,  brands:"New Balance × ALD",        brandTags:["New Balance","Aime Leon Dore"],name:"550",                             year:2024, cat:"スニーカー", orig:18700,  market:55000,  rarity:"rare",      icon:"550",  isNew:true,  desc:"NYのセレクトショップALDとNBの人気コラボ。レトロなカラーパレットが◎",                          points:["ALDシグネチャーカラー","プレミアムレザー","ALD×NBダブルロゴ"],                       searchKeyword:"ニューバランス 550 スニーカー レザー",           imageUrl:"https://sneakerbardetroit.com/wp-content/uploads/2022/03/Aime-Leon-Dore-New-Balance-550-2022-Release-Date.jpeg" },
  { id:15, brands:"New Balance × Salehe Bembury", brandTags:["New Balance","Salehe Bembury"], name:"2002R",                    year:2022, cat:"スニーカー", orig:18150,  market:40000,  rarity:"rare",      icon:"2002", isNew:false, desc:"デザイナーSalehe BemburyとNBのコラボ2002R。自然からインスパイアされた配色が特徴。",            points:["Saleheシグネチャーカラー","特殊アウトソール","N刺繍"],                                searchKeyword:"ニューバランス 2002R スニーカー",                 imageUrl:"https://cdn.sanity.io/images/pu5wtzfc/production/ab44a9b0a407351551d19628e3fae456f0a93a4f-1200x750.jpg" },
  { id:31, brands:"New Balance × Joe Freshgoods", brandTags:["New Balance","Joe Freshgoods"], name:"992 No Emotions Are Emotions", year:2020, cat:"スニーカー", orig:19000, market:200000, rarity:"very_rare", icon:"992",  isNew:false, desc:"シカゴ発JFGとNBの歴史的コラボ。「感情なき感情」をテーマにしたNBA ASW限定。MADE IN USA。",      points:["MADE IN USA（メキシコ製との区別重要）","JFG刻印インソール","人間の心臓色カラーウェイ"], searchKeyword:"ニューバランス 992 スニーカー",                  imageUrl:"" },
  { id:32, brands:"New Balance × Bodega",     brandTags:["New Balance","Bodega"],        name:"990v3 Here To Stay",               year:2021, cat:"スニーカー", orig:24000,  market:100000, rarity:"rare",      icon:"BDG",  isNew:false, desc:"ボストンのBodegaとNBのコラボ990v3。15周年記念のMADE IN USA初コラボ。",                           points:["Bodega「Here to Stay」刻印インソール","990v3のMADE IN USA表記","チャンキーソールシルエット"], searchKeyword:"ニューバランス 990 スニーカー ボデガ",        imageUrl:"" },
  { id:33, brands:"New Balance × Concepts",   brandTags:["New Balance","Concepts"],      name:"999 Kennedy",                      year:2011, cat:"スニーカー", orig:14000,  market:250000, rarity:"very_rare", icon:"CNP",  isNew:false, desc:"ボストンのConceptsとNBのコラボ999。ノーティカルテーマとモールスコードタング。",                  points:["CNCPTS刻印インソール","ノーティカル柄ライナー","ボストン限定BOX包装"],                searchKeyword:"ニューバランス 999 スニーカー コンセプツ",       imageUrl:"" },
  // ── Carhartt WIP ──
  { id:5,  brands:"Carhartt WIP × A.P.C.",    brandTags:["Carhartt WIP","A.P.C."],       name:"Detroit Jacket",                   year:2018, cat:"ジャケット", orig:38000,  market:62000,  rarity:"uncommon",  icon:"CxA",  isNew:false, desc:"A.P.CとのコラボDetroit Jacket。機能性×ミニマルデザインの融合。",                                points:["APCシグネチャーライニング","ダブルタグ仕様","フランスでも限定販売"],                   searchKeyword:"カーハート ジャケット メンズ ワーク",            imageUrl:"https://www.highsnobiety.com/static-assets/dato/1632580155-apc-carhartt-wip-ss20-00.jpg" },
  { id:34, brands:"Carhartt WIP × Brain Dead", brandTags:["Carhartt WIP","Brain Dead"],  name:"Carpenter Pants",                  year:2018, cat:"パンツ",   orig:18000,  market:50000,  rarity:"rare",      icon:"CBD",  isNew:false, desc:"Brain DeadとCarharttのコラボ。Ed Davis展覧会発。Brain Deadパッチが付いたカーペンターパンツ。",    points:["Brain Dead独自イラストパッチの精度","Carhartt WIPオリジナルパッチとの共存","カリフォルニア的デザイン感"], searchKeyword:"カーハート カーペンターパンツ メンズ",          imageUrl:"" },
  { id:35, brands:"Carhartt WIP × Slam Jam",  brandTags:["Carhartt WIP","Slam Jam"],     name:"Uniform Collection",               year:2017, cat:"ジャケット", orig:15000,  market:45000,  rarity:"uncommon",  icon:"CSJ",  isNew:false, desc:"Slam JamとCarharttのコラボ。1960年代ガソリンスタンドユニフォームをインスパイアした7点コレクション。", points:["Slam Jam×Carharttトーン on トーンパッチ","ポリコットン素材の質感","ユーティリティポケット配置"], searchKeyword:"カーハート ジャケット スラムジャム メンズ",     imageUrl:"" },
  { id:36, brands:"Carhartt WIP × Human Made", brandTags:["Carhartt WIP","Human Made"],  name:"Detroit Jacket",                   year:2022, cat:"ジャケット", orig:35000,  market:75000,  rarity:"uncommon",  icon:"CHM",  isNew:false, desc:"NIGOのHuman MadeとCarhartt WIPのコラボ。ワークウェアとポップアートの融合。",                       points:["Human MadeダックアイコンとCarhartt WIPの共同タグ","ハートモチーフとロゴの共存","NIGOのヴィンテージワークウェア解釈"], searchKeyword:"カーハート ヒューマンメイド ジャケット",       imageUrl:"" },
  // ── Champion ──
  { id:37, brands:"Champion × Supreme",       brandTags:["Champion","Supreme"],          name:"Reverse Weave Hoodie",             year:2015, cat:"パーカー",  orig:12000,  market:65000,  rarity:"uncommon",  icon:"CHS",  isNew:false, desc:"ChampionとSupremeの定番コラボ。毎シーズン違うグラフィックで展開されるリバースウィーブパーカー。",  points:["Supreme×Champion融合タグ","ChampionリバースウィーブのDコードナンバー","Supreme WOODロゴの位置"], searchKeyword:"チャンピオン パーカー シュプリーム メンズ",    imageUrl:"" },
  { id:38, brands:"Champion × Vetements",     brandTags:["Champion","Vetements"],        name:"Oversize Hoodie",                  year:2016, cat:"パーカー",  orig:50000,  market:100000, rarity:"rare",      icon:"CHV",  isNew:false, desc:"Demna GvasaliaのVetementsとChampionのコラボ。極端なオーバーサイズで話題を呼んだ。",               points:["Vetementsの極端なオーバーサイズプロポーション","Champion×Vetementsの共同タグ","ChampionのCロゴとVetementsロゴの共存"], searchKeyword:"チャンピオン パーカー ベトモン オーバーサイズ", imageUrl:"" },
  { id:39, brands:"Champion × Needles",       brandTags:["Champion","Needles"],          name:"Rebuild Hoodie",                   year:2018, cat:"パーカー",  orig:40000,  market:120000, rarity:"rare",      icon:"CHN",  isNew:false, desc:"NeedlesがChampionのリバースウィーブを解体・再構築。多色パッチワークが代名詞の日本独自の人気コラボ。", points:["各パーツが本物ChampionリバースウィーブのPW確認","Needles固有の非対称・多色パッチ配置","Needlesナンバーブランドタグ確認"], searchKeyword:"チャンピオン ニードルス パーカー リメイク",     imageUrl:"" },
  // ── Levi's ──
  { id:40, brands:"Levi's × Supreme",         brandTags:["Levi's","Supreme"],            name:"Trucker Jacket",                   year:2012, cat:"ジャケット", orig:25000,  market:80000,  rarity:"rare",      icon:"LxS",  isNew:false, desc:"2011年から続くカリフォルニア同士の定番コラボ。Supremeプリント×Levi'sトラッカージャケット。毎シーズン異なる柄で展開。", points:["Levi's×Supreme共同タグ","Red TabにSupremeロゴ刻印","各シーズン固有プリント（コピー品はぼやける）"], searchKeyword:"リーバイス シュプリーム トラッカージャケット",  imageUrl:"" },
  { id:41, brands:"Levi's × Supreme",         brandTags:["Levi's","Supreme"],            name:"505 Denim Jeans",                  year:2014, cat:"デニム",   orig:20000,  market:50000,  rarity:"uncommon",  icon:"L505", isNew:false, desc:"Levi's 505ベースにSupremeのグラフィックやプリントを加えた定番コラボデニム。",                          points:["Red TabにSupremeロゴ刻印","シーズン固有プリント","Levi's×Supreme両タグ確認"],        searchKeyword:"リーバイス 505 シュプリーム デニム",            imageUrl:"" },
  { id:42, brands:"Levi's × Vetements",       brandTags:["Levi's","Vetements"],          name:"Deconstructed Denim Jacket",       year:2017, cat:"ジャケット", orig:120000, market:200000, rarity:"very_rare", icon:"LxV",  isNew:false, desc:"Demna GvasaliaによるLevi'sのデコンストラクション。パリオートクチュールウィーク発表。解体・再構築の前衛的作品。", points:["Vetementsオーバーサイズシルエット（極端な大きさ）","Levi's×Vetementsの両ブランドタグ共存","わざと粗くみせた縫い目（本物の特徴）"], searchKeyword:"リーバイス ベトモン デニムジャケット",           imageUrl:"" },
  { id:43, brands:"Levi's × Off-White",       brandTags:["Levi's","Off-White"],          name:"Sherpa Trucker Jacket",            year:2016, cat:"ジャケット", orig:100000, market:180000, rarity:"very_rare", icon:"LxO",  isNew:false, desc:"Virgil AblohによるLevi's Made & Craftedとのコラボ。カラーブロッキングと露出縫い目が特徴。11アイテム展開。", points:["Off-Whiteシグネチャーの露出縫い目","工業用ジッパーとOff-Whiteタグ構造","カラーブロッキングの境界線精度"], searchKeyword:"リーバイス オフホワイト ジャケット",             imageUrl:"" },
  { id:44, brands:"Levi's × Junya Watanabe",  brandTags:["Levi's","Comme des Garçons"],  name:"Patchwork 501",                    year:2016, cat:"デニム",   orig:60000,  market:180000, rarity:"very_rare", icon:"LxJ",  isNew:false, desc:"20年以上続くJunya Watanabe MAN × Levi'sコラボ。非デニム素材や複数素材パッチワーク501が代名詞。",   points:["Junya Watanabe MANタグ（eYe CDG JUNYA表記）","素材の複雑な組み合わせと縫製精度","内側Levi'sヴィンテージクロージングタグとの共存"], searchKeyword:"リーバイス ジュンヤワタナベ デニム パッチワーク", imageUrl:"" },
  { id:45, brands:"Levi's × Denim Tears",     brandTags:["Levi's","Denim Tears"],        name:"Cotton Wreath Trucker Jacket",     year:2020, cat:"ジャケット", orig:40000,  market:130000, rarity:"very_rare", icon:"LxDT", isNew:false, desc:"Tremaine EmoryとLevi'sのコラボ。コットンリースプリントはアメリカの綿と奴隷制の歴史を「ロゴ」として再解釈したメッセージ性の高い作品。", points:["コットンリースプリントの各フラワーの細部","Denim Tears×Levi'sの共同タグ","アーティスティックなメッセージプリント（コピー品はテキスト不鮮明）"], searchKeyword:"リーバイス デニムティアーズ トラッカー",         imageUrl:"" },
  { id:46, brands:"Levi's × Stüssy",          brandTags:["Levi's","Stüssy"],             name:"Type II Trucker Jacket",           year:2023, cat:"ジャケット", orig:28000,  market:65000,  rarity:"uncommon",  icon:"LxST", isNew:false, desc:"同じカリフォルニアルーツを持つ2ブランドのコラボ。Stüssy Double SとLevi'sのボタンシャンクグラフィックを合体させた共同ロゴが特徴。", points:["共同ブランドボタンシャンク（Levi's+Stüssy融合刻印）","Stüssy Double S刺繍の精度","コーデュロイカラーなどシーズン固有ディテール"], searchKeyword:"リーバイス ステューシー トラッカー ジャケット",  imageUrl:"" },
  { id:47, brands:"Levi's × HUMAN MADE",      brandTags:["Levi's","Human Made"],         name:"506 Trucker Jacket",               year:2022, cat:"ジャケット", orig:60000,  market:120000, rarity:"rare",      icon:"LxHM", isNew:false, desc:"NIGOはLevi'sのレアヴィンテージコレクター。Human MadeのダックアイコンがLevi'sへのオマージュで右翼が赤い。日本製セルヴィッチデニム使用。", points:["Human MadeダックアイコンのRight Wingが赤","日本製セルヴィッチデニムの赤ミミ確認","Gears for Futuristic Teenagersタグ刺繍の精度"], searchKeyword:"リーバイス ヒューマンメイド トラッカージャケット", imageUrl:"" },
  { id:48, brands:"Levi's × Sacai",           brandTags:["Levi's","Sacai"],              name:"Hybrid Trucker Jacket",            year:2023, cat:"ジャケット", orig:90000,  market:190000, rarity:"very_rare", icon:"LxSC", isNew:false, desc:"阿部千登勢のSacaiがLevi'sを解体・再構築。Type I/II/IIIを1枚に融合させた彫刻的なジャケット。",         points:["複数シルエット融合の縫製品質（フロントとバックで異なる型）","Sacai固有のアンカーボタンとリブニット仕上げ","リバーシブル機能と露出セルヴィッチの精度"], searchKeyword:"リーバイス サカイ デニムジャケット コラボ",      imageUrl:"" },
  { id:49, brands:"Levi's × BEAMS",           brandTags:["Levi's","BEAMS"],              name:"Super Wide 506XX Jacket",          year:2022, cat:"ジャケット", orig:33000,  market:45000,  rarity:"uncommon",  icon:"LxBM", isNew:false, desc:"日本のBEAMSとのSuper Wide Collection。1940〜50年代ヴィンテージデニムのシルエットを現代的な極ワイドで再現。日本製。", points:["BEAMS特注の共同ブランドタグ","506XXや501XXの古いシルエット確認","Made in Japanの品質タグ"], searchKeyword:"リーバイス ビームス デニムジャケット スーパーワイド", imageUrl:"" },
  { id:50, brands:"Levi's × RE/DONE",         brandTags:["Levi's","RE/DONE"],            name:"High Rise Ankle Crop",             year:2015, cat:"デニム",   orig:28000,  market:35000,  rarity:"common",    icon:"LxRD", isNew:false, desc:"ヴィンテージLevi'sをLAで手作業で解体・再縫製するRE/DONEとの公式パートナーシップ。各商品が1点物。26万本以上をアップサイクル。", points:["内側にRE/DONEタグと元のLevi'sタグが残存","LAメイドの表記確認","ヴィンテージ由来の自然な色落ちとダメージ"], searchKeyword:"リーバイス リダン デニムパンツ",                imageUrl:"" },
  { id:51, brands:"Levi's × Justin Timberlake", brandTags:["Levi's","Justin Timberlake"], name:"Fresh Leaves Trucker Jacket",    year:2018, cat:"ジャケット", orig:18000,  market:25000,  rarity:"common",    icon:"LxJT", isNew:false, desc:"ジャスティン・ティンバーレイクとのFresh Leavesコレクション。メンフィスと音楽への愛をデニムに落とし込んだコラボ。", points:["「Fresh Leaves」スリーブプリント","ブラックライティングのRed Tab（本コラボ専用）","ブラック文字の「Two Horse Pull」レザーパッチ"], searchKeyword:"リーバイス ジャスティンティンバーレイク ジャケット", imageUrl:"" },
  { id:52, brands:"Levi's × Air Jordan",      brandTags:["Levi's","Nike"],               name:"Air Jordan 1 Mid 23/501",          year:2008, cat:"スニーカー", orig:17000,  market:180000, rarity:"very_rare", icon:"LAJ",  isNew:false, desc:"Levi'sとAir Jordan 1のコラボ。2,323足限定でエレファントプリント+デニムアッパー。シリアルナンバー入り。",     points:["シリアルナンバー入り（2,323足中の番号刻印）","デニム素材アッパーの縫製と色落ち","Levi's Red Tabが靴のタングに縫い付け"], searchKeyword:"リーバイス エアジョーダン スニーカー デニム",   imageUrl:"" },
  { id:53, brands:"Levi's × Kiko Kostadinov", brandTags:["Levi's","Kiko Kostadinov"],    name:"Deconstructed Denim Capsule",      year:2024, cat:"ジャケット", orig:70000,  market:130000, rarity:"rare",      icon:"LxKK", isNew:true,  desc:"PFWランウェイ発表の7点キャプセル。Kiko Kostadinov特有のデコンストラクテッドシルエットとファーリーデニム素材。",       points:["Kiko Kostadinov特有のデコンストラクテッドシルエット","ファーリー（モコモコ）デニム素材の独特なテクスチャー","共同ブランドタグとPFWコレクション品番"], searchKeyword:"リーバイス コラボ デニムジャケット 2024",       imageUrl:"" },
  { id:54, brands:"Levi's × JJJJound",        brandTags:["Levi's","JJJJound"],           name:"501'93 Jeans",                     year:2024, cat:"デニム",   orig:18000,  market:45000,  rarity:"uncommon",  icon:"LxJJ", isNew:true,  desc:"JJJJoundのミニマリスト美学でLevi's 501'93を再解釈。過剰なブランディングなし。10点コレクション。",             points:["JJJJoundのミニマリスト美学（過剰なブランディングなし）","501'93シルエットの精度（ゆるいバギーフィット）","共同ロゴの位置とタグ"], searchKeyword:"リーバイス ジジジジジジジジound デニム",      imageUrl:"" },
  { id:55, brands:"Levi's × ERL",             brandTags:["Levi's","ERL"],                name:"Patchwork Denim Jacket",           year:2023, cat:"ジャケット", orig:55000,  market:90000,  rarity:"rare",      icon:"LxERL",isNew:false, desc:"カリフォルニアブランドERLとLevi'sのコラボ。ベニスビーチ的なサンシャインカラーのパッチワークが特徴。",        points:["ERL固有のベニスビーチ的カラーパレット","パッチワークの素材精度","ERL×Levi'sの共同タグ"],  searchKeyword:"リーバイス ERL コラボ デニム",                  imageUrl:"" },
  { id:56, brands:"Levi's × Grateful Dead",   brandTags:["Levi's","Grateful Dead"],      name:"Trucker Jacket",                   year:2021, cat:"ジャケット", orig:22000,  market:40000,  rarity:"uncommon",  icon:"LxGD", isNew:false, desc:"グレイトフル・デッドとLevi'sのコラボ。バンドグラフィックをデニムに落とし込んだロック×デニムの定番コラボ。",      points:["グレイトフル・デッド公式ライセンスグラフィック","Levi's×Grateful Deadの共同タグ","ヴィンテージバンドTロゴプリントの精度"], searchKeyword:"リーバイス グレイトフルデッド ジャケット",      imageUrl:"" },
];

const CATS   = ["すべて", "スニーカー", "ジャケット", "デニム", "パーカー", "Tシャツ", "ブーツ", "シューズ", "パンツ"];
const BRANDS = ["すべて", "Levi's", "Nike", "Supreme", "Adidas", "New Balance", "Carhartt WIP", "Champion"];

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
