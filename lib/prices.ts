// lib/prices.ts
// 主要商品の発売当時の定価データベース
// 日本正規品の定価（税抜・税込混在 → 時代に合わせた表記）

export interface PriceRecord {
  brand: string;
  model: string;
  year: number;         // 発売年（または代表年）
  yearLabel: string;    // 表示用ラベル "1990年代前半"
  priceJpy: number;     // 日本定価（円）
  priceUsd?: number;    // 米国定価（ドル）
  note: string;         // 補足
  isEstimate: boolean;  // false=実際の定価, true=推定値
  keywords: string[];   // マッチングキーワード
}

export const PRICE_DB: PriceRecord[] = [

  // ── Levi's ─────────────────────────────────────────
  {
    brand: "Levi's", model: "501 オリジナル",
    year: 1993, yearLabel: "1990年代前半",
    priceJpy: 8900, priceUsd: 38,
    note: "日本正規輸入品・税抜定価",
    isEstimate: false,
    keywords: ["levi", "levis", "リーバイス", "501"],
  },
  {
    brand: "Levi's", model: "501 USA製（80s）",
    year: 1985, yearLabel: "1980年代",
    priceJpy: 7500, priceUsd: 28,
    note: "日本輸入価格・当時の円レート換算",
    isEstimate: false,
    keywords: ["levi", "levis", "リーバイス", "501", "80s", "80年代"],
  },
  {
    brand: "Levi's", model: "Gジャン（Type III）",
    year: 1990, yearLabel: "1990年代",
    priceJpy: 12000, priceUsd: 55,
    note: "日本正規品定価",
    isEstimate: false,
    keywords: ["levi", "levis", "リーバイス", "gジャン", "trucker", "トラッカー"],
  },

  // ── Champion ───────────────────────────────────────
  {
    brand: "Champion", model: "Reverse Weave Sweatshirt",
    year: 1990, yearLabel: "1990年代",
    priceJpy: 8800, priceUsd: 40,
    note: "日本代理店取扱価格",
    isEstimate: false,
    keywords: ["champion", "チャンピオン", "reverse weave", "リバースウィーブ"],
  },
  {
    brand: "Champion", model: "T1011 Heavy T-Shirt",
    year: 1988, yearLabel: "1980年代後半",
    priceJpy: 3500, priceUsd: 12,
    note: "USA定価から換算・当時のレート",
    isEstimate: true,
    keywords: ["champion", "チャンピオン", "t1011", "tシャツ"],
  },
  {
    brand: "Champion", model: "Zip Hoodie（90s）",
    year: 1995, yearLabel: "1990年代中期",
    priceJpy: 11000, priceUsd: 48,
    note: "日本正規取扱店の定価",
    isEstimate: false,
    keywords: ["champion", "チャンピオン", "zip", "ジップ", "hoodie", "フーディー", "パーカー"],
  },

  // ── Nike ───────────────────────────────────────────
  {
    brand: "Nike", model: "Air Max 95",
    year: 1995, yearLabel: "1995年（発売当時）",
    priceJpy: 12000, priceUsd: 80,
    note: "1995年発売時の日本定価",
    isEstimate: false,
    keywords: ["nike", "ナイキ", "air max 95", "エアマックス95", "am95"],
  },
  {
    brand: "Nike", model: "Air Max 90",
    year: 1990, yearLabel: "1990年（発売当時）",
    priceJpy: 10000, priceUsd: 65,
    note: "1990年発売時の日本定価（Air Max III）",
    isEstimate: false,
    keywords: ["nike", "ナイキ", "air max 90", "エアマックス90", "am90"],
  },
  {
    brand: "Nike", model: "Air Jordan 1",
    year: 1985, yearLabel: "1985年（初代発売）",
    priceJpy: 16000, priceUsd: 65,
    note: "1985年初代発売時・日本上陸後の正規価格",
    isEstimate: false,
    keywords: ["nike", "ナイキ", "air jordan", "エアジョーダン", "jordan 1", "aj1"],
  },
  {
    brand: "Nike", model: "Air Jordan 1 Retro",
    year: 1994, yearLabel: "1994年（復刻版）",
    priceJpy: 12000, priceUsd: 60,
    note: "1994年復刻版の定価",
    isEstimate: false,
    keywords: ["nike", "ナイキ", "air jordan", "jordan 1", "retro", "aj1"],
  },
  {
    brand: "Nike", model: "Cortez（コルテッツ）",
    year: 1980, yearLabel: "1980年代",
    priceJpy: 6500, priceUsd: 25,
    note: "日本輸入価格・推定",
    isEstimate: true,
    keywords: ["nike", "ナイキ", "cortez", "コルテッツ"],
  },
  {
    brand: "Nike", model: "Air Force 1",
    year: 1982, yearLabel: "1982年（発売当時）",
    priceJpy: 9800, priceUsd: 50,
    note: "1982年発売。日本正規価格は1980年代後半から",
    isEstimate: false,
    keywords: ["nike", "ナイキ", "air force", "エアフォース", "af1"],
  },

  // ── Ralph Lauren ───────────────────────────────────
  {
    brand: "Ralph Lauren", model: "POLO シャツ（USA製）",
    year: 1985, yearLabel: "1980年代",
    priceJpy: 9800, priceUsd: 35,
    note: "輸入品の日本定価・デパート取扱価格",
    isEstimate: false,
    keywords: ["ralph lauren", "ラルフローレン", "polo", "ポロシャツ", "polo shirt"],
  },
  {
    brand: "Ralph Lauren", model: "POLO スウェット",
    year: 1990, yearLabel: "1990年代",
    priceJpy: 12000, priceUsd: 55,
    note: "日本正規取扱店の定価",
    isEstimate: false,
    keywords: ["ralph lauren", "ラルフローレン", "polo", "sweat", "スウェット"],
  },
  {
    brand: "Ralph Lauren", model: "RRL デニム",
    year: 1993, yearLabel: "1993年（RRL発足時）",
    priceJpy: 28000, priceUsd: 120,
    note: "RRL（ダブルアールエル）ライン定価",
    isEstimate: false,
    keywords: ["ralph lauren", "ラルフローレン", "rrl", "デニム", "denim"],
  },

  // ── Supreme ────────────────────────────────────────
  {
    brand: "Supreme", model: "Box Logo Tee（初期）",
    year: 2000, yearLabel: "2000年代初期",
    priceJpy: 5000, priceUsd: 28,
    note: "NY店頭価格から換算。日本代理店は未設置だった時期",
    isEstimate: true,
    keywords: ["supreme", "シュプリーム", "box logo", "ボックスロゴ", "tee", "tシャツ"],
  },
  {
    brand: "Supreme", model: "Box Logo Hoodie",
    year: 2010, yearLabel: "2010年代",
    priceJpy: 15000, priceUsd: 98,
    note: "日本オープン（2009年）後の定価",
    isEstimate: false,
    keywords: ["supreme", "シュプリーム", "box logo", "ボックスロゴ", "hoodie", "パーカー"],
  },
  {
    brand: "Supreme", model: "5-Panel Cap",
    year: 2012, yearLabel: "2010年代",
    priceJpy: 6000, priceUsd: 38,
    note: "日本店舗定価",
    isEstimate: false,
    keywords: ["supreme", "シュプリーム", "cap", "キャップ", "5panel"],
  },

  // ── Carhartt ───────────────────────────────────────
  {
    brand: "Carhartt", model: "Detroit Jacket（USA製）",
    year: 1995, yearLabel: "1990年代",
    priceJpy: 14000, priceUsd: 60,
    note: "USA Carhartt正規品・輸入時の日本価格",
    isEstimate: false,
    keywords: ["carhartt", "カーハート", "detroit", "デトロイト", "jacket", "ジャケット"],
  },
  {
    brand: "Carhartt", model: "Chore Coat（USA製）",
    year: 1995, yearLabel: "1990年代",
    priceJpy: 16000, priceUsd: 70,
    note: "チョアコート・USA製定価",
    isEstimate: false,
    keywords: ["carhartt", "カーハート", "chore", "チョア", "coat", "コート"],
  },
  {
    brand: "Carhartt WIP", model: "Active Jacket",
    year: 2005, yearLabel: "2000年代",
    priceJpy: 22000,
    note: "Carhartt WIP（欧州ライン）日本取扱価格",
    isEstimate: false,
    keywords: ["carhartt wip", "carhartt", "カーハート", "active", "wip"],
  },

  // ── Stone Island ───────────────────────────────────
  {
    brand: "Stone Island", model: "ナイロンメタル ジャケット",
    year: 1995, yearLabel: "1990年代",
    priceJpy: 45000,
    note: "日本正規代理店（当時）の定価",
    isEstimate: false,
    keywords: ["stone island", "ストーンアイランド", "jacket", "ジャケット"],
  },
  {
    brand: "Stone Island", model: "ゴーストピース（アーカイブ）",
    year: 1984, yearLabel: "1984年（初期）",
    priceJpy: 80000,
    note: "1980年代初期アーカイブ品。現存数少なく推定",
    isEstimate: true,
    keywords: ["stone island", "ストーンアイランド", "archive", "アーカイブ", "1980", "80s"],
  },

  // ── Adidas ─────────────────────────────────────────
  {
    brand: "Adidas", model: "Stan Smith（スタンスミス）",
    year: 1978, yearLabel: "1978年（復刻含む）",
    priceJpy: 7500, priceUsd: 30,
    note: "1978年発売。1990年代の日本定価を参照",
    isEstimate: false,
    keywords: ["adidas", "アディダス", "stan smith", "スタンスミス"],
  },
  {
    brand: "Adidas", model: "Samba（サンバ）",
    year: 1950, yearLabel: "1950年〜（現行版は年代によって異なる）",
    priceJpy: 8800, priceUsd: 45,
    note: "1990〜2000年代の日本定価",
    isEstimate: false,
    keywords: ["adidas", "アディダス", "samba", "サンバ"],
  },
  {
    brand: "Adidas", model: "Track Jacket（90s）",
    year: 1992, yearLabel: "1990年代",
    priceJpy: 9800, priceUsd: 45,
    note: "90年代アディダストラックジャケットの定価",
    isEstimate: false,
    keywords: ["adidas", "アディダス", "track", "トラック", "jacket", "ジャージ"],
  },

  // ── New Balance ────────────────────────────────────
  {
    brand: "New Balance", model: "990（初代）",
    year: 1982, yearLabel: "1982年（発売当時）",
    priceJpy: 22000, priceUsd: 100,
    note: "1982年発売時の定価。当時最高価格帯スニーカー",
    isEstimate: false,
    keywords: ["new balance", "ニューバランス", "990", "nb990"],
  },
  {
    brand: "New Balance", model: "1300",
    year: 1985, yearLabel: "1985年（発売当時）",
    priceJpy: 25000, priceUsd: 110,
    note: "1985年発売時の定価",
    isEstimate: false,
    keywords: ["new balance", "ニューバランス", "1300", "nb1300"],
  },
  {
    brand: "New Balance", model: "574",
    year: 1988, yearLabel: "1988年〜",
    priceJpy: 9800, priceUsd: 50,
    note: "1990年代の日本定価",
    isEstimate: false,
    keywords: ["new balance", "ニューバランス", "574", "nb574"],
  },
  {
    brand: "New Balance", model: "550",
    year: 1989, yearLabel: "1989年（復刻前）",
    priceJpy: 11000, priceUsd: 55,
    note: "オリジナル発売時の定価。復刻版は2020年〜",
    isEstimate: false,
    keywords: ["new balance", "ニューバランス", "550", "nb550"],
  },

  // ── The North Face ─────────────────────────────────
  {
    brand: "The North Face", model: "マウンテンパーカー（Goretex）",
    year: 1990, yearLabel: "1990年代",
    priceJpy: 45000, priceUsd: 200,
    note: "ゴアテックス素材・日本正規定価",
    isEstimate: false,
    keywords: ["north face", "ノースフェイス", "mountain", "マウンテン", "parka", "パーカー", "goretex", "ゴアテックス"],
  },
  {
    brand: "The North Face", model: "ヌプシダウンジャケット",
    year: 1992, yearLabel: "1990年代",
    priceJpy: 38000, priceUsd: 150,
    note: "ヌプシ初期モデルの日本定価",
    isEstimate: false,
    keywords: ["north face", "ノースフェイス", "nuptse", "ヌプシ", "down", "ダウン"],
  },
];

