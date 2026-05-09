export interface SizeRow {
  label: string;   // "XS", "S", "34", etc.
  chest?: string;  // 胸囲(cm)
  waist?: string;  // ウエスト(cm)
  hip?: string;    // ヒップ(cm)
  length?: string; // 着丈(cm)
  inseam?: string; // 股下(cm)
  shoulder?: string; // 肩幅(cm)
  jpEquiv?: string;  // 日本サイズ相当
  note?: string;
}

export interface SizeGuide {
  slug: string;
  brand: string;
  category: "tops" | "bottoms" | "outerwear";
  era: string;
  eraNote: string;  // 年代の注意点
  unit: "us" | "eu" | "numeric";
  rows: SizeRow[];
  tips: string[];
}

export const SIZE_GUIDES: SizeGuide[] = [
  // ── Levi's 501 ───────────────────────────────────────────────────────
  {
    slug: "levis-501-vintage",
    brand: "Levi's 501",
    category: "bottoms",
    era: "1960〜1980年代（ヴィンテージ）",
    eraNote: "ヴィンテージ501は表記サイズと実寸が大幅に異なる。「腰穿き」が前提の設計のため、現代の「ウエストに穿く」基準で選ぶと大きすぎる。実寸測定が必須。",
    unit: "numeric",
    rows: [
      { label: "W28", waist: "72〜75", hip: "88〜92", inseam: "83（L32基準）", jpEquiv: "S〜M相当", note: "実寸は表記より2〜3cm大きいことが多い" },
      { label: "W30", waist: "76〜79", hip: "92〜96", inseam: "83（L32基準）", jpEquiv: "M相当" },
      { label: "W32", waist: "80〜83", hip: "96〜100", inseam: "83（L32基準）", jpEquiv: "M〜L相当" },
      { label: "W34", waist: "84〜87", hip: "100〜104", inseam: "83（L32基準）", jpEquiv: "L〜XL相当" },
      { label: "W36", waist: "88〜93", hip: "104〜110", inseam: "83（L32基準）", jpEquiv: "XL〜2XL相当" },
      { label: "W38", waist: "94〜99", hip: "110〜116", inseam: "83（L32基準）", jpEquiv: "2XL相当" },
    ],
    tips: [
      "ヴィンテージ501は糊落とし後に縮むため、最初は1〜2サイズ大きめを選ぶ出品者も多い",
      "股上が現代の細みパンツより深いため、実際の着用感はウエスト数字より「ゆったり」に感じることが多い",
      "Wサイズの後に「L30」「L32」「L34」と股下表記が続く（例：32×32）",
      "USA製は同表記でも縫製によって実寸が1〜3cm異なることがある",
    ],
  },
  {
    slug: "levis-501-modern",
    brand: "Levi's 501",
    category: "bottoms",
    era: "2000年代以降（現行品）",
    eraNote: "現行品は実寸と表記サイズのズレが少なくなっている。ただし年代によってシルエットが異なる。",
    unit: "numeric",
    rows: [
      { label: "W28", waist: "70〜72", hip: "88〜91", inseam: "81（L32基準）", jpEquiv: "S相当" },
      { label: "W30", waist: "74〜76", hip: "92〜95", inseam: "81（L32基準）", jpEquiv: "M相当" },
      { label: "W32", waist: "78〜80", hip: "96〜99", inseam: "81（L32基準）", jpEquiv: "M〜L相当" },
      { label: "W34", waist: "82〜84", hip: "100〜103", inseam: "81（L32基準）", jpEquiv: "L相当" },
      { label: "W36", waist: "88〜90", hip: "104〜107", inseam: "81（L32基準）", jpEquiv: "XL相当" },
    ],
    tips: [
      "現行品はヴィンテージより股上が浅くシルエットがスリム",
      "表記通りの実寸に近いため、普段のボトムスサイズ参考で選びやすい",
    ],
  },

  // ── Champion スウェット ──────────────────────────────────────────────
  {
    slug: "champion-sweat-vintage",
    brand: "Champion リバースウィーブ",
    category: "tops",
    era: "1970〜1990年代（ヴィンテージ）",
    eraNote: "ヴィンテージChampionは現代より全体的にゆったりしたシルエット。同じSでも現代のSより1〜2サイズ大きく感じる。洗濯による縮みも考慮が必要。",
    unit: "us",
    rows: [
      { label: "S",   chest: "92〜96",  shoulder: "44〜46", length: "62〜64", jpEquiv: "M〜L相当", note: "現代のMに近いサイズ感" },
      { label: "M",   chest: "98〜104", shoulder: "47〜49", length: "65〜68", jpEquiv: "L〜XL相当" },
      { label: "L",   chest: "106〜112",shoulder: "50〜52", length: "68〜71", jpEquiv: "XL〜2XL相当" },
      { label: "XL",  chest: "114〜120",shoulder: "53〜55", length: "71〜74", jpEquiv: "2XL〜3XL相当" },
      { label: "2XL", chest: "122〜130",shoulder: "56〜58", length: "74〜77", jpEquiv: "3XL以上" },
    ],
    tips: [
      "リバースウィーブは洗濯後に横方向へわずかに縮む（縦縮みしにくい設計）",
      "袖口のリブの状態が年代判別と状態確認の重要ポイント",
      "80s〜90sのヴィンテージは着丈が短め・身幅が広めの傾向",
      "フリマでは「実寸○○cm」と出品者が測った実寸を確認するのが最も確実",
    ],
  },

  // ── Carhartt ジャケット ─────────────────────────────────────────────
  {
    slug: "carhartt-jacket-usa",
    brand: "Carhartt デトロイトジャケット（USA製）",
    category: "outerwear",
    era: "1990〜2000年代（USA製）",
    eraNote: "USA製Carharttは現行WIP品よりゆったりした作業着シルエット。インナーとして中厚手フリースを着込む前提のサイズ設計。",
    unit: "us",
    rows: [
      { label: "S",   chest: "100〜104", shoulder: "47〜48", length: "66〜68", jpEquiv: "L相当" },
      { label: "M",   chest: "106〜110", shoulder: "49〜50", length: "68〜70", jpEquiv: "L〜XL相当" },
      { label: "L",   chest: "112〜116", shoulder: "51〜52", length: "70〜72", jpEquiv: "XL〜2XL相当" },
      { label: "XL",  chest: "118〜122", shoulder: "53〜54", length: "72〜74", jpEquiv: "2XL相当" },
      { label: "2XL", chest: "124〜128", shoulder: "55〜56", length: "74〜76", jpEquiv: "3XL以上" },
      { label: "3XL", chest: "130〜136", shoulder: "57〜59", length: "76〜78", jpEquiv: "4XL以上" },
    ],
    tips: [
      "Tall（TL）表記は同サイズより着丈・袖丈が4〜5cm長い",
      "USA製は同表記でも製造時期によってシルエットが異なることがある",
      "中綿入り（blanket-lined）は無地よりやや大きく感じる",
    ],
  },

  // ── Barbour ジャケット ─────────────────────────────────────────────
  {
    slug: "barbour-jacket",
    brand: "Barbour ビデイル / ボーフォート",
    category: "outerwear",
    era: "全年代共通",
    eraNote: "BarbourはUKサイズ表記。日本人の体型だと同じ数字でも1サイズ小さく感じることが多い。ビデイルとボーフォートで着丈が異なる（ビデイル：短め、ボーフォート：長め）。",
    unit: "eu",
    rows: [
      { label: "C32 / XS", chest: "82〜84",  shoulder: "42〜43", jpEquiv: "XS〜S相当" },
      { label: "C34 / S",  chest: "86〜90",  shoulder: "44〜45", jpEquiv: "S〜M相当" },
      { label: "C36 / M",  chest: "92〜96",  shoulder: "46〜47", jpEquiv: "M〜L相当" },
      { label: "C38 / L",  chest: "98〜102", shoulder: "48〜49", jpEquiv: "L〜XL相当" },
      { label: "C40 / XL", chest: "104〜108",shoulder: "50〜51", jpEquiv: "XL〜2XL相当" },
      { label: "C42 / 2XL",chest: "110〜114",shoulder: "52〜53", jpEquiv: "2XL相当" },
    ],
    tips: [
      "インナーとして厚手のニットやフリースを着る場合は1〜2サイズ上を選ぶ",
      "ヴィンテージBarbourはワックス分が抜けているため、リワックス前提で購入するのが一般的",
      "C（chest）の数字はインチ表記のため、2.54を掛けると㎝換算できる（C38 = 96.5cm）",
    ],
  },

  // ── Nike スウェット・Tシャツ ───────────────────────────────────────
  {
    slug: "nike-sweat-vintage",
    brand: "Nike スウェット（90〜00年代）",
    category: "tops",
    era: "1990〜2000年代（センタースウッシュ時代）",
    eraNote: "90〜00年代のNikeは現行品より全体的にゆったりしたシルエット。USA製は特に身幅が広く、着丈は短め。",
    unit: "us",
    rows: [
      { label: "S",   chest: "96〜100", shoulder: "46〜48", length: "63〜65", jpEquiv: "M〜L相当" },
      { label: "M",   chest: "102〜108",shoulder: "49〜51", length: "66〜68", jpEquiv: "L〜XL相当" },
      { label: "L",   chest: "110〜116",shoulder: "52〜54", length: "69〜71", jpEquiv: "XL〜2XL相当" },
      { label: "XL",  chest: "118〜124",shoulder: "55〜57", length: "72〜74", jpEquiv: "2XL〜3XL相当" },
    ],
    tips: [
      "USA製はブランド内でも特に身幅がゆったりしている",
      "ナイロン素材のウインドブレーカーは比較的サイズ通りに着られる",
      "センタースウッシュはM〜Lサイズが流通量が多い",
    ],
  },
];

export const BRANDS_WITH_GUIDES = SIZE_GUIDES.map((g) => g.brand).filter((b, i, arr) => arr.indexOf(b) === i);
export const CATEGORIES_MAP: Record<SizeGuide["category"], string> = {
  tops:      "トップス",
  bottoms:   "ボトムス",
  outerwear: "アウター",
};
