import { NextRequest, NextResponse } from "next/server";
import { searchRakuten } from "@/lib/rakuten";

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword")?.trim();
  if (!keyword) {
    return NextResponse.json({ error: "keyword required" }, { status: 400 });
  }
  try {
    const items = await searchRakuten(keyword);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
