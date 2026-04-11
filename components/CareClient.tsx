"use client";
import { useState } from "react";
import { CareMaterial, CareStep } from "@/lib/care";

const NAVY = "#0E1B2E";
const NAVY2 = "#162540";
const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const MUTED = "#5A6E85";

const MATERIAL_ICONS: Record<string, string> = {
  denim: "D",
  sweat: "S",
  knit: "K",
  leather: "L",
};

function WarnIcon({ type }: { type: "no" | "caution" | "ok" }) {
  if (type === "no") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
  if (type === "caution") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A8A5A" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StepCard({ step, isActive, onClick }: {
  step: CareStep;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${isActive ? GOLD : "rgba(184,151,74,.15)"}`,
        background: isActive ? "rgba(184,151,74,.05)" : "rgba(255,255,255,.02)",
        marginBottom: 8,
        cursor: "pointer",
        transition: "all .2s",
      }}
    >
      {/* Step header */}
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: `1px solid ${isActive ? GOLD : "rgba(184,151,74,.3)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "Georgia, serif",
            fontSize: 14,
            color: isActive ? GOLD : MUTED,
            background: isActive ? "rgba(184,151,74,.1)" : "transparent",
          }}
        >
          {String(step.stepNum).padStart(2, "0")}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: isActive ? CREAM : "rgba(245,240,232,.75)", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.3 }}>
            {step.title}
          </div>
          {step.duration && (
            <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginTop: 3, fontFamily: "'Helvetica Neue', sans-serif" }}>
              目安：{step.duration}
            </div>
          )}
        </div>
        <div style={{ color: MUTED, transition: "transform .2s", transform: isActive ? "rotate(180deg)" : "none" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded detail */}
      {isActive && (
        <div style={{ borderTop: "1px solid rgba(184,151,74,.12)", padding: "14px 16px 16px" }}>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.8, marginBottom: 12, fontFamily: "'Helvetica Neue', sans-serif" }}>
            {step.detail}
          </p>

          {step.tip && (
            <div style={{
              display: "flex", gap: 8, padding: "10px 12px",
              background: "rgba(58,138,90,.08)", borderLeft: "2px solid rgba(58,138,90,.5)",
              marginBottom: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A8A5A" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ fontSize: 12, color: "rgba(245,240,232,.65)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                <strong style={{ color: "#3A8A5A", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>ポイント</strong>
                {step.tip}
              </p>
            </div>
          )}

          {step.warning && (
            <div style={{
              display: "flex", gap: 8, padding: "10px 12px",
              background: "rgba(220,38,38,.08)", borderLeft: "2px solid rgba(220,38,38,.5)",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p style={{ fontSize: 12, color: "rgba(245,240,232,.65)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                <strong style={{ color: "#DC2626", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>注意</strong>
                {step.warning}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CareClient({ materials }: { materials: CareMaterial[] }) {
  const [activeMaterial, setActiveMaterial] = useState(materials[0].id);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<"steps" | "drying" | "storage" | "warnings" | "mistakes">("steps");

  const mat = materials.find((m) => m.id === activeMaterial)!;

  const sections = [
    { id: "steps", label: "洗い方の手順" },
    { id: "drying", label: "乾かし方" },
    { id: "storage", label: "保管方法" },
    { id: "warnings", label: "OK / NG 一覧" },
    { id: "mistakes", label: "よくある失敗" },
  ] as const;

  return (
    <div>
      {/* Material selector */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED, marginBottom: 12, fontFamily: "'Helvetica Neue', sans-serif" }}>
          素材を選んでください
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {materials.map((m) => (
            <button
              key={m.id}
              onClick={() => { setActiveMaterial(m.id); setActiveStep(null); setActiveSection("steps"); }}
              style={{
                border: `1px solid ${activeMaterial === m.id ? m.color : "rgba(184,151,74,.15)"}`,
                background: activeMaterial === m.id ? `rgba(${hexToRgb(m.color)}, .08)` : "rgba(255,255,255,.02)",
                padding: "14px 10px",
                cursor: "pointer",
                transition: "all .2s",
                textAlign: "center",
              }}
            >
              <div style={{
                width: 36, height: 36, border: `1px solid ${activeMaterial === m.id ? m.color : "rgba(184,151,74,.2)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Georgia, serif", fontSize: 16, color: activeMaterial === m.id ? m.color : MUTED,
                margin: "0 auto 8px",
              }}>
                {MATERIAL_ICONS[m.id]}
              </div>
              <div style={{ fontSize: 11, color: activeMaterial === m.id ? CREAM : "rgba(245,240,232,.5)", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.3 }}>
                {m.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Material intro */}
      <div style={{
        border: `1px solid rgba(${hexToRgb(mat.color)}, .25)`,
        background: `rgba(${hexToRgb(mat.color)}, .04)`,
        padding: "18px 20px",
        marginBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", letterSpacing: "-0.01em", marginBottom: 4 }}>
              {mat.name}
            </h2>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: mat.color, fontFamily: "'Helvetica Neue', sans-serif" }}>
              {mat.tagline}
            </p>
          </div>
          <div style={{
            flexShrink: 0, background: `rgba(${hexToRgb(mat.color)}, .12)`,
            border: `1px solid rgba(${hexToRgb(mat.color)}, .3)`,
            padding: "6px 12px",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}>
            <div style={{ fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: mat.color, marginBottom: 2 }}>洗う頻度</div>
            <div style={{ fontSize: 11, color: "rgba(245,240,232,.7)" }}>{mat.frequency}</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.8, fontFamily: "'Helvetica Neue', sans-serif" }}>
          {mat.intro}
        </p>
      </div>

      {/* Before start checklist */}
      <div style={{ border: "1px solid rgba(184,151,74,.15)", background: "rgba(255,255,255,.02)", padding: "14px 18px", marginBottom: 24 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 12, fontFamily: "'Helvetica Neue', sans-serif" }}>
          洗う前の確認リスト
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {mat.beforeStart.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 18, height: 18, border: "1px solid rgba(184,151,74,.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 1, fontFamily: "Georgia, serif", fontSize: 10, color: GOLD,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.5, fontFamily: "'Helvetica Neue', sans-serif" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(184,151,74,.12)", marginBottom: 20, overflowX: "auto" }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              padding: "9px 16px",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: activeSection === s.id ? GOLD : MUTED,
              borderBottom: `2px solid ${activeSection === s.id ? GOLD : "transparent"}`,
              marginBottom: -1,
              background: "none",
              border: "none",
              borderBottom: `2px solid ${activeSection === s.id ? GOLD : "transparent"}`,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "'Helvetica Neue', sans-serif",
              transition: "color .15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      {activeSection === "steps" && (
        <div>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 14, fontFamily: "'Helvetica Neue', sans-serif" }}>
            各ステップをタップすると詳細が表示されます
          </p>
          {mat.steps.map((step) => (
            <StepCard
              key={step.stepNum}
              step={step}
              isActive={activeStep === step.stepNum}
              onClick={() => setActiveStep(activeStep === step.stepNum ? null : step.stepNum)}
            />
          ))}
        </div>
      )}

      {activeSection === "drying" && (
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 14 }}>
            {mat.drying.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {mat.drying.steps.map((step, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 14px", border: "1px solid rgba(184,151,74,.12)",
                background: "rgba(255,255,255,.02)",
              }}>
                <div style={{
                  width: 22, height: 22, border: "1px solid rgba(184,151,74,.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 10, color: GOLD, fontFamily: "Georgia, serif",
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            display: "flex", gap: 10, padding: "12px 14px",
            background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.25)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p style={{ fontSize: 12, color: "rgba(245,240,232,.65)", lineHeight: 1.7, fontFamily: "'Helvetica Neue', sans-serif" }}>
              {mat.drying.warning}
            </p>
          </div>
        </div>
      )}

      {activeSection === "storage" && (
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 14 }}>
            {mat.storage.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mat.storage.tips.map((tip, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 14px", border: "1px solid rgba(184,151,74,.12)",
                background: "rgba(255,255,255,.02)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: 13, color: "rgba(245,240,232,.7)", lineHeight: 1.6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                  {tip}
                </span>
              </div>
            ))}
          </div>
          {mat.seasonalTips && (
            <div style={{
              marginTop: 16, padding: "12px 14px",
              background: "rgba(184,151,74,.05)", border: "1px solid rgba(184,151,74,.2)",
            }}>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, marginBottom: 6, fontFamily: "'Helvetica Neue', sans-serif" }}>
                季節のケアポイント
              </p>
              <p style={{ fontSize: 12, color: "rgba(245,240,232,.6)", lineHeight: 1.7, fontFamily: "'Helvetica Neue', sans-serif" }}>
                {mat.seasonalTips}
              </p>
            </div>
          )}
        </div>
      )}

      {activeSection === "warnings" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {["no", "caution", "ok"].map((type) => {
              const items = mat.warnings.filter((w) => w.icon === type);
              const labels = { no: "NG — やってはいけない", caution: "注意 — 気をつけて", ok: "OK — 推奨する" };
              const colors = { no: "#DC2626", caution: "#D97706", ok: "#3A8A5A" };
              return (
                <div key={type} style={{ border: `1px solid rgba(${type === "no" ? "220,38,38" : type === "caution" ? "217,119,6" : "58,138,90"}, .25)`, padding: "12px 14px", background: `rgba(${type === "no" ? "220,38,38" : type === "caution" ? "217,119,6" : "58,138,90"}, .05)` }}>
                  <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: colors[type as keyof typeof colors], marginBottom: 10, fontFamily: "'Helvetica Neue', sans-serif" }}>
                    {labels[type as keyof typeof labels]}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((w, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <WarnIcon type={w.icon} />
                        <span style={{ fontSize: 12, color: "rgba(245,240,232,.65)", lineHeight: 1.4, fontFamily: "'Helvetica Neue', sans-serif" }}>
                          {w.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSection === "mistakes" && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {mat.commonMistakes.map((m, i) => (
              <div key={i} style={{ border: "1px solid rgba(184,151,74,.15)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "rgba(220,38,38,.06)", borderLeft: "3px solid rgba(220,38,38,.5)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#DC2626", marginBottom: 3, fontFamily: "'Helvetica Neue', sans-serif" }}>
                      よくある間違い
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(245,240,232,.65)", fontFamily: "'Helvetica Neue', sans-serif" }}>{m.mistake}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "rgba(58,138,90,.06)", borderLeft: "3px solid rgba(58,138,90,.5)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A8A5A" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3A8A5A", marginBottom: 3, fontFamily: "'Helvetica Neue', sans-serif" }}>
                      正しいケア
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(245,240,232,.65)", fontFamily: "'Helvetica Neue', sans-serif" }}>{m.correct}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return `${r},${g},${b}`;
}