// ── 検索関数 ─────────────────────────────────────────
export function findPrice(query: string): PriceRecord[] {
  const ql = query.toLowerCase();
  const matched: PriceRecord[] = [];

  for (const p of PRICE_DB) {
    const score = p.keywords.filter(k => ql.includes(k.toLowerCase()) || k.toLowerCase().includes(ql)).length;
    if (score > 0) matched.push(p);
  }

  // スコア順（より多くのキーワードが一致したものを上位に）
  matched.sort((a, b) => {
    const sa = a.keywords.filter(k => ql.includes(k.toLowerCase())).length;
    const sb = b.keywords.filter(k => ql.includes(k.toLowerCase())).length;
    return sb - sa;
  });

  return matched.slice(0, 4); // 最大4件
}

// ── フォールバック推定データ ──────────────────────────
export const FALLBACK_ESTIMATES: Record<string, { era: string; price: string; note: string }[]> = {
  levi: [
    { era: "1960〜70年代", price: "¥3,500〜¥6,000", note: "輸入品の推定価格" },
    { era: "1980〜90年代", price: "¥7,000〜¥9,800", note: "国内正規品・推定定価" },
  ],
  champion: [
    { era: "1970年代", price: "¥3,800〜¥5,000", note: "米国価格から推定" },
    { era: "1980〜90年代", price: "¥6,000〜¥11,000", note: "日本輸入品・推定" },
  ],
  nike: [
    { era: "1980年代", price: "¥8,000〜¥12,000", note: "スポーツシューズ価格帯" },
    { era: "1990年代", price: "¥9,000〜¥18,000", note: "モデルにより大きく異なる" },
  ],
  supreme: [
    { era: "2000年代", price: "¥4,000〜¥12,000", note: "NY店頭価格から推定" },
    { era: "2010年代", price: "¥8,000〜¥28,000", note: "日本オープン後の定価帯" },
  ],
  carhartt: [
    { era: "1990〜00年代", price: "¥8,000〜¥16,000", note: "USA製ワークウェア価格帯" },
  ],
  ralph: [
    { era: "1980〜90年代", price: "¥8,000〜¥15,000", note: "輸入ポロシャツ定価帯" },
  ],
  stone: [
    { era: "1990年代", price: "¥25,000〜¥55,000", note: "イタリア製高級アウター" },
    { era: "2000年代〜", price: "¥30,000〜¥80,000", note: "日本正規取扱価格帯" },
  ],
  adidas: [
    { era: "1980〜90年代", price: "¥6,000〜¥12,000", note: "スポーツシューズ・ウェア価格帯" },
  ],
  nb: [
    { era: "1980〜90年代", price: "¥9,000〜¥25,000", note: "高品質スニーカー価格帯" },
  ],
  northface: [
    { era: "1990年代", price: "¥20,000〜¥50,000", note: "アウトドアウェア定価帯" },
  ],
  def: [
    { era: "1980〜90年代", price: "¥5,000〜¥15,000", note: "同カテゴリ一般的な定価帯（推定）" },
    { era: "2000年代以降", price: "¥8,000〜¥25,000", note: "ブランド・モデルにより異なります" },
  ],
};

