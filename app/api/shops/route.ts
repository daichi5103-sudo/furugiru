import { NextRequest, NextResponse } from "next/server";

// ─── 型定義 ───────────────────────────────────────────
export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  reviewCount: number | null;
  location: { lat: number; lng: number };
  googleMapUrl: string;
  openNow: boolean | null;
  photos: string[];   // Photo reference URLs（最大2枚）
  reviews: {
    text: string;
    rating: number;
    authorName: string;
    time: number;
  }[];
}

// ─── サーバーサイドキャッシュ（同一エリアはAPIを叩かない）──
// Next.jsのedge環境ではMapはリクエスト間で保持されないが、
// Node.js runtime（デフォルト）ならプロセス生存中は有効
const cache = new Map<string, { data: PlaceResult[]; cachedAt: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1時間

function getCached(key: string): PlaceResult[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: PlaceResult[]) {
  cache.set(key, { data, cachedAt: Date.now() });
}

// ─── Google Places API 呼び出し ────────────────────────
async function fetchFromGooglePlaces(query: string): Promise<PlaceResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY が設定されていません");

  // Step 1: Text Search でplace_idと基本情報を取得
  const searchQuery = `${query} 古着屋`;
  const textSearchUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/textsearch/json"
  );
  textSearchUrl.searchParams.set("query", searchQuery);
  textSearchUrl.searchParams.set("language", "ja");
  textSearchUrl.searchParams.set("type", "clothing_store");
  textSearchUrl.searchParams.set("key", apiKey);

  const searchRes = await fetch(textSearchUrl.toString(), {
    next: { revalidate: 3600 }, // Next.js fetch cache（1時間）
  });

  if (!searchRes.ok) {
    throw new Error(`Places Text Search failed: ${searchRes.status}`);
  }

  const searchData = await searchRes.json();

  if (searchData.status !== "OK" && searchData.status !== "ZERO_RESULTS") {
    throw new Error(`Places API error: ${searchData.status}`);
  }

  if (!searchData.results?.length) return [];

  // Step 2: 上位5件のPlace Detailsを並列取得（reviewsを含む）
  const top5 = searchData.results.slice(0, 5);

  const detailPromises = top5.map(async (place: any) => {
    const detailUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    detailUrl.searchParams.set("place_id", place.place_id);
    detailUrl.searchParams.set(
      "fields",
      "place_id,name,formatted_address,rating,user_ratings_total,geometry,opening_hours,photos,reviews,url"
    );
    detailUrl.searchParams.set("language", "ja");
    detailUrl.searchParams.set("key", apiKey);

    const detailRes = await fetch(detailUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!detailRes.ok) return null;
    const detailData = await detailRes.json();
    if (detailData.status !== "OK") return null;

    const r = detailData.result;

    // レビューを良い・悪いに分類（stars 4-5 = good, 1-2 = bad, 3 = skip）
    const allReviews: PlaceResult["reviews"] = (r.reviews || []).map(
      (rv: any) => ({
        text: rv.text || "",
        rating: rv.rating,
        authorName: rv.author_name || "",
        time: rv.time || 0,
      })
    );

    // photo referencesをURLに変換（最大2枚）
    const photos = (r.photos || []).slice(0, 2).map(
      (p: any) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${p.photo_reference}&key=${apiKey}`
    );

    return {
      placeId: r.place_id,
      name: r.name,
      address: r.formatted_address || "",
      rating: r.rating ?? null,
      reviewCount: r.user_ratings_total ?? null,
      location: {
        lat: r.geometry?.location?.lat ?? 0,
        lng: r.geometry?.location?.lng ?? 0,
      },
      googleMapUrl: r.url || `https://maps.google.com/?place_id=${r.place_id}`,
      openNow: r.opening_hours?.open_now ?? null,
      photos,
      reviews: allReviews,
    } as PlaceResult;
  });

  const details = await Promise.all(detailPromises);
  return details.filter((d): d is PlaceResult => d !== null);
}

// ─── API Route Handler ─────────────────────────────────
export async function GET(req: NextRequest) {
  const area = req.nextUrl.searchParams.get("area")?.trim();

  if (!area) {
    return NextResponse.json(
      { error: "area パラメータが必要です" },
      { status: 400 }
    );
  }

  // キャッシュチェック
  const cacheKey = area.toLowerCase();
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(
      { shops: cached, fromCache: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  }

  // APIキー未設定のときはモックデータを返す
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    const mock = getMockData(area);
    return NextResponse.json({ shops: mock, fromCache: false, isMock: true });
  }

  try {
    const shops = await fetchFromGooglePlaces(area);
    setCache(cacheKey, shops);
    return NextResponse.json(
      { shops, fromCache: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (err) {
    console.error("Places API error:", err);
    // エラー時はモックデータにフォールバック
    const mock = getMockData(area);
    return NextResponse.json(
      { shops: mock, fromCache: false, isMock: true, error: String(err) },
      { status: 200 }
    );
  }
}

// ─── APIキー未設定時のモックデータ ────────────────────
function getMockData(area: string): PlaceResult[] {
  return [
    {
      placeId: "mock_1",
      name: `${area}の古着屋（サンプル）`,
      address: `${area}付近`,
      rating: 4.2,
      reviewCount: 120,
      location: { lat: 35.68, lng: 139.69 },
      googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(area + " 古着屋")}`,
      openNow: null,
      photos: [],
      reviews: [
        { text: "品揃えが豊富で値段も手頃。週末は混雑するので平日がおすすめ。", rating: 4, authorName: "サンプルユーザー", time: Date.now() / 1000 },
        { text: "スタッフが親切で初心者でも相談しやすい雰囲気。", rating: 5, authorName: "サンプルユーザー2", time: Date.now() / 1000 },
        { text: "人気商品はすぐ売り切れる。入荷情報をSNSでチェックしておくといい。", rating: 3, authorName: "サンプルユーザー3", time: Date.now() / 1000 },
      ],
    },
  ];
}
