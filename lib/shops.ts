// lib/shops.ts - 全国古着屋データ
// ※ 情報は2025年時点の参考データです。営業状況は各店舗にご確認ください。

export interface Review {
  text: string;
  date: string;
}

export interface Shop {
  name: string;
  area: string;
  address: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  goodReviews: Review[];
  badReviews: Review[];
  googleMapUrl: string;
  instagramUrl?: string;
}

export interface AreaData {
  prefecture: string;
  areaLabel: string;
  shops: Shop[];
}

export const SHOP_DATA: Record<string, AreaData> = {

  // ──────────────────────────────────────────
  // 東京
  // ──────────────────────────────────────────
  "下北沢": {
    prefecture: "東京都",
    areaLabel: "下北沢",
    shops: [
      {
        name: "Chicago 下北沢店",
        area: "下北沢 南口",
        address: "東京都世田谷区北沢2-25-8",
        tags: ["アメカジ", "USA古着", "ヴィンテージ"],
        rating: 4.6, reviewCount: 312,
        goodReviews: [
          { text: "USA古着のデニムは国内トップクラスの量。スタッフも詳しく年代判定もしてくれた。", date: "2024年11月" },
          { text: "値付けが良心的。シャツ類が特に安く、何度通っても新しい発見がある。", date: "2024年10月" }
        ],
        badReviews: [
          { text: "週末は混みすぎて試着室に30分待つことも。平日に行くのが正解。", date: "2024年12月" },
          { text: "人気商品はSNSに載る前に売れてしまう。入荷日を狙い撃ちするのがベター。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=Chicago+下北沢店",
        instagramUrl: "https://instagram.com/chicago_shimokitazawa"
      },
      {
        name: "SAFARI 下北沢",
        area: "下北沢 東口",
        address: "東京都世田谷区北沢2-14-2",
        tags: ["ミリタリー", "ワーク系", "アウトドア"],
        rating: 4.4, reviewCount: 201,
        goodReviews: [
          { text: "ミリタリーとワーク系に特化した品揃えが秀逸。M-65やCarharttの状態良品が豊富。", date: "2024年12月" },
          { text: "スタッフ全員がミリタリーに詳しく、年代や生産国まで教えてくれる。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "女性向けサイズが少ない。メンズ偏重の品揃え。", date: "2024年11月" },
          { text: "店内が狭くアウター類を広げて見るスペースが少ない。", date: "2024年10月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=SAFARI+下北沢"
      }
    ]
  },

  "渋谷": {
    prefecture: "東京都",
    areaLabel: "渋谷",
    shops: [
      {
        name: "RAGTAG 渋谷店",
        area: "渋谷 道玄坂",
        address: "東京都渋谷区道玄坂2-10-7",
        tags: ["セレクト古着", "デザイナーズ", "状態良好"],
        rating: 4.3, reviewCount: 198,
        goodReviews: [
          { text: "状態のいいものだけ揃えているので安心。クリーニング済みで届いてすぐ着られる。", date: "2024年12月" },
          { text: "真贋チェック済みなので偽物を掴む心配がない。ブランド品狙いの人に最適。", date: "2024年10月" }
        ],
        badReviews: [
          { text: "価格が高め。フリマで探せば同じものが半額以下で見つかることも。", date: "2024年11月" },
          { text: "ワーク・ストリート系が少なくハイブランド寄りの品揃えに偏っている。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=RAGTAG+渋谷店"
      },
      {
        name: "TRUNK 渋谷",
        area: "渋谷 神南",
        address: "東京都渋谷区神南1-12-5",
        tags: ["90sヴィンテージ", "スポーツ系", "Nike・Adidas"],
        rating: 4.5, reviewCount: 134,
        goodReviews: [
          { text: "90sのスポーツウェアに強い。NikeやAdidasのヴィンテージが豊富でスタッフも詳しい。", date: "2024年12月" },
          { text: "入荷情報をInstagramで随時発信してくれるので狙いのアイテムを逃しにくい。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "スポーツウェア以外のジャンルが少し弱い。デニムやニットを探すには物足りない。", date: "2024年10月" },
          { text: "人気アイテムは入荷当日に売り切れることがほとんど。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=TRUNK+渋谷+古着"
      }
    ]
  },

  "高円寺": {
    prefecture: "東京都",
    areaLabel: "高円寺",
    shops: [
      {
        name: "PUNK CAKE 高円寺",
        area: "高円寺 北口",
        address: "東京都杉並区高円寺北3-22-5",
        tags: ["古着の聖地", "ディープヴィンテージ", "マニア向け"],
        rating: 4.6, reviewCount: 178,
        goodReviews: [
          { text: "高円寺でも特にディープなセレクション。本当に良いものを知っているスタッフがいる。", date: "2024年12月" },
          { text: "ここでしか見つからないアイテムが多い。古着マニアなら絶対に外せない一軒。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "価格は高め。初心者が気軽に入れる雰囲気ではない。", date: "2024年11月" },
          { text: "在庫の回転が速く良いものは数日で売れてしまう。", date: "2024年10月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=高円寺+古着+ヴィンテージ"
      },
      {
        name: "コメ兵 高円寺店",
        area: "高円寺 南口",
        address: "東京都杉並区高円寺南4-27-17",
        tags: ["リユース総合", "ブランド古着", "状態良品"],
        rating: 4.0, reviewCount: 256,
        goodReviews: [
          { text: "ブランド品の買取・販売実績があり真贋に信頼がある。スタッフの対応も丁寧。", date: "2024年12月" },
          { text: "価格帯が幅広く、高級ブランドから普段使いまで一気に揃えられる。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "ヴィンテージ特有の味や希少感は少ない。コンディション重視の人向け。", date: "2024年10月" },
          { text: "週末は混雑してゆっくり選べない。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=コメ兵+高円寺"
      }
    ]
  },

  "原宿": {
    prefecture: "東京都",
    areaLabel: "原宿",
    shops: [
      {
        name: "Flamingo 原宿",
        area: "原宿 竹下通り近く",
        address: "東京都渋谷区神宮前6-28-6",
        tags: ["90sカジュアル", "カラフル", "低価格"],
        rating: 4.1, reviewCount: 267,
        goodReviews: [
          { text: "カラフルなアイテムが多くコーデのアクセントになるものを見つけやすい。値段も安い。", date: "2024年12月" },
          { text: "90sスポーツウェアの宝庫。NikeやAdidasのヴィンテージが充実している。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "状態の悪いものも混在している。一点一点丁寧に確認する必要がある。", date: "2024年10月" },
          { text: "ハンガーラックが密集していて見づらい。ゆっくり選びたい人には向かない。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=Flamingo+原宿"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 大阪
  // ──────────────────────────────────────────
  "梅田": {
    prefecture: "大阪府",
    areaLabel: "梅田",
    shops: [
      {
        name: "BIG TIME 梅田",
        area: "梅田 角田町",
        address: "大阪府大阪市北区角田町8-7",
        tags: ["ヴィンテージ", "高品質セレクト", "目利き系"],
        rating: 4.5, reviewCount: 156,
        goodReviews: [
          { text: "関西で1〜2を争うヴィンテージの品揃え。希少なアイテムが定期的に入荷する。", date: "2024年12月" },
          { text: "スタッフの知識が深く、タグの年代や相場感をすぐに教えてくれる。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "価格が高く初心者には敷居が高め。予算に余裕がある人向け。", date: "2024年11月" },
          { text: "在庫が少ないのでお目当てのサイズが見つからないことも多い。", date: "2024年10月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=BIG+TIME+梅田+古着"
      },
      {
        name: "BANANA BOAT 梅田",
        area: "梅田 茶屋町",
        address: "大阪府大阪市北区茶屋町3-16",
        tags: ["USA古着", "デニム", "スウェット", "大量在庫"],
        rating: 4.2, reviewCount: 189,
        goodReviews: [
          { text: "USA古着の量が多い。デニムだけで100本以上あることも。価格も良心的。", date: "2024年12月" },
          { text: "月に数回の大量入荷日があり、SNSで告知してくれる。入荷日に合わせて行くのが◎", date: "2024年11月" }
        ],
        badReviews: [
          { text: "洗濯されていない状態で並んでいることがある。クリーニング前提で購入を。", date: "2024年10月" },
          { text: "スタッフの知識にムラがある。詳しい人とそうでない人の差が大きい。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=BANANA+BOAT+梅田+大阪"
      }
    ]
  },

  "堀江": {
    prefecture: "大阪府",
    areaLabel: "堀江（大阪）",
    shops: [
      {
        name: "BINGO 堀江",
        area: "南堀江",
        address: "大阪府大阪市西区南堀江1-16-1",
        tags: ["ヴィンテージ", "超希少品", "完全セレクト"],
        rating: 4.7, reviewCount: 245,
        goodReviews: [
          { text: "オーナーのセレクトが素晴らしい。他では見つからない希少ヴィンテージが定期入荷。", date: "2024年12月" },
          { text: "古着に本当に詳しいスタッフが対応してくれる。タグの年代判定も丁寧。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "価格は高め。知識のある人向けで初心者には入りにくい雰囲気も。", date: "2024年10月" },
          { text: "在庫が少ない分、目当てのサイズが見つからないことも。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=BINGO+堀江+大阪"
      }
    ]
  },

  "中崎町": {
    prefecture: "大阪府",
    areaLabel: "中崎町",
    shops: [
      {
        name: "WASTED YOUTH 中崎町",
        area: "中崎町",
        address: "大阪府大阪市北区中崎西2-4-35",
        tags: ["ストリート", "セレクト", "隠れ家系"],
        rating: 4.5, reviewCount: 112,
        goodReviews: [
          { text: "中崎町の路地にある隠れ家的な一軒。ストリート系のセレクトが他と被らなくて好き。", date: "2024年12月" },
          { text: "オーナーのセンスが独特で毎回新鮮な発見がある。インスタをフォロー推奨。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "営業時間が不定期なのでSNSで確認してから行くことをおすすめ。", date: "2024年10月" },
          { text: "在庫が少なく、サイズの選択肢が限られる。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=中崎町+古着+大阪"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 福岡
  // ──────────────────────────────────────────
  "天神": {
    prefecture: "福岡県",
    areaLabel: "天神",
    shops: [
      {
        name: "DEPT 天神",
        area: "天神 大名エリア",
        address: "福岡県福岡市中央区大名2-6-18",
        tags: ["セレクト古着", "アメカジ", "九州最大級"],
        rating: 4.5, reviewCount: 167,
        goodReviews: [
          { text: "九州でここまで本格的なアメカジ古着を揃えているショップは他にない。品質が高い。", date: "2024年12月" },
          { text: "定期的にセールがあり、タイミングが合えばかなりお得に買える。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "価格帯が高めなので予算を決めてから行くことをおすすめ。", date: "2024年11月" },
          { text: "人気商品はすぐ売り切れる。入荷情報をこまめにチェックする必要がある。", date: "2024年10月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=DEPT+天神+福岡+古着"
      },
      {
        name: "KINJI 福岡天神店",
        area: "天神 西通り",
        address: "福岡県福岡市中央区天神2-11-3",
        tags: ["低価格帯", "量販", "初心者向け"],
        rating: 4.3, reviewCount: 203,
        goodReviews: [
          { text: "値段が安く古着を始めたい人に最初に行ってほしい場所。接客もゆるくて入りやすい。", date: "2024年12月" },
          { text: "アクセスが良く買い物ついでに寄れる。量が多いので何度行っても飽きない。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "状態のバラつきが大きい。綺麗なものも汚れたものも同じ値段で並んでいる。", date: "2024年10月" },
          { text: "希少品・ヴィンテージ目的には向かない。大量の服の中から掘り出す感じ。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=KINJI+天神+福岡"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 愛知
  // ──────────────────────────────────────────
  "大須": {
    prefecture: "愛知県",
    areaLabel: "大須（名古屋）",
    shops: [
      {
        name: "AMORE 大須",
        area: "大須 万松寺通り",
        address: "愛知県名古屋市中区大須3-30-59",
        tags: ["アメカジ", "ワーク系", "中部最大級"],
        rating: 4.4, reviewCount: 156,
        goodReviews: [
          { text: "中部エリアでは断トツの品揃え。上京しなくてもここで大体揃う。", date: "2024年12月" },
          { text: "定期的にセールをやっており、タイミングが合えばかなりお得。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "駐車場がなく週末は大須商店街自体が混雑する。電車で行くのが無難。", date: "2024年10月" },
          { text: "人気商品はすぐに売り切れる。ウォッチリストに入れても間に合わないことも。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=大須+古着+名古屋"
      },
      {
        name: "FLAMINGO 大須店",
        area: "大須 仁王門通り",
        address: "愛知県名古屋市中区大須3-27-20",
        tags: ["低価格", "カジュアル", "量が多い"],
        rating: 4.0, reviewCount: 198,
        goodReviews: [
          { text: "値段が安く量も多い。大須の中でも掘り出し物を探す楽しさがある。", date: "2024年12月" },
          { text: "観光ついでに立ち寄れる立地で、初めての古着探しにちょうどいい。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "ヴィンテージや希少品は期待しないほうがいい。量販系の品揃え。", date: "2024年10月" },
          { text: "整理されていないことが多く目当てのものを探すのに時間がかかる。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=FLAMINGO+大須+名古屋"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 北海道
  // ──────────────────────────────────────────
  "すすきの": {
    prefecture: "北海道",
    areaLabel: "すすきの（札幌）",
    shops: [
      {
        name: "JUMBLE STORE 札幌",
        area: "すすきの 南4条",
        address: "北海道札幌市中央区南4条西4丁目",
        tags: ["USA直輸入", "ヴィンテージ", "北海道最大級"],
        rating: 4.5, reviewCount: 134,
        goodReviews: [
          { text: "USA直輸入品が多く本州のショップより価格が安い傾向。量も豊富。", date: "2024年12月" },
          { text: "全員詳しいスタッフと相談しながら選べる雰囲気がいい。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "夜は立地的に少し行きにくい。日中に行くのがおすすめ。", date: "2024年10月" },
          { text: "サイズ展開が男性向けに偏っている。女性サイズは少なめ。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=JUMBLE+STORE+札幌"
      }
    ]
  },

  "札幌": {
    prefecture: "北海道",
    areaLabel: "札幌",
    shops: [
      {
        name: "CHICAGO 札幌店",
        area: "札幌 狸小路",
        address: "北海道札幌市中央区南2条西5丁目",
        tags: ["USA古着", "アメカジ", "狸小路"],
        rating: 4.3, reviewCount: 145,
        goodReviews: [
          { text: "狸小路の中でも品揃えが良く、観光ついでに立ち寄れる立地が嬉しい。", date: "2024年12月" },
          { text: "値段が良心的で量も多い。札幌で古着を探すならまずここ。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "観光客も多く週末は混雑する。ゆっくり見たいなら平日推奨。", date: "2024年10月" },
          { text: "ヴィンテージ専門というよりは量販寄り。希少品は少なめ。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=CHICAGO+札幌+古着"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 宮城
  // ──────────────────────────────────────────
  "仙台": {
    prefecture: "宮城県",
    areaLabel: "仙台",
    shops: [
      {
        name: "BRING 仙台店",
        area: "仙台 一番町",
        address: "宮城県仙台市青葉区一番町3-6-1",
        tags: ["USA古着", "東北最大級", "幅広いジャンル"],
        rating: 4.4, reviewCount: 189,
        goodReviews: [
          { text: "東北でここまで品揃えが豊富なショップは他にない。デニムからアウターまで何でも揃う。", date: "2024年12月" },
          { text: "定期的に大量入荷があり、行くたびに新しい発見がある。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "人気商品は入荷後すぐ売れてしまう。入荷情報をSNSでチェックする習慣が必要。", date: "2024年10月" },
          { text: "駐車場がないので車で行く場合はコインパーキングを事前に調べておくべき。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=仙台+古着屋+一番町"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 京都
  // ──────────────────────────────────────────
  "京都": {
    prefecture: "京都府",
    areaLabel: "京都",
    shops: [
      {
        name: "RAGTAG 京都店",
        area: "京都 河原町",
        address: "京都府京都市中京区河原町通四条上ル",
        tags: ["セレクト古着", "デザイナーズ", "状態良好"],
        rating: 4.2, reviewCount: 167,
        goodReviews: [
          { text: "京都の中でも状態のいいものを揃えている。観光ついでに立ち寄れる立地も◎", date: "2024年12月" },
          { text: "ブランド品の真贋チェック体制が整っていて安心して買える。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "価格は高め。観光地価格という感じがしなくもない。", date: "2024年10月" },
          { text: "ストリートやワーク系が少ない。ハイブランド寄りの品揃え。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=RAGTAG+京都+河原町"
      },
      {
        name: "古着屋 KiKi 京都",
        area: "京都 今出川",
        address: "京都府京都市上京区今出川通り付近",
        tags: ["昭和レトロ", "和洋ミックス", "個性派"],
        rating: 4.5, reviewCount: 98,
        goodReviews: [
          { text: "京都らしい和洋ミックスのセレクションが独特。昭和〜70sのアイテムが充実。", date: "2024年12月" },
          { text: "オーナーのこだわりが強く他のショップには絶対にないようなアイテムがある。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "営業時間が不規則。訪問前に必ずSNSで確認を。", date: "2024年10月" },
          { text: "在庫が少なくサイズの選択肢が限られる。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=京都+古着屋+今出川"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 神奈川
  // ──────────────────────────────────────────
  "横浜": {
    prefecture: "神奈川県",
    areaLabel: "横浜",
    shops: [
      {
        name: "JUMBLE STORE 横浜",
        area: "横浜 関内",
        address: "神奈川県横浜市中区相生町2-52",
        tags: ["USA古着", "アメカジ", "横浜最大級"],
        rating: 4.4, reviewCount: 212,
        goodReviews: [
          { text: "横浜で本格的なUSA古着を探すならここ一択。品質と量のバランスが最高。", date: "2024年12月" },
          { text: "スタッフが親切で初心者でも相談しやすい雰囲気がある。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "関内駅からすこし歩く。地図を確認してから行くことをおすすめ。", date: "2024年10月" },
          { text: "人気商品は入荷当日に売れてしまうことが多い。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=JUMBLE+STORE+横浜"
      }
    ]
  },

  // ──────────────────────────────────────────
  // 広島
  // ──────────────────────────────────────────
  "広島": {
    prefecture: "広島県",
    areaLabel: "広島",
    shops: [
      {
        name: "CHICAGO 広島店",
        area: "広島 本通り",
        address: "広島県広島市中区本通8-30",
        tags: ["USA古着", "アメカジ", "中四国最大級"],
        rating: 4.3, reviewCount: 145,
        goodReviews: [
          { text: "中四国エリアでは断トツの品揃え。広島市内でここまで揃うとは思わなかった。", date: "2024年12月" },
          { text: "値段が良心的で量も多い。本通り商店街のついでに寄れる立地も便利。", date: "2024年11月" }
        ],
        badReviews: [
          { text: "東京や大阪と比べるとヴィンテージの希少品は少なめ。", date: "2024年10月" },
          { text: "週末は混雑して試着室が並ぶことがある。", date: "2024年9月" }
        ],
        googleMapUrl: "https://maps.google.com/?q=広島+古着屋+本通り"
      }
    ]
  },

};

// エリア名から検索するヘルパー関数
export function searchShops(query: string): { areaKey: string; data: AreaData } | null {
  const q = query.trim();
  // 完全一致
  if (SHOP_DATA[q]) return { areaKey: q, data: SHOP_DATA[q] };
  // 部分一致
  const key = Object.keys(SHOP_DATA).find(k => q.includes(k) || k.includes(q));
  if (key) return { areaKey: key, data: SHOP_DATA[key] };
  return null;
}

// Googleマップ検索URLを生成（APIなしで使える）
export function buildGoogleMapSearchUrl(area: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(area + ' 古着屋')}`;
}