export function getFallbackEstimate(query: string) {
  const ql = query.toLowerCase();
  if (ql.includes("levi")) return FALLBACK_ESTIMATES.levi;
  if (ql.includes("champion") || ql.includes("チャンピオン")) return FALLBACK_ESTIMATES.champion;
  if (ql.includes("nike") || ql.includes("ナイキ")) return FALLBACK_ESTIMATES.nike;
  if (ql.includes("supreme") || ql.includes("シュプリーム")) return FALLBACK_ESTIMATES.supreme;
  if (ql.includes("carhartt") || ql.includes("カーハート")) return FALLBACK_ESTIMATES.carhartt;
  if (ql.includes("ralph") || ql.includes("polo") || ql.includes("ラルフ")) return FALLBACK_ESTIMATES.ralph;
  if (ql.includes("stone") || ql.includes("ストーン")) return FALLBACK_ESTIMATES.stone;
  if (ql.includes("adidas") || ql.includes("アディダス")) return FALLBACK_ESTIMATES.adidas;
  if (ql.includes("new balance") || ql.includes("ニューバランス")) return FALLBACK_ESTIMATES.nb;
  if (ql.includes("north face") || ql.includes("ノースフェイス")) return FALLBACK_ESTIMATES.northface;
  return FALLBACK_ESTIMATES.def;
}
