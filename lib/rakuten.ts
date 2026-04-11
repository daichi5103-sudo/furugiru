export interface RakutenItem {
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  mediumImageUrls: { imageUrl: string }[];
  shopName: string;
  reviewAverage: number;
  reviewCount: number;
}

export async function searchRakuten(keyword: string): Promise<RakutenItem[]> {
  const appId = process.env.RAKUTEN_APP_ID;

  if (!appId || appId === "your_rakuten_app_id_here") {
    return mockData(keyword);
  }

  const params = new URLSearchParams({
    applicationId: appId,
    keyword,
    hits: "6",
    sort: "-reviewCount",
    imageFlag: "1",
  });

  try {
    const res = await fetch(
      `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return (data.Items ?? []).map((i: { Item: RakutenItem }) => i.Item);
  } catch {
    return mockData(keyword);
  }
}

function mockData(keyword: string): RakutenItem[] {
  return [
    {
      itemName: `【新品】${keyword} 定番モデル レギュラーフィット`,
      itemPrice: 12800,
      itemUrl: `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`,
      mediumImageUrls: [],
      shopName: "ファッションストア公式",
      reviewAverage: 4.2,
      reviewCount: 128,
    },
    {
      itemName: `${keyword} オリジナル 正規品 送料無料`,
      itemPrice: 18500,
      itemUrl: `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`,
      mediumImageUrls: [],
      shopName: "セレクトショップ DEPOT",
      reviewAverage: 4.7,
      reviewCount: 89,
    },
    {
      itemName: `${keyword} ヘビーウェイト 人気カラー 全3色`,
      itemPrice: 9800,
      itemUrl: `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`,
      mediumImageUrls: [],
      shopName: "ビンテージマーケット",
      reviewAverage: 3.9,
      reviewCount: 45,
    },
  ];
}
