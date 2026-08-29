const CURRENCY_PATTERN = /₹|\$|€|£|\bLPA\b|\bper annum\b|\d{2,3}[,.]?\d{3}/i;
const COMPANY_INTRO_PATTERN =
  /\babout\s+[A-Z]|\bjoin\s+[A-Z]|\bfounded\s+in\b|\bwe\s+are\s+[A-Z]/;
const MIN_WORD_COUNT = 120;

export type JdCompletenessResult = {
  isLikelyIncomplete: boolean;
  missingSignals: string[];
};

export function analyzeJdCompleteness(jdText: string): JdCompletenessResult {
  const missingSignals: string[] = [];

  const wordCount = jdText.trim().split(/\s+/).length;
  if (wordCount < MIN_WORD_COUNT) {
    missingSignals.push("looks short — may be missing context");
  }
  if (!CURRENCY_PATTERN.test(jdText)) {
    missingSignals.push("no salary information detected");
  }
  if (!COMPANY_INTRO_PATTERN.test(jdText)) {
    missingSignals.push("no company introduction detected");
  }

  return {
    isLikelyIncomplete: missingSignals.length >= 2,
    missingSignals,
  };
}
