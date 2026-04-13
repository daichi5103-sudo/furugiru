export interface Market {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  accentColor: string;
  bgColor: string;
  searchUrl: (q: string) => string;
}

export const MARKETS: Market[] = [
  {
    id: "mercari",
    name: "メルカリ",
    shortName: "M",
    tagline: "国内最大のフリマアプリ",
    accentColor: "#E84033",
    bgColor: "#FFF0EE",
    searchUrl: (q) =>
      `https://jp.mercari.com/search?keyword=${encodeURIComponent(q)}&status=on_sale`,
  },
  {
    id: "rakuma",
    name: "ラクマ",
    shortName: "R",
    tagline: "楽天グループ公式フリマ",
    accentColor: "#009AB5",
    bgColor: "#E8F7FB",
    searchUrl: (q) => `https://fril.jp/s?search%5Bkeyword%5D=${encodeURIComponent(q)}`,
  },
  {
    id: "yahoo",
    name: "ヤフオク",
    shortName: "Y",
    tagline: "オークション・即決あり",
    accentColor: "#CC0033",
    bgColor: "#FFF0F3",
    searchUrl: (q) =>
      `https://auctions.yahoo.co.jp/search/search?p=${encodeURIComponent(q)}&va=${encodeURIComponent(q)}&istatus=1`,
  },
];

export const TRENDING = [
  "Levi's 501",
  "Champion リバースウィーブ",
  "POLO Ralph Lauren",
  "Supreme Box Logo",
  "Carhartt WIP",
  "90s Nike スウェット",
  "Vintage Levi's Gジャン",
  "Stone Island",
];
