// Supabase クライアント
// 環境変数に SUPABASE_URL / SUPABASE_ANON_KEY が必要

export interface LotteryEvent {
  id: string;
  title: string;
  brands: string;        // 例: "Nike × Supreme"
  date: string;          // ISO8601 "2026-04-20"
  end_date?: string;     // 抽選期間がある場合
  url: string;           // 公式or購入リンク
  price: number;         // 定価
  type: "lottery" | "fcfs" | "release"; // 抽選 / 先着 / 一般発売
  status: "upcoming" | "open" | "closed";
  image_url?: string;
  note?: string;
}

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  !!SUPABASE_URL && !!SUPABASE_ANON &&
  SUPABASE_URL !== "your_supabase_url_here" &&
  SUPABASE_ANON !== "your_supabase_anon_key_here";

export async function fetchLotteryEvents(): Promise<LotteryEvent[]> {
  if (!isSupabaseConfigured) return mockEvents();

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/lottery_events?order=date.asc&status=neq.closed`,
      {
        headers: {
          apikey: SUPABASE_ANON!,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return mockEvents();
    return await res.json();
  } catch {
    return mockEvents();
  }
}

function mockEvents(): LotteryEvent[] {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const add = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return fmt(d);
  };
  return [
    { id: "1", title: "Air Jordan 1 Retro High OG", brands: "Nike", date: add(3), url: "https://www.nike.com/jp/", price: 17600, type: "lottery", status: "upcoming", note: "NIKEアプリ限定抽選" },
    { id: "2", title: "Box Logo Hoodie SS26", brands: "Supreme", date: add(5), end_date: add(7), url: "https://www.supremenewyork.com/", price: 38500, type: "lottery", status: "upcoming", note: "Supreme公式サイトにて" },
    { id: "3", title: "NB 2002R コラボ", brands: "New Balance × Aime Leon Dore", date: add(10), url: "https://www.newbalance.co.jp/", price: 22000, type: "fcfs", status: "upcoming", note: "ALD直営店・オンライン同時発売" },
    { id: "4", title: "Adidas Samba Wales Bonner", brands: "Adidas × Wales Bonner", date: add(0), url: "https://www.adidas.co.jp/", price: 24200, type: "lottery", status: "open", note: "本日締め切り！" },
    { id: "5", title: "Carhartt WIP SS26 Drop", brands: "Carhartt WIP", date: add(14), url: "https://www.carhartt-wip.com/ja/", price: 0, type: "release", status: "upcoming", note: "通常コレクション一般発売" },
  ];
}
