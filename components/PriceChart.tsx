"use client";
import { PricePoint, BuyIndex } from "@/lib/priceHistory";

type Props = {
  data: PricePoint[];
  buyIndex: BuyIndex;
};

export default function PriceChart({ data, buyIndex }: Props) {
  if (data.length === 0) return null;
  const W = 420;
  const H = 140;
  const PAD_L = 40;
  const PAD_R = 12;
  const PAD_T = 12;
  const PAD_B = 22;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const prices = data.map((d) => d.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const rangeP = Math.max(1, maxP - minP);

  const x = (i: number) => PAD_L + (i / Math.max(1, data.length - 1)) * chartW;
  const y = (p: number) => PAD_T + chartH - ((p - minP) / rangeP) * chartH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.price)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length - 1)} ${PAD_T + chartH} L ${x(0)} ${PAD_T + chartH} Z`;

  const yTicks = [minP, Math.round((minP + maxP) / 2), maxP];

  return (
    <div style={{ marginBottom: 16, border: "1px solid rgba(184,151,74,.12)", padding: "12px", background: "rgba(255,255,255,.02)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <p style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6E85" }}>Price History</p>
        <span style={{
          fontSize: 9, letterSpacing: "0.08em", padding: "2px 8px",
          border: `1px solid ${buyIndex.color}`, color: buyIndex.color,
          background: "rgba(14,27,46,.8)",
        }}>{buyIndex.label}</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <defs>
          <linearGradient id="pcg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8974A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#B8974A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y軸目盛り */}
        {yTicks.map((p, i) => (
          <g key={i}>
            <line x1={PAD_L} x2={W - PAD_R} y1={y(p)} y2={y(p)} stroke="rgba(184,151,74,.08)" strokeDasharray="2 2" />
            <text x={PAD_L - 6} y={y(p) + 3} textAnchor="end" fontSize="8" fill="#5A6E85" fontFamily="Helvetica">
              ¥{(p / 10000).toFixed(p >= 100000 ? 0 : 1)}万
            </text>
          </g>
        ))}

        {/* 面 */}
        <path d={areaPath} fill="url(#pcg)" />
        {/* 線 */}
        <path d={linePath} fill="none" stroke="#B8974A" strokeWidth="1.8" />

        {/* ドット & X軸ラベル */}
        {data.map((d, i) => {
          const showLabel = i === 0 || i === data.length - 1 || i === Math.floor((data.length - 1) / 2);
          return (
            <g key={d.year}>
              <circle cx={x(i)} cy={y(d.price)} r={i === data.length - 1 ? 3 : 1.8} fill="#B8974A" />
              {showLabel && (
                <text x={x(i)} y={H - 6} textAnchor="middle" fontSize="8" fill="#5A6E85" fontFamily="Helvetica">
                  {d.year}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p style={{ fontSize: 10, color: "rgba(245,240,232,.45)", lineHeight: 1.5, marginTop: 4 }}>
        {buyIndex.hint} <span style={{ color: "rgba(245,240,232,.3)" }}>※推定値</span>
      </p>
    </div>
  );
}
