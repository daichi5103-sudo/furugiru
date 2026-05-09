export interface GlossaryTerm {
  term: string;       // 用語（日本語 or 英語）
  reading: string;    // 読み仮名
  category: "tag" | "fabric" | "market" | "brand" | "condition";
  description: string;
  related?: string[]; // 関連用語
}

export const CATEGORY_LABEL: Record<GlossaryTerm["category"], string> = {
  tag:       "タグ・年代",
  fabric:    "素材・加工",
  market:    "フリマ・相場",
  brand:     "ブランド",
  condition: "状態・品質",
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── タグ・年代 ──────────────────────────────────────────────────────
  {
    term: "Big E",
    reading: "ビッグイー",
    category: "tag",
    description: "Levi'sの赤タブに書かれた「LEVI'S」の「E」が大文字のもの。1971年以前に製造されたヴィンテージの証で、相場が大幅に上がる重要な判別ポイント。1971年以降は小文字の「e」に変更された。",
    related: ["Small e", "赤タブ", "ヴィンテージ"],
  },
  {
    term: "Small e",
    reading: "スモールイー",
    category: "tag",
    description: "Levi'sの赤タブに書かれた「Levi's」の「e」が小文字のもの。1971年以降の製品に使われる。Big Eと比べて相場は下がるが、USAや赤耳など他の要素で価値が変わる。",
    related: ["Big E", "赤タブ"],
  },
  {
    term: "赤タブ",
    reading: "あかたぶ",
    category: "tag",
    description: "Levi'sのバックポケット右端に縫い付けられた赤い布タグ。正規品の証。1936年から採用。ヴィンテージ品では色落ちや文字のフォントが年代判別の手がかりになる。",
    related: ["Big E", "Small e"],
  },
  {
    term: "XX（ダブルエックス）",
    reading: "だぶるえっくす",
    category: "tag",
    description: "Levi'sの最初期タグに書かれた表記。1950年代以前の超ヴィンテージ品のみに見られ、現存数が少なく相場は数十万円以上になることも。タグ自体が生成り色で縫製が粗めなのが特徴。",
    related: ["Big E", "ヴィンテージ"],
  },
  {
    term: "トリコタグ",
    reading: "とりこたぐ",
    category: "tag",
    description: "Championの首元タグで、青・赤・金の3色（トリコロール）ストライプが入ったもの。1940〜50年代の製品に見られ、現在の相場では非常に高値がつくことが多い。",
    related: ["Champion", "バータグ"],
  },
  {
    term: "バータグ",
    reading: "ばーたぐ",
    category: "tag",
    description: "Championの首元タグにCの字の左にバー（棒線）が入ったデザイン。1970〜80年代に主流だったタグで、トリコタグの次世代にあたる。状態が良いものは人気が高い。",
    related: ["トリコタグ", "Champion"],
  },
  {
    term: "ワラント",
    reading: "わらんと",
    category: "tag",
    description: "王室御用達を示す紋章（Royal Warrant）。Barbourなどの英国ブランドのタグに記載されており、ワラントの数や種類で年代が判別できる。3つのワラントが入ったものは特定の年代を示す。",
    related: ["Barbour", "ヴィンテージ"],
  },
  {
    term: "センタースウッシュ",
    reading: "せんたーすうっしゅ",
    category: "tag",
    description: "NikeのロゴであるSwoosh（スウッシュ）が胸の中央に配置されたデザイン。1990年代後半〜2000年代に流行したシルエットで、ヴィンテージ市場では高い人気を誇る。",
    related: ["Nike", "グレータグ"],
  },
  {
    term: "グレータグ",
    reading: "ぐれーたぐ",
    category: "tag",
    description: "Nikeのタグのうちグレーがベースになったもののこと。1990年代〜2000年代前半のもので、USA製も多く状態次第で高値がつく。",
    related: ["Nike", "センタースウッシュ"],
  },

  // ── 素材・加工 ──────────────────────────────────────────────────────
  {
    term: "赤耳（セルヴィッジ）",
    reading: "あかみみ・せるゔぃっじ",
    category: "fabric",
    description: "デニム生地の端（耳）に赤いラインが入ったもの。旧来のシャトル織機で織られた生地にのみ現れる特徴で、ヴィンテージデニムの証。Levi'sでは501の内股部分で確認できる。",
    related: ["Big E", "USA製"],
  },
  {
    term: "リバースウィーブ",
    reading: "りばーすうぃーぶ",
    category: "fabric",
    description: "Championが開発した特殊な編み構造のスウェット生地。縦方向ではなく横方向に編むことで洗濯時の縦縮みを防ぐ。通称「リバースウィーブ」または「逆吊り裏毛」とも呼ばれ、ヴィンテージ品は特に厚みと丈夫さが魅力。",
    related: ["Champion", "スウェット"],
  },
  {
    term: "フリース（フリース素材）",
    reading: "ふりーす",
    category: "fabric",
    description: "ポリエステルを起毛させた合成繊維素材。PatagoniaやThe North Faceが1980年代から採用し古着市場で人気を誇る。初期のフリースは生地の厚みと風合いが現行品と異なり、ヴィンテージとして高値がつく。",
    related: ["Patagonia", "The North Face"],
  },
  {
    term: "デッドストック",
    reading: "でっどすとっく",
    category: "fabric",
    description: "一度も着用されていない新品状態のヴィンテージ品。英語の「Dead Stock（在庫の死蔵品）」から。タグ付きのものは「タグ付きデッドストック」と呼ばれ、最高の状態として相場が大幅に上昇する。略して「DS」とも表記される。",
    related: ["状態", "相場"],
  },
  {
    term: "オンス（oz）",
    reading: "おんす",
    category: "fabric",
    description: "デニムや帆布素材の重さを表す単位。数値が大きいほど生地が厚く重い。Levi'sのヴィンテージ501は約13〜14ozが多く、現行品より厚い傾向がある。カーハートのダック素材は12〜14ozが多い。",
    related: ["デニム", "カーハート"],
  },
  {
    term: "ワックスコットン（オイルドコットン）",
    reading: "わっくすこっとん・おいるどこっとん",
    category: "fabric",
    description: "コットン生地にワックス（蝋）やオイルを塗り込んだ防水素材。Barbourのジャケットに代表される伝統的な素材。経年でワックスが抜けるため、定期的に再塗布（リワックス）が必要。独特の風合いがヴィンテージの魅力となる。",
    related: ["Barbour", "リワックス"],
  },

  // ── フリマ・相場 ──────────────────────────────────────────────────────
  {
    term: "USA製（メイドインUSA）",
    reading: "めいどいんゆーえすえー",
    category: "market",
    description: "アメリカ国内で製造されたことを示す表記。多くのブランドが1990〜2000年代に生産拠点を海外移転したため、USA製のヴィンテージ品は品質と希少性が高く相場が上がる傾向がある。",
    related: ["ヴィンテージ", "相場"],
  },
  {
    term: "プレ値",
    reading: "ぷれち",
    category: "market",
    description: "プレミアム価格の略。定価を大幅に上回る価格で取引されている状態。人気のコラボやヴィンテージ品に多く見られる。「プレ値がつく」という表現で使われる。",
    related: ["相場", "コラボ", "転売"],
  },
  {
    term: "即決",
    reading: "そっけつ",
    category: "market",
    description: "オークション形式のフリマ（ヤフオクなど）で、入札を待たずに即座に購入できる価格設定。即決価格を設定しておくと、入札競争なしに購入できる。",
    related: ["ヤフオク", "相場"],
  },
  {
    term: "BIN（Buy It Now）",
    reading: "びんかかく",
    category: "market",
    description: "即決価格の英語表記。「今すぐ買う」の意味で、eBayなどの海外フリマでよく使われる。メルカリやラクマでは「即購入OK」と表現されることが多い。",
    related: ["即決", "海外フリマ"],
  },
  {
    term: "値下げ交渉（ネゴ）",
    reading: "ねごしえーしょん・ねご",
    category: "market",
    description: "フリマアプリで出品者に対して価格交渉を行うこと。コメント欄で「〇〇円はいかがでしょうか」と打診するのが一般的なやり方。相場を把握した上で常識的な範囲で交渉するのがマナー。",
    related: ["フリマ", "相場"],
  },
  {
    term: "相場",
    reading: "そうば",
    category: "market",
    description: "中古市場で実際に取引されている価格帯。同じアイテムでも状態・サイズ・年代・付属品の有無によって大きく変わる。メルカリの「売り切れ」表示で確認できる実際の成約価格が最も参考になる。",
    related: ["プレ値", "フリマ"],
  },
  {
    term: "ノークレームノーリターン（NCNR）",
    reading: "のーくれーむのーりたーん",
    category: "market",
    description: "フリマでの取引条件で「返品・クレーム不可」を意味する。ヴィンテージ品は写真と実物の色味が異なる場合があるため、購入前に出品者に状態の詳細確認をすることが重要。",
    related: ["フリマ", "コンディション"],
  },

  // ── ブランド ──────────────────────────────────────────────────────────
  {
    term: "ヴィンテージ",
    reading: "ゔぃんてーじ",
    category: "brand",
    description: "一般的に製造から20〜30年以上経過した衣類・アイテムを指す。古着市場では「ヴィンテージ」と「古着」は厳密には異なり、年代・ブランド・状態によって価値が大きく変わる。",
    related: ["デッドストック", "USA製"],
  },
  {
    term: "WIP（ワーク・イン・プログレス）",
    reading: "わーく・いん・ぷろぐれす",
    category: "brand",
    description: "Carhartt WIPの正式名称「Work In Progress」の略。ヨーロッパ発のCarharttのストリートライン。オリジナルCarharttより細身でアーバンなシルエットが特徴で、日本での取り扱いはWIPが多い。",
    related: ["カーハート", "ワークウェア"],
  },
  {
    term: "Box Logo（ボックスロゴ）",
    reading: "ぼっくすろご",
    category: "brand",
    description: "Supremeの四角い枠に白抜きの「Supreme」ロゴを指す。Supremeの代名詞的デザインで、Box Logoが入ったTシャツやパーカーは特に高値で取引される。コラボBox Logoは通常の数倍の相場になることもある。",
    related: ["Supreme", "コラボ"],
  },
  {
    term: "コラボ（コラボレーション）",
    reading: "こらぼ",
    category: "brand",
    description: "2つ以上のブランドや人物が共同で制作したアイテム。限定数での販売が多く、発売後に相場が上昇しやすい。Supreme × The North Face、Nike × Off-Whiteなどが代表例。",
    related: ["プレ値", "Box Logo"],
  },
  {
    term: "スウッシュ（Swoosh）",
    reading: "すうっしゅ",
    category: "brand",
    description: "Nikeのトレードマークであるチェックマーク型のロゴ。ヴィンテージNikeでは刺繍の形・大きさ・配置が年代判別の手がかりになる。1990年代の「センタースウッシュ」は現在特に人気が高い。",
    related: ["Nike", "センタースウッシュ"],
  },

  // ── 状態・品質 ──────────────────────────────────────────────────────
  {
    term: "色落ち（フェード）",
    reading: "いろおち・ふぇーど",
    category: "condition",
    description: "デニムや染色素材が洗濯・着用によって退色した状態。ヴィンテージデニムでは自然な色落ちが独特の風合いを生み出し、むしろ価値を高めることもある。ただし過度な色落ちは「退色」として状態評価が下がる場合も。",
    related: ["デニム", "コンディション"],
  },
  {
    term: "スレ",
    reading: "すれ",
    category: "condition",
    description: "生地の表面が擦れて薄くなったり、光沢が出たりした状態。首元・袖口・ポケット口・裾などに出やすい。軽微なスレは「使用感」として許容されるが、程度によっては評価が下がる。",
    related: ["コンディション", "状態"],
  },
  {
    term: "玉虫（たまむし）",
    reading: "たまむし",
    category: "condition",
    description: "生地表面に毛玉（ピリング）が発生した状態。スウェットやニット素材に多い。コロコロ（粘着テープ）である程度除去できるが、著しい毛玉は品質低下の指標となる。",
    related: ["コンディション", "スウェット"],
  },
  {
    term: "黄ばみ",
    reading: "きばみ",
    category: "condition",
    description: "白・生成り色の素材が時間経過や汗・紫外線によって黄色く変色した状態。特に脇・首元に出やすい。軽度であれば酸素系漂白剤で改善できる場合があるが、素材によっては不可能なこともある。",
    related: ["コンディション", "クリーニング"],
  },
  {
    term: "ネップ",
    reading: "ねっぷ",
    category: "condition",
    description: "生地に紡績時の繊維の塊（節）が残った状態。特にヴィンテージの天然素材に見られる。品質欠陥ではなく、むしろ素材の自然な風合いとしてヴィンテージ愛好家に好まれる場合もある。",
    related: ["素材", "ヴィンテージ"],
  },
  {
    term: "ダメージ（ダメージ加工）",
    reading: "だめーじ",
    category: "condition",
    description: "デニムなどに意図的に施された破れ・すり切れの加工。ヴィンテージの「自然なダメージ」は風合いとして評価されるが、「ダメージ加工品」は新品時から加工されたもの。フリマでは区別して状態説明されることが多い。",
    related: ["コンディション", "デニム"],
  },
];

export const CATEGORIES = ["すべて", ...Object.keys(CATEGORY_LABEL)] as const;
