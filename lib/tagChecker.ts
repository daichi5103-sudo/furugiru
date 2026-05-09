import type { Brand, TagEra } from "./brands";

export const TAG_CHECKER_SLUGS = [
  "levis", "champion", "nike", "carhartt",
  "barbour", "patagonia", "the-north-face", "lee",
];

export const FAKE_CHECKER_SLUGS = [
  "supreme", "stone-island",
  "ralph-lauren", "patagonia", "the-north-face",
];

export type CheckerMode = "era" | "fake";
export type Answer = "yes" | "no" | "unknown";

export interface CheckQuestion {
  id: string;
  text: string;
  type: "feature" | "auth" | "fake_warning";
  eraIndex: number;
  eraLabel: string;
}

export function getCheckerMode(slug: string): CheckerMode | null {
  if (TAG_CHECKER_SLUGS.includes(slug)) return "era";
  if (FAKE_CHECKER_SLUGS.includes(slug)) return "fake";
  return null;
}

// For era mode: 2 features + 1 fakeWarning per era (max ~12 questions)
export function buildEraQuestions(tagEras: TagEra[]): CheckQuestion[] {
  const questions: CheckQuestion[] = [];
  tagEras.forEach((era, eraIndex) => {
    era.features.slice(0, 2).forEach((text, j) => {
      questions.push({ id: `e${eraIndex}_f${j}`, text, type: "feature", eraIndex, eraLabel: era.era });
    });
    if (era.fakeWarnings.length > 0) {
      questions.push({ id: `e${eraIndex}_fw0`, text: era.fakeWarnings[0], type: "fake_warning", eraIndex, eraLabel: era.era });
    }
  });
  return questions;
}

// For fake mode: all fakeWarnings across eras, max 12
export function buildFakeQuestions(brand: Brand): CheckQuestion[] {
  const questions: CheckQuestion[] = [];
  brand.tagEras.forEach((era, eraIndex) => {
    era.fakeWarnings.forEach((text, j) => {
      questions.push({ id: `e${eraIndex}_fw${j}`, text, type: "fake_warning", eraIndex, eraLabel: era.era });
    });
  });
  return questions.slice(0, 12);
}

export function calcEraScores(
  questions: CheckQuestion[],
  answers: Record<string, Answer>,
  eraCount: number,
): number[] {
  const scores = Array(eraCount).fill(0) as number[];
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer || answer === "unknown") return;
    if (q.type === "feature") {
      scores[q.eraIndex] += answer === "yes" ? 2 : -1;
    } else if (q.type === "auth") {
      scores[q.eraIndex] += answer === "yes" ? 1 : 0;
    } else if (q.type === "fake_warning") {
      // "yes" = fake sign present → penalize that era
      scores[q.eraIndex] += answer === "yes" ? -2 : 1;
    }
  });
  return scores;
}

// Returns 0〜1 (ratio of "yes" answers to fake_warning questions)
export function calcFakeRisk(
  questions: CheckQuestion[],
  answers: Record<string, Answer>,
): number {
  let yes = 0;
  let answered = 0;
  questions.forEach((q) => {
    const a = answers[q.id];
    if (a && a !== "unknown") {
      answered++;
      if (a === "yes") yes++;
    }
  });
  return answered === 0 ? 0 : yes / answered;
}
