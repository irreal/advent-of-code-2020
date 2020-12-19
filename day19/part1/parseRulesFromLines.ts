import { RuleSet } from "./models.ts";

export function parseRulesFromLines(lines: string[]): RuleSet[] {
  const rules: RuleSet[] = [];
  lines.forEach((l) => {
    const parts = l.split(" ");
    const ruleNumber = Number(parts[0].slice(0, parts[0].length - 1));
    if (parts.length === 2) {
      rules.push({
        number: ruleNumber,
        rule: parts[1].slice(1, parts[1].length - 1) as "a" | "b",
      });
    } else if (parts.includes("|")) {
      const index = parts.indexOf("|");
      rules.push({
        number: ruleNumber,
        rule: parts.slice(1, index).map((p) => Number(p)),
        altRule: parts.slice(index + 1).map((p) => Number(p)),
      });
    } else {
      rules.push({
        number: ruleNumber,
        rule: parts.slice(1).map((p) => Number(p)),
      });
    }
  });
  return rules;
}
