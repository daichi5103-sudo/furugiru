"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { QUIZ, getRank } from "@/lib/quizData";

const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY = "#0E1B2E";
const MUTED = "#5A6E85";

type Phase = "intro" | "playing" | "done";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<("real" | "fake")[]>([]);
  const [showExp, setShowExp] = useState(false);

  const current = QUIZ[i];
  const score = answers.reduce((a, ans, idx) => a + (ans === QUIZ[idx].correct ? 1 : 0), 0);
  const rank = getRank(score);

  function answer(choice: "real" | "fake") {
    if (showExp) return;
    setAnswers([...answers, choice]);
    setShowExp(true);
  }
  function next() {
    setShowExp(false);
    if (i + 1 < QUIZ.length) setI(i + 1);
    else setPhase("done");
  }
  function reset() {
    setPhase("intro");
    setI(0);
    setAnswers([]);
    setShowExp(false);
  }

  const shareText = encodeURIComponent(
    `古着鑑定クイズ ${score}/${QUIZ.length}点！ ${rank.emoji} ${rank.title}\n挑戦 → https://furugiru.vercel.app/quiz`
  );

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>
      <header style={{
        borderBottom: `1px solid rgba(184,151,74,.2)`, padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: NAVY, position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <Link href="/collabs" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
          ← コラボ一覧へ
        </Link>
      </header>

      <section style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
        {phase === "intro" && (
          <>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
              Authentication Quiz
            </p>
            <h1 style={{ fontSize: 40, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 16 }}>
              古着<em style={{ color: GOLD, fontStyle: "italic" }}>鑑定</em>クイズ
            </h1>
            <p style={{ fontSize: 14, color: "rgba(245,240,232,.6)", lineHeight: 1.8, marginBottom: 32 }}>
              全{QUIZ.length}問の○×クイズ。ストリートブランドのコラボ商品の本物の見分け方、あなたはどこまで知っていますか？
            </p>
            <button onClick={() => setPhase("playing")} style={{
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "14px 32px", background: GOLD, color: NAVY, border: "none",
              cursor: "pointer", fontWeight: 700,
            }}>
              スタート →
            </button>
          </>
        )}

        {phase === "playing" && current && (
          <>
            {/* 進捗 */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>
                Q {i + 1} / {QUIZ.length}
              </p>
              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD }}>
                Score: {score}
              </p>
            </div>

            <div style={{ height: 2, background: "rgba(184,151,74,.08)", marginBottom: 28 }}>
              <div style={{ height: 2, background: GOLD, width: `${((i + (showExp ? 1 : 0)) / QUIZ.length) * 100}%`, transition: "width .3s" }} />
            </div>

            {/* 画像 */}
            {current.imageUrl && (
              <div style={{ height: 220, position: "relative", marginBottom: 20, background: "rgba(20,30,50,.5)", border: `1px solid rgba(184,151,74,.1)` }}>
                <Image src={current.imageUrl} alt="" fill style={{ objectFit: "cover" }} unoptimized />
              </div>
            )}

            {/* 問題 */}
            <p style={{ fontSize: 18, color: CREAM, fontFamily: "Georgia, serif", lineHeight: 1.6, marginBottom: 28 }}>
              {current.question}
            </p>

            {/* 選択肢 */}
            {!showExp ? (
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => answer("real")} style={choiceBtn("#3A8A5A")}>
                  ○ 本物
                </button>
                <button onClick={() => answer("fake")} style={choiceBtn("#DC2626")}>
                  × 偽物
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  padding: 16, marginBottom: 20,
                  border: `1px solid ${answers[i] === current.correct ? "#3A8A5A" : "#DC2626"}`,
                  background: "rgba(255,255,255,.03)",
                }}>
                  <p style={{
                    fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: answers[i] === current.correct ? "#3A8A5A" : "#DC2626",
                    marginBottom: 8,
                  }}>
                    {answers[i] === current.correct ? "✓ 正解" : "✗ 不正解"}
                    {" / 答えは「"}
                    {current.correct === "real" ? "○ 本物" : "× 偽物"}
                    {"」"}
                  </p>
                  <p style={{ fontSize: 13, color: "rgba(245,240,232,.75)", lineHeight: 1.7 }}>
                    {current.explanation}
                  </p>
                </div>
                <button onClick={next} style={{
                  width: "100%", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "14px 0", background: GOLD, color: NAVY, border: "none",
                  cursor: "pointer", fontWeight: 700,
                }}>
                  {i + 1 < QUIZ.length ? "次の問題 →" : "結果を見る →"}
                </button>
              </>
            )}
          </>
        )}

        {phase === "done" && (
          <>
            <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
              Result
            </p>
            <div style={{ fontSize: 72, textAlign: "center", marginBottom: 8 }}>{rank.emoji}</div>
            <h1 style={{ fontSize: 36, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", textAlign: "center", marginBottom: 8 }}>
              {rank.title}
            </h1>
            <p style={{ fontSize: 14, color: MUTED, textAlign: "center", marginBottom: 28 }}>
              {rank.comment}
            </p>

            <div style={{
              border: `1px solid rgba(184,151,74,.2)`, padding: "24px",
              background: "rgba(255,255,255,.02)", textAlign: "center", marginBottom: 24,
            }}>
              <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 8 }}>
                Your Score
              </p>
              <p style={{ fontSize: 56, color: GOLD, fontFamily: "Georgia, serif", lineHeight: 1 }}>
                {score}<span style={{ fontSize: 24, color: MUTED }}>/{QUIZ.length}</span>
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, textAlign: "center", padding: "14px 0",
                  fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
                  background: GOLD, color: NAVY, textDecoration: "none", fontWeight: 700,
                }}
              >
                Xで結果をシェア ↗
              </a>
              <button onClick={reset} style={{
                flex: 1, padding: "14px 0",
                fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
                background: "transparent", color: GOLD, border: `1px solid rgba(184,151,74,.35)`,
                cursor: "pointer",
              }}>
                もう一度挑戦
              </button>
            </div>
            <Link href="/collabs" style={{
              display: "block", textAlign: "center", fontSize: 10,
              letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED,
              textDecoration: "none", padding: "10px",
            }}>
              コラボ図鑑で学ぶ →
            </Link>
          </>
        )}
      </section>
    </div>
  );
}

const choiceBtn = (color: string): React.CSSProperties => ({
  flex: 1, padding: "20px 0",
  fontSize: 18, fontFamily: "Georgia, serif",
  background: "transparent", color, border: `2px solid ${color}`,
  cursor: "pointer", fontWeight: 300,
});
