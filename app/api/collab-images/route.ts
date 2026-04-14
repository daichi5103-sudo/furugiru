import { NextRequest, NextResponse } from "next/server";

// 複数コラボの画像を一括取得するエンドポイント
export async function GET(req: NextRequest) {
  const keywords = req.nextUrl.searchParams.get("keywords");
  if (!keywords) return NextResponse.json({});

  const appId = process.env.RAKUTEN_APP_ID;
  if (!appId || appId === "your_rakuten_app_id_here") {
    return NextResponse.json({});
  }

  const kwList = keywords.split(",").slice(0, 20); // 最大20件

  const results = await Promise.allSettled(
    kwList.map(async (kw) => {
      const params = new URLSearchParams({
        applicationId: appId,
        keyword: kw.trim(),
        hits: "1",
        imageFlag: "1",
      });
      const res = await fetch(
        `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params}`,
        { next: { revalidate: 86400 } } // 24時間キャッシュ
      );
      const data = await res.json();
      const imageUrl = data.Items?.[0]?.Item?.mediumImageUrls?.[0]?.imageUrl ?? null;
      return { kw: kw.trim(), imageUrl };
    })
  );

  const imageMap: Record<string, string | null> = {};
  results.forEach((r) => {
    if (r.status === "fulfilled") {
      imageMap[r.value.kw] = r.value.imageUrl;
    }
  });

  return NextResponse.json(imageMap, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
  });
}
