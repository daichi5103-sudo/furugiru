// 発売年→現在までの相場推移を生成（擬似データ）
// orig → market へのカーブを希少度に応じて変化させる

export type Rarity = "common" | "uncommon" | "rare" | "very_rare";
export type PricePoint = { year: number; price: number };

export function generatePriceHistory(
  releaseYear: number,
  orig: number,
  market: number,
  rarity: Rarity,
  currentYear = 2026,
): PricePoint[] {
  const years = Math.max(1, currentYear - releaseYear);
  const points: PricePoint[] = [];

  // 希少度に応じた曲率：rareほど指数的上昇
  const curvature = { common: 1.0, uncommon: 1.3, rare: 1.8, very_rare: 2.5 }[rarity];

  for (let i = 0; i <= years; i++) {
    const t = i / years; // 0〜1
    // イージング（希少度が高いほど後半で急上昇）
    const eased = Math.pow(t, 1 / curvature);
    const price = Math.round(orig + (market - orig) * eased);
    points.push({ year: releaseYear + i, price });
  }
  return points;
}

export type BuyIndex = {
  label: string;
  color: string;
  hint: string;
};

export function getBuyIndex(history: PricePoint[]): BuyIndex {
  if (history.length < 2) return { label: "→ データ不足", color: "#5A6E85", hint: "相場データが不十分です" };
  const last = history[history.length - 1].price;
  const prev = history[history.length - 2].price;
  const diff = (last - prev) / prev;
  if (diff > 0.08) return { label: "⚠ 上昇中", color: "#DC2626", hint: "直近で値上がり傾向。様子見推奨。" };
  if (diff < -0.05) return { label: "✓ 買い時", color: "#3A8A5A", hint: "相場が下落中。狙い目です。" };
  return { label: "→ 安定", color: "#B8974A", hint: "相場は横ばい。適正価格帯です。" };
}
