"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Brand } from "@/lib/brands";
import {
  buildEraQuestions, buildFakeQuestions,
  calcEraScores, calcFakeRisk,
  type CheckerMode, type Answer,
} from "@/lib/tagChecker";
import { TAG_SVG_MAP } from "@/components/TagSvgs";

const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY  = "#0E1B2E";
const MUTED = "#5A6E85";

const TYPE_LABEL: Record<string, string> = {
  feature:      "タグの特徴",
  auth:         "本物の証明",
  fake_warning: "偽物の特徴（要注意）",
};
const TYPE_COLOR: Record<string, string> = {
  feature:      GOLD,
  auth:         "#22C55E",
  fake_warning: "#EF4444",
};

interface Props {
  brand: Brand;
  mode: CheckerMode;
}

export default function TagCheckerClient({ brand, mode }: Props) {
  const questions = useMemo(
    () => mode === "era" ? buildEraQuestions(brand.tagEras) : buildFakeQuestions(brand),
    [brand, mode],
  );

  const [phase, setPhase] = useState<"start" | "checking" | "result">("start");
  const [step, setStep]   = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const scores = useMemo(
    () => calcEraScores(questions, answers, brand.tagEras.length),
    [questions, answers, brand.tagEras.length],
  );
  const fakeRisk = useMemo(
    () => mode === "fake" ? calcFakeRisk(questions, answers) : 0,
    [questions, answers, mode],
  );

  function handleAnswer(answer: Answer) {
    const q = questions[step];
    const next = { ...answers, [q.id]: answer };
    setAnswers(next);
    if (step + 1 >= questions.length) {
      setPhase("result");
    } else {
      setStep(step + 1);
    }
  }

  function reset() {
    setPhase("start");
    setStep(0);
    setAnswers({});
  }

  const topEraIndex = scores.indexOf(Math.max(...scores));
  const topEra      = brand.tagEras[topEraIndex];
  const sortedScores = [...scores].sort((a, b) => b - a);
  const secondScore  = sortedScores[1] ?? 0;
  const topScore     = sortedScores[0] ?? 0;
  const hasDefinite  = Object.values(answers).some(a => a === "yes" || a === "no");

  const minScore = Math.min(...scores);
  const normalizedScores = scores.map(s => s - minScore);
  const maxNorm  = Math.max(...normalizedScores);

  const riskLevel = fakeRisk >= 0.6 ? "high" : fakeRisk >= 0.3 ? "mid" : "low";
  const RISK_COLOR = { high: "#EF4444", mid: "#F59E0B", low: "#22C55E" };
  const RISK_TEXT  = { high: "偽物リスク：高", mid: "偽物リスク：中", low: "偽物リスク：低" };
  const RISK_MSG   = {
    high: "複数の偽物の特徴が確認されました。購入は慎重に。",
    mid:  "一部に偽物の特徴が見られます。詳細確認を推奨します。",
    low:  "偽物の特徴はほとんど見られませんでした。",
  };

  // ── Start ─────────────────────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>
          {mode === "era" ? "Tag Era Checker" : "Fake Detection Checker"}
        </p>
        <h2 style={{
          fontSize: "clamp(28px,6vw,48px)", fontWeight: 300, color: CREAM,
          fontFamily: "Georgia, serif", marginBottom: 8, lineHeight: 1,
        }}>
          {brand.name}
        </h2>
        <p style={{ fontSize: 16, color: MUTED, marginBottom: 40, fontFamily: "Georgia, serif" }}>
          {mode === "era" ? "タグ年代チェッカー" : "偽物チェッカー"}
        </p>
        <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, marginBottom: 40, maxWidth: 420, margin: "0 auto 40px" }}>
          {mode === "era"
            ? `手元の${brand.nameJp}タグを見ながら${questions.length}問に答えると、${brand.tagEras.length}つの年代から推定します。「わからない」でも回答できます。`
            : `手元の${brand.nameJp}アイテムについて${questions.length}問答えると、偽物リスクを判定します。`}
        </p>
        <button
          onClick={() => setPhase("checking")}
          style={{
            padding: "16px 48px", background: GOLD, color: NAVY,
            border: "none", fontSize: 13, letterSpacing: "0.15em",
            textTransform: "uppercase", cursor: "pointer", fontWeight: 600,
          }}
        >
          チェックを始める →
        </button>
        <div style={{ marginTop: 24 }}>
          <Link href={`/brands/${brand.slug}`} style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>
            ← {brand.name} タグ図鑑に戻る
          </Link>
        </div>
      </div>
    );
  }

  // ── Checking ──────────────────────────────────────────────────────────────
  if (phase === "checking") {
    const q = questions[step];
    const qColor = TYPE_COLOR[q.type];
    const qLabel = TYPE_LABEL[q.type];
    const eraIllustrations = TAG_SVG_MAP[brand.slug];
    const EraIllustration = eraIllustrations?.[q.eraIndex];

    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.15em", color: MUTED }}>
              Q {step + 1} / {questions.length}
            </span>
            <button
              onClick={() => setPhase("result")}
              style={{ fontSize: 10, color: MUTED, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}
            >
              結果を見る →
            </button>
          </div>
          <div style={{ height: 2, background: "rgba(255,255,255,.08)" }}>
            <div style={{
              height: "100%",
              width: `${(step / questions.length) * 100}%`,
              background: GOLD,
              transition: "width 0.3s",
            }} />
          </div>
        </div>

        {/* Question type badge */}
        <div style={{
          display: "inline-block", fontSize: 9, letterSpacing: "0.15em",
          padding: "3px 10px", border: `1px solid ${qColor}`,
          color: qColor, marginBottom: 16,
        }}>
          {qLabel}
        </div>

        {/* Question card: SVG + text */}
        <div style={{
          border: "1px solid rgba(184,151,74,.2)",
          marginBottom: 12,
        }}>
          {EraIllustration && (
            <div style={{
              background: "#E8E4DC",
              display: "flex", justifyContent: "center",
              padding: "16px 0",
              borderBottom: "1px solid rgba(184,151,74,.15)",
            }}>
              <EraIllustration />
            </div>
          )}
          <div style={{ padding: "20px 24px", minHeight: 80, display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: 16, color: CREAM, lineHeight: 1.7, margin: 0 }}>
              {q.text}
            </p>
          </div>
        </div>
        <p style={{ fontSize: 10, color: "rgba(90,110,133,.5)", marginBottom: 24, textAlign: "right" }}>
          {q.eraLabel} の特徴
        </p>

        {/* Answer buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {(["yes", "no", "unknown"] as Answer[]).map((val) => {
            const label = val === "yes" ? "ある" : val === "no" ? "ない" : "わからない";
            const color = val === "yes" ? GOLD : val === "no" ? "#EF4444" : MUTED;
            return (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                style={{
                  padding: "14px 8px",
                  background: "rgba(255,255,255,.04)",
                  border: `1px solid ${color}55`,
                  color,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Result: fake mode ─────────────────────────────────────────────────────
  if (mode === "fake") {
    const rc = RISK_COLOR[riskLevel];
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", color: MUTED, marginBottom: 24, textTransform: "uppercase" }}>Result</p>

        <div style={{ border: `1px solid ${rc}40`, padding: "32px 24px", marginBottom: 32, textAlign: "center" }}>
          <p style={{ fontSize: 36, fontFamily: "Georgia, serif", color: rc, marginBottom: 8 }}>
            {riskLevel === "high" ? "⚠" : riskLevel === "mid" ? "△" : "✓"}
          </p>
          <p style={{ fontSize: 24, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 8 }}>
            {RISK_TEXT[riskLevel]}
          </p>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,.5)", lineHeight: 1.7 }}>
            {RISK_MSG[riskLevel]}
          </p>
        </div>

        <div style={{ border: "1px solid rgba(184,151,74,.2)", padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 12, textTransform: "uppercase" }}>General Tips</p>
          {brand.generalFakeTips.slice(0, 3).map((tip, i) => (
            <p key={i} style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.6, marginBottom: i < 2 ? 8 : 0 }}>
              — {tip}
            </p>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={reset} style={{
            flex: 1, padding: "12px", background: "none",
            border: "1px solid rgba(184,151,74,.3)", color: MUTED, cursor: "pointer", fontSize: 13,
          }}>
            もう一度
          </button>
          <Link href={`/brands/${brand.slug}`} style={{
            flex: 1, padding: "12px", background: GOLD, color: NAVY,
            textDecoration: "none", textAlign: "center", fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            タグ図鑑を見る
          </Link>
        </div>
      </div>
    );
  }

  // ── Result: era mode ──────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 9, letterSpacing: "0.2em", color: MUTED, marginBottom: 24, textTransform: "uppercase" }}>Era Result</p>

      {!hasDefinite ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <p style={{ fontSize: 18, color: "rgba(245,240,232,.5)", fontFamily: "Georgia, serif", marginBottom: 8 }}>
            判定できませんでした
          </p>
          <p style={{ fontSize: 13, color: MUTED }}>
            「ある」か「ない」で回答をもっと増やしてみてください。
          </p>
        </div>
      ) : (
        <>
          {/* Top era card */}
          <div style={{
            borderLeft: `4px solid ${brand.color}`,
            border: `1px solid ${brand.color}55`,
            padding: "24px", marginBottom: 24,
          }}>
            <p style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 8, textTransform: "uppercase" }}>推定年代</p>
            <p style={{ fontSize: "clamp(20px,5vw,32px)", fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 4 }}>
              {topEra.era}
            </p>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 16, fontFamily: "Georgia, serif" }}>
              {topEra.years} — {topEra.tagName}
            </p>
            <p style={{ fontSize: 18, color: GOLD, fontFamily: "Georgia, serif", fontWeight: 700 }}>
              相場: {topEra.priceRange}
            </p>
          </div>

          {/* Score bars */}
          <div style={{ border: "1px solid rgba(184,151,74,.2)", padding: "20px 24px", marginBottom: 24 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.15em", color: MUTED, marginBottom: 16, textTransform: "uppercase" }}>年代スコア比較</p>
            {brand.tagEras.map((era, i) => (
              <div key={i} style={{ marginBottom: i < brand.tagEras.length - 1 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: i === topEraIndex ? CREAM : MUTED }}>{era.era}</span>
                  <span style={{ fontSize: 10, color: i === topEraIndex ? GOLD : MUTED }}>{scores[i]}pt</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2 }}>
                  <div style={{
                    height: "100%",
                    width: maxNorm > 0 ? `${(normalizedScores[i] / maxNorm) * 100}%` : "0%",
                    background: i === topEraIndex ? brand.color : "rgba(184,151,74,.3)",
                    borderRadius: 2,
                    transition: "width 0.5s",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Close call warning */}
          {topScore - secondScore <= 2 && (
            <div style={{
              border: "1px solid rgba(245,158,11,.3)",
              background: "rgba(245,158,11,.05)",
              padding: "12px 16px", marginBottom: 24,
            }}>
              <p style={{ fontSize: 12, color: "#F59E0B" }}>
                △ 複数の年代が候補です。タグ図鑑でさらに詳しく確認することをお勧めします。
              </p>
            </div>
          )}
        </>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={reset} style={{
          flex: 1, padding: "12px", background: "none",
          border: "1px solid rgba(184,151,74,.3)", color: MUTED, cursor: "pointer", fontSize: 13,
        }}>
          もう一度
        </button>
        <Link href={`/brands/${brand.slug}`} style={{
          flex: 1, padding: "12px", background: GOLD, color: NAVY,
          textDecoration: "none", textAlign: "center", fontSize: 13, fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          タグ図鑑を見る
        </Link>
      </div>
    </div>
  );
}
