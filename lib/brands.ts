export interface TagEra {
  era: string;         // "1960s〜1970s前半"
  years: string;       // "1967–1974"
  tagName: string;     // "Big E"
  features: string[];  // タグの特徴
  fakeWarnings: string[]; // 偽物でよく見られるポイント
  authenticMarkers: string[]; // 本物の証明ポイント
  rarity: "common" | "uncommon" | "rare" | "very_rare";
  priceRange: string;  // "¥8,000〜¥50,000"
}

export interface Brand {
  slug: string;
  name: string;
  nameJp: string;
  country: string;
  founded: string;
  description: string;
  category: "fashion" | "cosmetics" | "accessories";
  tagEras: TagEra[];
  generalFakeTips: string[];
  searchTips: string[];
  color: string;
}

export const BRANDS: Brand[] = [
  {
    slug: "levis",
    name: "Levi's",
    nameJp: "リーバイス",
    country: "🇺🇸 アメリカ",
    founded: "1853年",
    description: "世界最古のデニムブランド。501は1890年から続く伝説的モデル。ヴィンテージ市場では特にBig E、赤耳、XX（ダブルエックス）が高値で取引される。",
    color: "#1B4FBF",
    category: "fashion",
    tagEras: [
      {
        era: "1950年代以前",
        years: "〜1954",
        tagName: "XX（ダブルエックス）タグ",
        features: [
          "タグ自体に「XX」の表記あり",
          "生地はコットン100%のセルビッジデニム",
          "隠しリベット（コインポケット内側）あり",
          "赤タブは両面「LEVI'S」大文字",
          "腰部分のシンチバック（ベルト調節金具）付き",
        ],
        fakeWarnings: [
          "XXタグは現代に復刻品多数。ステッチの太さが均一すぎる",
          "赤タブの文字がにじんでいるか確認（本物はくっきり）",
          "リベットの刻印が薄いまたは省略されている",
        ],
        authenticMarkers: [
          "紙パッチの革っぽい質感（実際はボール紙）",
          "隠しリベットのガタつき感",
          "縦落ちしたセルビッジの赤耳",
        ],
        rarity: "very_rare",
        priceRange: "¥50,000〜¥300,000+",
      },
      {
        era: "1950年代後半〜1970年代前半",
        years: "1955–1971",
        tagName: "Big E タグ",
        features: [
          "赤タブの「LEVI'S」が全て大文字（Big E）",
          "タグ背景は白地にグレーの縁取り",
          "「MADE IN USA」の記載あり",
          "Two Horse Brand（馬ロゴ）が革製パッチ",
          "コインポケットにリベットあり",
        ],
        fakeWarnings: [
          "赤タブの「E」が小文字になっている（1971年以降の仕様）",
          "タグの縫い付けがミシン目が細かすぎる",
          "生地が薄い・コシがない",
          "「MADE IN USA」がない、または後付けに見える",
        ],
        authenticMarkers: [
          "赤タブ裏面も「LEVI'S」大文字（両面Big E）",
          "カン止め（arcuate）のステッチが手縫い風",
          "ジッパーはYKK・Scovill・Talon製",
        ],
        rarity: "rare",
        priceRange: "¥15,000〜¥80,000",
      },
      {
        era: "1970年代前半〜1980年代",
        years: "1971–1983",
        tagName: "Small e タグ",
        features: [
          "赤タブが「LeVI'S」と小文字の「e」",
          "タグに「MADE IN USA」継続",
          "ペーパーパッチ（紙製）に変更",
          "ボタンの裏面に「LEVI STRAUSS & CO」刻印",
        ],
        fakeWarnings: [
          "パッチが革製になっている（この時代は紙製）",
          "タグの色が黄ばみすぎ（人工的なエイジング）",
          "ステッチが化学繊維系でテカっている",
        ],
        authenticMarkers: [
          "紙パッチの自然な劣化・色褪せ",
          "フラッシャー（紙タグ）が残っていれば価値UP",
          "インナータグに品番・サイズの印刷が薄め",
        ],
        rarity: "uncommon",
        priceRange: "¥5,000〜¥25,000",
      },
      {
        era: "1980年代後半〜1990年代",
        years: "1983–1999",
        tagName: "オレンジタブ / 現行タグ移行期",
        features: [
          "オレンジタブライン（廉価版）が登場",
          "一部海外生産（MADE IN ○○）開始",
          "タグデザインが現代寄りに",
          "生地のコシが薄くなる傾向",
        ],
        fakeWarnings: [
          "「MADE IN USA」と書いてあるが縫製が粗い",
          "赤タブの色が鮮やかすぎる（退色していない）",
        ],
        authenticMarkers: [
          "生産国のタグが正確に記載",
          "洗濯絵表示タグが時代に合った表記",
        ],
        rarity: "common",
        priceRange: "¥2,000〜¥10,000",
      },
    ],
    generalFakeTips: [
      "赤タブの「E」の大文字・小文字は年代判定の最重要ポイント",
      "リベット（金属鋲）の刻印「LEVI STRAUSS & CO」を必ず確認",
      "生地裏のセルビッジ（赤耳）は1980年代以降は基本なし",
      "ステッチ（アーキュエイト）は本物は若干左右非対称になりやすい",
      "偽物はタグの縫製が綺麗すぎる・文字がくっきりしすぎることが多い",
    ],
    searchTips: [
      "「Levi's Big E」「リーバイス ビッグE」で年代物を検索",
      "「501xx」「66前期」などモデル番号も活用",
      "「赤耳」「セルビッジ」でヴィンテージ品を絞り込み",
    ],
  },
  {
    slug: "champion",
    name: "Champion",
    nameJp: "チャンピオン",
    country: "🇺🇸 アメリカ",
    founded: "1919年",
    description: "1919年創業の老舗スポーツウェアブランド。リバースウィーブは1952年発売。タグの変遷が細かく、年代判定がしやすいことで古着マニアに人気。",
    color: "#CC0000",
    category: "fashion",
    tagEras: [
      {
        era: "1950年代〜1960年代",
        years: "1952–1969",
        tagName: "ランニングマン初期タグ",
        features: [
          "タグに走るランニングマンのロゴ",
          "「CHAMPION KNITWEAR」の表記",
          "生地は極厚のヘビーコットン",
          "縦型のタグデザイン",
          "リブの密度が高く詰まっている",
        ],
        fakeWarnings: [
          "ランニングマンの走る方向が逆になっている",
          "生地が薄い・軽い",
          "タグの縫い付けが新しい糸を使用",
        ],
        authenticMarkers: [
          "リブの伸びと戻りに独特のコシ感",
          "両V（Vガゼット）の存在",
          "肩部分のリバースウィーブ構造（縦方向の伸縮を抑制）",
        ],
        rarity: "very_rare",
        priceRange: "¥30,000〜¥150,000",
      },
      {
        era: "1970年代前半",
        years: "1970–1975",
        tagName: "青タグ（トリコタグ）",
        features: [
          "青・赤・金の3色トリコロールタグ",
          "「C」ロゴが大きめ",
          "「MADE IN USA」の明記",
          "袖にCロゴ刺繍あり（一部モデル）",
        ],
        fakeWarnings: [
          "トリコタグの色がくすんでいない（経年変化がない）",
          "タグ裏の縫製糸が白・新しい",
        ],
        authenticMarkers: [
          "タグの色の自然な退色",
          "ヘビーウェイトの生地感（400〜500g/m²以上）",
        ],
        rarity: "rare",
        priceRange: "¥20,000〜¥60,000",
      },
      {
        era: "1970年代後半〜1980年代前半",
        years: "1975–1985",
        tagName: "バータグ（棒タグ）",
        features: [
          "横長の棒状タグデザイン",
          "チャンピオンCロゴが小さめ",
          "「REVERSE WEAVE」の文字入りタグ",
          "カラーバリエーションが豊富になる",
        ],
        fakeWarnings: [
          "「REVERSE WEAVE」の文字フォントが現代風",
          "タグ素材がポリエステル系でパリっとしている",
        ],
        authenticMarkers: [
          "タグ素材がコットン系でくたっとしている",
          "両サイドのリブが別素材",
        ],
        rarity: "uncommon",
        priceRange: "¥8,000〜¥30,000",
      },
      {
        era: "1980年代後半〜1990年代",
        years: "1986–1999",
        tagName: "二段タグ",
        features: [
          "タグが上下2段構成",
          "上段に「Champion」ロゴ、下段にサイズ",
          "USA製とホンジュラス製が混在",
          "カレッジプリント商品が多い",
        ],
        fakeWarnings: [
          "プリントが剥がれやすい（本物は染み込んでいる）",
          "タグの二段が均等すぎる",
        ],
        authenticMarkers: [
          "胸のCロゴ刺繍の糸の太さと密度",
          "カレッジロゴは公式ライセンス表記あり",
        ],
        rarity: "common",
        priceRange: "¥3,000〜¥15,000",
      },
    ],
    generalFakeTips: [
      "Cロゴ刺繍は本物だとループ糸が詰まっていて密度が高い",
      "偽物は刺繍がスカスカで下地の生地が透けて見える",
      "リバースウィーブは生地を横向きに使う製法なので、縦に引っ張っても伸びにくい",
      "タグの退色・色落ちが自然かどうかが重要な判断基準",
      "90年代カレッジものは大学ライセンスタグが本体についているか確認",
    ],
    searchTips: [
      "「Champion リバースウィーブ」「チャンピオン トリコタグ」で年代物を検索",
      "「チャンピオン バータグ」「二段タグ」で絞り込み",
      "「USA製」「MADE IN USA」のキーワードを追加すると本物率UP",
    ],
  },
  {
    slug: "ralph-lauren",
    name: "Ralph Lauren",
    nameJp: "ラルフローレン",
    country: "🇺🇸 アメリカ",
    founded: "1967年",
    description: "1967年創業。POLOブランドのポロシャツ・スウェットはヴィンテージ市場でも人気。タグの変遷が多く、偽物も多いブランドの一つ。",
    color: "#1A3A6B",
    category: "fashion",
    tagEras: [
      {
        era: "1970年代〜1980年代前半",
        years: "1972–1984",
        tagName: "初期ポロタグ",
        features: [
          "「POLO by Ralph Lauren」縦書きタグ",
          "馬と騎手のロゴが細かく精密",
          "「MADE IN USA」の記載",
          "コットン100%の厚手生地",
        ],
        fakeWarnings: [
          "馬・騎手のロゴが荒い・簡略化されている",
          "「Ralph Lauren」のフォントが異なる",
          "タグの縫い付けがほつれやすい安い糸",
        ],
        authenticMarkers: [
          "騎手の足の形・スティックの角度が正確",
          "USA製はタグに産地が明記",
          "ボタンが天然素材（貝・ホーン）で重みがある",
        ],
        rarity: "rare",
        priceRange: "¥10,000〜¥50,000",
      },
      {
        era: "1980年代後半〜1990年代",
        years: "1985–1999",
        tagName: "ポニータグ（黄色・緑）",
        features: [
          "黄色タグ（POLO Sport）・緑タグ（POLO Country）が登場",
          "刺繍ポニーのサイズが規格化",
          "一部韓国・香港製が登場",
          "タグカラーでラインを識別可能",
        ],
        fakeWarnings: [
          "刺繍ポニーが歪んでいる・左右対称でない",
          "タグの糸がほつれている・色落ちが不自然",
          "ボタンがプラスチック製（本物は貝ボタン）",
          "ポニーの刺繍糸の色が微妙に違う",
        ],
        authenticMarkers: [
          "刺繍の裏面が綺麗に処理されている",
          "縫い目が均等で詰まっている",
          "生地タグに素材・生産国が正確に記載",
        ],
        rarity: "uncommon",
        priceRange: "¥5,000〜¥20,000",
      },
    ],
    generalFakeTips: [
      "刺繍ポニーの足の本数（4本）と尻尾の形を必ず確認",
      "偽物は刺繍の密度が低く、生地が透けて見える",
      "本物のボタンは貝製で光に透かすと自然な模様がある",
      "タグのフォント「Ralph Lauren」の「R」の形が重要なチェックポイント",
      "ビンテージ品は適度な退色・くたり感があるのが自然",
    ],
    searchTips: [
      "「POLO Ralph Lauren ヴィンテージ」「ポロ 90s」で検索",
      "「POLO SPORT」「POLO Country」でラインを指定",
      "「USA製」「香港製」で生産地を絞り込み",
    ],
  },
  {
    slug: "supreme",
    name: "Supreme",
    nameJp: "シュプリーム",
    country: "🇺🇸 アメリカ",
    founded: "1994年",
    description: "1994年ニューヨーク創業のストリートブランド。偽物（スーパーフェイク）が最も多いブランドの一つ。Box Logoアイテムは特に精巧な偽物が存在するため注意が必要。",
    color: "#FF0000",
    category: "fashion",
    tagEras: [
      {
        era: "1994年〜2000年代前半",
        years: "1994–2004",
        tagName: "初期白タグ",
        features: [
          "白地に「Supreme」赤文字タグ",
          "タグの縫い付けが太い糸",
          "「NEW YORK」の記載",
          "Box Logoは初期から存在",
        ],
        fakeWarnings: [
          "Supremeのフォント（Futura Heavy Oblique）が微妙に違う",
          "赤の色味が鮮やかすぎる・オレンジがかっている",
          "「MADE IN USA」があるべき時期にない",
        ],
        authenticMarkers: [
          "正規のフォント比率（文字間隔・太さ）",
          "タグの裁断面が綺麗",
          "初期はUSA製が多い",
        ],
        rarity: "very_rare",
        priceRange: "¥30,000〜（定価の5〜10倍）",
      },
      {
        era: "2000年代後半〜2010年代",
        years: "2005–2019",
        tagName: "現行タグ移行期",
        features: [
          "タグデザインがほぼ現行と同様",
          "内タグに洗濯絵表示が規格化",
          "Box Logo Hoodieは毎シーズン限定販売",
          "コラボタグが登場（CDG、Nike等）",
        ],
        fakeWarnings: [
          "Box Logoの「Supreme」文字の太さ・間隔が微妙にズレている",
          "刺繍の裏面処理が粗い",
          "ジッパープルのエングレービングがない・薄い",
          "縫製の始末が粗い（特に脇・袖部分）",
        ],
        authenticMarkers: [
          "正規品はジッパーにYKK製を使用",
          "Box Logoの刺繍は輪郭がシャープ",
          "タグの糸がほつれず均一",
        ],
        rarity: "rare",
        priceRange: "¥20,000〜¥200,000+",
      },
    ],
    generalFakeTips: [
      "Box Logoの「Supreme」はFutura Heavy Obliqueフォント。文字の太さと傾きを正規品と比較",
      "偽物はロゴの赤がオレンジがかっていることが多い",
      "縫製の裏側を確認：本物は丁寧に処理されている",
      "ジッパーはYKK製が基本（コラボ品は例外あり）",
      "正規販売店（シュプリームジャパン公式・正規取扱店）のレシートや証明書があれば安心",
      "スーパーフェイクは画像だけでは判別困難。重さ・生地感を確認することが重要",
    ],
    searchTips: [
      "「Supreme Box Logo」「シュプリーム ボックスロゴ」で検索",
      "「supreme 正規品」「supreme レシートあり」で絞り込み",
      "出品者の評価・取引履歴を必ず確認",
    ],
  },
  {
    slug: "nike",
    name: "Nike",
    nameJp: "ナイキ",
    country: "🇺🇸 アメリカ",
    founded: "1964年",
    description: "1964年創業（当初はBlue Ribbon Sports）。ヴィンテージ市場ではスウッシュロゴの形・配置、タグの年代表記が重要な判定ポイント。エアマックス95・Air Jordan・スウェットなど幅広いアイテムが人気。",
    color: "#111111",
    category: "fashion",
    tagEras: [
      {
        era: "1970年代",
        years: "1972–1979",
        tagName: "初期スウッシュタグ",
        features: [
          "スウッシュロゴが太く単純な形状",
          "「Nike」ロゴのフォントが現在と異なる手書き風",
          "「MADE IN JAPAN」「MADE IN KOREA」が多い",
          "タグはシンプルな白地に黒文字",
          "品番・カラーコードが手書き風印刷",
        ],
        fakeWarnings: [
          "スウッシュの角度・太さが現行ロゴになっている",
          "「NIKE」の文字フォントが現代的すぎる",
          "生産国タグが「VIETNAM」「CHINA」（この時代は日韓製）",
        ],
        authenticMarkers: [
          "日本製・韓国製タグの存在（Made in Japan / Korea）",
          "タグ素材が薄い布地で色あせがある",
          "品番が5桁以下のシンプルな数字",
        ],
        rarity: "very_rare",
        priceRange: "¥20,000〜¥100,000+",
      },
      {
        era: "1980年代",
        years: "1980–1989",
        tagName: "グレータグ / オレンジタグ",
        features: [
          "グレー地またはオレンジ地のタグが登場",
          "「Nike」の筆記体ロゴとスウッシュの併記",
          "Air Maxラインが1987年から登場",
          "ナイロン素材のシェルスーツが人気",
          "USA製・日本製・韓国製が混在",
        ],
        fakeWarnings: [
          "タグのスウッシュが小さすぎる・細すぎる",
          "オレンジタグの色が鮮やかすぎる（退色していない）",
          "筆記体「Nike」のカーブが歪んでいる",
        ],
        authenticMarkers: [
          "筆記体Nikeとスウッシュの位置関係が正確",
          "タグ素材の自然な経年変化（黄ばみ・くたり）",
          "品番構成が時代に合っている",
        ],
        rarity: "rare",
        priceRange: "¥8,000〜¥40,000",
      },
      {
        era: "1990年代前半",
        years: "1990–1995",
        tagName: "センタースウッシュタグ",
        features: [
          "タグ中央にスウッシュロゴが大きく配置",
          "「JUST DO IT」スローガンが普及",
          "Air Max 90・95が登場（1990・1995年）",
          "バスケ・テニス・ランニングラインが確立",
          "USA製から東南アジア製へ移行開始",
        ],
        fakeWarnings: [
          "スウッシュの幅・傾き角度が標準と異なる",
          "「JUST DO IT」のフォントが微妙に違う",
          "ジッパープルの刻印が省略・薄い",
          "縫い目の密度が粗い（1cm当たり8針以下）",
        ],
        authenticMarkers: [
          "スウッシュの左端の細い部分がシャープに尖っている",
          "内タグの洗濯絵表示が時代に合った国際規格",
          "ソールの型番が刻印（シューズの場合）",
        ],
        rarity: "uncommon",
        priceRange: "¥5,000〜¥25,000",
      },
      {
        era: "1990年代後半〜2000年代",
        years: "1996–2009",
        tagName: "現行タグ移行期",
        features: [
          "タグデザインがほぼ現行に近い",
          "ベトナム・中国・インドネシア製が主流",
          "Dri-FIT等テクノロジー表記が登場",
          "コラボライン（ACG、Jordan Brand）が多様化",
        ],
        fakeWarnings: [
          "Nikeのスウッシュロゴが歪んでいる・太すぎる",
          "Dri-FITタグが時代より早く登場している",
          "生産国と内タグの表記が矛盾している",
        ],
        authenticMarkers: [
          "正規品はジッパーにYKK製またはNike刻印あり",
          "刺繍スウッシュは輪郭がシャープで密度が高い",
          "品番がNikeの命名規則に沿っている",
        ],
        rarity: "common",
        priceRange: "¥3,000〜¥15,000",
      },
    ],
    generalFakeTips: [
      "スウッシュは左端が細く尖り、右端に向かって太くなる放物線形状が正確",
      "偽物はスウッシュが太すぎる・短すぎる・角度が違うことが多い",
      "刺繍スウッシュは裏面の処理が綺麗かどうかを確認",
      "エアマックス等のシューズは型番（品番）をNike公式サイトで照合",
      "ジッパープルにNikeまたはYKKの刻印があるか確認",
      "生産国タグと品番の製造年が一致しているか照合すること",
    ],
    searchTips: [
      "「Nike ヴィンテージ 90s」「ナイキ 古着」で年代物を検索",
      "「エアマックス95 OG」「Air Jordan 1 vintage」で希少品を探す",
      "「センタースウッシュ」「90s ナイキ スウェット」で絞り込み",
    ],
  },
  {
    slug: "carhartt",
    name: "Carhartt",
    nameJp: "カーハート",
    country: "🇺🇸 アメリカ",
    founded: "1889年",
    description: "1889年創業のアメリカン・ワークウェアブランド。欧州展開のCarhartt WIPとオリジナルUSA Carharttはタグで区別できる。ダック地のデトロイトジャケット・チョアコートが古着市場で特に人気。",
    color: "#D4A017",
    category: "fashion",
    tagEras: [
      {
        era: "1970年代以前",
        years: "〜1979",
        tagName: "初期ワークタグ",
        features: [
          "「CARHARTT」の文字のみシンプルなタグ",
          "「MADE IN USA」の記載",
          "ダック生地（12〜14oz）の厚手コットン",
          "フロントポケットが大型のユーティリティ仕様",
          "金属製バックルとサスペンダーボタン",
        ],
        fakeWarnings: [
          "タグの「C」ロゴが現在のデザインになっている（初期はロゴなし）",
          "生地が薄い・コシがない（本物は非常に厚手）",
          "MADE IN USAがないまたは後から縫い付けたように見える",
        ],
        authenticMarkers: [
          "極厚ダック生地の重量感（ジャケット1枚で1kg以上）",
          "金属製リベット・ボタンに「CARHARTT」刻印",
          "縫い目の二重縫いが均一で丈夫",
        ],
        rarity: "very_rare",
        priceRange: "¥20,000〜¥80,000",
      },
      {
        era: "1980〜1990年代（USA製）",
        years: "1980–1999",
        tagName: "Cロゴタグ（USA製）",
        features: [
          "「C」ロゴが正式タグに採用",
          "「CARHARTT」ブランド名が太字ゴシック",
          "「MADE IN USA」の継続",
          "デトロイトジャケット・チョアコートの黄金期",
          "ブラウン・ブラック・タンなどワーク系カラー",
        ],
        fakeWarnings: [
          "「C」ロゴの形状が細すぎる・太すぎる",
          "USA製タグなのに縫製が粗い",
          "生地のオンスが軽い（本物は10〜14oz）",
          "ポケットの位置・サイズが標準と異なる",
        ],
        authenticMarkers: [
          "タグ裏の縫い付けに使われている糸が褐色または黄色",
          "「Carhartt Quality Clothing Since 1889」の文字（一部モデル）",
          "フロントジッパーのプルにCARHARTT刻印",
        ],
        rarity: "uncommon",
        priceRange: "¥8,000〜¥35,000",
      },
      {
        era: "Carhartt WIP（欧州ライン）",
        years: "1994–現在",
        tagName: "WIPタグ",
        features: [
          "「Carhartt WIP」タグ（Work In Progress）",
          "ヨーロッパ・アジア生産",
          "スリムシルエットのストリート向けデザイン",
          "アーティスト・DJカルチャーとのコラボ多数",
          "ロゴに「WIP」の文字が必ず入る",
        ],
        fakeWarnings: [
          "WIPタグなのにシルエットがUSA Carharttそっくり（逆もあり）",
          "「WIP」の文字が省略されている",
          "ロゴの書体が微妙に違う",
        ],
        authenticMarkers: [
          "WIPタグには必ず「Work In Progress」またはWIPの記載",
          "縫製仕上げがUSA版より細かい傾向",
          "品番がWIP独自の体系（アルファベット+数字）",
        ],
        rarity: "common",
        priceRange: "¥5,000〜¥20,000",
      },
    ],
    generalFakeTips: [
      "USA CarharttとCarhartt WIPはまったく別ラインなので混同しないこと",
      "本物のダック地は非常に重く硬い。軽い・柔らかいものは要注意",
      "デトロイトジャケットのリベットに「CARHARTT」刻印が必ずある",
      "フェイドやウォッシュ加工品は本物の経年変化と異なるムラが出やすい",
      "チョアコートの裏地（ケット裏・キルティング）の縫い目が均一かを確認",
    ],
    searchTips: [
      "「Carhartt USA製」「カーハート MADE IN USA」でオリジナル品を検索",
      "「デトロイトジャケット」「チョアコート」でモデル名指定も有効",
      "「Carhartt WIP」で欧州ラインに絞り込み可能",
    ],
  },
  {
    slug: "stone-island",
    name: "Stone Island",
    nameJp: "ストーンアイランド",
    country: "🇮🇹 イタリア",
    founded: "1982年",
    description: "1982年イタリア創業。左腕のコンパスバッジ（ワッペン）が象徴。素材実験・特殊染色技術で知られ、シーズンごとに異なる素材・カラーリングを採用。偽物が非常に多いブランドの一つ。",
    color: "#1C4E80",
    category: "fashion",
    tagEras: [
      {
        era: "1982〜1980年代",
        years: "1982–1989",
        tagName: "初期コンパスバッジ",
        features: [
          "コンパスバッジのロゴが現在より太く荒い",
          "「STONE ISLAND」の文字フォントが若干異なる",
          "イタリア製（MADE IN ITALY）のみ",
          "初期はジャケット・コート中心",
          "バッジの地色がカーキ・ネイビー・オリーブ",
        ],
        fakeWarnings: [
          "コンパスのN/S/E/Wの位置が間違っている",
          "バッジの刺繍密度が低くスカスカ",
          "「STONE ISLAND」の文字間隔が不均一",
        ],
        authenticMarkers: [
          "バッジ裏の縫製が密で均一",
          "コンパス針の先端が細くシャープ",
          "MADE IN ITALYタグの布質が綿サテン系",
        ],
        rarity: "very_rare",
        priceRange: "¥50,000〜¥200,000+",
      },
      {
        era: "1990年代",
        years: "1990–1999",
        tagName: "ワッペンタグ（旧ロゴ）",
        features: [
          "左袖バッジが現在のデザインに近づく",
          "「STONE ISLAND」がアーチ状に配置",
          "素材実験が本格化（アイスジャケット等）",
          "カラーリングの種類が増加",
          "内タグに素材・製造番号が詳細に記載",
        ],
        fakeWarnings: [
          "バッジのコンパスローズの形状が正八角形でない",
          "刺繍の色が正規品と微妙に異なる（特に赤・金）",
          "バッジを取り外して再縫い付けした跡がある",
          "内タグの生産番号フォーマットが実在しない",
        ],
        authenticMarkers: [
          "バッジ裏に「STONE ISLAND」の織りネームが必ずある",
          "各シーズンの素材カード（タグカード）が付属していれば価値UP",
          "内タグの品番が公式アーカイブと照合可能",
        ],
        rarity: "rare",
        priceRange: "¥20,000〜¥80,000",
      },
      {
        era: "2000年代〜現在",
        years: "2000–現在",
        tagName: "現行コンパスバッジ",
        features: [
          "左袖バッジのデザインが現行フォーマットで統一",
          "QRコード・NFC認証が近年導入",
          "素材タグ（ガーメントダイ・リフレクティブ等）が充実",
          "C.P.Companyとの歴史的つながりがわかるアーカイブ品も存在",
          "シーズン別のカプセルコレクション展開",
        ],
        fakeWarnings: [
          "QRコードを読んでも公式サイトに飛ばない",
          "バッジのゴールドワイヤー刺繍が太い・歪んでいる",
          "ジップの引き手にコンパスロゴが刻印されていない",
          "縫い目が均一でなく端が処理されていない",
          "ゴースト品（正規品から外したバッジを偽物に付けたもの）に注意",
        ],
        authenticMarkers: [
          "バッジは必ず左袖に縫い付け（右袖・胸・背中は偽物の可能性）",
          "NFC/QR認証が通る（2020年以降の新品）",
          "シーズンタグに製造ロット番号と素材コードが一致",
        ],
        rarity: "uncommon",
        priceRange: "¥15,000〜¥60,000",
      },
    ],
    generalFakeTips: [
      "コンパスバッジのN・S・E・W（東西南北）の位置が正確かを必ず確認",
      "バッジ裏面に「STONE ISLAND」の織りネームがない場合は偽物の可能性大",
      "バッジは必ず左袖に付く。位置が違う場合は要注意",
      "刺繍の密度が低い・コンパス針が太い・文字間隔が不均一は偽物のサイン",
      "「ゴースト品」（本物バッジ+偽物本体）は生地質・縫製で判断する",
      "2020年以降の現行品はNFC/QR認証対応。スマホで読み取れるか確認",
    ],
    searchTips: [
      "「Stone Island 旧タグ」「ストーンアイランド 90s」で年代物を検索",
      "「stone island ghost piece」に注意（偽物品のスラング）",
      "「ストーンアイランド 正規品」「stone island 領収書あり」で絞り込み",
    ],
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export const RARITY_LABEL: Record<string, string> = {
  common: "普通",
  uncommon: "やや希少",
  rare: "希少",
  very_rare: "超希少",
};

export const RARITY_COLOR: Record<string, string> = {
  common: "#6B7280",
  uncommon: "#2563EB",
  rare: "#7C3AED",
  very_rare: "#DC2626",
};
