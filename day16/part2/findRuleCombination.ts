import { Rule } from "./models.ts";

export function findRuleCombination(
  ruleCombinations: { index: number; rules: Rule[] }[]
): { index: number; rule: Rule }[] | null {
  const indexAmounts = ruleCombinations.map((rc) => ({
    index: rc.index,
    count: rc.rules.length,
  }));
  const sortedIndexes = indexAmounts
    .sort((a, b) => a.count - b.count)
    .map((ia) => ia.index);
  return generateCombinations(ruleCombinations, 0, sortedIndexes, []);
}

function generateCombinations(
  possibilities: { index: number; rules: Rule[] }[],
  index: number,
  sortedIndexes: number[],
  consumedRules: { index: number; rule: Rule }[]
): { index: number; rule: Rule }[] | null {
  const currentIndex = sortedIndexes[index];
  const forCurrentIndex = possibilities.find(
    (p) => p.index === currentIndex
  ) as {
    index: number;
    rules: Rule[];
  };
  for (let i = 0; i < forCurrentIndex.rules.length; i++) {
    if (consumedRules.find((cr) => cr.rule === forCurrentIndex.rules[i])) {
      continue;
    }
    const newConsumed = [
      ...consumedRules,
      { index: currentIndex, rule: forCurrentIndex.rules[i] },
    ];
    if (index === 19) {
      return [{ index: currentIndex, rule: forCurrentIndex.rules[i] }];
    }
    const result = generateCombinations(
      possibilities,
      index + 1,
      sortedIndexes,
      newConsumed
    );
    if (result !== null) {
      return [
        ...result,
        { index: currentIndex, rule: forCurrentIndex.rules[i] },
      ];
    }
  }
  return null;
}
