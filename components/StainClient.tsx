"use client";
import { useState } from "react";
import { StainType } from "@/lib/stain";

const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const MUTED = "#5A6E85";
const NAVY2 = "#162540";

const URGENCY_CONFIG = {
  immediate: { label: "今すぐ対処", color: "#DC2626", bg: "rgba(220,38,38,.08)" },
  soon:      { label: "なるべく早く", color: "#D97706", bg: "rgba(217,119,6,.08)" },
  normal:    { label: "通常対処でOK", color: "#3A8A5A", bg: "rgba(58,138,90,.08)" },
};

const PRICE_CONFIG = {
  1: { label: "お手軽品", sublabel: "〜500円前後", color: "#3A8A5A", bg: "rgba(58,138,90,.08)" },
  2: { label: "中級品",   sublabel: "500〜2,000円", color: "#D97706", bg: "rgba(217,119,6,.08)" },
  3: { label: "専用品",   sublabel: "2,000円〜",    color: "#B8974A", bg: "rgba(184,151,74,.08)" },
};

function SuccessBar({ rate }: { rate: number }) {
  const color = rate >= 80 ? "#3A8A5A" : rate >= 60 ? "#D97706" : "#DC2626";
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, fontFamily: "'Helvetica Neue', sans-serif" }}>
          完全除去できる目安
        </span>
        <span style={{ fontSize: 18, color, fontFamily: "Georgia, serif" }}>{rate}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,.08)", borderRadius: 0 }}>
        <div style={{ height: "100%", width: `${rate}%`, background: color, transition: "width .6s ease" }} />
      </div>
      <p style={{ fontSize: 10, color: "rgba(245,240,232,.3)", marginTop: 4, fontFamily: "'Helvetica Neue', sans-serif" }}>
        ※素材・シミの古さにより大きく異なります
      </p>
    </div>
  );
}

export default function StainClient({ stains }: { stains: StainType[] }) {
  const [activeStain, setActiveStain] = useState(stains[0].id);
  const [activeStep, setActiveStep]   = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<1 | 2 | 3 | null>(null);
  const [activeSection, setActiveSection] = useState<"steps" | "products" | "fabric">("steps");

  const stain = stains.find((s) => s.id === activeStain)!;
  const urg   = URGENCY_CONFIG[stain.urgency];
  const filteredProducts = priceFilter
    ? stain.products.filter((p) => p.priceLevel === priceFilter)
    : stain.products;

  return (
    <div>
      {/* Stain type selector */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 12, fontFamily: "'Helvetica Neue', sans-serif" }}>
          シミの種類を選んでください
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
          {stains.map((s) => {
            const u = URGENCY_CONFIG[s.urgency];
            const isOn = activeStain === s.id;
            return (
              <button
                key={s.id}
                onClick={() => { setActiveStain(s.id); setActiveStep(null); setActiveSection("steps"); setPriceFilter(null); }}
                style={{
                  border: `1px solid ${isOn ? s.color : "rgba(184,151,74,.15)"}`,
                  background: isOn ? `rgba(${hexRgb(s.color)}, .08)` : "rgba(255,255,255,.02)",
                  padding: "12px 8px", cursor: "pointer", transition: "all .2s", textAlign: "center",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: isOn ? `rgba(${hexRgb(s.color)}, .2)` : "rgba(255,255,255,.05)",
                  border: `1px solid rgba(${hexRgb(s.color)}, .4)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 8px", fontSize: 11, color: s.color, fontFamily: "Georgia, serif", fontWeight: 700,
                }}>
                  {s.name[0]}
                </div>
                <div style={{ fontSize: 11, color: isOn ? CREAM : "rgba(245,240,232,.5)", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.3 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 8, color: u.color, marginTop: 4, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {u.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stain info header */}
      <div style={{
        border: `1px solid rgba(${hexRgb(stain.color)}, .3)`,
        background: `rgba(${hexRgb(stain.color)}, .04)`,
        padding: "18px 20px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 4 }}>
              {stain.name}のシミ
            </h2>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px",
              background: urg.bg, border: `1px solid rgba(${hexRgb(urg.color)}, .3)`,
              fontSize: 10, color: urg.color, letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "'Helvetica Neue', sans-serif",
            }}>
              {urg.label}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.65)", lineHeight: 1.8, fontFamily: "'Helvetica Neue', sans-serif" }}>
          {stain.intro}
        </p>
      </div>

      {/* Do first */}
      <div style={{ border: "1px solid rgba(220,38,38,.25)", background: "rgba(220,38,38,.06)", padding: "14px 18px", marginBottom: 20 }}>
        <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#DC2626", marginBottom: 10, fontFamily: "'Helvetica Neue', sans-serif" }}>
          まず最初にやること（応急処置）
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {stain.doFirst.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span style={{ fontSize: 13, color: "rgba(245,240,232,.75)", lineHeight: 1.5, fontFamily: "'Helvetica Neue', sans-serif" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Success rate */}
      <SuccessBar rate={stain.successRate} />

      {/* Section tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(184,151,74,.12)", marginBottom: 20 }}>
        {([
          { id: "steps",    label: "落とし方の手順" },
          { id: "products", label: "おすすめ商品" },
          { id: "fabric",   label: "素材別の注意点" },
        ] as const).map((s) => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            padding: "9px 16px", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
            color: activeSection === s.id ? GOLD : MUTED,
            borderBottom: `2px solid ${activeSection === s.id ? GOLD : "transparent"}`,
            marginBottom: -1, background: "none", border: "none",
            borderBottom: `2px solid ${activeSection === s.id ? GOLD : "transparent"}`,
            cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", transition: "color .15s", whiteSpace: "nowrap",
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Steps */}
      {activeSection === "steps" && (
        <div>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 14, fontFamily: "'Helvetica Neue', sans-serif" }}>
            各ステップをタップすると詳細が表示されます
          </p>
          {stain.steps.map((step) => {
            const isOn = activeStep === step.stepNum;
            return (
              <div key={step.stepNum}
                onClick={() => setActiveStep(isOn ? null : step.stepNum)}
                style={{
                  border: `1px solid ${isOn ? stain.color : "rgba(184,151,74,.15)"}`,
                  background: isOn ? `rgba(${hexRgb(stain.color)}, .05)` : "rgba(255,255,255,.02)",
                  marginBottom: 8, cursor: "pointer", transition: "all .2s",
                }}
              >
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, border: `1px solid ${isOn ? stain.color : "rgba(184,151,74,.3)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontFamily: "Georgia, serif", fontSize: 14,
                    color: isOn ? stain.color : MUTED,
                    background: isOn ? `rgba(${hexRgb(stain.color)}, .1)` : "transparent",
                  }}>
                    {String(step.stepNum).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1, fontSize: 14, color: isOn ? CREAM : "rgba(245,240,232,.75)", fontFamily: "'Helvetica Neue', sans-serif" }}>
                    {step.title}
                  </div>
                  <div style={{ color: MUTED, transition: "transform .2s", transform: isOn ? "rotate(180deg)" : "none" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                {isOn && (
                  <div style={{ borderTop: "1px solid rgba(184,151,74,.12)", padding: "14px 16px 16px" }}>
                    <p style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.8, marginBottom: 12, fontFamily: "'Helvetica Neue', sans-serif" }}>
                      {step.detail}
                    </p>
                    {step.tip && (
                      <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "rgba(58,138,90,.08)", borderLeft: "2px solid rgba(58,138,90,.5)", marginBottom: 8 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A8A5A" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <div>
                          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3A8A5A", marginBottom: 2, fontFamily: "'Helvetica Neue', sans-serif" }}>ポイント</div>
                          <p style={{ fontSize: 12, color: "rgba(245,240,232,.65)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>{step.tip}</p>
                        </div>
                      </div>
                    )}
                    {step.warning && (
                      <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "rgba(220,38,38,.08)", borderLeft: "2px solid rgba(220,38,38,.5)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <div>
                          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#DC2626", marginBottom: 2, fontFamily: "'Helvetica Neue', sans-serif" }}>注意</div>
                          <p style={{ fontSize: 12, color: "rgba(245,240,232,.65)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>{step.warning}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Warnings */}
          <div style={{ border: "1px solid rgba(220,38,38,.2)", padding: "14px 18px", marginTop: 16, background: "rgba(220,38,38,.04)" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#DC2626", marginBottom: 10, fontFamily: "'Helvetica Neue', sans-serif" }}>
              やってはいけないこと
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stain.warnings.map((w, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span style={{ fontSize: 13, color: "rgba(245,240,232,.65)", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.5 }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      {activeSection === "products" && (
        <div>
          {/* Price filter */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <button onClick={() => setPriceFilter(null)} style={{
              padding: "6px 14px", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
              border: `1px solid ${priceFilter === null ? GOLD : "rgba(255,255,255,.1)"}`,
              color: priceFilter === null ? GOLD : MUTED, background: "transparent",
              cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", transition: "all .15s",
            }}>すべて</button>
            {([1, 2, 3] as const).map((level) => {
              const pc = PRICE_CONFIG[level];
              return (
                <button key={level} onClick={() => setPriceFilter(priceFilter === level ? null : level)} style={{
                  padding: "6px 14px", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                  border: `1px solid ${priceFilter === level ? pc.color : "rgba(255,255,255,.1)"}`,
                  color: priceFilter === level ? pc.color : MUTED, background: priceFilter === level ? pc.bg : "transparent",
                  cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", transition: "all .15s",
                }}>
                  {pc.label} <span style={{ fontSize: 9, opacity: .7 }}>{pc.sublabel}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredProducts.map((p, i) => {
              const pc = PRICE_CONFIG[p.priceLevel as 1 | 2 | 3];
              const rakutenUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(p.rakutenQuery)}/`;
              return (
                <div key={i} style={{ border: "1px solid rgba(184,151,74,.15)", background: "rgba(255,255,255,.02)", overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, borderLeft: `3px solid ${pc.color}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, color: CREAM, fontFamily: "'Helvetica Neue', sans-serif" }}>{p.name}</span>
                        <span style={{
                          fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "2px 7px", border: `1px solid rgba(${hexRgb(pc.color)}, .4)`,
                          color: pc.color, background: pc.bg, fontFamily: "'Helvetica Neue', sans-serif",
                        }}>
                          {pc.label}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: GOLD, fontFamily: "Georgia, serif" }}>{p.price}</span>
                        <span style={{ fontSize: 10, color: MUTED, fontFamily: "'Helvetica Neue', sans-serif" }}>購入先：{p.where}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "rgba(245,240,232,.55)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                        使い方：{p.howTo}
                      </p>
                    </div>
                    <a href={rakutenUrl} target="_blank" rel="noopener noreferrer" style={{
                      flexShrink: 0, padding: "7px 14px", background: GOLD, color: "#0E1B2E",
                      fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                      fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
                    }}>
                      楽天で探す ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fabric notes */}
      {activeSection === "fabric" && (
        <div>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 14, fontFamily: "'Helvetica Neue', sans-serif" }}>
            素材によってシミの落とし方や使える薬剤が異なります。必ず確認してください。
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(stain.fabricNotes).map(([fabric, note], i) => (
              <div key={i} style={{ border: "1px solid rgba(184,151,74,.15)", padding: "12px 16px", background: "rgba(255,255,255,.02)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: 80, height: 28, border: `1px solid rgba(184,151,74,.25)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: GOLD, letterSpacing: "0.06em", fontFamily: "'Helvetica Neue', sans-serif",
                }}>
                  {fabric}
                </div>
                <p style={{ fontSize: 13, color: "rgba(245,240,232,.65)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function hexRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return `${r},${g},${b}`;
}
